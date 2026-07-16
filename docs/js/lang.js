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
      complain: "Scam Shield", scamShield: "Scam Shield", settings: "Settings",

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
      analyzeAiBtn: "Advance Analyse with AI — deeper check, instant result",
      analyzeWithAi: "Advance Analyse",
      askAiPrompt: "Want to know how to avoid this scam? Ask our AI Assistant.",
      chatWithAi: "Chat with AI",
      aiDisclaimer: "Free basic check always runs automatically. AI Advance Opinion is optional and never delayed by ads.",

      /* Panic mode */
      panicTitle: "Stop. Think. Act.",
      callHelplineLabel: "🚨 CALL OFFICIAL HELPLINE",
      reportPortalLabel: "Report at cybercrime.gov.in",

      /* Settings */
      langTitle: "Language",
      scammedRightNow: "Being scammed right now? Tap here for immediate help",

      /* Scam Shield modal */
      scamShieldTagline: "Learn. Protect. Stay Safe.",
      scamShieldIntro: "Aapki suraksha ke liye — sarkari salaah aur jaankari ek jagah.",
      scamShieldTipsHeading: "How to Avoid Scams",
      scamShieldStatsHeading: "Indian Cyber Fraud Statistics",
      scamShieldStepsHeading: "How to Save Your Money From Scammers",
      scamShieldEmergencyHeading: "If You Have Already Lost Money",
      scamShieldEmergencyIntro: "Turant karein — agar aapke saath dhokhadhadi ho chuki hai:",
      scamShieldCallBtn: "Call 1930",
      scamShieldReportBtn: "Report Online ↗",
      scamShieldClose: "Close",
      backToHome: "Back to Home",

      /* Founder */
      founderBio: "Building privacy-first security tools for India's 800M+ mobile users. BA student, content creator, and self-taught developer.",
      founderTitleLead: "Lead Developer",
      founderTitleFounder: "Founder",
      otherProjects: "Other Projects",
      connect: "Connect",

      /* Share QRaksha */
      shareAppTitle: "Share QRaksha",
      shareAppText: "Protect yourself from online scams with QRaksha — Scan, Verify and Stay Safe.",
      shareNow: "Share Now",
      copyLink: "Copy",
      copiedLink: "Copied!",

      /* Settings */
      shareQRaksha: "Share QRaksha",
      howQRakshaProtects: "How QRaksha Protects You",

      /* Voice / Text-to-Speech spoken phrases — deliberately more
         conversational than the button-label text above, since these
         are meant to be heard, not read. */
      voiceWebsiteUrl: "Please paste the suspicious link here.",
      voiceWhatsapp: "Please paste the WhatsApp or Telegram link or handle here.",
      voicePhone: "Please enter the suspicious phone number here.",
      voiceEmail: "Please paste the suspicious email address here.",
      voiceSms: "Please paste the SMS sender name or number here.",
      voiceSocial: "Please paste the social media profile link here.",
      voiceGenerate: "Create your own QR code here.",
      voiceScan: "Point your camera at a QR code, or upload an image.",
      voiceScamShield: "Learn how to protect yourself from scams here.",
      voiceSettings: "Change your language, theme, or other app settings here.",
      voiceLanguage: "Choose your preferred language here.",
      voiceHome: "Go to the home screen.",
      voiceDangerAlert: "This is very dangerous. Please do not proceed. Please stay safe.",
      voiceWarnAlert: "Please be careful. This looks suspicious.",
      voiceSafeAlert: "No known danger was found. Still, always stay careful.",
      voicePlatformReport: "Do you want to file a complaint about this on {platform}?",
      voiceChooseLanguageFirst: "Welcome to QRaksha. Please choose your language to continue.",
      voiceMuteToggle: "Turn voice guidance on or off.",

      /* ---- Scan/check result strings — risk-engine-core.js (QR flow) ---- */
      httpNotHttps: "Uses unencrypted HTTP instead of HTTPS — data sent to this site isn't protected in transit.",
      httpsConfirmed: "Connection is encrypted with HTTPS.",
      linkIsRawIp: "The link points directly to an IP address instead of a domain name — a common phishing technique.",
      urlHasAtSymbol: "The URL contains an \"@\" symbol — browsers ignore everything before it, a classic disguised-link trick.",
      urlVeryLong: "The URL is very long ({len} characters), which can be used to hide the real destination.",
      urlLongerThanTypical: "The URL is longer than typical ({len} characters).",
      urlManyParams: "The link carries an unusually high number of parameters ({count}).",
      urlIsShortened: "This is a shortened link — the real destination is hidden until you open it.",
      domainPunycode: "The domain uses Punycode encoding, sometimes used to mimic a trusted brand with look-alike characters.",
      domainDeepSubdomain: "The domain has an unusually deep subdomain chain.",
      containsScamKeywords: "Contains scam-associated keyword(s): {keywords}.",
      domainBrandMismatch: "The domain references a well-known brand name but does not match that brand's official domain — a strong sign of impersonation.",
      socialOrgImpersonation: "This profile's username impersonates \"{org}\" with official-sounding wording (\"{word}\") — real banks/authorities do not run support accounts through personal social profiles or QR-shared handles.",
      romanceScamPattern: "Profile name pattern (military rank + deployed-overseas persona) matches a well-documented romance-scam template — proceed with extreme caution, especially if this contact asks for money, gifts, or personal details.",
      noDangerInLinkStructure: "No obvious danger was detected in this link's structure.",
      upiCheckPayeeName: "Always check the payee name shown in your UPI app before approving any payment.",
      upiPrefilledAmount: "This QR requests a pre-filled amount — confirm it matches what you expect to pay.",
      upiDeceptiveVpa: "The payee address (\"{vpa}\") contains a deceptive term commonly used in refund/support-impersonation scams — legitimate businesses rarely use these words in their actual VPA.",
      upiRefundScamPattern: "A high pre-filled amount (₹{amount}) combined with a \"customer support\"-style payee name is a well-documented refund-scam pattern — real refunds are never collected by scanning a QR and paying money.",
      upiUrgentNote: "The payment note contains urgent/panic-inducing language (\"{note}\") — this pressure tactic is common in KYC and account-block scam QR codes.",
      wifiOpenNetwork: "This connects to an open WiFi network with no password — traffic on open networks can be intercepted.",
      cryptoIrreversible: "Cryptocurrency transfers can't be reversed — verify the wallet address character-by-character before sending funds.",
      plainTextLowRisk: "This is plain text with no link or action — generally low risk.",
      contentFormatUnrecognized: "The content format wasn't recognized, so it couldn't be fully analyzed.",

      /* ---- Category-check strings — verification-engine.js ---- */
      suspiciousTld: "Uses \"{tld}\" — a top-level domain frequently abused for short-lived phishing sites (not proof alone, but raises risk).",
      containsScamPatternWording: "Contains reported scam-pattern wording: \"{keyword}\".",
      /* Merged: same brand-impersonation message previously duplicated
         in two places in the code — now driven by one shared key. */
      brandImpersonationBoosted: "Domain imitates \"{brand}\" and pairs it with urgency wording (security/alert/verify/etc.) — a strong phishing pattern. This is not {brand}'s real domain.",
      brandImpersonation: "Domain mentions \"{brand}\" but isn't that brand's real domain — a classic lookalike-brand phishing pattern.",
      fakeGovSchemeDomain: "Mentions the government scheme \"{scheme}\" but isn't a real .gov.in or .nic.in address — genuine government scheme sites never use commercial domains.",
      smsHeaderNearMiss: "\"{suffix}\" is just one character different from the genuine verified header \"{realHeader}\" — a classic header-spoofing trick.",
      unusualHostnameStructure: "Unusually long/hyphenated hostname structure, often seen in auto-generated phishing subdomains.",
      flaggedByGsb: "Flagged by Google Safe Browsing: {types}.",
      abuseIpdbScore: "AbuseIPDB reports a {score}% abuse confidence score for this IP address ({reports} reports).",
      urlNoKnownRisk: "No known suspicious TLD, brand-lookalike, or scam keyword pattern found in this URL, and it's not on the live phishunt.io threat feed.",
      phishuntListed: "Listed on the live phishunt.io threat feed (aggregates PhishTank/OpenPhish/Google Safe Browsing/urlscan.io) — first seen {date}.",
      phishuntListedBrand: "Listed on the live phishunt.io threat feed (aggregates PhishTank/OpenPhish/Google Safe Browsing/urlscan.io) — first seen {date}, impersonating \"{brand}\".",
      chatInviteLink: "This is a group/channel invite link — invite links bypass normal contact checks, so verify the group's purpose independently before joining.",
      chatTaskScamPattern: "Matches a reported task-scam / investment-scam pattern: \"{keyword}\".",
      chatOfficialSupportName: "Uses a generic \"official support\"-style name (\"{word}\") — impersonation of customs/police/bank officials in group admin names is a widely reported pattern (per Chakshu/Sanchar Saathi advisories).",
      chatNoKnownRisk: "No known scam-recruitment or impersonation keyword pattern detected in this text.",
      phoneCarrierInfo: "Carrier: {carrier}, Location: {location}, Line type: {lineType}.",
      phoneVoipLine: "Registered as a VoIP/toll-free virtual line — frequently used to mask a scammer's real identity and location.",
      phoneLookupUnavailable: "Live carrier lookup unavailable right now — showing local pattern analysis only.",
      phoneRepeatingDigits: "Number is a suspicious repeating-digit series, uncommon for genuine personal or business lines.",
      phoneTelemarketingPrefix: "Prefix pattern is commonly associated with automated telemarketing/bulk-dialer series.",
      phoneNoKnownRiskNoLookup: "No known high-risk pattern found for this number via local analysis. Live carrier lookup was not run (no API key configured) — this does not confirm the number is safe.",
      emailDisposableProvider: "Uses a disposable/temporary email provider — legitimate businesses don't use throwaway addresses.",
      emailSpoofedSupportOnFreemail: "Local part (\"{localPart}\") mimics an official support address but is hosted on a free public mail provider ({domain}) — no genuine bank/courier/tax authority uses Gmail/Yahoo for official support.",
      emailFreemailCaution: "Hosted on a free public mail provider ({domain}) — not inherently unsafe, but be cautious if this claims to be an \"official\" address.",
      emailNoKnownRisk: "No known disposable-domain or support-impersonation pattern found.",
      smsHeaderWrongLength: "Header suffix \"{suffix}\" is {len} characters — genuine TRAI-registered bank headers are exactly 6 characters. Non-standard length is a spoofing signal.",
      smsHeaderUnverified: "\"{suffix}\" looks like it's impersonating a bank header but isn't in the known verified list — treat any \"urgent account action\" SMS from it with suspicion.",
      smsHeaderVerified: "\"{suffix}\" matches a known verified bank SMS header pattern.",
      smsPersonalNumberWarning: "This is a plain 10-digit personal mobile number, not a registered alphanumeric header. If the message content claims to be an automated bank alert, electricity disconnection notice, or similar official communication, that is a strong SMS-spoofing red flag — genuine automated alerts always come from registered alphanumeric headers, never a personal mobile number.",
      smsUnparseable: "Couldn't parse this as a standard TRAI header (XX-XXXXXX) or a 10-digit number — double-check the format.",
      smsNoKnownRisk: "No spoofing pattern detected.",
      socialScamKeyword: "Matches a reported scam-pattern keyword: \"{keyword}\".",
      socialGiveawayPattern: "Contains a pattern common to fake-giveaway/crypto-doubling or celebrity-impersonation profiles: \"{keyword}\".",
      socialManyDigitsHandle: "Handle \"{handle}\" contains an unusually high number of digits — often seen in mass-produced clone/bot accounts impersonating real profiles.",
      socialNoKnownRisk: "No known clone-account or fake-giveaway pattern found in this link.",
      errInvalidUrl: "That doesn't look like a valid URL",
      errDoubleCheckLink: "Double-check the link and try again.",
      errInvalidPhone: "That doesn't look like a complete phone number",
      errInvalidEmail: "That doesn't look like a valid email address",

      /* ---- Shared verdict-title templates — used by every category check ---- */
      verdictTitleSafe: "No known risk pattern found for this {subjectType}",
      verdictTitleDanger: "High-risk {subjectType} — treat as likely fraud",
      verdictTitleWarn: "Suspicious {subjectType} — proceed with caution",
      verdictTitleInfo: "Minor caution flags found for this {subjectType}",
      subjectTypeUrl: "URL",
      subjectTypeChatHandle: "chat handle/link",
      subjectTypePhone: "phone number",
      subjectTypeEmail: "email address",
      subjectTypeSms: "SMS header",
      subjectTypeSocial: "social profile",
      errPleaseEnterSomething: "Please enter something to check",
      titleCommunityReported: "Already reported by other QRaksha users as a scam",
      errUnknownCategory: "Unknown category",
      errCheckFailed: "Couldn't complete an automated check",
      communityFlaggedWithNote: "This exact {category} was flagged by the community: \"{note}\".",
      communityFlaggedNoNote: "This exact {category} was flagged by the community.",
      communityUnverifiedNotice: "Community reports are unverified crowd-sourced signals — still confirm independently before acting.",
      checkFailedDetail: "Something went wrong running this check locally. Please verify manually via official channels before trusting this.",
      scamWarningKycFraud: "No bank or telecom operator ever asks for KYC updates, OTPs, or passwords over a call, SMS link, or DM.",
      scamWarningDigitalArrest: "'Digital arrest' is not a real legal process in India. No police, court, or agency holds anyone on video call or demands money to avoid arrest.",
      scamWarningJobFraud: "Real companies never ask candidates to pay a registration, training, or deposit fee to get hired.",
      scamWarningUpiFraud: "You never need to enter your UPI PIN to receive money — PIN is only for sending payments.",
      scamWarningCourierScam: "Customs and courier companies never call demanding fees to a personal bank account or UPI ID to release a package.",
      scamWarningLotteryPrize: "You cannot win a lottery or contest you never entered. Never pay 'tax' or 'processing fees' to claim a prize.",
      scamWarningBankImpersonation: "Bank staff and security teams never ask you to read out an OTP, password, or CVV over call, SMS, or social media.",
      scamWarningGovSchemeFraud: "Government scheme benefits are free. Any site or call demanding a fee for registration is fake — official sites end in gov.in or nic.in.",
      scamWarningAadhaarFraud: "Never share your Aadhaar number with an OTP together — that combination lets someone else authenticate as you.",
      scamWarningPhishingGeneric: "Check the web address carefully before entering any login details — fake sites use lookalike spellings or IP addresses instead of real domains.",
      scamWarningInvestmentFraud: "No legitimate, SEBI-registered advisor ever guarantees fixed daily or weekly profits — that promise alone is proof of fraud.",
      scamWarningCelebrityImpersonation: "Celebrities and business leaders do not run personal investment groups or crypto schemes on social media DMs.",
      scamWarningSextortion: "Do not accept video calls from unknown profiles. If threatened, do not pay — screenshot everything and report to cybercrime.gov.in immediately.",
    },

    /* ------------------------------------------------------------------ */
    Hindi: {
      home: "होम", scan: "स्कैन", generate: "जनरेट करें",
      complain: "स्कैम शील्ड", scamShield: "स्कैम शील्ड", settings: "सेटिंग्स",

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

      scamShieldTagline: "जानें। सुरक्षित रहें। बचे रहें।",
      scamShieldIntro: "आपकी सुरक्षा के लिए — सरकारी सलाह और जानकारी एक जगह।",
      scamShieldTipsHeading: "स्कैम से कैसे बचें",
      scamShieldStatsHeading: "भारतीय साइबर धोखाधड़ी आंकड़े",
      scamShieldStepsHeading: "स्कैमर्स से अपना पैसा कैसे बचाएं",
      scamShieldEmergencyHeading: "अगर आपका पैसा पहले ही जा चुका है",
      scamShieldEmergencyIntro: "तुरंत करें — अगर आपके साथ धोखाधड़ी हो चुकी है:",
      scamShieldCallBtn: "1930 पर कॉल करें",
      scamShieldReportBtn: "ऑनलाइन रिपोर्ट करें ↗",
      scamShieldClose: "बंद करें",
      backToHome: "होम पर वापस जाएं",

      founderBio: "भारत के 800M+ मोबाइल उपयोगकर्ताओं के लिए प्राइवेसी-फर्स्ट सुरक्षा टूल्स बना रहे हैं। BA छात्र, कंटेंट क्रिएटर और सेल्फ-टॉट डेवलपर।",
      founderTitleLead: "लीड डेवलपर",
      founderTitleFounder: "फाउंडर",
      otherProjects: "अन्य प्रोजेक्ट्स",
      connect: "जुड़ें",

      shareAppTitle: "QRaksha शेयर करें",
      shareAppText: "QRaksha के साथ ऑनलाइन धोखाधड़ी से सुरक्षित रहें — स्कैन करें, सत्यापित करें और सुरक्षित रहें।",
      shareNow: "अभी शेयर करें",
      copyLink: "कॉपी करें",
      copiedLink: "कॉपी हो गया!",

      shareQRaksha: "QRaksha शेयर करें",
      howQRakshaProtects: "QRaksha आपकी सुरक्षा कैसे करता है",

      voiceWebsiteUrl: "कृपया लिंक यहाँ पेस्ट करें।",
      voiceWhatsapp: "कृपया WhatsApp या Telegram लिंक या हैंडल यहाँ पेस्ट करें।",
      voicePhone: "कृपया संदिग्ध फ़ोन नंबर यहाँ डालें।",
      voiceEmail: "कृपया संदिग्ध ईमेल पता यहाँ पेस्ट करें।",
      voiceSms: "कृपया SMS भेजने वाले का नाम या नंबर यहाँ पेस्ट करें।",
      voiceSocial: "कृपया सोशल मीडिया प्रोफ़ाइल का लिंक यहाँ पेस्ट करें।",
      voiceGenerate: "यहाँ अपना खुद का QR कोड बनाएं।",
      voiceScan: "QR कोड पर कैमरा लगाएं, या इमेज अपलोड करें।",
      voiceScamShield: "यहाँ स्कैम से खुद को बचाना सीखें।",
      voiceSettings: "यहाँ भाषा, थीम या अन्य सेटिंग्स बदलें।",
      voiceLanguage: "यहाँ अपनी पसंदीदा भाषा चुनें।",
      voiceHome: "होम स्क्रीन पर जाएं।",
      voiceDangerAlert: "यह बहुत ही खतरनाक है। कृपया इससे बचें। कृपया आगे न बढ़ें।",
      voiceWarnAlert: "कृपया सावधान रहें। यह संदिग्ध लग रहा है।",
      voiceSafeAlert: "कोई ज्ञात खतरा नहीं मिला। फिर भी हमेशा सावधान रहें।",
      voicePlatformReport: "क्या आप {platform} पर इसकी शिकायत दर्ज करना चाहते हैं?",
      voiceChooseLanguageFirst: "QRaksha में आपका स्वागत है। जारी रखने के लिए कृपया अपनी भाषा चुनें।",
      voiceMuteToggle: "आवाज़ सहायता चालू या बंद करें।",

      httpNotHttps: "असुरक्षित HTTP इस्तेमाल हो रहा है, HTTPS नहीं — इस साइट पर भेजा गया डेटा सुरक्षित नहीं है।",
      httpsConfirmed: "कनेक्शन HTTPS से एन्क्रिप्टेड है।",
      linkIsRawIp: "लिंक सीधे एक IP एड्रेस पर जाता है, डोमेन नेम पर नहीं — यह एक आम फिशिंग तरीका है।",
      urlHasAtSymbol: "URL में \"@\" चिह्न है — ब्राउज़र इससे पहले की हर चीज़ को नज़रअंदाज़ कर देते हैं, यह एक क्लासिक छुपे-हुए-लिंक वाला तरीका है।",
      urlVeryLong: "URL बहुत लंबा है ({len} अक्षर), जिसका इस्तेमाल असली मंज़िल छुपाने के लिए किया जा सकता है।",
      urlLongerThanTypical: "URL सामान्य से लंबा है ({len} अक्षर)।",
      urlManyParams: "लिंक में असामान्य रूप से ज़्यादा पैरामीटर हैं ({count})।",
      urlIsShortened: "यह एक छोटा किया हुआ (shortened) लिंक है — असली मंज़िल तब तक छुपी रहती है जब तक आप इसे खोलते नहीं।",
      domainPunycode: "डोमेन Punycode एन्कोडिंग इस्तेमाल करता है, जो कभी-कभी भरोसेमंद ब्रांड की नकल करने के लिए इस्तेमाल होती है।",
      domainDeepSubdomain: "डोमेन में असामान्य रूप से गहरी सबडोमेन चेन है।",
      containsScamKeywords: "स्कैम से जुड़े कीवर्ड मिले: {keywords}।",
      domainBrandMismatch: "डोमेन एक जाने-माने ब्रांड का नाम इस्तेमाल करता है लेकिन उस ब्रांड के असली डोमेन से मेल नहीं खाता — नकल का मज़बूत संकेत।",
      socialOrgImpersonation: "इस प्रोफ़ाइल का यूज़रनेम \"{org}\" की नकल करता है और आधिकारिक जैसा शब्द (\"{word}\") इस्तेमाल करता है — असली बैंक/प्राधिकरण कभी निजी सोशल प्रोफ़ाइल या QR-शेयर्ड हैंडल से सपोर्ट अकाउंट नहीं चलाते।",
      romanceScamPattern: "प्रोफ़ाइल नाम का पैटर्न (सैन्य रैंक + विदेश में तैनाती वाला व्यक्तित्व) एक जाना-पहचाना रोमांस-स्कैम टेम्पलेट है — बेहद सावधानी बरतें, खासकर अगर यह संपर्क पैसे, तोहफे या निजी जानकारी मांगे।",
      noDangerInLinkStructure: "इस लिंक की बनावट में कोई स्पष्ट खतरा नहीं मिला।",
      upiCheckPayeeName: "कोई भी भुगतान स्वीकार करने से पहले हमेशा अपने UPI ऐप में दिख रहा payee नाम जांचें।",
      upiPrefilledAmount: "इस QR में पहले से भरी हुई राशि है — पुष्टि करें कि यह उतनी ही है जितनी आप देना चाहते हैं।",
      upiDeceptiveVpa: "Payee का पता (\"{vpa}\") एक भ्रामक शब्द रखता है जो रिफंड/सपोर्ट-नकल स्कैम में आम है — असली व्यवसाय अपने VPA में ऐसे शब्द शायद ही इस्तेमाल करते हैं।",
      upiRefundScamPattern: "बड़ी पहले से भरी राशि (₹{amount}) + \"customer support\" जैसा payee नाम — यह एक जाना-पहचाना रिफंड-स्कैम पैटर्न है। असली रिफंड कभी QR स्कैन करके पैसे देने से नहीं मिलता।",
      upiUrgentNote: "पेमेंट नोट में जल्दबाज़ी/घबराहट भरी भाषा है (\"{note}\") — यह दबाव बनाने का तरीका KYC और अकाउंट-ब्लॉक स्कैम QR कोड में आम है।",
      wifiOpenNetwork: "यह बिना पासवर्ड वाले खुले WiFi नेटवर्क से जुड़ता है — खुले नेटवर्क पर ट्रैफ़िक चोरी हो सकता है।",
      cryptoIrreversible: "क्रिप्टोकरेंसी ट्रांसफर वापस नहीं हो सकते — पैसे भेजने से पहले wallet एड्रेस को अक्षर-दर-अक्षर जांच लें।",
      plainTextLowRisk: "यह बिना किसी लिंक या एक्शन वाला सादा टेक्स्ट है — आमतौर पर कम जोखिम।",
      contentFormatUnrecognized: "यह कंटेंट फॉर्मेट पहचाना नहीं जा सका, इसलिए पूरी तरह जांचा नहीं जा सका।",

      suspiciousTld: "\"{tld}\" इस्तेमाल हो रहा है — यह टॉप-लेवल डोमेन अक्सर छोटी अवधि की फिशिंग साइट्स के लिए इस्तेमाल होता है (अकेले यह सबूत नहीं, पर जोखिम बढ़ाता है)।",
      containsScamPatternWording: "रिपोर्ट की गई स्कैम-पैटर्न भाषा मिली: \"{keyword}\"।",
      brandImpersonationBoosted: "डोमेन \"{brand}\" की नकल करता है और साथ में जल्दबाज़ी वाले शब्द (security/alert/verify) भी हैं — यह मज़बूत फिशिंग पैटर्न है। यह {brand} का असली डोमेन नहीं है।",
      brandImpersonation: "डोमेन \"{brand}\" का ज़िक्र करता है लेकिन यह उस ब्रांड का असली डोमेन नहीं है — एक क्लासिक नकली-ब्रांड फिशिंग पैटर्न।",
      fakeGovSchemeDomain: "सरकारी योजना \"{scheme}\" का ज़िक्र करता है लेकिन यह असली .gov.in या .nic.in पता नहीं है — असली सरकारी योजना साइट कभी commercial डोमेन इस्तेमाल नहीं करतीं।",
      smsHeaderNearMiss: "\"{suffix}\" असली वेरिफ़ाइड हेडर \"{realHeader}\" से सिर्फ एक अक्षर अलग है — यह एक क्लासिक header-spoofing तरीका है।",
      unusualHostnameStructure: "असामान्य रूप से लंबी/हाइफ़न वाली hostname बनावट, जो अक्सर ऑटो-जनरेटेड फिशिंग सबडोमेन में दिखती है।",
      flaggedByGsb: "Google Safe Browsing ने इसे फ़्लैग किया: {types}।",
      abuseIpdbScore: "AbuseIPDB के अनुसार इस IP एड्रेस का abuse confidence score {score}% है ({reports} रिपोर्ट्स)।",
      urlNoKnownRisk: "इस URL में कोई संदिग्ध TLD, ब्रांड-नकल, या स्कैम कीवर्ड पैटर्न नहीं मिला, और यह लाइव phishunt.io थ्रेट फ़ीड में भी नहीं है।",
      phishuntListed: "लाइव phishunt.io थ्रेट फ़ीड में सूचीबद्ध (PhishTank/OpenPhish/Google Safe Browsing/urlscan.io को शामिल करता है) — पहली बार {date} को देखा गया।",
      phishuntListedBrand: "लाइव phishunt.io थ्रेट फ़ीड में सूचीबद्ध (PhishTank/OpenPhish/Google Safe Browsing/urlscan.io को शामिल करता है) — पहली बार {date} को देखा गया, \"{brand}\" की नकल करते हुए।",
      chatInviteLink: "यह एक ग्रुप/चैनल इनवाइट लिंक है — इनवाइट लिंक सामान्य कॉन्टैक्ट जांच को बायपास कर देते हैं, इसलिए जुड़ने से पहले ग्रुप का उद्देश्य स्वतंत्र रूप से जांच लें।",
      chatTaskScamPattern: "एक रिपोर्ट किए गए टास्क-स्कैम/निवेश-स्कैम पैटर्न से मेल खाता है: \"{keyword}\"।",
      chatOfficialSupportName: "एक सामान्य \"आधिकारिक सपोर्ट\"-जैसा नाम इस्तेमाल करता है (\"{word}\") — ग्रुप एडमिन नामों में कस्टम्स/पुलिस/बैंक अधिकारियों की नकल एक व्यापक रूप से रिपोर्ट किया गया पैटर्न है (Chakshu/Sanchar Saathi सलाह के अनुसार)।",
      chatNoKnownRisk: "इस टेक्स्ट में कोई ज्ञात स्कैम-भर्ती या नकल कीवर्ड पैटर्न नहीं मिला।",
      phoneCarrierInfo: "कैरियर: {carrier}, लोकेशन: {location}, लाइन प्रकार: {lineType}।",
      phoneVoipLine: "VoIP/टोल-फ़्री वर्चुअल लाइन के रूप में रजिस्टर्ड — अक्सर स्कैमर की असली पहचान और स्थान छुपाने के लिए इस्तेमाल होता है।",
      phoneLookupUnavailable: "अभी लाइव कैरियर लुकअप उपलब्ध नहीं है — सिर्फ लोकल पैटर्न विश्लेषण दिखाया जा रहा है।",
      phoneRepeatingDigits: "नंबर एक संदिग्ध दोहराए जाने वाले अंकों की श्रृंखला है, जो असली निजी या व्यावसायिक लाइनों में असामान्य है।",
      phoneTelemarketingPrefix: "यह प्रीफ़िक्स पैटर्न आमतौर पर ऑटोमेटेड टेलीमार्केटिंग/बल्क-डायलर सीरीज़ से जुड़ा होता है।",
      phoneNoKnownRiskNoLookup: "लोकल विश्लेषण से इस नंबर के लिए कोई ज्ञात उच्च-जोखिम पैटर्न नहीं मिला। लाइव कैरियर लुकअप नहीं चलाया गया (कोई API key कॉन्फ़िगर नहीं) — यह नंबर के सुरक्षित होने की पुष्टि नहीं करता।",
      emailDisposableProvider: "एक डिस्पोज़ेबल/अस्थायी ईमेल प्रोवाइडर इस्तेमाल करता है — असली व्यवसाय ऐसे इस्तेमाल-और-फेंक पते इस्तेमाल नहीं करते।",
      emailSpoofedSupportOnFreemail: "लोकल भाग (\"{localPart}\") एक आधिकारिक सपोर्ट पते जैसा दिखता है लेकिन यह एक फ्री पब्लिक मेल प्रोवाइडर ({domain}) पर होस्ट है — कोई असली बैंक/कूरियर/टैक्स प्राधिकरण आधिकारिक सपोर्ट के लिए Gmail/Yahoo इस्तेमाल नहीं करता।",
      emailFreemailCaution: "एक फ्री पब्लिक मेल प्रोवाइडर ({domain}) पर होस्ट है — यह अपने आप में असुरक्षित नहीं, लेकिन अगर यह खुद को \"आधिकारिक\" पता बताए तो सावधान रहें।",
      emailNoKnownRisk: "कोई ज्ञात डिस्पोज़ेबल-डोमेन या सपोर्ट-नकल पैटर्न नहीं मिला।",
      smsHeaderWrongLength: "हेडर सफ़िक्स \"{suffix}\" {len} अक्षरों का है — असली TRAI-रजिस्टर्ड बैंक हेडर ठीक 6 अक्षरों के होते हैं। गलत लंबाई एक स्पूफ़िंग संकेत है।",
      smsHeaderUnverified: "\"{suffix}\" किसी बैंक हेडर की नकल जैसा लगता है लेकिन यह जाने-पहचाने वेरिफ़ाइड लिस्ट में नहीं है — इससे आने वाले किसी भी \"तुरंत अकाउंट एक्शन\" SMS को शक की नज़र से देखें।",
      smsHeaderVerified: "\"{suffix}\" एक जाने-पहचाने वेरिफ़ाइड बैंक SMS हेडर पैटर्न से मेल खाता है।",
      smsPersonalNumberWarning: "यह एक सादा 10-अंकों वाला निजी मोबाइल नंबर है, कोई रजिस्टर्ड अल्फ़ान्यूमेरिक हेडर नहीं। अगर मैसेज खुद को ऑटोमेटेड बैंक अलर्ट, बिजली कटने का नोटिस, या ऐसी किसी आधिकारिक सूचना जैसा बताए, तो यह एक मज़बूत SMS-स्पूफ़िंग संकेत है — असली ऑटोमेटेड अलर्ट हमेशा रजिस्टर्ड अल्फ़ान्यूमेरिक हेडर से आते हैं, कभी निजी मोबाइल नंबर से नहीं।",
      smsUnparseable: "इसे मानक TRAI हेडर (XX-XXXXXX) या 10-अंकों वाले नंबर के रूप में समझा नहीं जा सका — फ़ॉर्मेट दोबारा जांचें।",
      smsNoKnownRisk: "कोई स्पूफ़िंग पैटर्न नहीं मिला।",
      socialScamKeyword: "एक रिपोर्ट किए गए स्कैम-पैटर्न कीवर्ड से मेल खाता है: \"{keyword}\"।",
      socialGiveawayPattern: "फर्ज़ी-गिवअवे/क्रिप्टो-डबलिंग या सेलिब्रिटी-नकल प्रोफ़ाइल में आम एक पैटर्न मिला: \"{keyword}\"।",
      socialManyDigitsHandle: "हैंडल \"{handle}\" में असामान्य रूप से ज़्यादा अंक हैं — यह अक्सर बड़ी संख्या में बनाए गए क्लोन/बॉट अकाउंट में दिखता है जो असली प्रोफ़ाइल की नकल करते हैं।",
      socialNoKnownRisk: "इस लिंक में कोई ज्ञात क्लोन-अकाउंट या फर्ज़ी-गिवअवे पैटर्न नहीं मिला।",
      errInvalidUrl: "यह एक मान्य URL नहीं लगता",
      errDoubleCheckLink: "लिंक दोबारा जांचें और फिर कोशिश करें।",
      errInvalidPhone: "यह पूरा फ़ोन नंबर नहीं लगता",
      errInvalidEmail: "यह मान्य ईमेल पता नहीं लगता",

      verdictTitleSafe: "इस {subjectType} के लिए कोई ज्ञात जोखिम पैटर्न नहीं मिला",
      verdictTitleDanger: "उच्च-जोखिम वाला {subjectType} — संभावित धोखाधड़ी मानें",
      verdictTitleWarn: "संदिग्ध {subjectType} — सावधानी से आगे बढ़ें",
      verdictTitleInfo: "इस {subjectType} के लिए मामूली सावधानी वाले संकेत मिले",
      subjectTypeUrl: "URL",
      subjectTypeChatHandle: "चैट हैंडल/लिंक",
      subjectTypePhone: "फ़ोन नंबर",
      subjectTypeEmail: "ईमेल पता",
      subjectTypeSms: "SMS हेडर",
      subjectTypeSocial: "सोशल प्रोफ़ाइल",
      errPleaseEnterSomething: "कृपया जांचने के लिए कुछ दर्ज करें",
      titleCommunityReported: "अन्य QRaksha उपयोगकर्ताओं द्वारा पहले ही स्कैम के रूप में रिपोर्ट किया गया",
      errUnknownCategory: "अज्ञात श्रेणी",
      errCheckFailed: "स्वचालित जांच पूरी नहीं हो सकी",
      communityFlaggedWithNote: "इस बिल्कुल एक जैसे {category} को community द्वारा फ़्लैग किया गया: \"{note}\"।",
      communityFlaggedNoNote: "इस बिल्कुल एक जैसे {category} को community द्वारा फ़्लैग किया गया।",
      communityUnverifiedNotice: "Community reports असत्यापित crowd-sourced संकेत हैं — भरोसा करने से पहले स्वतंत्र रूप से पुष्टि ज़रूर करें।",
      checkFailedDetail: "यह जांच local रूप से चलाने में कुछ गड़बड़ हुई। भरोसा करने से पहले कृपया आधिकारिक माध्यमों से खुद जांच लें।",
      scamWarningKycFraud: "कोई भी बैंक या टेलीकॉम कंपनी कभी कॉल, SMS लिंक या DM पर KYC अपडेट, OTP या पासवर्ड नहीं मांगती।",
      scamWarningDigitalArrest: "'डिजिटल अरेस्ट' भारत में कोई वास्तविक कानूनी प्रक्रिया नहीं है। कोई भी पुलिस, अदालत या एजेंसी वीडियो कॉल पर बंधक नहीं बनाती।",
      scamWarningJobFraud: "असली कंपनियां नौकरी देने के लिए कभी पंजीकरण, प्रशिक्षण या जमा शुल्क नहीं मांगतीं।",
      scamWarningUpiFraud: "पैसे प्राप्त करने के लिए कभी भी UPI पिन दर्ज करने की जरूरत नहीं होती — पिन केवल भेजने के लिए है।",
      scamWarningCourierScam: "कस्टम या कूरियर कंपनियां पार्सल छुड़ाने के लिए कभी निजी बैंक खाते या UPI पर शुल्क नहीं मांगतीं।",
      scamWarningLotteryPrize: "बिना भाग लिए कोई लॉटरी नहीं जीती जा सकती। इनाम पाने के लिए कभी 'टैक्स' या 'प्रोसेसिंग फीस' न दें।",
      scamWarningBankImpersonation: "बैंक कर्मचारी या सुरक्षा टीम कभी कॉल, SMS या सोशल मीडिया पर OTP, पासवर्ड या CVV बताने को नहीं कहती।",
      scamWarningGovSchemeFraud: "सरकारी योजनाओं का लाभ मुफ्त होता है। पंजीकरण शुल्क मांगने वाली साइट या कॉल नकली है — असली साइट gov.in पर खत्म होती है।",
      scamWarningAadhaarFraud: "आधार नंबर के साथ कभी OTP साझा न करें — इस संयोजन से कोई और आपके नाम पर सत्यापित हो सकता है।",
      scamWarningPhishingGeneric: "लॉगिन विवरण डालने से पहले वेब पता ध्यान से जांचें — नकली साइटें असली डोमेन की जगह मिलती-जुलती स्पेलिंग या IP पते का उपयोग करती हैं।",
      scamWarningInvestmentFraud: "कोई भी असली, SEBI-पंजीकृत सलाहकार कभी निश्चित दैनिक या साप्ताहिक मुनाफे की गारंटी नहीं देता — यह वादा ही धोखाधड़ी का प्रमाण है।",
      scamWarningCelebrityImpersonation: "सेलिब्रिटी और बिजनेस लीडर सोशल मीडिया DM पर व्यक्तिगत निवेश समूह या क्रिप्टो स्कीम नहीं चलाते।",
      scamWarningSextortion: "अनजान प्रोफाइल से वीडियो कॉल स्वीकार न करें। धमकी मिलने पर पैसे न दें — सब कुछ स्क्रीनशॉट लें और तुरंत cybercrime.gov.in पर रिपोर्ट करें।",
    },

    /* ------------------------------------------------------------------ */
    Bengali: {
      home: "হোম", scan: "স্ক্যান", generate: "তৈরি করুন",
      complain: "স্ক্যাম শিল্ড", scamShield: "স্ক্যাম শিল্ড", settings: "সেটিংস",

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
      scamWarningKycFraud: "কোনো ব্যাংক বা টেলিকম কোম্পানি কখনো কল, SMS লিঙ্ক বা DM-এ KYC আপডেট, OTP বা পাসওয়ার্ড চায় না।",
      scamWarningDigitalArrest: "'ডিজিটাল অ্যারেস্ট' ভারতে কোনো বাস্তব আইনি প্রক্রিয়া নয়। কোনো পুলিশ বা আদালত ভিডিও কলে কাউকে আটকে রাখে না।",
      scamWarningJobFraud: "প্রকৃত কোম্পানিগুলো চাকরি দেওয়ার জন্য কখনো নিবন্ধন, প্রশিক্ষণ বা জমার ফি চায় না।",
      scamWarningUpiFraud: "টাকা পেতে কখনো UPI পিন দিতে হয় না — পিন শুধু টাকা পাঠানোর জন্য।",
      scamWarningCourierScam: "কাস্টমস বা কুরিয়ার কোম্পানি পার্সেল ছাড়ার জন্য ব্যক্তিগত ব্যাংক অ্যাকাউন্ট বা UPI-তে ফি চায় না।",
      scamWarningLotteryPrize: "অংশগ্রহণ না করে কোনো লটারি জেতা যায় না। পুরস্কার পেতে কখনো 'ট্যাক্স' বা ফি দেবেন না।",
      scamWarningBankImpersonation: "ব্যাংক কর্মী বা নিরাপত্তা দল কখনো কল, SMS বা সোশ্যাল মিডিয়ায় OTP, পাসওয়ার্ড বা CVV বলতে বলে না।",
      scamWarningGovSchemeFraud: "সরকারি প্রকল্পের সুবিধা বিনামূল্যে। নিবন্ধন ফি চাওয়া সাইট বা কল ভুয়া — আসল সাইট gov.in-তে শেষ হয়।",
      scamWarningAadhaarFraud: "আধার নম্বরের সাথে কখনো OTP শেয়ার করবেন না — এই সংমিশ্রণে অন্য কেউ আপনার নামে যাচাই করতে পারে।",
      scamWarningPhishingGeneric: "লগইন তথ্য দেওয়ার আগে ওয়েব ঠিকানা ভালো করে দেখুন — ভুয়া সাইট আসল ডোমেইনের বদলে একই রকম বানান বা IP ব্যবহার করে।",
      scamWarningInvestmentFraud: "কোনো বৈধ, SEBI-নিবন্ধিত পরামর্শদাতা কখনো নির্দিষ্ট দৈনিক বা সাপ্তাহিক লাভের নিশ্চয়তা দেয় না — এই প্রতিশ্রুতিই প্রতারণার প্রমাণ।",
      scamWarningCelebrityImpersonation: "সেলিব্রিটি বা ব্যবসায়িক নেতারা সোশ্যাল মিডিয়া DM-এ ব্যক্তিগত বিনিয়োগ গ্রুপ বা ক্রিপ্টো স্কিম চালান না।",
      scamWarningSextortion: "অপরিচিত প্রোফাইল থেকে ভিডিও কল গ্রহণ করবেন না। হুমকি পেলে টাকা দেবেন না — সব স্ক্রিনশট নিন এবং cybercrime.gov.in-এ রিপোর্ট করুন।",
    },

    /* ------------------------------------------------------------------ */
    Telugu: {
      home: "హోమ్", scan: "స్కాన్", generate: "జనరేట్",
      complain: "స్కామ్ షీల్డ్", scamShield: "స్కామ్ షీల్డ్", settings: "సెట్టింగులు",

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
      scamWarningKycFraud: "బ్యాంకు లేదా టెలికాం సంస్థ కాల్, SMS లింక్ లేదా DM ద్వారా KYC అప్‌డేట్, OTP లేదా పాస్‌వర్డ్ ఎప్పుడూ అడగదు.",
      scamWarningDigitalArrest: "'డిజిటల్ అరెస్ట్' అనేది భారతదేశంలో నిజమైన చట్టపరమైన ప్రక్రియ కాదు. పోలీసులు వీడియో కాల్‌లో ఎవరినీ నిర్బంధించరు.",
      scamWarningJobFraud: "నిజమైన కంపెనీలు ఉద్యోగం ఇవ్వడానికి రిజిస్ట్రేషన్, శిక్షణ లేదా డిపాజిట్ ఫీజు అడగవు.",
      scamWarningUpiFraud: "డబ్బు స్వీకరించడానికి UPI పిన్ నమోదు చేయాల్సిన అవసరం లేదు — పిన్ పంపడానికి మాత్రమే.",
      scamWarningCourierScam: "కస్టమ్స్ లేదా కొరియర్ కంపెనీలు పార్శిల్ విడుదల చేయడానికి వ్యక్తిగత ఖాతాకు రుసుము అడగవు.",
      scamWarningLotteryPrize: "పాల్గొనకుండా లాటరీ గెలవడం సాధ్యం కాదు. బహుమతి కోసం 'పన్ను' లేదా రుసుము చెల్లించవద్దు.",
      scamWarningBankImpersonation: "బ్యాంకు సిబ్బంది కాల్, SMS లేదా సోషల్ మీడియాలో OTP, పాస్‌వర్డ్ లేదా CVV చెప్పమని అడగరు.",
      scamWarningGovSchemeFraud: "ప్రభుత్వ పథకాల ప్రయోజనాలు ఉచితం. రిజిస్ట్రేషన్ ఫీజు అడిగే సైట్ లేదా కాల్ నకిలీది — నిజమైన సైట్ gov.in తో ముగుస్తుంది.",
      scamWarningAadhaarFraud: "ఆధార్ నంబర్‌తో పాటు OTP ఎప్పుడూ పంచుకోవద్దు — ఈ కలయిక మరొకరిని మీ పేరుతో ధృవీకరించనిస్తుంది.",
      scamWarningPhishingGeneric: "లాగిన్ వివరాలు నమోదు చేయడానికి ముందు వెబ్ చిరునామాను జాగ్రత్తగా తనిఖీ చేయండి — నకిలీ సైట్‌లు నిజమైన డొమైన్‌కు బదులుగా పోలిన స్పెల్లింగ్ లేదా IP అడ్రస్ ఉపయోగిస్తాయి.",
      scamWarningInvestmentFraud: "నిజమైన, SEBI-నమోదిత సలహాదారు రోజువారీ లేదా వారపు లాభాలకు హామీ ఇవ్వరు — ఆ వాగ్దానమే మోసానికి రుజువు.",
      scamWarningCelebrityImpersonation: "సెలబ్రిటీలు లేదా వ్యాపార నాయకులు సోషల్ మీడియా DM లో వ్యక్తిగత పెట్టుబడి గ్రూప్‌లు లేదా క్రిప్టో పథకాలు నడపరు.",
      scamWarningSextortion: "తెలియని ప్రొఫైల్‌ల నుండి వీడియో కాల్‌లను అంగీకరించవద్దు. బెదిరింపు వస్తే డబ్బు చెల్లించవద్దు — స్క్రీన్‌షాట్ తీసుకుని వెంటనే cybercrime.gov.in లో రిపోర్ట్ చేయండి.",
    },

    /* ------------------------------------------------------------------ */
    Marathi: {
      home: "होम", scan: "स्कॅन", generate: "तयार करा",
      complain: "स्कॅम शील्ड", scamShield: "स्कॅम शील्ड", settings: "सेटिंग्ज",

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
      scamWarningKycFraud: "कोणतीही बँक किंवा टेलिकॉम कंपनी कधीही कॉल, SMS लिंक किंवा DM वर KYC अपडेट, OTP किंवा पासवर्ड मागत नाही.",
      scamWarningDigitalArrest: "'डिजिटल अटक' ही भारतात खरी कायदेशीर प्रक्रिया नाही. कोणतेही पोलीस किंवा न्यायालय व्हिडिओ कॉलवर कोणालाही अटक करत नाही.",
      scamWarningJobFraud: "खऱ्या कंपन्या नोकरी देण्यासाठी कधीही नोंदणी, प्रशिक्षण किंवा ठेव शुल्क मागत नाहीत.",
      scamWarningUpiFraud: "पैसे मिळवण्यासाठी UPI पिन टाकण्याची कधीही गरज नसते — पिन फक्त पाठवण्यासाठी असतो.",
      scamWarningCourierScam: "कस्टम्स किंवा कुरियर कंपन्या पार्सल सोडण्यासाठी वैयक्तिक बँक खात्यात शुल्क मागत नाहीत.",
      scamWarningLotteryPrize: "सहभाग न घेता लॉटरी जिंकता येत नाही. बक्षीस मिळवण्यासाठी 'कर' किंवा शुल्क कधीही देऊ नका.",
      scamWarningBankImpersonation: "बँक कर्मचारी कधीही कॉल, SMS किंवा सोशल मीडियावर OTP, पासवर्ड किंवा CVV सांगायला सांगत नाहीत.",
      scamWarningGovSchemeFraud: "सरकारी योजनांचे लाभ मोफत असतात. नोंदणी शुल्क मागणारी साइट किंवा कॉल बनावट आहे — खरी साइट gov.in ने संपते.",
      scamWarningAadhaarFraud: "आधार क्रमांकासोबत कधीही OTP शेअर करू नका — या संयोजनामुळे कोणीही तुमच्या नावाने पडताळणी करू शकतो.",
      scamWarningPhishingGeneric: "लॉगिन तपशील टाकण्यापूर्वी वेब पत्ता काळजीपूर्वक तपासा — बनावट साइट खऱ्या डोमेनऐवजी सारखी स्पेलिंग किंवा IP पत्ता वापरतात.",
      scamWarningInvestmentFraud: "कोणताही खरा, SEBI-नोंदणीकृत सल्लागार निश्चित दैनंदिन किंवा साप्ताहिक नफ्याची हमी देत नाही — हे आश्वासनच फसवणुकीचा पुरावा आहे.",
      scamWarningCelebrityImpersonation: "सेलिब्रिटी किंवा व्यावसायिक नेते सोशल मीडिया DM वर वैयक्तिक गुंतवणूक गट किंवा क्रिप्टो योजना चालवत नाहीत.",
      scamWarningSextortion: "अनोळखी प्रोफाइलवरून व्हिडिओ कॉल स्वीकारू नका. धमकी आल्यास पैसे देऊ नका — सर्व स्क्रीनशॉट घ्या आणि लगेच cybercrime.gov.in वर तक्रार करा.",
    },

    /* ------------------------------------------------------------------ */
    Tamil: {
      home: "முகப்பு", scan: "ஸ்கேன்", generate: "உருவாக்கு",
      complain: "ஸ்கேம் ஷீல்ட்", scamShield: "ஸ்கேம் ஷீல்ட்", settings: "அமைப்புகள்",

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
      scamWarningKycFraud: "எந்த வங்கியும் தொலைத்தொடர்பு நிறுவனமும் அழைப்பு, SMS இணைப்பு அல்லது DM மூலம் KYC புதுப்பிப்பு, OTP அல்லது கடவுச்சொல்லைக் கேட்காது.",
      scamWarningDigitalArrest: "'டிஜிட்டல் கைது' இந்தியாவில் உண்மையான சட்ட செயல்முறை அல்ல. போலீஸ் வீடியோ அழைப்பில் யாரையும் தடுத்து வைக்காது.",
      scamWarningJobFraud: "உண்மையான நிறுவனங்கள் வேலை கொடுக்க பதிவு, பயிற்சி அல்லது வைப்புத் தொகையைக் கேட்காது.",
      scamWarningUpiFraud: "பணம் பெற UPI பின்னை உள்ளிட வேண்டிய அவசியமில்லை — பின் அனுப்புவதற்கு மட்டுமே.",
      scamWarningCourierScam: "சுங்கம் அல்லது கூரியர் நிறுவனங்கள் பார்சலை விடுவிக்க தனிப்பட்ட வங்கிக் கணக்கில் கட்டணம் கேட்காது.",
      scamWarningLotteryPrize: "பங்கேற்காமல் லாட்டரி வெல்ல முடியாது. பரிசுக்காக 'வரி' அல்லது கட்டணம் செலுத்த வேண்டாம்.",
      scamWarningBankImpersonation: "வங்கி ஊழியர்கள் அழைப்பு, SMS அல்லது சமூக ஊடகத்தில் OTP, கடவுச்சொல் அல்லது CVV கேட்க மாட்டார்கள்.",
      scamWarningGovSchemeFraud: "அரசு திட்ட நன்மைகள் இலவசம். பதிவு கட்டணம் கேட்கும் தளம் அல்லது அழைப்பு போலியானது — உண்மையான தளம் gov.in இல் முடிவடையும்.",
      scamWarningAadhaarFraud: "ஆதார் எண்ணுடன் OTP ஐ ஒருபோதும் பகிர வேண்டாம் — இந்த சேர்க்கை மற்றவரை உங்கள் பெயரில் அங்கீகரிக்க அனுமதிக்கும்.",
      scamWarningPhishingGeneric: "உள்நுழைவு விவரங்களை உள்ளிடும் முன் இணைய முகவரியை கவனமாக சரிபார்க்கவும் — போலி தளங்கள் உண்மையான டொமைனுக்குப் பதிலாக ஒத்த எழுத்துப் பிழை அல்லது IP முகவரியைப் பயன்படுத்தும்.",
      scamWarningInvestmentFraud: "உண்மையான, SEBI-பதிவு செய்யப்பட்ட ஆலோசகர் தினசரி அல்லது வாராந்திர லாபத்திற்கு உத்தரவாதம் அளிக்க மாட்டார் — அந்த வாக்குறுதியே மோசடிக்கு சான்று.",
      scamWarningCelebrityImpersonation: "பிரபலங்கள் அல்லது வணிகத் தலைவர்கள் சமூக ஊடக DM இல் தனிப்பட்ட முதலீட்டு குழுக்கள் அல்லது கிரிப்டோ திட்டங்களை நடத்த மாட்டார்கள்.",
      scamWarningSextortion: "அறியப்படாத சுயவிவரங்களிலிருந்து வீடியோ அழைப்புகளை ஏற்க வேண்டாம். மிரட்டப்பட்டால் பணம் கொடுக்க வேண்டாம் — திரைப்பிடிப்பு எடுத்து உடனே cybercrime.gov.in இல் புகார் அளிக்கவும்.",
    },

    /* ------------------------------------------------------------------ */
    Urdu: {
      home: "ہوم", scan: "اسکین", generate: "بنائیں",
      complain: "اسکیم شیلڈ", scamShield: "اسکیم شیلڈ", settings: "ترتیبات",

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
      scamWarningKycFraud: "کوئی بھی بینک یا ٹیلی کام کمپنی کبھی کال، SMS لنک یا DM پر KYC اپڈیٹ، OTP یا پاسورڈ نہیں مانگتی۔",
      scamWarningDigitalArrest: "'ڈیجیٹل گرفتاری' بھارت میں کوئی حقیقی قانونی عمل نہیں ہے۔ کوئی پولیس یا عدالت ویڈیو کال پر کسی کو گرفتار نہیں کرتی۔",
      scamWarningJobFraud: "اصلی کمپنیاں نوکری دینے کے لیے کبھی رجسٹریشن، تربیت یا ڈپازٹ فیس نہیں مانگتیں۔",
      scamWarningUpiFraud: "پیسے وصول کرنے کے لیے کبھی UPI پن درج کرنے کی ضرورت نہیں — پن صرف بھیجنے کے لیے ہے۔",
      scamWarningCourierScam: "کسٹمز یا کورئیر کمپنیاں پارسل چھڑانے کے لیے ذاتی بینک اکاؤنٹ میں فیس نہیں مانگتیں۔",
      scamWarningLotteryPrize: "بغیر شرکت کیے کوئی لاٹری نہیں جیتی جا سکتی۔ انعام کے لیے کبھی 'ٹیکس' یا فیس نہ دیں۔",
      scamWarningBankImpersonation: "بینک عملہ کبھی کال، SMS یا سوشل میڈیا پر OTP، پاسورڈ یا CVV بتانے کو نہیں کہتا۔",
      scamWarningGovSchemeFraud: "سرکاری اسکیم کے فوائد مفت ہیں۔ رجسٹریشن فیس مانگنے والی سائٹ یا کال جعلی ہے — اصلی سائٹ gov.in پر ختم ہوتی ہے۔",
      scamWarningAadhaarFraud: "آدھار نمبر کے ساتھ کبھی OTP شیئر نہ کریں — یہ مجموعہ کسی اور کو آپ کے نام پر تصدیق کرنے دیتا ہے۔",
      scamWarningPhishingGeneric: "لاگ ان کی تفصیلات درج کرنے سے پہلے ویب ایڈریس کو غور سے چیک کریں — جعلی سائٹس اصلی ڈومین کی بجائے ملتی جلتی ہجے یا IP ایڈریس استعمال کرتی ہیں۔",
      scamWarningInvestmentFraud: "کوئی حقیقی، SEBI-رجسٹرڈ مشیر کبھی روزانہ یا ہفتہ وار منافع کی ضمانت نہیں دیتا — یہ وعدہ ہی دھوکہ دہی کا ثبوت ہے۔",
      scamWarningCelebrityImpersonation: "مشہور شخصیات یا کاروباری رہنما سوشل میڈیا DM پر ذاتی سرمایہ کاری گروپ یا کرپٹو اسکیمیں نہیں چلاتے۔",
      scamWarningSextortion: "نامعلوم پروفائلز سے ویڈیو کالز قبول نہ کریں۔ دھمکی ملنے پر پیسے نہ دیں — سب کچھ اسکرین شاٹ لیں اور فوری طور پر cybercrime.gov.in پر رپورٹ کریں۔",
    },

    /* ------------------------------------------------------------------ */
    Gujarati: {
      home: "હોમ", scan: "સ્કેન", generate: "જનરેટ કરો",
      complain: "સ્કેમ શીલ્ડ", scamShield: "સ્કેમ શીલ્ડ", settings: "સેટિંગ્સ",

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
      scamWarningKycFraud: "કોઈ પણ બેંક કે ટેલિકોમ કંપની ક્યારેય કૉલ, SMS લિંક કે DM પર KYC અપડેટ, OTP અથવા પાસવર્ડ માંગતી નથી.",
      scamWarningDigitalArrest: "'ડિજિટલ ધરપકડ' ભારતમાં કોઈ વાસ્તવિક કાનૂની પ્રક્રિયા નથી. કોઈ પોલીસ કે કોર્ટ વિડિયો કૉલ પર કોઈને પકડી રાખતી નથી.",
      scamWarningJobFraud: "સાચી કંપનીઓ નોકરી આપવા માટે ક્યારેય નોંધણી, તાલીમ કે ડિપોઝિટ ફી માંગતી નથી.",
      scamWarningUpiFraud: "પૈસા મેળવવા માટે ક્યારેય UPI પિન દાખલ કરવાની જરૂર નથી — પિન ફક્ત મોકલવા માટે છે.",
      scamWarningCourierScam: "કસ્ટમ્સ કે કુરિયર કંપનીઓ પાર્સલ છોડવા માટે વ્યક્તિગત બેંક ખાતામાં ફી માંગતી નથી.",
      scamWarningLotteryPrize: "ભાગ લીધા વગર કોઈ લોટરી જીતી શકાતી નથી. ઇનામ માટે ક્યારેય 'ટેક્સ' કે ફી ચૂકવશો નહીં.",
      scamWarningBankImpersonation: "બેંક સ્ટાફ ક્યારેય કૉલ, SMS કે સોશિયલ મીડિયા પર OTP, પાસવર્ડ કે CVV કહેવાનું કહેતા નથી.",
      scamWarningGovSchemeFraud: "સરકારી યોજનાના લાભો મફત છે. નોંધણી ફી માંગતી સાઇટ કે કૉલ નકલી છે — સાચી સાઇટ gov.in પર પૂરી થાય છે.",
      scamWarningAadhaarFraud: "આધાર નંબર સાથે ક્યારેય OTP શેર ન કરો — આ સંયોજન બીજા કોઈને તમારા નામે ચકાસણી કરવા દે છે.",
      scamWarningPhishingGeneric: "લોગિન વિગતો દાખલ કરતા પહેલા વેબ સરનામું કાળજીપૂર્વક તપાસો — નકલી સાઇટ્સ સાચા ડોમેનને બદલે મળતી જોડણી અથવા IP સરનામાનો ઉપયોગ કરે છે.",
      scamWarningInvestmentFraud: "કોઈ પણ સાચો, SEBI-નોંધાયેલ સલાહકાર ક્યારેય નિશ્ચિત દૈનિક કે સાપ્તાહિક નફાની ખાતરી આપતો નથી — આ વચન જ છેતરપિંડીનો પુરાવો છે.",
      scamWarningCelebrityImpersonation: "સેલિબ્રિટીઓ કે બિઝનેસ લીડરો સોશિયલ મીડિયા DM પર વ્યક્તિગત રોકાણ જૂથો કે ક્રિપ્ટો યોજનાઓ ચલાવતા નથી.",
      scamWarningSextortion: "અજાણ્યા પ્રોફાઇલમાંથી વિડિયો કૉલ સ્વીકારશો નહીં. ધમકી મળે તો પૈસા ન આપો — બધું સ્ક્રીનશોટ લો અને તરત જ cybercrime.gov.in પર ફરિયાદ કરો.",
    },

    /* ------------------------------------------------------------------ */
    Kannada: {
      home: "ಮುಖಪುಟ", scan: "ಸ್ಕ್ಯಾನ್", generate: "ರಚಿಸಿ",
      complain: "ಸ್ಕ್ಯಾಮ್ ಶೀಲ್ಡ್", scamShield: "ಸ್ಕ್ಯಾಮ್ ಶೀಲ್ಡ್", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",

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
      scamWarningKycFraud: "ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಅಥವಾ ಟೆಲಿಕಾಂ ಕಂಪನಿ ಕರೆ, SMS ಲಿಂಕ್ ಅಥವಾ DM ಮೂಲಕ KYC ಅಪ್‌ಡೇಟ್, OTP ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಕೇಳುವುದಿಲ್ಲ.",
      scamWarningDigitalArrest: "'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' ಭಾರತದಲ್ಲಿ ನಿಜವಾದ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆ ಅಲ್ಲ. ಯಾವುದೇ ಪೊಲೀಸ್ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಯಾರನ್ನೂ ಬಂಧಿಸುವುದಿಲ್ಲ.",
      scamWarningJobFraud: "ನಿಜವಾದ ಕಂಪನಿಗಳು ಉದ್ಯೋಗ ನೀಡಲು ನೋಂದಣಿ, ತರಬೇತಿ ಅಥವಾ ಠೇವಣಿ ಶುಲ್ಕ ಕೇಳುವುದಿಲ್ಲ.",
      scamWarningUpiFraud: "ಹಣ ಪಡೆಯಲು UPI ಪಿನ್ ನಮೂದಿಸುವ ಅಗತ್ಯವಿಲ್ಲ — ಪಿನ್ ಕಳುಹಿಸಲು ಮಾತ್ರ.",
      scamWarningCourierScam: "ಕಸ್ಟಮ್ಸ್ ಅಥವಾ ಕೊರಿಯರ್ ಕಂಪನಿಗಳು ಪಾರ್ಸೆಲ್ ಬಿಡುಗಡೆಗೆ ವೈಯಕ್ತಿಕ ಖಾತೆಗೆ ಶುಲ್ಕ ಕೇಳುವುದಿಲ್ಲ.",
      scamWarningLotteryPrize: "ಭಾಗವಹಿಸದೆ ಲಾಟರಿ ಗೆಲ್ಲಲು ಸಾಧ್ಯವಿಲ್ಲ. ಬಹುಮಾನಕ್ಕಾಗಿ 'ತೆರಿಗೆ' ಅಥವಾ ಶುಲ್ಕ ಪಾವತಿಸಬೇಡಿ.",
      scamWarningBankImpersonation: "ಬ್ಯಾಂಕ್ ಸಿಬ್ಬಂದಿ ಕರೆ, SMS ಅಥವಾ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮದಲ್ಲಿ OTP, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ CVV ಹೇಳಲು ಕೇಳುವುದಿಲ್ಲ.",
      scamWarningGovSchemeFraud: "ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಪ್ರಯೋಜನಗಳು ಉಚಿತ. ನೋಂದಣಿ ಶುಲ್ಕ ಕೇಳುವ ಸೈಟ್ ಅಥವಾ ಕರೆ ನಕಲಿ — ನಿಜವಾದ ಸೈಟ್ gov.in ನಲ್ಲಿ ಕೊನೆಗೊಳ್ಳುತ್ತದೆ.",
      scamWarningAadhaarFraud: "ಆಧಾರ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ OTP ಅನ್ನು ಎಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ — ಈ ಸಂಯೋಜನೆ ಬೇರೊಬ್ಬರಿಗೆ ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ದೃಢೀಕರಿಸಲು ಅನುಮತಿಸುತ್ತದೆ.",
      scamWarningPhishingGeneric: "ಲಾಗಿನ್ ವಿವರಗಳನ್ನು ನಮೂದಿಸುವ ಮೊದಲು ವೆಬ್ ವಿಳಾಸವನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಶೀಲಿಸಿ — ನಕಲಿ ಸೈಟ್‌ಗಳು ನಿಜವಾದ ಡೊಮೇನ್‌ ಬದಲಿಗೆ ಹೋಲುವ ಕಾಗುಣಿತ ಅಥವಾ IP ವಿಳಾಸ ಬಳಸುತ್ತವೆ.",
      scamWarningInvestmentFraud: "ಯಾವುದೇ ನಿಜವಾದ, SEBI-ನೋಂದಾಯಿತ ಸಲಹೆಗಾರರು ದೈನಂದಿನ ಅಥವಾ ವಾರದ ಲಾಭಕ್ಕೆ ಖಾತರಿ ನೀಡುವುದಿಲ್ಲ — ಆ ಭರವಸೆಯೇ ವಂಚನೆಗೆ ಪುರಾವೆ.",
      scamWarningCelebrityImpersonation: "ಸೆಲೆಬ್ರಿಟಿಗಳು ಅಥವಾ ವ್ಯಾಪಾರ ನಾಯಕರು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ DM ನಲ್ಲಿ ವೈಯಕ್ತಿಕ ಹೂಡಿಕೆ ಗುಂಪುಗಳು ಅಥವಾ ಕ್ರಿಪ್ಟೋ ಯೋಜನೆಗಳನ್ನು ನಡೆಸುವುದಿಲ್ಲ.",
      scamWarningSextortion: "ಅಪರಿಚಿತ ಪ್ರೊಫೈಲ್‌ಗಳಿಂದ ವೀಡಿಯೊ ಕರೆಗಳನ್ನು ಸ್ವೀಕರಿಸಬೇಡಿ. ಬೆದರಿಕೆ ಬಂದರೆ ಹಣ ಪಾವತಿಸಬೇಡಿ — ಎಲ್ಲವನ್ನೂ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ತೆಗೆದು ತಕ್ಷಣ cybercrime.gov.in ನಲ್ಲಿ ವರದಿ ಮಾಡಿ.",
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

  /**
   * t(key) behaves exactly as before — unchanged for every existing
   * caller. t(key, vars) additionally substitutes {placeholderName}
   * tokens in the translated string with values from vars, e.g.
   * t("brandImpersonation", {brand: "sbi"}) replaces "{brand}" in the
   * translated text. If a key or its vars are missing, this degrades
   * gracefully — never throws, never shows a raw "{token}" if it can
   * help it (falls back to English, then to the key name itself).
   */
  function t(key, vars) {
    const lang = getSaved();
    const dict = DICTIONARIES[lang] || DICTIONARIES.English;
    let text = dict[key] || DICTIONARIES.English[key] || key;
    if (vars && typeof text === "string") {
      Object.keys(vars).forEach((k) => {
        text = text.replace(new RegExp(`\\{${k}\\}`, "g"), vars[k]);
      });
    }
    return text;
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

  /**
   * Same as renderPicker() but targets any container id, and accepts
   * an optional onSelect callback — used by the first-visit onboarding
   * modal, kept separate from renderPicker() so the existing Settings
   * picker behavior is never touched/risked.
   */
  function renderPickerInto(containerId, onSelect) {
    const container = document.getElementById(containerId);
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
        renderPickerInto(containerId, onSelect);
        document.dispatchEvent(
          new CustomEvent("qrv:lang-changed", { detail: { lang } })
        );
        if (typeof onSelect === "function") onSelect(lang);
      });
      container.appendChild(btn);
    });
  }

  function hasSavedLanguage() {
    try { return localStorage.getItem("qrv-lang") !== null; }
    catch (e) { return true; } // if storage is inaccessible, don't force onboarding repeatedly
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

  return { init, t, applyToDom, renderPicker, renderPickerInto, hasSavedLanguage, currentLangForAi, LANGUAGES };
})();
