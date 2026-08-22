/* ============================================================================
   JUT ECE AI TUTOR — Powered by Gemini
   Floating chat widget for all pages of the JUT ECE Virtual Lab Platform
   Uses Gemini REST API (generateContent) — no SDK required
   ============================================================================ */

(function () {
  'use strict';

  // ─── Configuration ──────────────────────────────────────────────────────────
  const GEMINI_MODEL = 'gemini-2.0-flash';
  const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const SYSTEM_PROMPT = `You are JUT ECE AI Tutor — an expert academic assistant for students of the Diploma in Electronics & Communication Engineering (ECE) at Jharkhand University of Technology (JUT).

Your knowledge covers the COMPLETE JUT Diploma ECE syllabus across all 6 semesters:

SEMESTER 1: Communication Skills I, Engineering Chemistry I (Atomic Structure, Water Treatment, Electrochemistry), Engineering Graphics I (Orthographic Projections, Conic Sections), Engineering Mathematics I (Complex Numbers, De Moivre's, Calculus), Engineering Physics I (Mechanics, Properties of Matter), Fundamentals of Computer.

SEMESTER 2: Communication Skills II, Engineering Chemistry II (Metals & Alloys, Fuels, Polymers), Engineering Mathematics II (Integral Calculus, Differential Equations, Vector Algebra), Engineering Physics II (Waves, Optics & Lasers, Electrostatics), Programming in C (Pointers, Structures, File I/O).

SEMESTER 3: Development of Life Skills (DLS), Electrical & Electronic Measurement (PMMC, Bridges, CRO), Electrical Technology (KCL/KVL/Thevenin/Norton, AC Circuits, Transformers, Induction Motors), Electromagnetic Field Theory (Maxwell's Equations, Biot-Savart), Electronic Devices & Circuits (PN Junction, Zener, BJT, FET, MOSFET, Amplifiers), Engineering Mathematics III (Fourier Series, Laplace Transforms).

SEMESTER 4: Digital Technology & Microprocessor (Boolean Algebra, K-Map, Flip-Flops, 8085 Architecture & Assembly), Computer Hardware & Peripheral (Motherboard, BIOS, Storage), Communication System (AM/FM/PM, Superheterodyne Receiver, PAM/PWM/PPM, Sampling Theorem), Data Communication & Networking (OSI Model, TCP/IP, IPv4/IPv6, Routing), Control System (Transfer Functions, Routh-Hurwitz, Root Locus, Bode Plots).

SEMESTER 5: Instrumentation System ECE (Transducers: LVDT, RTD, Strain Gauge, Thermocouples; ADC/DAC, DAS), Electrical Machines II (Alternators, Synchronous Motors, Stepper Motors), Electronics System Design & Maintenance (PCB Design, Troubleshooting), Embedded Systems/VLSI/Consumer Electronics Electives.

SEMESTER 6: Industrial Engineering & Management (Plant Layout, EOQ, TQM, Six Sigma), Utilization of Electrical Energy (Illumination, Electric Traction), Power Electronics (SCR/DIAC/TRIAC characteristics, Phase-Controlled Rectifiers, Choppers, Inverters), Mobile Communication/Optical Fiber/Robotics Electives, In-Plant Training, Project Work.

HIGH-YIELD EXAM TOPICS:
- Derive EMF equation of transformer, efficiency, regulation
- 8085 microprocessor architecture, instruction set, ALE pin, assembly programs
- Full Wave Bridge Rectifier: efficiency = 81.2%, ripple factor = 0.482
- AM wave: v(t) = Ac[1 + m·cos(ωmt)]·cos(ωct), Total Power PT = Pc(1 + m²/2)
- Routh-Hurwitz criterion for system stability
- EDTA method for water hardness determination
- De Moivre's theorem: (cosθ + i·sinθ)^n = cos(nθ) + i·sin(nθ)
- Numerical Aperture of optical fiber: NA = √(n₁² - n₂²)
- SCR turn-off methods: Natural commutation, Class A/B forced commutation, GTO
- BJT CE amplifier: high input impedance, voltage amplification, 180° phase shift
- K-Map simplification technique for Boolean functions
- Maxwell's 4 equations: Gauss (E), Gauss (B), Faraday, Ampere-Maxwell
- Nodal and Mesh analysis with Thevenin/Norton equivalent circuits
- Sampling theorem: fs ≥ 2·fmax to avoid aliasing

BEHAVIOR RULES:
1. Answer in a mix of English and Hindi (Hinglish) to help JUT students understand better
2. Always show formulas clearly with proper mathematical notation
3. For derivations: show step-by-step working
4. For circuit problems: describe the circuit topology before solving
5. Relate concepts to the JUT Virtual Lab experiments when relevant (e.g., mention the breadboard simulator, oscilloscope, logic gates panel, 8085 CPU visualizer)
6. Keep answers concise but complete — use bullet points and numbered steps
7. For viva questions: give the answer AND the deeper explanation
8. If asked about C programming: show actual C code examples
9. Always mention which semester/subject the topic belongs to
10. Be encouraging and supportive — you're helping students pass their exams!`;

  // ─── State ───────────────────────────────────────────────────────────────────
  let isOpen = false;
  let isLoading = false;
  let apiKey = localStorage.getItem('jut_gemini_key') || '';
  let conversationHistory = [];
  let currentPageContext = detectPageContext();

  // ─── Detect current page for context ─────────────────────────────────────────
  function detectPageContext() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('zone1')) return 'Zone 1 — Foundation Labs (Sem 1 & 2: Physics, Chemistry, C Programming, Engineering Graphics)';
    if (path.includes('lab')) return 'Zone 2 — Core Circuits (Sem 3 & 4: Breadboard, Digital Logic Gates, 8085 CPU Visualizer)';
    if (path.includes('zone3')) return 'Zone 3 — Heavy Machinery (Sem 5 & 6: Motors, Power Electronics, In-Plant Training)';
    if (path.includes('syllabus')) return 'Study Portal (Complete JUT ECE Syllabus, Exam Questions, Lab Experiments)';
    return 'JUT ECE Virtual Lab Hub';
  }

  // ─── Inject Styles ────────────────────────────────────────────────────────────
  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'jut-ai-styles';
    style.textContent = `
      /* JUT AI Tutor Widget Styles */
      #jut-ai-fab {
        position: fixed;
        bottom: 80px;
        right: 16px;
        z-index: 10000;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d4ff, #a855f7);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 24px rgba(0,212,255,.4), 0 0 0 0 rgba(0,212,255,.3);
        transition: all .3s cubic-bezier(.34,1.56,.64,1);
        animation: jut-pulse 3s ease-in-out infinite;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
      }
      #jut-ai-fab:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 32px rgba(0,212,255,.6), 0 0 0 8px rgba(0,212,255,.1);
      }
      #jut-ai-fab:active { transform: scale(0.95); }
      #jut-ai-fab .fab-icon { font-size: 24px; transition: transform .3s; }
      #jut-ai-fab.open .fab-icon { transform: rotate(45deg); }
      #jut-ai-fab .fab-badge {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 14px;
        height: 14px;
        background: #00ff88;
        border-radius: 50%;
        border: 2px solid #060810;
        animation: jut-blink 2s ease-in-out infinite;
      }
      @keyframes jut-pulse {
        0%, 100% { box-shadow: 0 4px 24px rgba(0,212,255,.4), 0 0 0 0 rgba(0,212,255,.3); }
        50% { box-shadow: 0 4px 24px rgba(0,212,255,.6), 0 0 0 12px rgba(0,212,255,.05); }
      }
      @keyframes jut-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      /* Chat Panel */
      #jut-ai-panel {
        position: fixed;
        bottom: 148px;
        right: 16px;
        width: min(400px, calc(100vw - 24px));
        height: min(600px, calc(100vh - 180px));
        z-index: 9999;
        background: rgba(10, 14, 22, 0.98);
        border: 1px solid rgba(0,212,255,.25);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,.7), 0 0 0 1px rgba(0,212,255,.05);
        backdrop-filter: blur(20px);
        transform: scale(0.9) translateY(20px);
        opacity: 0;
        pointer-events: none;
        transition: all .3s cubic-bezier(.34,1.56,.64,1);
        font-family: 'Outfit', 'Space Grotesk', sans-serif;
      }
      #jut-ai-panel.open {
        transform: scale(1) translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      /* Panel Header */
      #jut-ai-header {
        padding: 14px 16px;
        background: linear-gradient(135deg, rgba(0,212,255,.08), rgba(168,85,247,.06));
        border-bottom: 1px solid rgba(255,255,255,.07);
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
      }
      #jut-ai-header .ai-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d4ff, #a855f7);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
        animation: jut-spin-slow 8s linear infinite;
      }
      @keyframes jut-spin-slow {
        0% { box-shadow: 0 0 0 0 rgba(0,212,255,.4); }
        50% { box-shadow: 0 0 16px 4px rgba(0,212,255,.2); }
        100% { box-shadow: 0 0 0 0 rgba(0,212,255,.4); }
      }
      .ai-header-text { flex: 1; min-width: 0; }
      .ai-header-name {
        font-size: 13px;
        font-weight: 700;
        color: #00d4ff;
        font-family: 'Space Grotesk', sans-serif;
      }
      .ai-header-sub {
        font-size: 9px;
        color: #475569;
        font-family: 'JetBrains Mono', monospace;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ai-status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00ff88;
        flex-shrink: 0;
        animation: jut-blink 2s infinite;
      }
      #jut-ai-close {
        background: none;
        border: none;
        color: #475569;
        cursor: pointer;
        font-size: 16px;
        padding: 4px;
        border-radius: 6px;
        transition: all .2s;
        flex-shrink: 0;
      }
      #jut-ai-close:hover { color: #94a3b8; background: rgba(255,255,255,.05); }

      /* API Key Setup Screen */
      #jut-ai-setup {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        gap: 16px;
        text-align: center;
      }
      .setup-icon { font-size: 40px; }
      .setup-title {
        font-size: 16px;
        font-weight: 700;
        color: #f0f4f8;
        font-family: 'Space Grotesk', sans-serif;
      }
      .setup-desc {
        font-size: 12px;
        color: #64748b;
        line-height: 1.6;
      }
      .setup-desc a {
        color: #00d4ff;
        text-decoration: none;
      }
      .setup-input-wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      #jut-api-key-input {
        width: 100%;
        padding: 10px 14px;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(0,212,255,.25);
        border-radius: 10px;
        color: #f0f4f8;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        outline: none;
        transition: border-color .2s;
        box-sizing: border-box;
      }
      #jut-api-key-input:focus { border-color: rgba(0,212,255,.6); }
      #jut-api-key-input::placeholder { color: #334155; }
      .setup-save-btn {
        width: 100%;
        padding: 11px;
        background: linear-gradient(135deg, rgba(0,212,255,.2), rgba(168,85,247,.15));
        border: 1px solid rgba(0,212,255,.4);
        border-radius: 10px;
        color: #00d4ff;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: all .2s;
      }
      .setup-save-btn:hover { background: rgba(0,212,255,.25); }
      .setup-error {
        font-size: 11px;
        color: #ef4444;
        background: rgba(239,68,68,.08);
        border: 1px solid rgba(239,68,68,.2);
        border-radius: 8px;
        padding: 8px 12px;
        display: none;
      }

      /* Messages Area */
      #jut-ai-messages {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,.08) transparent;
        -webkit-overflow-scrolling: touch;
      }
      #jut-ai-messages::-webkit-scrollbar { width: 4px; }
      #jut-ai-messages::-webkit-scrollbar-track { background: transparent; }
      #jut-ai-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }

      /* Message Bubbles */
      .jut-msg {
        display: flex;
        flex-direction: column;
        gap: 4px;
        animation: jut-msg-in .3s ease-out;
      }
      @keyframes jut-msg-in {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .jut-msg.user { align-items: flex-end; }
      .jut-msg.ai   { align-items: flex-start; }
      .jut-bubble {
        max-width: 88%;
        padding: 10px 13px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.6;
        word-break: break-word;
        white-space: pre-wrap;
      }
      .jut-msg.user .jut-bubble {
        background: linear-gradient(135deg, rgba(0,212,255,.18), rgba(0,212,255,.08));
        border: 1px solid rgba(0,212,255,.25);
        color: #e2f0ff;
        border-bottom-right-radius: 4px;
      }
      .jut-msg.ai .jut-bubble {
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
        color: #cbd5e1;
        border-bottom-left-radius: 4px;
      }
      .jut-msg.ai .jut-bubble strong { color: #00d4ff; }
      .jut-msg.ai .jut-bubble em { color: #a855f7; font-style: normal; }
      .jut-msg.ai .jut-bubble code {
        background: rgba(0,0,0,.4);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 4px;
        padding: 1px 5px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #00ff88;
      }
      .jut-msg.ai .jut-bubble pre {
        background: rgba(0,0,0,.5);
        border: 1px solid rgba(0,212,255,.15);
        border-radius: 8px;
        padding: 10px;
        overflow-x: auto;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        color: #00ff88;
        margin: 6px 0;
        -webkit-overflow-scrolling: touch;
      }
      .jut-msg.ai .jut-bubble ul, .jut-msg.ai .jut-bubble ol {
        padding-left: 18px;
        margin: 4px 0;
      }
      .jut-msg.ai .jut-bubble li { margin: 2px 0; }
      .jut-msg.ai .jut-bubble h3 {
        font-size: 13px;
        font-weight: 700;
        color: #00d4ff;
        margin: 8px 0 4px;
        font-family: 'Space Grotesk', sans-serif;
      }
      .jut-msg.ai .jut-bubble .formula-block {
        background: rgba(0,212,255,.06);
        border: 1px solid rgba(0,212,255,.2);
        border-radius: 8px;
        padding: 8px 12px;
        margin: 6px 0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: #ffb700;
        text-align: center;
      }

      /* Typing indicator */
      .jut-typing {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 10px 13px;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 14px;
        border-bottom-left-radius: 4px;
        width: fit-content;
      }
      .jut-typing span {
        width: 6px;
        height: 6px;
        background: #00d4ff;
        border-radius: 50%;
        animation: jut-bounce .8s ease-in-out infinite;
      }
      .jut-typing span:nth-child(2) { animation-delay: .15s; background: #a855f7; }
      .jut-typing span:nth-child(3) { animation-delay: .3s; background: #00ff88; }
      @keyframes jut-bounce {
        0%, 100% { transform: translateY(0); opacity: .4; }
        50% { transform: translateY(-5px); opacity: 1; }
      }

      /* Quick Actions */
      #jut-ai-quickactions {
        padding: 8px 12px;
        display: flex;
        gap: 5px;
        flex-wrap: nowrap;
        overflow-x: auto;
        flex-shrink: 0;
        scrollbar-width: none;
        border-top: 1px solid rgba(255,255,255,.05);
      }
      #jut-ai-quickactions::-webkit-scrollbar { display: none; }
      .quick-chip {
        flex-shrink: 0;
        padding: 5px 11px;
        background: rgba(255,255,255,.04);
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 20px;
        font-size: 10px;
        color: #94a3b8;
        cursor: pointer;
        white-space: nowrap;
        transition: all .2s;
        font-family: 'JetBrains Mono', monospace;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .quick-chip:hover, .quick-chip:active {
        background: rgba(0,212,255,.1);
        border-color: rgba(0,212,255,.3);
        color: #00d4ff;
      }

      /* Input Area */
      #jut-ai-inputarea {
        padding: 10px 12px;
        border-top: 1px solid rgba(255,255,255,.07);
        display: flex;
        gap: 8px;
        align-items: flex-end;
        flex-shrink: 0;
        background: rgba(0,0,0,.2);
      }
      #jut-ai-input {
        flex: 1;
        background: rgba(255,255,255,.05);
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 12px;
        padding: 9px 12px;
        color: #f0f4f8;
        font-family: 'Outfit', sans-serif;
        font-size: 13px;
        outline: none;
        resize: none;
        max-height: 100px;
        min-height: 38px;
        transition: border-color .2s;
        -webkit-appearance: none;
      }
      #jut-ai-input:focus { border-color: rgba(0,212,255,.4); }
      #jut-ai-input::placeholder { color: #334155; font-size: 12px; }
      #jut-ai-send {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: linear-gradient(135deg, #00d4ff, #a855f7);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
        transition: all .2s;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      #jut-ai-send:hover { transform: scale(1.05); opacity: .9; }
      #jut-ai-send:active { transform: scale(.95); }
      #jut-ai-send:disabled { opacity: .4; cursor: not-allowed; transform: none; }

      /* Settings button */
      #jut-ai-settings-btn {
        background: none;
        border: none;
        color: #334155;
        cursor: pointer;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 6px;
        margin-left: auto;
        transition: color .2s;
        -webkit-tap-highlight-color: transparent;
      }
      #jut-ai-settings-btn:hover { color: #64748b; }

      /* Markdown formatter */
      .jut-bubble p { margin: 4px 0; }
      .jut-bubble p:first-child { margin-top: 0; }
      .jut-bubble p:last-child { margin-bottom: 0; }

      /* Mobile adjustments & iOS Safe Areas */
      @media (max-width: 768px) {
        #jut-ai-fab {
          bottom: calc(64px + env(safe-area-inset-bottom, 0px)) !important;
          right: 14px !important;
          width: 48px;
          height: 48px;
        }
        #jut-ai-panel {
          bottom: 0 !important;
          right: 0 !important;
          width: 100vw !important;
          height: 85vh !important;
          max-height: 88dvh !important;
          border-radius: 20px 20px 0 0 !important;
          border-left: none;
          border-right: none;
          border-bottom: none;
          padding-bottom: env(safe-area-inset-bottom, 10px);
        }
        #jut-ai-panel.open {
          transform: scale(1) translateY(0) !important;
        }
        #jut-ai-inputarea {
          padding: 8px 12px calc(8px + env(safe-area-inset-bottom, 0px));
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Build Widget HTML ────────────────────────────────────────────────────────
  function buildWidget() {
    const wrap = document.createElement('div');
    wrap.id = 'jut-ai-wrap';

    // FAB Button
    wrap.innerHTML = `
      <!-- Floating Action Button -->
      <button id="jut-ai-fab" aria-label="JUT AI Tutor" onclick="window.jutAI.toggle()">
        <span class="fab-icon">✦</span>
        <span class="fab-badge"></span>
      </button>

      <!-- Chat Panel -->
      <div id="jut-ai-panel" role="dialog" aria-label="JUT ECE AI Tutor">

        <!-- Header -->
        <div id="jut-ai-header">
          <div class="ai-avatar">⚡</div>
          <div class="ai-header-text">
            <div class="ai-header-name">JUT ECE AI Tutor</div>
            <div class="ai-header-sub" id="jut-page-ctx">📍 ${currentPageContext}</div>
          </div>
          <span class="ai-status-dot"></span>
          <button id="jut-ai-settings-btn" onclick="window.jutAI.showSettings()" title="Change API Key">⚙</button>
          <button id="jut-ai-close" onclick="window.jutAI.toggle()" aria-label="Close">✕</button>
        </div>

        <!-- API Key Setup Screen -->
        <div id="jut-ai-setup" style="display:none;">
          <div class="setup-icon">🔑</div>
          <div class="setup-title">Connect Gemini AI</div>
          <div class="setup-desc">
            Enter your free Gemini API key to activate the AI Tutor.<br><br>
            Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank">aistudio.google.com/apikey</a>
          </div>
          <div class="setup-input-wrap">
            <input id="jut-api-key-input" type="password" placeholder="AIza... (paste your Gemini API key)" autocomplete="off" />
            <div class="setup-error" id="jut-key-error">❌ Invalid API key. Please check and try again.</div>
            <button class="setup-save-btn" onclick="window.jutAI.saveKey()">✦ Activate AI Tutor</button>
          </div>
        </div>

        <!-- Messages -->
        <div id="jut-ai-messages" style="display:none;"></div>

        <!-- Quick Action Chips -->
        <div id="jut-ai-quickactions" style="display:none;"></div>

        <!-- Input Area -->
        <div id="jut-ai-inputarea" style="display:none;">
          <textarea id="jut-ai-input" rows="1" placeholder="Koi bhi question poochho... (Any ECE topic)" aria-label="Chat input"></textarea>
          <button id="jut-ai-send" onclick="window.jutAI.send()" aria-label="Send message">➤</button>
        </div>
      </div>
    `;

    document.body.appendChild(wrap);
  }

  // ─── Quick Action Chips by page ───────────────────────────────────────────────
  function getQuickActions() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('zone1')) return [
      'De Moivre\'s theorem kya hai?',
      'C mein pointer kaise kaam karta hai?',
      'Orthographic projection explain karo',
      'Water hardness EDTA method',
      'Faraday\'s laws of electrolysis',
    ];
    if (path.includes('lab')) return [
      '8085 ALE pin ka kaam kya hai?',
      'NAND universal gate kyun hai?',
      'CE amplifier frequency response',
      'K-Map se Boolean simplify karo',
      'Full wave rectifier efficiency',
    ];
    if (path.includes('zone3')) return [
      'SCR turn-off methods kya hain?',
      'AC induction motor slip kya hai?',
      'DIAC-TRIAC dimmer circuit explain karo',
      'Phase margin aur gain margin',
      'Step-down chopper output voltage',
    ];
    if (path.includes('calculator')) return [
      'Resistor color code mnemonic kya hai?',
      'K-Map grouping rules explain karo',
      '8085 mein Flags register kaise set hote hain?',
      'RLC resonant frequency ka formula',
      '555 timer astable multivibrator duty cycle',
    ];
    if (path.includes('syllabus')) return [
      'Most important exam topics kaun se hain?',
      'Viva mein kya poochha jaata hai?',
      'AM wave total power formula',
      'Routh-Hurwitz criterion',
      'Sampling theorem prove karo',
    ];
    return [
      '8085 microprocessor architecture',
      'AM wave ka power calculate karo',
      'Zener diode voltage regulator',
      'Maxwell\'s equations kya hain?',
      'BJT vs FET comparison',
    ];
  }

  // ─── Render Quick Chips ───────────────────────────────────────────────────────
  function renderQuickChips() {
    const container = document.getElementById('jut-ai-quickactions');
    if (!container) return;
    const chips = getQuickActions();
    container.innerHTML = chips.map(q =>
      `<button class="quick-chip" onclick="window.jutAI.sendQuick('${q.replace(/'/g, "\\'")}')">${q}</button>`
    ).join('');
  }

  // ─── Markdown → HTML (lightweight) ───────────────────────────────────────────
  function formatMarkdown(text) {
    return text
      // Code blocks
      .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
        `<pre><code class="lang-${lang}">${escHtml(code.trim())}</code></pre>`)
      // Inline code
      .replace(/`([^`]+)`/g, (_, c) => `<code>${escHtml(c)}</code>`)
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Headers
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      // Bullet lists
      .replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>(\n|$))+/g, m => `<ul>${m}</ul>`)
      // Numbered lists
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Formula blocks (lines with = and math symbols)
      .replace(/^(.*[=∫√∑∏∞±×÷²³]+.*)$/gm, m =>
        m.includes('<') ? m : `<div class="formula-block">${m}</div>`)
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ─── Add Message to Chat ──────────────────────────────────────────────────────
  function addMessage(role, content, isHtml = false) {
    const container = document.getElementById('jut-ai-messages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `jut-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'jut-bubble';

    if (isHtml) {
      bubble.innerHTML = `<p>${content}</p>`;
    } else {
      bubble.textContent = content;
    }

    msgDiv.appendChild(bubble);
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
    return bubble;
  }

  // ─── Show Typing Indicator ────────────────────────────────────────────────────
  function showTyping() {
    const container = document.getElementById('jut-ai-messages');
    const typing = document.createElement('div');
    typing.className = 'jut-msg ai';
    typing.id = 'jut-typing';
    typing.innerHTML = `<div class="jut-typing"><span></span><span></span><span></span></div>`;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('jut-typing');
    if (t) t.remove();
  }

  // ─── Models for fallback ───────────────────────────────────────────────────
  const FALLBACK_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash'];

  // ─── Offline JUT ECE Knowledge Base (Instant fallback if 429/network error) ─
  const OFFLINE_KB = [
    {
      keywords: ['ale', '8085', 'address latch'],
      topic: '8085 Microprocessor - ALE Pin (Sem 4)',
      content: `### 🖥️ 8085 ALE (Address Latch Enable) Pin

**Definition & Function:**
In the 8085 microprocessor, pins **AD0–AD7** serve a dual purpose (multiplexed address/data bus) to reduce the IC pin count from 40 to smaller size.

1. **Address Phase:** At the start of every machine cycle (during state T1), the CPU places the lower 8 bits of the memory address (A0–A7) on AD0–AD7.
2. **ALE Activation:** At this precise moment, **ALE goes HIGH (1)**.
3. **External Latching:** An external transparent latch (e.g., **IC 74LS373** or **8212**) captures the address when ALE transitions from High to Low.
4. **Data Phase:** During states T2 and T3, ALE becomes **LOW (0)**, and the same pins (AD0–AD7) now carry 8-bit bidirectional data (D0–D7).

\`\`\`
CPU (8085)  ─── ALE ───►  Latch Enable (74LS373)
            ─── AD0-AD7 ─► D-Inputs ───► Separated A0-A7
\`\`\`
*Viva Tip:* If ALE fails or is disconnected, the microprocessor cannot access correct memory locations because lower address bits won't be held stable!`
    },
    {
      keywords: ['rectifier', 'efficiency', 'full wave', 'ripple'],
      topic: 'Full Wave Bridge Rectifier (Sem 3)',
      content: `### ⚡ Full Wave Bridge Rectifier Derivation

**1. Rectifier Efficiency (η):**
Efficiency is the ratio of DC output power to AC input power:
\`\`\`
η = P_dc / P_ac = (I_dc² · R_L) / (I_rms² · (2r_f + R_L))
\`\`\`
For a full wave rectifier:
- **I_dc** = 2·I_m / π
- **I_rms** = I_m / √2
- **η_max** = (8 / π²) ≈ **81.2%** (Double the Half-Wave efficiency of 40.6%)

**2. Ripple Factor (γ):**
Ripple factor measures the AC ripple remaining in the rectified DC:
\`\`\`
γ = √[ (I_rms / I_dc)² - 1 ] = √[ ( (I_m/√2) / (2I_m/π) )² - 1 ]
γ = √[ (π² / 8) - 1 ] = √[ 1.2337 - 1 ] ≈ 0.482 (48.2%)
\`\`\`
- **Peak Inverse Voltage (PIV):** For bridge rectifier = **V_m** (vs 2V_m for center-tapped).
- **Output Frequency:** f_out = 2 · f_in (100 Hz for 50 Hz input).`
    },
    {
      keywords: ['am wave', 'modulation index', 'power', 'amplitud'],
      topic: 'AM Modulation & Power Derivation (Sem 4)',
      content: `### 📡 Amplitude Modulation (AM) Mathematics

**1. General Expression:**
Let Carrier $c(t) = A_c \\cos(\\omega_c t)$ and Message $m(t) = A_m \\cos(\\omega_m t)$.
The AM wave is:
\`\`\`
v(t) = A_c [1 + m · cos(ω_m t)] · cos(ω_c t)
\`\`\`
Where **m = A_m / A_c** is the Modulation Index (should be $0 \\le m \\le 1$).

Expanding into frequency components:
\`\`\`
v(t) = A_c cos(ω_c t) + (m·A_c/2) cos((ω_c + ω_m)t) + (m·A_c/2) cos((ω_c - ω_m)t)
       [Carrier]          [Upper Sideband USB]         [Lower Sideband LSB]
\`\`\`

**2. Total Transmitted Power ($P_T$):**
\`\`\`
P_T = P_c + P_USB + P_LSB = P_c [ 1 + m² / 2 ]
\`\`\`
- Carrier Power: $P_c = A_c^2 / (2R)$
- Sideband Power: $P_{SB} = P_c \\cdot (m^2 / 2)$
- At 100% modulation ($m=1$): $P_T = 1.5 P_c$, where carrier takes 66.7% of total power and sidebands take only 33.3%!`
    },
    {
      keywords: ['scr', 'turn off', 'commutation', 'thyristor'],
      topic: 'SCR Turn-Off (Commutation) Methods (Sem 6)',
      content: `### ⚙️ SCR / Thyristor Commutation Methods

An SCR cannot be turned off merely by removing gate current once latched. The anode current must be reduced below the **Holding Current ($I_H$)** for a time greater than the **turn-off time ($t_q$)**.

**Methods of Commutation:**
1. **Natural (Line) Commutation (AC Circuits):**
   When AC voltage naturally alternates to negative half-cycle, anode becomes negative, reducing current to zero.
2. **Forced Commutation (DC Circuits):**
   - **Class A (Self Commutation):** LC resonant circuit in series with load causes current to naturally oscillate to zero.
   - **Class B (Resonant Pulse):** An LC tank parallel to SCR pulses reverse current through SCR.
   - **Class C (Complementary):** Switching ON a second SCR discharges a capacitor in reverse across the main SCR.
   - **Class D (Auxiliary):** An auxiliary SCR switches the reverse commutating capacitor.
   - **Class E (External Pulse):** External pulse transformer applies reverse voltage.`
    },
    {
      keywords: ['de moivre', 'complex', 'roots of unity'],
      topic: 'Engineering Mathematics I - De Moivre’s Theorem (Sem 1)',
      content: `### 📐 De Moivre's Theorem & nth Roots of Unity

**Theorem Statement:**
For any real number $\\theta$ and any integer $n$:
\`\`\`
(cos θ + i · sin θ)ⁿ = cos(nθ) + i · sin(nθ)
\`\`\`
In Euler form: $(e^{i\\theta})^n = e^{in\\theta}$.

**Finding nth Roots of Unity ($z^n = 1$):**
Express $1$ in polar form:
\`\`\`
1 = cos(2kπ) + i · sin(2kπ)   where k = 0, 1, 2, ..., n-1
\`\`\`
Applying $(1)^{1/n}$:
\`\`\`
z_k = cos(2kπ / n) + i · sin(2kπ / n) = e^(i · 2kπ / n)
\`\`\`
**Properties:**
1. Sum of all $n$ roots of unity is always **0**: $\\sum_{k=0}^{n-1} z_k = 0$
2. Product of all $n$ roots is $(-1)^{n-1}$
3. The roots form the vertices of a regular $n$-sided polygon inscribed in a unit circle!`
    },
    {
      keywords: ['edta', 'hardness', 'water treatment'],
      topic: 'Engineering Chemistry I - EDTA Method (Sem 1)',
      content: `### 🧪 EDTA Method for Water Hardness Estimation

**Principle:**
Ethylene Diamine Tetra-acetic Acid (EDTA) forms stable, colorless complex ions with $\\text{Ca}^{2+}$ and $\\text{Mg}^{2+}$ ions at **pH = 9–10** in the presence of an ammoniacal buffer ($NH_4Cl + NH_4OH$).

**Indicator:** Eriochrome Black T (EBT)
- EBT initially combines with $\\text{Ca}^{2+}/\\text{Mg}^{2+}$ to form an unstable **wine-red complex**:
  $[\\text{Ca/Mg-EBT}] \\text{ (Wine Red)}$
- As EDTA is added from burette, it displaces EBT because EDTA-metal complex is far more stable:
  $[\\text{Ca/Mg-EBT}] + \\text{EDTA} \\rightarrow [\\text{Ca/Mg-EDTA}] + \\text{EBT (Free, Steel Blue)}$
- **End Point:** Sharp change from **Wine Red to Steel Blue**.

**Formula:**
\`\`\`
Total Hardness (in ppm / mg/L CaCO₃ equiv) = (V_EDTA × M_EDTA × 100000) / V_sample
\`\`\``
    },
    {
      keywords: ['pointer', 'c program', 'malloc', 'calloc'],
      topic: 'Programming in C - Pointers & Memory (Sem 2)',
      content: `### 💻 C Programming: Pointers & Dynamic Memory

**What is a Pointer?**
A pointer is a variable that stores the memory address of another variable.

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int val = 42;
    int *ptr = &val; // ptr holds address of val
    
    printf("Value: %d, Address: %p\\n", *ptr, ptr);

    // Dynamic Allocation with malloc:
    int *arr = (int*) malloc(5 * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    for(int i = 0; i < 5; i++) arr[i] = (i + 1) * 10;
    
    // Always free memory to prevent memory leaks:
    free(arr);
    arr = NULL; // Prevent dangling pointer!
    return 0;
}
\`\`\`
*Viva Questions:*
- **malloc() vs calloc():** malloc leaves garbage values; calloc initializes all allocated bytes to zero!
- **Dangling pointer:** A pointer pointing to deallocated memory. Fix by assigning \`ptr = NULL\` after \`free(ptr)\`.`
    },
    {
      keywords: ['routh', 'hurwitz', 'stability', 'control system'],
      topic: 'Control Systems - Routh-Hurwitz Stability (Sem 4)',
      content: `### ⚙️ Routh-Hurwitz Stability Criterion

**Purpose:** Determines whether all roots of a characteristic polynomial lie in the Left Half of the s-plane (LHP) without factoring the polynomial.

Given $A(s) = a_n s^n + a_{n-1} s^{n-1} + \\dots + a_1 s + a_0 = 0$:

**1. Necessary Condition:**
All coefficients $a_i$ must be present and must have the same algebraic sign (+ve).

**2. Routh Array Construction:**
\`\`\`
sⁿ   | a_n      a_{n-2}    a_{n-4} ...
sⁿ⁻¹ | a_{n-1}  a_{n-3}    a_{n-5} ...
sⁿ⁻² | b₁       b₂         b₃      ...
sⁿ⁻³ | c₁       c₂         ...
\`\`\`
Where:
- $b_1 = \\frac{a_{n-1} \\cdot a_{n-2} - a_n \\cdot a_{n-3}}{a_{n-1}}$
- $b_2 = \\frac{a_{n-1} \\cdot a_{n-4} - a_n \\cdot a_{n-5}}{a_{n-1}}$

**Stability Rule:**
The system is **stable** if and only if **all elements in the first column of the Routh array have the same sign (no sign changes)**.
The number of sign changes equals the number of poles in the right half of the s-plane (unstable poles)!`
    },
    {
      keywords: ['maxwell', 'equations', 'electromagnetic'],
      topic: 'Electromagnetic Field Theory - Maxwell’s 4 Equations (Sem 3)',
      content: `### 🧲 Maxwell’s Four Fundamental Equations

| Law | Differential Form | Physical Meaning |
|---|---|---|
| **Gauss's Law for Electrostatics** | $\\nabla \\cdot \\mathbf{D} = \\rho_v$ | Electric flux originates from electric charge density |
| **Gauss's Law for Magnetism** | $\\nabla \\cdot \\mathbf{B} = 0$ | Magnetic monopoles do not exist; magnetic flux lines are closed |
| **Faraday’s Law of Induction** | $\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}$ | Time-varying magnetic field induces an electric field (EMF) |
| **Ampère-Maxwell Circuital Law** | $\\nabla \\times \\mathbf{H} = \\mathbf{J} + \\frac{\\partial \\mathbf{D}}{\\partial t}$ | Conduction current and displacement current generate magnetic field |

*Note:* $\\frac{\\partial \\mathbf{D}}{\\partial t}$ is Maxwell's **Displacement Current Density**, which enabled the prediction of electromagnetic wave propagation at the speed of light $c = 1/\\sqrt{\\mu_0 \\epsilon_0}$!`
    },
    {
      keywords: ['nand', 'nor', 'universal gate'],
      topic: 'Digital Technology - Universal Logic Gates (Sem 4)',
      content: `### 🔲 Universal Logic Gates (NAND & NOR)

**Why are NAND and NOR called Universal Gates?**
Any digital circuit or Boolean expression can be realized using **only NAND gates** or **only NOR gates** without requiring any other type of gate.

**1. Realizations using NAND Gates:**
- **NOT:** Connect both inputs of a NAND together: $Q = \\overline{A \\cdot A} = \\overline{A}$ (1 gate)
- **AND:** NAND followed by a NOT-configured NAND: $Q = \\overline{\\overline{A \\cdot B}} = A \\cdot B$ (2 gates)
- **OR:** By De Morgan's Law $\\overline{\\overline{A} \\cdot \\overline{B}} = A + B$ (3 gates)
- **NOR:** OR gate followed by NOT (4 gates)
- **XOR:** $A\\overline{B} + \\overline{A}B$ (4 NAND gates)

\`\`\`
XOR with 4 NANDs:
G1 = NAND(A, B)
G2 = NAND(A, G1)
G3 = NAND(B, G1)
Output = NAND(G2, G3) = A ⊕ B
\`\`\``
    },
    {
      keywords: ['sampling theorem', 'nyquist', 'aliasing'],
      topic: 'Communication Systems - Nyquist Sampling Theorem (Sem 4)',
      content: `### 📶 Nyquist-Shannon Sampling Theorem

**Statement:**
A continuous-time band-limited signal $x(t)$ with maximum frequency component $f_{max}$ can be uniquely reconstructed from its samples without loss of information if the sampling frequency $f_s$ satisfies:
\`\`\`
f_s ≥ 2 · f_max
\`\`\`
- **Nyquist Rate:** $f_{Nyquist} = 2 \\cdot f_{max}$
- **Nyquist Interval:** $T_s = 1 / (2 f_{max})$

**Aliasing Effect:**
If $f_s < 2 f_{max}$ (under-sampling), high-frequency spectral components fold into the lower frequency baseband spectrum. This overlap causes irreversible distortion called **Aliasing**.

**Prevention:**
1. Pass the analog signal through an **Anti-Aliasing Low-Pass Filter** before sampling.
2. Ensure sampling rate is strictly greater than the Nyquist rate ($f_s > 2 f_{max}$).`
    }
  ];

  // ─── Search Offline KB for matching query ──────────────────────────────────
  function searchOfflineKB(query) {
    const q = query.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    for (const item of OFFLINE_KB) {
      let score = 0;
      for (const kw of item.keywords) {
        if (q.includes(kw.toLowerCase())) score += 3;
      }
      const words = q.split(/\\s+/);
      for (const w of words) {
        if (w.length > 2 && item.content.toLowerCase().includes(w)) score += 1;
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    if (maxScore >= 2 && bestMatch) {
      return bestMatch.content + `\\n\\n*(📚 JUT ECE Verified Syllabus Knowledge Base)*`;
    }
    return null;
  }

  // ─── Call Gemini API with Fallback & Offline Engine ───────────────────────────
  async function callGemini(userMessage) {
    conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

    // Try models in order
    let lastError = null;
    for (const model of FALLBACK_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
        const requestBody = {
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT + `\n\nUser is currently on: ${currentPageContext}` }]
          },
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 0.9,
          }
        };

        const res = await fetch(`${endpoint}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            conversationHistory.push({ role: 'model', parts: [{ text }] });
            return text;
          }
        } else if (res.status === 400 || res.status === 403) {
          lastError = new Error('INVALID_KEY');
          break; // Key issue, don't retry other models
        } else {
          lastError = new Error(`HTTP ${res.status}`);
        }
      } catch (e) {
        lastError = e;
      }
    }

    // If online API fails, check offline knowledge base
    const offlineReply = searchOfflineKB(userMessage);
    if (offlineReply) {
      conversationHistory.push({ role: 'model', parts: [{ text: offlineReply }] });
      return offlineReply;
    }

    throw lastError || new Error('Unable to connect to AI server.');
  }

  // ─── Send Message ─────────────────────────────────────────────────────────────
  async function sendMessage(text) {
    if (isLoading || !text.trim()) return;
    isLoading = true;

    const sendBtn = document.getElementById('jut-ai-send');
    const input = document.getElementById('jut-ai-input');
    if (sendBtn) sendBtn.disabled = true;
    if (input) { input.value = ''; input.style.height = 'auto'; }

    // Hide quick chips after first message
    const chips = document.getElementById('jut-ai-quickactions');
    if (chips && conversationHistory.length > 0) chips.style.opacity = '0.5';

    addMessage('user', text);
    showTyping();

    try {
      const reply = await callGemini(text);
      hideTyping();
      const bubble = addMessage('ai', '', true);
      // Streaming-style character reveal
      const formatted = formatMarkdown(reply);
      let i = 0;
      const interval = setInterval(() => {
        i = Math.min(i + 8, formatted.length);
        bubble.innerHTML = `<p>${formatted.substring(0, i)}</p>`;
        const container = document.getElementById('jut-ai-messages');
        if (container) container.scrollTop = container.scrollHeight;
        if (i >= formatted.length) clearInterval(interval);
      }, 12);
    } catch (err) {
      hideTyping();
      if (err.message === 'INVALID_KEY') {
        addMessage('ai', '❌ API key verify nahi ho paayi. Settings ⚙ se check ya update karein.', true);
        setTimeout(() => window.jutAI.showSettings(), 1500);
      } else {
        // Provide friendly fallback with syllabus guidance
        addMessage('ai', `⚠️ Connection issue (${err.message || 'offline'}). Study portal aur sabhi interactive experiments ready hain!`, true);
      }
      conversationHistory.pop();
    }

    if (sendBtn) sendBtn.disabled = false;
    isLoading = false;
  }

  // ─── Show Chat UI ─────────────────────────────────────────────────────────────
  function showChatUI() {
    document.getElementById('jut-ai-setup').style.display = 'none';
    document.getElementById('jut-ai-messages').style.display = 'flex';
    document.getElementById('jut-ai-quickactions').style.display = 'flex';
    document.getElementById('jut-ai-inputarea').style.display = 'flex';

    // Welcome message if fresh
    const container = document.getElementById('jut-ai-messages');
    if (container.children.length === 0) {
      addMessage('ai',
        `<strong>Namaste! 🙏 Main JUT ECE AI Tutor hoon!</strong><br><br>` +
        `Main tumhare liye <em>${currentPageContext}</em> ke saare topics explain kar sakta hoon.<br><br>` +
        `<strong>Poochh sakte ho:</strong><br>` +
        `• Koi bhi exam question ka derivation<br>` +
        `• Viva questions ke answers<br>` +
        `• Circuit problems solve karna<br>` +
        `• Formula yaad karna<br>` +
        `• C programs explain karna<br><br>` +
        `Niche quick questions hain ya apna sawaal likho! 👇`,
        true
      );
      renderQuickChips();
    }

    setTimeout(() => {
      const input = document.getElementById('jut-ai-input');
      if (input && window.innerWidth > 480) input.focus();
    }, 400);
  }

  // ─── Show Setup Screen ────────────────────────────────────────────────────────
  function showSetup() {
    document.getElementById('jut-ai-setup').style.display = 'flex';
    document.getElementById('jut-ai-messages').style.display = 'none';
    document.getElementById('jut-ai-quickactions').style.display = 'none';
    document.getElementById('jut-ai-inputarea').style.display = 'none';
    setTimeout(() => {
      const inp = document.getElementById('jut-api-key-input');
      if (inp) inp.focus();
    }, 300);
  }

  // ─── Save API Key ─────────────────────────────────────────────────────────────
  async function saveKey() {
    const input = document.getElementById('jut-api-key-input');
    const errEl = document.getElementById('jut-key-error');
    const key = input?.value?.trim();
    if (!key || !key.startsWith('AIza')) {
      if (errEl) errEl.style.display = 'block';
      return;
    }
    if (errEl) errEl.style.display = 'none';

    // Test the key with a simple request
    const btn = document.querySelector('.setup-save-btn');
    if (btn) { btn.textContent = '⏳ Verifying...'; btn.disabled = true; }

    apiKey = key;
    try {
      const testRes = await fetch(`${GEMINI_API_ENDPOINT}?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Hi' }] }],
          generationConfig: { maxOutputTokens: 10 }
        })
      });
      if (!testRes.ok) throw new Error('Invalid key');
      localStorage.setItem('jut_gemini_key', key);
      if (btn) { btn.textContent = '✅ Connected!'; }
      setTimeout(() => showChatUI(), 500);
    } catch {
      apiKey = '';
      if (errEl) errEl.style.display = 'block';
      if (btn) { btn.textContent = '✦ Activate AI Tutor'; btn.disabled = false; }
    }
  }

  // ─── Auto-resize textarea ─────────────────────────────────────────────────────
  function setupInputHandlers() {
    const input = document.getElementById('jut-ai-input');
    if (!input) return;

    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        window.jutAI.send();
      }
    });
  }

  // ─── Public API (window.jutAI) ────────────────────────────────────────────────
  window.jutAI = {
    toggle() {
      isOpen = !isOpen;
      const panel = document.getElementById('jut-ai-panel');
      const fab = document.getElementById('jut-ai-fab');
      if (panel) panel.classList.toggle('open', isOpen);
      if (fab) fab.classList.toggle('open', isOpen);

      if (isOpen) {
        if (!apiKey) showSetup();
        else showChatUI();
        // Remove badge dot when opened
        const badge = fab?.querySelector('.fab-badge');
        if (badge) badge.style.display = 'none';
      }
    },

    send() {
      const input = document.getElementById('jut-ai-input');
      const text = input?.value?.trim();
      if (text) sendMessage(text);
    },

    sendQuick(text) {
      sendMessage(text);
    },

    showSettings() {
      showSetup();
      const input = document.getElementById('jut-api-key-input');
      if (input) {
        input.value = apiKey;
        input.type = 'text'; // show current key for editing
      }
    },

    clearChat() {
      conversationHistory = [];
      const container = document.getElementById('jut-ai-messages');
      if (container) container.innerHTML = '';
      showChatUI();
    }
  };

  // ─── Initialize ───────────────────────────────────────────────────────────────
  function init() {
    if (document.getElementById('jut-ai-wrap')) return; // already loaded
    injectStyles();
    buildWidget();
    setupInputHandlers();

    // Show pulsing badge on FAB to draw attention if key not set
    if (!apiKey) {
      setTimeout(() => {
        // Gently pulse to indicate it's new
        const fab = document.getElementById('jut-ai-fab');
        if (fab) fab.style.animation = 'jut-pulse 1.5s ease-in-out infinite';
      }, 2000);
    }
  }

  // ─── Universal Mobile Haptics & Network Status Toast System ─────────────────
  const haptics = {
    tap: () => { try { if (navigator.vibrate) navigator.vibrate(25); } catch(e){} },
    success: () => { try { if (navigator.vibrate) navigator.vibrate([40, 60, 40]); } catch(e){} },
    warning: () => { try { if (navigator.vibrate) navigator.vibrate([80, 40, 80]); } catch(e){} },
    error: () => { try { if (navigator.vibrate) navigator.vibrate([120, 60, 120, 60, 180]); } catch(e){} }
  };
  window.haptics = haptics;

  function showNetworkToast(msg, isOnline) {
    let toast = document.getElementById('jut-net-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'jut-net-toast';
      toast.style.cssText = `
        position: fixed;
        top: calc(16px + env(safe-area-inset-top, 0px));
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 18px;
        border-radius: 12px;
        font-family: 'Space Grotesk', -apple-system, sans-serif;
        font-size: 12px;
        font-weight: 600;
        backdrop-filter: blur(16px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
        opacity: 0;
        pointer-events: none;
        max-width: 90vw;
        text-align: center;
      `;
      document.body.appendChild(toast);
    }

    if (isOnline) {
      toast.style.background = 'rgba(6, 30, 20, 0.92)';
      toast.style.border = '1px solid rgba(0, 255, 136, 0.4)';
      toast.style.color = '#00ff88';
      toast.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2), 0 10px 30px rgba(0,0,0,0.6)';
      toast.innerHTML = `<span style="font-size:16px;">⚡</span> <span>${msg}</span>`;
    } else {
      toast.style.background = 'rgba(30, 15, 6, 0.92)';
      toast.style.border = '1px solid rgba(255, 183, 0, 0.4)';
      toast.style.color = '#ffb700';
      toast.style.boxShadow = '0 0 20px rgba(255, 183, 0, 0.2), 0 10px 30px rgba(0,0,0,0.6)';
      toast.innerHTML = `<span style="font-size:16px;">📶</span> <span>${msg}</span>`;
    }

    // Slide In
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    // Update Status Dot if available
    const dot = document.querySelector('.ai-status-dot');
    if (dot) {
      dot.style.background = isOnline ? '#00ff88' : '#ffb700';
      dot.title = isOnline ? 'Online (Gemini Cloud AI)' : 'Offline (Local ECE Knowledge Base)';
    }

    // Auto Dismiss after 4.5s
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-100px)';
    }, 4500);
  }

  // Network Event Listeners
  window.addEventListener('offline', () => {
    haptics.error();
    showNetworkToast('You are offline. Basic features, Calculators, & Labs will still work!', false);
  });

  window.addEventListener('online', () => {
    haptics.success();
    showNetworkToast('Connection restored! Gemini Cloud AI is active.', true);
  });

  // ─── PWA Service Worker Registration ─────────────────────────────────────────
  function registerPWA() {
    // Inject Manifest if not present
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = 'manifest.json';
      document.head.appendChild(link);
    }

    // Register Service Worker
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('⚡ PWA Service Worker active:', reg.scope))
        .catch(err => console.log('ServiceWorker not registered in file:// mode:', err));
    }
  }

  // Init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      registerPWA();
    });
  } else {
    init();
    registerPWA();
  }

})();
