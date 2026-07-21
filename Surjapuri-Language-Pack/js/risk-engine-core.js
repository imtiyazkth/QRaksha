/* ==========================================================================
   RISK-ENGINE-CORE.JS
   Pure QR-content parsing + heuristic risk scoring, extracted unchanged
   from the original qr-verify-core.js so the new UI can call it without
   depending on that file's old DOM bindings. Logic itself is untouched —
   only the closure/export wrapper is new.
   ========================================================================== */

window.QRVEngine = (function () {
  "use strict";

  /* ------------------------------------------------------------------
     BUGFIX (2026-07-09): these two arrays were referenced by
     parseQRContent()/computeRisk() below but never actually copied over
     during the extraction from qr-verify-core.js, so any URL-type QR
     scanned through the mobile-app.js path (window.QRVEngine.*) threw
     "SHORTENERS is not defined" / "SUSPICIOUS_KEYWORDS is not defined"
     and crashed before producing a result. Restored to match the
     canonical lists in qr-verify-core.js so both engines score
     identically instead of drifting out of sync.
  ------------------------------------------------------------------ */
  const SHORTENERS = [
    "bit.ly", "tinyurl.com", "cutt.ly", "rebrand.ly", "t.co", "is.gd",
    "ow.ly", "shorturl.at", "buff.ly", "shorte.st", "adf.ly", "lnkd.in", "tiny.cc",
  ];

  const SUSPICIOUS_KEYWORDS = [
    "login", "verify", "reward", "gift", "bonus", "otp", "bank", "payment",
    "wallet", "update", "free", "urgent", "win", "crypto", "secure", "confirm", "suspend",
  ];

  function parseQRContent(raw) {
    const text = (raw || "").trim();
    const result = {
      raw: text,
      type: "unknown",
      typeLabel: "Unknown",
      purpose: "The content of this QR code doesn't match a recognized format.",
      protocol: null,
      url: null,
      domain: null,
      subdomain: null,
      tld: null,
      isHttps: null,
      isShortener: false,
      isIp: false,
      paramCount: 0,
      fields: {}, // extra type-specific fields shown in grid
    };

    if (!text) {
      result.purpose = "Empty QR code.";
      return result;
    }

    // --- WiFi ---
    if (/^WIFI:/i.test(text)) {
      result.type = "wifi";
      result.typeLabel = "WiFi Network";
      result.purpose = "Joins a WiFi network automatically.";
      const ssidMatch = text.match(/S:((?:\\.|[^;])*);/i);
      const passMatch = text.match(/P:((?:\\.|[^;])*);/i);
      const encMatch = text.match(/T:((?:\\.|[^;])*);/i);
      const hiddenMatch = text.match(/H:((?:\\.|[^;])*);/i);
      result.fields = {
        "Network (SSID)": ssidMatch ? unescapeQr(ssidMatch[1]) : "—",
        "Security": encMatch ? encMatch[1].toUpperCase() : "Unknown",
        "Password set": passMatch && passMatch[1] ? "Yes" : "No",
        "Hidden network": hiddenMatch && /true/i.test(hiddenMatch[1]) ? "Yes" : "No",
      };
      return result;
    }

    // --- vCard ---
    if (/^BEGIN:VCARD/i.test(text)) {
      result.type = "vcard";
      result.typeLabel = "Contact Card (vCard)";
      result.purpose = "Adds a contact to your address book.";
      const nameMatch = text.match(/FN:(.*)/i);
      const telMatch = text.match(/TEL[^:]*:(.*)/i);
      const emailMatch = text.match(/EMAIL[^:]*:(.*)/i);
      const orgMatch = text.match(/ORG:(.*)/i);
      result.fields = {
        "Name": nameMatch ? nameMatch[1].trim() : "—",
        "Phone": telMatch ? telMatch[1].trim() : "—",
        "Email": emailMatch ? emailMatch[1].trim() : "—",
        "Organization": orgMatch ? orgMatch[1].trim() : "—",
      };
      return result;
    }

    // --- Calendar event ---
    if (/^BEGIN:VEVENT/i.test(text) || /^BEGIN:VCALENDAR/i.test(text)) {
      result.type = "calendar";
      result.typeLabel = "Calendar Event";
      result.purpose = "Adds an event to your calendar.";
      const summaryMatch = text.match(/SUMMARY:(.*)/i);
      const dtStartMatch = text.match(/DTSTART[^:]*:(.*)/i);
      const locMatch = text.match(/LOCATION:(.*)/i);
      result.fields = {
        "Event": summaryMatch ? summaryMatch[1].trim() : "—",
        "Starts": dtStartMatch ? dtStartMatch[1].trim() : "—",
        "Location": locMatch ? locMatch[1].trim() : "—",
      };
      return result;
    }

    // --- Email ---
    if (/^mailto:/i.test(text)) {
      result.type = "email";
      result.typeLabel = "Email";
      result.purpose = "Opens your email app with a pre-filled recipient.";
      const url = safeParseUrl(text);
      const addr = text.replace(/^mailto:/i, "").split("?")[0];
      const params = url ? Object.fromEntries(url.searchParams) : {};
      result.fields = {
        "To": decodeURIComponent(addr) || "—",
        "Subject": params.subject || "—",
        "Body preview": params.body ? decodeURIComponent(params.body).slice(0, 80) : "—",
      };
      return result;
    }

    // --- SMS ---
    if (/^sms(to)?:/i.test(text)) {
      result.type = "sms";
      result.typeLabel = "SMS Message";
      result.purpose = "Opens your messaging app with a pre-filled text.";
      const body = text.split(":").slice(1).join(":");
      const [number, msg] = body.split(/[:?]/);
      result.fields = {
        "To number": (number || "—").trim(),
        "Message preview": msg ? msg.replace(/^body=/i, "").slice(0, 80) : "—",
      };
      return result;
    }

    // --- Phone ---
    if (/^tel:/i.test(text)) {
      result.type = "phone";
      result.typeLabel = "Phone Call";
      result.purpose = "Dials a phone number.";
      result.fields = { "Number": text.replace(/^tel:/i, "") };
      return result;
    }

    // --- Geolocation ---
    if (/^geo:/i.test(text)) {
      result.type = "location";
      result.typeLabel = "Geographic Location";
      result.purpose = "Opens a map at a specific coordinate.";
      const coords = text.replace(/^geo:/i, "").split(",");
      result.fields = {
        "Latitude": coords[0] || "—",
        "Longitude": (coords[1] || "—").split("?")[0],
      };
      return result;
    }

    // --- UPI Payment ---
    if (/^upi:\/\/pay/i.test(text)) {
      result.type = "upi";
      result.typeLabel = "UPI Payment";
      result.purpose = "Opens a UPI app to complete a payment.";
      const url = safeParseUrl(text);
      const params = url ? Object.fromEntries(url.searchParams) : {};
      result.fields = {
        "Payee (VPA)": params.pa || "—",
        "Payee name": params.pn || "—",
        "Amount": params.am ? `₹${params.am}` : "Not fixed (you'll be asked)",
        "Note": params.tn || "—",
      };
      result.upiHandle = params.pa || "";
      result.upiAmount = params.am ? Number(params.am) : null;
      result.upiPayeeName = params.pn || "";
      result.upiNote = params.tn || "";
      return result;
    }

    // --- Crypto wallets ---
    const cryptoMatch = text.match(/^(bitcoin|ethereum|litecoin|dogecoin|tron|bitcoincash|ripple|solana):(.+)/i);
    if (cryptoMatch) {
      result.type = "crypto";
      result.typeLabel = "Cryptocurrency Wallet";
      result.purpose = `Opens a wallet app to send ${cryptoMatch[1]} to an address.`;
      const address = cryptoMatch[2].split("?")[0];
      result.fields = {
        "Coin": cryptoMatch[1].charAt(0).toUpperCase() + cryptoMatch[1].slice(1),
        "Wallet address": address,
        "Address length": String(address.length),
      };
      return result;
    }

    // --- URL (http/https/www/bare-domain) ---
    const looksLikeUrl = /^https?:\/\//i.test(text) || /^www\./i.test(text) || isLikelyBareDomain(text);
    if (looksLikeUrl) {
      let normalized = text;
      if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;
      const url = safeParseUrl(normalized);

      result.type = "url";
      result.typeLabel = "Website URL";
      result.url = normalized;
      result.protocol = url ? url.protocol.replace(":", "") : (text.startsWith("https") ? "https" : "http");
      result.isHttps = result.protocol === "https";
      result.domain = url ? url.hostname : null;
      result.isIp = result.domain ? /^(\d{1,3}\.){3}\d{1,3}$/.test(result.domain) : false;
      result.paramCount = url ? Array.from(url.searchParams.keys()).length : 0;

      if (result.domain && !result.isIp) {
        const parts = result.domain.split(".");
        result.tld = parts.length > 1 ? parts[parts.length - 1] : null;
        result.subdomain = parts.length > 2 ? parts.slice(0, parts.length - 2).join(".") : null;
      }
      result.isShortener = result.domain ? SHORTENERS.some((s) => result.domain === s || result.domain.endsWith("." + s)) : false;

      // sub-classify recognizable app/service links
      const appInfo = detectAppFromUrl(result.domain, text);
      if (appInfo) {
        result.purpose = appInfo.purpose;
        result.app = appInfo.app;
      } else {
        result.purpose = "Opens a website in your browser.";
      }

      result.fields = {
        "Full URL": text,
      };
      return result;
    }

    // --- Plain text fallback ---
    result.type = "text";
    result.typeLabel = "Plain Text";
    result.purpose = "This QR code just contains text — it doesn't open or trigger anything by itself.";
    return result;
  }

  function unescapeQr(str) {
    return str.replace(/\\([\\;,:])/g, "$1");
  }

  function safeParseUrl(text) {
    try { return new URL(text); } catch (e) { return null; }
  }

  function isLikelyBareDomain(text) {
    // e.g. "example.com/path" with no protocol and no spaces
    return /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/[^\s]*)?$/i.test(text.trim()) && !text.includes(" ") && text.length < 300;
  }

  function detectAppFromUrl(domain, fullText) {
    if (!domain) return null;
    const d = domain.toLowerCase();
    const map = [
      { test: (h) => h === "wa.me" || h.endsWith("whatsapp.com"), app: "WhatsApp", purpose: "Opens a WhatsApp chat." },
      { test: (h) => h === "t.me" || h.endsWith("telegram.org") || h.endsWith("telegram.me"), app: "Telegram", purpose: "Opens a Telegram chat or channel." },
      { test: (h) => h.endsWith("instagram.com"), app: "Instagram", purpose: "Opens an Instagram profile or post." },
      { test: (h) => h.endsWith("facebook.com") || h === "fb.me", app: "Facebook", purpose: "Opens a Facebook page or post." },
      { test: (h) => h.endsWith("youtube.com") || h === "youtu.be", app: "YouTube", purpose: "Opens a YouTube video or channel." },
      { test: (h) => h.endsWith("phonepe.com") || h === "phon.pe", app: "PhonePe", purpose: "Opens PhonePe — likely a payment or link action." },
      { test: (h) => h.endsWith("paytm.com") || h === "paytm.me", app: "Paytm", purpose: "Opens Paytm — likely a payment or link action." },
      { test: (h) => h.endsWith("google.com") || h === "g.co" || h === "goo.gl", app: "Google", purpose: "Opens a Google service." },
      { test: (h) => h.endsWith("amazon.in") || h.endsWith("amazon.com") || h === "amzn.to", app: "Amazon", purpose: "Opens an Amazon product or page." },
      { test: (h) => h.endsWith("flipkart.com") || h === "fkrt.it", app: "Flipkart", purpose: "Opens a Flipkart product or page." },
      { test: (h) => h.endsWith("github.com"), app: "GitHub", purpose: "Opens a GitHub repository or page." },
      { test: (h) => h.endsWith("linkedin.com"), app: "LinkedIn", purpose: "Opens a LinkedIn profile or post." },
      { test: (h) => h.endsWith("twitter.com") || h.endsWith("x.com"), app: "X (Twitter)", purpose: "Opens a post or profile on X." },
      { test: (h) => h.endsWith("npci.org.in") || h.endsWith("bhimupi.org.in"), app: "BHIM / NPCI", purpose: "Relates to a BHIM/UPI payment service." },
    ];
    const match = map.find((m) => m.test(d));
    return match ? { app: match.app, purpose: match.purpose } : null;
  }

  /* ------------------------------------------------------------------
     7. BRAND DETECTION
  ------------------------------------------------------------------ */
  const OFFICIAL_BRANDS = [
    "phonepe.com", "paytm.com", "google.com", "wa.me", "whatsapp.com", "t.me",
    "telegram.org", "youtube.com", "youtu.be", "amazon.in", "amazon.com",
    "flipkart.com", "instagram.com", "facebook.com", "github.com", "linkedin.com",
    "twitter.com", "x.com", "npci.org.in",
  ];

  // UPI handle suffix → likely issuing app (best-effort heuristic, not authoritative)
  const UPI_HANDLE_MAP = [
    { suffix: "ybl", app: "PhonePe" }, { suffix: "ibl", app: "PhonePe" }, { suffix: "axl", app: "PhonePe" },
    { suffix: "paytm", app: "Paytm" },
    { suffix: "okhdfcbank", app: "Google Pay" }, { suffix: "okaxis", app: "Google Pay" },
    { suffix: "oksbi", app: "Google Pay" }, { suffix: "okicici", app: "Google Pay" },
    { suffix: "apl", app: "Amazon Pay" },
    { suffix: "upi", app: "Generic UPI / BHIM" },
  ];

  function detectBrand(parsed) {
    if (parsed.type === "url" && parsed.domain) {
      const isOfficial = OFFICIAL_BRANDS.some((b) => parsed.domain === b || parsed.domain.endsWith("." + b));
      return {
        known: isOfficial,
        label: isOfficial ? (parsed.app ? `Official ${parsed.app} domain` : "Recognized official domain") : "Unrecognized / unofficial domain",
      };
    }
    if (parsed.type === "upi" && parsed.upiHandle) {
      const suffix = parsed.upiHandle.split("@")[1] || "";
      const match = UPI_HANDLE_MAP.find((m) => suffix.toLowerCase().includes(m.suffix));
      return {
        known: !!match,
        label: match ? `Likely linked to ${match.app}` : "Payment handle not in our known-app list",
      };
    }
    return { known: null, label: "Not applicable for this QR type" };
  }

  /* ------------------------------------------------------------------
     8. RISK ENGINE
  ------------------------------------------------------------------ */
  function computeRisk(parsed) {
    let score = 0;
    const flags = [];

    const addFlag = (severity, points, message) => {
      score += points;
      flags.push({ severity, message });
    };

    // Falls back to the raw key name if QRVLang isn't loaded for some
    // reason — defensive only, should never actually happen since
    // lang.js loads before this file.
    const T = (key, vars) => (window.QRVLang ? window.QRVLang.t(key, vars) : key);

    if (parsed.type === "url") {
      if (!parsed.isHttps) {
        addFlag("high", 25, T("httpNotHttps"));
      } else {
        addFlag("info", 0, T("httpsConfirmed"));
      }

      if (parsed.isIp) {
        addFlag("critical", 30, T("linkIsRawIp"));
      }

      if (/@/.test(parsed.url.replace(/^https?:\/\//i, ""))) {
        addFlag("critical", 30, T("urlHasAtSymbol"));
      }

      const len = parsed.raw.length;
      if (len > 150) addFlag("medium", 20, T("urlVeryLong", { len }));
      else if (len > 90) addFlag("low", 10, T("urlLongerThanTypical", { len }));

      if (parsed.paramCount > 6) {
        addFlag("medium", 10, T("urlManyParams", { count: parsed.paramCount }));
      }

      if (parsed.isShortener) {
        addFlag("medium", 15, T("urlIsShortened"));
      }

      if (parsed.domain && /xn--/i.test(parsed.domain)) {
        addFlag("high", 20, T("domainPunycode"));
      }

      if (parsed.subdomain && parsed.subdomain.split(".").length >= 3) {
        addFlag("medium", 10, T("domainDeepSubdomain"));
      }

      const hostForKeywords = (parsed.domain || "") + " " + parsed.raw;
      const foundKeywords = SUSPICIOUS_KEYWORDS.filter((kw) => new RegExp(kw, "i").test(hostForKeywords));
      if (foundKeywords.length) {
        const pts = Math.min(foundKeywords.length * 8, 32);
        addFlag(foundKeywords.length >= 3 ? "high" : "medium", pts,
          T("containsScamKeywords", { keywords: foundKeywords.slice(0, 5).join(", ") }));
      }

      // brand impersonation heuristic: known brand word appears in domain, but domain isn't the official one
      const brandWords = ["phonepe", "paytm", "google", "whatsapp", "amazon", "flipkart", "instagram", "facebook", "youtube", "bank", "sbi", "hdfc", "icici"];
      const domainLower = (parsed.domain || "").toLowerCase();
      const isOfficial = OFFICIAL_BRANDS.some((b) => domainLower === b || domainLower.endsWith("." + b));
      const mentionsBrand = brandWords.some((w) => domainLower.includes(w));
      if (mentionsBrand && !isOfficial) {
        addFlag("critical", 35, T("domainBrandMismatch"));
      }

      // Social-platform username/path impersonation — a legitimate platform
      // domain (facebook.com, twitter.com/x.com, instagram.com, t.me, etc.)
      // says nothing about who owns the *profile*. Scam accounts routinely
      // pick usernames that borrow a bank/authority's name plus "support"
      // wording, or a fake military/romance persona — check the path too.
      const SOCIAL_PLATFORM_DOMAINS = ["facebook.com", "twitter.com", "x.com", "instagram.com", "t.me", "telegram.org", "linkedin.com"];
      const isSocialPlatform = SOCIAL_PLATFORM_DOMAINS.some((d) => domainLower === d || domainLower.endsWith("." + d));
      if (isSocialPlatform) {
        const pathPart = (parsed.raw || "").replace(/^https?:\/\//i, "").split("/").slice(1).join("/").toLowerCase();
        const pathNormalized = pathPart.replace(/[._-]/g, " ");

        const ORG_NAMES = ["sbi", "hdfc", "icici", "axis", "paytm", "rbi", "irctc", "lic", "cybercrime", "income tax", "customs", "police"];
        const SUPPORT_WORDS = ["support", "help", "helpdesk", "care", "service", "official", "verified", "helpline", "24x7", "24 7"];
        const orgHit = ORG_NAMES.find((o) => pathNormalized.includes(o));
        const supportHit = SUPPORT_WORDS.find((s) => pathNormalized.includes(s));
        if (orgHit && supportHit) {
          addFlag("critical", 40, T("socialOrgImpersonation", { org: orgHit, word: supportHit }));
        }

        const MILITARY_RANKS = ["capt", "captain", "major", "colonel", "general", "lieutenant", "sergeant"];
        const MILITARY_ORGS = ["us army", "usarmy", "army", "navy", "marine", "peacekeeping", "un mission"];
        const rankHit = MILITARY_RANKS.find((r) => pathNormalized.includes(r));
        const orgMilHit = MILITARY_ORGS.find((o) => pathNormalized.includes(o));
        if (rankHit && orgMilHit) {
          addFlag("critical", 35, T("romanceScamPattern"));
        }
      }

      if (!flags.some((f) => f.severity !== "info")) {
        addFlag("info", 0, T("noDangerInLinkStructure"));
      }
    }

    if (parsed.type === "upi") {
      addFlag("info", 5, T("upiCheckPayeeName"));
      if (parsed.fields["Amount"] && parsed.fields["Amount"] !== "Not fixed (you'll be asked)") {
        addFlag("low", 5, T("upiPrefilledAmount"));
      }

      // --- Strict risk-tuning rules (deceptive VPA / support-name / urgency combos) ---
      const DECEPTIVE_VPA_TERMS = ["refund", "support", "helpline", "customercare", "kyc", "verify", "cashback", "reward"];
      const vpaLower = (parsed.upiHandle || "").toLowerCase();
      if (DECEPTIVE_VPA_TERMS.some((term) => vpaLower.includes(term))) {
        addFlag("critical", 30, T("upiDeceptiveVpa", { vpa: parsed.upiHandle }));
        addFlag("info", 0, T("scamWarningUpiFraud"));
      }

      const payeeNameLower = (parsed.upiPayeeName || "").toLowerCase();
      const looksLikeSupportName = /customer\s*care|support\s*team|help\s*desk|refund\s*team/i.test(payeeNameLower);
      if (parsed.upiAmount && parsed.upiAmount >= 5000 && looksLikeSupportName) {
        addFlag("critical", 35, T("upiRefundScamPattern", { amount: parsed.upiAmount }));
        addFlag("info", 0, T("scamWarningUpiFraud"));
      }

      const URGENT_NOTE_TERMS = ["immediate kyc", "urgent", "blocked", "will be blocked", "account suspend", "verify now"];
      const noteLower = (parsed.upiNote || "").toLowerCase();
      if (URGENT_NOTE_TERMS.some((term) => noteLower.includes(term))) {
        addFlag("high", 25, T("upiUrgentNote", { note: parsed.upiNote }));
      }
    }

    if (parsed.type === "wifi") {
      const security = (parsed.fields["Security"] || "").toLowerCase();
      if (!security || security === "nopass") {
        addFlag("medium", 20, T("wifiOpenNetwork"));
      }
    }

    if (parsed.type === "crypto") {
      addFlag("medium", 15, T("cryptoIrreversible"));
    }

    if (parsed.type === "text") {
      addFlag("info", 0, T("plainTextLowRisk"));
    }

    if (parsed.type === "unknown") {
      addFlag("low", 10, T("contentFormatUnrecognized"));
    }

    score = Math.max(0, Math.min(100, Math.round(score)));
    let level = "low";
    if (score >= 75) level = "critical";
    else if (score >= 50) level = "high";
    else if (score >= 25) level = "medium";

    return { score, level, flags };
  }

  /* ------------------------------------------------------------------
     9. HUMAN-LANGUAGE EXPLANATION
  ------------------------------------------------------------------ */
  function buildExplanation(parsed, risk, brand) {
    const T = (key, vars) => (window.QRVLang ? window.QRVLang.t(key, vars) : key);
    const sentences = [];

    switch (parsed.type) {
      case "url":
        sentences.push(parsed.app ? T("qrExplUrlWithApp", { app: parsed.app }) : T("qrExplUrlPlain"));
        sentences.push(parsed.isHttps ? T("qrExplHttps") : T("qrExplHttp"));
        if (parsed.isShortener) sentences.push(T("qrExplShortener"));
        if (brand.known === false) sentences.push(T("qrExplUnknownBrand"));
        break;
      case "upi":
        sentences.push(
          parsed.fields["Payee name"] && parsed.fields["Payee name"] !== "—"
            ? T("qrExplUpiWithPayee", { payee: parsed.fields["Payee name"] })
            : T("qrExplUpiNoPayee")
        );
        sentences.push(T("qrExplUpiConfirm"));
        break;
      case "wifi":
        sentences.push(T("qrExplWifi", { ssid: parsed.fields["Network (SSID)"] }));
        break;
      case "vcard":
        sentences.push(T("qrExplVcard"));
        break;
      case "calendar":
        sentences.push(T("qrExplCalendar"));
        break;
      case "email":
        sentences.push(T("qrExplEmail"));
        break;
      case "sms":
        sentences.push(T("qrExplSms"));
        break;
      case "phone":
        sentences.push(T("qrExplPhone"));
        break;
      case "location":
        sentences.push(T("qrExplLocation"));
        break;
      case "crypto":
        sentences.push(T("qrExplCrypto"));
        break;
      case "text":
        sentences.push(T("qrExplTextPlain"));
        break;
      default:
        sentences.push(T("qrExplUnclassified"));
    }

    if (risk.level === "low") sentences.push(T("qrExplRiskLow"));
    else if (risk.level === "medium") sentences.push(T("qrExplRiskMedium"));
    else if (risk.level === "high") sentences.push(T("qrExplRiskHigh"));
    else if (risk.level === "critical") sentences.push(T("qrExplRiskCritical"));

    return sentences.join(" ");
  }

  return { parseQRContent, detectBrand, computeRisk, buildExplanation };
})();
