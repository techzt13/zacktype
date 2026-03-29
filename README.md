# ZackType

A Chrome extension that simulates human-like typing on any webpage at adjustable speeds up to 1000 WPM — with zero errors.

## Features

- **Works everywhere** — type into any text field, textarea, or contenteditable element on any webpage, including Google Docs
- **Zero-error typing** — no error rate control, types your text perfectly
- **Adjustable speed** — 1 to 1000 WPM via a smooth slider
- **Start / Pause / Resume / Stop** controls
- **Progress bar** — shows completion percentage in real time
- **Floating panel** — dark-themed, draggable, minimizable UI
- **Persistent text** — remembers your last typed text via localStorage
- **Character count** — live count in the textarea corner

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `zacktype/` directory.
5. The ZackType extension icon will appear in your Chrome toolbar.

## Usage

1. Navigate to any webpage with a text field (input, textarea, or contenteditable).
2. Click inside the text field where you want the text to be typed.
3. Click the **ZackType** extension icon in the Chrome toolbar.
4. A floating panel will appear on the page.
5. Paste or type your text in the textarea.
6. Adjust the **Typing Speed** slider (1–1000 WPM).
7. Click **Start** — ZackType will type your text into the focused element character by character.
8. Use **Pause/Resume** to pause and continue, or **Stop** to cancel.

> **Tip:** Click inside the target text field *before* clicking Start to ensure ZackType knows where to type. For Google Docs, click inside the document area first.

## File Structure

```
zacktype/
├── manifest.json    # Manifest V3 Chrome extension config
├── background.js    # Service worker — handles icon click
└── content.js       # Floating UI panel + typing engine
```

## Technical Details

- **Manifest V3** Chrome extension
- Works on **any webpage** — no URL restrictions
- **Google Docs**: dispatches `keydown` / `keypress` / `keyup` events to the Docs iframe's active element
- **Other pages**: uses `document.execCommand('insertText')` for inputs, textareas, and contenteditable elements; falls back to direct value manipulation with `input` event dispatch
- Typing delay formula: `60000 / (5 × WPM)` with ±20% random variation for a natural feel
- Handles uppercase letters, symbols (shift key simulation), and newlines (Enter key)

## Credits

Created by **techzt13**

---

*For reference, the `Natural-Typist-Human-Typing-Simulator-Chrome-Web-Store/` directory contains the original Natural Typist extension that inspired this project.*