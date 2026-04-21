# Privacy Enhancing Technologies — Interactive Guide

A single-page web application providing interactive simulations and explanations of Privacy Enhancing Technologies (PETs), targeted at state education agency data analysts, researchers, and policy staff.

**Version:** v2026-04-14

---

## Files

| File | Role |
|---|---|
| `index.html` | App shell — layout, navigation bar, and script/style loading order |
| `styles.css` | All visual styles — dark/light theme, layout, and UI components |
| `content.js` | Content-only data file — defines the `TIPS` and `CONTENT` globals |
| `app.js` | All simulation logic, render functions, and interactivity |
| `d3.min.js` | D3 v7 — charting library, loaded locally (used only by DP and FL modules) |

---

## Architecture

The app enforces a strict separation between **content** and **logic**.

### `content.js`
Must load before `app.js`. Exports two globals:
- **`TIPS`** — tooltip definitions keyed by term name (e.g., `'avg-abs-error'`, `'reid-risk'`). Each entry has a `term` (label) and `body` (explanation).
- **`CONTENT`** — per-module data: titles, definitions, use cases, tradeoff values (`[label, value, colour-class]`), simulation parameters, notes, and resource links.

> **Edit `content.js` for all text and content changes.** The simulation logic in `app.js` does not need to be touched when updating copy, tradeoff values, or resource links.

### `app.js`
Reads the `TIPS` and `CONTENT` globals at runtime. Contains:
1. Theme toggle (dark/light mode, persisted to `localStorage`)
2. `TIP()` — inline tooltip trigger builder (returns HTML string with `data-tip` attribute)
3. Tooltip show/hide/pin system (hover preview + click-to-pin)
4. Utility helpers — `rand`, `sleep`, `debounce`, `renderEpoch` / `BAIL` / `sleepOrBail`, `$()`, `MODULE_FNS`, `showModule()`
5. `tradeoffs()` — renders the property chip row
6. `resources()` — renders the resource link panel (accordion, collapsed by default)
7. `notes()` — renders the implementation notes panel (accordion, collapsed by default)
8. One `render*()` function per module (see Modules below)
9. Module registry and initialization

> **Edit `app.js` only for simulation behaviour, animations, chart logic, or interactivity.**

#### Animation safety: `renderEpoch` and `sleepOrBail`
Every async simulation function captures `renderEpoch` on entry and calls `sleepOrBail(ms, epoch)` instead of `sleep(ms)`. When the user switches modules mid-animation, `showModule()` increments `renderEpoch`, causing all in-flight `sleepOrBail` calls to reject with the `BAIL` symbol. Each async function catches `BAIL` and exits cleanly, preventing stale DOM mutations from a previous module appearing in the new one.

#### Window handler lifecycle: `MODULE_FNS`
`MODULE_FNS` is a list of every interactive handler (`dpRunQuery`, `pprlLink`, etc.) registered by `render*()` functions as `window.*` properties. `showModule()` nulls all of them before calling the new render function, so no handler from a previous module remains callable while a different module is displayed.

### D3 v7
Loaded from `./d3.min.js` (local file). Used **only** by the Differential Privacy (bar chart) and Federated Learning (network diagram) modules. If either module shows a diagnostic error, confirm that `d3.min.js` is present in the same directory as `index.html`.

---

## Modules

| Key | Module | Key interactive features |
|---|---|---|
| `dp` | Differential Privacy | ε slider + live bar chart; cumulative privacy budget meter with exhaustion lock; Global DP and Local DP tabs |
| `pprl` | Privacy-Preserving Record Linkage | Bigram Dice similarity matching; Adversary View toggle (hides PII to show what an interceptor sees) |
| `mpc` | Secure Multi-Party Computation | Real additive secret share generation; animated partial-sum reconstruction |
| `fl` | Federated Learning | D3 network diagram; animated gradient update packets |
| `synth` | Synthetic Data Generation | Fidelity slider with live statistical drift across three quality regimes |
| `tee` | Trusted Execution Environments | Animated encrypt-in / compute / decrypt-out flow |
| `he` | Homomorphic Encryption | Probabilistic ciphertext (IND-CPA demo — same plaintext → different ciphertext each run) |
| `tok` | Tokenization | Animated tokenization and de-tokenization with vault lookup |
| `trad` | Traditional De-identification — suppression · masking · generalization · perturbation · k-anonymity | k-Anonymity slider with live suppression-rate stats; static homogeneity attack illustration |
| `compare` | Comparison Dashboard | Tables tab + Radar chart tab (D3 spider chart, clickable legend to isolate techniques) |

Each module is rendered into `<div id="module-content">` by its corresponding `render*()` function when its nav button is clicked.

---

## Adding a New Module

1. Add a `<button>` to the nav in `index.html`. The button order must match the `idx` array inside `showModule()` in `app.js` (search for `const idx = [`).
2. Add the module key to the `idx` array in `showModule()`.
3. Add the module's content entry to `CONTENT` in `content.js`.
4. Write a `render*()` function in `app.js`. Register any `window.*` interactive handlers inside it, and add their names to the `MODULE_FNS` array so they are cleared on module switch.
5. Register the module in the module registry at the bottom of `app.js`.

---

## Script Loading Order

The `<script>` tags in `index.html` must remain in this order:

```
1. Google Fonts      — display + mono typefaces
2. styles.css        — all layout and visual styles
3. d3.min.js         — charting library (local file)
4. content.js        — TIPS and CONTENT globals (must precede app.js)
5. app.js            — simulation logic (reads TIPS/CONTENT at runtime)
```

---

## Known Limitations (deferred from code review)

The following items were identified in the April 2026 code review but have not been addressed due to scope or complexity:

| Item | Description |
|---|---|
| Differencing attack demo | An interactive demo showing two overlapping DP queries whose subtraction reveals an individual count (the canonical DP origin story) does not yet exist. This is the highest-value remaining educational addition. |
| FL DP noise multiplier | No interactive control in the FL module for adding DP noise to gradients and observing the accuracy–privacy tradeoff. |
| Background knowledge attack | The k-anonymity background knowledge attack is noted in limitations text but not simulated interactively. |
| Full innerHTML rebuild | Every module switch rebuilds the entire content area. No incremental DOM updates are used. |
| Inline style strings | Layout and visual styles are embedded as inline strings in `render*()` functions rather than CSS classes, preventing deduplication. |
