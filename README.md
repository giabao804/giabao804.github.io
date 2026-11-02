# Personal Homepage

This repo is a lightweight personal homepage. The goal is to build fast, iterate visually, and keep everything readable. No build tools required.

## What You Get

- `index.html` for content and structure
- `styles.css` for styling
- `script.js` for light interactions
- `assets/` for images, logos, PDFs
- `icons/` for social icons

## Quick Start

1. Create the basic files.

```bash
touch index.html styles.css script.js
mkdir -p assets icons
```

2. Build the skeleton.

## Vibe Coding Workflow
0. Give agents your CV and a refer open-source template. 
1. Start with structure, not perfection. Put all content in `index.html`.
2. Style in broad strokes. Focus on layout, spacing, and typography first.
3. Iterate visually in the browser. Tweak sizes until it feels right.
4. Add micro-interactions last. Keep `script.js` minimal.

## Personalization Checklist

- Replace name, title, and affiliation
- Add a profile image in `assets/`
- Drop your CV PDF into `assets/` and link to it
- Update social links and icons in `icons/`
- Edit `Biography`, `Publications`, `Experience`, `Honors`

## Local Preview

Open `index.html` in a browser. No server required.

## Viewing the Visitor Total

The public footer shows the copyright and latest content update date. Update both
the `datetime` value and displayed date in its `<time>` element when editing the
page; this date records content changes, not visits or page loads.

The visitor counter and original footer details are hidden by default. The global
visitor counter image still loads eagerly, so hiding it does not disable the
existing counting service.

- Open `index.html?admin=1` to show the visitor total and original footer details.
- Open `index.html?admin=0` to hide those details again.
- Press **Alt + Shift + A** (Mac: **Option + Shift + A**) to toggle visibility.

This visibility preference is saved in the current browser. The total comes from
the existing global counter service; the visibility toggle is not authentication.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Go to `Settings` → `Pages`.
3. Choose the `main` branch and `/root` folder.
4. Save, then wait for the URL.

## License

Use freely for personal websites.
