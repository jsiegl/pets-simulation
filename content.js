/* =============================================================================
   Privacy Enhancing Technologies — Interactive Guide
   content.js

   ╔══════════════════════════════════════════════════════════════════════════╗
   ║  THIS IS THE ONLY FILE YOU NEED TO EDIT FOR CONTENT CHANGES.            ║
   ║                                                                          ║
   ║  It contains two objects:                                                ║
   ║    • TIPS    — hover/click tooltip definitions (term + body copy)        ║
   ║    • CONTENT — all module text: titles, definitions, use cases,          ║
   ║                step labels, tradeoff values, and resource links          ║
   ║                                                                          ║
   ║  The simulation logic (animations, charts, interactivity) lives in       ║
   ║  app.js and does NOT need to be touched when updating copy.              ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   HOW TO EDIT CONTENT:
   ─────────────────────
   • Any string value can be changed freely.
   • Inline HTML tags (<em>, <strong>) are supported in `definition` and
     `useCase` fields — they will be rendered as HTML.
   • tradeoffs arrays: each entry is [label, displayed value, colour class]
       Colour classes:
         'val-low'  → green  (favourable — low complexity, low risk)
         'val-med'  → amber  (moderate)
         'val-high' → red    (unfavourable — high complexity, high risk)
   • resources arrays: each entry is [link text, URL]
       Leave URL as '' to show a placeholder chip instead of a live link.
       Replace '' with a full URL to make the chip clickable.

   HOW TO EDIT TOOLTIPS (TIPS):
   ─────────────────────────────
   • Each key matches a data-tip="key" attribute used in app.js.
   • `term` — short label shown at the top of the tooltip (all-caps).
   • `body` — explanatory paragraph shown below the term.
   • Do not remove or rename keys — they are referenced in app.js.
     You can safely change `term` and `body` text.

   ============================================================================= */


/* =============================================================================
   TIPS — tooltip definitions
   Keyed by the string passed to data-tip="..." in the rendered HTML.
   ============================================================================= */
const TIPS = {

  // ── Differential Privacy stats ─────────────────────────────────────────────

  'avg-abs-error': {
    term: 'Avg. Absolute Error',
    body: 'The average gap between the true count and the noisy count returned by the DP mechanism, across all query categories. For example, ±10 students means each reported group size is off by about 10 on average — sometimes over, sometimes under. This is the cost of privacy. Lower ε = more noise = larger error.'
  },

  'privacy-guarantee': {
    term: 'Privacy Guarantee (ε-DP)',
    body: 'ε (epsilon) bounds how much any single person\'s presence in the dataset can change the output. Formally: Pr[output | with you] ≤ eᵉ × Pr[output | without you]. Small ε (e.g., 0.1) means your record has almost no detectable effect on results. Large ε (e.g., 5.0) offers weaker protection.'
  },

  'reid-risk': {
    term: 'Individual Re-identification Risk',
    body: '"Bounded by ε" means the privacy guarantee mathematically caps how much information an adversary can extract about any single individual, regardless of what other data they possess. DP is the only technique that provides this kind of formal, adversary-agnostic bound.'
  },

  // ── Synthetic Data stats ───────────────────────────────────────────────────

  'stat-dist-preserved': {
    term: 'Statistical Distribution Preserved',
    body: 'The synthetic dataset reproduces the real dataset\'s statistical properties — means, variances, correlations, subgroup proportions — without containing any actual student records. Analysts can run the same code on synthetic data and get structurally similar results.'
  },

  'reid-risk-synth': {
    term: 'Re-identification Risk (Synthetic Data)',
    body: 'Because synthetic records are generated from a statistical model rather than copied from real individuals, no real person can be directly re-identified. However, if the model is poorly designed (e.g., memorizes outliers), some residual risk may remain — so generation quality matters.'
  },

  'ferpa-compliant': {
    term: 'FERPA Compliance',
    body: 'FERPA applies to "education records" — records that are directly related to a student and maintained by an institution. Properly generated synthetic data does not contain records about identifiable students and therefore is not subject to FERPA restrictions. This enables broader sharing with researchers.'
  },

  'share-publicly': {
    term: 'Public Shareability',
    body: 'Synthetic data can typically be released publicly or to unapproved parties because it contains no real student records. This unlocks use cases — like publishing datasets for reproducible research or training vendor tools — that are impossible with real data under FERPA.'
  },

  // ── Shared tradeoff dimension tooltips (used across all modules) ───────────

  'privacy-strength': {
    term: 'Privacy Strength',
    body: 'How robustly the technique protects individuals from re-identification or inference attacks. "Formal" means there is a mathematical proof bounding the risk (e.g., ε-DP, cryptographic security). "Heuristic" or "model-dependent" means protection is likely but not provably guaranteed.'
  },

  'data-utility': {
    term: 'Data Utility',
    body: 'How much analytical value is preserved after applying the privacy technique. High utility = results are close to what you\'d get from the raw data. Lower utility = more noise, suppression, or distortion, which can affect decision-making accuracy for small subgroups.'
  },

  'data-local': {
    term: 'Data Stays Local',
    body: 'Whether raw (identifiable) records leave the originating institution\'s custody. "Yes" means only outputs, tokens, gradients, or encoded representations are shared — not the underlying student data. This is often a key requirement for FERPA compliance and data sharing agreements.'
  },

  'third-party': {
    term: 'Trusted Third Party Required',
    body: 'Whether the technique requires trusting an external entity — a cloud vendor, a coordinator server, a vault operator, or hardware manufacturer — to behave honestly. "No" means the privacy guarantee holds even if all parties are adversarial. "Yes" introduces an additional trust assumption.'
  },

  'impl-complexity': {
    term: 'Implementation Complexity',
    body: 'The engineering, operational, and governance burden required to deploy the technique correctly. Low complexity = drop-in tools exist, staff can implement with minimal training. High complexity = requires specialized cryptographers, significant infrastructure investment, or ongoing calibration.'
  },

  // Output type dimension — used in every module's tradeoff row
  'output-type': {
    term: 'Output Type',
    body: 'Whether the technique returns aggregate statistics (counts, averages, rates) or individual-level records. Aggregate-only outputs carry much lower re-identification risk. Individual record outputs require additional privacy controls. This distinction is critical for FERPA compliance: releasing individual records requires either de-identification or a data sharing agreement.'
  },

  // ── PPRL-specific ──────────────────────────────────────────────────────────

  'bloom-filter': {
    term: 'Bloom Filter Encoding (PPRL)',
    body: 'A Bloom filter is a probabilistic data structure that encodes a set of values (e.g., name + DOB) as a fixed-length bit array. Two Bloom filters can be compared for similarity without revealing the original values. PPRL uses these as privacy-preserving record fingerprints.'
  },

  'match-signal': {
    term: 'Match Signal',
    body: 'In PPRL, only a boolean signal (match/no-match) or a similarity score crosses the agency boundary — not the underlying PII. The match is computed on encoded representations, so neither party can reconstruct the other\'s data from what they receive.'
  },

  // ── MPC-specific ───────────────────────────────────────────────────────────

  'secret-share': {
    term: 'Secret Share',
    body: 'Secret sharing splits a private value into multiple random-looking "shares" distributed to different parties. No single share reveals anything about the original value. Only by combining a threshold of shares can the result be reconstructed — and in MPC, this reconstruction happens implicitly through the computation.'
  },

  'mpc-result': {
    term: 'Computed Result (MPC)',
    body: 'The output of a secure multi-party computation is exactly what the parties agreed to compute — an average, sum, ranking, etc. — with no additional information leaked. This is the key property: you learn the answer to the agreed question and nothing else about the other parties\' inputs.'
  },

  // ── Federated Learning-specific ────────────────────────────────────────────

  'gradient-update': {
    term: 'Gradient Update (Federated Learning)',
    body: 'A gradient is a vector of small numbers describing how a model\'s weights should change to improve its predictions on the local data. Sharing gradients instead of raw records reduces exposure, but gradients can still leak information — which is why DP is often added on top of federated learning.'
  },

  'global-model': {
    term: 'Global Model',
    body: 'The central model that aggregates gradient updates from all participating institutions via an averaging algorithm (typically FedAvg). It improves with each round of training without any institution\'s data ever leaving their servers. The model itself is not private — only the training data is.'
  },

  // ── TEE-specific ───────────────────────────────────────────────────────────

  'tee-attestation': {
    term: 'Cryptographic Attestation (TEE)',
    body: 'Attestation is the process by which a TEE (e.g., Intel SGX, ARM TrustZone) cryptographically proves to a remote party that: (1) it is running genuine, unmodified hardware; and (2) the specific code loaded into the enclave is exactly what was expected. Without a valid attestation signature, a client should refuse to send sensitive data.'
  },

  // ── Homomorphic Encryption-specific ───────────────────────────────────────

  'ciphertext': {
    term: 'Ciphertext',
    body: 'An encrypted version of data that is mathematically unreadable without the decryption key. In homomorphic encryption, the key property is that you can perform arithmetic operations (addition, multiplication) directly on ciphertext — producing an encrypted result that, when decrypted, equals what you would have gotten from computing on the plaintext.'
  },

  'he-formal': {
    term: 'Formal Cryptographic Guarantee (HE)',
    body: 'Homomorphic encryption provides a cryptographic security guarantee: without the private key, an adversary cannot learn anything about the plaintext data from the ciphertext, even with unlimited computational power (in the case of information-theoretically secure schemes) or in practice (for computationally secure schemes like BFV, CKKS, BGV).'
  },

  // ── Tokenization-specific ──────────────────────────────────────────────────

  'token-vault': {
    term: 'Token Vault',
    body: 'The vault is a secure, access-controlled database that stores the mapping between tokens and their corresponding PII. It is the single point of re-identification. Vault security — access controls, audit logs, breach detection — is therefore the central privacy control in a tokenization system.'
  },

  'format-preserving': {
    term: 'Format-Preserving Token',
    body: 'A format-preserving token looks like the original value type — a token replacing a student ID number might also look like an ID number. This allows tokenized data to be used in existing systems without schema changes, making tokenization easier to deploy operationally than encryption.'
  },

  // ── k-Anonymity-specific ───────────────────────────────────────────────────

  'k-anon-threshold': {
    term: 'k-Anonymity Threshold',
    body: 'k is the minimum group size for any combination of quasi-identifying attributes. With k=5, every combination of (age range, ZIP prefix, gender) must appear in at least 5 records. Groups smaller than k must be suppressed or further generalized. Larger k = stronger protection, but more data loss.'
  },

  'quasi-id': {
    term: 'Quasi-Identifier',
    body: 'A quasi-identifier is an attribute that alone is not identifying but which, combined with other attributes or external datasets, could single out an individual. Examples: age range, ZIP code, gender, disability category. k-anonymity groups records on quasi-identifiers to prevent singling out.'
  },

  // ── DP mechanism detail ────────────────────────────────────────────────────

  'laplace-noise': {
    term: 'Laplace Noise',
    body: 'The Laplace distribution is a bell-shaped probability distribution centered at zero. DP draws a random value from it and adds that to the true count. The scale (width) of the distribution equals 1/ε — so a smaller ε produces a wider distribution with larger noise values (stronger privacy). The noise is symmetric: equally likely to add or subtract from the true value.'
  },

  // ── Local DP-specific ──────────────────────────────────────────────────────

  'randomized-response': {
    term: 'Randomized Response',
    body: 'Randomized response (Warner 1965) is the original Local DP mechanism. Each person answers truthfully with probability p, and randomly with probability 1−p. Because the collector can\'t tell which responses are truthful, no individual can be identified — but the aggregate true rate can be mathematically recovered from the known flip probabilities.'
  },

  'ldp-correction': {
    term: 'Aggregate Correction Formula',
    body: 'Even though individual answers are noisy, the true aggregate rate can be estimated using: true_rate ≈ (observed_rate − (1−p)/2) / (2p − 1). This works because the noise is structured and its statistical properties are known. The correction becomes less accurate with smaller sample sizes.'
  },

  'local-vs-global': {
    term: 'Local vs. Global DP',
    body: 'Global DP: institution collects true data, adds noise before release — requires trusting the collector. Local DP: each person adds noise on their own device before submission — the collector never sees true values, so even a malicious or breached server learns nothing about individuals. Local DP provides stronger privacy but requires more noise (lower utility) to achieve the same ε guarantee.'
  },

}; // end TIPS


/* =============================================================================
   CONTENT — all module text, tradeoff values, and resource links

   Structure:
     CONTENT.<moduleKey> = {
       tag, title, definition, useCase, tradeoffs, resources,
       ...module-specific simulation data (schools, steps, institutions, etc.)
     }

   Module keys: dp | pprl | mpc | fl | synth | tee | he | tok | trad
   ============================================================================= */
const CONTENT = {

  // ── Module 1: Differential Privacy ────────────────────────────────────────
  //
  // This module has two sub-variants accessed via tabs: Global DP and Local DP.
  // 'global' and 'local' keys hold the text for each tab independently.
  // Shared fields (tag, title, definition, resources) appear above the tabs.
  dp: {
    tag:   'Module 1 of 8',
    title: 'Differential Privacy',

    // Shared intro shown above the Global / Local tabs
    definition: 'Differential privacy adds carefully calibrated <em>random noise</em> to query results so that no single person\'s data can be inferred — while still allowing accurate analysis of the group. The <em>privacy budget</em> (ε, "epsilon") controls this tradeoff: a small ε means more noise and stronger privacy; a large ε means less noise and higher accuracy but weaker privacy. There are two main variants — <strong>Global DP</strong> and <strong>Local DP</strong> — that differ in <em>where</em> the noise is added and how much trust is required.',

    resources: [
      // Foundational federal standard — evaluating DP claims, the DP pyramid, privacy hazards
      ['Guidelines for Evaluating Differential Privacy Guarantees (NIST SP 800-226)', 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-226.pdf'],
      // NIST practitioner blog series — accessible introduction for non-cryptographers
      ['Differential Privacy Blog Series', 'https://www.nist.gov/blogs/cybersecurity-insights/differential-privacy-privacy-preserving-data-analysis-introduction-our'],
      // Open-source DP library from Harvard — used by Census Bureau and researchers
      ['OpenDP: Open-Source Differential Privacy Library (Harvard / Microsoft)', 'https://opendp.org'],
      // Lessons from the 2020 Census DP deployment — practical pitfalls for statistical agencies
      ['Implementing Differential Privacy: Seven Lessons From the 2020 US Census', 'https://hdsr.mitpress.mit.edu/pub/dgg03vo6'],
      // Non-technical primer — best intro for policy/legal audiences
      ['Differential Privacy: A Primer for a Non-Technical Audience — Wood et al.', 'https://privacytools.seas.harvard.edu/files/privacytools/files/pedagogical-document-dp_new.pdf'],
    ],

    // ── Global DP tab ────────────────────────────────────────────────────────
    // Noise is added by a trusted curator AFTER collecting true data.
    // The individual trusts the institution; the institution protects the aggregate.
    global: {
      label:     'Global DP',
      useCase:   'An SLDS analyst queries "How many students by grade level tested below proficiency?" — DP returns a useful count without exposing any individual student\'s record.',
      trustNote: 'The institution (SEA, SLDS) is trusted to collect true data and apply noise correctly before releasing results. Individuals must trust the data collector.',

      // Animated walkthrough step labels.
      // Step 3 has a Laplace tooltip attached in app.js — keep that step at index 2.
      steps: [
        'Analyst submits query',
        'True result computed from raw records',
        'Laplace noise sampled (scale = 1/ε)',
        'Noisy aggregate returned to analyst',
      ],

      tradeoffs: [
        ['Privacy strength',          'Tunable (ε)',    'val-med'],
        ['Data utility',              'Moderate–High',  'val-med'],
        ['Data stays local?',         'Yes',            'val-low'],
        ['3rd party needed?',         'No',             'val-low'],
        ['Implementation complexity', 'Medium',         'val-med'],
        ['Output type',               '*TBD*',          'val-med'],
      ],
    },

    // ── Local DP tab ─────────────────────────────────────────────────────────
    // Noise is added by each INDIVIDUAL before their data ever leaves their device.
    // The data collector never sees true values — not even the institution is trusted.
    local: {
      label:     'Local DP',
      useCase:   'A district surveys students about sensitive experiences (e.g., bullying). Each student\'s device applies randomized response before submission — so the district receives plausibly-deniable answers and can never know any individual\'s true response.',
      trustNote: 'No trust in the data collector is required. Each individual\'s device adds noise locally. Even a malicious or breached server learns nothing about any specific person.',

      // Labels for the animated Local DP walkthrough steps
      steps: [
        'Student sees sensitive question on their device',
        'Device applies randomized response (coin flip)',
        'Privatised answer submitted — true value never leaves device',
        'Collector aggregates noisy answers and corrects for known flip rate',
      ],

      // Randomized response parameters shown in the simulation.
      // p = probability of answering truthfully (the "honest coin").
      // Correction formula: true_rate ≈ (observed_rate - (1-p)/2) / (p - (1-p)/2)
      // Edit this value (0.5–1.0) to change the demo; 0.7 = 70% truthful.
      flipProbability: 0.7,

      tradeoffs: [
        ['Privacy strength',          'Very High',          'val-low'],
        ['Data utility',              'Lower (more noise)', 'val-high'],
        ['Data stays local?',         'Yes — always',       'val-low'],
        ['3rd party needed?',         'No',                 'val-low'],
        ['Implementation complexity', 'Low–Medium',         'val-low'],
        ['Output type',               '*TBD*',          'val-med'],
      ],
    },
  },

  // ── Module 2: Privacy-Preserving Record Linkage ────────────────────────────
  pprl: {
    tag:        'Module 2 of 8',
    title:      'Privacy-Preserving Record Linkage',
    definition: 'PPRL lets two agencies find the same individuals across datasets by comparing <em>encoded identifiers</em> (such as Bloom filters) — without either party revealing the underlying names, dates of birth, or other PII to the other.',
    useCase:    'An SLDS links K–12 enrollment records to postsecondary enrollment and workforce data to track long-term outcomes, without a shared student ID and without exchanging personally identifiable information.',

    tradeoffs: [
      ['Privacy strength',          'High',                   'val-low'],
      ['Data utility',              'High (linkage)',          'val-low'],
      ['Data stays local?',         'Yes (hashes only)',       'val-low'],
      ['3rd party needed?',         'Optional',               'val-med'],
      ['Implementation complexity', 'Medium–High',            'val-med'],
      ['Output type',               '*TBD*',          'val-med'],
    ],

    resources: [
      // NIH/NIA strategy and recommendations report — practical PPRL for government agencies
      ['PPRL Strategy and Recommendations — NIH National Institute on Aging', 'https://www.nia.nih.gov/sites/default/files/2023-08/pprl-linkage-strategies-preliminary-report.pdf'],
      // UK ONS open-source PPRL toolkit — Bloom filters + secure cloud enclave, Python
      ['Developing a Privacy-Preserving Record Linkage Toolkit — UK ONS Data Science Campus', 'https://datasciencecampus.ons.gov.uk/developing-a-privacy-preserving-record-linkage-toolkit/'],
      // Foundational paper introducing Bloom filter PPRL (Schnell et al. 2009)
      ['Privacy-Preserving Record Linkage Using Bloom Filters — Schnell, Bachteler & Reiher (BMC)', 'https://www.researchgate.net/publication/26766263_Privacy-preserving_record_linkage_using_Bloom_filters'],
      // Practical PPRL intro from Thoughtworks Technology Radar
      ['Privacy-Preserving Record Linkage Using Bloom Filter — Thoughtworks Technology Radar', 'https://www.thoughtworks.com/radar/techniques/privacy-preserving-record-linkage-pprl-using-bloom-filter'],
    ],
  },

  // ── Module 3: Secure Multi-Party Computation ──────────────────────────────
  mpc: {
    tag:        'Module 3 of 8',
    title:      'Secure Multi-Party Computation',
    definition: 'MPC allows multiple parties to jointly compute a result over their combined data — such as a district average or a merged statistic — without any party revealing their private input to the others.',
    useCase:    'Three school districts want to compute a regional graduation rate to benchmark against state targets, without sharing their individual student outcome data.',

    // School cards shown in the simulation — edit name, score, or color freely.
    // color values must be valid CSS (var(--coral), var(--blue), var(--amber), etc.)
    schools: [
      { name: 'Westview HS',   score: 74, color: 'var(--coral)' },
      { name: 'Lakeside MS',   score: 68, color: 'var(--blue)'  },
      { name: 'North Academy', score: 81, color: 'var(--amber)' },
    ],

    tradeoffs: [
      ['Privacy strength',          'High',          'val-low'],
      ['Data utility',              'Exact result',  'val-low'],
      ['Data stays local?',         'Yes',           'val-low'],
      ['3rd party needed?',         'No',            'val-low'],
      ['Implementation complexity', 'Very High',     'val-high'],
      ['Output type',               '*TBD*',          'val-med'],
    ],

    resources: [
      // Free textbook — the definitive practical introduction to MPC, widely used in courses
      ['A Pragmatic Introduction to Secure Multi-Party Computation — Evans, Kolesnikov & Rosulek (free PDF)', 'https://www.cs.virginia.edu/~evans/pragmaticmpc/pragmaticmpc.pdf'],
      // Accessible CACM article — best short explainer for a policy/analyst audience
      ['Secure Multiparty Computation (CACM 2021) — Yehuda Lindell', 'https://eprint.iacr.org/2020/300.pdf'],
      // Statistics Canada introduction — government-framed MPC explainer with use cases
      ['Introduction to Privacy-Enhancing Cryptographic Techniques: Secure MPC — Statistics Canada', 'https://www.statcan.gc.ca/en/data-science/network/multiparty-computation'],
    ],
  },

  // ── Module 4: Federated Learning ──────────────────────────────────────────
  fl: {
    tag:        'Module 4 of 8',
    title:      'Federated Learning',
    definition: 'Federated learning trains a shared machine learning model across multiple institutions, each keeping their data local. Only model <em>updates</em> (gradients) — not raw records — are shared with a central coordinator.',
    useCase:    'Multiple states train an early-warning indicator model for student dropout risk. Each state\'s student data never leaves its servers; only statistical model updates are pooled to improve prediction for all.',

    // Labels for the four institution nodes in the network diagram.
    // Use \n for line breaks within a node label.
    institutions: [
      'State A\nDept. of Ed',
      'State B\nDept. of Ed',
      'State C\nDept. of Ed',
      'State D\nDept. of Ed',
    ],

    tradeoffs: [
      ['Privacy strength',          'Medium–High',               'val-med'],
      ['Data utility',              'High (ML)',                 'val-low'],
      ['Data stays local?',         'Yes',                       'val-low'],
      ['3rd party needed?',         'Coordinator',               'val-med'],
      ['Implementation complexity', 'High',                      'val-high'],
      ['Output type',               '*TBD*',          'val-med'],
    ],

    resources: [
      // Original FedAvg paper — foundational reading, surprisingly accessible
      ['Communication-Efficient Learning of Deep Networks from Decentralized Data (FedAvg) — McMahan et al.', 'https://arxiv.org/abs/1602.05629'],
      // Google AI blog — non-technical introduction to federated learning
      ['Federated Learning: Collaborative Machine Learning without Centralized Training Data — Google AI Blog', 'https://ai.googleblog.com/2017/04/federated-learning-collaborative.html'],
      // Flower framework — leading open-source FL framework for practitioners
      ['Flower: A Friendly Federated Learning Framework (open source)', 'https://flower.ai'],
      // OpenMined PySyft — privacy-preserving ML library including FL
      ['PySyft / OpenMined: Privacy-Preserving ML Library', 'https://openmined.org'],
    ],
  },

  // ── Module 5: Synthetic Data Generation ───────────────────────────────────
  synth: {
    tag:        'Module 5 of 8',
    title:      'Synthetic Data Generation',
    definition: 'Synthetic data is artificially generated to match the <em>statistical properties</em> of a real dataset — distributions, correlations, and patterns — while containing no records from real individuals, eliminating re-identification risk.',
    useCase:    'A state education agency releases a synthetic version of its longitudinal student dataset so researchers can build and test analytic tools without accessing any real student records.',

    tradeoffs: [
      ['Privacy strength',          'Very High',                       'val-low'],
      ['Data utility',              'Medium (no individual records)',  'val-med'],
      ['Data stays local?',         'Synthetic can be shared',         'val-low'],
      ['3rd party needed?',         'No',                              'val-low'],
      ['Implementation complexity', 'Medium–High',                    'val-med'],
      ['Output type',               '*TBD*',          'val-med'],
    ],

    resources: [
      ['Piloting Synthetic Data in Your Organization: A How-To Guide — MDI / Georgetown', 'https://georgetown.app.box.com/s/zmq1b61sybzm8yd4zct9qjzxqtitql84'],
      ['Synthesizing Workforce and Education Data Using an Open Source Tool: Lessons Learned — MDI / Georgetown', 'https://georgetown.app.box.com/s/azphzj3777cbxbhtx0m1qetdwiq5pckx'],
      ['Understanding Synthetic Data — Urban Institute', 'https://www.urban.org/research/publication/understanding-synthetic-data'],
      ['Generating a Fully Synthetic Human Services Dataset — Urban Institute', 'https://www.urban.org/research/publication/generating-fully-synthetic-human-services-dataset'],
      ['Analyzing the Privacy and Utility Trade-off for Synthetic Datasets with Imbalanced Demographic Groups — Urban Institute', 'https://urban-institute.medium.com/analyzing-the-privacy-and-utility-tradeoff-for-synthetic-datasets-with-imbalanced-demographic-c8968cc5d0a1'],
    ],
  },

  // ── Module 6: Trusted Execution Environments ──────────────────────────────
  tee: {
    tag:        'Module 6 of 8',
    title:      'Trusted Execution Environments',
    definition: 'A TEE (or "secure enclave") is a hardware-isolated computing zone where data is <em>encrypted even from the cloud provider or system administrator</em>. Code runs in the enclave, data enters encrypted, and only approved results leave.',
    useCase:    'A secure research platform (like SafeInsights) lets approved researchers run statistical analyses on sensitive student records stored in an enclave — without anyone, including the platform operator, being able to view the raw data.',

    // Text for the amber callout box shown below the diagram
    keyProperty: 'Even the cloud provider hosting the server cannot read the data inside the enclave. The hardware enforces isolation through cryptographic attestation.',

    tradeoffs: [
      ['Privacy strength',          'Very High',                     'val-low'],
      ['Data utility',              'High (any computation)',        'val-low'],
      ['Data stays local?',         'In enclave (encrypted)',        'val-low'],
      ['3rd party needed?',         'Hardware provider',            'val-med'],
      ['Implementation complexity', 'Very High',                    'val-high'],
      ['Output type',               '*TBD*',          'val-med'],
    ],

    resources: [
      // FPF policy report — best resource for policy audience on TEEs and confidential computing
      ['Confidential Computing and Privacy: Policy Implications of Trusted Execution Environments — Future of Privacy Forum (2024)', 'https://fpf.org/wp-content/uploads/2025/04/FPF_Confidential_Computing_Digital_R3_-_2025_Update.pdf'],
      // CCC overview whitepaper — industry definition and use cases
      ['Confidential Computing: Hardware-Based Trusted Execution for Applications and Data — Confidential Computing Consortium', 'https://confidentialcomputing.io/wp-content/uploads/sites/10/2023/03/CCC_Overview.pdf'],
      // CCC technical analysis — deeper technical detail with threat model
      ['A Technical Analysis of Confidential Computing — Confidential Computing Consortium', 'https://confidentialcomputing.io/wp-content/uploads/sites/10/2023/03/CCC-A-Technical-Analysis-of-Confidential-Computing-v1.3_unlocked.pdf'],
      // CCC accessible blog post explaining TEEs for non-specialists
      ['Basics of Trusted Execution Environments — Confidential Computing Consortium blog', 'https://confidentialcomputing.io/2024/03/13/basics-of-trusted-execution-environments-tees-the-heart-of-confidential-computing/'],
    ],
  },

  // ── Module 7: Homomorphic Encryption ──────────────────────────────────────
  he: {
    tag:        'PET Module 7 of 8',
    title:      'Homomorphic Encryption',
    definition: 'Homomorphic encryption (HE) allows a server to perform computations — additions, averages, comparisons — directly on <em>encrypted data</em>, returning an encrypted result. The server never sees the plaintext values at any point.',
    useCase:    'An SEA outsources analytics to a cloud vendor. Student records are encrypted before upload; the vendor computes aggregate statistics on ciphertext and returns encrypted results that only the SEA can decrypt — the vendor learns nothing about individual students.',

    // Text for the coral warning callout about FHE performance limitations
    practicalNote: 'Fully homomorphic encryption (FHE) is computationally expensive — 1,000–1,000,000× slower than plaintext computation. Partially homomorphic schemes (PHE, supporting only addition or only multiplication) are more practical today. Active area of standardization work.',

    tradeoffs: [
      ['Privacy strength',          'Very High',                          'val-low'],
      ['Data utility',              'High (any aggregation)',             'val-low'],
      ['Data stays local?',         'Encrypted at rest/transit',         'val-low'],
      ['3rd party needed?',         'Cloud vendor (sees only ciphertext)', 'val-med'],
      ['Implementation complexity', 'Very High',                         'val-high'],
      ['Output type',               '*TBD*',          'val-med'],
    ],

    resources: [
      // Industry standardization body — overview of HE schemes and open-source libraries
      ['Homomorphic Encryption Standardization — Introduction and Open Libraries', 'https://homomorphicencryption.org/introduction/'],
      // Internet Society policy brief — practical limitations and policy implications, non-technical
      ['Homomorphic Encryption: What Is It, and Why Does It Matter? — Internet Society', 'https://www.internetsociety.org/resources/doc/2023/homomorphic-encryption/'],
      // FPF issue brief — HE applied to cross-border fraud detection (concrete use case)
      ['PETs Use Case: Preventing Financial Fraud with Fully Homomorphic Encryption — FPF', 'https://fpf.org/wp-content/uploads/2023/04/FPF-FHE-Issue-Brief-April-2023.pdf'],
      // Microsoft SEAL — leading open-source HE library (BFV/CKKS)
      ['Microsoft SEAL: Open-Source Homomorphic Encryption Library', 'https://github.com/microsoft/SEAL'],
    ],
  },

  // ── Module 8: Tokenization ─────────────────────────────────────────────────
  tok: {
    tag:        'PET Module 8 of 8',
    title:      'Tokenization',
    definition: 'Tokenization replaces sensitive identifiers — names, SSNs, student IDs — with opaque <em>random tokens</em> stored in a secure vault. Systems can process and link records using tokens without ever touching the underlying PII. Only an authorized vault lookup can reverse a token.',
    useCase:    'A state replaces student SSNs and names with tokens before sharing data with postsecondary and workforce partners. Each partner works with tokens; only the state vault can re-link tokens to real identities for authorized purposes.',

    // Text for the blue informational callout comparing tokenization vs. encryption
    comparisonNote: 'Encrypted data can be decrypted by anyone with the key. Tokenization separates the mapping into a vault with its own access controls — a breach of tokenized data is far less valuable without vault access. Tokens are also format-preserving (e.g., a token can look like an ID), enabling drop-in replacement.',

    tradeoffs: [
      ['Privacy strength',          'High (vault-dependent)',         'val-low'],
      ['Data utility',              'High (operational use)',         'val-low'],
      ['Data stays local?',         'Tokenized data shareable',      'val-low'],
      ['3rd party needed?',         'Vault operator',                'val-med'],
      ['Implementation complexity', 'Low–Medium',                    'val-low'],
      ['Output type',               '*TBD*',          'val-med'],
    ],

    resources: [
      // Cloud Security Alliance best practices guide for tokenization implementers
      ['Best Practices in Data Tokenization — Cloud Security Alliance', 'https://cloudsecurityalliance.org/articles/best-practices-in-data-tokenization'],
      // NIST SP 800-122 — federal guide to protecting PII, covers tokenization in context
      ['Guide to Protecting the Confidentiality of PII (NIST SP 800-122)', 'https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-122.pdf'],
      // NIST 800-175B — cryptographic mechanisms for federal government, including FPE
      ['Guideline for Using Cryptographic Standards in the Federal Government (NIST SP 800-175B Rev 1)', 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-175Br1.pdf'],
    ],
  },

  // ── Traditional De-identification ─────────────────────────────────────────
  //
  // This module is structured differently: instead of a single simulation,
  // it renders a set of sub-techniques, each with its own description,
  // strengths, limitations, and resources.
  trad: {
    tag:        'Traditional De-identification',
    title:      'Traditional De-identification Methods',
    definition: 'Before modern PETs, agencies relied on a set of classical statistical disclosure limitation (SDL) techniques to reduce re-identification risk in released data. These methods are widely understood, operationally simple, and still foundational — but they provide <em>no formal mathematical privacy guarantees</em> and are increasingly vulnerable to modern re-identification attacks.',
    useCase:    'FERPA\'s de-identification provisions and NCES statistical standards rely heavily on these techniques for releasing public-use microdata files and aggregate statistics from SLDS and survey datasets.',

    // Each sub-technique is rendered as its own card.
    // Add new entries here to add new cards; edit or remove to update existing ones.
    techniques: {

      suppression: {
        title:       'Cell Suppression',
        description: 'When a cell value is too small (e.g., fewer than 10 students), it is suppressed (replaced with an asterisk or redacted). <em>Complementary suppression</em> also removes additional cells to prevent back-calculation of the suppressed value.',
        strengths: [
          'Simple to implement',
          'Well-understood by staff',
          'Required by many federal standards (NCES, FERPA)',
          'No data distortion',
        ],
        limitations: [
          'Can still allow inference via subtraction',
          'No formal privacy guarantee',
          'Reduces data utility for small subgroups',
          'Threshold (n=10) is arbitrary',
        ],
        resources: [
          // FCSM Statistical Policy Working Paper 22 — the federal standard on statistical disclosure limitation
          ['Report on Statistical Disclosure Limitation Methodology (FCSM SPWP-22) — OMB/NCES', 'https://nces.ed.gov/FCSM/pdf/SPWP22_rev.pdf'],
          // NCES Forum guide — SLDS-specific privacy and suppression guidance
          ['Traveling Through Time: Forum Guide to LDS — Chapter 7: Privacy and Confidentiality — NCES', 'https://nces.ed.gov/forum/ldsguide/book3/ch_7.asp'],
          // NCES statistical standards — confidentiality procedures actually used at NCES
          ['NCES Statistical Standards: Maintaining Confidentiality (Standard 4-2)', 'https://nces.ed.gov/statprog/2002/std4_2.asp'],
        ],
      },

      masking: {
        title:       'Data Masking',
        description: 'Direct identifiers are obscured — partially (showing only a portion of a value) or fully (replacing with a placeholder). Unlike tokenization, masking is typically <em>one-way</em> — the original value cannot be recovered from the masked version.',
        strengths: [
          'Intuitive and auditable',
          'Granular field-level control',
          'Irreversible (one-way)',
          'Low implementation cost',
        ],
        limitations: [
          'Cannot link masked records',
          'Quasi-identifiers may persist',
          'No formal guarantee against re-identification',
          'Combination attacks still possible',
        ],
        resources: [
          // NIST SP 800-122 — federal PII guide covering masking and protection techniques
          ['Guide to Protecting the Confidentiality of PII (NIST SP 800-122)', 'https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-122.pdf'],
          // NCES Forum guide on data stewardship — covers masking in the SLDS context
          ['Data Stewardship: Managing PII in Student Education Records — NCES SLDS Technical Brief', 'https://nces.ed.gov/pubs2011/2011602.pdf'],
        ],
      },

      generalization: {
        title:       'Generalization',
        description: 'Precise values are replaced with less-specific ranges or categories, reducing the distinguishing power of each attribute. The data remains analytically useful while making individual re-identification harder.',
        strengths: [
          'Data remains interpretable',
          'Supports k-anonymity construction',
          'Widely used in FERPA data releases',
          'Adjustable precision tradeoff',
        ],
        limitations: [
          'Reduces analytical precision',
          'Combination of generalized fields can still re-identify',
          'No formal privacy proof',
          'Hierarchy design requires judgment',
        ],
        resources: [
          // FCSM SPWP-22 — covers generalization and data rolling-up methods
          ['Report on Statistical Disclosure Limitation Methodology (FCSM SPWP-22) — OMB/NCES', 'https://nces.ed.gov/FCSM/pdf/SPWP22_rev.pdf'],
          // UN PET Guide — section on generalization and quasi-identifiers for official statistics
          ['The PET Guide: Privacy-Enhancing Technologies for Official Statistics — United Nations (2023)', 'https://unstats.un.org/bigdata/task-teams/privacy/guide/2023_UN%20PET%20Guide.pdf'],
        ],
      },

      perturbation: {
        title:       'Perturbation (Data Swapping / Noise Addition)',
        description: 'Small random changes are applied to individual records — swapping values between records, or adding bounded random noise — while preserving aggregate statistics. <em>Unlike differential privacy</em>, perturbation has no formal bound on how much privacy it provides.',

        // Text for the amber callout box comparing DP and perturbation
        dpNote: 'Differential privacy is a formalized, mathematically guaranteed version of perturbation — with a provable privacy budget (ε). Traditional perturbation provides no such bound; the privacy protection is heuristic only.',

        strengths: [
          'Preserves aggregate statistics',
          'Simple to explain',
          'Low implementation cost',
          'Long track record in federal surveys',
        ],
        limitations: [
          'No formal privacy guarantee',
          'May degrade utility unpredictably',
          'Vulnerable to differencing attacks',
          'DP is strictly superior',
        ],
        resources: [
          // FCSM SPWP-22 — covers noise addition / data disturbing as a federal SDL method
          ['Report on Statistical Disclosure Limitation Methodology (FCSM SPWP-22) — OMB/NCES', 'https://nces.ed.gov/FCSM/pdf/SPWP22_rev.pdf'],
          // NIST SP 800-226 — explains why DP is a formalisation of perturbation (useful contrast)
          ['Guidelines for Evaluating Differential Privacy Guarantees (NIST SP 800-226)', 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-226.pdf'],
        ],
      },

      kanon: {
        title:       'k-Anonymity',
        description: 'A dataset satisfies <em>k-anonymity</em> when every combination of quasi-identifiers (age, ZIP, gender, etc.) matches at least k records. No individual can be singled out from a group smaller than k. Common extensions include <em>l-diversity</em> (sensitive attributes must vary within each group) and <em>t-closeness</em>.',
        strengths: [
          'Intuitive guarantee: "lost in a crowd"',
          'Well-established in literature',
          'Used in HIPAA Safe Harbor method',
          'Supports microdata releases',
        ],
        limitations: [
          'Vulnerable to homogeneity attacks',
          'Background knowledge attacks can defeat it',
          'No protection against attribute inference',
          'DP provides stronger guarantees',
        ],
        resources: [
          // Samarati & Sweeney 1998 original k-anonymity paper (freely available)
          ['Protecting Privacy when Disclosing Information: k-Anonymity and Its Enforcement — Samarati & Sweeney', 'https://dataprivacylab.org/dataprivacy/projects/kanonymity/paper3.pdf'],
          // OECD emerging PETs report 2023 — covers k-anonymity and its limitations vs. formal PETs
          ['Emerging Privacy-Enhancing Technologies: Current Regulatory and Policy Approaches — OECD (2023)', 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2023/03/emerging-privacy-enhancing-technologies_a6bdf3cb/bf121be4-en.pdf'],
        ],
      },

    }, // end techniques
  },

}; // end CONTENT
