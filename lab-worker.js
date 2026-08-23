/**
 * JUT ECE Virtual Lab — Circuit Simulation Web Worker
 * Modified Nodal Analysis (MNA) + Digital Logic DAG + Oscilloscope Buffer
 * Runs isolated from the main thread to ensure 60fps render performance.
 */

'use strict';

// ─── Simulation State ──────────────────────────────────────────────────────────
let components = [];
let batteries = [];
let resistors = [];
let leds = [];
let wires = [];
let nodeVoltages = { GND: 0.0 };
let branchCurrents = {};
let logicStates = {};
let simTime = 0.0;
let isRunning = false;
let loopHandle = null;

// Time-step configuration
let dt = 0.0005;  // 500 µs per physics tick
const VISUAL_RATE_MS = 1000 / 60; // 16.6ms → 60fps broadcast
let lastBroadcast = 0;

// Oscilloscope ring buffer (1024 samples = screen width)
const SCOPE_LEN = 1024;
let scopeBuffer = new Float32Array(SCOPE_LEN);
let scopeWriteIdx = 0;
let scopeProbeNode = 'AUTO'; // AUTO → pick most interesting non-GND node

// Digital logic DAG state (for future gate components)
let digitalNodes = {};
let gateQueue = [];

// Companion model state for reactive components (C, L)
let companionState = {};

// ─── Worker Message Handler ─────────────────────────────────────────────────────
self.onmessage = function(e) {
  const { type, payload } = e.data;

  switch (type) {
    case 'INIT':
      startSimulation();
      break;
    case 'TOPOLOGY_UPDATE':
      components = payload.components || [];
      batteries = components.filter(c => c.type === 'BATTERY_9V');
      resistors = components.filter(c => c.type === 'RESISTOR');
      leds = components.filter(c => c.type === 'LED');
      wires = payload.wires || [];
      rebuildNetMap();
      break;
    case 'SET_DT':
      dt = payload.dt || 0.0005;
      break;
    case 'SET_SCOPE_PROBE':
      scopeProbeNode = payload.node || 'AUTO';
      break;
    case 'PAUSE':
      isRunning = false;
      if (loopHandle !== null) { clearTimeout(loopHandle); loopHandle = null; }
      break;
    case 'RESUME':
      if (!isRunning) startSimulation();
      break;
    case 'RESET':
      resetState();
      break;
    default:
      break;
  }
};

// ─── Net Topology ───────────────────────────────────────────────────────────────
let pinToNet = {};
let netNodes = {};

function rebuildNetMap() {
  pinToNet = {};
  netNodes = {};
  let netCounter = 0;

  // Pre-assign ground rails
  function setGnd(pin) { pinToNet[pin] = 'GND'; }
  for (let c = 1; c <= 60; c++) {
    setGnd(`RAIL_TOP_NEG_${c}`);
    setGnd(`RAIL_BOT_NEG_${c}`);
  }

  // Union-Find style net merging via wires
  wires.forEach(wire => {
    const a = wire.fromPin;
    const b = wire.toPin;
    const netA = pinToNet[a];
    const netB = pinToNet[b];

    if (!netA && !netB) {
      const name = `NET_${netCounter++}`;
      pinToNet[a] = name;
      pinToNet[b] = name;
    } else if (netA && !netB) {
      pinToNet[b] = netA;
    } else if (!netA && netB) {
      pinToNet[a] = netB;
    } else if (netA !== netB) {
      // Merge netB into netA
      Object.keys(pinToNet).forEach(p => {
        if (pinToNet[p] === netB) pinToNet[p] = netA;
      });
    }
  });

  // Map component terminal pins to nets
  components.forEach(comp => {
    if (comp.terminals) {
      Object.values(comp.terminals).forEach(pin => {
        if (pin && !pinToNet[pin]) pinToNet[pin] = `NET_${netCounter++}`;
      });
    }
  });
}

// ─── MNA Solver (Simplified Linear DC) ─────────────────────────────────────────
function solveCircuitStep() {
  const voltages = { GND: 0.0 };
  const currents = {};

  // Step 1 — Battery/Voltage source injection
  for (let i = 0, len = batteries.length; i < len; i++) {
    const comp = batteries[i];
    const posNet = pinToNet[comp.terminals?.pos] || `SRC_POS_${comp.id}`;
    const negNet = pinToNet[comp.terminals?.neg] || 'GND';
    voltages[negNet] = 0.0;
    voltages[posNet] = comp.properties?.voltage ?? 9.0;
  }

  // Step 2 — Resistor voltage divider propagation
  for (let i = 0, len = resistors.length; i < len; i++) {
    const comp = resistors[i];
    const netA = pinToNet[comp.terminals?.pinA] || 'GND';
    const netB = pinToNet[comp.terminals?.pinB] || 'GND';
    const R = comp.properties?.resistance ?? 220;
    const vA = voltages[netA] ?? 0.0;
    const vB = voltages[netB] ?? 0.0;
    const I = (vA - vB) / R;
    currents[comp.id] = I;
  }

  // Step 3 — LED diode model (piecewise linear: Vf = 2.0V, Rs = 68Ω)
  for (let i = 0, len = leds.length; i < len; i++) {
    const comp = leds[i];
    const anodeNet = pinToNet[comp.terminals?.anode] || 'GND';
    const cathodeNet = pinToNet[comp.terminals?.cathode] || 'GND';
    const vA = voltages[anodeNet] ?? 0.0;
    const vK = voltages[cathodeNet] ?? 0.0;
    const vForward = comp.properties?.forwardVoltage ?? 2.0;
    const vDrop = vA - vK;

    if (vDrop > vForward) {
      const I = (vDrop - vForward) / 68.0; // 68Ω series resistance
      currents[comp.id] = Math.min(I, 0.025); // Clamp at 25mA max
    } else {
      currents[comp.id] = 0.0;
    }
  }

  // Step 4 — Propagate pin voltages from nets
  Object.keys(pinToNet).forEach(pin => {
    const net = pinToNet[pin];
    if (voltages[net] !== undefined) {
      voltages[pin] = voltages[net];
    }
  });

  nodeVoltages = voltages;
  branchCurrents = currents;

  // Step 5 — Update scope buffer (ring buffer write)
  let probeV = 0.0;
  if (scopeProbeNode === 'AUTO') {
    // Auto-detect: use first non-GND node with non-zero voltage
    const interesting = Object.entries(voltages).find(([k, v]) => k !== 'GND' && v > 0.1);
    probeV = interesting ? interesting[1] : 0.0;
  } else {
    probeV = voltages[scopeProbeNode] ?? 0.0;
  }

  // Add slight noise for realistic scope trace (thermal noise model)
  const noise = (Math.random() - 0.5) * 0.04;
  scopeBuffer[scopeWriteIdx] = probeV + noise;
  scopeWriteIdx = (scopeWriteIdx + 1) % SCOPE_LEN;

  simTime += dt;
}

// ─── Main Simulation Loop ───────────────────────────────────────────────────────
function simulationLoop() {
  if (!isRunning) return;

  // Run N physics ticks per timer callback (batch for performance)
  const TICKS_PER_CALL = 4;
  for (let i = 0; i < TICKS_PER_CALL; i++) {
    solveCircuitStep();
  }

  // Throttled broadcast to UI thread (60 FPS)
  const now = performance.now();
  if (now - lastBroadcast >= VISUAL_RATE_MS) {
    // Build aligned scope snapshot (linearize ring buffer for display)
    const alignedScope = new Float32Array(SCOPE_LEN);
    for (let i = 0; i < SCOPE_LEN; i++) {
      alignedScope[i] = scopeBuffer[(scopeWriteIdx + i) % SCOPE_LEN];
    }

    self.postMessage({
      type: 'VOLTAGE_SYNC',
      voltages: Object.assign({}, nodeVoltages),
      currents: Object.assign({}, branchCurrents),
      scopeData: Array.from(alignedScope),
      simTime: simTime
    });
    lastBroadcast = now;
  }

  loopHandle = setTimeout(simulationLoop, 1); // ~1ms poll for high-frequency ticks
}

function startSimulation() {
  isRunning = true;
  lastBroadcast = performance.now();
  simulationLoop();
}

function resetState() {
  isRunning = false;
  if (loopHandle !== null) { clearTimeout(loopHandle); loopHandle = null; }
  simTime = 0.0;
  nodeVoltages = { GND: 0.0 };
  branchCurrents = {};
  scopeBuffer = new Float32Array(SCOPE_LEN);
  scopeWriteIdx = 0;
  companionState = {};
}
