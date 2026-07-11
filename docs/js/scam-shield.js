/* ==========================================================================
   SCAM-SHIELD.JS
   Renders the Scam Shield Awareness Center: safety tips, cyber fraud
   statistics, a money-saving step guide, and sourcing. Data below is
   sourced from public awareness material published by the Ministry of
   Home Affairs' Indian Cyber Crime Coordination Centre (I4C), the RBI,
   and NPCI. Figures are illustrative of officially publicised trends —
   always cross-check current numbers at cybercrime.gov.in before citing.
   ========================================================================== */

window.QRVScamShield = (function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  const TIPS = [
    "Never share your OTP, UPI PIN, ATM PIN, CVV, or passwords with anyone — banks and police never ask for these.",
    "Do not click unknown links received through SMS, WhatsApp, email, or social media.",
    "Verify QR codes before making any payment — scanning a QR code can also request money, not just receive it.",
    "Do not install apps from unknown sources or APK links sent by strangers.",
    "Beware of fake customer care numbers found through search engines or social media.",
    "Confirm investment schemes independently before investing — guaranteed high returns are a red flag.",
    "Enable two-factor authentication on banking and social media accounts wherever available.",
    "Keep your banking apps and phone operating system updated with the latest security patches.",
    "Report suspicious activity immediately instead of waiting to see what happens.",
  ];

  const CATEGORIES = [
    { icon: "📱", label: "UPI Fraud" },
    { icon: "🔳", label: "QR Code Scams" },
    { icon: "📈", label: "Fake Investment Scams" },
    { icon: "👮", label: "Digital Arrest Scams" },
    { icon: "💼", label: "Job Scams" },
    { icon: "🏦", label: "Loan App Scams" },
    { icon: "🎣", label: "Phishing Scams" },
    { icon: "☎️", label: "Fake Customer Support" },
  ];

  const STEPS = [
    { title: "Stop and verify before payment", body: "Pause before scanning or paying. Confirm the recipient's identity through a separate, trusted channel." },
    { title: "Never trust urgency messages", body: "Scammers create panic — \"account will be blocked\", \"pay now or lose access\". Real institutions give you time." },
    { title: "Check sender identity", body: "Look closely at phone numbers, email domains, and sender names. Small misspellings signal impersonation." },
    { title: "Scan suspicious QR codes with QRaksha", body: "Use the Scan tab to check a QR code before trusting it — especially ones received via message or displayed in public." },
    { title: "Use trusted apps only", body: "Install apps only from official app stores, and avoid APKs shared through chat links." },
    { title: "Report fraud quickly", body: "The first hour after a fraudulent transaction is critical for recovery — report immediately, don't delay." },
  ];

  function renderTips() {
    const el = $("scamShieldTipsGrid");
    if (!el) return;
    el.innerHTML = TIPS.map((t) => `
      <div class="flex items-start gap-2.5 rounded-xl bg-ink border border-line p-3">
        <span class="text-amber flex-shrink-0 mt-0.5">✓</span>
        <p class="text-xs text-neutral-300 leading-relaxed">${t}</p>
      </div>
    `).join("");
  }

  function renderStats() {
    const statsGrid = $("scamShieldStatsGrid");
    const catList = $("scamShieldCategoryList");
    const source = $("scamShieldStatsSource");
    if (statsGrid) {
      statsGrid.innerHTML = `
        <div class="rounded-xl bg-ink border border-line p-3 text-center">
          <p class="font-display font-bold text-lg text-amber">36L+</p>
          <p class="text-[10px] text-neutral-500 leading-snug">Cybercrime complaints registered on the National Cyber Crime Reporting Portal since inception</p>
        </div>
        <div class="rounded-xl bg-ink border border-line p-3 text-center">
          <p class="font-display font-bold text-lg text-amber">₹1,750+ Cr</p>
          <p class="text-[10px] text-neutral-500 leading-snug">Financial loss reported to cybercrime helpline 1930 in recent years</p>
        </div>
        <div class="rounded-xl bg-ink border border-line p-3 text-center">
          <p class="font-display font-bold text-lg text-amber">↑ Rising</p>
          <p class="text-[10px] text-neutral-500 leading-snug">Year-on-year growth in reported online financial fraud cases</p>
        </div>
        <div class="rounded-xl bg-ink border border-line p-3 text-center">
          <p class="font-display font-bold text-lg text-amber">1930</p>
          <p class="text-[10px] text-neutral-500 leading-snug">National Cyber Fraud Helpline — call immediately after a fraud</p>
        </div>
      `;
    }
    if (catList) {
      catList.innerHTML = CATEGORIES.map((c) => `
        <div class="flex items-center gap-2 rounded-lg bg-ink border border-line px-3 py-2">
          <span class="text-sm">${c.icon}</span>
          <span class="text-xs text-neutral-300">${c.label}</span>
        </div>
      `).join("");
    }
    if (source) {
      source.innerHTML = `Sources: Ministry of Home Affairs (I4C) &amp; National Cyber Crime Reporting Portal — cybercrime.gov.in. Figures are illustrative of publicised trends; verify current statistics at the official portal.`;
    }
  }

  function renderSteps() {
    const el = $("scamShieldStepsList");
    if (!el) return;
    el.innerHTML = STEPS.map((s, i) => `
      <div class="rounded-xl bg-ink border border-line p-3">
        <p class="text-xs font-semibold text-neutral-100 mb-0.5">
          <span class="text-amber">Step ${i + 1}.</span> ${s.title}
        </p>
        <p class="text-[11px] text-neutral-500 leading-relaxed">${s.body}</p>
      </div>
    `).join("");
  }

  function init() {
    renderTips();
    renderStats();
    renderSteps();
  }

  return { init };
})();
