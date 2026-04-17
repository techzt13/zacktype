!(function () {
  if (window.zackTypeInitialized) return;
  window.zackTypeInitialized = true;

  // Panel state
  let state = {
    isMinimized: false,
    position: { x: 20, y: 20 },
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
  };

  // Typing state
  let isTyping = false;
  let isPaused = false;
  let typingIndex = 0;
  let currentText = "";
  let pauseTimeout = null;
  let targetElement = null;

  // Capture the currently focused element at injection time (before the UI steals focus)
  (function captureInitialFocus() {
    const el = document.activeElement;
    if (!el) return;
    const tag = (el.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || el.isContentEditable) {
      targetElement = el;
    }
    // Also check iframes
    try {
      const frames = document.querySelectorAll("iframe");
      for (const f of frames) {
        if (f.contentDocument) {
          const fel = f.contentDocument.activeElement;
          if (fel && fel !== f.contentDocument.body) {
            const ftag = (fel.tagName || "").toLowerCase();
            if (ftag === "input" || ftag === "textarea" || fel.isContentEditable) {
              targetElement = fel;
              break;
            }
          }
        }
      }
    } catch (_) {}
  })();

  // Track the last focused text element outside the ZackType UI
  document.addEventListener("focusin", (e) => {
    const ui = document.getElementById("zackTypeUI");
    if (ui && ui.contains(e.target)) return;
    const el = e.target;
    const tag = (el.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || el.isContentEditable) {
      targetElement = el;
    }
  }, true);

  // ── Helpers ────────────────────────────────────────────────────────────

  function updateCharCount() {
    const textarea = document.getElementById("zackTypeInput");
    const counter = document.querySelector(".zt-char-count");
    if (textarea && counter) {
      counter.textContent = `${textarea.value.length} chars`;
    }
  }

  function updateProgress(percent) {
    const fill = document.querySelector(".zt-progress-fill");
    const text = document.querySelector(".zt-progress-text");
    if (fill && text) {
      fill.style.width = `${percent}%`;
      text.textContent = `${Math.round(percent)}%`;
    }
  }

  function showToast(message) {
    const existing = document.getElementById("zackTypeToast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.id = "zackTypeToast";
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #ff6b6b;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ── Key code mapping ────────────────────────────────────────────────────────

  function getCode(char) {
    if (char === " ") return "Space";
    if (char === "!" || char === "1") return "Digit1";
    if (char === "@" || char === "2") return "Digit2";
    if (char === "#" || char === "3") return "Digit3";
    if (char === "$" || char === "4") return "Digit4";
    if (char === "%" || char === "5") return "Digit5";
    if (char === "^" || char === "6") return "Digit6";
    if (char === "&" || char === "7") return "Digit7";
    if (char === "*" || char === "8") return "Digit8";
    if (char === "(" || char === "9") return "Digit9";
    if (char === ")" || char === "0") return "Digit0";
    if (char === "-" || char === "_") return "Minus";
    if (char === "=" || char === "+") return "Equal";
    if (char === "[" || char === "{") return "BracketLeft";
    if (char === "]" || char === "}") return "BracketRight";
    if (char === "\\" || char === "|") return "Backslash";
    if (char === ";" || char === ":") return "Semicolon";
    if (char === "'" || char === '"') return "Quote";
    if (char === "," || char === "<") return "Comma";
    if (char === "." || char === ">") return "Period";
    if (char === "/" || char === "?") return "Slash";
    if (char === "`" || char === "~") return "Backquote";
    return `Key${char.toUpperCase()}`;
  }

  // ── Typing delay calculation ────────────────────────────────────────────────

  function getDelay(wpm) {
    // base delay in ms per character: 60000 / (5 * WPM)
    const base = 60000 / (5 * wpm);
    // ±20% random variation for natural feel
    const variation = base * 0.4 * Math.random() - base * 0.2;
    return Math.max(1, base + variation);
  }

  // ── Dispatch a single character via keyboard events ─────────────────────────

  async function dispatchChar(target, char) {
    if (char === "\n") {
      target.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
        })
      );
      target.dispatchEvent(
        new KeyboardEvent("keypress", {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
        })
      );
      target.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true,
        })
      );
      return;
    }

    const needsShift =
      char === char.toUpperCase() &&
      char !== char.toLowerCase() &&
      /[A-Z]/.test(char);
    const isSymbol = '!@#$%^&*()_+{}|:"<>?~'.includes(char);

    const shiftNeeded = needsShift || isSymbol;
    const symbolMap = {
      "!": { code: "Digit1", keyCode: 49 },
      "@": { code: "Digit2", keyCode: 50 },
      "#": { code: "Digit3", keyCode: 51 },
      $: { code: "Digit4", keyCode: 52 },
      "%": { code: "Digit5", keyCode: 53 },
      "^": { code: "Digit6", keyCode: 54 },
      "&": { code: "Digit7", keyCode: 55 },
      "*": { code: "Digit8", keyCode: 56 },
      "(": { code: "Digit9", keyCode: 57 },
      ")": { code: "Digit0", keyCode: 48 },
      _: { code: "Minus", keyCode: 189 },
      "+": { code: "Equal", keyCode: 187 },
      "{": { code: "BracketLeft", keyCode: 219 },
      "}": { code: "BracketRight", keyCode: 221 },
      "|": { code: "Backslash", keyCode: 220 },
      ":": { code: "Semicolon", keyCode: 186 },
      '"': { code: "Quote", keyCode: 222 },
      "<": { code: "Comma", keyCode: 188 },
      ">": { code: "Period", keyCode: 190 },
      "?": { code: "Slash", keyCode: 191 },
      "~": { code: "Backquote", keyCode: 192 },
    };

    const info = symbolMap[char] || {
      code: getCode(char),
      keyCode: char.charCodeAt(0),
    };

    if (shiftNeeded) {
      target.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Shift",
          code: "ShiftLeft",
          keyCode: 16,
          which: 16,
          shiftKey: true,
          bubbles: true,
          cancelable: true,
        })
      );
    }

    target.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: char,
        code: info.code,
        keyCode: info.keyCode,
        which: info.keyCode,
        shiftKey: shiftNeeded,
        bubbles: true,
        cancelable: true,
      })
    );
    target.dispatchEvent(
      new KeyboardEvent("keypress", {
        key: char,
        code: info.code,
        keyCode: char.charCodeAt(0),
        which: char.charCodeAt(0),
        shiftKey: shiftNeeded,
        bubbles: true,
        cancelable: true,
      })
    );
    target.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: char,
        code: info.code,
        keyCode: info.keyCode,
        which: info.keyCode,
        shiftKey: shiftNeeded,
        bubbles: true,
        cancelable: true,
      })
    );

    if (shiftNeeded) {
      target.dispatchEvent(
        new KeyboardEvent("keyup", {
          key: "Shift",
          code: "ShiftLeft",
          keyCode: 16,
          which: 16,
          shiftKey: false,
          bubbles: true,
          cancelable: true,
        })
      );
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ── Insert a single character into a non-Google-Docs element ────────────────

  async function insertChar(element, char) {
    if (char === "\n") {
      const tag = (element.tagName || "").toLowerCase();
      if (tag === "textarea") {
        document.execCommand("insertText", false, "\n");
      } else if (element.isContentEditable) {
        if (!document.execCommand("insertParagraph", false, null)) {
          document.execCommand("insertText", false, "\n");
        }
      }
      return;
    }

    const inserted = document.execCommand("insertText", false, char);
    if (!inserted) {
      // Fallback: directly manipulate value for input/textarea
      const tag = (element.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") {
        const start = element.selectionStart ?? element.value.length;
        const end = element.selectionEnd ?? element.value.length;
        element.value = element.value.slice(0, start) + char + element.value.slice(end);
        element.selectionStart = element.selectionEnd = start + char.length;
        element.dispatchEvent(new Event("input", { bubbles: true }));
      } else {
        await dispatchChar(element, char);
      }
    }
  }

  // ── Main typing loop ────────────────────────────────────────────────────────

  async function runTyping(text, wpm, startIndex) {
    let typingTarget = null;
    let isGoogleDocs = false;

    // Check if we're on Google Docs — if the iframe exists, use it directly
    const iframe = document.querySelector(".docs-texteventtarget-iframe");
    if (iframe && iframe.contentDocument) {
      const iframeActive = iframe.contentDocument.activeElement;
      typingTarget = iframeActive || iframe.contentDocument.body;
      isGoogleDocs = true;
    }

    // For non-Google Docs, use the tracked focus target (with fallbacks)
    if (!isGoogleDocs) {
      if (targetElement && document.contains(targetElement)) {
        typingTarget = targetElement;
      } else {
        const active = document.activeElement;
        if (active) {
          const tag = (active.tagName || "").toLowerCase();
          if (tag === "input" || tag === "textarea" || active.isContentEditable) {
            typingTarget = active;
          }
        }
      }
      if (!typingTarget) {
        showToast("Please click on the text field you want to type into, then click Start.");
        resetUI();
        return;
      }
    }

    typingTarget.focus();
    typingIndex = startIndex;
    currentText = text;
    isTyping = true;
    isPaused = false;

    while (typingIndex < text.length && isTyping && !isPaused) {
      const char = text[typingIndex];

      if (char === "\r") {
        typingIndex++;
        continue;
      }

      const delay = getDelay(wpm);

      // At high speeds, batch characters for real throughput
      if (!isGoogleDocs && delay < 15) {
        let batch = "";
        for (let i = 0; i < Math.min(Math.ceil(15 / Math.max(delay, 1)), text.length - typingIndex); i++) {
          const c = text[typingIndex + i];
          if (c === "\r") continue;
          if (c === "\n") break;
          batch += c;
        }
        if (batch.length > 0) {
          typingTarget.focus();
          const inserted = document.execCommand("insertText", false, batch);
          if (!inserted) {
            const tag = (typingTarget.tagName || "").toLowerCase();
            if (tag === "input" || tag === "textarea") {
              const start = typingTarget.selectionStart ?? typingTarget.value.length;
              const end = typingTarget.selectionEnd ?? typingTarget.value.length;
              typingTarget.value = typingTarget.value.slice(0, start) + batch + typingTarget.value.slice(end);
              typingTarget.selectionStart = typingTarget.selectionEnd = start + batch.length;
              typingTarget.dispatchEvent(new Event("input", { bubbles: true }));
            }
          }
          typingIndex += batch.length;
          updateProgress((typingIndex / text.length) * 100);
          await sleep(delay);
          continue;
        }
      }

      // Normal single-char path (low speed or Google Docs)
      updateProgress((typingIndex / text.length) * 100);
      if (isGoogleDocs) {
        await dispatchChar(typingTarget, char);
      } else {
        await insertChar(typingTarget, char);
      }
      typingIndex++;

      if (isTyping && !isPaused && typingIndex < text.length) {
        await sleep(delay);
      }
    }

    if (typingIndex >= text.length && isTyping) {
      // Completed
      isTyping = false;
      isPaused = false;
      updateProgress(100);
      const startBtn = document.getElementById("zackTypeStart");
      const pauseBtn = document.getElementById("zackTypePause");
      const stopBtn = document.getElementById("zackTypeStop");
      if (startBtn) startBtn.classList.remove("zt-hidden");
      if (pauseBtn) { pauseBtn.classList.add("zt-hidden"); pauseBtn.disabled = true; }
      if (stopBtn) stopBtn.disabled = true;
    }
  }

  // ── Button handlers ─────────────────────────────────────────────────────────

  function handleStart() {
    const textarea = document.getElementById("zackTypeInput");
    const speedSlider = document.getElementById("zackTypeSpeed");
    if (!textarea || !textarea.value) {
      showToast("Please enter some text to type");
      return;
    }
    const text = textarea.value;
    const wpm = parseInt(speedSlider.value, 10);

    // Resume from same position if same text, else restart
    if (currentText !== text) {
      typingIndex = 0;
    }

    const startBtn = document.getElementById("zackTypeStart");
    const pauseBtn = document.getElementById("zackTypePause");
    const stopBtn = document.getElementById("zackTypeStop");
    const progressContainer = document.querySelector(".zt-progress-container");

    if (startBtn) startBtn.classList.add("zt-hidden");
    if (pauseBtn) { pauseBtn.classList.remove("zt-hidden"); pauseBtn.disabled = false; pauseBtn.innerHTML = '<span>Pause</span>' + PAUSE_ICON; }
    if (stopBtn) stopBtn.disabled = false;
    if (progressContainer) progressContainer.classList.remove("zt-hidden");

    isTyping = true;
    isPaused = false;
    runTyping(text, wpm, typingIndex);
  }

  function handlePause() {
    if (!isTyping) return;
    isPaused = !isPaused;
    const pauseBtn = document.getElementById("zackTypePause");
    if (isPaused) {
      if (pauseBtn) pauseBtn.innerHTML = '<span>Resume</span>' + PLAY_ICON;
    } else {
      if (pauseBtn) pauseBtn.innerHTML = '<span>Pause</span>' + PAUSE_ICON;
      // Resume typing
      const textarea = document.getElementById("zackTypeInput");
      const speedSlider = document.getElementById("zackTypeSpeed");
      if (textarea && speedSlider) {
        runTyping(textarea.value, parseInt(speedSlider.value, 10), typingIndex);
      }
    }
  }

  function handleStop() {
    isTyping = false;
    isPaused = false;
    typingIndex = 0;
    currentText = "";
    updateProgress(0);
    resetUI();
  }

  function resetUI() {
    isTyping = false;
    isPaused = false;
    const startBtn = document.getElementById("zackTypeStart");
    const pauseBtn = document.getElementById("zackTypePause");
    const stopBtn = document.getElementById("zackTypeStop");
    const progressContainer = document.querySelector(".zt-progress-container");
    if (startBtn) startBtn.classList.remove("zt-hidden");
    if (pauseBtn) {
      pauseBtn.classList.add("zt-hidden");
      pauseBtn.disabled = true;
      pauseBtn.innerHTML = '<span>Pause</span>' + PAUSE_ICON;
    }
    if (stopBtn) stopBtn.disabled = true;
    if (progressContainer) progressContainer.classList.add("zt-hidden");
    updateProgress(0);
  }

  // ── SVG icons ───────────────────────────────────────────────────────────

  const PLAY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="2 1.7 13 13"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.631.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>`;
  const PAUSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="2 1.7 13 13"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/></svg>`;
  const STOP_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="2 1.7 13 13"><path d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11z"/></svg>`;

  // ── Create the floating UI ──────────────────────────────────────────────────

  function createUI() {
    const existing = document.getElementById("zackTypeUI");
    if (existing) existing.remove();

    // Inject styles
    const style = document.createElement("style");
    style.id = "zackTypeStyles";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

      #zackTypeUI {
        position: fixed;
        width: 320px;
        background: #1e1e1e;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 9999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow: hidden;
        border: 1px solid #444;
        color: #f1f1f1;
        user-select: none;
      }

      .zt-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #161616;
        border-bottom: 1px solid #444;
        cursor: grab;
      }

      .zt-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .zt-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #f1f1f1;
      }

      .zt-version-badge {
        font-size: 10px;
        background: #444;
        padding: 2px 6px;
        border-radius: 12px;
        color: #aaa;
        font-weight: 500;
      }

      .zt-header-right {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .zt-minimize-btn, .zt-close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #aaa;
        padding: 4px;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .zt-minimize-btn:hover {
        background: #444;
        color: #fff;
      }

      .zt-close-btn:hover {
        background: #444;
        color: #ff6b6b;
      }

      .zt-body {
        padding: 16px;
        background: #1e1e1e;
      }

      .zt-text-input-container {
        position: relative;
        margin-bottom: 16px;
      }

      #zackTypeInput {
        width: 100%;
        height: 100px;
        padding: 12px;
        border: 1px solid #444;
        border-radius: 8px;
        resize: none;
        font-family: inherit;
        background: #252525;
        color: #f1f1f1;
        font-size: 13px;
        line-height: 1.5;
        box-sizing: border-box;
        transition: all 0.2s;
      }

      #zackTypeInput:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59,130,246,0.3);
      }

      .zt-char-count {
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 10px;
        color: #aaa;
        background: rgba(30,30,30,0.8);
        padding: 2px 6px;
        border-radius: 4px;
        pointer-events: none;
      }

      .zt-progress-container {
        margin-bottom: 12px;
      }

      .zt-progress-bar {
        height: 4px;
        background: #444;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 4px;
      }

      .zt-progress-fill {
        height: 100%;
        background: #3b82f6;
        width: 0%;
        transition: width 0.3s ease;
      }

      .zt-progress-text {
        font-size: 10px;
        color: #aaa;
        text-align: right;
      }

      .zt-controls-grid {
        display: grid;
        gap: 12px;
        margin-bottom: 16px;
      }

      .zt-control-card {
        background: #252525;
        border-radius: 8px;
        padding: 12px;
        border: 1px solid #444;
      }

      .zt-control-card label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        font-size: 12px;
        color: #aaa;
        font-weight: 500;
      }

      .zt-value-display {
        font-weight: 600;
        color: #f1f1f1;
        font-size: 12px;
      }

      input[type="range"]#zackTypeSpeed {
        width: 100%;
        -webkit-appearance: none;
        height: 4px;
        background: #444;
        border-radius: 3px;
        outline: none;
        margin-bottom: 4px;
      }

      input[type="range"]#zackTypeSpeed::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #3b82f6;
        cursor: pointer;
        transition: all 0.2s;
        border: 2px solid #252525;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }

      input[type="range"]#zackTypeSpeed::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        background: #2563eb;
      }

      .zt-slider-labels {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #777;
      }

      .zt-action-buttons {
        display: flex;
        gap: 8px;
      }

      .zt-primary-btn, .zt-secondary-btn {
        flex: 1;
        padding: 10px 0;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-family: inherit;
      }

      .zt-primary-btn {
        background-color: #3b82f6;
        color: white;
      }

      .zt-primary-btn:hover {
        background-color: #2563eb;
      }

      .zt-primary-btn:disabled {
        background-color: #1e3a8a;
        cursor: not-allowed;
      }

      .zt-secondary-btn {
        background-color: #444;
        color: #f1f1f1;
        border: 1px solid #555;
      }

      .zt-secondary-btn:hover {
        background-color: #555;
        border-color: #666;
      }

      .zt-secondary-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .zt-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 16px;
        font-size: 11px;
        color: #777;
        border-top: 1px solid #444;
        background: #161616;
      }

      #zackTypeUI.zt-dragging {
        box-shadow: 0 15px 40px rgba(0,0,0,0.6);
      }

      .zt-hidden {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Create panel
    const panel = document.createElement("div");
    panel.id = "zackTypeUI";
    panel.style.left = `${state.position.x}px`;
    panel.style.top = `${state.position.y}px`;
    panel.innerHTML = `
      <div class="zt-header">
        <div class="zt-header-left">
          <h3>ZackType</h3>
          <span class="zt-version-badge">v1.0.0</span>
        </div>
        <div class="zt-header-right">
          <button class="zt-minimize-btn" title="Minimize">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"/>
            </svg>
          </button>
          <button class="zt-close-btn" title="Close">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="zt-body">
        <div class="zt-text-input-container">
          <textarea id="zackTypeInput" placeholder="Enter text to type..."></textarea>
          <div class="zt-char-count">0 chars</div>
        </div>

        <div class="zt-progress-container zt-hidden">
          <div class="zt-progress-bar">
            <div class="zt-progress-fill"></div>
          </div>
          <div class="zt-progress-text">0%</div>
        </div>

        <div class="zt-controls-grid">
          <div class="zt-control-card">
            <label for="zackTypeSpeed">
              <span>Typing Speed</span>
              <span id="ztSpeedValue" class="zt-value-display">60 WPM</span>
            </label>
            <input type="range" id="zackTypeSpeed" min="1" max="1000" value="60">
            <div class="zt-slider-labels">
              <span>1 WPM</span>
              <span>1000 WPM</span>
            </div>
          </div>
        </div>

        <div class="zt-action-buttons">
          <button id="zackTypeStart" class="zt-primary-btn">
            <span>Start</span>
            ${PLAY_ICON}
          </button>
          <button id="zackTypePause" class="zt-secondary-btn zt-hidden" disabled>
            <span>Pause</span>
            ${PAUSE_ICON}
          </button>
          <button id="zackTypeStop" class="zt-secondary-btn" disabled>
            <span>Stop</span>
            ${STOP_ICON}
          </button>
        </div>
      </div>

      <div class="zt-footer">
        <span>Created by techzt13</span>
      </div>
    `;
    document.body.appendChild(panel);

    // ── Wire up events ────────────────────────────────────────────────────────

    const textarea = document.getElementById("zackTypeInput");
    const speedSlider = document.getElementById("zackTypeSpeed");
    const speedValue = document.getElementById("ztSpeedValue");
    const header = panel.querySelector(".zt-header");
    const minimizeBtn = panel.querySelector(".zt-minimize-btn");
    const closeBtn = panel.querySelector(".zt-close-btn");

    // Restore saved text
    const savedText = localStorage.getItem("zackTypeText");
    if (savedText) {
      textarea.value = savedText;
      updateCharCount();
    }

    textarea.addEventListener("input", () => {
      updateCharCount();
      localStorage.setItem("zackTypeText", textarea.value);
    });

    speedSlider.addEventListener("input", () => {
      speedValue.textContent = `${speedSlider.value} WPM`;
    });

    document.getElementById("zackTypeStart").addEventListener("click", handleStart);
    document.getElementById("zackTypePause").addEventListener("click", handlePause);
    document.getElementById("zackTypeStop").addEventListener("click", handleStop);

    closeBtn.addEventListener("click", () => {
      handleStop();
      panel.remove();
      const s = document.getElementById("zackTypeStyles");
      if (s) s.remove();
      window.zackTypeInitialized = false;
    });

    minimizeBtn.addEventListener("click", () => {
      state.isMinimized = !state.isMinimized;
      const body = panel.querySelector(".zt-body");
      const footer = panel.querySelector(".zt-footer");
      if (state.isMinimized) {
        body.style.display = "none";
        footer.style.display = "none";
        minimizeBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>`;
      } else {
        body.style.display = "block";
        footer.style.display = "flex";
        minimizeBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>`;
      }
    });

    // ── Dragging ──────────────────────────────────────────────────────────

    header.addEventListener("mousedown", (e) => {
      if (e.target === header || header.contains(e.target)) {
        e.preventDefault();
        state.isDragging = true;
        const rect = panel.getBoundingClientRect();
        state.dragOffset.x = e.clientX - rect.left;
        state.dragOffset.y = e.clientY - rect.top;
        panel.style.cursor = "grabbing";
        panel.style.transition = "none";
        panel.classList.add("zt-dragging");
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (!state.isDragging) return;
      e.preventDefault();
      requestAnimationFrame(() => {
        state.position.x = e.clientX - state.dragOffset.x;
        state.position.y = e.clientY - state.dragOffset.y;
        state.position.x = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, state.position.x));
        state.position.y = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, state.position.y));
        panel.style.left = `${state.position.x}px`;
        panel.style.top = `${state.position.y}px`;
      });
    }, { passive: false });

    document.addEventListener("mouseup", () => {
      if (state.isDragging) {
        state.isDragging = false;
        panel.style.cursor = "";
        panel.classList.remove("zt-dragging");
      }
    });
  }

  // ── Message listener ────────────────────────────────────────────────────────

  if (!window.zackTypeMessageListenerAdded) {
    window.zackTypeMessageListenerAdded = true;
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "toggleUI") {
        const existing = document.getElementById("zackTypeUI");
        if (existing) {
          handleStop();
          existing.remove();
          const s = document.getElementById("zackTypeStyles");
          if (s) s.remove();
          window.zackTypeInitialized = false;
        } else {
          createUI();
        }
      }
      sendResponse({ status: "done" });
    });
  }
})();
