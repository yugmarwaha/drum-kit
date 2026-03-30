# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build
- `npm run preview` — Preview production build

No test framework or linter is configured.

## Git Practices

Commit incrementally — keep commit messages to 2 lines max.

## Architecture

React 19 + Vite 7 single-page app. One component tree, no routing.

- `src/main.jsx` — React entry point, renders `<App />` in StrictMode
- `src/App.jsx` — All app logic: `App` (state + keyboard listener) and memoized `DrumButton`
- `src/App.css` — All styles; drum button backgrounds are set via per-key CSS classes (`.w`, `.a`, etc.)
- `public/sounds/` — MP3 files played via `new Audio()`
- `public/images/` — Drum PNGs used as button background images

Drum configuration lives in the `DRUMS` array and `DRUM_MAP` lookup at the top of `App.jsx`. Keys W/A/S/D/J/K/L map to seven drum sounds. Adding a drum means adding an entry to `DRUMS`, a CSS class for its background image, and the corresponding sound/image assets in `public/`.

Uses `prop-types` for runtime prop validation on `DrumButton`.
