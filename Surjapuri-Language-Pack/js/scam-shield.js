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

  const TIPS = {
    English: [
      "Never share your OTP, UPI PIN, ATM PIN, CVV, or passwords with anyone — banks and police never ask for these.",
      "Do not click unknown links received through SMS, WhatsApp, email, or social media.",
      "Verify QR codes before making any payment — scanning a QR code can also request money, not just receive it.",
      "Do not install apps from unknown sources or APK links sent by strangers.",
      "Beware of fake customer care numbers found through search engines or social media.",
      "Confirm investment schemes independently before investing — guaranteed high returns are a red flag.",
      "Enable two-factor authentication on banking and social media accounts wherever available.",
      "Keep your banking apps and phone operating system updated with the latest security patches.",
      "Report suspicious activity immediately instead of waiting to see what happens.",
    ],
    Hindi: [
      "अपना OTP, UPI PIN, ATM PIN, CVV या पासवर्ड कभी किसी के साथ साझा न करें — बैंक और पुलिस कभी नहीं मांगते।",
      "SMS, WhatsApp, ईमेल या सोशल मीडिया से मिले अनजान लिंक पर क्लिक न करें।",
      "पेमेंट करने से पहले QR कोड को सत्यापित करें — QR कोड स्कैन करने से पैसा मांगा भी जा सकता है, सिर्फ मिलता नहीं।",
      "अनजान स्रोतों या अजनबियों द्वारा भेजे गए APK लिंक से ऐप इंस्टॉल न करें।",
      "सर्च इंजन या सोशल मीडिया पर मिलने वाले फर्जी कस्टमर केयर नंबरों से सावधान रहें।",
      "निवेश करने से पहले स्कीम को स्वतंत्र रूप से जांच लें — गारंटीड ऊँचा रिटर्न एक चेतावनी संकेत है।",
      "जहाँ भी उपलब्ध हो, बैंकिंग और सोशल मीडिया अकाउंट पर टू-फैक्टर ऑथेंटिकेशन चालू करें।",
      "अपने बैंकिंग ऐप्स और फोन को नवीनतम सुरक्षा अपडेट के साथ अपडेट रखें।",
      "संदिग्ध गतिविधि की तुरंत रिपोर्ट करें, इंतजार न करें।",
    ],
  };

  const CATEGORIES = [
    { icon: "📱", label: { English: "UPI Fraud", Hindi: "UPI धोखाधड़ी" } },
    { icon: "🔳", label: { English: "QR Code Scams", Hindi: "QR कोड स्कैम" } },
    { icon: "📈", label: { English: "Fake Investment Scams", Hindi: "फर्जी निवेश स्कैम" } },
    { icon: "👮", label: { English: "Digital Arrest Scams", Hindi: "डिजिटल अरेस्ट स्कैम" } },
    { icon: "💼", label: { English: "Job Scams", Hindi: "जॉब स्कैम" } },
    { icon: "🏦", label: { English: "Loan App Scams", Hindi: "लोन ऐप स्कैम" } },
    { icon: "🎣", label: { English: "Phishing Scams", Hindi: "फिशिंग स्कैम" } },
    { icon: "☎️", label: { English: "Fake Customer Support", Hindi: "फर्जी कस्टमर सपोर्ट" } },
  ];

  const STEPS = {
    English: [
      { title: "Stop and verify before payment", body: "Pause before scanning or paying. Confirm the recipient's identity through a separate, trusted channel." },
      { title: "Never trust urgency messages", body: "Scammers create panic — \"account will be blocked\", \"pay now or lose access\". Real institutions give you time." },
      { title: "Check sender identity", body: "Look closely at phone numbers, email domains, and sender names. Small misspellings signal impersonation." },
      { title: "Scan suspicious QR codes with QRaksha", body: "Use the Scan tab to check a QR code before trusting it — especially ones received via message or displayed in public." },
      { title: "Use trusted apps only", body: "Install apps only from official app stores, and avoid APKs shared through chat links." },
      { title: "Report fraud quickly", body: "The first hour after a fraudulent transaction is critical for recovery — report immediately, don't delay." },
    ],
    Hindi: [
      { title: "पेमेंट से पहले रुकें और जांचें", body: "स्कैन या भुगतान करने से पहले रुकें। किसी अलग, भरोसेमंद माध्यम से प्राप्तकर्ता की पहचान की पुष्टि करें।" },
      { title: "जल्दबाज़ी वाले मैसेज पर भरोसा न करें", body: "स्कैमर्स घबराहट पैदा करते हैं — \"अकाउंट ब्लॉक हो जाएगा\", \"अभी पे करें वरना एक्सेस खो देंगे\"। असली संस्थान आपको समय देते हैं।" },
      { title: "भेजने वाले की पहचान जांचें", body: "फोन नंबर, ईमेल डोमेन और भेजने वाले के नाम को ध्यान से देखें। छोटी स्पेलिंग गलतियाँ नकल का संकेत हैं।" },
      { title: "QRaksha से संदिग्ध QR कोड स्कैन करें", body: "किसी QR कोड पर भरोसा करने से पहले Scan टैब से जांचें — खासकर मैसेज में मिले या सार्वजनिक जगह पर दिखाए गए कोड।" },
      { title: "केवल भरोसेमंद ऐप्स इस्तेमाल करें", body: "केवल आधिकारिक ऐप स्टोर से ऐप इंस्टॉल करें, चैट लिंक से भेजे गए APK से बचें।" },
      { title: "धोखाधड़ी की तुरंत रिपोर्ट करें", body: "धोखाधड़ी वाले लेनदेन के बाद पहला घंटा रिकवरी के लिए बहुत महत्वपूर्ण है — तुरंत रिपोर्ट करें, देर न करें।" },
    ],
  };

  function currentLang() {
    return (window.QRVLang && window.QRVLang.currentLangForAi()) || "English";
  }
  function pick(dict) {
    const lang = currentLang();
    return dict[lang] || dict.English;
  }

  function renderTips() {
    const el = $("scamShieldTipsGrid");
    if (!el) return;
    el.innerHTML = pick(TIPS).map((t) => `
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
          <span class="text-xs text-neutral-300">${c.label[currentLang()] || c.label.English}</span>
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
    el.innerHTML = pick(STEPS).map((s, i) => `
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

  // Re-render when the user switches language, so this modal's dynamic
  // content (built via JS, not [data-i18n]) stays in sync. The tip/step
  // text itself is only verified in English + Hindi today (see lang.js
  // header note); other languages fall back to English automatically.
  document.addEventListener("qrv:lang-changed", () => {
    if ($("scamShieldModal") && !$("scamShieldModal").hidden) init();
  });

  return { init };
})();
