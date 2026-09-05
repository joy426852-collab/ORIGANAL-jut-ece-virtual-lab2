const fs = require('fs');
const vm = require('vm');
const test = require('node:test');
const assert = require('node:assert');

let code = fs.readFileSync('./app.js', 'utf8');
code = code.replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');

function setupContext() {
  const context = {
    window: {},
    document: {
      getElementById: () => ({ addEventListener: () => {}, classList: { toggle: () => {}, remove: () => {} } }),
      querySelector: () => ({ addEventListener: () => {}, classList: { toggle: () => {} } }),
      querySelectorAll: () => [],
      addEventListener: () => {},
      createElement: () => ({ classList: { add: () => {} }, appendChild: () => {}, style: {} }),
      body: { appendChild: () => {} }
    },
    THREE: {
      Scene: function() {},
      PerspectiveCamera: function() {},
      WebGLRenderer: function() { return { setSize: () => {}, setPixelRatio: () => {}, setClearColor: () => {} } },
      Raycaster: function() {},
      Vector2: function() {},
      Color: function() {},
      BoxGeometry: function() {},
      MeshPhysicalMaterial: function() {},
      Mesh: function() {},
      DirectionalLight: function() { return { position: { set: () => {} } } },
      AmbientLight: function() {},
      PlaneGeometry: function() {},
      MeshBasicMaterial: function() {},
      Group: function() {}
    },
    requestAnimationFrame: () => {},
    setTimeout: () => {},
    Math: Math,
    Date: Date,
    console: {
      log: () => {},
      warn: () => {},
      error: () => {}
    }
  };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

test('playSynthSound - Happy Path', () => {
  const context = setupContext();
  context.AppState.audioMuted = false;

  let oscillatorCreated = false;
  let gainCreated = false;

  context.window.AudioContext = function() {
    return {
      state: 'running',
      createOscillator: () => {
        oscillatorCreated = true;
        return {
          connect: () => {},
          start: () => {},
          stop: () => {},
          frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
          type: ''
        };
      },
      createGain: () => {
        gainCreated = true;
        return {
          connect: () => {},
          gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }
        };
      },
      destination: {},
      currentTime: 0
    };
  };

  assert.doesNotThrow(() => {
    context.playSynthSound('beep');
  });

  assert.strictEqual(oscillatorCreated, true, 'Oscillator should be created on happy path');
  assert.strictEqual(gainCreated, true, 'Gain node should be created on happy path');
});

test('playSynthSound - AudioContext undefined (Silent failure)', () => {
  const context = setupContext();
  context.AppState.audioMuted = false;

  // No AudioContext
  context.window.AudioContext = undefined;
  context.window.webkitAudioContext = undefined;

  assert.doesNotThrow(() => {
    context.playSynthSound('beep');
  }, 'Should handle undefined AudioContext gracefully');
});

test('playSynthSound - Error thrown during audio setup (Silent failure)', () => {
  const context = setupContext();
  context.AppState.audioMuted = false;

  context.window.AudioContext = function() {
    return {
      state: 'running',
      createOscillator: () => {
        throw new Error('Simulated AudioContext error (e.g., max contexts reached)');
      }
    };
  };

  assert.doesNotThrow(() => {
    context.playSynthSound('beep');
  }, 'Should catch and ignore errors thrown during audio setup');
});

test('playSynthSound - Muted state', () => {
  const context = setupContext();
  context.AppState.audioMuted = true;

  let oscillatorCreated = false;

  context.window.AudioContext = function() {
    return {
      state: 'running',
      createOscillator: () => {
        oscillatorCreated = true;
        return {};
      }
    };
  };

  context.playSynthSound('beep');
  assert.strictEqual(oscillatorCreated, false, 'Should return early if audio is muted');
});
