// ── MODULE: Synthetic Data ────────────────────────────────────────────────────
function renderSynth() {
  const realData = [
    ['Emma Richardson','F','2004-05-14','11','3.2','Present','Lunch subsidy'],
    ['Marcus T.','M','2004-01-28','11','2.8','Present','None'],
    ['Aaliyah Gomez','F','2003-09-03','12','3.7','Present','None'],
    ['Devon Park','M','2005-02-11','10','2.1','Chronic absent','Lunch subsidy'],
    ['Sia Kowalski','F','2004-07-22','11','3.0','Present','IEP'],
    ['Jordan Ellis','NB','2003-12-08','12','3.5','Present','None'],
  ];
  const synthData = [
    ['Synthetic_001','F','2004-03-18','11','3.1','Present','Lunch subsidy'],
    ['Synthetic_002','M','2004-02-07','11','2.9','Present','None'],
    ['Synthetic_003','F','2003-11-14','12','3.6','Present','None'],
    ['Synthetic_004','M','2005-04-02','10','2.3','Chronic absent','Lunch subsidy'],
    ['Synthetic_005','F','2004-08-30','11','3.0','Present','IEP'],
    ['Synthetic_006','NB','2003-10-19','12','3.4','Present','None'],
  ];
  const cols = ['Student ID','Gender','DOB','Grade','GPA','Attendance','Services'];

  $('module-content').innerHTML = `
  <div class="module-header animate-in">
    <div class="module-tag badge badge-green">Module 5 of 8</div>
    <div class="module-title">Synthetic Data Generation</div>
    <div class="module-def">Synthetic data is artificially generated to match the <em>statistical properties</em> of a real dataset — distributions, correlations, and patterns — while containing no records from real individuals, eliminating re-identification risk.</div>
    <div class="use-case"><strong>Education use case:</strong> A state education agency releases a synthetic version of its longitudinal student dataset so researchers can build and test analytic tools without accessing any real student records.</div>
  </div>

  <div class="panel animate-in" style="animation-delay:.1s">
    <div class="panel-title">Toggle: Real vs. Synthetic Records</div>
    <div style="display:flex;gap:10px;margin-bottom:14px">
      <button class="btn-tab active" id="tab-real" onclick="synthToggle('real')">🔴 Real Student Data</button>
      <button class="btn-tab" id="tab-synth" onclick="synthToggle('synth')">🟢 Synthetic Data</button>
    </div>
    <div id="synth-table-wrap"></div>
    <div id="synth-note" style="margin-top:10px;font-size:0.78rem;color:var(--text-dim)"></div>
  </div>

  <div class="panel animate-in" style="animation-delay:.2s">
    <div class="panel-title">Statistical Equivalence</div>
    <table class="data-table">
      <thead><tr><th>Metric</th><th>Real Data</th><th>Synthetic Data</th><th>Match?</th></tr></thead>
      <tbody>
        <tr><td>Avg GPA</td><td>3.05</td><td>3.05</td><td style="color:var(--mint)">✓ Yes</td></tr>
        <tr><td>% Chronic absent</td><td>16.7%</td><td>16.7%</td><td style="color:var(--mint)">✓ Yes</td></tr>
        <tr><td>% With IEP</td><td>16.7%</td><td>16.7%</td><td style="color:var(--mint)">✓ Yes</td></tr>
        <tr><td>Any real student?</td><td>Yes</td><td style="color:var(--mint)">No</td><td style="color:var(--mint)">✓ Protected</td></tr>
      </tbody>
    </table>
  </div>

  ${tradeoffs([
    ['Privacy strength', 'Very High', 'val-low'],
    ['Data utility', 'Medium (no individual records)', 'val-med'],
    ['Data stays local?', 'Synthetic can be shared', 'val-low'],
    ['3rd party needed?', 'No', 'val-low'],
    ['Implementation complexity', 'Medium–High', 'val-med'],
    ['Output type', 'Synthetic individual records', 'val-med'],
  ])}

  ${resources([
    ['Urban Institute: Synthetic Data for Education Research', 'https://www.urban.org/research/publication/synthetic-data-education-research'],
    ['NCES: Statistical Methods for Protecting Confidentiality', 'https://nces.ed.gov/pubs2011/2011603.pdf'],
  ])}

  <!-- ── ADVANCED PANEL: DP-TRAINED SYNTHETIC DATA ─────────────────────────── -->
  <div class="panel animate-in" style="animation-delay:.35s;border-color:var(--purple);margin-top:20px">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
      <div class="panel-title" style="color:var(--purple);margin-bottom:0">Advanced: Synthetic Data with Formal Privacy Guarantees</div>
      <span style="background:#1a1a2e;color:var(--purple);border:1px solid var(--purple);border-radius:10px;padding:1px 8px;font-size:.65rem;font-weight:700">EMERGING</span>
    </div>
    <p style="font-size:.8rem;color:var(--text-dim);line-height:1.6;margin-bottom:16px">
      Standard synthetic data protects privacy by generating new records — but the generator itself is trained on real data and can <strong style="color:var(--amber)">memorize unusual records</strong> (outliers), which may then surface in the synthetic output. Adding <strong style="color:var(--text)">differential privacy during training</strong> closes this gap: calibrated noise is injected into the training process so the generator cannot tightly fit any individual record. The result is a synthetic dataset with a <em>mathematically bounded</em> privacy guarantee.
    </p>

    <!-- Phase stepper -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px" id="dp-phase-btns">
      <button class="btn-tab active" onclick="dpPhase(0)">① Real Data</button>
      <button class="btn-tab" onclick="dpPhase(1)">② Training</button>
      <button class="btn-tab" onclick="dpPhase(2)">③ Output</button>
      <button class="btn-tab" onclick="dpPhase(3)">④ Attack Test</button>
    </div>

    <!-- Two-pipeline grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">

      <!-- Plain pipeline -->
      <div style="border:1px solid #555;border-radius:8px;overflow:hidden">
        <div style="background:#1a1a1a;color:#999;padding:9px 13px;font-size:.78rem;font-weight:700">⚠️ Plain Synthetic</div>
        <div id="dp-pl-s1" class="dp-stage">
          <span class="dp-stage-num" style="background:#333;color:#aaa">1</span>
          <span><strong>Input:</strong> Real student records</span>
          <div id="dp-pl-recs-in" class="dp-recs" style="display:none"></div>
        </div>
        <div id="dp-pl-s2" class="dp-stage">
          <span class="dp-stage-num" style="background:#333;color:#aaa">2</span>
          <span><strong>Training:</strong> No noise added <span class="dp-badge dp-badge-amber">Unprotected</span></span>
          <div id="dp-pl-train" style="font-size:.72rem;color:var(--text-dim);margin-top:6px;display:none">Generator learns real data exactly — including outlier shape. <span style="color:var(--amber)">Outlier memorized.</span></div>
        </div>
        <div id="dp-pl-s3" class="dp-stage">
          <span class="dp-stage-num" style="background:#333;color:#aaa">3</span>
          <span><strong>Output:</strong> Synthetic records</span>
          <div id="dp-pl-recs-out" class="dp-recs" style="display:none"></div>
          <div id="dp-pl-out-note" style="font-size:.71rem;color:var(--text-dim);margin-top:4px;display:none">Outlier pattern preserved in generator weights.</div>
        </div>
        <div id="dp-pl-s4" class="dp-stage">
          <span class="dp-stage-num" style="background:#333;color:#aaa">4</span>
          <span><strong>Re-id attack</strong></span>
          <div id="dp-pl-attack" style="display:none;margin-top:8px;background:#2d1414;color:var(--red);border:1px solid var(--red);border-radius:6px;padding:9px 12px;font-size:.76rem;font-weight:600">⚠️ Attack succeeds — outlier recovered ~78% confidence</div>
        </div>
      </div>

      <!-- DP pipeline -->
      <div style="border:2px solid var(--mint);border-radius:8px;overflow:hidden">
        <div style="background:#0d2018;color:var(--mint);padding:9px 13px;font-size:.78rem;font-weight:700">✅ DP-Trained Synthetic</div>
        <div id="dp-dp-s1" class="dp-stage">
          <span class="dp-stage-num" style="background:#0d2018;color:var(--mint)">1</span>
          <span><strong>Input:</strong> Same real records</span>
          <div id="dp-dp-recs-in" class="dp-recs" style="display:none"></div>
        </div>
        <div id="dp-dp-s2" class="dp-stage">
          <span class="dp-stage-num" style="background:#0d2018;color:var(--mint)">2</span>
          <span><strong>Training:</strong> Noise injected <span class="dp-badge dp-badge-green">DP‑Protected</span></span>
          <div id="dp-dp-train" style="font-size:.72rem;color:var(--text-dim);margin-top:6px;display:none">Calibrated noise added to training gradients. Generator learns population patterns — <span style="color:var(--mint)">cannot memorize the outlier.</span></div>
          <!-- Epsilon slider — only visible in phase 1 -->
          <div id="dp-eps-wrap" style="display:none;margin-top:10px">
            <div style="display:flex;justify-content:space-between;font-size:.7rem;color:var(--text-dim);margin-bottom:4px">
              <span>ε = 0.1 (strict)</span><span>ε = 10 (loose)</span>
            </div>
            <input type="range" id="dp-eps-slider" min="1" max="100" value="20"
              oninput="dpUpdateEps(this.value)"
              style="-webkit-appearance:none;width:100%;height:6px;border-radius:3px;background:linear-gradient(90deg,var(--mint),var(--amber),var(--red));outline:none;cursor:pointer">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
              <span style="font-size:.7rem;color:var(--text-dim)">Privacy budget:</span>
              <span id="dp-eps-val" style="font-family:monospace;font-size:.85rem;color:var(--mint);font-weight:700">ε = 0.30</span>
            </div>
            <div style="margin-top:6px;font-size:.71rem;padding:7px 10px;border-radius:6px;border-left:2px solid var(--mint);background:#0d1a0d" id="dp-eps-interp">
              Strong protection — low fidelity. Individual records cannot be recovered from the synthetic output.
            </div>
          </div>
        </div>
        <div id="dp-dp-s3" class="dp-stage">
          <span class="dp-stage-num" style="background:#0d2018;color:var(--mint)">3</span>
          <span><strong>Output:</strong> Synthetic records</span>
          <div id="dp-dp-recs-out" class="dp-recs" style="display:none"></div>
          <div id="dp-dp-out-note" style="font-size:.71rem;color:var(--text-dim);margin-top:4px;display:none">Population patterns preserved. Outlier region statistically smoothed — not recoverable.</div>
        </div>
        <div id="dp-dp-s4" class="dp-stage">
          <span class="dp-stage-num" style="background:#0d2018;color:var(--mint)">4</span>
          <span><strong>Re-id attack</strong></span>
          <div id="dp-dp-attack" style="display:none;margin-top:8px;background:#0d2018;color:var(--mint);border:1px solid var(--mint);border-radius:6px;padding:9px 12px;font-size:.76rem;font-weight:600">✓ Attack fails — signal indistinguishable from training noise</div>
        </div>
      </div>
    </div>

    <!-- Insight box -->
    <div style="background:var(--surface2);border-left:3px solid var(--purple);border-radius:0 6px 6px 0;padding:12px 15px;font-size:.79rem;color:var(--text-dim);line-height:1.6" id="dp-insight">
      Both pipelines start with the same real student records — including a low-GPA, low-attendance outlier (highlighted). The outlier represents a student who could be re-identified if their distinctive pattern appears in the synthetic output.
    </div>
  </div>`;

  // ── Synth toggle (existing behaviour) ──────────────────────────────────────
  const makeTable = (data, isReal) => {
    const color = isReal ? 'var(--red)' : 'var(--mint)';
    return `<table class="data-table">
      <thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead>
      <tbody>${data.map(r=>`<tr>${r.map((c,i)=>
        `<td style="${i===0?'color:'+color+';font-weight:600':''}">${c}</td>`
      ).join('')}</tr>`).join('')}</tbody>
    </table>`;
  };
  window.synthToggle = (mode) => {
    const isReal = mode === 'real';
    $('synth-table-wrap').innerHTML = makeTable(isReal ? realData : synthData, isReal);
    $('synth-note').innerHTML = isReal
      ? '⚠️ Real records contain PII — cannot be shared outside the institution without FERPA authorization.'
      : '✓ Synthetic records share no individual with the real dataset. Safe to share for research purposes.';
    $('tab-real').classList.toggle('active', isReal);
    $('tab-synth').classList.toggle('active', !isReal);
  };
  synthToggle('real');

  // ── DP pipeline stepper ────────────────────────────────────────────────────
  const dpInsights = [
    'Both pipelines start with the same real student records — including a low-GPA, low-attendance outlier (highlighted in red). The outlier represents a student who could be re-identified if their pattern appears in the synthetic output.',
    '<strong style="color:var(--text)">This is the critical difference.</strong> Plain synthesis trains on real records directly — the generator memorizes patterns including outliers. DP synthesis injects calibrated noise at every training step. Use the slider to see how the privacy budget (ε) controls the tradeoff between protection strength and data fidelity.',
    'Both produce synthetic records. Plain synthesis preserves the outlier\'s signature (red tile). DP synthesis statistically smooths the outlier region — no individual record is recoverable from the output.',
    '<strong style="color:var(--text)">The attack test.</strong> Against plain synthetic data the re-identification attack succeeds — the outlier\'s pattern is faithfully preserved. Against DP synthetic data the attack fails — training noise means the attacker cannot distinguish signal from random variation.'
  ];

  const makeRecs = (containerId, type, outlierType) => {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < 15; i++) {
      const d = document.createElement('div');
      d.className = 'dp-rec ' + (i === 14 ? outlierType : type);
      d.title = i === 14 ? 'Outlier: GPA 1.1, Att 41%' : 'Student record ' + (i+1);
      d.textContent = i === 14 ? '!' : (i+1);
      el.appendChild(d);
    }
    el.style.display = 'flex';
  };

  window.dpPhase = (p) => {
    // Update phase buttons
    document.querySelectorAll('#dp-phase-btns .btn-tab').forEach((b,i) => b.classList.toggle('active', i===p));

    // Phase 0+: show input records
    if (p >= 0) {
      makeRecs('dp-pl-recs-in', 'dp-rec-real', 'dp-rec-outlier');
      makeRecs('dp-dp-recs-in', 'dp-rec-real', 'dp-rec-outlier');
      $('dp-pl-recs-in').style.display = 'flex';
      $('dp-dp-recs-in').style.display = 'flex';
    }

    // Phase 1+: show training detail + epsilon slider
    ['dp-pl-train','dp-dp-train'].forEach(id => {
      const el = $(id); if(el) el.style.display = p >= 1 ? 'block' : 'none';
    });
    const epsWrap = $('dp-eps-wrap');
    if (epsWrap) epsWrap.style.display = p === 1 ? 'block' : 'none';

    // Phase 2+: output records
    if (p >= 2) {
      makeRecs('dp-pl-recs-out', 'dp-rec-synth', 'dp-rec-leaked');
      makeRecs('dp-dp-recs-out', 'dp-rec-synth-dp', 'dp-rec-protected');
      $('dp-pl-out-note').style.display = 'block';
      $('dp-dp-out-note').style.display = 'block';
    } else {
      ['dp-pl-recs-out','dp-dp-recs-out','dp-pl-out-note','dp-dp-out-note'].forEach(id => {
        const el = $(id); if(el) el.style.display = 'none';
      });
    }

    // Phase 3+: attack results
    ['dp-pl-attack','dp-dp-attack'].forEach(id => {
      const el = $(id); if(el) el.style.display = p >= 3 ? 'block' : 'none';
    });

    // Highlight active stage in both pipelines
    for (let side of ['pl','dp']) {
      for (let s = 1; s <= 4; s++) {
        const el = $(`dp-${side}-s${s}`);
        if (!el) continue;
        el.style.background = s === p+1 ? 'var(--surface2)' : '';
      }
    }

    $('dp-insight').innerHTML = dpInsights[p];
  };

  window.dpUpdateEps = (v) => {
    const eps = 0.1 + (v/100)*9.9;
    const display = eps < 1 ? eps.toFixed(2) : eps.toFixed(1);
    const epsVal = $('dp-eps-val');
    if (epsVal) {
      epsVal.textContent = 'ε = ' + display;
      epsVal.style.color = eps < 1 ? 'var(--mint)' : eps < 4 ? 'var(--amber)' : 'var(--red)';
    }
    const interp = $('dp-eps-interp');
    if (interp) {
      if (eps < 1) {
        interp.style.borderColor = 'var(--mint)'; interp.style.background = '#0d1a0d';
        interp.textContent = 'Strong protection — lower fidelity. Individual records cannot be recovered from synthetic output. Some statistical patterns smoothed out.';
      } else if (eps < 4) {
        interp.style.borderColor = 'var(--amber)'; interp.style.background = '#1f1800';
        interp.textContent = 'Moderate tradeoff. Useful synthetic data, but extreme outliers leave a faint signature. Some re-identification risk for unusual records.';
      } else {
        interp.style.borderColor = 'var(--red)'; interp.style.background = '#1f0d0d';
        interp.textContent = 'Weak protection — high fidelity. Low training noise allows the generator to memorize outliers. Re-identification attack likely to succeed.';
      }
    }
  };

  dpPhase(0);
}
