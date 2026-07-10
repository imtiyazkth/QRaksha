/* ==========================================================================
   LANG.JS  —  QRaksha v2 Production Build
   Covers all 22 Eighth Schedule languages by name; only 9 have verified
   translations. Untranslated languages fall back to English rather than
   shipping a guessed translation of safety-critical content.

   NEW in this build:
   - govVerifyTitle / govVerifyDesc / govVerifySource / govVerifyBtn
   - scanAnother, riskAssessment, analyzeAiBtn
   - exactDecodedContent, paymentRequestDetails
   - langTitle (settings section heading)
   - All threat-intel labels: confirmedRisk, suspiciousLabel, etc.
   - Full panicBannerText (bilingual fallback for non-Hindi)
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

    /* ------------------------------------------------------------------ */
    English: {
      /* Navigation */
      home: "Home", scan: "Scan", generate: "Generate",
      complain: "Complain", settings: "Settings",

      /* Home tab */
      whatToCheck: "What do you want to check?",
      pickCategory: "Pick a category — generic icons only, no official branding copied.",

      /* Government Data Card */
      govVerifyTitle: "Verify with Government Data",
      govVerifyDesc: "Submit APKs, deepfake media, and suspicious digital content to the official Cyber Crime Portal for verified action by law enforcement.",
      govVerifySource: "Source: Cyber Crime Portal",
      govVerifyBtn: "Open Official Portal ↗",

      /* Scan / camera */
      scanPrivacy: "Scan with privacy",
      scanAnother: "Scan Another",
      panicBannerText: "Being scammed right now? Tap here for immediate help / क्या आपके साथ अभी धोखाधड़ी हो रही है? तुरंत मदद के लिए यहाँ टैप करें",

      /* Input prompts */
      websiteUrl: "Website URL", phoneNumber: "Phone Number", emailId: "Email Id",
      pasteUrlPrompt: "Paste the suspicious URL below",
      pasteHandlePrompt: "Paste the WhatsApp / Telegram link or handle",
      pastePhonePrompt: "Enter the suspicious phone number",
      checkNow: "Check now",
      checkForScam: "Check for scam / धोखे की जाँच करें",

      /* Result card labels */
      riskAssessment: "Risk Assessment",
      exactDecodedContent: "Exact decoded content",
      paymentRequestDetails: "Payment request details",
      lowRisk: "Low Risk",
      highRisk: "High Risk",
      suspicious: "Suspicious",
      confirmedRisk: "Confirmed Risk",

      /* AI & analysis */
      analyzeAiBtn: "Analyze with AI — deeper check, instant result",
      analyzeWithAi: "Analyze with AI",
      askAiPrompt: "Want to know how to avoid this scam? Ask our AI Assistant.",
      chatWithAi: "Chat with AI",
      aiDisclaimer: "Free basic check always runs automatically. AI second opinion is optional and never delayed by ads.",

      /* Panic mode */
      panicTitle: "Stop. Think. Act.",
      callHelplineLabel: "🚨 CALL OFFICIAL HELPLINE",
      reportPortalLabel: "Report at cybercrime.gov.in",

      /* Settings */
      langTitle: "Language",
      scammedRightNow: "Being scammed right now? Tap here for immediate help",
    },

    /* ------------------------------------------------------------------ */
    Hindi: {
      home: "होम", scan: "स्कैन", generate: "जनरेट करें",
      complain: "शिकायत", settings: "सेटिंग्स",

      whatToCheck: "आप क्या जाँचना चाहेंगे?",
      pickCategory: "एक श्रेणी चुनें — सामान्य आइकन, कोई आधिकारिक ब्रांडिंग नहीं।",

      govVerifyTitle: "सरकारी डेटा से सत्यापित करें",
      govVerifyDesc: "APK, डीपफेक मीडिया और संदिग्ध डिजिटल सामग्री को कानूनी कार्रवाई के लिए आधिकारिक साइबर क्राइम पोर्टल पर सबमिट करें।",
      govVerifySource: "स्रोत: साइबर क्राइम पोर्टल",
      govVerifyBtn: "आधिकारिक पोर्टल खोलें ↗",

      scanPrivacy: "गोपनीयता के साथ स्कैन करें",
      scanAnother: "नया स्कैन करें",
      panicBannerText: "क्या आपके साथ अभी धोखाधड़ी हो रही है? तुरंत मदद के लिए यहाँ टैप करें",

      websiteUrl: "वेबसाइट यूआरएल", phoneNumber: "फ़ोन नंबर", emailId: "ईमेल आईडी",
      pasteUrlPrompt: "नीचे संदिग्ध यूआरएल पेस्ट करें",
      pasteHandlePrompt: "व्हाट्सएप / टेलीग्राम लिंक या हैंडल पेस्ट करें",
      pastePhonePrompt: "संदिग्ध फ़ोन नंबर दर्ज करें",
      checkNow: "अभी जाँचें",
      checkForScam: "धोखे की जाँच करें",

      riskAssessment: "जोखिम आकलन",
      exactDecodedContent: "सटीक डिकोड की गई सामग्री",
      paymentRequestDetails: "भुगतान अनुरोध विवरण",
      lowRisk: "कम जोखिम",
      highRisk: "उच्च जोखिम",
      suspicious: "संदिग्ध",
      confirmedRisk: "पुष्टि की गई धोखाधड़ी",

      analyzeAiBtn: "AI से गहरी जाँच करें — तुरंत परिणाम",
      analyzeWithAi: "AI से जाँच करें",
      askAiPrompt: "इस धोखाधड़ी से कैसे बचें, जानना चाहते हैं? हमारे AI सहायक से पूछें।",
      chatWithAi: "AI से बात करें",
      aiDisclaimer: "मुफ्त बुनियादी जाँच हमेशा स्वचालित रूप से चलती है। AI दूसरी राय वैकल्पिक है।",

      panicTitle: "रुकें। सोचें। कार्रवाई करें।",
      callHelplineLabel: "🚨 आधिकारिक हेल्पलाइन पर कॉल करें",
      reportPortalLabel: "cybercrime.gov.in पर रिपोर्ट करें",

      langTitle: "भाषा",
      scammedRightNow: "अभी धोखाधड़ी हो रही है? तुरंत मदद के लिए यहाँ टैप करें",
    },

    /* ------------------------------------------------------------------ */
    Bengali: {
      home: "হোম", scan: "স্ক্যান", generate: "তৈরি করুন",
      complain: "অভিযোগ", settings: "সেটিংস",

      whatToCheck: "আপনি কী পরীক্ষা করতে চান?",
      pickCategory: "একটি বিভাগ বেছে নিন — সাধারণ আইকন, কোনো অফিসিয়াল ব্র্যান্ডিং নেই।",

      govVerifyTitle: "সরকারি ডেটা দিয়ে যাচাই করুন",
      govVerifyDesc: "APK, ডিপফেক মিডিয়া এবং সন্দেহজনক ডিজিটাল কন্টেন্ট আইনি পদক্ষেপের জন্য আধিকারিক সাইবার ক্রাইম পোর্টালে জমা দিন।",
      govVerifySource: "উৎস: সাইবার ক্রাইম পোর্টাল",
      govVerifyBtn: "অফিসিয়াল পোর্টাল খুলুন ↗",

      scanPrivacy: "গোপনীয়তার সাথে স্ক্যান করুন",
      scanAnother: "আরেকটি স্ক্যান করুন",
      panicBannerText: "এখনই প্রতারিত হচ্ছেন? তাৎক্ষণিক সাহায্যের জন্য এখানে ট্যাপ করুন",

      websiteUrl: "ওয়েবসাইট ইউআরএল", phoneNumber: "ফোন নম্বর", emailId: "ইমেল আইডি",
      pasteUrlPrompt: "নিচে সন্দেহজনক ইউআরএল পেস্ট করুন",
      pasteHandlePrompt: "হোয়াটসঅ্যাপ / টেলিগ্রাম লিংক বা হ্যান্ডেল পেস্ট করুন",
      pastePhonePrompt: "সন্দেহজনক ফোন নম্বর লিখুন",
      checkNow: "এখনই পরীক্ষা করুন",
      checkForScam: "প্রতারণা পরীক্ষা করুন",

      riskAssessment: "ঝুঁকি মূল্যায়ন",
      exactDecodedContent: "সঠিক ডিকোড করা বিষয়বস্তু",
      paymentRequestDetails: "পেমেন্ট অনুরোধের বিবরণ",
      lowRisk: "কম ঝুঁকি",
      highRisk: "উচ্চ ঝুঁকি",
      suspicious: "সন্দেহজনক",
      confirmedRisk: "নিশ্চিত ঝুঁকি",

      analyzeAiBtn: "AI দিয়ে গভীর বিশ্লেষণ করুন — তাৎক্ষণিক ফলাফল",
      analyzeWithAi: "AI দিয়ে বিশ্লেষণ করুন",
      askAiPrompt: "এই প্রতারণা এড়াতে জানতে চান? আমাদের AI সহায়ককে জিজ্ঞাসা করুন।",
      chatWithAi: "AI এর সাথে চ্যাট করুন",
      aiDisclaimer: "বিনামূল্যে মূল পরীক্ষা সবসময় স্বয়ংক্রিয়ভাবে চলে। AI মত ঐচ্ছিক।",

      panicTitle: "থামুন। ভাবুন। ব্যবস্থা নিন।",
      callHelplineLabel: "🚨 অফিসিয়াল হেল্পলাইনে কল করুন",
      reportPortalLabel: "cybercrime.gov.in-এ রিপোর্ট করুন",

      langTitle: "ভাষা",
      scammedRightNow: "এখনই প্রতারিত হচ্ছেন? তাৎক্ষণিক সাহায্যের জন্য এখানে ট্যাপ করুন",
    },

    /* ------------------------------------------------------------------ */
    Telugu: {
      home: "హోమ్", scan: "స్కాన్", generate: "జనరేట్",
      complain: "ఫిర్యాదు", settings: "సెట్టింగులు",

      whatToCheck: "మీరు ఏమి తనిఖీ చేయాలనుకుంటున్నారు?",
      pickCategory: "ఒక వర్గాన్ని ఎంచుకోండి — సాధారణ ఐకాన్లు, అధికారిక బ్రాండింగ్ లేదు.",

      govVerifyTitle: "ప్రభుత్వ డేటాతో ధృవీకరించండి",
      govVerifyDesc: "APK లు, డీప్‌ఫేక్ మీడియా మరియు అనుమానాస్పద డిజిటల్ కంటెంట్‌ను చట్టపరమైన చర్య కోసం అధికారిక సైబర్ క్రైమ్ పోర్టల్‌కు సమర్పించండి.",
      govVerifySource: "మూలం: సైబర్ క్రైమ్ పోర్టల్",
      govVerifyBtn: "అధికారిక పోర్టల్ తెరవండి ↗",

      scanPrivacy: "గోప్యతతో స్కాన్ చేయండి",
      scanAnother: "మరొకటి స్కాన్ చేయండి",
      panicBannerText: "ఇప్పుడే మోసపోతున్నారా? తక్షణ సహాయం కోసం ఇక్కడ నొక్కండి",

      websiteUrl: "వెబ్‌సైట్ URL", phoneNumber: "ఫోన్ నంబర్", emailId: "ఇమెయిల్ ఐడి",
      pasteUrlPrompt: "అనుమానాస్పద URLని క్రింద పేస్ట్ చేయండి",
      pasteHandlePrompt: "వాట్సాప్ / టెలిగ్రామ్ లింక్ లేదా హ్యాండిల్ పేస్ట్ చేయండి",
      pastePhonePrompt: "అనుమానాస్పద ఫోన్ నంబర్‌ను నమోదు చేయండి",
      checkNow: "ఇప్పుడే తనిఖీ చేయండి",
      checkForScam: "మోసం తనిఖీ చేయండి",

      riskAssessment: "ప్రమాద మూల్యాంకనం",
      exactDecodedContent: "ఖచ్చితమైన డికోడ్ చేసిన కంటెంట్",
      paymentRequestDetails: "చెల్లింపు అభ్యర్థన వివరాలు",
      lowRisk: "తక్కువ ప్రమాదం",
      highRisk: "అధిక ప్రమాదం",
      suspicious: "అనుమానాస్పదం",
      confirmedRisk: "నిర్ధారిత ప్రమాదం",

      analyzeAiBtn: "AI తో లోతుగా తనిఖీ చేయండి — తక్షణ ఫలితం",
      analyzeWithAi: "AIతో విశ్లేషించండి",
      askAiPrompt: "ఈ మోసాన్ని ఎలా నివారించాలో తెలుసుకోవాలనుకుంటున్నారా? మా AI అసిస్టెంట్‌ని అడగండి.",
      chatWithAi: "AIతో చాట్ చేయండి",
      aiDisclaimer: "ఉచిత మూల తనిఖీ ఎల్లప్పుడూ స్వయంచాలకంగా జరుగుతుంది. AI అభిప్రాయం ఐచ్ఛికం.",

      panicTitle: "ఆగండి. ఆలోచించండి. చర్య తీసుకోండి.",
      callHelplineLabel: "🚨 అధికారిక హెల్ప్‌లైన్ కు కాల్ చేయండి",
      reportPortalLabel: "cybercrime.gov.in వద్ద నివేదించండి",

      langTitle: "భాష",
      scammedRightNow: "ఇప్పుడే మోసపోతున్నారా? తక్షణ సహాయం కోసం ఇక్కడ నొక్కండి",
    },

    /* ------------------------------------------------------------------ */
    Marathi: {
      home: "होम", scan: "स्कॅन", generate: "तयार करा",
      complain: "तक्रार", settings: "सेटिंग्ज",

      whatToCheck: "तुम्हाला काय तपासायचे आहे?",
      pickCategory: "एक श्रेणी निवडा — सामान्य आयकॉन, कोणतीही अधिकृत ब्रँडिंग नाही.",

      govVerifyTitle: "सरकारी डेटाने सत्यापित करा",
      govVerifyDesc: "APK, डीपफेक मीडिया आणि संशयास्पद डिजिटल सामग्री कायदेशीर कारवाईसाठी अधिकृत सायबर क्राइम पोर्टलवर सबमिट करा.",
      govVerifySource: "स्रोत: सायबर क्राइम पोर्टल",
      govVerifyBtn: "अधिकृत पोर्टल उघडा ↗",

      scanPrivacy: "गोपनीयतेसह स्कॅन करा",
      scanAnother: "नवीन स्कॅन करा",
      panicBannerText: "आत्ता फसवणूक होत आहे? त्वरित मदतीसाठी येथे टॅप करा",

      websiteUrl: "वेबसाइट URL", phoneNumber: "फोन नंबर", emailId: "ईमेल आयडी",
      pasteUrlPrompt: "खाली संशयास्पद URL पेस्ट करा",
      pasteHandlePrompt: "व्हॉट्सअ‍ॅप / टेलिग्राम लिंक किंवा हँडल पेस्ट करा",
      pastePhonePrompt: "संशयास्पद फोन नंबर टाका",
      checkNow: "आता तपासा",
      checkForScam: "फसवणूक तपासा",

      riskAssessment: "जोखीम मूल्यमापन",
      exactDecodedContent: "तंतोतंत डीकोड केलेली सामग्री",
      paymentRequestDetails: "देयक विनंती तपशील",
      lowRisk: "कमी धोका",
      highRisk: "उच्च धोका",
      suspicious: "संशयास्पद",
      confirmedRisk: "पुष्टी झालेला धोका",

      analyzeAiBtn: "AI ने सखोल तपासणी करा — तत्काळ निकाल",
      analyzeWithAi: "AI ने विश्लेषण करा",
      askAiPrompt: "ही फसवणूक कशी टाळावी हे जाणून घ्यायचे आहे? आमच्या AI सहाय्यकाला विचारा.",
      chatWithAi: "AI शी बोला",
      aiDisclaimer: "मोफत मूलभूत तपासणी नेहमी स्वयंचलितपणे चालते. AI मत पर्यायी आहे.",

      panicTitle: "थांबा. विचार करा. कृती करा.",
      callHelplineLabel: "🚨 अधिकृत हेल्पलाइनवर कॉल करा",
      reportPortalLabel: "cybercrime.gov.in वर तक्रार करा",

      langTitle: "भाषा",
      scammedRightNow: "आत्ता फसवणूक होत आहे? त्वरित मदतीसाठी येथे टॅप करा",
    },

    /* ------------------------------------------------------------------ */
    Tamil: {
      home: "முகப்பு", scan: "ஸ்கேன்", generate: "உருவாக்கு",
      complain: "புகார்", settings: "அமைப்புகள்",

      whatToCheck: "நீங்கள் எதை சரிபார்க்க விரும்புகிறீர்கள்?",
      pickCategory: "ஒரு வகையைத் தேர்ந்தெடுக்கவும் — பொதுவான ஐகான்கள் மட்டும், அதிகாரப்பூர்வ பிராண்டிங் இல்லை.",

      govVerifyTitle: "அரசு தரவுடன் சரிபார்க்கவும்",
      govVerifyDesc: "APK கள், டீப்ஃபேக் மீடியா மற்றும் சந்தேகத்திற்குரிய டிஜிட்டல் உள்ளடக்கத்தை சட்ட நடவடிக்கைக்கு அதிகாரப்பூர்வ சைபர் கிரைம் போர்டலில் சமர்ப்பிக்கவும்.",
      govVerifySource: "ஆதாரம்: சைபர் கிரைம் போர்டல்",
      govVerifyBtn: "அதிகாரப்பூர்வ போர்டல் திறக்கவும் ↗",

      scanPrivacy: "தனியுரிமையுடன் ஸ்கேன் செய்யவும்",
      scanAnother: "வேறொன்றை ஸ்கேன் செய்யவும்",
      panicBannerText: "இப்போது ஏமாற்றப்படுகிறீர்களா? உடனடி உதவிக்கு இங்கே தட்டவும்",

      websiteUrl: "இணையதள URL", phoneNumber: "தொலைபேசி எண்", emailId: "மின்னஞ்சல் ஐடி",
      pasteUrlPrompt: "சந்தேகத்திற்குரிய URL-ஐ கீழே ஒட்டவும்",
      pasteHandlePrompt: "வாட்ஸ்அப் / டெலிகிராம் லிங்க் அல்லது ஹேண்டிலை ஒட்டவும்",
      pastePhonePrompt: "சந்தேகத்திற்குரிய தொலைபேசி எண்ணை உள்ளிடவும்",
      checkNow: "இப்போது சரிபார்க்கவும்",
      checkForScam: "மோசடியை சரிபார்க்கவும்",

      riskAssessment: "ஆபத்து மதிப்பீடு",
      exactDecodedContent: "சரியான டிகோட் செய்யப்பட்ட உள்ளடக்கம்",
      paymentRequestDetails: "பணம் செலுத்தல் கோரிக்கை விவரங்கள்",
      lowRisk: "குறைந்த ஆபத்து",
      highRisk: "அதிக ஆபத்து",
      suspicious: "சந்தேகத்திற்குரியது",
      confirmedRisk: "உறுதிப்படுத்தப்பட்ட ஆபத்து",

      analyzeAiBtn: "AI மூலம் ஆழமாக சரிபார்க்கவும் — உடனடி முடிவு",
      analyzeWithAi: "AI மூலம் ஆய்வு செய்யவும்",
      askAiPrompt: "இந்த மோசடியை எவ்வாறு தவிர்ப்பது என்பதை அறிய விரும்புகிறீர்களா? எங்கள் AI உதவியாளரிடம் கேளுங்கள்.",
      chatWithAi: "AI உடன் அரட்டையடிக்கவும்",
      aiDisclaimer: "இலவச அடிப்படை சரிபார்ப்பு எப்போதும் தானாகவே இயங்கும். AI கருத்து விருப்பமானது.",

      panicTitle: "நிறுத்து. யோசி. செயல்படு.",
      callHelplineLabel: "🚨 அதிகாரப்பூர்வ உதவி எண்ணை அழைக்கவும்",
      reportPortalLabel: "cybercrime.gov.in இல் புகார் அளிக்கவும்",

      langTitle: "மொழி",
      scammedRightNow: "இப்போது ஏமாற்றப்படுகிறீர்களா? உடனடி உதவிக்கு இங்கே தட்டவும்",
    },

    /* ------------------------------------------------------------------ */
    Urdu: {
      home: "ہوم", scan: "اسکین", generate: "بنائیں",
      complain: "شکایت", settings: "ترتیبات",

      whatToCheck: "آپ کیا چیک کرنا چاہتے ہیں؟",
      pickCategory: "ایک زمرہ منتخب کریں — عام آئیکنز، کوئی سرکاری برانڈنگ نہیں۔",

      govVerifyTitle: "سرکاری ڈیٹا سے تصدیق کریں",
      govVerifyDesc: "APK، ڈیپ فیک میڈیا اور مشکوک ڈیجیٹل مواد کو قانونی کارروائی کے لیے آفیشل سائبر کرائم پورٹل پر جمع کروائیں۔",
      govVerifySource: "ماخذ: سائبر کرائم پورٹل",
      govVerifyBtn: "آفیشل پورٹل کھولیں ↗",

      scanPrivacy: "رازداری کے ساتھ اسکین کریں",
      scanAnother: "دوبارہ اسکین کریں",
      panicBannerText: "ابھی دھوکہ ہو رہا ہے؟ فوری مدد کے لیے یہاں ٹیپ کریں",

      websiteUrl: "ویب سائٹ یو آر ایل", phoneNumber: "فون نمبر", emailId: "ای میل آئی ڈی",
      pasteUrlPrompt: "نیچے مشکوک یو آر ایل پیسٹ کریں",
      pasteHandlePrompt: "واٹس ایپ / ٹیلیگرام لنک یا ہینڈل پیسٹ کریں",
      pastePhonePrompt: "مشکوک فون نمبر درج کریں",
      checkNow: "ابھی چیک کریں",
      checkForScam: "دھوکے کی جانچ کریں",

      riskAssessment: "خطرے کا جائزہ",
      exactDecodedContent: "درست ڈیکوڈ شدہ مواد",
      paymentRequestDetails: "ادائیگی کی درخواست کی تفصیل",
      lowRisk: "کم خطرہ",
      highRisk: "زیادہ خطرہ",
      suspicious: "مشکوک",
      confirmedRisk: "تصدیق شدہ خطرہ",

      analyzeAiBtn: "AI سے گہری جانچ کریں — فوری نتیجہ",
      analyzeWithAi: "AI سے تجزیہ کریں",
      askAiPrompt: "اس دھوکے سے کیسے بچیں جاننا چاہتے ہیں؟ ہمارے AI اسسٹنٹ سے پوچھیں۔",
      chatWithAi: "AI سے بات کریں",
      aiDisclaimer: "مفت بنیادی جانچ ہمیشہ خودکار چلتی ہے۔ AI رائے اختیاری ہے۔",

      panicTitle: "رکیں۔ سوچیں۔ عمل کریں۔",
      callHelplineLabel: "🚨 سرکاری ہیلپ لائن پر کال کریں",
      reportPortalLabel: "cybercrime.gov.in پر رپورٹ کریں",

      langTitle: "زبان",
      scammedRightNow: "ابھی دھوکہ ہو رہا ہے؟ فوری مدد کے لیے یہاں ٹیپ کریں",
    },

    /* ------------------------------------------------------------------ */
    Gujarati: {
      home: "હોમ", scan: "સ્કેન", generate: "જનરેટ કરો",
      complain: "ફરિયાદ", settings: "સેટિંગ્સ",

      whatToCheck: "તમે શું ચકાસવા માંગો છો?",
      pickCategory: "એક શ્રેણી પસંદ કરો — સામાન્ય આઇકોન્સ, કોઈ સત્તાવાર બ્રાન્ડિંગ નથી.",

      govVerifyTitle: "સરકારી ડેટા સાથે ચકાસો",
      govVerifyDesc: "APK, ડીપફેક મીડિયા અને શંકાસ્પદ ડિજિટલ સામગ્રી કાનૂની કાર્યવાહી માટે સત્તાવાર સાઇબર ક્રાઇમ પોર્ટલ પર સબમિટ કરો.",
      govVerifySource: "સ્રોત: સાઇબર ક્રાઇમ પોર્ટલ",
      govVerifyBtn: "સત્તાવાર પોર્ટલ ખોલો ↗",

      scanPrivacy: "ગોપનીયતા સાથે સ્કેન કરો",
      scanAnother: "બીજું સ્કેન કરો",
      panicBannerText: "અત્યારે છેતરપિંડી થઈ રહી છે? તાત્કાલિક મદદ માટે અહીં ટેપ કરો",

      websiteUrl: "વેબસાઇટ URL", phoneNumber: "ફોન નંબર", emailId: "ઇમેઇલ આઈડી",
      pasteUrlPrompt: "નીચે શંકાસ્પદ URL પેસ્ટ કરો",
      pasteHandlePrompt: "વોટ્સએપ / ટેલિગ્રામ લિંક અથવા હેન્ડલ પેસ્ટ કરો",
      pastePhonePrompt: "શંકાસ્પદ ફોન નંબર દાખલ કરો",
      checkNow: "હમણાં ચકાસો",
      checkForScam: "છેતરપિંડી ચકાસો",

      riskAssessment: "જોખમ આકારણી",
      exactDecodedContent: "ચોક્કસ ડીકોડ કરેલ સામગ્રી",
      paymentRequestDetails: "ચૂકવણી વિનંતીની વિગતો",
      lowRisk: "ઓછું જોખમ",
      highRisk: "ઉચ્ચ જોખમ",
      suspicious: "શંકાસ્પદ",
      confirmedRisk: "પુષ્ટિ થયેલ જોખમ",

      analyzeAiBtn: "AI વડે ઊંડી ચકાસણી કરો — તત્કાળ પરિણામ",
      analyzeWithAi: "AI વડે વિશ્લેષણ કરો",
      askAiPrompt: "આ છેતરપિંડીથી કેવી રીતે બચવું તે જાણવા માંગો છો? અમારા AI સહાયકને પૂછો.",
      chatWithAi: "AI સાથે ચેટ કરો",
      aiDisclaimer: "મફત મૂળ ચકાસણી હંમેશા આપોઆપ ચાલે છે. AI મત વૈકલ્પિક છે.",

      panicTitle: "રોકાઓ. વિચારો. પગલાં લો.",
      callHelplineLabel: "🚨 સત્તાવાર હેલ્પલાઇન પર કૉલ કરો",
      reportPortalLabel: "cybercrime.gov.in પર ફરિયાદ કરો",

      langTitle: "ભાષા",
      scammedRightNow: "અત્યારે છેતરપિંડી થઈ રહી છે? તાત્કાલિક મદદ માટે અહીં ટેપ કરો",
    },

    /* ------------------------------------------------------------------ */
    Kannada: {
      home: "ಮುಖಪುಟ", scan: "ಸ್ಕ್ಯಾನ್", generate: "ರಚಿಸಿ",
      complain: "ದೂರು", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",

      whatToCheck: "ನೀವು ಏನನ್ನು ಪರಿಶೀಲಿಸಲು ಬಯಸುತ್ತೀರಿ?",
      pickCategory: "ಒಂದು ವರ್ಗವನ್ನು ಆರಿಸಿ — ಸಾಮಾನ್ಯ ಐಕಾನ್‌ಗಳು, ಯಾವುದೇ ಅಧಿಕೃತ ಬ್ರಾಂಡಿಂಗ್ ಇಲ್ಲ.",

      govVerifyTitle: "ಸರ್ಕಾರಿ ಡೇಟಾದೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ",
      govVerifyDesc: "APK ಗಳು, ಡೀಪ್‌ಫೇಕ್ ಮಾಧ್ಯಮ ಮತ್ತು ಅನುಮಾನಾಸ್ಪದ ಡಿಜಿಟಲ್ ವಿಷಯವನ್ನು ಕಾನೂನು ಕ್ರಮಕ್ಕಾಗಿ ಅಧಿಕೃತ ಸೈಬರ್ ಕ್ರೈಮ್ ಪೋರ್ಟಲ್‌ಗೆ ಸಲ್ಲಿಸಿ.",
      govVerifySource: "ಮೂಲ: ಸೈಬರ್ ಕ್ರೈಮ್ ಪೋರ್ಟಲ್",
      govVerifyBtn: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ ↗",

      scanPrivacy: "ಗೌಪ್ಯತೆಯೊಂದಿಗೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      scanAnother: "ಮತ್ತೊಂದು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      panicBannerText: "ಈಗ ವಂಚನೆಗೆ ಒಳಗಾಗುತ್ತಿದ್ದೀರಾ? ತಕ್ಷಣದ ಸಹಾಯಕ್ಕಾಗಿ ಇಲ್ಲಿ ಟ್ಯಾಪ್ ಮಾಡಿ",

      websiteUrl: "ವೆಬ್‌ಸೈಟ್ URL", phoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ", emailId: "ಇಮೇಲ್ ಐಡಿ",
      pasteUrlPrompt: "ಕೆಳಗೆ ಅನುಮಾನಾಸ್ಪದ URL ಅಂಟಿಸಿ",
      pasteHandlePrompt: "ವಾಟ್ಸಾಪ್ / ಟೆಲಿಗ್ರಾಮ್ ಲಿಂಕ್ ಅಥವಾ ಹ್ಯಾಂಡಲ್ ಅಂಟಿಸಿ",
      pastePhonePrompt: "ಅನುಮಾನಾಸ್ಪದ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
      checkNow: "ಈಗ ಪರಿಶೀಲಿಸಿ",
      checkForScam: "ವಂಚನೆ ಪರಿಶೀಲಿಸಿ",

      riskAssessment: "ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ",
      exactDecodedContent: "ನಿಖರ ಡಿಕೋಡ್ ಮಾಡಿದ ವಿಷಯ",
      paymentRequestDetails: "ಪಾವತಿ ವಿನಂತಿ ವಿವರಗಳು",
      lowRisk: "ಕಡಿಮೆ ಅಪಾಯ",
      highRisk: "ಹೆಚ್ಚಿನ ಅಪಾಯ",
      suspicious: "ಸಂಶಯಾಸ್ಪದ",
      confirmedRisk: "ದೃಢಪಡಿಸಿದ ಅಪಾಯ",

      analyzeAiBtn: "AI ಮೂಲಕ ಆಳವಾಗಿ ತನಿಖೆ ಮಾಡಿ — ತ್ವರಿತ ಫಲಿತಾಂಶ",
      analyzeWithAi: "AI ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಿ",
      askAiPrompt: "ಈ ವಂಚನೆಯನ್ನು ತಪ್ಪಿಸುವುದು ಹೇಗೆ ಎಂದು ತಿಳಿಯ ಬಯಸುವಿರಾ? ನಮ್ಮ AI ಸಹಾಯಕರನ್ನು ಕೇಳಿ.",
      chatWithAi: "AI ಜೊತೆ ಚಾಟ್ ಮಾಡಿ",
      aiDisclaimer: "ಉಚಿತ ಮೂಲ ಪರಿಶೀಲನೆ ಯಾವಾಗಲೂ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಚಲಿಸುತ್ತದೆ. AI ಅಭಿಪ್ರಾಯ ಐಚ್ಛಿಕ.",

      panicTitle: "ನಿಲ್ಲಿಸಿ. ಯೋಚಿಸಿ. ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.",
      callHelplineLabel: "🚨 ಅಧಿಕೃತ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ಕರೆ ಮಾಡಿ",
      reportPortalLabel: "cybercrime.gov.in ನಲ್ಲಿ ವರದಿ ಮಾಡಿ",

      langTitle: "ಭಾಷೆ",
      scammedRightNow: "ಈಗ ವಂಚನೆಗೆ ಒಳಗಾಗುತ್ತಿದ್ದೀರಾ? ತಕ್ಷಣದ ಸಹಾಯಕ್ಕಾಗಿ ಇಲ್ಲಿ ಟ್ಯಾಪ್ ಮಾಡಿ",
    },
  };

  /* ------------------------------------------------------------------
     Core helpers
  ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
     DOM sync — updates every [data-i18n] node in the document
  ------------------------------------------------------------------ */
  function applyToDom() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });
    // Also update any [data-i18n-html] nodes that need innerHTML (e.g. badge combos)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    // RTL toggle for Urdu
    const lang = getSaved();
    document.documentElement.setAttribute(
      "dir", lang === "Urdu" ? "rtl" : "ltr"
    );
  }

  /* ------------------------------------------------------------------
     Language picker renderer
  ------------------------------------------------------------------ */
  function renderPicker() {
    const container = document.getElementById("langPickerOptions");
    if (!container) return;
    container.innerHTML = "";
    const current = getSaved();
    LANGUAGES.forEach((lang) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "qrv-theme-swatch" + (lang === current ? " ring-2 ring-amber" : "");
      btn.textContent = lang + (isTranslated(lang) ? "" : " (beta)");
      btn.title = isTranslated(lang)
        ? ""
        : "Not fully translated yet — shows English for untranslated text";
      btn.addEventListener("click", () => {
        save(lang);
        applyToDom();
        renderPicker();
        document.dispatchEvent(
          new CustomEvent("qrv:lang-changed", { detail: { lang } })
        );
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
