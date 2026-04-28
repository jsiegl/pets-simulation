/* =============================================================================
   Privacy Enhancing Technologies — Interactive Guide
   content.js

   ╔══════════════════════════════════════════════════════════════════════════╗
   ║  THIS IS THE ONLY FILE YOU NEED TO EDIT FOR CONTENT CHANGES.             ║
   ║                                                                          ║
   ║  It contains two objects:                                                ║
   ║    • TIPS    — hover/click tooltip definitions (term + body copy)        ║
   ║    • CONTENT — all page and module text: about page copy, titles,        ║
   ║                definitions, use cases, step labels, tradeoff values,     ║
   ║                notes, and resource links                                 ║
   ║                                                                          ║
   ║  The simulation logic (animations, charts, interactivity) lives in       ║
   ║  app.js and does NOT need to be touched when updating copy.              ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   HOW TO EDIT CONTENT:
   ─────────────────────
   • Any string value can be changed freely.
   • Inline HTML tags (<a>, <em>, <strong>) are supported in paragraph fields
     and will be rendered as HTML.
   • tradeoffs arrays: each entry is [label, displayed value, colour class]
       Colour classes:
         'val-low'  → green  (favourable — low complexity, low risk)
         'val-med'  → amber  (moderate)
         'val-high' → red    (unfavourable — high complexity, high risk)
   • resources arrays: each entry is [link text, URL]
       Leave URL as '' to show a placeholder chip instead of a live link.
       Replace '' with a full URL to make the chip clickable.
   • notes string: an HTML string rendered inside the collapsed "📝 Notes" accordion
       above the Resources section in each module. Supports inline tags (<em>,
       <strong>, <ul>, <li>). Set to '' to show a "No notes added yet" placeholder.

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
    body: 'Even though individual answers are noisy, the true aggregate rate can be estimated using: true_rate ≈ (observed_rate − (1−p)/2) / p. This works because the noise is structured and its statistical properties are known. The correction becomes less accurate with smaller sample sizes.'
  },

  'local-vs-global': {
    term: 'Local vs. Global DP',
    body: 'Global DP: institution collects true data, adds noise before release — requires trusting the collector. Local DP: each person adds noise on their own device before submission — the collector never sees true values, so even a malicious or breached server learns nothing about individuals. Local DP provides stronger privacy but requires more noise (lower utility) to achieve the same ε guarantee.'
  },

}; // end TIPS


/* =============================================================================
   CONTENT — about page copy and all module text, tradeoff values, and resource links

   Structure:
     CONTENT.about  — landing / about page (displayed on first load; return by
                       clicking the logo or site title in the header)
     CONTENT.<moduleKey> — {
       tag, title, definition, useCase, tradeoffs, notes, resources,
       ...module-specific simulation data (schools, steps, institutions, etc.)
     }

   Module keys: dp | pprl | mpc | fl | synth | tee | he | tok | trad
   ============================================================================= */
const CONTENT = {

  // ── About / Home page ──────────────────────────────────────────────────────
  //
  // Displayed on first load and whenever the user clicks the logo or the
  // site title in the header. All copy lives here so it can be updated without
  // touching app.js. `paragraphs` is an array rendered in order; `disclaimer`
  // is separated so it can receive distinct callout styling.
  about: {
    eyebrow:  '',
    title:    'Privacy Enhancing Technologies in Education — Interactive Guide',
    subtitle: 'An experimental companion tool · April 2026 · v2026-04-27b',

    paragraphs: [
      'This interactive tool grew out of a personal side project exploring how generative AI coding assistants can be used to build more intuitive ways of understanding complex technical ideas—alongside a broader effort to learn more about privacy-enhancing technologies (PETs).',

      'The project began as an experiment: taking concepts that are often abstract or mathematically defined and translating them into something more visual, interactive, and scenario-driven. Privacy-enhancing technologies—such as secure multiparty computation, differential privacy, and synthetic data—offer meaningful ways to enable data use while reducing risks to individuals, but they are often difficult to compare or reason about in practical terms. This prototype uses AI-assisted development workflows (including tools like Claude Code and Claude Artifacts) to generate simplified examples, visualizations, and guided explanations that make these ideas easier to engage with.',

      'The current version is intentionally exploratory. It is designed less as a definitive resource and more as a working model for how interactive, AI-supported tools might improve conceptual understanding and decision-making around complex systems. The focus is on accessibility and intuition rather than technical completeness or formal guidance.',

      'The tool is being shared with a limited audience for feedback on both the substance and the format. Input at this stage will help determine whether this approach—combining AI-assisted prototyping with interactive explanation—has practical value for researchers, practitioners, and others working with data-sensitive systems. Please complete the following <a href="https://forms.gle/PCKKiU7uh9BL2Pca8" target="_blank" rel="noopener">brief survey</a> to provide feedback on this resource.',
    ],

    exploreLabel: 'Explore the modules',

    startHere: {
      label: 'New to PETs? Start here',
      intro: 'If you\'re new to privacy-enhancing technologies, we recommend beginning with these three modules in order:',
      pathway: [
        { key: 'trad',  step: '1', label: 'Traditional De-identification', note: 'The familiar baseline — understand what current de-id does and where it falls short.' },
        { key: 'dp',    step: '2', label: 'Differential Privacy',          note: 'The foundational formal privacy technique that underpins many modern PETs.' },
        { key: 'synth', step: '3', label: 'Synthetic Data',                note: 'Applies formal privacy guarantees to generate shareable, research-ready datasets.' },
      ],
    },

    // ── Personalized learning path assessment ─────────────────────────────────
    //
    // Shown below the "New to PETs?" block for users with some background.
    // Step 1: role selection. Step 2: 2 questions × 8 modules. Step 3: results + download.
    assessment: {
      heading:    'Find your learning path',
      subheading: 'Have some PETs background, or not sure where to focus?',
      intro:      'Select your role and answer two quick questions per module. The tool will score your knowledge inventory and generate a personalized reading guide — with resources ranked for your context.',
      cta:        'Start assessment →',
      restartLabel: '↺ Retake assessment',
      downloadLabel: '⬇ Download learning path (.txt)',

      roles: [
        { key: 'sea',        icon: '🏛',  label: 'SEA / SLDS Staff',        desc: 'State education agency or longitudinal data system staff who manage, share, or govern student data' },
        { key: 'researcher', icon: '🔬',  label: 'Researcher / Academic',   desc: 'Academic, applied researcher, or program evaluator using or requesting education data for studies' },
        { key: 'edtech',     icon: '💻',  label: 'EdTech Company / Vendor', desc: 'Technology provider building or operating products that process student or education data' },
        { key: 'policy',     icon: '📋',  label: 'Policy or Legal Staff',   desc: 'Policy analysts, legal counsel, or legislative staff working on education data law and governance' },
        { key: 'other',      icon: '◎',   label: 'Other / Not sure',        desc: 'Your role doesn\'t fit a category above, or you\'re exploring independently' },
      ],
      rolesNote: 'Don\'t see your role? Select "Other" — the path will be based on quiz results only. <a href="https://forms.gle/PCKKiU7uh9BL2Pca8" target="_blank" rel="noopener" style="color:var(--blue)">Suggest a missing role →</a>',

      // 8 modules × 2 questions each.
      // Each question has 4 options: 3 substantive choices + "Not sure" (always last, index 3).
      // Scoring: correct = 1 pt · wrong = 0 pt · "Not sure" = 0 pt (treated as a gap, not a wrong guess).
      // The correct answer index is always 1 or 2, so replacing index 3 with "Not sure" is safe.
      notSureText: 'Not sure — I\'m not familiar with this yet',
      quizModules: [
        {
          key: 'dp', label: 'Differential Privacy',
          questions: [
            {
              q: 'What does the privacy parameter ε (epsilon) control in differential privacy?',
              options: [
                'The number of records included in each query',
                'The tradeoff between privacy protection and accuracy of results',
                'The encryption key length used to protect query outputs',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
            {
              q: 'An SEA publishes proficiency rates by grade and demographic subgroup. Why is differential privacy appropriate?',
              options: [
                'It encrypts individual student records so they cannot be read without a key',
                'It replaces real students with statistically equivalent synthetic records',
                'It adds calibrated noise to published counts so no individual can be inferred from the result',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 2,
            },
          ],
        },
        {
          key: 'pprl', label: 'Privacy-Preserving Record Linkage',
          questions: [
            {
              q: 'In PPRL, what do agencies exchange during the record-matching process?',
              options: [
                'Full student names and dates of birth via an encrypted secure channel',
                'Cryptographic encodings of identifiers — not the identifiers themselves',
                'Shared pseudonymous student IDs assigned by a neutral third party',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
            {
              q: 'Which situation is a poor fit for PPRL?',
              options: [
                'Linking K–12 enrollment to postsecondary records to track long-term student outcomes',
                'Matching student records across state lines without sharing raw PII',
                'Real-time record lookups at the point of enrollment or service delivery',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 2,
            },
          ],
        },
        {
          key: 'mpc', label: 'Secure Multi-Party Computation',
          questions: [
            {
              q: 'In MPC, what does each party learn at the end of the protocol?',
              options: [
                'The private input values of all other participating parties',
                'Only the agreed-upon computed result — nothing about the other parties\' inputs',
                'An encrypted copy of all inputs combined into a single dataset',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
            {
              q: 'Three districts want a joint average graduation rate with no district revealing its individual data. Which MPC property makes this possible?',
              options: [
                'Each district sends its data to a neutral trusted server for aggregation',
                'Inputs are split into random "shares" that reveal nothing alone; the result emerges only when all shares are combined',
                'Each district trains a local model and shares a compressed gradient update',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
          ],
        },
        {
          key: 'fl', label: 'Federated Learning',
          questions: [
            {
              q: 'In federated learning, what do institutions send to the central coordinator?',
              options: [
                'An encrypted copy of their full student dataset for the training round',
                'Compressed summary statistics averaged across their student records',
                'Model gradient updates — mathematical adjustments to improve a shared model',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 2,
            },
            {
              q: 'Without DP-SGD or similar protections, what is the key privacy risk in federated learning?',
              options: [
                'The central coordinator can decrypt institution datasets during training',
                'Gradient updates can be mathematically inverted to approximately reconstruct individual training records',
                'Participating institutions can identify each other\'s data by comparing gradient updates',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
          ],
        },
        {
          key: 'synth', label: 'Synthetic Data',
          questions: [
            {
              q: 'What does DP-trained synthetic data protect against that standard synthesis does not?',
              options: [
                'Re-identification through correlating multiple separately released synthetic datasets',
                'Membership inference attacks testing whether specific real records influenced the output',
                'Memorization of individual records — especially statistical outliers — during the generation process',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 2,
            },
            {
              q: 'Which scenario best illustrates the "high fidelity ≠ low privacy risk" problem?',
              options: [
                'A synthetic dataset with slightly different average values than the original real data',
                'A generator that accurately reproduces rare-subgroup statistics because it memorized those specific records',
                'A synthetic dataset that cannot be used for regression analysis due to noise in continuous variables',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
          ],
        },
        {
          key: 'tee', label: 'Trusted Execution Environments',
          questions: [
            {
              q: 'What is the defining privacy property of a Trusted Execution Environment?',
              options: [
                'Data is encrypted during transmission between the sending agency and the enclave server',
                'Only users with multi-factor authentication can access records inside the environment',
                'Data remains encrypted while being processed — even the cloud provider or system admin cannot read it',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 2,
            },
            {
              q: 'What does cryptographic attestation prove in a TEE-based system?',
              options: [
                'That the requester holds a valid data use agreement and FERPA authorization',
                'That the hardware is genuine and the specific code loaded into the enclave is exactly what was expected',
                'That data has not been modified during transmission into the secure enclave',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
          ],
        },
        {
          key: 'he', label: 'Homomorphic Encryption',
          questions: [
            {
              q: 'What distinguishes homomorphic encryption from standard encryption?',
              options: [
                'It decrypts faster than standard algorithms, enabling real-time queries',
                'It allows arithmetic operations on encrypted data without decrypting it first',
                'It can encrypt arbitrarily large datasets without performance degradation',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
            {
              q: 'What is the primary practical limitation of fully homomorphic encryption (FHE) today?',
              options: [
                'It provides weaker security guarantees than standard encryption',
                'It requires sharing the decryption key with the party performing the computation',
                'It is 1,000–1,000,000× slower than plaintext computation, making it impractical for most real-time use',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 2,
            },
          ],
        },
        {
          key: 'tok', label: 'Tokenization',
          questions: [
            {
              q: 'What is the primary function of the token vault?',
              options: [
                'It generates cryptographically random tokens that cannot be reversed by anyone',
                'It stores the secure mapping between tokens and original PII, enabling authorized re-identification',
                'It validates that tokens conform to required format specifications before being issued',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
            {
              q: 'Why do cross-agency tokenization deployments require governance agreements about name formatting?',
              options: [
                'FERPA requires standardized name and identifier formats for all shared education records',
                'Tokens are generated from the exact input string — different formatting produces different tokens for the same person, breaking the linkage',
                'Different vault systems use incompatible tokenization algorithms that require format alignment',
                'Not sure — I\'m not familiar with this yet',
              ],
              correct: 1,
            },
          ],
        },
      ], // end quizModules
    }, // end assessment

    // Module list drives the "Explore the modules" chip row.
    // level: 'Beginner' | 'Intermediate' | 'Advanced'
    moduleList: [
      { key: 'dp',    label: 'Differential Privacy',                 level: 'Intermediate' },
      { key: 'pprl',  label: 'Privacy-Preserving Record Linkage',    level: 'Intermediate' },
      { key: 'mpc',   label: 'Secure Multi-Party Computation',        level: 'Advanced'     },
      { key: 'fl',    label: 'Federated Learning',                    level: 'Intermediate' },
      { key: 'synth', label: 'Synthetic Data',                        level: 'Intermediate' },
      { key: 'tee',   label: 'Trusted Execution Environments',        level: 'Intermediate' },
      { key: 'he',    label: 'Homomorphic Encryption',                level: 'Advanced'     },
      { key: 'tok',   label: 'Tokenization',                          level: 'Beginner'     },
      { key: 'zkp',   label: 'Zero-Knowledge Proofs (ZKP)',           level: 'Advanced'     },
      { key: 'trad',  label: 'Traditional De-identification',         level: 'Beginner'     },
    ],
  },

  // ── Module 1: Differential Privacy ────────────────────────────────────────
  //
  // This module has two sub-variants accessed via tabs: Global DP and Local DP.
  // 'global' and 'local' keys hold the text for each tab independently.
  // Shared fields (tag, title, definition, notes, resources) appear above the tabs.
  dp: {
    tag:   'Module 1 of 9',
    title: 'Differential Privacy',

    // Shared intro shown above the Global / Local tabs
    definition: 'Differential privacy adds carefully calibrated <em>random noise</em> to query results so that no single person\'s data can be inferred — while still allowing accurate analysis of the group. The <em>privacy budget</em> (ε, "epsilon") controls this tradeoff: a small ε means more noise and stronger privacy; a large ε means less noise and higher accuracy but weaker privacy. There are two main variants — <strong>Global DP</strong> and <strong>Local DP</strong> — that differ in <em>where</em> the noise is added and how much trust is required.',

    poorFit: [
      'you need to release individual-level records — DP only protects aggregate query outputs, not the underlying rows',
      'your target subgroups are very small (fewer than ~30 records), where noise will likely overwhelm the signal and produce unreliable estimates',
      'exact counts are legally required — e.g., mandatory federal reporting with statutory precision requirements that leave no room for noise-induced rounding',
    ],

    notes: '<strong>Global DP — implementation simplifications to be aware of:</strong><ul style="margin:8px 0 0 0;padding-left:1.4em;line-height:1.9"><li><strong>Sensitivity is fixed at 1.</strong> The Laplace noise scale is <em>b = Δf / ε</em>, where Δf is the global sensitivity of the query. This simulation assumes Δf = 1 (a single-person count query). In practice, sensitivity must be calculated for each query type — an incorrect value directly undermines the privacy guarantee without any visible warning.</li><li><strong>Zero-clipping introduces upward bias for small groups.</strong> Noisy counts below zero are truncated to 0. This post-processing step is not itself a privacy violation, but it biases reported counts upward for small subgroups — a known pitfall that disproportionately affects small demographic cells and can distort equity analyses.</li><li><strong>Each query run spends ε — and this simulation tracks it.</strong> Under sequential composition, running the same query k times costs k × ε total privacy budget. The budget meter above the Run Query button shows accumulated spend against a configurable cap (default 5.0 ε). Once the cap is reached the button locks and further queries are refused until you click ↺ Reset. You can raise or lower the cap using the budget input to explore the tradeoff between how many queries an analyst can run and how much total privacy leakage is permitted. What this simulation does not model: real deployments track budget across sessions and across multiple analysts querying the same dataset — a single analyst resetting their own meter does not reset the institutional budget. Production systems use a privacy accountant (e.g. the OpenDP or Google DP libraries) to enforce a shared ceiling that survives restarts.</li><li><strong>The simulation starts with no budget spent.</strong> On first load both the blue "true" bars and the mint "noisy" bars are drawn at the same height — because the noisy values are initialised to the true counts before any query is run. The two bar series only visibly diverge after you click Run Query and Laplace noise is sampled. This makes the link between budget expenditure and data distortion explicit from the first interaction.</li><li><strong>Parallel composition: disjoint subsets cost only ε once.</strong> When queries operate on non-overlapping subgroups (e.g., separately querying Grade 3, Grade 4, and Grade 5 counts where each student appears in exactly one group), the total privacy cost is just ε — not k × ε. This is the parallel composition theorem. It is why publishing a full grade-level breakdown is cheaper than running the same query repeatedly on the whole dataset. Production DP systems track composition type and credit the analyst accordingly.</li><li><strong>Pure ε-DP vs. approximate (ε, δ)-DP — when practitioners use each.</strong> This simulation demonstrates <em>pure</em> ε-DP with the Laplace mechanism, which provides the strongest guarantee: every output event is bounded in probability by e<sup>ε</sup> relative to neighboring datasets. In practice, many deployed systems use <em>approximate</em> (ε, δ)-DP with the Gaussian mechanism instead. The δ parameter allows a small, explicitly bounded probability (e.g. δ = 10<sup>−8</sup>) that the strict ε bound is exceeded. This is acceptable when δ is much smaller than 1/n (one-in-a-million for a million-record dataset). The Gaussian mechanism typically requires less noise than Laplace for the same (ε, δ) guarantee, making it preferred for high-dimensional data and ML training (DP-SGD). When evaluating a DP system, always check whether the guarantee is pure ε or (ε, δ) — a system advertising a small ε may carry a non-negligible δ that weakens the stated guarantee.</li><li><strong>FERPA / Legal relevance.</strong> DP-protected aggregate outputs — counts, rates, and averages — contain no individually identifiable student data, and a properly documented DP release may satisfy FERPA\'s de-identification determination without requiring individual consent or a FERPA exception. NCES statistical standards recognize differential privacy as a valid statistical disclosure limitation method; agencies should document the ε value, sensitivity assumptions, and composition accounting as part of the formal de-identification record.</li></ul>',

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

    related: [
      {
        key:   'synth',
        label: 'Synthetic Data',
        note:  'Both control what statistical information leaves a dataset. DP adds calibrated noise to aggregate query results; synthetic data generates a shareable, record-like file. Choose DP when analysts need to query real data interactively with a formal ε guarantee; choose synthetic data when researchers need a downloadable, record-level dataset they can run code against.',
      },
      {
        key:   'trad',
        label: 'Traditional De-identification',
        note:  'Traditional SDL techniques (suppression, generalization, k-anonymity) reduce re-identification risk heuristically but provide no formal mathematical guarantee. DP provides a provable ε bound on how much any individual\'s data can influence the output. When a formal, auditable privacy guarantee is required — for public-use microdata or regulatory submissions — DP is the appropriate successor to SDL-only approaches.',
      },
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

      runQueryHint: 'Chart shows true values until you run your first query. Each run spends ε from your budget.',

      tradeoffs: [
        ['Privacy strength',          'Tunable (ε)',    'val-med'],
        ['Data utility',              'Moderate–High',  'val-med'],
        ['Data stays local?',         'Yes',            'val-low'],
        ['3rd party needed?',         'No',             'val-low'],
        ['Implementation complexity', 'Medium',         'val-med'],
        ['Output type',               'Aggregate only (counts · rates · averages)', 'val-low'],
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
      // Correction formula: true_rate ≈ (observed_rate - (1-p)/2) / p
      // Edit this value (0.5–1.0) to change the demo; 0.7 = 70% truthful.
      flipProbability: 0.7,

      tradeoffs: [
        ['Privacy strength',          'Very High',          'val-low'],
        ['Data utility',              'Lower (more noise)', 'val-high'],
        ['Data stays local?',         'Yes — always',       'val-low'],
        ['3rd party needed?',         'No',                 'val-low'],
        ['Implementation complexity', 'Low–Medium',         'val-low'],
        ['Output type',               'Aggregate only (population rate estimate)', 'val-low'],
      ],
    },
  },

  // ── Module 2: Privacy-Preserving Record Linkage ────────────────────────────
  pprl: {
    tag:        'Module 2 of 9',
    title:      'Privacy-Preserving Record Linkage',
    definition: 'PPRL lets two agencies find the same individuals across datasets by comparing <em>encoded identifiers</em> (such as cryptographic hash encodings) — without either party revealing the underlying names, dates of birth, or other PII to the other.',
    useCase:    'An SLDS links K–12 enrollment records to postsecondary enrollment and workforce data to track long-term outcomes, without a shared student ID and without exchanging personally identifiable information.',

    poorFit: [
      'source data quality is poor — inconsistent name formats, missing dates of birth, or high typo rates degrade match accuracy significantly',
      'you need real-time matching at query time — PPRL is a batch process that requires pre-computing encoded representations',
      'you need to link on more than 3–4 quasi-identifiers without specialist guidance on threshold tuning and error-rate validation',
    ],

    tradeoffs: [
      ['Privacy strength',          'High',                   'val-low'],
      ['Data utility',              'High (linkage)',          'val-low'],
      ['Data stays local?',         'Yes (hashes only)',       'val-low'],
      ['3rd party needed?',         'Optional',               'val-med'],
      ['Implementation complexity', 'Medium–High',            'val-med'],
      ['Output type',               'Linked record pairs — no PII crosses boundary', 'val-low'],
    ],

    notes: '<strong>How the matching works in this simulation:</strong><ul style="margin:8px 0 8px 0;padding-left:1.4em;line-height:1.9"><li><strong>Matching is driven by bigram similarity, not raw identifiers.</strong> Each record is compared using the Sørensen–Dice coefficient over character bigrams (overlapping two-character pairs from the normalised name and date of birth). Two records link if their similarity score meets or exceeds 60%. This is mathematically equivalent to what Bloom filter PPRL computes: the bit-array Dice distance approximates bigram Dice similarity over the same n-gram set.</li><li><strong>Abbreviated names match at lower scores than exact pairs.</strong> "J. Okafor / 2003-08-21" and "James Okafor / 2003-08-21" share most of their DOB bigrams and several name bigrams — enough to exceed the threshold even though the names are not identical. This is the key property of Bloom filter PPRL: it tolerates the real-world variation in how agencies record the same person\'s name.</li><li><strong>The similarity score is shown on each matched row.</strong> Scores below 100% reflect name abbreviation or variation, not a weaker privacy guarantee — the privacy property depends on the encoding, not the match score.</li></ul><strong>What is simplified relative to production PPRL:</strong><ul style="margin:8px 0 0 0;padding-left:1.4em;line-height:1.9"><li><strong>Real Bloom filters use bit arrays.</strong> In production (e.g. the Schnell et al. scheme), each bigram is hashed into multiple bit positions in a fixed-length bit vector. The hex strings shown are a visual proxy — they capture the deterministic encoding property but not the bit-array structure or the hardening steps (e.g. record-level salting, XOR folding) that prevent hash reversal.</li><li><strong>Threshold tuning is a privacy–utility tradeoff.</strong> A lower threshold catches more true matches but risks false positives (linking different people). A higher threshold reduces false positives but misses more true matches. In a real deployment, threshold selection involves iterative testing against ground-truth linked records and is a key governance decision.</li><li><strong>Bloom filters are not the current state of the art.</strong> Early PPRL implementations used Bloom filters; modern systems use more attack-resistant encodings (CLK, HMAC-based schemes, and others) that are less susceptible to frequency and cryptanalytic attacks. When evaluating vendors, ask about their encoding scheme and known vulnerabilities.</li><li><strong>FERPA / Legal relevance.</strong> Encoding identifiers before exchange does not eliminate FERPA obligations — sharing encoded records with a matching partner and receiving a linked output still constitutes a disclosure of education records, because the linkage result identifies which students appear in both datasets. Agencies conducting PPRL must establish a valid FERPA legal basis (school official exception, studies exception, or written consent) and execute a governing data-use agreement before the protocol begins, regardless of what each party can technically observe during matching.</li></ul>',

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

    related: [
      {
        key:   'tok',
        label: 'Tokenization',
        note:  'Both enable cross-agency linkage without exchanging raw PII, but with very different threat models. PPRL uses one-way encodings — neither agency can reverse the other\'s identifiers, and there is no vault to breach. Tokenization requires a trusted vault that retains full re-identification capability. Choose PPRL when you want linkage without any party holding re-identification power; choose tokenization when authorized re-identification is an ongoing operational requirement.',
      },
    ],
  },

  // ── Module 3: Secure Multi-Party Computation ──────────────────────────────
  mpc: {
    tag:        'Module 3 of 9',
    title:      'Secure Multi-Party Computation',
    definition: 'MPC allows multiple parties to jointly compute a result over their combined data — such as a district average or a merged statistic — without any party revealing their private input to the others.',
    useCase:    'Three school districts want to compute a regional graduation rate to benchmark against state targets, without sharing their individual student outcome data.',

    poorFit: [
      'parties have very different network or compute capacity — MPC requires synchronized multi-round communication between all participants',
      'you need results in real time or near-real time — latency is high even on fast networks due to cryptographic communication rounds',
      'the computation is complex (e.g., joins, non-linear statistics) — MPC cost scales sharply with circuit complexity beyond simple aggregates',
    ],

    revealToggleLabel: 'Show true values (instructional use only — these scores are not disclosed to any party during the protocol)',

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
      ['3rd party needed?',         '<span class="tip-lbl" data-tip-body="Theoretical SMPC requires no trusted third party, but most deployed systems use a coordinator or broker to orchestrate the protocol.">Optional (protocol-dependent)<i class="tip-icon">i</i></span>', 'val-med'],
      ['Implementation complexity', 'Very High',     'val-high'],
      ['Output type',               'Aggregate only (result of agreed computation)', 'val-low'],
    ],

    notes: '<strong>What this simulation accurately demonstrates:</strong><ul style="margin:8px 0 8px 0;padding-left:1.4em;line-height:1.9"><li><strong>Additive secret sharing is real.</strong> Each school score is split into three shares that sum exactly to the original value (a + b + c = score). The district average is derived from these shares — not from the raw scores directly.</li><li><strong>Partial sums are meaningless alone.</strong> Each party only ever sees one share per school. Their partial sum is a random-looking integer that reveals nothing about any individual school\'s score. Only when all three partial sums are combined does the true aggregate emerge.</li><li><strong>Negative shares are valid.</strong> When you see a dashed chip with a negative value, that is correct and intentional — additive shares range freely over the integers. A negative share is just as valid as a positive one; what matters is that all three sum to the original score.</li></ul><strong>What is deliberately simplified:</strong><ul style="margin:8px 0 0 0;padding-left:1.4em;line-height:1.9"><li><strong>The "secure" part is not enforced.</strong> In a real MPC protocol (e.g. SPDZ, GMW), parties cannot deviate from the protocol even if malicious — cryptographic commitments and zero-knowledge proofs enforce honest behaviour. Here, the computation runs in plain JavaScript with no cryptographic enforcement. The simulation shows the correct <em>information flow</em> of additive secret sharing, but not the cryptographic mechanisms that make it tamper-proof.</li><li><strong>Communication rounds are collapsed.</strong> A real 3-party protocol requires multiple rounds of authenticated message exchange. The animation compresses this into a single step for clarity.</li><li><strong>FERPA / Legal relevance.</strong> When MPC produces only a final aggregate — such as a regional graduation rate — and no individual records or identifiable shares cross institutional boundaries, the protocol may avoid triggering a FERPA disclosure to the coordinator entirely. If a third-party coordinator is involved, agencies should evaluate whether the coordinator\'s role qualifies under FERPA\'s school official exception and document that relationship in a data service agreement, even though the coordinator receives only a computed result rather than underlying records.</li></ul>',

    resources: [
      // Free textbook — the definitive practical introduction to MPC, widely used in courses
      ['A Pragmatic Introduction to Secure Multi-Party Computation — Evans, Kolesnikov & Rosulek (free PDF)', 'https://www.cs.virginia.edu/~evans/pragmaticmpc/pragmaticmpc.pdf'],
      // Accessible CACM article — best short explainer for a policy/analyst audience
      ['Secure Multiparty Computation (CACM 2021) — Yehuda Lindell', 'https://eprint.iacr.org/2020/300.pdf'],
      // Statistics Canada introduction — government-framed MPC explainer with use cases
      ['Introduction to Privacy-Enhancing Cryptographic Techniques: Secure MPC — Statistics Canada', 'https://www.statcan.gc.ca/en/data-science/network/multiparty-computation'],
    ],

    related: [
      {
        key:   'fl',
        label: 'Federated Learning',
        note:  'Both compute across distributed datasets without centralizing raw records. MPC is general-purpose — it can compute any agreed function with cryptographic exactness, but is computationally expensive and slow. FL is specialized for training ML models and is more practical at scale. In practice, FL often uses MPC-based secure aggregation internally to prevent the coordinator from seeing individual institution gradient updates.',
      },
      {
        key:   'tee',
        label: 'Trusted Execution Environments',
        note:  'Both enable joint computation over sensitive data without exposing raw records to the compute layer. MPC uses cryptographic protocols — no hardware trust required, but high communication overhead and complexity. TEEs use hardware-enforced isolation — faster and more flexible for complex queries, but require trusting the CPU manufacturer and attestation chain. Choose MPC when hardware trust is unacceptable; choose TEE when query complexity or latency requirements rule out multi-round cryptographic protocols.',
      },
      {
        key:   'he',
        label: 'Homomorphic Encryption',
        note:  'Both allow a third party to compute on data without seeing the plaintext. MPC distributes computation across parties using secret sharing — no single party holds the full input. HE encrypts data under a key held only by the data owner — the vendor computes on ciphertext and never holds the key. MPC is more mature for multi-party settings; HE is better suited when a single data owner wants to outsource computation to an untrusted cloud vendor without sharing a decryption key.',
      },
    ],
  },

  // ── Module 4: Federated Learning ──────────────────────────────────────────
  fl: {
    tag:        'Module 4 of 9',
    title:      'Federated Learning',
    definition: 'Federated learning trains a shared machine learning model across multiple institutions, each keeping their data local. Only model <em>updates</em> (gradients) — not raw records — are shared with a central coordinator.',
    useCase:    'Multiple states train an early-warning indicator model for student dropout risk. Each state\'s student data never leaves its servers; only statistical model updates are pooled to improve prediction for all.',

    poorFit: [
      'data is highly skewed across nodes — if one institution holds the majority of records, the global model will reflect that institution\'s distribution regardless of federation',
      'you have fewer than ~5 participating institutions — small federation sizes weaken both model quality and the informal privacy protection from aggregation',
      'the task is not a machine learning problem — FL trains predictive models and is not a general-purpose analytics or statistics tool',
    ],

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
      ['Output type',               'Model weights only — no individual records', 'val-low'],
    ],

    notes: `<ul>
      <li><strong>FERPA / Legal relevance.</strong> Federated learning keeps raw student records local — only gradient updates (Δw) leave each institution, not the underlying data. Whether gradient updates constitute "education records" under FERPA is unsettled: they are not records "directly related to a student" in the traditional sense, but gradient inversion attacks can reconstruct individual-level data from them, which regulators may view as functionally equivalent to a disclosure. Agencies should treat sharing gradient updates with an external coordinator as a potential FERPA disclosure until authoritative guidance clarifies the issue. The most applicable exception for an external coordinator is typically the <strong>school official exception</strong> (34 C.F.R. § 99.31(a)(1)) — the coordinator must operate under the agency's direct control, have a legitimate educational interest in the computation, and be bound by a data use agreement prohibiting use for any other purpose. Adding DP-SGD materially affects this analysis: properly noised gradients may not identify any individual, which could remove the FERPA disclosure trigger — though agencies should confirm this determination with legal counsel before relying on it.</li>
      <li><strong>Federated learning is data minimization, not anonymization.</strong> FL reduces what data leaves each institution — raw records stay local — but it does not anonymize or de-identify that data. Gradient updates can leak individual-level information (see gradient inversion below), and the global model itself carries statistical fingerprints of the training set. FL is best understood as a data-minimization architecture that reduces exposure compared to centralizing raw records. It is not a substitute for anonymization or de-identification, and is most often deployed alongside other PETs — particularly DP — to achieve stronger privacy guarantees.</li>
      <li><strong>Gradient inversion — the hidden privacy risk.</strong> Sharing gradient updates (Δw) instead of raw data is not the same as sharing nothing. In 2019, Zhu et al. demonstrated that gradients from a single training step can be inverted to approximately reconstruct the training images pixel-by-pixel (<em>"Deep Leakage from Gradients," NeurIPS 2019</em>). For tabular data like student records, similar reconstruction attacks have been shown to recover individual row values from gradient updates — especially when batch sizes are small (one record = one gradient update).</li>
      <li><strong>DP-SGD is the mitigation.</strong> Differentially Private Stochastic Gradient Descent (DP-SGD, Abadi et al. 2016) clips each per-sample gradient to a maximum norm, then adds calibrated Gaussian noise before the update is sent to the coordinator. This provides a formal (ε, δ)-DP guarantee on the gradient, making reconstruction attacks provably difficult. The cost is reduced model accuracy — the same privacy-utility tradeoff as global DP, but at the gradient level.</li>
      <li><strong>The simulation does not show gradient inversion or DP-SGD.</strong> The "Δw" packets in the animation represent conceptual gradient updates. In a real deployment, each Δw would either be a raw gradient (vulnerable to reconstruction) or a DP-SGD-noised gradient. Without DP-SGD, federated learning offers weaker privacy guarantees than the architecture diagram suggests.</li>
      <li><strong>Secure aggregation is a complementary control.</strong> Even without DP, the coordinator can be prevented from seeing individual institution gradients by using secure aggregation (a form of MPC): each institution secret-shares its gradient with the others, and the coordinator only ever sees the sum. This prevents a malicious coordinator from singling out one institution's gradient for reconstruction, but does not prevent the final aggregated gradient from leaking information about the training set as a whole.</li>
      <li><strong>Practical deployment guidance.</strong> For sensitive education data, FL should be paired with DP-SGD and, ideally, secure aggregation. FL alone — without either — provides data-locality but not reconstruction-resistance. The privacy guarantee of FL is only as strong as its weakest layer.</li>
    </ul>`,

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

    related: [
      {
        key:   'mpc',
        label: 'Secure Multi-Party Computation',
        note:  'MPC is the more general primitive — it can compute any agreed function across parties, not just train ML models. FL uses MPC-based secure aggregation as an optional layer to prevent the coordinator from seeing individual institution gradient updates. If your use case is not ML model training, start with MPC. If you need distributed ML with practical scalability, FL (with DP-SGD and secure aggregation) is the right path.',
      },
    ],
  },

  // ── Module 5: Synthetic Data Generation ───────────────────────────────────
  synth: {
    tag:        'Module 5 of 9',
    title:      'Synthetic Data Generation',
    definition: 'Synthetic data is artificially generated to match the <em>statistical properties</em> of a real dataset — distributions, correlations, and patterns — while containing no records from real individuals, substantially reducing re-identification risk.',
    useCase:    'A state education agency releases a synthetic version of its longitudinal student dataset so researchers can build and test analytic tools without accessing any real student records.',

    poorFit: [
      'analysis focuses on rare subgroups (students with specific disabilities, small LEAs) — generators trained on sparse data produce unreliable synthetic records for those groups',
      'legal or contractual frameworks require working with actual records (e.g., some audit, verification, or compliance contexts)',
      'a formal, provable privacy guarantee is required — only DP-trained synthetic data provides one, and it degrades fidelity for small subgroups',
    ],

    tradeoffs: [
      ['Privacy strength',          'High (model-dependent)',           'val-med'],
      ['Data utility',              'Medium (no individual records)',  'val-med'],
      ['Data stays local?',         'Synthetic can be shared',         'val-low'],
      ['3rd party needed?',         'No',                              'val-low'],
      ['Implementation complexity', 'Medium–High',                    'val-med'],
      ['Output type',               'Synthetic individual records (no real PII)', 'val-low'],
    ],

    notes: `<ul>
      <li><strong>What the pipeline simulation demonstrates.</strong> The two-pipeline walkthrough shows the core distinction between plain and DP-trained synthesis. A plain generator trains directly on real records — its weights can memorize any individual, including statistical outliers. DP-trained synthesis adds calibrated noise to every gradient update (via DP-SGD or equivalent), preventing the generator from fitting any single record tightly. Phase ④ Attack Test illustrates the practical consequence: the plain pipeline's outlier survives into the output and can be recovered; the DP pipeline's output is statistically indistinguishable from noise.</li>
      <li><strong>What the ε slider represents.</strong> The epsilon (ε) value is the privacy budget consumed during training — the same quantity as in the Differential Privacy module. A lower ε forces more noise into each gradient step, which reduces how closely the generator can fit rare patterns. Small subgroups (chronic absentees, IEP students) degrade first because they require the generator to fit a sharp, low-frequency distribution that noise disrupts proportionally more than majority-class patterns.</li>
      <li><strong>Simplifications in this simulation.</strong> The pipeline shows conceptual information flow, not a live DP computation. In production systems (e.g., CTGAN with DP-SGD, the MST mechanism, or smartnoise-sdk), noise is injected via a formal privacy accounting framework and the ε budget is tracked across all training steps. The ε value shown on the slider reflects the theoretical guarantee — not a value computed from the demo records.</li>
      <li><strong>Memorization risk: outliers are the most vulnerable.</strong> A generator trained without formal privacy protection may memorize statistical outliers — students with unusual attribute combinations (e.g., a 22-year-old 12th-grader with an IEP and zero absences) that appear only once in the real dataset. An adversary can extract memorized records by querying the model systematically, effectively recovering a real individual's record even though no real records appear in the output. The red ⚠ tile in the pipeline represents exactly this kind of record.</li>
      <li><strong>High fidelity does not imply low privacy risk.</strong> A synthetic dataset that perfectly reproduces rare-subgroup statistics may have overfit to — and partially memorized — those very records. The fidelity-privacy tradeoff runs in both directions: reducing DP noise improves statistical accuracy but increases leakage risk for outliers. Fidelity metrics (means, distributions) do not measure memorization and can be high even when individual records are at risk.</li>
      <li><strong>Membership inference and audit.</strong> Membership inference attacks test whether a given real record was in the training data by querying the generative model and examining output statistics. A well-governed synthetic data release should include a membership inference audit (e.g., shadow-model attack or nearest-neighbor adversary) before publication, especially when the dataset includes students in small demographic cells or with rare service combinations.</li>
    </ul>`,

    resources: [
      ['Piloting Synthetic Data in Your Organization: A How-To Guide — MDI / Georgetown', 'https://georgetown.app.box.com/s/zmq1b61sybzm8yd4zct9qjzxqtitql84'],
      ['Synthesizing Workforce and Education Data Using an Open Source Tool: Lessons Learned — MDI / Georgetown', 'https://georgetown.app.box.com/s/azphzj3777cbxbhtx0m1qetdwiq5pckx'],
      ['Understanding Synthetic Data — Urban Institute', 'https://www.urban.org/research/publication/understanding-synthetic-data'],
      ['Generating a Fully Synthetic Human Services Dataset — Urban Institute', 'https://www.urban.org/research/publication/generating-fully-synthetic-human-services-dataset'],
      ['Analyzing the Privacy and Utility Trade-off for Synthetic Datasets with Imbalanced Demographic Groups — Urban Institute', 'https://urban-institute.medium.com/analyzing-the-privacy-and-utility-tradeoff-for-synthetic-datasets-with-imbalanced-demographic-c8968cc5d0a1'],
    ],

    related: [
      {
        key:   'dp',
        label: 'Differential Privacy',
        note:  'DP protects aggregate query outputs with a formal, provable ε guarantee. Synthetic data releases a record-like file, but relies on generation quality unless DP-trained. For the strongest privacy assurance on released files, choose DP-trained synthesis — but expect reduced fidelity for small subgroups. For interactive analysis of real data, DP query mechanisms are the more appropriate tool.',
      },
      {
        key:   'trad',
        label: 'Traditional De-identification',
        note:  'Traditional SDL produces record-like files using suppression, generalization, and k-anonymity — operationally familiar, but with no formal privacy guarantee and increasing vulnerability to re-identification attacks using external data. DP-trained synthetic data provides a provable ε bound and generates a file that can be freely shared, at the cost of reduced fidelity for small subgroups. When a publicly releasable microdata file with a formal guarantee is the goal, DP synthesis is the more defensible choice.',
      },
    ],

    // ── Statistical Equivalence panel — rows rendered in the toggle panel ──────
    statTable: [
      { metric: 'Avg GPA',           real: '3.05',  synthetic: '3.05',  match: '✓ Yes' },
      { metric: '% Chronic absent',  real: '16.7%', synthetic: '16.7%', match: '✓ Yes' },
      { metric: '% With IEP',        real: '16.7%', synthetic: '16.7%', match: '✓ Yes' },
      { metric: 'Any real student?', real: 'Yes',   synthetic: 'No',    match: '✓ Protected' },
    ],
    statTableNote: 'Privacy protection depends on the generation method and dataset size — small subgroups remain at risk.',

    // ── Advanced panel: DP-trained synthetic data ──────────────────────────────
    dpAdvanced: {
      title:       'Advanced: Synthetic Data with Formal Privacy Guarantees',
      badge:       'EMERGING',
      description: 'Standard synthetic data protects privacy by generating new records — but the generator itself is trained on real data and can <strong style="color:var(--amber)">memorize unusual records</strong> (outliers), which may then surface in the synthetic output. Adding <strong>differential privacy during training</strong> closes this gap: calibrated noise is injected into the training process so the generator cannot tightly fit any individual record. The result is a synthetic dataset with a <em>mathematically bounded</em> privacy guarantee.',

      insights: [
        'Both pipelines start with the same real student records — including a low-GPA, low-attendance outlier (highlighted in red). The outlier represents a student who could be re-identified if their pattern appears in the synthetic output.',
        '<strong style="color:var(--text)">This is the critical difference.</strong> Plain synthesis trains on real records directly — the generator memorizes patterns including outliers. DP synthesis injects calibrated noise at every training step. Use the slider to see how the privacy budget (ε) controls the tradeoff between protection strength and data fidelity.',
        'Both produce synthetic records. Plain synthesis preserves the outlier\'s signature (red tile). DP synthesis statistically smooths the outlier region — no individual record is recoverable from the output.',
        '<strong style="color:var(--text)">The attack test.</strong> Against plain synthetic data the re-identification attack succeeds — the outlier\'s pattern is faithfully preserved. Against DP synthetic data the attack fails — training noise means the attacker cannot distinguish signal from random variation.',
      ],

      epsLabels: {
        min:    'ε = 0.1 (strict)',
        max:    'ε = 10 (loose)',
        budget: 'Privacy budget:',
      },

      epsInterp: {
        strict:   'Strong protection — lower fidelity. Individual records cannot be recovered from synthetic output. Some statistical patterns smoothed out.',
        moderate: 'Moderate tradeoff. Useful synthetic data, but extreme outliers leave a faint signature. Some re-identification risk for unusual records.',
        loose:    'Weak protection — high fidelity. Low training noise allows the generator to memorize outliers. Re-identification attack likely to succeed.',
      },
    },
  },

  // ── Module 6: Trusted Execution Environments ──────────────────────────────
  tee: {
    tag:        'Module 6 of 9',
    title:      'Trusted Execution Environments',
    definition: 'A TEE (or "secure enclave") is a hardware-isolated computing zone where data is <em>encrypted even from the cloud provider or system administrator</em>. Code runs in the enclave, data enters encrypted, and only approved results leave.',
    useCase:    'A secure research platform (like SafeInsights) lets approved researchers run statistical analyses on sensitive student records stored in an enclave — without anyone, including the platform operator, being able to view the raw data.',

    poorFit: [
      'the hardware vendor itself is in the threat model — TEE security ultimately relies on trusting the CPU manufacturer and attestation supply chain',
      'your threat model includes sophisticated hardware-level attackers — known side-channel attacks (Spectre, SGX vulnerabilities) have broken enclave isolation in research settings',
      'your team lacks enclave development experience — implementation errors such as incorrect memory isolation or insecure OCALL boundaries directly undermine the security guarantee',
    ],

    // Text for the amber callout box shown below the diagram
    keyProperty: 'Even the cloud provider hosting the server cannot read the data inside the enclave. The hardware enforces isolation through cryptographic attestation.',

    tradeoffs: [
      ['Privacy strength',          'Very High',                     'val-low'],
      ['Data utility',              'High (any computation)',        'val-low'],
      ['Data stays local?',         'In enclave (encrypted)',        'val-low'],
      ['3rd party needed?',         'Hardware provider',            'val-med'],
      ['Implementation complexity', 'Very High',                    'val-high'],
      ['Output type',               'Any — aggregate or record-level, per query design', 'val-med'],
    ],

    notes: '<ul style="margin:8px 0 0 0;padding-left:1.4em;line-height:1.9"><li><strong>FERPA / Legal relevance.</strong> Placing education records inside a secure enclave does not create a FERPA safe harbor — agencies must still have a legal basis for disclosing records to the enclave platform operator (typically the school official or studies exception), documented in a data use agreement that specifies the operator\'s access controls and obligations. The enclave\'s hardware isolation satisfies the "reasonable methods" expectation for limiting unauthorized access, but it does not substitute for the legal authorization that FERPA requires before records leave the agency\'s direct control.</li></ul>',

    resources: [
      // Policy report — best resource for policy audience on TEEs and confidential computing
      ['Confidential Computing and Privacy: Policy Implications of Trusted Execution Environments — Future of Privacy Forum (2024)', 'https://fpf.org/wp-content/uploads/2025/04/FPF_Confidential_Computing_Digital_R3_-_2025_Update.pdf'],
      // CCC overview whitepaper — industry definition and use cases
      ['Confidential Computing: Hardware-Based Trusted Execution for Applications and Data — Confidential Computing Consortium', 'https://confidentialcomputing.io/wp-content/uploads/sites/10/2023/03/CCC_Overview.pdf'],
      // CCC technical analysis — deeper technical detail with threat model
      ['A Technical Analysis of Confidential Computing — Confidential Computing Consortium', 'https://confidentialcomputing.io/wp-content/uploads/sites/10/2023/03/CCC-A-Technical-Analysis-of-Confidential-Computing-v1.3_unlocked.pdf'],
      // CCC accessible blog post explaining TEEs for non-specialists
      ['Basics of Trusted Execution Environments — Confidential Computing Consortium blog', 'https://confidentialcomputing.io/2024/03/13/basics-of-trusted-execution-environments-tees-the-heart-of-confidential-computing/'],
    ],

    related: [
      {
        key:   'mpc',
        label: 'Secure Multi-Party Computation',
        note:  'Both enable computation over sensitive data without exposing raw records to the compute layer. TEEs rely on hardware-enforced isolation (trust the CPU manufacturer, but no cryptographic multi-party protocol needed). MPC relies on cryptographic secret sharing (no hardware trust required, but high communication overhead). Choose TEE when query complexity or latency rules out multi-round protocols; choose MPC when hardware trust is unacceptable or unavailable.',
      },
      {
        key:   'he',
        label: 'Homomorphic Encryption',
        note:  'Both allow computation on data that remains hidden from the compute layer. TEEs hide data by hardware isolation — any code that passes attestation can read plaintext inside the enclave, but nothing outside can. HE hides data by encryption — the compute layer operates on ciphertext and never holds the decryption key. TEEs support arbitrary computations at near-native speed; HE supports only algebraic operations but requires no trusted hardware.',
      },
    ],
  },

  // ── Module 7: Homomorphic Encryption ──────────────────────────────────────
  he: {
    tag:        'PET Module 7 of 9',
    title:      'Homomorphic Encryption',
    definition: 'Homomorphic encryption (HE) allows a server to perform computations — additions, multiplications, and averages (and, with significant overhead, comparisons) — directly on <em>encrypted data</em>, returning an encrypted result. The server never sees the plaintext values at any point.',
    useCase:    'An SEA outsources analytics to a cloud vendor. Student records are encrypted before upload; the vendor computes aggregate statistics on ciphertext and returns encrypted results that only the SEA can decrypt — the vendor learns nothing about individual students.',

    poorFit: [
      'queries need to complete in seconds or minutes — HE is 1,000–1,000,000× slower than plaintext computation and is not suitable for interactive or real-time use',
      'your workload requires comparisons, sorting, or non-linear operations — these require significantly more expensive circuit constructions beyond basic additions and multiplications',
      'you need a production-grade deployment today — tooling, standardized parameters, and accessible libraries are still maturing rapidly',
    ],

    // Text for the coral warning callout about FHE performance limitations
    practicalNote: 'Fully homomorphic encryption (FHE) is computationally expensive — 1,000–1,000,000× slower than plaintext computation. Partially homomorphic schemes (PHE, supporting only addition or only multiplication) are more practical today. Active area of standardization work.',

    tradeoffs: [
      ['Privacy strength',          'Very High',                          'val-low'],
      ['Data utility',              'High (any aggregation)',             'val-low'],
      ['Data stays local?',         'Encrypted at rest/transit',         'val-low'],
      ['3rd party needed?',         'Cloud vendor (sees only ciphertext)', 'val-med'],
      ['Implementation complexity', 'Very High',                         'val-high'],
      ['Output type',               'Encrypted result — decrypted only by key holder', 'val-low'],
    ],

    notes: '<strong>Semantic security — what the simulation demonstrates:</strong><ul style="margin:8px 0 8px 0;padding-left:1.4em;line-height:1.9"><li><strong>Same plaintext → different ciphertext each run (IND-CPA).</strong> Click "Encrypt &amp; Send", note the ciphertext strings, reset, and run again — the ciphertexts are completely different even though the underlying values (GPA, attendance, proficiency count) have not changed. This is the defining property of semantically secure encryption: an observer who sees two ciphertexts cannot determine whether they encrypt the same value or different values.</li><li><strong>The cloud vendor never sees the plaintext — and cannot infer it from the ciphertext.</strong> Because the ciphertext is indistinguishable from random, a vendor who receives it gains no information about the underlying value, even if they see multiple encryptions of the same record.</li></ul><strong>What is simplified relative to production HE:</strong><ul style="margin:8px 0 0 0;padding-left:1.4em;line-height:1.9"><li><strong>Real randomness comes from lattice noise, not JavaScript Math.random().</strong> Production HE schemes (BFV, CKKS, BGV) achieve probabilistic encryption by adding carefully structured noise drawn from a discrete Gaussian distribution over a polynomial ring. The noise is large enough to hide the plaintext from anyone without the secret key, but small enough that the homomorphic computation still produces the correct result after decryption.</li><li><strong>Homomorphic operations on ciphertext are not simulated.</strong> The "computing on ciphertext" step is animated but the computation is performed on the plaintext values directly. Real HE arithmetic (addition and multiplication of ciphertexts) is orders of magnitude slower than plaintext arithmetic and introduces a small amount of noise with each operation — which is why bootstrapping is required for deep computation circuits.</li><li><strong>Key management is not shown.</strong> In practice, the SEA generates a public/private key pair. The public key is used for encryption (by anyone); the private key — held only by the SEA — is required for decryption. The vendor never has access to the private key.</li><li><strong>FERPA / Legal relevance.</strong> A cloud vendor who processes only ciphertext and never holds the decryption key arguably has no meaningful access to education record content — which may simplify the FERPA authorization analysis compared to sharing plaintext records with the same vendor. Agencies should nonetheless execute a data service agreement treating the encrypted dataset as FERPA-covered, since the vendor possesses a derivative of protected records and must be contractually obligated to maintain encryption controls and prohibit decryption attempts for the duration of the engagement.</li></ul>',

    resources: [
      // Industry standardization body — overview of HE schemes and open-source libraries
      ['Homomorphic Encryption Standardization — Introduction and Open Libraries', 'https://homomorphicencryption.org/introduction/'],
      // Internet Society policy brief — practical limitations and policy implications, non-technical
      ['Homomorphic Encryption: What Is It, and Why Does It Matter? — Internet Society', 'https://www.internetsociety.org/resources/doc/2023/homomorphic-encryption/'],
      // Issue brief — HE applied to cross-border fraud detection (concrete use case)
      ['PETs Use Case: Preventing Financial Fraud with Fully Homomorphic Encryption — FPF', 'https://fpf.org/wp-content/uploads/2023/04/FPF-FHE-Issue-Brief-April-2023.pdf'],
      // Microsoft SEAL — leading open-source HE library (BFV/CKKS)
      ['Microsoft SEAL: Open-Source Homomorphic Encryption Library', 'https://github.com/microsoft/SEAL'],
    ],

    related: [
      {
        key:   'tee',
        label: 'Trusted Execution Environments',
        note:  'Both solve the same core problem: letting an untrusted party compute on data it cannot read. HE achieves this cryptographically — the vendor operates on ciphertext and never holds the decryption key. TEEs achieve it through hardware isolation — attested code runs on plaintext inside a secure enclave that the vendor cannot inspect. HE requires no trusted hardware but is 1,000–1,000,000× slower; TEE is near-native speed but requires trusting the CPU manufacturer.',
      },
      {
        key:   'mpc',
        label: 'Secure Multi-Party Computation',
        note:  'Both allow computation without revealing inputs to the compute layer. HE is best suited when a single data owner wants to outsource analytics to an untrusted vendor — the owner holds the key, the vendor computes on ciphertext. MPC is better for multi-party settings where several institutions each hold private inputs and want to compute a joint result — no single party holds the full dataset and no encryption key needs to be shared.',
      },
    ],
  },

  // ── Module 8: Tokenization ─────────────────────────────────────────────────
  tok: {
    tag:        'PET Module 8 of 9',
    title:      'Tokenization',
    definition: 'Tokenization replaces sensitive identifiers — names, SSNs, student IDs — with opaque, consistent <em>pseudorandom tokens</em> stored in a secure vault. The same identifier always maps to the same token, enabling cross-system linkage without exposing the underlying PII. Only an authorized vault lookup can reverse a token.',
    useCase:    'A state replaces student SSNs and names with tokens before sharing data with postsecondary and workforce partners. Each partner works with tokens; only the state vault can re-link tokens to real identities for authorized purposes.',

    poorFit: [
      'the goal is privacy protection against a determined adversary — tokenization is an operational control, not a formal privacy technique; vault access directly re-identifies all tokenized records',
      'the downstream use is statistical analysis — tokens preserve linkage across systems but do not preserve analytical patterns; aggregate queries still require real data or a separate privacy technique',
      'vault infrastructure and access-control governance cannot be reliably maintained — a poorly governed vault eliminates the protection entirely',
    ],

    // Text for the blue informational callout comparing tokenization vs. encryption
    comparisonNote: 'Encrypted data can be decrypted by anyone with the key. Tokenization separates the mapping into a vault with its own access controls — a breach of tokenized data is far less valuable without vault access. Tokens are also format-preserving (e.g., a token can look like an ID), enabling drop-in replacement.',

    tradeoffs: [
      ['Privacy strength',          'High (vault-dependent)',         'val-low'],
      ['Data utility',              'High (operational use)',         'val-low'],
      ['Data stays local?',         'Tokenized data shareable',      'val-low'],
      ['3rd party needed?',         'Vault operator',                'val-med'],
      ['Implementation complexity', 'Low–Medium',                    'val-low'],
      ['Output type',               'Tokenized operational records (PII fields replaced)', 'val-med'],
    ],

    notes: '<ul style="margin:8px 0 0 0;padding-left:1.4em;line-height:1.9"><li><strong>FERPA / Legal relevance.</strong> Tokenized data shared with a partner still constitutes a FERPA-regulated disclosure — tokens are pseudonyms, not de-identified records, because the vault preserves full re-identification capability and no FERPA safe harbor applies. Agencies must establish a valid FERPA legal basis before transferring tokenized education records to any partner, and the governing data-use agreement should specify vault access controls and explicitly prohibit partners from using tokens to attempt reverse-linkage or re-identification.</li></ul>',

    resources: [
      // Cloud Security Alliance best practices guide for tokenization implementers
      ['Best Practices in Data Tokenization — Cloud Security Alliance', 'https://cloudsecurityalliance.org/articles/best-practices-in-data-tokenization'],
      // NIST SP 800-122 — federal guide to protecting PII, covers tokenization in context
      ['Guide to Protecting the Confidentiality of PII (NIST SP 800-122)', 'https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-122.pdf'],
      // NIST 800-175B — cryptographic mechanisms for federal government, including FPE
      ['Guideline for Using Cryptographic Standards in the Federal Government (NIST SP 800-175B Rev 1)', 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-175Br1.pdf'],
    ],

    related: [
      {
        key:   'pprl',
        label: 'Privacy-Preserving Record Linkage',
        note:  'PPRL is the alternative when you need cross-agency linkage but cannot or should not maintain a re-identification vault. PPRL encodes identifiers before exchange — the matching partner cannot reverse them, and there is no vault to breach. Choose tokenization when authorized re-identification is an ongoing operational requirement; choose PPRL when you want linkage capability without any party holding re-identification power.',
      },
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

    poorFit: [
      'the dataset contains rare records or small demographic cells — suppression and generalization provide weak protection for sparse data and can be defeated by subtraction or background knowledge attacks',
      'your adversary has access to external data sources they can combine with the released dataset — quasi-identifier combinations can re-identify individuals even when direct identifiers are removed',
      'a formal, auditable privacy guarantee is required — traditional de-id provides no mathematical bound on re-identification risk and cannot be formally certified',
    ],

    related: [
      {
        key:   'dp',
        label: 'Differential Privacy',
        note:  'Traditional SDL techniques reduce re-identification risk heuristically — suppression, generalization, and k-anonymity provide no formal mathematical guarantee and are increasingly vulnerable to reconstruction and linkage attacks using external data. Differential privacy provides a provable ε bound: any individual\'s presence can only shift output probabilities by a factor of e^ε. When a formal, auditable guarantee is required, DP is the principled successor to SDL-only approaches.',
      },
      {
        key:   'synth',
        label: 'Synthetic Data',
        note:  'Both produce shareable, record-like files without exposing real student records directly. Traditional de-id suppresses, generalizes, or perturbs real records — the structure comes from real data, which limits how far protection can go without destroying utility. Synthetic data generates entirely new records from a statistical model — no real individual is in the output. For public-use microdata that needs to be freely shared, DP-trained synthetic data is more defensible than SDL-treated real records.',
      },
    ],

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
        notes: '',
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
        notes: '',
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
        notes: '',
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
        notes: '',
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
        notes: '<strong>Why k-anonymity is not sufficient on its own:</strong><ul style="margin:8px 0 8px 0;padding-left:1.4em;line-height:1.9"><li><strong>The homogeneity attack.</strong> k-anonymity only requires that k records share the same quasi-identifiers — it says nothing about what sensitive attributes those records carry. If all k records in an equivalence class have the same sensitive value (e.g., all 5 students in a k=5 group received special education services), an attacker can infer that sensitive attribute for any individual in that group with certainty, even without knowing which record belongs to them. The simulation highlights groups where this occurs with a warning callout.</li><li><strong>l-diversity is the direct extension.</strong> A dataset satisfies l-diversity when every equivalence class contains at least l <em>distinct</em> values for each sensitive attribute. This prevents the homogeneity attack by ensuring no sensitive attribute is overrepresented within a group. Entropy l-diversity strengthens this further by requiring that the sensitive values are not just distinct but also evenly distributed (Shannon entropy ≥ log(l)).</li><li><strong>t-closeness tightens the guarantee further.</strong> Even with l-diversity, an attacker may infer sensitive values if the distribution within an equivalence class is very different from the population distribution. t-closeness requires that the distribution of sensitive values in each equivalence class is within a threshold t of the overall population distribution (measured by Earth Mover\'s Distance). Smaller t = stronger guarantee but greater data distortion.</li><li><strong>None of these methods carry a formal, composable privacy guarantee.</strong> Unlike differential privacy, k-anonymity, l-diversity, and t-closeness cannot be composed: releasing multiple views of the same dataset may allow an adversary to re-identify individuals even if each release individually satisfies the criterion. They also provide no protection against adversaries who possess external background knowledge about specific individuals.</li></ul>',
        resources: [
          // Samarati & Sweeney 1998 original k-anonymity paper (freely available)
          ['Protecting Privacy when Disclosing Information: k-Anonymity and Its Enforcement — Samarati & Sweeney', 'https://dataprivacylab.org/dataprivacy/projects/kanonymity/paper3.pdf'],
          // OECD emerging PETs report 2023 — covers k-anonymity and its limitations vs. formal PETs
          ['Emerging Privacy-Enhancing Technologies: Current Regulatory and Policy Approaches — OECD (2023)', 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2023/03/emerging-privacy-enhancing-technologies_a6bdf3cb/bf121be4-en.pdf'],
        ],
      },

    }, // end techniques
  },

  // ── Compare module ─────────────────────────────────────────────────────────
  //
  // All editorial text, data arrays, and table metadata for the Compare module.
  // The render function (renderCompare in app.js) reads exclusively from here.
  compare: {

    // Module header
    header: {
      tag:        'All Techniques',
      title:      'Comparison Dashboard',
      definition: 'Side-by-side comparison of all privacy techniques across key dimensions relevant to education data contexts.',
    },

    // Symbols legend and scale panel copy
    symbolsTitle:   '✓ Symbols Guide',
    symbols: [
      { symbol: '✓', label: 'Fully satisfied' },
      { symbol: '~', label: 'Partially / conditionally' },
      { symbol: '✗', label: 'Not satisfied' },
    ],
    complexityTitle: 'Complexity Scale',
    complexityScale: [
      '● — Relatively low',
      '●●● — Moderate',
      '●●●●● — Very high',
    ],
    sldsNote: 'Most SEAs layer traditional methods (suppression + generalization) as a baseline, then add formal PETs (DP, PPRL) for higher-risk data sharing contexts.',

    // Tab bar labels
    tabs: {
      tables:    '📋 Comparison Tables',
      radarPets: '◉ Radar — PETs',
      radarTrad: '◉ Radar — Traditional De-ID',
    },

    // PETs radar panel title and description
    petsRadarTitle:       'Privacy-Enhancing Technologies — Multi-Dimension Radar',
    petsRadarDescription: 'Each polygon represents one PET scored 1–5 on five dimensions. A larger area means better overall profile across these axes — but the right technique depends on your specific threat model and constraints. <strong>Click any technique in the legend to isolate it. Hover an axis label for a description.</strong>',

    // Tooltip descriptions for each axis spoke in the PETs radar (order must match axes array in drawCompareRadar).
    petsRadarAxisTips: [
      { term: 'Privacy Strength',          body: 'How robustly the technique protects against re-identification or inference. 5 = formal mathematical guarantee (ε-DP or cryptographic proof). 1 = heuristic or no formal protection.' },
      { term: 'Data Utility',              body: 'How much analytical value is preserved after applying the technique. 5 = full result accuracy, no distortion. 1 = binary output only or significant precision loss.' },
      { term: 'Ease of Implementation',    body: 'Engineering and governance burden to deploy correctly. 5 = drop-in libraries exist, minimal expertise needed. 1 = requires specialist cryptographers and dedicated infrastructure.' },
      { term: 'Data Stays Local',          body: 'Whether raw student records leave the originating institution. 5 = raw data never leaves. 1 = raw records must be transmitted to a third party to compute the result.' },
      { term: 'Formal Guarantee',          body: 'Whether privacy protection is backed by a mathematical proof. 5 = proven guarantee (ε-DP, cryptographic). 1 = no formal guarantee — protection is heuristic or implementation-dependent.' },
    ],

    // Traditional De-ID radar panel title, description, and scores.
    // Axes: Privacy Strength, Data Utility, Small Group Protection,
    //       Ease of Implementation, Attack Resistance (all 1–5, higher = better).
    // All five techniques score low on Attack Resistance — none carry formal
    // mathematical privacy guarantees. Adjust scores here to update the chart.
    tradRadar: {
      title:       'Traditional De-identification — Multi-Dimension Radar',
      description: 'Each polygon scores one technique 1–5 across five operational dimensions. Note that all five techniques score low on <strong>Attack Resistance</strong> — none carry formal mathematical privacy guarantees. Use this chart to understand where each method excels operationally, not as a measure of absolute privacy strength. <strong>Click any technique in the legend to isolate it. Hover an axis label for a description.</strong>',

      // Tooltip descriptions for each axis spoke (order must match axes array in drawTradRadar).
      axisTips: [
        { term: 'Privacy Strength',        body: 'How strongly the technique protects individual records from re-identification. 5 = robust individual protection. 1 = minimal — easily defeated with external data sources.' },
        { term: 'Data Utility',            body: 'How much analytical value is preserved after applying the technique. 5 = full utility retained. 1 = significant information loss that affects decision-making.' },
        { term: 'Small Group Protection',  body: 'Protection for rare subgroups — students with disabilities, small LEAs, or unusual demographic combinations. 5 = strong protection. 1 = small groups remain highly vulnerable to re-identification.' },
        { term: 'Ease of Implementation',  body: 'Operational burden to deploy. 5 = available in standard reporting tools, minimal expertise needed. 1 = requires specialist knowledge and significant configuration effort.' },
        { term: 'Attack Resistance',       body: 'Resistance to re-identification via combining fields, using background knowledge, or differencing attacks. All traditional methods score low — none carry formal mathematical privacy guarantees.' },
      ],
      techniques: [
        { name: 'Cell Suppression', color: 'var(--blue)',   bgColor: 'rgba(77,159,255,0.13)',  scores: [2, 4, 5, 5, 2] },
        { name: 'Data Masking',     color: 'var(--amber)',  bgColor: 'rgba(255,201,64,0.13)',  scores: [3, 3, 1, 5, 2] },
        { name: 'Generalization',   color: 'var(--mint)',   bgColor: 'rgba(0,229,160,0.13)',   scores: [2, 4, 3, 3, 2] },
        { name: 'Perturbation',     color: 'var(--purple)', bgColor: 'rgba(176,111,255,0.13)', scores: [2, 4, 2, 4, 2] },
        { name: 'k-Anonymity',      color: '#ff6b9d',       bgColor: 'rgba(255,107,157,0.13)', scores: [3, 3, 4, 2, 3] },
      ],
    },

    // Panel title strings (count is derived dynamically from array length in app.js)
    petsTitle: 'Privacy-Enhancing Technologies',
    tradTitle: 'Traditional De-identification Methods',

    // PETs comparison table data (8 techniques)
    pets: [
      { name: 'Differential Privacy',   local: '✓ Yes',              interpretable: '✓ Yes (noisy)',            utilityImpact: '~ Noise reduces precision',        utilityTip: 'Each query adds calibrated Laplace or Gaussian noise scaled to 1/ε. At strong privacy settings (low ε), individual group counts may be off by tens — acceptable for large populations but potentially misleading for small subgroups such as students with disabilities or specific demographic cells.',                                                                                                                                                      formal: '✓ Proven (ε)',           attackRisk: 'Differencing attack',          attackTip: 'Running two overlapping queries and subtracting reveals an individual record. The ε budget bounds (but does not eliminate) this risk — containing differencing attacks is the original motivation for developing differential privacy.', complexity: 2, complexityTip: 'Libraries exist (OpenDP, Google DP library) and are well-documented. Main challenge is calibrating sensitivity and ε correctly — misconfiguration silently undermines the guarantee with no visible error.', usecase: 'Aggregate queries on sensitive datasets' },
      { name: 'PPRL',                   local: '✓ Yes',              interpretable: '✓ Yes (matched pairs)',    utilityImpact: '~ Some false matches possible',    utilityTip: 'Bloom filter matching tolerates name variation and typos, but introduces two error types: false positives (different people matched as the same) and false negatives (same person not matched due to data quality differences). Threshold tuning controls this tradeoff — a lower threshold catches more matches but risks linking distinct individuals.',                                                                                                  formal: '~ Computational',        formalTip: 'PPRL security relies on the computational difficulty of reversing a hash or Bloom filter — there is no formal proof that it cannot be broken, only that it is impractical with current hardware. This is weaker than ε-DP or cryptographic guarantees.', attackRisk: 'Linkage / re-identification',  attackTip: 'Joining two encoded datasets from different sources can re-identify individuals even without the underlying PII — the classic Netflix and AOL attack pattern. Hash hardening and careful threshold tuning are the main mitigations.', complexity: 3, complexityTip: 'Encoding parameters (bigram settings, bit-array length, hash functions) require specialist knowledge. Threshold tuning must be validated against ground-truth data. Coordination between agencies on shared encoding parameters adds operational burden.', usecase: 'Cross-agency record matching without PII' },
      { name: 'Secure MPC',             local: '✓ Yes',              interpretable: '✓ Yes (result)',           utilityImpact: '✓ Full result accuracy',           formal: '✓ Proven',               attackRisk: 'Malicious party deviation',      attackTip: 'A party that deviates from the agreed protocol may attempt to extract information beyond the agreed output. Cryptographic commitments and zero-knowledge proofs enforce honest behavior in production deployments — this risk is addressed by the protocol design, not the data architecture.', complexity: 4, complexityTip: 'Requires cryptographic expertise to implement and audit correctly. Communication overhead scales with the number of parties and computation rounds. Off-the-shelf frameworks (MP-SPDZ, MOTION) exist but require significant engineering investment and specialist staff to deploy.', usecase: 'Joint computation across non-trusting parties' },
      { name: 'Federated Learning',     local: '✓ Yes',              interpretable: '~ Partial',                utilityImpact: '~ Less accurate than centralised', utilityTip: 'Model accuracy is lower than centralized training because: (1) data is heterogeneous across institutions — each site has a different distribution; (2) only gradients are shared, not raw records, so the global model converges more slowly; (3) adding DP-SGD noise to gradients further reduces accuracy. The gap narrows with more training rounds and more participating institutions.', formal: '~ Only with DP-SGD',     formalTip: 'Federated learning alone provides no formal privacy guarantee — gradient updates can be inverted to partially reconstruct training data. Adding DP-SGD (differentially private stochastic gradient descent) provides a formal (ε, δ)-DP guarantee on the gradient, making reconstruction attacks provably difficult.', attackRisk: 'Gradient inversion',             attackTip: 'Gradient updates shared with the coordinator can be mathematically inverted to approximately reconstruct individual training records — demonstrated by Zhu et al. (NeurIPS 2019). DP-SGD clips and noises gradients before sharing; secure aggregation prevents the coordinator from seeing individual institution gradients.', complexity: 4, complexityTip: 'Requires distributed infrastructure, a coordinator server, and FL framework expertise (Flower, PySyft). Formal privacy guarantees require adding DP-SGD and secure aggregation, each adding engineering complexity. Model convergence on heterogeneous data across institutions requires ongoing tuning.', usecase: 'Training shared ML models on distributed data' },
      { name: 'Synthetic Data',         local: '✓ Shareable',        interpretable: '✓ Yes',                    utilityImpact: '~ Fidelity varies by model',       utilityTip: 'Population-level statistics (means, overall distributions) are generally well-preserved. Small subgroup statistics degrade fastest — a 1-in-100 subgroup needs many more training records to model accurately than a 1-in-3 group. Fidelity worsens further when DP-SGD noise is added during training to provide formal guarantees. The privacy-utility tradeoff is most acute for rare demographic cells.',                                             formal: '~ Model-dependent',      formalTip: 'Privacy protection depends on how the generative model was trained. Without formal DP-SGD training, a model may memorize rare records — no mathematical bound on leakage exists. A DP-trained synthetic dataset upgrades this to a formal (ε, δ)-DP guarantee.', attackRisk: 'Membership inference',           attackTip: 'An adversary can query the generative model to determine whether a specific individual was in the training set. Rare records and outliers are most vulnerable — a student with an unusual combination of attributes (e.g., unique age/grade/IEP combination) may be recoverable even from published synthetic data.', complexity: 3, complexityTip: 'Generation libraries (SDV, CTGAN, smartnoise-sdk) are available but require data science expertise to configure and evaluate. DP-trained synthesis adds another layer of complexity. Fidelity validation and membership inference auditing require specialist knowledge before a dataset can be responsibly released.', usecase: 'Public research access, tool development' },
      { name: 'TEE / Secure Enclave',   local: '✓ In enclave',       interpretable: '✓ Yes',                    utilityImpact: '✓ No utility loss',                formal: '✓ Hardware attestation', formalTip: 'Security is rooted in hardware: the CPU cryptographically proves the enclave is unmodified and running the expected code. This is a strong practical guarantee, but relies on trusting the hardware manufacturer and attestation supply chain — not a pure mathematical proof.', attackRisk: 'Side-channel / supply chain',     attackTip: 'Security depends on trusting the hardware manufacturer and the integrity of the attestation chain. Known side-channel attacks (Spectre, Meltdown, SGX vulnerabilities) have broken enclave isolation in research settings. Supply chain compromise of the hardware or firmware is a residual risk not addressed by software design alone.', complexity: 5, complexityTip: 'Requires specialized hardware procurement, enclave software development (Intel SGX SDK, ARM TrustZone), and attestation infrastructure. Side-channel mitigations require deep hardware expertise. Very few staff have the skills to implement and audit correctly — typically requires dedicated security engineers.', usecase: 'Secure computation on restricted platforms' },
      { name: 'Homomorphic Encryption', local: '✓ Encrypted',        interpretable: '✓ Yes (after decryption)', utilityImpact: '✓ Exact results',                  formal: '✓ Cryptographic',        formalTip: 'Homomorphic encryption provides a formal cryptographic security proof: without the private key, an adversary cannot learn anything about the plaintext from the ciphertext, even with unlimited computation (for information-theoretically secure schemes) or in practice (for BFV/CKKS/BGV).', attackRisk: 'Key management failure',         attackTip: 'The only attack surface is the private key — if it is leaked, stolen, or improperly shared, all encrypted data is immediately exposed. Unlike a database breach (which exposes records in scope), a key compromise is retroactive: it exposes all data ever encrypted with that key.', complexity: 5, complexityTip: 'Cryptographic parameter selection (lattice dimensions, modulus chains) requires deep specialist expertise. Computation is 1,000–1,000,000x slower than plaintext. No broadly accessible deployment frameworks for non-specialists currently exist. Active area of standardization work.', usecase: 'Outsourced analytics without data exposure' },
      { name: 'Tokenization',           local: '✓ Tokens shareable', interpretable: '✓ Yes (operational)',      utilityImpact: '✓ Operational data preserved',     formal: '✗ No formal guarantee',  attackRisk: 'Vault breach',                   attackTip: 'The token vault is the single point of re-identification. A breach of the vault — or unauthorized vault access by an insider — directly exposes all PII that was ever tokenized, without any additional decryption step needed by the attacker.', complexity: 2, complexityTip: 'Commercial vault services and format-preserving encryption libraries are widely available. Primary complexity is vault access-control governance and key management procedures rather than engineering — well within reach of most IT teams.', usecase: 'Cross-system data linkage without PII' },
      { name: 'Zero-Knowledge Proofs (ZKP)', local: '✓ Proof only',  interpretable: '~ Binary result only',     utilityImpact: '~ Binary / threshold queries only', utilityTip: 'ZKP is optimized for binary or threshold claims (enrolled/not, eligible/not, meets-threshold/not). Complex analytical queries requiring counts, averages, or distributions require layering differential privacy or other techniques. The tradeoff: maximal privacy protection on what you prove, but limited to what can be expressed as an arithmetic circuit.', formal: '✓ Cryptographic', formalTip: 'ZKP provides a formal cryptographic guarantee: the verifier learns nothing about the underlying data beyond the proven statement. This is arguably stronger than ε-DP for point queries — the verifier receives zero information about the input, not merely "bounded information." The proof is cryptographically unforgeable without knowledge of the witness.', attackRisk: 'Trusted setup / circuit bugs', attackTip: 'Many ZKP systems (zk-SNARKs) require a trusted setup ceremony — if the toxic waste from this ceremony is not destroyed, a malicious actor could forge proofs. Circuit bugs (incorrect encoding of the statement to prove) can also allow invalid proofs to verify. Transparent ZKP systems (STARKs, PLONK) eliminate the trusted setup requirement.', complexity: 5, complexityTip: 'Requires cryptographic engineering expertise, circuit design skills (encoding statements as arithmetic circuits), and ZKP infrastructure. No drop-in libraries for education data use cases currently exist. Proof generation is computationally intensive. Technology and tooling are still maturing rapidly.', usecase: 'Binary eligibility verification without PII disclosure' },
    ],

    // Traditional de-identification comparison table data (5 methods)
    tradMethods: [
      { name: 'Cell Suppression', guarantee: '✗ None',                interpretable: '~ Gaps visible',      utility: '~ Reduced for small groups', attackRisk: 'Subtraction attack',                attackTip: 'An adversary who knows marginal totals can subtract a suppressed cell from a known row or column total to infer its value. Complementary suppression (removing additional cells) is the standard mitigation, but it is incomplete for complex cross-tabulations with many cells.', complexity: 1, complexityTip: 'Well-understood and available in standard reporting tools. Main challenge is implementing complementary suppression correctly for complex cross-tabulations — simple single-cell suppression without complementary suppression can be trivially defeated.', bestFor: 'Published aggregate tables (NCES, FERPA compliance)' },
      { name: 'Data Masking',     guarantee: '✗ None',                interpretable: '~ Partial (masked)',   utility: '~ Field-level loss',         attackRisk: 'Quasi-identifier combination',      attackTip: 'Combining partially-masked fields with external data sources (voter rolls, social media, public records) can re-identify individuals whose quasi-identifiers (age, ZIP code, gender, grade level) uniquely identify them — even when direct identifiers such as name and SSN are masked.', complexity: 1, complexityTip: 'Field-level masking is available in most ETL and database tools. Primary challenge is identifying all fields requiring masking across the data estate — data discovery and classification is often more complex than the masking itself.', bestFor: 'Sharing operational data internally with restricted fields' },
      { name: 'Generalization',   guarantee: '✗ None',                interpretable: '✓ Yes (ranges)',       utility: '~ Precision loss',           attackRisk: 'Background knowledge attack',       attackTip: 'An adversary with external information about a specific individual (known age, neighborhood, disability status) can narrow generalized ranges to a single person, defeating the de-identification. Protection degrades as the adversary\'s background knowledge increases.', complexity: 2, complexityTip: 'Requires designing generalization hierarchies for each attribute type (age ranges, ZIP prefix lengths, grade bands). Complexity grows when applied simultaneously across many quasi-identifiers — hierarchy design decisions require domain knowledge.', bestFor: 'HIPAA Safe Harbor de-id; demographic reporting' },
      { name: 'Perturbation',     guarantee: '✗ None (DP is better)', interpretable: '✓ Yes (distorted)',    utility: '~ Slight distortion',        attackRisk: 'Differencing attack',               attackTip: 'Running two similar queries on overlapping subsets and subtracting the results can cancel out the noise and reveal individual values. Unlike differential privacy, perturbation has no formal bound on how much information is leaked by repeated queries.', complexity: 2, complexityTip: 'Noise addition is straightforward to implement. The challenge is calibrating noise levels to balance utility and privacy without a formal bound — there is no principled way to know if the noise amount chosen is sufficient, unlike differential privacy.', bestFor: 'Federal survey microdata where exact values must be obscured' },
      { name: 'k-Anonymity',      guarantee: '~ Quasi-ID protection', interpretable: '✓ Yes (generalised)', utility: '~ Reduced',                  attackRisk: 'Homogeneity / background knowledge', attackTip: 'When all k records in a group share the same sensitive attribute value (e.g., all 5 students have IEP status), group membership reveals that attribute with certainty — the homogeneity attack. Separately, an adversary with external knowledge about a specific individual can narrow a k-group to a single person even when sensitive values vary.', complexity: 3, complexityTip: 'Requires quasi-identifier identification, equivalence class computation, and complementary suppression or generalization. Tools such as ARX exist but require expertise to configure and validate. Ongoing re-evaluation needed as datasets change or new quasi-identifiers are identified.', bestFor: 'HIPAA Expert Determination; microdata release with grouping guarantees' },
    ],

  }, // end compare

  // ── ZKP module ──────────────────────────────────────────────────────────────
  zkp: {
    tag:        'Emerging Technique',
    title:      'Zero-Knowledge Proofs (ZKP)',
    definition: 'A ZKP lets one party (the Prover) convince another (the Verifier) that a statement is true — without revealing any information beyond the fact of its truth. Because no underlying data is transmitted, ZKP minimizes the risk of a FERPA disclosure — though practitioners should consult legal counsel on whether the proof itself constitutes a record disclosure.',

    poorFit: [
      'you need aggregate statistics, counts, or averages — ZKP is optimized for binary or threshold claims ("meets threshold / does not") and cannot natively produce summaries',
      'proof generation latency is a constraint — generating proofs is computationally intensive and not suited for high-volume or real-time verification workflows',
      'your team has no cryptographic engineering experience — circuit bugs can silently allow invalid proofs to verify, with no visible error',
    ],

    tabs: ['① The Analogy', '② Single-Shot Proof', '③ Education Demo', '④ FERPA Workflow', '⑤ Tradeoffs'],

    // ── Section 0: Marble analogy ──────────────────────────────────────────────
    analogy: {
      partLabel:      'PART 1 OF 2 · The Analogy: Peggy\'s Marbles',
      intro:          '<strong>Victor is color-blind.</strong> His friend Peggy claims she can tell the difference between a red and green marble — but she won\'t say which is which (that\'s her secret). How can Peggy <em>prove</em> she knows the difference without telling Victor the secret?<br><br>Victor hides both marbles behind his back, then randomly swaps them — or not. He shows Peggy and asks: <em>"Did I swap them?"</em> Because Peggy can see the colors, she always knows. A faker could only guess (50/50). Run enough rounds and sustained correct answers become statistically overwhelming proof of knowledge.',
      peggyTitle:     '🧑 Peggy (Prover)',
      peggyDesc:      'She sees the secret — the true colors.',
      victorTitle:    '👁️ Victor (Verifier)',
      victorDesc:     'Color-blind — both look identical to him.',
      waitingText:    'Waiting to begin. Click <strong>Run Round</strong> — Victor hides the marbles and may swap them.',
      confidenceLabel:'Victor\'s Confidence (Peggy isn\'t guessing)',
      roundsLabel:    'Rounds:',
      interpStates: [
        { min: 0,  label: 'No evidence yet' },
        { min: 1,  label: 'Some evidence' },
        { min: 3,  label: 'Moderate confidence' },
        { min: 5,  label: 'Strong confidence' },
        { min: 10, label: 'Near-certain' },
        { min: 20, label: 'Statistically conclusive' },
      ],
      swappedText:    'SWAPPED',
      notSwappedText: 'NOT swapped',
      correctText:    'Peggy correctly identified:',
      guessNote:      'A prover without the knowledge could only guess. Repeated success is proof of knowledge.',
      marbleLabels:   { red: 'Red', green: 'Green', hidden: '???' },
      buttons:        { run: '▶ Run Round', runMany: 'Run 10 Rounds', reset: '↺ Reset' },
    },

    principles: [
      { id: 'zkp-p-complete', icon: '✅', label: 'Completeness',    colorClass: 'mint',   desc: 'If Peggy truly knows, she always answers correctly. An honest prover never fails.' },
      { id: 'zkp-p-sound',    icon: '🎲', label: 'Soundness',       colorClass: 'blue',   desc: 'A faker can only guess — 50% per round. After 20 rounds, the odds of sustained cheating are less than 1 in a million.' },
      { id: 'zkp-p-zk',       icon: '🔒', label: 'Zero-Knowledge',  colorClass: 'purple', desc: 'Victor learns only that Peggy knows — not which marble is red or green. The secret is never revealed.' },
    ],

    // ── Section 1: Single-shot proof ───────────────────────────────────────────
    singleShot: {
      buttons:             { generate: '⚡ Generate Single Proof', reset: '↺ Reset' },
      intro:               'The marble game requires many rounds of back-and-forth — which builds intuition, but is impractical for a state audit system. Real-world ZKPs solve this with a <strong>non-interactive proof</strong>: the prover computes the entire proof in one step, with no back-and-forth required.',
      interactiveLabel:    'Interactive (Marble Game)',
      interactiveSteps:    ['① Prover commits <span style="color:var(--mint)">→</span>', '<span style="color:var(--blue)">← </span>② Verifier sends challenge', '③ Prover responds <span style="color:var(--mint)">→</span>', '<span style="color:var(--blue)">← </span>④ Verifier checks', '<em style="color:var(--text-dim)">…repeat N times</em>'],
      interactiveNote:     '⚠️ Requires live back-and-forth. Not practical for automated audit systems.',
      nonInteractiveLabel: 'Non-Interactive (Real ZKP)',
      nonInteractiveSteps: ['① Prover commits to the data', '② Math function generates challenge', '③ Prover computes full response', '④ Packages into <strong style="color:var(--mint)">one proof object</strong> <span style="color:var(--mint)">→</span>', '<span style="color:var(--blue)">⑤ Verifier checks — done ✓</span>'],
      nonInteractiveNote:  '✓ One message. No live interaction. Verifiable by anyone, any time.',
      hashCardTitle:       'How the challenge gets generated without Victor',
      hashCardBody:        'In the marble game, Victor provides a random challenge live — that\'s what prevents Peggy from cheating. In a non-interactive proof, a <strong>mathematical hash function</strong> takes the commitment itself as input and produces a deterministic, unpredictable challenge. Neither party can manipulate it. The prover still has to demonstrate knowledge; they just do it all at once, with no Victor in the room.',
      tryItTitle:          'Try it: Generate a single proof',
      tryItDesc:           'Instead of running rounds, generate one proof that Peggy knows the secret — all at once.',
      nizkpPlaceholder:    'Click <strong>Generate Proof</strong> to see the single-shot proof protocol.',
      bridgeNote:          '<strong>The bridge to education data:</strong> In the next section, you\'ll see this same single-shot structure applied to real scenarios — a district system generates one proof that a student meets an eligibility threshold, and an auditor verifies it instantly. No PII travels. No back-and-forth. No FERPA disclosure event.',
    },

    // NIZKP animation line text. Use {hex32}, {hex16}, {hex24} as placeholders —
    // app.js replaces these with randHex() calls at render time.
    nizkpLines: [
      { color: 'var(--text-dim)', text: '[Prover] Encoding secret knowledge into cryptographic commitment...' },
      { color: 'var(--mint)',     text: '[Prover] Commitment generated: {hex32}' },
      { color: 'var(--text-dim)', text: '[Math]   Applying hash function to commitment → deterministic challenge...' },
      { color: 'var(--blue)',     text: '[Math]   Challenge value: {hex16} <span style="font-size:.7rem">(no live back-and-forth needed)</span>' },
      { color: 'var(--text-dim)', text: '[Prover] Computing response using secret + challenge...' },
      { color: 'var(--purple)',   text: '[Prover] Response: {hex24}' },
      { color: 'var(--text-dim)', text: '[Prover] Packaging {commitment, challenge, response} into proof object...' },
      { color: 'var(--mint)',     text: '[Proof]  ✓ Single proof object ready. Size: 288 bytes. No PII included.' },
      { color: '',                text: '' },
      { color: 'var(--text-dim)', text: '[Verifier] Received proof. Running verification equation...' },
      { color: 'var(--mint)',     text: '[Verifier] ✓ VALID. Prover knows the secret. Verification time: 4ms.' },
      { color: 'var(--text-dim)', text: '[Verifier] Secret itself: <strong style="color:var(--coral)">NEVER SEEN. NEVER TRANSMITTED.</strong>' },
    ],

    // ── Section 2: Education demo ──────────────────────────────────────────────
    scenariosSub:   'Select a real-world education data scenario. Then step through the ZKP protocol to see how a fact is proven without disclosing the underlying student records.',
    chanMsgDefault: 'Encrypted proof object only',
    stepLabels:     ['▶ Step 1: Commit', '▶ Step 2: Challenge', '▶ Step 3: Respond', '▶ Step 4: Verify'],
    scenarios: [
      {
        icon:     '🎓',
        title:    'Graduation Credential',
        desc:     'Prove a student meets federal program eligibility thresholds without revealing GPA, credit hours, or identity.',
        prover:   'District Student Information System',
        verifier: 'Federal Program Auditor',
        steps: [
          { cls: 'mint',  html: '<strong>Commit:</strong> The district system encodes the student\'s complete transcript (GPA, credits, completion date) into a cryptographic commitment — a locked container. The commitment is sent to the auditor. No readable data has been transmitted.' },
          { cls: 'blue',  html: '<strong>Challenge:</strong> The auditor sends a random challenge value. This prevents the prover from pre-computing a fake proof — the response must incorporate the specific challenge number.' },
          { cls: 'mint',  html: '<strong>Respond:</strong> The district system computes a response using both the commitment and the student\'s actual records. The math proves the response is correct <em>only if</em> the underlying records satisfy the eligibility threshold.' },
          { cls: 'amber', html: '<strong>Verify:</strong> The auditor runs the verification equation. It checks out. <span style="color:var(--mint)">✓ Result: Student meets graduation eligibility. No GPA, credit count, or student name was ever transmitted.</span>' },
        ],
        chanMsgs: ['Commitment (locked)', 'Random challenge', 'Computed response', '✓ Verified'],
      },
      {
        icon:     '📊',
        title:    'Title I Income Eligibility',
        desc:     'Prove household income qualifies for free/reduced lunch without disclosing the actual income figure.',
        prover:   'District Benefits System',
        verifier: 'State Education Agency',
        steps: [
          { cls: 'mint',  html: '<strong>Commit:</strong> The benefits system encodes the household income figure into a cryptographic commitment. The commitment reveals nothing about the value — it\'s like a sealed envelope with a tamper-evident seal.' },
          { cls: 'blue',  html: '<strong>Challenge:</strong> The SEA sends a random challenge. The challenge ensures the proof is fresh — it cannot be replayed from a previous verification.' },
          { cls: 'mint',  html: '<strong>Respond:</strong> The system generates a proof that the income value, when compared against the eligibility threshold, satisfies the condition — without revealing the actual figure or which side of the threshold the family is on.' },
          { cls: 'amber', html: '<strong>Verify:</strong> SEA runs verification. <span style="color:var(--mint)">✓ Result: Household qualifies for Title I benefits. Actual income figure: never transmitted, never stored by SEA.</span>' },
        ],
        chanMsgs: ['Income commitment', 'Fresh challenge', 'Threshold proof', '✓ Eligible — no data retained'],
      },
      {
        icon:     '🔗',
        title:    'Cross-Agency Enrollment',
        desc:     'Prove a student is currently enrolled across two state agencies without sharing a student ID or any PII.',
        prover:   'State Education Data System',
        verifier: 'Child Welfare Agency',
        steps: [
          { cls: 'mint',  html: '<strong>Commit:</strong> The education system generates a cryptographic commitment to the student enrollment record — keyed to the specific student without transmitting any identifier the child welfare agency could link to other records.' },
          { cls: 'blue',  html: '<strong>Challenge:</strong> The child welfare agency sends a challenge tied to the specific verification request. This prevents the education system from using a pre-generated proof for a different student or time period.' },
          { cls: 'mint',  html: '<strong>Respond:</strong> The education system proves that an enrollment record matching the query exists and is current — without transmitting the student ID, name, or any linkable identifier.' },
          { cls: 'amber', html: '<strong>Verify:</strong> Child welfare agency checks the proof. <span style="color:var(--mint)">✓ Result: Student confirmed enrolled as of query date. Zero PII crossed the agency boundary. No FERPA disclosure event triggered.</span>' },
        ],
        chanMsgs: ['Anonymous commitment', 'Verification challenge', 'Enrollment proof', '✓ Confirmed — no ID transmitted'],
      },
    ],

    // ── Section 3: FERPA workflow ──────────────────────────────────────────────
    ferpa: {
      sub:           'A state auditor needs to verify that every student in a district is currently enrolled. Under the legacy workflow, this triggers FERPA\'s audit/evaluation exception — requiring written agreements, PII disclosure, and data breach liability. A ZKP workflow eliminates all three.',
      legacyLabel:   '⚠️ Legacy Workflow (FERPA Audit Exception)',
      legacyIcons:   ['📋', '🛑', '⏳', '📤', '🗄️'],
      legacySteps: [
        'Auditor submits formal request for student enrollment records (names, IDs, dates)',
        '<strong style="color:var(--coral)">FERPA Disclosure Triggered.</strong> Written audit/evaluation agreement must be executed before data can be released.',
        'Administrative delay: legal review, agreement drafting, signature process (days to weeks)',
        'Raw PII transmitted: student names, DOBs, SSNs or state IDs, enrollment dates',
        'Auditor now holds a copy of the PII dataset — breach liability surface created',
      ],
      legacyResult:  '⚠️ PII disclosed · Written agreement required · Breach liability: HIGH',
      zkpLabel:      '✅ ZKP Workflow',
      zkpIcons:      ['📋', '🔐', '💎', '📨', '🚫'],
      zkpSteps: [
        'Auditor submits query: <em>"Is every student in this cohort currently enrolled?"</em>',
        'ZKP Gateway processes the student database <strong>locally</strong>. No records leave the system.',
        'System generates a compact <strong>verification proof</strong> — a cryptographic object encoding only the yes/no answer.',
        'Only the proof is transmitted. The auditor receives: <span style="color:var(--mint);font-weight:600">✓ All students enrolled. Proof verified.</span>',
        'No PII transmitted, no dataset copy created, no FERPA disclosure triggered.',
      ],
      zkpResult:      '✅ Zero PII disclosed · No agreement required · Breach liability: LOW',
      analysisTitle:  'FERPA Analysis',
      analysisBody:   'Because the ZKP workflow never transmits education records — only a mathematical proof about aggregate properties — it does not trigger a FERPA disclosure event. The audit/evaluation exception (34 C.F.R. § 99.35) requires a written agreement precisely because PII is leaving the institution\'s control. When ZKP is used correctly, no PII leaves. The proof object itself carries no personally identifiable information and is not an education record under FERPA\'s definition.<br><br><span style="color:var(--amber)">⚠️ Important caveat:</span> ZKP is an emerging technology. SEAs considering deployment should consult with legal counsel on FERPA applicability and verify that the specific ZKP implementation provides the privacy guarantees claimed. Standards and regulatory guidance in this area are still developing.',
    },

    // ── Section 4: Tradeoffs ───────────────────────────────────────────────────
    tradeoffs: {
      sub:          'ZKPs offer strong privacy guarantees, but implementation is complex and the technology is still maturing in education data contexts.',
      whenTitle:    'When ZKP makes sense for an SEA',
      goodFitLabel: '✅ Good fit',
      poorFitLabel: '⚠️ Poor fit',
      tiles: [
        { label: 'Privacy Protection',         colorClass: 'mint',   rating: 5, text: 'Strongest theoretical privacy guarantee of any PET category. Verifier learns <em>literally nothing</em> beyond the proven statement. No residual data to re-identify. Cryptographic guarantee rather than policy-based protection.' },
        { label: 'Utility / Accuracy',          colorClass: 'blue',   rating: 3, text: 'High accuracy for <em>binary or threshold queries</em> (enrolled/not, eligible/not). Less suited to complex analytical queries requiring counts, averages, or distributions — those require differential privacy or other techniques layered on top.' },
        { label: 'Implementation Complexity',   colorClass: 'amber',  rating: 4, text: 'Significantly more complex than tokenization or traditional de-id. Requires cryptographic infrastructure, specialized developer expertise, and careful circuit design. Computational cost (proof generation) is high. Not a drop-in replacement for existing workflows.' },
        { label: 'Technology Maturity',         colorClass: 'purple', rating: 2, text: 'Rapidly maturing in fintech and identity contexts (Google Wallet uses ZKP for age attestation). Education-specific implementations are early-stage. No established vendor ecosystem for SEA use cases. Standards and FERPA guidance still developing.' },
      ],
      goodFit: [
        'Binary eligibility determinations (enrolled, qualified, compliant)',
        'Cross-agency queries where data sharing agreements are burdensome',
        'High-sensitivity populations (special education, child welfare)',
        'Credential verification (does this person hold this credential?)',
      ],
      poorFit: [
        'Longitudinal research requiring full record access',
        'Complex analytical queries (distributions, regressions)',
        'Organizations without cryptographic engineering capacity',
        'Contexts requiring human-readable audit trails',
      ],
    },

    // ── Section 5: Compare (key insight + pointer to main Compare module) ──────
    compareInsight: {
      title: 'Key Insight for SEA Practitioners',
      body:  'ZKP doesn\'t replace the techniques you already use — it addresses a different problem. Suppression, k-anonymity, and differential privacy protect against re-identification in <em>released datasets</em>. ZKP prevents the dataset from leaving at all. Think of it as the difference between "sanitizing what you share" vs. "proving a fact without sharing anything." The two approaches are complementary: an SEA might use differential privacy for public data releases and ZKP for cross-agency eligibility verification — each technique matched to the appropriate use case.',
    },

    // ── Section 6: Resources ───────────────────────────────────────────────────
    resourcesIntro: 'Vetted resources for SEA staff and education researchers who want to go deeper on ZKPs — from conceptual primers to technical specifications.',
    resources: [
      { icon: '📖', title: 'ZKProof Community Standards',                                         desc: 'The primary open standards body for zero-knowledge proof implementations. Includes practitioner-accessible documentation on proof systems, security properties, and application domains.', tag: 'Standards · Technical', url: '' },
      { icon: '🏛️', title: 'NIST Post-Quantum Cryptography Standards (NIST IR 8413)',              desc: 'NIST\'s framework for next-generation cryptographic standards, which includes the underlying techniques that power practical ZKP implementations. Relevant for SEAs planning long-term cryptographic infrastructure.', tag: 'Federal · Standards', url: '' },
      { icon: '🎓', title: '"Proofs, Arguments, and Zero-Knowledge" — Justin Thaler (Georgetown)', desc: 'The most accessible rigorous textbook on ZKPs, freely available online. Part I covers the conceptual foundations without requiring advanced mathematics. Recommended for researchers wanting the formal grounding.', tag: 'Academic · Free', url: '' },
      { icon: '🔑', title: 'Google Wallet ZKP Age Attestation (Developer Documentation)',          desc: 'A deployed real-world implementation of ZKP for age verification — the closest production analogue to education eligibility verification. Useful for understanding what a practical ZKP credential workflow looks like.', tag: 'Implementation · Industry', url: '' },
      { icon: '⚖️', title: 'FERPA Audit/Evaluation Exception — 34 C.F.R. § 99.35',                desc: 'The regulatory text governing when PII may be disclosed for audit and evaluation purposes without prior consent. Understanding this provision is prerequisite to analyzing how ZKP might affect FERPA compliance workflows.', tag: 'Legal · FERPA', url: '' },
    ],

    notes: '<strong>ZKP vs. other formal PETs:</strong> Unlike differential privacy, which bounds how much information is revealed, ZKP reveals <em>zero</em> information about the underlying data beyond the proven claim. Unlike homomorphic encryption, which returns an encrypted computed result, ZKP returns only a proof — not a data value. Choose ZKP when you need to prove a binary claim; choose HE or DP when you need to share computed results.',

    // ── UI labels ─────────────────────────────────────────────────────────────
    demo: {
      actorProverLabel:   'Prover',
      actorVerifierLabel: 'Verifier',
      resetBtn:           '↺ Reset Scenario',
      completeBtn:        '✓ Proof Complete',
    },
    // Per-tab navigation button labels. Index matches tab number (0–4).
    // null = no button rendered for that direction.
    navButtons: [
      { back: null,                   next: 'Next: Single-Shot Proof →' },
      { back: '← Back: The Analogy',  next: 'Next: Education Demo →'    },
      { back: '← Back',               next: 'Next: FERPA Workflow →'    },
      { back: '← Back',               next: 'Next: Tradeoffs →'         },
      { back: '← Back',               next: null                        },
    ],
  }, // end zkp

}; // end CONTENT
