/* ==========================================================================
   LANG.JS
   Language selector covering all 22 Eighth Schedule languages by name, but
   only a subset ships with verified translations right now (see
   TRANSLATED vs the full LANGUAGES list). Untranslated languages fall
   back to English rather than shipping a guessed translation of
   safety-critical content — flagged clearly in the picker UI itself.
   ========================================================================== */

window.QRVLang = (function () {
  "use strict";

  const LANGUAGES = [
    "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
    "Gujarati", "Kannada", "Malayalam", "Odia", "Punjabi", "Assamese",
    "Maithili", "Sanskrit", "Kashmiri", "Nepali", "Sindhi", "Konkani",
    "Manipuri", "Bodo", "Santali", "Dogri",
  ];

  // Only these have verified, real translations right now.
  const DICTIONARIES = {
    English: {
      checkForScam: "Check for scam", analyzeWithAi: "Analyze with AI",
      lowRisk: "Low Risk", highRisk: "High Risk", suspicious: "Suspicious", confirmedRisk: "Confirmed Risk",
      scanPrivacy: "Scan with privacy", panicTitle: "Stop. Think. Act.",
    },
    Hindi: {
      checkForScam: "धोखे की जाँच करें", analyzeWithAi: "AI से जाँच करें",
      lowRisk: "कम जोखिम", highRisk: "उच्च जोखिम", suspicious: "संदिग्ध", confirmedRisk: "पुष्टि की गई धोखाधड़ी",
      scanPrivacy: "गोपनीयता के साथ स्कैन करें", panicTitle: "रुकें। सोचें। कार्रवाई करें।",
    },
    Bengali: {
      checkForScam: "প্রতারণা পরীক্ষা করুন", analyzeWithAi: "AI দিয়ে বিশ্লেষণ করুন",
      lowRisk: "কম ঝুঁকি", highRisk: "উচ্চ ঝুঁকি", suspicious: "সন্দেহজনক", confirmedRisk: "নিশ্চিত ঝুঁকি",
      scanPrivacy: "গোপনীয়তার সাথে স্ক্যান করুন", panicTitle: "থামুন। ভাবুন। ব্যবস্থা নিন।",
    },
    Telugu: {
      checkForScam: "మోసం తనిఖీ చేయండి", analyzeWithAi: "AIతో విశ్లేషించండి",
      lowRisk: "తక్కువ ప్రమాదం", highRisk: "అధిక ప్రమాదం", suspicious: "అనుమానాస్పదం", confirmedRisk: "నిర్ధారిత ప్రమాదం",
      scanPrivacy: "గోప్యతతో స్కాన్ చేయండి", panicTitle: "ఆగండి. ఆలోచించండి. చర్య తీసుకోండి.",
    },
    Marathi: {
      checkForScam: "फसवणूक तपासा", analyzeWithAi: "AI ने विश्लेषण करा",
      lowRisk: "कमी धोका", highRisk: "उच्च धोका", suspicious: "संशयास्पद", confirmedRisk: "पुष्टी झालेला धोका",
      scanPrivacy: "गोपनीयतेसह स्कॅन करा", panicTitle: "थांबा. विचार करा. कृती करा.",
    },
    Tamil: {
      checkForScam: "மோசடியை சரிபார்க்கவும்", analyzeWithAi: "AI மூலம் ஆய்வு செய்யவும்",
      lowRisk: "குறைந்த ஆபத்து", highRisk: "அதிக ஆபத்து", suspicious: "சந்தேகத்திற்குரியது", confirmedRisk: "உறுதிப்படுத்தப்பட்ட ஆபத்து",
      scanPrivacy: "தனியுரிமையுடன் ஸ்கேன் செய்யவும்", panicTitle: "நிறுத்து. யோசி. செயல்படு.",
    },
  };

  function getSaved() {
    try { return localStorage.getItem("qrv-lang") || "English"; }
    catch (e) { return "English"; }
  }

  function save(lang) {
    try { localStorage.setItem("qrv-lang", lang); } catch (e) {}
  }

  function t(key) {
    const lang = getSaved();
    const dict = DICTIONARIES[lang] || DICTIONARIES.English;
    return dict[key] || DICTIONARIES.English[key] || key;
  }

  function isTranslated(lang) {
    return Object.prototype.hasOwnProperty.call(DICTIONARIES, lang);
  }

  function applyToDom() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
  }

  function renderPicker() {
    const container = document.getElementById("langPickerOptions");
    if (!container) return;
    container.innerHTML = "";
    const current = getSaved();
    LANGUAGES.forEach((lang) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "qrv-theme-swatch" + (lang === current ? " ring-2 ring-amber" : "");
      btn.textContent = lang + (isTranslated(lang) ? "" : " (beta)");
      btn.title = isTranslated(lang) ? "" : "Not fully translated yet — shows English for untranslated text";
      btn.addEventListener("click", () => {
        save(lang);
        applyToDom();
        renderPicker();
      });
      container.appendChild(btn);
    });
  }

  function init() {
    applyToDom();
    renderPicker();
  }

  // Exposed so ai-scam-check.js / mobile-app.js can pass the current
  // language through to the backend for native-language AI summaries.
  function currentLangForAi() {
    return getSaved();
  }

  return { init, t, applyToDom, renderPicker, currentLangForAi, LANGUAGES };
})();
