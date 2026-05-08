/* ---- CONTRAST SLIDER (0–100%) ---- */
/* ---- BRIGHTNESS SLIDER (0–100%) - SIMPLIFIED & WORKING ---- */
const brightnessSlider = document.getElementById('contrast-slider'); // Keep original ID
const brightnessVal    = document.getElementById('contrast-val');     // Keep original ID  
const overlay          = document.getElementById('contrast-overlay'); // Keep original ID

brightnessSlider.addEventListener('input', () => {
  const v = parseInt(brightnessSlider.value);
  brightnessVal.textContent = v + '%';
  brightnessSlider.setAttribute('aria-valuenow', v);
  
  // Apply brightness to BODY only (safe & works everywhere)
  document.body.style.filter = `brightness(${1 + (v / 200)})`; // 1.0 to 1.5 range
  
  // Visual feedback overlay
  overlay.style.opacity = (v / 100) * 0.2;
});

// Reset on double-click
brightnessSlider.addEventListener('dblclick', () => {
  brightnessSlider.value = 0;
  brightnessVal.textContent = '0%';
  document.body.style.filter = 'brightness(1)';
  overlay.style.opacity = 0;
});

    /* ---- TEXT SIZE — 5 LEVELS ---- */
    const fontSizes = { xs: '13px', s: '14px', m: '16px', l: '19px', xl: '22px' };
    const tsBtns = document.querySelectorAll('.ts-btn');

    tsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tsBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed','true');
        const size = fontSizes[btn.dataset.ts];
        document.documentElement.style.setProperty('--base-font-size', size);
        document.documentElement.style.fontSize = size;
      });
    });

    /* ---- Scroll Reveal ---- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i * 0.05) + 's';
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ---- Rights Accordion ---- */
    document.querySelectorAll('.right-card').forEach(card => {
      function toggle() {
        const open = card.classList.toggle('open');
        const body = card.querySelector('.right-body');
        body.hidden = !open;
        card.setAttribute('aria-expanded', open);
      }
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });

    /* ---- Category Filter Tabs ---- */
    const tabs = document.querySelectorAll('.rights-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        document.querySelectorAll('.right-card').forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.setAttribute('data-hidden', 'false');
            card.style.display = '';
          } else {
            card.setAttribute('data-hidden', 'true');
            card.style.display = 'none';
          }
        });
      });
    });

    /* ---- Search Knowledge Base ---- */
    const knowledge = {
      labor: [
        { title: 'Minimum Wage & Pay Rights', tag: 'Labor', tagClass: 'tag-labor', desc: 'Your employer must follow regional minimum wage laws. Overtime beyond 8 hours must be paid at 125% of your rate.', anchor: '#card-labor-1' },
        { title: 'Safe Working Conditions', tag: 'Labor', tagClass: 'tag-labor', desc: 'Employers must provide free safety equipment. You can refuse dangerous work without fear of termination.', anchor: '#card-labor-2' },
        { title: '13th Month Pay', tag: 'Labor', tagClass: 'tag-labor', desc: 'All rank-and-file employees are entitled to 13th month pay, regardless of employment status.', anchor: '#card-labor-1' },
      ],
      privacy: [
        { title: 'Right to Access & Delete Your Data', tag: 'Privacy', tagClass: 'tag-privacy', desc: 'Under the Data Privacy Act, you can ask companies what personal information they hold and request deletion.', anchor: '#card-privacy-1' },
        { title: 'Breach Notification', tag: 'Privacy', tagClass: 'tag-privacy', desc: 'Companies must inform you within 72 hours if your personal data has been compromised.', anchor: '#card-privacy-1' },
        { title: 'Anti-Wiretapping: Call Privacy', tag: 'Privacy', tagClass: 'tag-privacy', desc: 'No one can secretly record your phone calls or private conversations. It is a criminal offense.', anchor: '#card-privacy-2' },
      ],
      consumer: [
        { title: 'Right to Safe & Honest Products', tag: 'Consumer', tagClass: 'tag-consumer', desc: 'Products must not harm you. False advertisements are illegal. You can return defective items.', anchor: '#card-consumer-1' },
        { title: 'Online Shopping Rights', tag: 'Consumer', tagClass: 'tag-consumer', desc: 'Online sellers must give accurate descriptions, receipts, and honor cancellations before shipment.', anchor: '#card-consumer-2' },
      ],
      education: [
        { title: 'Free K-12 Public Education', tag: 'Education', tagClass: 'tag-education', desc: 'Every Filipino child has the right to free public education from Kindergarten to Grade 12.', anchor: '#card-education-1' },
        { title: 'Free State University (SUC) Education', tag: 'Education', tagClass: 'tag-education', desc: 'Under RA 10931, qualified students can attend State Universities and Colleges for free.', anchor: '#card-education-2' },
        { title: 'No Illegal School Fees', tag: 'Education', tagClass: 'tag-education', desc: 'Schools cannot collect fees not authorized by DepEd. You can report this.', anchor: '#card-education-1' },
      ],
      digital: [
        { title: 'Cybercrime Protection', tag: 'Digital', tagClass: 'tag-digital', desc: 'Online harassment, identity theft, hacking, and scams are criminal offenses you can report to NBI.', anchor: '#card-digital-1' },
        { title: 'Photo & Video Privacy', tag: 'Digital', tagClass: 'tag-digital', desc: 'Sharing intimate images without consent ("revenge porn") is a crime with up to 7 years imprisonment.', anchor: '#card-digital-2' },
        { title: 'Anti-Cyberbullying', tag: 'Digital', tagClass: 'tag-digital', desc: 'Online bullying and harassment are prosecutable under RA 10627 and RA 10175.', anchor: '#card-digital-1' },
      ],
      disability: [
        { title: 'PWD 20% Discount', tag: 'Disability', tagClass: 'tag-disability', desc: 'Persons with disabilities get a 20% discount on medicines, food, transport, hotels and more.', anchor: '#card-disability-1' },
        { title: 'Senior Citizen Benefits', tag: 'Disability', tagClass: 'tag-disability', desc: 'Citizens 60+ get 20% discount + VAT exemption, priority lanes, free vaccines, and PhilHealth coverage.', anchor: '#card-disability-2' },
        { title: 'PWD Employment Rights', tag: 'Disability', tagClass: 'tag-disability', desc: 'Companies with 50+ employees must hire at least 1% PWD workers. Discrimination is illegal.', anchor: '#card-disability-1' },
      ],
      health: [
        { title: 'Universal Health Care (PhilHealth)', tag: 'Health', tagClass: 'tag-health', desc: 'All Filipinos are automatically PhilHealth members. Free consultations at public health centers.', anchor: '#card-health-1' },
        { title: 'Mental Health Rights', tag: 'Health', tagClass: 'tag-health', desc: 'You have the right to mental health services. Employers cannot discriminate based on mental health.', anchor: '#card-health-2' },
        { title: 'Maternity Leave (105 Days)', tag: 'Health', tagClass: 'tag-health', desc: 'Working mothers are entitled to 105 days paid maternity leave. Solo moms get an extra 15 days.', anchor: '#card-health-3' },
      ],
      housing: [
        { title: 'Right Against Forced Eviction', tag: 'Housing', tagClass: 'tag-housing', desc: 'Demolition without proper notice and relocation assistance is illegal. You need a court order.', anchor: '#card-housing-1' },
        { title: 'Tenant Rights & Rent Control', tag: 'Housing', tagClass: 'tag-housing', desc: 'Landlords cannot raise rent more than 7%/year for low-cost units. Security deposit must be returned.', anchor: '#card-housing-2' },
      ],
      family: [
        { title: "Children's Rights", tag: 'Family', tagClass: 'tag-family', desc: 'Child abuse, child labor, and exploitation are serious crimes. Report to DSWD or WCPD.', anchor: '#card-family-1' },
        { title: 'Domestic Violence Protection', tag: 'Family', tagClass: 'tag-family', desc: 'Physical, emotional, or financial violence in the home is a crime under RA 9262. Get a free BPO.', anchor: '#card-family-2' },
      ],
      gender: [
        { title: 'Gender Equality in Work & Life', tag: 'Gender', tagClass: 'tag-gender', desc: 'The Magna Carta of Women guarantees equal rights in hiring, salary, property, and health services.', anchor: '#card-gender-1' },
        { title: 'Anti-Sexual Harassment (Online & Offline)', tag: 'Gender', tagClass: 'tag-gender', desc: 'Catcalling, unwanted sexual messages, and workplace harassment are all illegal under RA 11313.', anchor: '#card-gender-2' },
      ],
      environment: [
        { title: 'Right to Clean Air & Water', tag: 'Environment', tagClass: 'tag-environment', desc: 'Industries cannot pollute your air and water. Report violations to DENR.', anchor: '#card-env-1' },
        { title: 'Solid Waste & Anti-Littering', tag: 'Environment', tagClass: 'tag-environment', desc: 'LGUs must provide proper waste collection. Littering and illegal dumping are punishable by fines.', anchor: '#card-env-2' },
      ],
      voter: [
        { title: 'Right to Vote (Secret Ballot)', tag: 'Voter', tagClass: 'tag-voter', desc: 'Every Filipino 18+ can vote. Your ballot is secret. Vote buying and voter intimidation are crimes.', anchor: '#card-voter-1' },
        { title: 'Freedom of Speech & Assembly', tag: 'Voter', tagClass: 'tag-voter', desc: 'You have the constitutional right to speak, criticize the government, and peacefully protest.', anchor: '#card-voter-2' },
      ],
    };

    const searchInput = document.getElementById('search-input');
    const searchBtn   = document.getElementById('search-btn');
    const resultsEl   = document.getElementById('search-results');

    function showResults(items, query) {
      if (!items || items.length === 0) {
        resultsEl.innerHTML = '<div class="result-card"><h4>No results found for "' + query + '"</h4><p>Try: labor, privacy, consumer, education, digital, disability, health, housing, family, gender, environment, voter.</p></div>';
        return;
      }
      resultsEl.innerHTML = items.map(item => '<div class="result-card" data-anchor="' + item.anchor + '" tabindex="0" role="button" aria-label="Go to ' + item.title + '"><div class="tag ' + item.tagClass + '">' + item.tag + '</div><h4>' + item.title + '</h4><p>' + item.desc + '</p><span class="go-link">→ View full details</span></div>').join('');

      resultsEl.querySelectorAll('.result-card').forEach(card => {
        const anchor = card.dataset.anchor;
        function navigate() {
          document.getElementById('rights').scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const target = document.querySelector(anchor);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              if (!target.classList.contains('open')) target.click();
              target.style.outline = '3px solid var(--teal-light)';
              target.style.outlineOffset = '4px';
              setTimeout(() => { target.style.outline = ''; target.style.outlineOffset = ''; }, 2500);
              const cat = target.dataset.category;
              const matchTab = document.querySelector('.rights-tab[data-filter="' + cat + '"]');
              if (matchTab) matchTab.click();
              setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
            }
          }, 600);
        }
        card.addEventListener('click', navigate);
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(); } });
      });
    }

    function doSearch() {
      const q = searchInput.value.toLowerCase().trim();
      if (!q) { resultsEl.innerHTML = ''; return; }
      let matches = [];
      for (const [key, items] of Object.entries(knowledge)) {
        if (q.includes(key) || key.includes(q)) {
          matches = matches.concat(items);
        } else {
          matches = matches.concat(items.filter(i => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)));
        }
      }
      matches = [...new Map(matches.map(m => [m.title, m])).values()];
      showResults(matches, q);
    }

    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

    document.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const topic = chip.dataset.topic;
        searchInput.value = topic;
        showResults(knowledge[topic] || [], topic);
        document.getElementById('hub').scrollIntoView({ behavior: 'smooth' });
      });
    });