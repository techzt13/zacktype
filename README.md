# ZackType

A Chrome extension that simulates human-like typing into Google Docs at adjustable speeds up to 300 WPM — with zero errors.

## Features

- **Zero-error typing** — no error rate control, types your text perfectly
- **Adjustable speed** — 1 to 300 WPM via a smooth slider
- **Start / Pause / Resume / Stop** controls
- **Progress bar** — shows completion percentage in real time
- **Floating panel** — dark-themed, draggable, minimizable UI
- **Persistent text** — remembers your last typed text via localStorage
- **Character count** — live count in the textarea corner

## Installation

1. Clone or download this repository.
2. Add your icon files to `zacktype/icons/` (see `zacktype/icons/README.md`).
3. Open Chrome and navigate to `chrome://extensions`.
4. Enable **Developer mode** (toggle in the top-right corner).
5. Click **Load unpacked** and select the `zacktype/` directory.
6. The ZackType extension icon will appear in your Chrome toolbar.

## Usage

1. Open a Google Docs document (`docs.google.com/document/...`).
2. Click the **ZackType** extension icon in the Chrome toolbar.
3. A floating panel will appear on the page.
4. Paste or type your text in the textarea.
5. Adjust the **Typing Speed** slider (1–300 WPM).
6. Click **Start** — ZackType will type your text into the document character by character.
7. Use **Pause/Resume** to pause and continue, or **Stop** to cancel.

> **Tip:** Click inside the Google Docs document before starting to ensure the cursor is placed where you want the text to be typed.

## File Structure

```
zacktype/
├── manifest.json    # Manifest V3 Chrome extension config
├── background.js    # Service worker — handles icon click
├── content.js       # Floating UI panel + typing engine
├── popup.html       # Minimal popup for non-Google Docs tabs
└── icons/
    ├── README.md    # Instructions for creating icon files
    ├── icon16.png   # (add manually)
    ├── icon32.png   # (add manually)
    ├── icon48.png   # (add manually)
    └── icon128.png  # (add manually)
```

## Technical Details

- **Manifest V3** Chrome extension
- Dispatches `keydown` / `keypress` / `keyup` events to the Google Docs iframe's active element (`.docs-texteventtarget-iframe`)
- Typing delay formula: `60000 / (5 × WPM)` with ±20% random variation for a natural feel
- Handles uppercase letters, symbols (shift key simulation), and newlines (Enter key)
- No external API calls, no host permissions

## Credits

Created by **techzt13**

---

*For reference, the `Natural-Typist-Human-Typing-Simulator-Chrome-Web-Store/` directory contains the original Natural Typist extension that inspired this project.*