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
      govPartnershipNote: "We are actively working toward establishing direct structural integration and official partnerships with relevant government regulatory authorities to protect our users.",
      welcomeMessage: "Welcome to QRaksha",
      highPriority: "High Priority",
      appearanceTitle: "Appearance",
      themeDark: "Dark",
      themeLight: "Light",
      themeCustom: "Custom",
      aboutTransparencyTitle: "About & Transparency",
      aboutFounderLabel: "About the Founder",
      privacyPolicyTitle: "Privacy Policy",
      awarenessResourcesTitle: "Awareness & Resources",
      reportToPlatformTitle: "Report Directly to a Platform",
      reportToPlatformDesc: "Links go straight to each platform's own official report page — QRaksha does not process these reports itself.",
      consentTitle: "Enable AI Advance Opinion?",
      consentBody: "Offline and free threat-intel checks always run automatically. An AI Advance Opinion sends the text/image to our server, which forwards it to Mesh API. Nothing is stored afterward.",
      consentCheckboxLabel: "I understand and want to enable AI Advance Opinion",
      consentEnable: "Enable",
      consentNotNow: "Not now",
      privacyPoint1: "QR scanning and offline message checks run entirely in your browser — nothing is sent anywhere.",
      privacyPoint2: "The optional AI Advance Opinion sends only the text/image you explicitly submit to our server. It is not stored afterward.",
      privacyPoint3: "Success stories you explicitly submit are stored in our database. A human reviews each story before it is published.",
      privacyPoint4: "We do not sell user data. We do not show targeted ads.",
      generateTitle: "Generate",
      generateSubtitle: "Create a QR code for the things people actually scan.",
      genSocialProfile: "Social Media Profile",
      genMarketingCampaign: "Marketing Campaign",
      genAccountCard: "Account Card",
      genGoogleReview: "Google Review",
      genGoogleMaps: "Google Maps Location",
      genPlayStoreLink: "App / Play Store Link",
      genAdNote: "Downloading a generated QR image plays a short ad first — generating and previewing is always free.",
      storyCtaTitle: "Your Story, In Your Own Words — For Cyber Safety",
      storyCtaDesc: "If you avoided a scam or fraud using our app, share your story with us.",
      storyCtaButton: "Share Your Success Story",
      storyFormTitle: "Share Your Success Story",
      storyFormSubtitle: "Your story will help raise cyber awareness.",
      storyLabelName: "Full Name",
      storyLabelCity: "Location / City",
      storyLabelAmount: "Estimated Amount Saved (₹)",
      storyLabelFraudType: "Fraud Type",
      storyOptQr: "QR Code Scam",
      storyOptJob: "WhatsApp Job Fraud",
      storyOptCare: "Fake Customer Care",
      storyOptApp: "Suspicious App",
      storyOptOther: "Other",
      storyLabelDescription: "Your Story",
      storyAnonymousLabel: "Publish my story without my name (Anonymous).",
      storyConsentLabel: "I agree that my story may be published on public platforms to raise cyber awareness.",
      storySubmitButton: "Submit",
      storyCancelButton: "Cancel",
      transparencyTitle: "Revenue & Growth Roadmap (transparency)",
      transparencyBody: "QRaksha is free today. Roadmap may include non-intrusive AdMob placements, an optional premium tier (unlimited AI checks, ad-free), and B2B API licensing. Core safety features — offline QR check, Panic Mode, and basic scam detection — are intended to always remain free.",
      transparencyGovWork: "We are actively working toward establishing direct API integrations and formal partnerships with Government Law Enforcement Authorities.",
      catUrlLabel: "Website URL",
      catUrlDesc: "Scan phishing or fake links",
      catWhatsappLabel: "WhatsApp / Telegram",
      catWhatsappDesc: "Check a chat handle sending scams",
      catPhoneLabel: "Phone Number",
      catPhoneDesc: "Check a suspicious call/SMS source",
      catEmailLabel: "Email Id",
      catEmailDesc: "Check mail headers / spam senders",
      catSmsLabel: "SMS Header / Number",
      catSmsDesc: "Check financial/courier spoof messages",
      catSocialLabel: "Social Media URL",
      catSocialDesc: "Screen profile cloning or fake giveaways",
      catComingSoon: "Coming soon — routes to official report portal",
      voiceFounderButtonHint: "This is the About the Founder button. It tells you about the person who built QRaksha.",
      voiceFounderPageIntro: "This page tells you about our founder, Imtiyaz Surjapuri, and the projects he has built. If you'd like to support his work, you can follow, subscribe, and like his social media accounts using the links below.",
      voicePrivacyButtonHint: "This is the Privacy Policy button. It tells you how QRaksha handles your data.",
      voicePrivacyPageIntro: "This is our Privacy Policy.",

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
      panicStopText: "<strong class=\"text-red-400\">Stop.</strong> No real police, court, or bank official asks you to stay on video call or transfer money. Hang up.",
      panicThinkText: "<strong class=\"text-red-400\">Think.</strong> \"Digital arrest\" is not a real legal process in India.",
      panicActText: "<strong class=\"text-red-400\">Act.</strong> Report now. Do not send more money.",

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

      /* ---- QR-scan explanation summary — risk-engine-core.js buildExplanation() ---- */
      qrExplUrlWithApp: "This QR opens a website — it appears to be {app}.",
      qrExplUrlPlain: "This QR opens a website.",
      qrExplHttps: "This connection uses HTTPS.",
      qrExplHttp: "This connection uses plain HTTP, not HTTPS.",
      qrExplShortener: "This may be a shortened link, so the real destination is hidden until you open it.",
      qrExplUnknownBrand: "This domain isn't on our list of recognized official brand domains.",
      qrExplUpiWithPayee: "This appears to be a UPI payment request to \"{payee}\".",
      qrExplUpiNoPayee: "This appears to be a UPI payment request.",
      qrExplUpiConfirm: "Always confirm the payee name and amount inside your UPI app before paying.",
      qrExplWifi: "This QR connects your device to the WiFi network \"{ssid}\".",
      qrExplVcard: "This QR adds a contact card to your phone.",
      qrExplCalendar: "This QR adds an event to your calendar.",
      qrExplEmail: "This QR opens your email app with a message ready to send.",
      qrExplSms: "This QR opens your messaging app with a text ready to send.",
      qrExplPhone: "This QR starts a phone call.",
      qrExplLocation: "This QR opens a map at a specific location.",
      qrExplCrypto: "This QR contains a cryptocurrency wallet address for sending funds.",
      qrExplTextPlain: "This QR just contains plain text. It won't open a link or trigger any action.",
      qrExplUnclassified: "We couldn't confidently classify the content of this QR code.",
      qrExplRiskLow: "No obvious danger was detected.",
      qrExplRiskMedium: "A few details are worth double-checking before you continue.",
      qrExplRiskHigh: "Several warning signs were found — proceed with real caution.",
      qrExplRiskCritical: "Multiple serious warning signs were found. We strongly recommend not opening or paying this.",
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
      govPartnershipNote: "हम अपने उपयोगकर्ताओं की सुरक्षा के लिए संबंधित सरकारी विनियामक प्राधिकरणों के साथ सीधे संरचनात्मक एकीकरण और आधिकारिक साझेदारी स्थापित करने के लिए सक्रिय रूप से प्रयासरत हैं।",
      welcomeMessage: "QRaksha mein aapka swagat hai",
      highPriority: "उच्च प्राथमिकता",
      appearanceTitle: "दिखावट",
      themeDark: "डार्क",
      themeLight: "लाइट",
      themeCustom: "कस्टम",
      aboutTransparencyTitle: "जानकारी और पारदर्शिता",
      aboutFounderLabel: "फाउंडर के बारे में",
      privacyPolicyTitle: "प्राइवेसी पॉलिसी",
      awarenessResourcesTitle: "जागरूकता और संसाधन",
      reportToPlatformTitle: "सीधे प्लेटफॉर्म पर रिपोर्ट करें",
      reportToPlatformDesc: "लिंक सीधे हर प्लेटफॉर्म के आधिकारिक रिपोर्ट पेज पर जाते हैं — QRaksha खुद इन रिपोर्ट्स को प्रोसेस नहीं करता।",
      consentTitle: "AI Advance Opinion चालू करें?",
      consentBody: "ऑफलाइन और फ्री थ्रेट-इंटेल जांच हमेशा अपने-आप चलती है। AI Advance Opinion टेक्स्ट/इमेज को हमारे सर्वर पर भेजता है, जो इसे Mesh API को फॉरवर्ड करता है। बाद में कुछ भी स्टोर नहीं किया जाता।",
      consentCheckboxLabel: "मैं समझता/समझती हूं और AI Advance Opinion चालू करना चाहता/चाहती हूं",
      consentEnable: "चालू करें",
      consentNotNow: "अभी नहीं",
      privacyPoint1: "QR स्कैनिंग और ऑफलाइन मैसेज जांच पूरी तरह आपके ब्राउज़र में चलती हैं — कहीं भी कुछ नहीं भेजा जाता।",
      privacyPoint2: "वैकल्पिक AI Advance Opinion सिर्फ वही टेक्स्ट/इमेज हमारे सर्वर पर भेजता है जो आप खुद जमा करते हैं। इसे बाद में स्टोर नहीं किया जाता।",
      privacyPoint3: "आप जो सक्सेस स्टोरी खुद जमा करते हैं, वो हमारे डेटाबेस में स्टोर होती है। पब्लिश होने से पहले हर स्टोरी को एक इंसान रिव्यू करता है।",
      privacyPoint4: "हम यूज़र डेटा नहीं बेचते। हम टारगेटेड विज्ञापन नहीं दिखाते।",
      generateTitle: "जनरेट करें",
      generateSubtitle: "उन चीज़ों के लिए QR कोड बनाएं जिन्हें लोग असल में स्कैन करते हैं।",
      genSocialProfile: "सोशल मीडिया प्रोफ़ाइल",
      genMarketingCampaign: "मार्केटिंग कैंपेन",
      genAccountCard: "अकाउंट कार्ड",
      genGoogleReview: "गूगल रिव्यू",
      genGoogleMaps: "गूगल मैप्स लोकेशन",
      genPlayStoreLink: "ऐप / प्ले स्टोर लिंक",
      genAdNote: "बनाई गई QR इमेज डाउनलोड करने से पहले एक छोटा विज्ञापन चलता है — बनाना और प्रीव्यू करना हमेशा मुफ्त है।",
      storyCtaTitle: "आपकी कहानी, साइबर सुरक्षा की ज़ुबानी",
      storyCtaDesc: "अगर आप हमारे ऐप का इस्तेमाल करके किसी धोखाधड़ी या फ्रॉड से बचे हैं, तो अपनी कहानी हमारे साथ साझा करें।",
      storyCtaButton: "अपनी सक्सेस स्टोरी शेयर करें",
      storyFormTitle: "अपनी सक्सेस स्टोरी शेयर करें",
      storyFormSubtitle: "आपकी कहानी साइबर जागरूकता बढ़ाने में मदद करेगी।",
      storyLabelName: "पूरा नाम",
      storyLabelCity: "स्थान / शहर",
      storyLabelAmount: "अनुमानित बचाई गई राशि (₹)",
      storyLabelFraudType: "धोखाधड़ी का प्रकार",
      storyOptQr: "QR कोड स्कैम",
      storyOptJob: "WhatsApp जॉब फ्रॉड",
      storyOptCare: "फर्ज़ी कस्टमर केयर",
      storyOptApp: "संदिग्ध ऐप",
      storyOptOther: "अन्य",
      storyLabelDescription: "आपकी कहानी",
      storyAnonymousLabel: "मेरी कहानी बिना नाम के (Anonymous) पब्लिश करें।",
      storyConsentLabel: "मैं सहमत हूं कि मेरी कहानी साइबर जागरूकता बढ़ाने के लिए पब्लिक प्लेटफॉर्म पर पब्लिश की जाए।",
      storySubmitButton: "सबमिट करें",
      storyCancelButton: "रद्द करें",
      transparencyTitle: "रेवेन्यू और ग्रोथ रोडमैप (पारदर्शिता)",
      transparencyBody: "QRaksha आज मुफ्त है। रोडमैप में non-intrusive AdMob प्लेसमेंट, एक वैकल्पिक प्रीमियम टियर (अनलिमिटेड AI चेक, ad-free), और B2B API licensing शामिल हो सकते हैं। मुख्य सुरक्षा फीचर्स — ऑफलाइन QR चेक, Panic Mode, और बेसिक स्कैम डिटेक्शन — हमेशा मुफ्त रहने के लिए बनाए गए हैं।",
      transparencyGovWork: "हम सरकारी कानून प्रवर्तन प्राधिकरणों के साथ सीधे API इंटीग्रेशन और औपचारिक साझेदारी स्थापित करने के लिए सक्रिय रूप से काम कर रहे हैं।",
      catUrlLabel: "वेबसाइट URL",
      catUrlDesc: "फिशिंग या फर्ज़ी लिंक जांचें",
      catWhatsappLabel: "WhatsApp / Telegram",
      catWhatsappDesc: "स्कैम भेजने वाले चैट हैंडल की जांच करें",
      catPhoneLabel: "फोन नंबर",
      catPhoneDesc: "संदिग्ध कॉल/SMS स्रोत की जांच करें",
      catEmailLabel: "ईमेल आईडी",
      catEmailDesc: "मेल हेडर / स्पैम भेजने वालों की जांच करें",
      catSmsLabel: "SMS हेडर / नंबर",
      catSmsDesc: "फाइनेंशियल/कूरियर स्पूफ मैसेज जांचें",
      catSocialLabel: "सोशल मीडिया URL",
      catSocialDesc: "प्रोफाइल क्लोनिंग या फर्ज़ी गिवअवे जांचें",
      catComingSoon: "जल्द आ रहा है — आधिकारिक रिपोर्ट पोर्टल पर भेजता है",
      voiceFounderButtonHint: "यह फाउंडर के बारे में वाला बटन है। यह आपको बताता है कि QRaksha किसने बनाया।",
      voiceFounderPageIntro: "यह पेज आपको हमारे फाउंडर, इम्तियाज़ सुरजापुरी, और उनके बनाए प्रोजेक्ट्स के बारे में बताता है। अगर आप उनके काम को सपोर्ट करना चाहते हैं, तो नीचे दिए गए लिंक से उनके सोशल मीडिया अकाउंट्स को फॉलो, सब्सक्राइब और लाइक कर सकते हैं।",
      voicePrivacyButtonHint: "यह प्राइवेसी पॉलिसी वाला बटन है। यह आपको बताता है कि QRaksha आपके डेटा को कैसे संभालता है।",
      voicePrivacyPageIntro: "यह हमारी प्राइवेसी पॉलिसी है।",

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
      panicStopText: "<strong class=\"text-red-400\">रुकिए।</strong> कोई भी असली पुलिस, अदालत या बैंक अधिकारी आपसे वीडियो कॉल पर बने रहने या पैसे ट्रांसफर करने को नहीं कहता। कॉल काट दें।",
      panicThinkText: "<strong class=\"text-red-400\">सोचिए।</strong> \"डिजिटल अरेस्ट\" भारत में कोई असली कानूनी प्रक्रिया नहीं है।",
      panicActText: "<strong class=\"text-red-400\">कार्रवाई करें।</strong> अभी रिपोर्ट करें। और पैसे न भेजें।",

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

      qrExplUrlWithApp: "यह QR एक वेबसाइट खोलता है — यह {app} जैसा लगता है।",
      qrExplUrlPlain: "यह QR एक वेबसाइट खोलता है।",
      qrExplHttps: "यह कनेक्शन HTTPS इस्तेमाल करता है।",
      qrExplHttp: "यह कनेक्शन सादा HTTP इस्तेमाल करता है, HTTPS नहीं।",
      qrExplShortener: "यह एक छोटा किया हुआ लिंक हो सकता है, इसलिए असली मंज़िल तब तक छुपी रहती है जब तक आप इसे खोलते नहीं।",
      qrExplUnknownBrand: "यह डोमेन हमारी मान्यता-प्राप्त आधिकारिक ब्रांड डोमेन की सूची में नहीं है।",
      qrExplUpiWithPayee: "यह \"{payee}\" को एक UPI भुगतान अनुरोध जैसा लगता है।",
      qrExplUpiNoPayee: "यह एक UPI भुगतान अनुरोध जैसा लगता है।",
      qrExplUpiConfirm: "भुगतान करने से पहले हमेशा अपने UPI ऐप में payee नाम और राशि की पुष्टि करें।",
      qrExplWifi: "यह QR आपके डिवाइस को WiFi नेटवर्क \"{ssid}\" से जोड़ता है।",
      qrExplVcard: "यह QR आपके फोन में एक कॉन्टैक्ट कार्ड जोड़ता है।",
      qrExplCalendar: "यह QR आपके कैलेंडर में एक इवेंट जोड़ता है।",
      qrExplEmail: "यह QR आपका ईमेल ऐप खोलता है, एक तैयार मैसेज के साथ।",
      qrExplSms: "यह QR आपका मैसेजिंग ऐप खोलता है, एक तैयार टेक्स्ट के साथ।",
      qrExplPhone: "यह QR एक फोन कॉल शुरू करता है।",
      qrExplLocation: "यह QR एक खास जगह पर मैप खोलता है।",
      qrExplCrypto: "इस QR में पैसे भेजने के लिए एक क्रिप्टोकरेंसी wallet एड्रेस है।",
      qrExplTextPlain: "इस QR में सिर्फ सादा टेक्स्ट है। यह कोई लिंक नहीं खोलेगा या कोई एक्शन ट्रिगर नहीं करेगा।",
      qrExplUnclassified: "हम इस QR कोड की सामग्री को पूरे भरोसे के साथ वर्गीकृत नहीं कर सके।",
      qrExplRiskLow: "कोई स्पष्ट खतरा नहीं मिला।",
      qrExplRiskMedium: "आगे बढ़ने से पहले कुछ बातें दोबारा जांचने लायक हैं।",
      qrExplRiskHigh: "कई चेतावनी संकेत मिले — असली सावधानी से आगे बढ़ें।",
      qrExplRiskCritical: "कई गंभीर चेतावनी संकेत मिले। हम इसे न खोलने या भुगतान न करने की सख्त सलाह देते हैं।",
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
      govPartnershipNote: "আমরা আমাদের ব্যবহারকারীদের সুরক্ষার জন্য সংশ্লিষ্ট সরকারি নিয়ন্ত্রক কর্তৃপক্ষের সাথে সরাসরি কাঠামোগত একীকরণ এবং আনুষ্ঠানিক অংশীদারিত্ব প্রতিষ্ঠার জন্য সক্রিয়ভাবে কাজ করছি।",
      welcomeMessage: "QRaksha-te apnar swagat",
      highPriority: "উচ্চ অগ্রাধিকার",
      appearanceTitle: "চেহারা",
      themeDark: "ডার্ক",
      themeLight: "লাইট",
      themeCustom: "কাস্টম",
      aboutTransparencyTitle: "সম্পর্কে ও স্বচ্ছতা",
      aboutFounderLabel: "প্রতিষ্ঠাতা সম্পর্কে",
      privacyPolicyTitle: "গোপনীয়তা নীতি",
      awarenessResourcesTitle: "সচেতনতা ও সম্পদ",
      reportToPlatformTitle: "সরাসরি প্ল্যাটফর্মে রিপোর্ট করুন",
      reportToPlatformDesc: "লিঙ্কগুলি সরাসরি প্রতিটি প্ল্যাটফর্মের নিজস্ব অফিসিয়াল রিপোর্ট পেজে যায় — QRaksha নিজে এই রিপোর্টগুলি প্রক্রিয়া করে না।",
      consentTitle: "AI অ্যাডভান্স ওপিনিয়ন চালু করবেন?",
      consentBody: "অফলাইন এবং ফ্রি থ্রেট-ইন্টেল চেক সবসময় স্বয়ংক্রিয়ভাবে চলে। একটি AI অ্যাডভান্স ওপিনিয়ন টেক্সট/ছবি আমাদের সার্ভারে পাঠায়, যা এটি Mesh API-তে ফরওয়ার্ড করে। পরে কিছুই সংরক্ষণ করা হয় না।",
      consentCheckboxLabel: "আমি বুঝেছি এবং AI অ্যাডভান্স ওপিনিয়ন চালু করতে চাই",
      consentEnable: "চালু করুন",
      consentNotNow: "এখন না",
      privacyPoint1: "QR স্ক্যানিং এবং অফলাইন মেসেজ চেক সম্পূর্ণভাবে আপনার ব্রাউজারে চলে — কোথাও কিছু পাঠানো হয় না।",
      privacyPoint2: "ঐচ্ছিক AI অ্যাডভান্স ওপিনিয়ন শুধুমাত্র সেই টেক্সট/ছবি আমাদের সার্ভারে পাঠায় যা আপনি স্পষ্টভাবে জমা দেন। এটি পরে সংরক্ষণ করা হয় না।",
      privacyPoint3: "আপনি স্পষ্টভাবে জমা দেওয়া সাফল্যের গল্পগুলি আমাদের ডাটাবেসে সংরক্ষিত হয়। প্রকাশের আগে প্রতিটি গল্প একজন মানুষ পর্যালোচনা করেন।",
      privacyPoint4: "আমরা ব্যবহারকারীর ডেটা বিক্রি করি না। আমরা টার্গেটেড বিজ্ঞাপন দেখাই না।",
      generateTitle: "তৈরি করুন",
      generateSubtitle: "মানুষ আসলে যা স্ক্যান করে তার জন্য একটি QR কোড তৈরি করুন।",
      genSocialProfile: "সোশ্যাল মিডিয়া প্রোফাইল",
      genMarketingCampaign: "মার্কেটিং ক্যাম্পেইন",
      genAccountCard: "অ্যাকাউন্ট কার্ড",
      genGoogleReview: "গুগল রিভিউ",
      genGoogleMaps: "গুগল ম্যাপস লোকেশন",
      genPlayStoreLink: "অ্যাপ / প্লে স্টোর লিঙ্ক",
      genAdNote: "তৈরি করা QR ছবি ডাউনলোড করার আগে একটি সংক্ষিপ্ত বিজ্ঞাপন চলে — তৈরি করা এবং প্রিভিউ করা সবসময় বিনামূল্যে।",
      storyCtaTitle: "আপনার গল্প, সাইবার সুরক্ষার ভাষায়",
      storyCtaDesc: "আমাদের অ্যাপ ব্যবহার করে যদি আপনি কোনো প্রতারণা বা জালিয়াতি এড়িয়ে গেছেন, তাহলে আপনার গল্প আমাদের সাথে শেয়ার করুন।",
      storyCtaButton: "আপনার সাফল্যের গল্প শেয়ার করুন",
      storyFormTitle: "আপনার সাফল্যের গল্প শেয়ার করুন",
      storyFormSubtitle: "আপনার গল্প সাইবার সচেতনতা বাড়াতে সাহায্য করবে।",
      storyLabelName: "পুরো নাম",
      storyLabelCity: "অবস্থান / শহর",
      storyLabelAmount: "আনুমানিক সঞ্চিত পরিমাণ (₹)",
      storyLabelFraudType: "জালিয়াতির ধরন",
      storyOptQr: "QR কোড স্ক্যাম",
      storyOptJob: "হোয়াটসঅ্যাপ চাকরির প্রতারণা",
      storyOptCare: "ভুয়া কাস্টমার কেয়ার",
      storyOptApp: "সন্দেহজনক অ্যাপ",
      storyOptOther: "অন্যান্য",
      storyLabelDescription: "আপনার গল্প",
      storyAnonymousLabel: "আমার নাম ছাড়া (বেনামে) আমার গল্প প্রকাশ করুন।",
      storyConsentLabel: "আমি সম্মত যে আমার গল্প সাইবার সচেতনতা বাড়াতে পাবলিক প্ল্যাটফর্মে প্রকাশ করা যেতে পারে।",
      storySubmitButton: "জমা দিন",
      storyCancelButton: "বাতিল করুন",
      transparencyTitle: "রাজস্ব ও বৃদ্ধির রোডম্যাপ (স্বচ্ছতা)",
      transparencyBody: "QRaksha আজ বিনামূল্যে। রোডম্যাপে অ-অনুপ্রবেশকারী AdMob প্লেসমেন্ট, একটি ঐচ্ছিক প্রিমিয়াম টিয়ার (আনলিমিটেড AI চেক, বিজ্ঞাপন-মুক্ত), এবং B2B API লাইসেন্সিং অন্তর্ভুক্ত থাকতে পারে। মূল সুরক্ষা বৈশিষ্ট্য — অফলাইন QR চেক, প্যানিক মোড, এবং বেসিক স্ক্যাম সনাক্তকরণ — সর্বদা বিনামূল্যে থাকার উদ্দেশ্যে তৈরি।",
      transparencyGovWork: "আমরা সরকারি আইন প্রয়োগকারী কর্তৃপক্ষের সাথে সরাসরি API একীকরণ এবং আনুষ্ঠানিক অংশীদারিত্ব প্রতিষ্ঠার জন্য সক্রিয়ভাবে কাজ করছি।",
      catUrlLabel: "ওয়েবসাইট URL",
      catUrlDesc: "ফিশিং বা ভুয়া লিঙ্ক স্ক্যান করুন",
      catWhatsappLabel: "হোয়াটসঅ্যাপ / টেলিগ্রাম",
      catWhatsappDesc: "স্ক্যাম পাঠানো চ্যাট হ্যান্ডেল যাচাই করুন",
      catPhoneLabel: "ফোন নম্বর",
      catPhoneDesc: "সন্দেহজনক কল/SMS উৎস যাচাই করুন",
      catEmailLabel: "ইমেল আইডি",
      catEmailDesc: "মেইল হেডার / স্প্যাম প্রেরক যাচাই করুন",
      catSmsLabel: "SMS হেডার / নম্বর",
      catSmsDesc: "আর্থিক/কুরিয়ার স্পুফ বার্তা যাচাই করুন",
      catSocialLabel: "সোশ্যাল মিডিয়া URL",
      catSocialDesc: "প্রোফাইল ক্লোনিং বা ভুয়া গিভঅ্যাওয়ে যাচাই করুন",
      catComingSoon: "শীঘ্রই আসছে — অফিসিয়াল রিপোর্ট পোর্টালে যায়",
      voiceFounderButtonHint: "এটি প্রতিষ্ঠাতা সম্পর্কে বোতাম। এটি আপনাকে বলে যে QRaksha কে তৈরি করেছেন।",
      voiceFounderPageIntro: "এই পাতাটি আপনাকে আমাদের প্রতিষ্ঠাতা, ইমতিয়াজ সুরজাপুরি, এবং তার তৈরি প্রকল্পগুলি সম্পর্কে বলে। আপনি যদি তার কাজকে সমর্থন করতে চান, তাহলে নিচের লিঙ্কগুলি ব্যবহার করে তার সোশ্যাল মিডিয়া অ্যাকাউন্ট ফলো, সাবস্ক্রাইব এবং লাইক করতে পারেন।",
      voicePrivacyButtonHint: "এটি গোপনীয়তা নীতি বোতাম। এটি আপনাকে বলে যে QRaksha আপনার ডেটা কীভাবে পরিচালনা করে।",
      voicePrivacyPageIntro: "এটি আমাদের গোপনীয়তা নীতি।",

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
      panicStopText: "<strong class=\"text-red-400\">থামুন।</strong> কোনো প্রকৃত পুলিশ, আদালত বা ব্যাংক কর্মকর্তা আপনাকে ভিডিও কলে থাকতে বা টাকা পাঠাতে বলে না। কল কেটে দিন।",
      panicThinkText: "<strong class=\"text-red-400\">ভাবুন।</strong> \"ডিজিটাল অ্যারেস্ট\" ভারতে কোনো প্রকৃত আইনি প্রক্রিয়া নয়।",
      panicActText: "<strong class=\"text-red-400\">ব্যবস্থা নিন।</strong> এখনই রিপোর্ট করুন। আর টাকা পাঠাবেন না।",

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
      govPartnershipNote: "మా వినియోగదారుల భద్రత కోసం సంబంధిత ప్రభుత్వ నియంత్రణ అధికారులతో నేరుగా నిర్మాణాత్మక ఏకీకరణ మరియు అధికారిక భాగస్వామ్యాలను ఏర్పాటు చేయడానికి మేము చురుకుగా కృషి చేస్తున్నాము.",
      welcomeMessage: "QRaksha ki swagatam",
      highPriority: "అధిక ప్రాధాన్యత",
      appearanceTitle: "కనిపించే తీరు",
      themeDark: "డార్క్",
      themeLight: "లైట్",
      themeCustom: "కస్టమ్",
      aboutTransparencyTitle: "గురించి & పారదర్శకత",
      aboutFounderLabel: "వ్యవస్థాపకుడి గురించి",
      privacyPolicyTitle: "గోప్యతా విధానం",
      awarenessResourcesTitle: "అవగాహన & వనరులు",
      reportToPlatformTitle: "నేరుగా ప్లాట్‌ఫారమ్‌కి రిపోర్ట్ చేయండి",
      reportToPlatformDesc: "లింకులు నేరుగా ప్రతి ప్లాట్‌ఫారమ్ యొక్క అధికారిక రిపోర్ట్ పేజీకి వెళ్తాయి — QRaksha ఈ రిపోర్టులను స్వయంగా ప్రాసెస్ చేయదు.",
      consentTitle: "AI అడ్వాన్స్ ఒపీనియన్ ఆన్ చేయాలా?",
      consentBody: "ఆఫ్‌లైన్ మరియు ఉచిత థ్రెట్-ఇంటెల్ చెక్‌లు ఎల్లప్పుడూ స్వయంచాలకంగా నడుస్తాయి. AI అడ్వాన్స్ ఒపీనియన్ టెక్స్ట్/ఇమేజ్‌ని మా సర్వర్‌కి పంపుతుంది, అది దానిని Mesh API కి ఫార్వర్డ్ చేస్తుంది. తర్వాత ఏమీ నిల్వ చేయబడదు.",
      consentCheckboxLabel: "నేను అర్థం చేసుకున్నాను మరియు AI అడ్వాన్స్ ఒపీనియన్ ఆన్ చేయాలనుకుంటున్నాను",
      consentEnable: "ఆన్ చేయండి",
      consentNotNow: "ఇప్పుడు వద్దు",
      privacyPoint1: "QR స్కానింగ్ మరియు ఆఫ్‌లైన్ మెసేజ్ చెక్‌లు పూర్తిగా మీ బ్రౌజర్‌లోనే నడుస్తాయి — ఎక్కడికీ ఏమీ పంపబడదు.",
      privacyPoint2: "ఐచ్ఛిక AI అడ్వాన్స్ ఒపీనియన్ మీరు స్పష్టంగా సమర్పించే టెక్స్ట్/ఇమేజ్‌ని మాత్రమే మా సర్వర్‌కి పంపుతుంది. తర్వాత అది నిల్వ చేయబడదు.",
      privacyPoint3: "మీరు స్పష్టంగా సమర్పించే విజయగాథలు మా డేటాబేస్‌లో నిల్వ చేయబడతాయి. ప్రచురించే ముందు ప్రతి కథను ఒక వ్యక్తి సమీక్షిస్తారు.",
      privacyPoint4: "మేము యూజర్ డేటాను అమ్మము. మేము టార్గెటెడ్ ప్రకటనలు చూపించము.",
      generateTitle: "జనరేట్ చేయండి",
      generateSubtitle: "ప్రజలు నిజంగా స్కాన్ చేసే వాటి కోసం QR కోడ్ సృష్టించండి.",
      genSocialProfile: "సోషల్ మీడియా ప్రొఫైల్",
      genMarketingCampaign: "మార్కెటింగ్ క్యాంపెయిన్",
      genAccountCard: "అకౌంట్ కార్డ్",
      genGoogleReview: "గూగుల్ రివ్యూ",
      genGoogleMaps: "గూగుల్ మ్యాప్స్ లొకేషన్",
      genPlayStoreLink: "యాప్ / ప్లే స్టోర్ లింక్",
      genAdNote: "సృష్టించిన QR చిత్రాన్ని డౌన్‌లోడ్ చేసే ముందు ఒక చిన్న ప్రకటన ప్లే అవుతుంది — సృష్టించడం మరియు ప్రివ్యూ చేయడం ఎల్లప్పుడూ ఉచితం.",
      storyCtaTitle: "మీ కథ, సైబర్ భద్రత మాటల్లో",
      storyCtaDesc: "మా యాప్‌ని ఉపయోగించి మీరు మోసం లేదా వంచన నుండి తప్పించుకుంటే, మీ కథను మాతో పంచుకోండి.",
      storyCtaButton: "మీ విజయగాథను పంచుకోండి",
      storyFormTitle: "మీ విజయగాథను పంచుకోండి",
      storyFormSubtitle: "మీ కథ సైబర్ అవగాహనను పెంచడంలో సహాయపడుతుంది.",
      storyLabelName: "పూర్తి పేరు",
      storyLabelCity: "ప్రాంతం / నగరం",
      storyLabelAmount: "అంచనా ఆదా చేసిన మొత్తం (₹)",
      storyLabelFraudType: "మోసం రకం",
      storyOptQr: "QR కోడ్ మోసం",
      storyOptJob: "WhatsApp జాబ్ మోసం",
      storyOptCare: "నకిలీ కస్టమర్ కేర్",
      storyOptApp: "అనుమానాస్పద యాప్",
      storyOptOther: "ఇతర",
      storyLabelDescription: "మీ కథ",
      storyAnonymousLabel: "నా పేరు లేకుండా (అనామకంగా) నా కథను ప్రచురించండి.",
      storyConsentLabel: "సైబర్ అవగాహన పెంచడానికి నా కథను పబ్లిక్ ప్లాట్‌ఫారమ్‌లలో ప్రచురించవచ్చని నేను అంగీకరిస్తున్నాను.",
      storySubmitButton: "సమర్పించండి",
      storyCancelButton: "రద్దు చేయండి",
      transparencyTitle: "రెవెన్యూ & గ్రోత్ రోడ్‌మ్యాప్ (పారదర్శకత)",
      transparencyBody: "QRaksha ఈరోజు ఉచితం. రోడ్‌మ్యాప్‌లో అంతరాయం లేని AdMob ప్లేస్‌మెంట్‌లు, ఐచ్ఛిక ప్రీమియం టైర్ (అపరిమిత AI చెక్‌లు, ప్రకటనలు లేకుండా), మరియు B2B API లైసెన్సింగ్ ఉండవచ్చు. ప్రధాన భద్రతా ఫీచర్‌లు — ఆఫ్‌లైన్ QR చెక్, పానిక్ మోడ్, మరియు బేసిక్ స్కామ్ డిటెక్షన్ — ఎల్లప్పుడూ ఉచితంగా ఉండేలా రూపొందించబడ్డాయి.",
      transparencyGovWork: "ప్రభుత్వ చట్ట అమలు అధికారులతో ప్రత్యక్ష API ఇంటిగ్రేషన్‌లు మరియు అధికారిక భాగస్వామ్యాలను ఏర్పాటు చేయడానికి మేము చురుకుగా కృషి చేస్తున్నాము.",
      catUrlLabel: "వెబ్‌సైట్ URL",
      catUrlDesc: "ఫిషింగ్ లేదా నకిలీ లింక్‌లను స్కాన్ చేయండి",
      catWhatsappLabel: "వాట్సాప్ / టెలిగ్రామ్",
      catWhatsappDesc: "మోసాలు పంపే చాట్ హ్యాండిల్‌ని తనిఖీ చేయండి",
      catPhoneLabel: "ఫోన్ నంబర్",
      catPhoneDesc: "అనుమానాస్పద కాల్/SMS మూలాన్ని తనిఖీ చేయండి",
      catEmailLabel: "ఇమెయిల్ ఐడి",
      catEmailDesc: "మెయిల్ హెడర్‌లు / స్పామ్ పంపేవారిని తనిఖీ చేయండి",
      catSmsLabel: "SMS హెడర్ / నంబర్",
      catSmsDesc: "ఆర్థిక/కొరియర్ స్పూఫ్ సందేశాలను తనిఖీ చేయండి",
      catSocialLabel: "సోషల్ మీడియా URL",
      catSocialDesc: "ప్రొఫైల్ క్లోనింగ్ లేదా నకిలీ గివ్‌అవేలను తనిఖీ చేయండి",
      catComingSoon: "త్వరలో వస్తుంది — అధికారిక రిపోర్ట్ పోర్టల్‌కి మళ్ళిస్తుంది",
      voiceFounderButtonHint: "ఇది వ్యవస్థాపకుడి గురించి బటన్. QRaksha ను ఎవరు తయారు చేశారో ఇది మీకు చెబుతుంది.",
      voiceFounderPageIntro: "ఈ పేజీ మా వ్యవస్థాపకుడు, ఇమ్తియాజ్ సుర్జాపురి, మరియు అతను నిర్మించిన ప్రాజెక్టుల గురించి మీకు చెబుతుంది. మీరు అతని పనికి మద్దతు ఇవ్వాలనుకుంటే, దిగువ లింక్‌లను ఉపయోగించి అతని సోషల్ మీడియా ఖాతాలను ఫాలో, సబ్‌స్క్రైబ్ మరియు లైక్ చేయవచ్చు.",
      voicePrivacyButtonHint: "ఇది గోప్యతా విధానం బటన్. QRaksha మీ డేటాను ఎలా నిర్వహిస్తుందో ఇది మీకు చెబుతుంది.",
      voicePrivacyPageIntro: "ఇది మా గోప్యతా విధానం.",

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
      panicStopText: "<strong class=\"text-red-400\">ఆగండి.</strong> నిజమైన పోలీసు, కోర్టు లేదా బ్యాంక్ అధికారి వీడియో కాల్‌లో ఉండమని లేదా డబ్బు పంపమని ఎప్పుడూ అడగరు. కాల్ కట్ చేయండి.",
      panicThinkText: "<strong class=\"text-red-400\">ఆలోచించండి.</strong> \"డిజిటల్ అరెస్ట్\" భారతదేశంలో నిజమైన చట్టపరమైన ప్రక్రియ కాదు.",
      panicActText: "<strong class=\"text-red-400\">చర్య తీసుకోండి.</strong> ఇప్పుడే రిపోర్ట్ చేయండి. మరింత డబ్బు పంపవద్దు.",

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
      govPartnershipNote: "आमच्या वापरकर्त्यांच्या सुरक्षिततेसाठी संबंधित सरकारी नियामक प्राधिकरणांशी थेट संरचनात्मक एकीकरण आणि अधिकृत भागीदारी प्रस्थापित करण्यासाठी आम्ही सक्रियपणे कार्यरत आहोत.",
      welcomeMessage: "QRaksha madhye aaple swagat aahe",
      highPriority: "उच्च प्राधान्य",
      appearanceTitle: "स्वरूप",
      themeDark: "डार्क",
      themeLight: "लाइट",
      themeCustom: "कस्टम",
      aboutTransparencyTitle: "आमच्याबद्दल आणि पारदर्शकता",
      aboutFounderLabel: "संस्थापकाबद्दल",
      privacyPolicyTitle: "गोपनीयता धोरण",
      awarenessResourcesTitle: "जागरूकता आणि संसाधने",
      reportToPlatformTitle: "थेट प्लॅटफॉर्मवर तक्रार करा",
      reportToPlatformDesc: "लिंक थेट प्रत्येक प्लॅटफॉर्मच्या अधिकृत तक्रार पानावर जातात — QRaksha स्वतः या तक्रारींवर प्रक्रिया करत नाही.",
      consentTitle: "AI Advance Opinion सुरू करायचे?",
      consentBody: "ऑफलाइन आणि मोफत थ्रेट-इंटेल तपासणी नेहमी आपोआप चालते. AI Advance Opinion मजकूर/प्रतिमा आमच्या सर्व्हरवर पाठवते, जे ते Mesh API कडे फॉरवर्ड करते. नंतर काहीही साठवले जात नाही.",
      consentCheckboxLabel: "मला समजले आहे आणि मला AI Advance Opinion सुरू करायचे आहे",
      consentEnable: "सुरू करा",
      consentNotNow: "आत्ता नाही",
      privacyPoint1: "QR स्कॅनिंग आणि ऑफलाइन मेसेज तपासणी संपूर्णपणे तुमच्या ब्राउझरमध्ये चालते — कुठेही काहीही पाठवले जात नाही.",
      privacyPoint2: "पर्यायी AI Advance Opinion तुम्ही स्पष्टपणे सबमिट केलेला मजकूर/प्रतिमा आमच्या सर्व्हरवर पाठवते. नंतर ते साठवले जात नाही.",
      privacyPoint3: "तुम्ही स्पष्टपणे सबमिट केलेल्या यशोगाथा आमच्या डेटाबेसमध्ये साठवल्या जातात. प्रकाशित होण्यापूर्वी प्रत्येक कथेचे पुनरावलोकन एक व्यक्ती करते.",
      privacyPoint4: "आम्ही वापरकर्त्याचा डेटा विकत नाही. आम्ही टार्गेटेड जाहिराती दाखवत नाही.",
      generateTitle: "जनरेट करा",
      generateSubtitle: "लोक प्रत्यक्षात स्कॅन करत असलेल्या गोष्टींसाठी QR कोड तयार करा.",
      genSocialProfile: "सोशल मीडिया प्रोफाइल",
      genMarketingCampaign: "मार्केटिंग मोहीम",
      genAccountCard: "अकाउंट कार्ड",
      genGoogleReview: "गुगल रिव्ह्यू",
      genGoogleMaps: "गुगल मॅप्स लोकेशन",
      genPlayStoreLink: "अ‍ॅप / प्ले स्टोअर लिंक",
      genAdNote: "तयार केलेली QR प्रतिमा डाउनलोड करण्यापूर्वी एक छोटी जाहिरात चालते — तयार करणे आणि पूर्वावलोकन नेहमी मोफत आहे.",
      storyCtaTitle: "तुमची कहाणी, सायबर सुरक्षिततेच्या शब्दांत",
      storyCtaDesc: "जर तुम्ही आमचे अ‍ॅप वापरून एखाद्या फसवणुकीपासून वाचला असाल, तर तुमची कहाणी आमच्यासोबत शेअर करा.",
      storyCtaButton: "तुमची यशोगाथा शेअर करा",
      storyFormTitle: "तुमची यशोगाथा शेअर करा",
      storyFormSubtitle: "तुमची कहाणी सायबर जागरूकता वाढवण्यास मदत करेल.",
      storyLabelName: "पूर्ण नाव",
      storyLabelCity: "ठिकाण / शहर",
      storyLabelAmount: "अंदाजे वाचवलेली रक्कम (₹)",
      storyLabelFraudType: "फसवणुकीचा प्रकार",
      storyOptQr: "QR कोड स्कॅम",
      storyOptJob: "WhatsApp नोकरी फसवणूक",
      storyOptCare: "बनावट कस्टमर केअर",
      storyOptApp: "संशयास्पद अ‍ॅप",
      storyOptOther: "इतर",
      storyLabelDescription: "तुमची कहाणी",
      storyAnonymousLabel: "माझी कहाणी माझ्या नावाशिवाय (Anonymous) प्रकाशित करा.",
      storyConsentLabel: "सायबर जागरूकता वाढवण्यासाठी माझी कहाणी सार्वजनिक प्लॅटफॉर्मवर प्रकाशित केली जाऊ शकते याला मी सहमत आहे.",
      storySubmitButton: "सबमिट करा",
      storyCancelButton: "रद्द करा",
      transparencyTitle: "महसूल आणि वाढ रोडमॅप (पारदर्शकता)",
      transparencyBody: "QRaksha आज मोफत आहे. रोडमॅपमध्ये गैर-अडथळा आणणारे AdMob प्लेसमेंट्स, पर्यायी प्रीमियम टियर (अमर्यादित AI तपासण्या, जाहिरात-मुक्त), आणि B2B API परवाना समाविष्ट असू शकतो. मुख्य सुरक्षा वैशिष्ट्ये — ऑफलाइन QR तपासणी, पॅनिक मोड, आणि मूलभूत स्कॅम ओळख — नेहमी मोफत राहण्यासाठी बनवली आहेत.",
      transparencyGovWork: "आम्ही सरकारी कायदा अंमलबजावणी प्राधिकरणांशी थेट API एकत्रीकरण आणि औपचारिक भागीदारी प्रस्थापित करण्यासाठी सक्रियपणे कार्यरत आहोत.",
      catUrlLabel: "वेबसाइट URL",
      catUrlDesc: "फिशिंग किंवा बनावट लिंक तपासा",
      catWhatsappLabel: "WhatsApp / Telegram",
      catWhatsappDesc: "स्कॅम पाठवणारे चॅट हँडल तपासा",
      catPhoneLabel: "फोन नंबर",
      catPhoneDesc: "संशयास्पद कॉल/SMS स्रोत तपासा",
      catEmailLabel: "ईमेल आयडी",
      catEmailDesc: "मेल हेडर / स्पॅम पाठवणारे तपासा",
      catSmsLabel: "SMS हेडर / नंबर",
      catSmsDesc: "आर्थिक/कुरिअर स्पूफ संदेश तपासा",
      catSocialLabel: "सोशल मीडिया URL",
      catSocialDesc: "प्रोफाइल क्लोनिंग किंवा बनावट गिव्हअवे तपासा",
      catComingSoon: "लवकरच येत आहे — अधिकृत तक्रार पोर्टलवर पाठवते",
      voiceFounderButtonHint: "हे संस्थापकाबद्दलचे बटण आहे. QRaksha कोणी तयार केले हे हे तुम्हाला सांगते.",
      voiceFounderPageIntro: "हे पान तुम्हाला आमचे संस्थापक, इम्तियाज सुरजापुरी, आणि त्यांनी तयार केलेल्या प्रकल्पांबद्दल सांगते. जर तुम्हाला त्यांच्या कामाला पाठिंबा द्यायचा असेल, तर खालील लिंक वापरून त्यांचे सोशल मीडिया अकाउंट फॉलो, सबस्क्राइब आणि लाईक करू शकता.",
      voicePrivacyButtonHint: "हे गोपनीयता धोरण बटण आहे. QRaksha तुमचा डेटा कसा हाताळते हे हे तुम्हाला सांगते.",
      voicePrivacyPageIntro: "हे आमचे गोपनीयता धोरण आहे.",

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
      panicStopText: "<strong class=\"text-red-400\">थांबा.</strong> कोणताही खरा पोलीस, न्यायालय किंवा बँक अधिकारी तुम्हाला व्हिडिओ कॉलवर राहण्यास किंवा पैसे पाठवण्यास सांगत नाही. कॉल बंद करा.",
      panicThinkText: "<strong class=\"text-red-400\">विचार करा.</strong> \"डिजिटल अटक\" ही भारतात खरी कायदेशीर प्रक्रिया नाही.",
      panicActText: "<strong class=\"text-red-400\">कृती करा.</strong> आत्ताच तक्रार करा. आणखी पैसे पाठवू नका.",

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
      govPartnershipNote: "எங்கள் பயனர்களைப் பாதுகாக்க தொடர்புடைய அரசு ஒழுங்குமுறை அதிகாரிகளுடன் நேரடி கட்டமைப்பு ஒருங்கிணைப்பு மற்றும் அதிகாரப்பூர்வ கூட்டாண்மைகளை நிறுவ நாங்கள் தீவிரமாக செயல்படுகிறோம்.",
      welcomeMessage: "QRakshavil ungalai varaverkirom",
      highPriority: "உயர் முன்னுரிமை",
      appearanceTitle: "தோற்றம்",
      themeDark: "டார்க்",
      themeLight: "லைட்",
      themeCustom: "தனிப்பயன்",
      aboutTransparencyTitle: "பற்றி & வெளிப்படைத்தன்மை",
      aboutFounderLabel: "நிறுவனர் பற்றி",
      privacyPolicyTitle: "தனியுரிமைக் கொள்கை",
      awarenessResourcesTitle: "விழிப்புணர்வு & வளங்கள்",
      reportToPlatformTitle: "நேரடியாக தளத்தில் புகார் அளிக்கவும்",
      reportToPlatformDesc: "இணைப்புகள் நேரடியாக ஒவ்வொரு தளத்தின் அதிகாரப்பூர்வ புகார் பக்கத்திற்குச் செல்கின்றன — QRaksha இந்த புகார்களை தானே செயலாக்கவில்லை.",
      consentTitle: "AI அட்வான்ஸ் ஒப்பீனியனை இயக்கவா?",
      consentBody: "ஆஃப்லைன் மற்றும் இலவச திரெட்-இன்டெல் சரிபார்ப்புகள் எப்போதும் தானாக இயங்கும். AI அட்வான்ஸ் ஒப்பீனியன் உரை/படத்தை எங்கள் சேவையகத்திற்கு அனுப்புகிறது, அது அதை Mesh API க்கு அனுப்புகிறது. பிறகு எதுவும் சேமிக்கப்படாது.",
      consentCheckboxLabel: "எனக்குப் புரிகிறது, AI அட்வான்ஸ் ஒப்பீனியனை இயக்க விரும்புகிறேன்",
      consentEnable: "இயக்கு",
      consentNotNow: "இப்போது வேண்டாம்",
      privacyPoint1: "QR ஸ்கேனிங் மற்றும் ஆஃப்லைன் செய்தி சரிபார்ப்புகள் முழுவதுமாக உங்கள் உலாவியில் இயங்குகின்றன — எங்கும் எதுவும் அனுப்பப்படாது.",
      privacyPoint2: "விருப்பமான AI அட்வான்ஸ் ஒப்பீனியன் நீங்கள் வெளிப்படையாக சமர்ப்பிக்கும் உரை/படத்தை மட்டுமே எங்கள் சேவையகத்திற்கு அனுப்புகிறது. அது பின்னர் சேமிக்கப்படாது.",
      privacyPoint3: "நீங்கள் வெளிப்படையாக சமர்ப்பிக்கும் வெற்றிக் கதைகள் எங்கள் தரவுத்தளத்தில் சேமிக்கப்படும். வெளியிடப்படுவதற்கு முன் ஒவ்வொரு கதையையும் ஒரு நபர் மதிப்பாய்வு செய்கிறார்.",
      privacyPoint4: "நாங்கள் பயனர் தரவை விற்பதில்லை. நாங்கள் இலக்கு விளம்பரங்களைக் காட்டுவதில்லை.",
      generateTitle: "உருவாக்கு",
      generateSubtitle: "மக்கள் உண்மையில் ஸ்கேன் செய்யும் விஷயங்களுக்கு QR குறியீட்டை உருவாக்கவும்.",
      genSocialProfile: "சமூக ஊடக சுயவிவரம்",
      genMarketingCampaign: "சந்தைப்படுத்தல் பிரச்சாரம்",
      genAccountCard: "கணக்கு அட்டை",
      genGoogleReview: "கூகிள் விமர்சனம்",
      genGoogleMaps: "கூகிள் மேப்ஸ் இருப்பிடம்",
      genPlayStoreLink: "ஆப் / ப்ளே ஸ்டோர் இணைப்பு",
      genAdNote: "உருவாக்கப்பட்ட QR படத்தைப் பதிவிறக்குவதற்கு முன் ஒரு குறுகிய விளம்பரம் இயங்கும் — உருவாக்குவதும் முன்னோட்டமும் எப்போதும் இலவசம்.",
      storyCtaTitle: "உங்கள் கதை, சைபர் பாதுகாப்பின் வார்த்தைகளில்",
      storyCtaDesc: "எங்கள் ஆப்பைப் பயன்படுத்தி நீங்கள் ஒரு மோசடியிலிருந்து தப்பித்திருந்தால், உங்கள் கதையை எங்களுடன் பகிரவும்.",
      storyCtaButton: "உங்கள் வெற்றிக் கதையைப் பகிரவும்",
      storyFormTitle: "உங்கள் வெற்றிக் கதையைப் பகிரவும்",
      storyFormSubtitle: "உங்கள் கதை சைபர் விழிப்புணர்வை அதிகரிக்க உதவும்.",
      storyLabelName: "முழுப் பெயர்",
      storyLabelCity: "இடம் / நகரம்",
      storyLabelAmount: "மதிப்பிடப்பட்ட சேமிப்பு தொகை (₹)",
      storyLabelFraudType: "மோசடி வகை",
      storyOptQr: "QR குறியீடு மோசடி",
      storyOptJob: "வாட்ஸ்அப் வேலை மோசடி",
      storyOptCare: "போலி வாடிக்கையாளர் சேவை",
      storyOptApp: "சந்தேகத்திற்குரிய ஆப்",
      storyOptOther: "மற்றவை",
      storyLabelDescription: "உங்கள் கதை",
      storyAnonymousLabel: "எனது பெயர் இல்லாமல் (அநாமதேயமாக) எனது கதையை வெளியிடவும்.",
      storyConsentLabel: "சைபர் விழிப்புணர்வை அதிகரிக்க எனது கதை பொது தளங்களில் வெளியிடப்படலாம் என்பதை நான் ஒப்புக்கொள்கிறேன்.",
      storySubmitButton: "சமர்ப்பிக்கவும்",
      storyCancelButton: "ரத்து செய்",
      transparencyTitle: "வருவாய் & வளர்ச்சி வரைபடம் (வெளிப்படைத்தன்மை)",
      transparencyBody: "QRaksha இன்று இலவசம். வரைபடத்தில் தடையற்ற AdMob வைப்புகள், விருப்பமான பிரீமியம் அடுக்கு (வரம்பற்ற AI சரிபார்ப்புகள், விளம்பரமற்றது), மற்றும் B2B API உரிமம் ஆகியவை இருக்கலாம். முக்கிய பாதுகாப்பு அம்சங்கள் — ஆஃப்லைன் QR சரிபார்ப்பு, பேனிக் மோட், மற்றும் அடிப்படை மோசடி கண்டறிதல் — எப்போதும் இலவசமாக இருக்கும் வகையில் வடிவமைக்கப்பட்டுள்ளன.",
      transparencyGovWork: "அரசு சட்ட அமலாக்க அதிகாரிகளுடன் நேரடி API ஒருங்கிணைப்புகள் மற்றும் முறையான கூட்டாண்மைகளை நிறுவ நாங்கள் தீவிரமாக செயல்படுகிறோம்.",
      catUrlLabel: "இணையதள URL",
      catUrlDesc: "ஃபிஷிங் அல்லது போலி இணைப்புகளை ஸ்கேன் செய்யவும்",
      catWhatsappLabel: "வாட்ஸ்அப் / டெலிகிராம்",
      catWhatsappDesc: "மோசடிகளை அனுப்பும் அரட்டை கைப்பிடியை சரிபார்க்கவும்",
      catPhoneLabel: "தொலைபேசி எண்",
      catPhoneDesc: "சந்தேகத்திற்குரிய அழைப்பு/SMS மூலத்தை சரிபார்க்கவும்",
      catEmailLabel: "மின்னஞ்சல் ஐடி",
      catEmailDesc: "அஞ்சல் தலைப்புகள் / ஸ்பேம் அனுப்புநர்களை சரிபார்க்கவும்",
      catSmsLabel: "SMS தலைப்பு / எண்",
      catSmsDesc: "நிதி/கூரியர் போலி செய்திகளை சரிபார்க்கவும்",
      catSocialLabel: "சமூக ஊடக URL",
      catSocialDesc: "சுயவிவர நகலெடுப்பு அல்லது போலி பரிசுகளை சரிபார்க்கவும்",
      catComingSoon: "விரைவில் வருகிறது — அதிகாரப்பூர்வ புகார் போர்டலுக்கு செல்கிறது",
      voiceFounderButtonHint: "இது நிறுவனர் பற்றிய பொத்தான். QRaksha-வை யார் உருவாக்கினார்கள் என்பதை இது உங்களுக்குச் சொல்கிறது.",
      voiceFounderPageIntro: "இந்தப் பக்கம் எங்கள் நிறுவனர், இம்தியாஜ் சூர்ஜாபுரி, மற்றும் அவர் உருவாக்கிய திட்டங்களைப் பற்றி உங்களுக்குச் சொல்கிறது. அவரது பணியை நீங்கள் ஆதரிக்க விரும்பினால், கீழே உள்ள இணைப்புகளைப் பயன்படுத்தி அவரது சமூக ஊடக கணக்குகளைப் பின்தொடரலாம், குழுசேரலாம், விருப்பமும் தெரிவிக்கலாம்.",
      voicePrivacyButtonHint: "இது தனியுரிமைக் கொள்கை பொத்தான். QRaksha உங்கள் தரவை எவ்வாறு கையாளுகிறது என்பதை இது உங்களுக்குச் சொல்கிறது.",
      voicePrivacyPageIntro: "இது எங்கள் தனியுரிமைக் கொள்கை.",

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
      panicStopText: "<strong class=\"text-red-400\">நிறுத்துங்கள்.</strong> உண்மையான போலீஸ், நீதிமன்றம் அல்லது வங்கி அதிகாரி யாரும் வீடியோ கால் தொடர வேண்டும் அல்லது பணம் அனுப்ப வேண்டும் என்று கேட்க மாட்டார்கள். அழைப்பைத் துண்டியுங்கள்.",
      panicThinkText: "<strong class=\"text-red-400\">யோசியுங்கள்.</strong> \"டிஜிட்டல் கைது\" இந்தியாவில் உண்மையான சட்ட செயல்முறை அல்ல.",
      panicActText: "<strong class=\"text-red-400\">நடவடிக்கை எடுங்கள்.</strong> இப்போதே புகார் அளியுங்கள். மேலும் பணம் அனுப்ப வேண்டாம்.",

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
      govPartnershipNote: "ہم اپنے صارفین کی حفاظت کے لیے متعلقہ سرکاری ریگولیٹری اداروں کے ساتھ براہ راست ساختی انضمام اور باضابطہ شراکت داری قائم کرنے کے لیے سرگرمی سے کوشاں ہیں۔",
      welcomeMessage: "QRaksha mein aapka khushamdeed",
      highPriority: "اعلی ترجیح",
      appearanceTitle: "ظاہری شکل",
      themeDark: "ڈارک",
      themeLight: "لائٹ",
      themeCustom: "حسب ضرورت",
      aboutTransparencyTitle: "تعارف اور شفافیت",
      aboutFounderLabel: "بانی کے بارے میں",
      privacyPolicyTitle: "پرائیویسی پالیسی",
      awarenessResourcesTitle: "آگاہی اور وسائل",
      reportToPlatformTitle: "براہ راست پلیٹ فارم پر رپورٹ کریں",
      reportToPlatformDesc: "لنکس براہ راست ہر پلیٹ فارم کے اپنے آفیشل رپورٹ پیج پر جاتے ہیں — QRaksha خود ان رپورٹس پر کارروائی نہیں کرتا۔",
      consentTitle: "AI ایڈوانس اوپینین فعال کریں؟",
      consentBody: "آف لائن اور مفت تھریٹ انٹیل چیک ہمیشہ خودکار طور پر چلتے ہیں۔ AI ایڈوانس اوپینین ٹیکسٹ/تصویر ہمارے سرور کو بھیجتا ہے، جو اسے Mesh API کو فارورڈ کرتا ہے۔ بعد میں کچھ بھی محفوظ نہیں کیا جاتا۔",
      consentCheckboxLabel: "میں سمجھتا/سمجھتی ہوں اور AI ایڈوانس اوپینین فعال کرنا چاہتا/چاہتی ہوں",
      consentEnable: "فعال کریں",
      consentNotNow: "ابھی نہیں",
      privacyPoint1: "QR اسکیننگ اور آف لائن میسج چیک مکمل طور پر آپ کے براؤزر میں چلتے ہیں — کہیں بھی کچھ نہیں بھیجا جاتا۔",
      privacyPoint2: "اختیاری AI ایڈوانس اوپینین صرف وہ ٹیکسٹ/تصویر ہمارے سرور کو بھیجتا ہے جو آپ واضح طور پر جمع کراتے ہیں۔ اسے بعد میں محفوظ نہیں کیا جاتا۔",
      privacyPoint3: "آپ کی جمع کرائی گئی کامیابی کی کہانیاں ہمارے ڈیٹا بیس میں محفوظ کی جاتی ہیں۔ شائع ہونے سے پہلے ہر کہانی کا جائزہ ایک انسان لیتا ہے۔",
      privacyPoint4: "ہم صارف کا ڈیٹا فروخت نہیں کرتے۔ ہم ٹارگٹڈ اشتہارات نہیں دکھاتے۔",
      generateTitle: "بنائیں",
      generateSubtitle: "ان چیزوں کے لیے QR کوڈ بنائیں جنہیں لوگ حقیقت میں اسکین کرتے ہیں۔",
      genSocialProfile: "سوشل میڈیا پروفائل",
      genMarketingCampaign: "مارکیٹنگ مہم",
      genAccountCard: "اکاؤنٹ کارڈ",
      genGoogleReview: "گوگل ریویو",
      genGoogleMaps: "گوگل میپس مقام",
      genPlayStoreLink: "ایپ / پلے اسٹور لنک",
      genAdNote: "بنائی گئی QR تصویر ڈاؤن لوڈ کرنے سے پہلے ایک مختصر اشتہار چلتا ہے — بنانا اور پیش نظارہ ہمیشہ مفت ہے۔",
      storyCtaTitle: "آپ کی کہانی، سائبر تحفظ کی زبانی",
      storyCtaDesc: "اگر آپ نے ہماری ایپ استعمال کر کے کسی دھوکہ دہی یا فراڈ سے بچاؤ کیا ہے تو اپنی کہانی ہمارے ساتھ شیئر کریں۔",
      storyCtaButton: "اپنی کامیابی کی کہانی شیئر کریں",
      storyFormTitle: "اپنی کامیابی کی کہانی شیئر کریں",
      storyFormSubtitle: "آپ کی کہانی سائبر آگاہی بڑھانے میں مدد کرے گی۔",
      storyLabelName: "پورا نام",
      storyLabelCity: "مقام / شہر",
      storyLabelAmount: "تخمینی بچائی گئی رقم (₹)",
      storyLabelFraudType: "دھوکہ دہی کی قسم",
      storyOptQr: "QR کوڈ اسکیم",
      storyOptJob: "واٹس ایپ نوکری فراڈ",
      storyOptCare: "جعلی کسٹمر کیئر",
      storyOptApp: "مشکوک ایپ",
      storyOptOther: "دیگر",
      storyLabelDescription: "آپ کی کہانی",
      storyAnonymousLabel: "میری کہانی میرے نام کے بغیر (گمنام) شائع کریں۔",
      storyConsentLabel: "میں اس بات سے متفق ہوں کہ میری کہانی سائبر آگاہی بڑھانے کے لیے عوامی پلیٹ فارمز پر شائع کی جا سکتی ہے۔",
      storySubmitButton: "جمع کرائیں",
      storyCancelButton: "منسوخ کریں",
      transparencyTitle: "ریونیو اور گروتھ روڈ میپ (شفافیت)",
      transparencyBody: "QRaksha آج مفت ہے۔ روڈ میپ میں غیر مداخلت کار AdMob پلیسمنٹس، ایک اختیاری پریمیم درجہ (لامحدود AI چیک، اشتہار سے پاک)، اور B2B API لائسنسنگ شامل ہو سکتی ہے۔ بنیادی حفاظتی خصوصیات — آف لائن QR چیک، پینک موڈ، اور بنیادی اسکیم کا پتہ لگانا — ہمیشہ مفت رہنے کے لیے بنائی گئی ہیں۔",
      transparencyGovWork: "ہم سرکاری قانون نافذ کرنے والے اداروں کے ساتھ براہ راست API انضمام اور رسمی شراکت داری قائم کرنے کے لیے سرگرمی سے کوشاں ہیں۔",
      catUrlLabel: "ویب سائٹ یو آر ایل",
      catUrlDesc: "فشنگ یا جعلی لنکس اسکین کریں",
      catWhatsappLabel: "واٹس ایپ / ٹیلیگرام",
      catWhatsappDesc: "اسکیم بھیجنے والے چیٹ ہینڈل کی جانچ کریں",
      catPhoneLabel: "فون نمبر",
      catPhoneDesc: "مشکوک کال/ایس ایم ایس ذریعہ چیک کریں",
      catEmailLabel: "ای میل آئی ڈی",
      catEmailDesc: "میل ہیڈرز / اسپیم بھیجنے والوں کی جانچ کریں",
      catSmsLabel: "ایس ایم ایس ہیڈر / نمبر",
      catSmsDesc: "مالیاتی/کورئیر جعلی پیغامات چیک کریں",
      catSocialLabel: "سوشل میڈیا یو آر ایل",
      catSocialDesc: "پروفائل کلوننگ یا جعلی گیو اوے چیک کریں",
      catComingSoon: "جلد آ رہا ہے — آفیشل رپورٹ پورٹل پر بھیجتا ہے",
      voiceFounderButtonHint: "یہ بانی کے بارے میں والا بٹن ہے۔ یہ آپ کو بتاتا ہے کہ QRaksha کس نے بنایا۔",
      voiceFounderPageIntro: "یہ صفحہ آپ کو ہمارے بانی، امتیاز سورجاپوری، اور ان کے بنائے گئے پروجیکٹس کے بارے میں بتاتا ہے۔ اگر آپ ان کے کام کی حمایت کرنا چاہتے ہیں، تو نیچے دیے گئے لنکس کا استعمال کرتے ہوئے ان کے سوشل میڈیا اکاؤنٹس کو فالو، سبسکرائب اور لائک کر سکتے ہیں۔",
      voicePrivacyButtonHint: "یہ پرائیویسی پالیسی والا بٹن ہے۔ یہ آپ کو بتاتا ہے کہ QRaksha آپ کے ڈیٹا کو کیسے سنبھالتا ہے۔",
      voicePrivacyPageIntro: "یہ ہماری پرائیویسی پالیسی ہے۔",

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
      panicStopText: "<strong class=\"text-red-400\">رک جائیں۔</strong> کوئی حقیقی پولیس، عدالت یا بینک اہلکار آپ سے ویڈیو کال پر رہنے یا پیسے بھیجنے کو نہیں کہتا۔ کال بند کر دیں۔",
      panicThinkText: "<strong class=\"text-red-400\">سوچیں۔</strong> \"ڈیجیٹل گرفتاری\" بھارت میں کوئی حقیقی قانونی عمل نہیں ہے۔",
      panicActText: "<strong class=\"text-red-400\">اقدام کریں۔</strong> ابھی رپورٹ کریں۔ مزید پیسے نہ بھیجیں۔",

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
      govPartnershipNote: "અમે અમારા વપરાશકર્તાઓની સુરક્ષા માટે સંબંધિત સરકારી નિયમનકારી સત્તાધિકારીઓ સાથે સીધું માળખાકીય એકીકરણ અને સત્તાવાર ભાગીદારી સ્થાપિત કરવા સક્રિયપણે કાર્યરત છીએ.",
      welcomeMessage: "QRaksha ma aapnu swagat chhe",
      highPriority: "ઉચ્ચ પ્રાથમિકતા",
      appearanceTitle: "દેખાવ",
      themeDark: "ડાર્ક",
      themeLight: "લાઇટ",
      themeCustom: "કસ્ટમ",
      aboutTransparencyTitle: "વિશે અને પારદર્શિતા",
      aboutFounderLabel: "સ્થાપક વિશે",
      privacyPolicyTitle: "ગોપનીયતા નીતિ",
      awarenessResourcesTitle: "જાગૃતિ અને સંસાધનો",
      reportToPlatformTitle: "સીધા પ્લેટફોર્મ પર ફરિયાદ કરો",
      reportToPlatformDesc: "લિંક્સ સીધા દરેક પ્લેટફોર્મના પોતાના સત્તાવાર રિપોર્ટ પેજ પર જાય છે — QRaksha પોતે આ ફરિયાદો પર પ્રક્રિયા કરતું નથી.",
      consentTitle: "AI Advance Opinion ચાલુ કરવો છે?",
      consentBody: "ઓફલાઇન અને મફત થ્રેટ-ઇન્ટેલ ચેક હંમેશા આપમેળે ચાલે છે. AI Advance Opinion ટેક્સ્ટ/ઇમેજ અમારા સર્વર પર મોકલે છે, જે તેને Mesh API પર ફોરવર્ડ કરે છે. પછી કંઈ પણ સંગ્રહિત થતું નથી.",
      consentCheckboxLabel: "હું સમજું છું અને AI Advance Opinion ચાલુ કરવા માંગુ છું",
      consentEnable: "ચાલુ કરો",
      consentNotNow: "હમણાં નહીં",
      privacyPoint1: "QR સ્કેનિંગ અને ઓફલાઇન મેસેજ ચેક સંપૂર્ણપણે તમારા બ્રાઉઝરમાં ચાલે છે — ક્યાંય કંઈ મોકલવામાં આવતું નથી.",
      privacyPoint2: "વૈકલ્પિક AI Advance Opinion ફક્ત તમે સ્પષ્ટપણે સબમિટ કરેલ ટેક્સ્ટ/ઇમેજ અમારા સર્વર પર મોકલે છે. તે પછી સંગ્રહિત થતું નથી.",
      privacyPoint3: "તમે સ્પષ્ટપણે સબમિટ કરેલી સફળતાની વાર્તાઓ અમારા ડેટાબેઝમાં સંગ્રહિત થાય છે. પ્રકાશિત થાય તે પહેલાં દરેક વાર્તાની સમીક્ષા એક વ્યક્તિ કરે છે.",
      privacyPoint4: "અમે વપરાશકર્તા ડેટા વેચતા નથી. અમે લક્ષિત જાહેરાતો બતાવતા નથી.",
      generateTitle: "જનરેટ કરો",
      generateSubtitle: "લોકો ખરેખર સ્કેન કરે તેવી વસ્તુઓ માટે QR કોડ બનાવો.",
      genSocialProfile: "સોશિયલ મીડિયા પ્રોફાઇલ",
      genMarketingCampaign: "માર્કેટિંગ ઝુંબેશ",
      genAccountCard: "એકાઉન્ટ કાર્ડ",
      genGoogleReview: "ગૂગલ રિવ્યૂ",
      genGoogleMaps: "ગૂગલ મેપ્સ સ્થાન",
      genPlayStoreLink: "એપ / પ્લે સ્ટોર લિંક",
      genAdNote: "બનાવેલી QR ઇમેજ ડાઉનલોડ કરતા પહેલા ટૂંકી જાહેરાત ચાલે છે — બનાવવું અને પૂર્વાવલોકન હંમેશા મફત છે.",
      storyCtaTitle: "તમારી વાર્તા, સાયબર સુરક્ષાની ભાષામાં",
      storyCtaDesc: "જો તમે અમારી એપનો ઉપયોગ કરીને કોઈ છેતરપિંડી અથવા ફ્રોડથી બચ્યા હો, તો તમારી વાર્તા અમારી સાથે શેર કરો.",
      storyCtaButton: "તમારી સફળતાની વાર્તા શેર કરો",
      storyFormTitle: "તમારી સફળતાની વાર્તા શેર કરો",
      storyFormSubtitle: "તમારી વાર્તા સાયબર જાગૃતિ વધારવામાં મદદ કરશે.",
      storyLabelName: "પૂરું નામ",
      storyLabelCity: "સ્થળ / શહેર",
      storyLabelAmount: "અંદાજિત બચેલી રકમ (₹)",
      storyLabelFraudType: "છેતરપિંડીનો પ્રકાર",
      storyOptQr: "QR કોડ સ્કેમ",
      storyOptJob: "WhatsApp નોકરી છેતરપિંડી",
      storyOptCare: "નકલી કસ્ટમર કેર",
      storyOptApp: "શંકાસ્પદ એપ",
      storyOptOther: "અન્ય",
      storyLabelDescription: "તમારી વાર્તા",
      storyAnonymousLabel: "મારું નામ વગર (અનામી) મારી વાર્તા પ્રકાશિત કરો.",
      storyConsentLabel: "હું સંમત છું કે સાયબર જાગૃતિ વધારવા માટે મારી વાર્તા જાહેર પ્લેટફોર્મ પર પ્રકાશિત થઈ શકે છે.",
      storySubmitButton: "સબમિટ કરો",
      storyCancelButton: "રદ કરો",
      transparencyTitle: "આવક અને વૃદ્ધિ રોડમેપ (પારદર્શિતા)",
      transparencyBody: "QRaksha આજે મફત છે. રોડમેપમાં બિન-ઘુસણખોરી AdMob પ્લેસમેન્ટ્સ, વૈકલ્પિક પ્રીમિયમ ટિયર (અમર્યાદિત AI ચેક, જાહેરાત-મુક્ત), અને B2B API લાઇસન્સિંગ શામેલ હોઈ શકે છે. મુખ્ય સુરક્ષા સુવિધાઓ — ઓફલાઇન QR ચેક, પેનિક મોડ, અને મૂળભૂત સ્કેમ શોધ — હંમેશા મફત રહેવા માટે બનાવવામાં આવી છે.",
      transparencyGovWork: "અમે સરકારી કાયદા અમલીકરણ સત્તાધિકારીઓ સાથે સીધું API એકીકરણ અને ઔપચારિક ભાગીદારી સ્થાપિત કરવા સક્રિયપણે કાર્યરત છીએ.",
      catUrlLabel: "વેબસાઇટ URL",
      catUrlDesc: "ફિશિંગ અથવા નકલી લિંક્સ સ્કેન કરો",
      catWhatsappLabel: "WhatsApp / Telegram",
      catWhatsappDesc: "સ્કેમ મોકલતા ચેટ હેન્ડલની તપાસ કરો",
      catPhoneLabel: "ફોન નંબર",
      catPhoneDesc: "શંકાસ્પદ કૉલ/SMS સ્રોત તપાસો",
      catEmailLabel: "ઈમેલ આઈડી",
      catEmailDesc: "મેલ હેડર / સ્પામ મોકલનારાઓ તપાસો",
      catSmsLabel: "SMS હેડર / નંબર",
      catSmsDesc: "નાણાકીય/કુરિયર સ્પૂફ સંદેશા તપાસો",
      catSocialLabel: "સોશિયલ મીડિયા URL",
      catSocialDesc: "પ્રોફાઇલ ક્લોનિંગ અથવા નકલી ગિવઅવે તપાસો",
      catComingSoon: "ટૂંક સમયમાં આવી રહ્યું છે — સત્તાવાર રિપોર્ટ પોર્ટલ પર મોકલે છે",
      voiceFounderButtonHint: "આ સ્થાપક વિશેનું બટન છે. તે તમને કહે છે કે QRaksha કોણે બનાવ્યું.",
      voiceFounderPageIntro: "આ પેજ તમને અમારા સ્થાપક, ઇમ્તિયાઝ સુરજાપુરી, અને તેમણે બનાવેલા પ્રોજેક્ટ્સ વિશે કહે છે. જો તમે તેમના કામને સપોર્ટ કરવા માંગતા હો, તો નીચે આપેલી લિંક્સનો ઉપયોગ કરીને તેમના સોશિયલ મીડિયા એકાઉન્ટ્સને ફોલો, સબસ્ક્રાઇબ અને લાઈક કરી શકો છો.",
      voicePrivacyButtonHint: "આ ગોપનીયતા નીતિ બટન છે. તે તમને કહે છે કે QRaksha તમારો ડેટા કેવી રીતે હેન્ડલ કરે છે.",
      voicePrivacyPageIntro: "આ અમારી ગોપનીયતા નીતિ છે.",

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
      panicStopText: "<strong class=\"text-red-400\">અટકો.</strong> કોઈ સાચો પોલીસ, કોર્ટ કે બેંક અધિકારી તમને વિડિયો કૉલ પર રહેવા કે પૈસા મોકલવા કહેતો નથી. કૉલ કાપી નાખો.",
      panicThinkText: "<strong class=\"text-red-400\">વિચારો.</strong> \"ડિજિટલ ધરપકડ\" ભારતમાં કોઈ સાચી કાનૂની પ્રક્રિયા નથી.",
      panicActText: "<strong class=\"text-red-400\">પગલાં લો.</strong> હમણાં જ ફરિયાદ કરો. વધુ પૈસા ન મોકલો.",

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
      govPartnershipNote: "ನಮ್ಮ ಬಳಕೆದಾರರ ಸುರಕ್ಷತೆಗಾಗಿ ಸಂಬಂಧಿತ ಸರ್ಕಾರಿ ನಿಯಂತ್ರಕ ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ನೇರ ರಚನಾತ್ಮಕ ಏಕೀಕರಣ ಮತ್ತು ಅಧಿಕೃತ ಪಾಲುದಾರಿಕೆಗಳನ್ನು ಸ್ಥಾಪಿಸಲು ನಾವು ಸಕ್ರಿಯವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇವೆ.",
      welcomeMessage: "QRaksha ge nimma swagata",
      highPriority: "ಹೆಚ್ಚಿನ ಆದ್ಯತೆ",
      appearanceTitle: "ಗೋಚರತೆ",
      themeDark: "ಡಾರ್ಕ್",
      themeLight: "ಲೈಟ್",
      themeCustom: "ಕಸ್ಟಮ್",
      aboutTransparencyTitle: "ಬಗ್ಗೆ ಮತ್ತು ಪಾರದರ್ಶಕತೆ",
      aboutFounderLabel: "ಸಂಸ್ಥಾಪಕರ ಬಗ್ಗೆ",
      privacyPolicyTitle: "ಗೌಪ್ಯತಾ ನೀತಿ",
      awarenessResourcesTitle: "ಅರಿವು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು",
      reportToPlatformTitle: "ನೇರವಾಗಿ ವೇದಿಕೆಗೆ ವರದಿ ಮಾಡಿ",
      reportToPlatformDesc: "ಲಿಂಕ್‌ಗಳು ನೇರವಾಗಿ ಪ್ರತಿ ವೇದಿಕೆಯ ಸ್ವಂತ ಅಧಿಕೃತ ವರದಿ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತವೆ — QRaksha ಈ ವರದಿಗಳನ್ನು ಸ್ವತಃ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವುದಿಲ್ಲ.",
      consentTitle: "AI ಅಡ್ವಾನ್ಸ್ ಅಭಿಪ್ರಾಯವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುವುದೇ?",
      consentBody: "ಆಫ್‌ಲೈನ್ ಮತ್ತು ಉಚಿತ ಥ್ರೆಟ್-ಇಂಟೆಲ್ ಪರಿಶೀಲನೆಗಳು ಯಾವಾಗಲೂ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಚಲಿಸುತ್ತವೆ. AI ಅಡ್ವಾನ್ಸ್ ಅಭಿಪ್ರಾಯವು ಪಠ್ಯ/ಚಿತ್ರವನ್ನು ನಮ್ಮ ಸರ್ವರ್‌ಗೆ ಕಳುಹಿಸುತ್ತದೆ, ಅದು ಅದನ್ನು Mesh API ಗೆ ರವಾನಿಸುತ್ತದೆ. ನಂತರ ಏನನ್ನೂ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.",
      consentCheckboxLabel: "ನನಗೆ ಅರ್ಥವಾಗಿದೆ ಮತ್ತು AI ಅಡ್ವಾನ್ಸ್ ಅಭಿಪ್ರಾಯವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ಬಯಸುತ್ತೇನೆ",
      consentEnable: "ಸಕ್ರಿಯಗೊಳಿಸಿ",
      consentNotNow: "ಈಗ ಬೇಡ",
      privacyPoint1: "QR ಸ್ಕ್ಯಾನಿಂಗ್ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಸಂದೇಶ ಪರಿಶೀಲನೆಗಳು ಸಂಪೂರ್ಣವಾಗಿ ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ನಡೆಯುತ್ತವೆ — ಎಲ್ಲಿಯೂ ಏನೂ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ.",
      privacyPoint2: "ಐಚ್ಛಿಕ AI ಅಡ್ವಾನ್ಸ್ ಅಭಿಪ್ರಾಯವು ನೀವು ಸ್ಪಷ್ಟವಾಗಿ ಸಲ್ಲಿಸುವ ಪಠ್ಯ/ಚಿತ್ರವನ್ನು ಮಾತ್ರ ನಮ್ಮ ಸರ್ವರ್‌ಗೆ ಕಳುಹಿಸುತ್ತದೆ. ಅದನ್ನು ನಂತರ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.",
      privacyPoint3: "ನೀವು ಸ್ಪಷ್ಟವಾಗಿ ಸಲ್ಲಿಸುವ ಯಶೋಗಾಥೆಗಳನ್ನು ನಮ್ಮ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ. ಪ್ರಕಟಿಸುವ ಮೊದಲು ಪ್ರತಿ ಕಥೆಯನ್ನು ಒಬ್ಬ ವ್ಯಕ್ತಿ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.",
      privacyPoint4: "ನಾವು ಬಳಕೆದಾರರ ಡೇಟಾವನ್ನು ಮಾರುವುದಿಲ್ಲ. ನಾವು ಗುರಿ-ನಿರ್ದಿಷ್ಟ ಜಾಹೀರಾತುಗಳನ್ನು ತೋರಿಸುವುದಿಲ್ಲ.",
      generateTitle: "ರಚಿಸಿ",
      generateSubtitle: "ಜನರು ನಿಜವಾಗಿ ಸ್ಕ್ಯಾನ್ ಮಾಡುವ ವಿಷಯಗಳಿಗಾಗಿ QR ಕೋಡ್ ರಚಿಸಿ.",
      genSocialProfile: "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಪ್ರೊಫೈಲ್",
      genMarketingCampaign: "ಮಾರುಕಟ್ಟೆ ಅಭಿಯಾನ",
      genAccountCard: "ಖಾತೆ ಕಾರ್ಡ್",
      genGoogleReview: "ಗೂಗಲ್ ವಿಮರ್ಶೆ",
      genGoogleMaps: "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಸ್ಥಳ",
      genPlayStoreLink: "ಆ್ಯಪ್ / ಪ್ಲೇ ಸ್ಟೋರ್ ಲಿಂಕ್",
      genAdNote: "ರಚಿಸಿದ QR ಚಿತ್ರವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡುವ ಮೊದಲು ಒಂದು ಸಣ್ಣ ಜಾಹೀರಾತು ಪ್ಲೇ ಆಗುತ್ತದೆ — ರಚಿಸುವುದು ಮತ್ತು ಮುನ್ನೋಟ ಯಾವಾಗಲೂ ಉಚಿತ.",
      storyCtaTitle: "ನಿಮ್ಮ ಕಥೆ, ಸೈಬರ್ ಸುರಕ್ಷತೆಯ ಮಾತುಗಳಲ್ಲಿ",
      storyCtaDesc: "ನೀವು ನಮ್ಮ ಆ್ಯಪ್ ಬಳಸಿ ಮೋಸ ಅಥವಾ ವಂಚನೆಯಿಂದ ತಪ್ಪಿಸಿಕೊಂಡಿದ್ದರೆ, ನಿಮ್ಮ ಕಥೆಯನ್ನು ನಮ್ಮೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ.",
      storyCtaButton: "ನಿಮ್ಮ ಯಶೋಗಾಥೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
      storyFormTitle: "ನಿಮ್ಮ ಯಶೋಗಾಥೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
      storyFormSubtitle: "ನಿಮ್ಮ ಕಥೆ ಸೈಬರ್ ಅರಿವನ್ನು ಹೆಚ್ಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      storyLabelName: "ಪೂರ್ಣ ಹೆಸರು",
      storyLabelCity: "ಸ್ಥಳ / ನಗರ",
      storyLabelAmount: "ಅಂದಾಜು ಉಳಿತಾಯ ಮೊತ್ತ (₹)",
      storyLabelFraudType: "ವಂಚನೆಯ ಪ್ರಕಾರ",
      storyOptQr: "QR ಕೋಡ್ ವಂಚನೆ",
      storyOptJob: "WhatsApp ಉದ್ಯೋಗ ವಂಚನೆ",
      storyOptCare: "ನಕಲಿ ಗ್ರಾಹಕ ಸೇವೆ",
      storyOptApp: "ಅನುಮಾನಾಸ್ಪದ ಆ್ಯಪ್",
      storyOptOther: "ಇತರೆ",
      storyLabelDescription: "ನಿಮ್ಮ ಕಥೆ",
      storyAnonymousLabel: "ನನ್ನ ಹೆಸರಿಲ್ಲದೆ (ಅನಾಮಧೇಯವಾಗಿ) ನನ್ನ ಕಥೆಯನ್ನು ಪ್ರಕಟಿಸಿ.",
      storyConsentLabel: "ಸೈಬರ್ ಅರಿವನ್ನು ಹೆಚ್ಚಿಸಲು ನನ್ನ ಕಥೆಯನ್ನು ಸಾರ್ವಜನಿಕ ವೇದಿಕೆಗಳಲ್ಲಿ ಪ್ರಕಟಿಸಬಹುದು ಎಂದು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.",
      storySubmitButton: "ಸಲ್ಲಿಸಿ",
      storyCancelButton: "ರದ್ದುಗೊಳಿಸಿ",
      transparencyTitle: "ಆದಾಯ ಮತ್ತು ಬೆಳವಣಿಗೆ ರೋಡ್‌ಮ್ಯಾಪ್ (ಪಾರದರ್ಶಕತೆ)",
      transparencyBody: "QRaksha ಇಂದು ಉಚಿತವಾಗಿದೆ. ರೋಡ್‌ಮ್ಯಾಪ್‌ನಲ್ಲಿ ಅಡ್ಡಿಪಡಿಸದ AdMob ಪ್ಲೇಸ್‌ಮೆಂಟ್‌ಗಳು, ಐಚ್ಛಿಕ ಪ್ರೀಮಿಯಂ ಶ್ರೇಣಿ (ಅಪರಿಮಿತ AI ಪರಿಶೀಲನೆಗಳು, ಜಾಹೀರಾತು-ಮುಕ್ತ), ಮತ್ತು B2B API ಪರವಾನಗಿ ಸೇರಿರಬಹುದು. ಪ್ರಮುಖ ಸುರಕ್ಷತಾ ವೈಶಿಷ್ಟ್ಯಗಳು — ಆಫ್‌ಲೈನ್ QR ಪರಿಶೀಲನೆ, ಪ್ಯಾನಿಕ್ ಮೋಡ್, ಮತ್ತು ಮೂಲಭೂತ ವಂಚನೆ ಪತ್ತೆ — ಯಾವಾಗಲೂ ಉಚಿತವಾಗಿ ಉಳಿಯುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
      transparencyGovWork: "ಸರ್ಕಾರಿ ಕಾನೂನು ಜಾರಿ ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ನೇರ API ಏಕೀಕರಣಗಳು ಮತ್ತು ಔಪಚಾರಿಕ ಪಾಲುದಾರಿಕೆಗಳನ್ನು ಸ್ಥಾಪಿಸಲು ನಾವು ಸಕ್ರಿಯವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇವೆ.",
      catUrlLabel: "ವೆಬ್‌ಸೈಟ್ URL",
      catUrlDesc: "ಫಿಶಿಂಗ್ ಅಥವಾ ನಕಲಿ ಲಿಂಕ್‌ಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      catWhatsappLabel: "WhatsApp / Telegram",
      catWhatsappDesc: "ವಂಚನೆ ಕಳುಹಿಸುವ ಚಾಟ್ ಹ್ಯಾಂಡಲ್ ಪರಿಶೀಲಿಸಿ",
      catPhoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ",
      catPhoneDesc: "ಅನುಮಾನಾಸ್ಪದ ಕರೆ/SMS ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸಿ",
      catEmailLabel: "ಇಮೇಲ್ ಐಡಿ",
      catEmailDesc: "ಮೇಲ್ ಹೆಡರ್‌ಗಳು / ಸ್ಪ್ಯಾಮ್ ಕಳುಹಿಸುವವರನ್ನು ಪರಿಶೀಲಿಸಿ",
      catSmsLabel: "SMS ಹೆಡರ್ / ಸಂಖ್ಯೆ",
      catSmsDesc: "ಆರ್ಥಿಕ/ಕೊರಿಯರ್ ಸ್ಪೂಫ್ ಸಂದೇಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
      catSocialLabel: "ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ URL",
      catSocialDesc: "ಪ್ರೊಫೈಲ್ ಕ್ಲೋನಿಂಗ್ ಅಥವಾ ನಕಲಿ ಗಿವ್‌ಅವೇಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
      catComingSoon: "ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ — ಅಧಿಕೃತ ವರದಿ ಪೋರ್ಟಲ್‌ಗೆ ಮರುನಿರ್ದೇಶಿಸುತ್ತದೆ",
      voiceFounderButtonHint: "ಇದು ಸಂಸ್ಥಾಪಕರ ಬಗ್ಗೆ ಬಟನ್. QRaksha ಅನ್ನು ಯಾರು ನಿರ್ಮಿಸಿದರು ಎಂದು ಇದು ನಿಮಗೆ ತಿಳಿಸುತ್ತದೆ.",
      voiceFounderPageIntro: "ಈ ಪುಟವು ನಮ್ಮ ಸಂಸ್ಥಾಪಕರಾದ ಇಮ್ತಿಯಾಜ್ ಸೂರ್ಜಾಪುರಿ ಮತ್ತು ಅವರು ನಿರ್ಮಿಸಿದ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ತಿಳಿಸುತ್ತದೆ. ನೀವು ಅವರ ಕೆಲಸವನ್ನು ಬೆಂಬಲಿಸಲು ಬಯಸಿದರೆ, ಕೆಳಗಿನ ಲಿಂಕ್‌ಗಳನ್ನು ಬಳಸಿ ಅವರ ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಖಾತೆಗಳನ್ನು ಫಾಲೋ, ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮತ್ತು ಲೈಕ್ ಮಾಡಬಹುದು.",
      voicePrivacyButtonHint: "ಇದು ಗೌಪ್ಯತಾ ನೀತಿ ಬಟನ್. QRaksha ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುತ್ತದೆ ಎಂದು ಇದು ನಿಮಗೆ ತಿಳಿಸುತ್ತದೆ.",
      voicePrivacyPageIntro: "ಇದು ನಮ್ಮ ಗೌಪ್ಯತಾ ನೀತಿ.",

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
      panicStopText: "<strong class=\"text-red-400\">ನಿಲ್ಲಿಸಿ.</strong> ನಿಜವಾದ ಪೊಲೀಸ್, ನ್ಯಾಯಾಲಯ ಅಥವಾ ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿ ಎಂದಿಗೂ ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಇರಲು ಅಥವಾ ಹಣ ಕಳುಹಿಸಲು ಕೇಳುವುದಿಲ್ಲ. ಕರೆ ಕಡಿತಗೊಳಿಸಿ.",
      panicThinkText: "<strong class=\"text-red-400\">ಯೋಚಿಸಿ.</strong> \"ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್\" ಭಾರತದಲ್ಲಿ ನಿಜವಾದ ಕಾನೂನು ಪ್ರಕ್ರಿಯೆ ಅಲ್ಲ.",
      panicActText: "<strong class=\"text-red-400\">ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.</strong> ಈಗಲೇ ವರದಿ ಮಾಡಿ. ಇನ್ನಷ್ಟು ಹಣ ಕಳುಹಿಸಬೇಡಿ.",

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
   * Public entry point for changing the app language from anywhere
   * outside the Settings picker (e.g. the Panic Mode inline dropdown).
   * Does exactly what selecting a language in Settings does: persist
   * it, re-render all [data-i18n]/[data-i18n-html] text, refresh both
   * picker UIs so they stay in sync with each other, and notify the
   * rest of the app (voice.js listens for this to re-speak/re-render).
   */
  function setLanguage(lang) {
    save(lang);
    applyToDom();
    renderPicker();
    document.dispatchEvent(new CustomEvent("qrv:lang-changed", { detail: { lang } }));
    showWelcomeMessage(lang);
  }

  // Small, self-contained welcome toast — shown and spoken every time
  // the language changes (first-time onboarding and later switches
  // alike), confirming to the user that the switch actually worked, in
  // their own words, both visually and audibly. Built fresh here
  // rather than depending on window.QRVUtils.toast, which despite
  // being referenced elsewhere in the codebase is never actually
  // defined anywhere (dead/no-op reference).
  function showWelcomeMessage(lang) {
    if (typeof document === "undefined") return;
    const message = t("welcomeMessage");

    let el = document.getElementById("qrvWelcomeToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "qrvWelcomeToast";
      el.style.cssText =
        "position:fixed; left:50%; bottom:96px; transform:translateX(-50%) translateY(12px); " +
        "background:#12161B; color:#FFB020; border:1px solid rgba(255,176,32,0.4); " +
        "padding:10px 18px; border-radius:999px; font-size:13px; font-weight:600; " +
        "box-shadow:0 8px 24px rgba(0,0,0,0.4); z-index:200; opacity:0; " +
        "transition:opacity .25s ease, transform .25s ease; pointer-events:none; white-space:nowrap;";
      document.body.appendChild(el);
    }
    el.textContent = message;
    // Force reflow so the transition reliably re-triggers even if a
    // previous toast is still fading out from a rapid language switch.
    void el.offsetWidth;
    el.style.opacity = "1";
    el.style.transform = "translateX(-50%) translateY(0)";
    clearTimeout(showWelcomeMessage._t);
    showWelcomeMessage._t = setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-50%) translateY(12px)";
    }, 2200);

    if (window.QRVVoice) window.QRVVoice.speak(message, { force: true });
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
        setLanguage(lang);
        renderPicker();
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
        setLanguage(lang);
        renderPickerInto(containerId, onSelect);
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

  return { init, t, applyToDom, renderPicker, renderPickerInto, hasSavedLanguage, currentLangForAi, setLanguage, LANGUAGES };
})();
