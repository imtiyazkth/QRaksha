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
      home: "Home", scan: "Scan", generate: "Generate", complain: "Complain", settings: "Settings",
      whatToCheck: "What do you want to check?", pickCategory: "Pick a category — generic icons only, no official branding copied.",
      websiteUrl: "Website URL", phoneNumber: "Phone Number", emailId: "Email Id",
      pasteUrlPrompt: "Paste the suspicious URL below", pasteHandlePrompt: "Paste the WhatsApp / Telegram link or handle",
      pastePhonePrompt: "Enter the suspicious phone number", checkNow: "Check now",
      askAiPrompt: "Want to know how to avoid this scam? Ask our AI Assistant.",
      chatWithAi: "Chat with AI", scammedRightNow: "Being scammed right now? Tap here for immediate help",
      callHelplineLabel: "CALL OFFICIAL HELPLINE", reportPortalLabel: "Report at cybercrime.gov.in",
    },
    Hindi: {
      checkForScam: "धोखे की जाँच करें", analyzeWithAi: "AI से जाँच करें",
      lowRisk: "कम जोखिम", highRisk: "उच्च जोखिम", suspicious: "संदिग्ध", confirmedRisk: "पुष्टि की गई धोखाधड़ी",
      scanPrivacy: "गोपनीयता के साथ स्कैन करें", panicTitle: "रुकें। सोचें। कार्रवाई करें।",
      home: "होम", scan: "स्कैन", generate: "जनरेट करें", complain: "शिकायत", settings: "सेटिंग्स",
      whatToCheck: "आप क्या जाँचना चाहेंगे?", pickCategory: "एक श्रेणी चुनें — सामान्य आइकन, कोई आधिकारिक ब्रांडिंग नहीं।",
      websiteUrl: "वेबसाइट यूआरएल", phoneNumber: "फ़ोन नंबर", emailId: "ईमेल आईडी",
      pasteUrlPrompt: "नीचे संदिग्ध यूआरएल पेस्ट करें", pasteHandlePrompt: "व्हाट्सएप / टेलीग्राम लिंक या हैंडल पेस्ट करें",
      pastePhonePrompt: "संदिग्ध फ़ोन नंबर दर्ज करें", checkNow: "अभी जाँचें",
      askAiPrompt: "इस धोखाधड़ी से कैसे बचें, जानना चाहते हैं? हमारे AI सहायक से पूछें।",
      chatWithAi: "AI से बात करें", scammedRightNow: "अभी धोखाधड़ी हो रही है? तुरंत मदद के लिए यहाँ टैप करें",
      callHelplineLabel: "आधिकारिक हेल्पलाइन नंबर", reportPortalLabel: "cybercrime.gov.in पर रिपोर्ट करें",
    },
    Bengali: {
      checkForScam: "প্রতারণা পরীক্ষা করুন", analyzeWithAi: "AI দিয়ে বিশ্লেষণ করুন",
      lowRisk: "কম ঝুঁকি", highRisk: "উচ্চ ঝুঁকি", suspicious: "সন্দেহজনক", confirmedRisk: "নিশ্চিত ঝুঁকি",
      scanPrivacy: "গোপনীয়তার সাথে স্ক্যান করুন", panicTitle: "থামুন। ভাবুন। ব্যবস্থা নিন।",
      home: "হোম", scan: "স্ক্যান", generate: "তৈরি করুন", complain: "অভিযোগ", settings: "সেটিংস",
      whatToCheck: "আপনি কী পরীক্ষা করতে চান?", pickCategory: "একটি বিভাগ বেছে নিন — সাধারণ আইকন, কোনো অফিসিয়াল ব্র্যান্ডিং নেই।",
      websiteUrl: "ওয়েবসাইট ইউআরএল", phoneNumber: "ফোন নম্বর", emailId: "ইমেল আইডি",
      pasteUrlPrompt: "নিচে সন্দেহজনক ইউআরএল পেস্ট করুন", pasteHandlePrompt: "হোয়াটসঅ্যাপ / টেলিগ্রাম লিংক বা হ্যান্ডেল পেস্ট করুন",
      pastePhonePrompt: "সন্দেহজনক ফোন নম্বর লিখুন", checkNow: "এখনই পরীক্ষা করুন",
      askAiPrompt: "এই প্রতারণা এড়াতে জানতে চান? আমাদের AI সহায়ককে জিজ্ঞাসা করুন।",
      chatWithAi: "AI এর সাথে চ্যাট করুন", scammedRightNow: "এখনই প্রতারিত হচ্ছেন? তাৎক্ষণিক সাহায্যের জন্য এখানে ট্যাপ করুন",
      callHelplineLabel: "অফিসিয়াল হেল্পলাইন নম্বর", reportPortalLabel: "cybercrime.gov.in-এ রিপোর্ট করুন",
    },
    Telugu: {
      checkForScam: "మోసం తనిఖీ చేయండి", analyzeWithAi: "AIతో విశ్లేషించండి",
      lowRisk: "తక్కువ ప్రమాదం", highRisk: "అధిక ప్రమాదం", suspicious: "అనుమానాస్పదం", confirmedRisk: "నిర్ధారిత ప్రమాదం",
      scanPrivacy: "గోప్యతతో స్కాన్ చేయండి", panicTitle: "ఆగండి. ఆలోచించండి. చర్య తీసుకోండి.",
      home: "హోమ్", scan: "స్కాన్", generate: "జనరేట్", complain: "ఫిర్యాదు", settings: "సెట్టింగులు",
      whatToCheck: "మీరు ఏమి తనిఖీ చేయాలనుకుంటున్నారు?", pickCategory: "ఒక వర్గాన్ని ఎంచుకోండి — సాధారణ ఐకాన్లు, అధికారిక బ్రాండింగ్ లేదు.",
      websiteUrl: "వెబ్‌సైట్ URL", phoneNumber: "ఫోన్ నంబర్", emailId: "ఇమెయిల్ ఐడి",
      pasteUrlPrompt: "అనుమానాస్పద URLని క్రింద పేస్ట్ చేయండి", pasteHandlePrompt: "వాట్సాప్ / టెలిగ్రామ్ లింక్ లేదా హ్యాండిల్ పేస్ట్ చేయండి",
      pastePhonePrompt: "అనుమానాస్పద ఫోన్ నంబర్‌ను నమోదు చేయండి", checkNow: "ఇప్పుడే తనిఖీ చేయండి",
      askAiPrompt: "ఈ మోసాన్ని ఎలా నివారించాలో తెలుసుకోవాలనుకుంటున్నారా? మా AI అసిస్టెంట్‌ని అడగండి.",
      chatWithAi: "AIతో చాట్ చేయండి", scammedRightNow: "ఇప్పుడే మోసపోతున్నారా? తక్షణ సహాయం కోసం ఇక్కడ నొక్కండి",
      callHelplineLabel: "అధికారిక హెల్ప్‌లైన్ నంబర్", reportPortalLabel: "cybercrime.gov.in వద్ద నివేదించండి",
    },
    Marathi: {
      checkForScam: "फसवणूक तपासा", analyzeWithAi: "AI ने विश्लेषण करा",
      lowRisk: "कमी धोका", highRisk: "उच्च धोका", suspicious: "संशयास्पद", confirmedRisk: "पुष्टी झालेला धोका",
      scanPrivacy: "गोपनीयतेसह स्कॅन करा", panicTitle: "थांबा. विचार करा. कृती करा.",
      home: "होम", scan: "स्कॅन", generate: "तयार करा", complain: "तक्रार", settings: "सेटिंग्ज",
      whatToCheck: "तुम्हाला काय तपासायचे आहे?", pickCategory: "एक श्रेणी निवडा — सामान्य आयकॉन, कोणतीही अधिकृत ब्रँडिंग नाही.",
      websiteUrl: "वेबसाइट URL", phoneNumber: "फोन नंबर", emailId: "ईमेल आयडी",
      pasteUrlPrompt: "खाली संशयास्पद URL पेस्ट करा", pasteHandlePrompt: "व्हॉट्सअ‍ॅप / टेलिग्राम लिंक किंवा हँडल पेस्ट करा",
      pastePhonePrompt: "संशयास्पद फोन नंबर टाका", checkNow: "आता तपासा",
      askAiPrompt: "ही फसवणूक कशी टाळावी हे जाणून घ्यायचे आहे? आमच्या AI सहाय्यकाला विचारा.",
      chatWithAi: "AI शी बोला", scammedRightNow: "आत्ता फसवणूक होत आहे? त्वरित मदतीसाठी येथे टॅप करा",
      callHelplineLabel: "अधिकृत हेल्पलाइन क्रमांक", reportPortalLabel: "cybercrime.gov.in वर तक्रार करा",
    },
    Tamil: {
      checkForScam: "மோசடியை சரிபார்க்கவும்", analyzeWithAi: "AI மூலம் ஆய்வு செய்யவும்",
      lowRisk: "குறைந்த ஆபத்து", highRisk: "அதிக ஆபத்து", suspicious: "சந்தேகத்திற்குரியது", confirmedRisk: "உறுதிப்படுத்தப்பட்ட ஆபத்து",
      scanPrivacy: "தனியுரிமையுடன் ஸ்கேன் செய்யவும்", panicTitle: "நிறுத்து. யோசி. செயல்படு.",
      home: "முகப்பு", scan: "ஸ்கேன்", generate: "உருவாக்கு", complain: "புகார்", settings: "அமைப்புகள்",
      whatToCheck: "நீங்கள் எதை சரிபார்க்க விரும்புகிறீர்கள்?", pickCategory: "ஒரு வகையைத் தேர்ந்தெடுக்கவும் — பொதுவான ஐகான்கள் மட்டும், அதிகாரப்பூர்வ பிராண்டிங் இல்லை.",
      websiteUrl: "இணையதள URL", phoneNumber: "தொலைபேசி எண்", emailId: "மின்னஞ்சல் ஐடி",
      pasteUrlPrompt: "சந்தேகத்திற்குரிய URL-ஐ கீழே ஒட்டவும்", pasteHandlePrompt: "வாட்ஸ்அப் / டெலிகிராம் லிங்க் அல்லது ஹேண்டிலை ஒட்டவும்",
      pastePhonePrompt: "சந்தேகத்திற்குரிய தொலைபேசி எண்ணை உள்ளிடவும்", checkNow: "இப்போது சரிபார்க்கவும்",
      askAiPrompt: "இந்த மோசடியை எவ்வாறு தவிர்ப்பது என்பதை அறிய விரும்புகிறீர்களா? எங்கள் AI உதவியாளரிடம் கேளுங்கள்.",
      chatWithAi: "AI உடன் அரட்டையடிக்கவும்", scammedRightNow: "இப்போது ஏமாற்றப்படுகிறீர்களா? உடனடி உதவிக்கு இங்கே தட்டவும்",
      callHelplineLabel: "அதிகாரப்பூர்வ ஹெல்ப்லைன் எண்", reportPortalLabel: "cybercrime.gov.in இல் புகார் அளிக்கவும்",
    },
    Urdu: {
      checkForScam: "دھوکے کی جانچ کریں", analyzeWithAi: "AI سے تجزیہ کریں",
      lowRisk: "کم خطرہ", highRisk: "زیادہ خطرہ", suspicious: "مشکوک", confirmedRisk: "تصدیق شدہ خطرہ",
      scanPrivacy: "رازداری کے ساتھ اسکین کریں", panicTitle: "رکیں۔ سوچیں۔ عمل کریں۔",
      home: "ہوم", scan: "اسکین", generate: "بنائیں", complain: "شکایت", settings: "ترتیبات",
      whatToCheck: "آپ کیا چیک کرنا چاہتے ہیں؟", pickCategory: "ایک زمرہ منتخب کریں — عام آئیکنز، کوئی سرکاری برانڈنگ نہیں۔",
      websiteUrl: "ویب سائٹ یو آر ایل", phoneNumber: "فون نمبر", emailId: "ای میل آئی ڈی",
      pasteUrlPrompt: "نیچے مشکوک یو آر ایل پیسٹ کریں", pasteHandlePrompt: "واٹس ایپ / ٹیلیگرام لنک یا ہینڈل پیسٹ کریں",
      pastePhonePrompt: "مشکوک فون نمبر درج کریں", checkNow: "ابھی چیک کریں",
      askAiPrompt: "اس دھوکے سے کیسے بچیں جاننا چاہتے ہیں؟ ہمارے AI اسسٹنٹ سے پوچھیں۔",
      chatWithAi: "AI سے بات کریں", scammedRightNow: "ابھی دھوکہ ہو رہا ہے؟ فوری مدد کے لیے یہاں ٹیپ کریں",
      callHelplineLabel: "سرکاری ہیلپ لائن نمبر", reportPortalLabel: "cybercrime.gov.in پر رپورٹ کریں",
    },
    Gujarati: {
      checkForScam: "છેતરપિંડી ચકાસો", analyzeWithAi: "AI વડે વિશ્લેષણ કરો",
      lowRisk: "ઓછું જોખમ", highRisk: "ઉચ્ચ જોખમ", suspicious: "શંકાસ્પદ", confirmedRisk: "પુષ્ટિ થયેલ જોખમ",
      scanPrivacy: "ગોપનીયતા સાથે સ્કેન કરો", panicTitle: "રોકાઓ. વિચારો. પગલાં લો.",
      home: "હોમ", scan: "સ્કેન", generate: "જનરેટ કરો", complain: "ફરિયાદ", settings: "સેટિંગ્સ",
      whatToCheck: "તમે શું ચકાસવા માંગો છો?", pickCategory: "એક શ્રેણી પસંદ કરો — સામાન્ય આઇકોન્સ, કોઈ સત્તાવાર બ્રાન્ડિંગ નથી.",
      websiteUrl: "વેબસાઇટ URL", phoneNumber: "ફોન નંબર", emailId: "ઇમેઇલ આઈડી",
      pasteUrlPrompt: "નીચે શંકાસ્પદ URL પેસ્ટ કરો", pasteHandlePrompt: "વોટ્સએપ / ટેલિગ્રામ લિંક અથવા હેન્ડલ પેસ્ટ કરો",
      pastePhonePrompt: "શંકાસ્પદ ફોન નંબર દાખલ કરો", checkNow: "હમણાં ચકાસો",
      askAiPrompt: "આ છેતરપિંડીથી કેવી રીતે બચવું તે જાણવા માંગો છો? અમારા AI સહાયકને પૂછો.",
      chatWithAi: "AI સાથે ચેટ કરો", scammedRightNow: "અત્યારે છેતરપિંડી થઈ રહી છે? તાત્કાલિક મદદ માટે અહીં ટેપ કરો",
      callHelplineLabel: "સત્તાવાર હેલ્પલાઇન નંબર", reportPortalLabel: "cybercrime.gov.in પર ફરિયાદ કરો",
    },
    Kannada: {
      checkForScam: "ವಂಚನೆ ಪರಿಶೀಲಿಸಿ", analyzeWithAi: "AI ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಿ",
      lowRisk: "ಕಡಿಮೆ ಅಪಾಯ", highRisk: "ಹೆಚ್ಚಿನ ಅಪಾಯ", suspicious: "ಸಂಶಯಾಸ್ಪದ", confirmedRisk: "ದೃಢಪಡಿಸಿದ ಅಪಾಯ",
      scanPrivacy: "ಗೌಪ್ಯತೆಯೊಂದಿಗೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ", panicTitle: "ನಿಲ್ಲಿಸಿ. ಯೋಚಿಸಿ. ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.",
      home: "ಮುಖಪುಟ", scan: "ಸ್ಕ್ಯಾನ್", generate: "ರಚಿಸಿ", complain: "ದೂರು", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      whatToCheck: "ನೀವು ಏನನ್ನು ಪರಿಶೀಲಿಸಲು ಬಯಸುತ್ತೀರಿ?", pickCategory: "ಒಂದು ವರ್ಗವನ್ನು ಆರಿಸಿ — ಸಾಮಾನ್ಯ ಐಕಾನ್‌ಗಳು, ಯಾವುದೇ ಅಧಿಕೃತ ಬ್ರಾಂಡಿಂಗ್ ಇಲ್ಲ.",
      websiteUrl: "ವೆಬ್‌ಸೈಟ್ URL", phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ", emailId: "ಇಮೇಲ್ ಐಡಿ",
      pasteUrlPrompt: "ಕೆಳಗೆ ಅನುಮಾನಾಸ್ಪದ URL ಅಂಟಿಸಿ", pasteHandlePrompt: "ವಾಟ್ಸಾಪ್ / ಟೆಲಿಗ್ರಾಮ್ ಲಿಂಕ್ ಅಥವಾ ಹ್ಯಾಂಡಲ್ ಅಂಟಿಸಿ",
      pastePhonePrompt: "ಅನುಮಾನಾಸ್ಪದ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ", checkNow: "ಈಗ ಪರಿಶೀಲಿಸಿ",
      askAiPrompt: "ಈ ವಂಚನೆಯನ್ನು ತಪ್ಪಿಸುವುದು ಹೇಗೆ ಎಂದು ತಿಳಿಯ ಬಯಸುವಿರಾ? ನಮ್ಮ AI ಸಹಾಯಕರನ್ನು ಕೇಳಿ.",
      chatWithAi: "AI ಜೊತೆ ಚಾಟ್ ಮಾಡಿ", scammedRightNow: "ಈಗ ವಂಚನೆಗೆ ಒಳಗಾಗುತ್ತಿದ್ದೀರಾ? ತಕ್ಷಣದ ಸಹಾಯಕ್ಕಾಗಿ ಇಲ್ಲಿ ಟ್ಯಾಪ್ ಮಾಡಿ",
      callHelplineLabel: "ಅಧಿಕೃತ ಹೆಲ್ಪ್‌ಲೈನ್ ಸಂಖ್ಯೆ", reportPortalLabel: "cybercrime.gov.in ನಲ್ಲಿ ವರದಿ ಮಾಡಿ",
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
        document.dispatchEvent(new CustomEvent("qrv:lang-changed", { detail: { lang } }));
      });
      container.appendChild(btn);
    });
  }

  // Inline quick-switch <select> inside the Emergency Portal (Module 1).
  // Only lists the 9 languages that actually have verified translations —
  // deliberately not the full 22-language LANGUAGES list, since this
  // control sits in a panic/emergency context where a "(beta, may fall
  // back to English)" caveat would be the wrong thing to show.
  function wireInlinePicker() {
    const select = document.getElementById("inlineLanguagePicker");
    if (!select) return;
    select.value = getSaved();
    select.addEventListener("change", () => {
      save(select.value);
      applyToDom();
      renderPicker();
      document.dispatchEvent(new CustomEvent("qrv:lang-changed", { detail: { lang: select.value } }));
    });
    // Keep in sync if the language is changed from the Settings picker instead.
    document.addEventListener("qrv:lang-changed", (e) => {
      if (select.value !== e.detail.lang) select.value = e.detail.lang;
    });
  }

  function init() {
    applyToDom();
    renderPicker();
    wireInlinePicker();
  }

  // Exposed so ai-scam-check.js / mobile-app.js can pass the current
  // language through to the backend for native-language AI summaries.
  function currentLangForAi() {
    return getSaved();
  }

  return { init, t, applyToDom, renderPicker, currentLangForAi, LANGUAGES };
})();
