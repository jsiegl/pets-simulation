# Privacy Enhancing Technologies — Interactive Guide

A single-page web application providing interactive simulations and explanations of Privacy Enhancing Technologies (PETs), targeted at state education agency data analysts, researchers, and policy staff.

**Version:** v2026-04-06

---

## Files

| File | Role |
|---|---|
| `index.html` | App shell — layout, navigation bar, and script/style loading order |
| `styles.css` | All visual styles — dark/light theme, layout, and UI components |
| `content.js` | Content-only data file — defines the `TIPS` and `CONTENT` globals |
| `app.js` | All simulation logic, render functions, and interactivity |

---

## Architecture

The app enforces a strict separation between **content** and **logic**.

### `content.js`
Must load before `app.js`. Exports two globals:
- **`TIPS`** — tooltip definitions keyed by term name (e.g., `'avg-abs-error'`, `'reid-risk'`). Each entry has a `term` (label) and `body` (explanation).
- **`CONTENT`** — per-module data: titles, definitions, use cases, tradeoff values (`[label, value, colour-class]`), and resource links (`[link text, URL]`).

> **Edit `content.js` for all text and content changes.**

### `app.js`
Reads the `TIPS` and `CONTENT` globals at runtime. Contains:
1. Theme toggle (dark/light mode, persisted to `localStorage`)
2. Tooltip show/hide/pin system
3. Utility helpers (`rand`, `sleep`, `$()`, `showModule()`)
4. `tradeoffs()` — renders the property chip row
5. `resources()` — renders the resource link panel
6. One `render*()` function per module (see Modules below)
7. Module registry and initialization

> **Edit `app.js` only for simulation behaviour, animations, chart logic, or interactivity.**

### D3 v7
Loaded from CDN. Used **only** by the Differential Privacy (bar chart) and Federated Learning (network diagram) modules. If the CDN is blocked by a Content Security Policy, download `d3.min.js` locally and update the `src` in `index.html`.

---

## Modules

| Key | Module |
|---|---|
| `dp` | Differential Privacy |
| `pprl` | Privacy-Preserving Record Linkage |
| `mpc` | Secure Multi-Party Computation |
| `fl` | Federated Learning |
| `synth` | Synthetic Data Generation |
| `tee` | Trusted Execution Environments |
| `he` | Homomorphic Encryption |
| `tok` | Tokenization |
| `trad` | Traditional De-identification (suppression · masking · generalization) |
| `compare` | Comparison Dashboard (all modules side-by-side) |

Each module is rendered into `<div id="module-content">` by its corresponding `render*()` function when its nav button is clicked.

---

## Adding a New Module

1. Add a `<button>` to the nav in `index.html` — order must match the `idx` array in `showModule()` in `app.js`.
2. Add the module's content entry to `CONTENT` in `content.js`.
3. Write a `render*()` function in `app.js`.
4. Register the module in the module registry at the bottom of `app.js`.

---

## Script Loading Order

The `<script>` tags in `index.html` must remain in this order:

```
1. Google Fonts      — display + mono typefaces
2. styles.css        — all layout and visual styles
3. D3 v7             — charting library (CDN)
4. content.js        — TIPS and CONTENT globals (must precede app.js)
5. app.js            — simulation logic (reads TIPS/CONTENT at runtime)
```
