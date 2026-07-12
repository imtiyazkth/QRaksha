/* ==========================================================================
   VERIFICATION-ENGINE.JS
   Self-contained inspection engine for the 6 "What do you want to check?"
   category cards. 100% local-first — no paid/key-gated API is called
   without your own key, and every check degrades gracefully to local
   pattern matching if a network call fails or times out.

   HONESTY NOTE ON EXTERNAL APIS:
   - PhishTank's live API and Numverify's phone-lookup API both require a
     free API key that only YOU can generate (they're tied to your own
     account/email, so a placeholder key here would just fail silently).
     This file is wired to accept your key once you have one
     (see PHONE_LOOKUP_API_KEY / PHISHTANK_API_KEY below) — until then it
     automatically and silently uses the local-only path, which already
     covers the large majority of real-world scam patterns via regex +
     signature matching.
   ========================================================================== */

window.QRVVerification = (function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. LOCAL INTELLIGENCE MATRIX
  ------------------------------------------------------------------ */
  const INTEL = {
    // TLDs disproportionately used for throwaway phishing domains.
    // (Not a blanket ban — a .xyz site isn't automatically a scam, this
    // only raises the risk score when combined with other signals.)
    SUSPICIOUS_TLDS: [".xyz", ".top", ".click", ".win", ".bit", ".bet", ".loan", ".gq", ".tk", ".ml", ".cf", ".rest", ".icu", ".cam", ".surf", ".cyou", ".buzz", ".sbs", ".cfd", ".party", ".date", ".stream", ".download", ".zip", ".mov"],

    // Reported keyword patterns from the National Cyber Crime Portal's
    // public awareness advisories.
    SCAM_KEYWORDS: [
      "part-time job", "part time job", "telegram-earn", "telegram earn",
      "fedex-package", "fedex package", "customs-clearance", "customs clearance",
      "electricity-bill-blocked", "electricity bill blocked", "bijli bill",
      "task-bonus", "task bonus", "vip-investment", "vip investment",
      "double-money", "double money", "money doubling", "guaranteed returns",
      "work from home", "daily income", "join our vip group", "crypto doubling",
      "kbc lottery", "whatsapp lottery", "customs officer", "parcel seized",
      "digital arrest", "aadhaar suspended", "sim block", "kyc update",
    ],

    // Verified Indian bank / institution SMS header suffixes (the 6-char
    // alphanumeric part after the DLT prefix, e.g. VM-SBIINB).
    VERIFIED_BANK_HEADERS: [
      "SBIINB", "SBIBNK", "HDFCBK", "ICICIB", "AXISBK", "PNBSMS", "PAYTM",
      "KOTAKB", "CANBNK", "UNIONB", "BOIIND", "IDBIBK", "YESBNK", "INDUSB",
      "RBLBNK", "IPPBNK", "AIRBNK",
    ],

    // Domains that mimic official-looking support addresses but ride on
    // free public mail providers — a strong spoofing signal.
    FREE_MAIL_DOMAINS: ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "rediffmail.com", "aol.com"],

    // Disposable / temporary email providers.
    DISPOSABLE_MAIL_DOMAINS: [
      "10minutemail.com", "temp-mail.org", "tempmail.com", "mailinator.com",
      "guerrillamail.com", "throwawaymail.com", "yopmail.com", "fakeinbox.com",
    ],

    // Prefixes commonly used to fake official support addresses on free mail.
    SPOOF_SUPPORT_PREFIXES: [
      "support-sbi", "sbi-support", "support-hdfc", "hdfc-support",
      "support-icici", "icici-support", "support-paytm", "paytm-support",
      "customs-clearance", "income-tax", "incometax-refund", "fedex-support",
      "bluedart-support", "electricity-board",
    ],

    // Generic customer-support-style names/handles common in refund scams.
    SUPPORT_IMPERSONATION_TERMS: ["customer care", "customer support", "helpdesk", "refund team", "verification team", "kyc team"],

    // Well-known brands frequently impersonated in phishing domains/emails,
    // and their real domains (so we don't flag the genuine site).
    BRANDS: [
      { name: "amazon",   real: ["amazon.com", "amazon.in"] },
      { name: "flipkart", real: ["flipkart.com"] },
      { name: "sbi",      real: ["sbi.co.in", "onlinesbi.sbi", "onlinesbi.com"] },
      { name: "hdfc",     real: ["hdfcbank.com"] },
      { name: "icici",    real: ["icicibank.com"] },
      { name: "axis",     real: ["axisbank.com"] },
      { name: "paytm",    real: ["paytm.com"] },
      { name: "irctc",    real: ["irctc.co.in"] },
      { name: "lic",      real: ["licindia.in"] },
      { name: "google",   real: ["google.com"] },
      { name: "microsoft",real: ["microsoft.com"] },
      { name: "whatsapp", real: ["whatsapp.com"] },
      { name: "incometax",real: ["incometax.gov.in"] },
      { name: "rbi",      real: ["rbi.org.in"] },
      { name: "kbc",      real: [] }, // "KBC lottery" is always a scam pattern, no legitimate KBC domain exists
      { name: "phonepe",  real: ["phonepe.com"] },
      { name: "kotak",    real: ["kotak.com"] },
      { name: "pnb",      real: ["pnbindia.in"] },
      { name: "airtel",   real: ["airtel.in"] },
      { name: "jio",      real: ["jio.com"] },
      { name: "netflix",  real: ["netflix.com"] },
      { name: "apple",    real: ["apple.com"] },
      { name: "paypal",   real: ["paypal.com"] },
      { name: "fedex",    real: ["fedex.com"] },
      { name: "dhl",      real: ["dhl.com"] },
      { name: "indiapost",real: ["indiapost.gov.in"] },
      { name: "uidai",    real: ["uidai.gov.in"] },
      { name: "epfo",     real: ["epfindia.gov.in"] },
      { name: "irs",      real: ["irs.gov"] },
      { name: "coinbase", real: ["coinbase.com"] },
      { name: "binance",  real: ["binance.com"] },
    ],

    // Words that, combined with a brand-lookalike domain, strongly signal
    // a phishing/verification-scam page rather than an innocent mention.
    URGENCY_DOMAIN_KEYWORDS: [
      "security", "alert", "verify", "verification", "update", "kyc",
      "suspended", "blocked", "refund", "reward", "prize", "winner",
      "support", "helpdesk", "account", "confirm", "login", "signin",
    ],
  };

  // Normalizes common leetspeak character substitutions (0→o, 1→l/i, 3→e,
  // 5→s, 7→t, 4→a, @→a) so "amaz0n" and "amazon" compare equal. Used for
  // brand-lookalike detection in both the email and URL/website engines.
  function normalizeLeet(str) {
    return str
      .toLowerCase()
      .replace(/0/g, "o")
      .replace(/1/g, "l")
      .replace(/3/g, "e")
      .replace(/5/g, "s")
      .replace(/7/g, "t")
      .replace(/4/g, "a")
      .replace(/@/g, "a");
  }

  // Checks a hostname (or email domain) for brand-impersonation: contains
  // a known brand name (after leetspeak normalization) but isn't that
  // brand's real domain. Returns { brand, boosted } or null.
  function detectBrandImpersonation(hostname) {
    const normalized = normalizeLeet(hostname);
    for (const b of INTEL.BRANDS) {
      if (!normalized.includes(b.name)) continue;
      const isRealDomain = b.real.some((r) => hostname === r || hostname.endsWith(`.${r}`));
      if (isRealDomain) continue;
      const hasUrgencyWord = INTEL.URGENCY_DOMAIN_KEYWORDS.some((k) => normalized.includes(k));
      return { brand: b.name, boosted: hasUrgencyWord };
    }
    return null;
  }

  /* ------------------------------------------------------------------
     Numverify: the free tier's key is never used directly from the
     browser — see functions/phoneLookup.js for why, and the setup guide
     for how to configure NUMVERIFY_API_KEY as a Firebase secret.
     The website-URL check needs no key at all (phishunt.io, free/open).
  ------------------------------------------------------------------ */

  function escapeHtml(str) {
    return window.QRVSanitize && window.QRVSanitize.escapeHtml
      ? window.QRVSanitize.escapeHtml(str)
      : String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function containsAny(haystack, needles) {
    const h = haystack.toLowerCase();
    return needles.filter((n) => h.includes(n.toLowerCase()));
  }

  /* ------------------------------------------------------------------
     2. CORE ROUTER
  ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------
     International Government-Agency Scam Signature Database
     (FBI IC3, CISA, UK Action Fraud/NCSC, UAE TDRA, INTERPOL, Chainalysis,
     CAFC, Qatar MoI, Dubai Police). Loaded once, matched by exact string.
  ------------------------------------------------------------------ */
  let globalSigCache = null;
  async function loadGlobalSignatures() {
    if (globalSigCache) return globalSigCache;
    try {
      const res = await fetch("data/global-scam-signatures.json");
      const data = await res.json();
      globalSigCache = data.category_type_mapping || {};
    } catch (e) {
      globalSigCache = {};
    }
    return globalSigCache;
  }

  async function checkGlobalSignature(input) {
    const db = await loadGlobalSignatures();
    if (db[input]) return db[input];
    const normalized = input.trim().toLowerCase();
    const hit = Object.keys(db).find((k) => k.toLowerCase() === normalized);
    return hit ? db[hit] : null;
  }

  function buildGlobalSignatureVerdict(entry, input) {
    const level = entry.risk_score === "CRITICAL" ? "danger" : entry.risk_score === "HIGH" ? "warn" : "info";
    return {
      level,
      title: `${entry.scam_type} — flagged by ${entry.source_agency}`,
      details: [
        entry.action_payload,
        `Country/region: ${entry.country_origin}. Verify independently at: ${entry.verification_link}`,
      ],
      raw: input,
      riskScore: level === "danger" ? 100 : level === "warn" ? 65 : 30,
      fromGlobalDb: true,
      verificationLink: entry.verification_link,
    };
  }

  async function handleVerificationCheck(category, userInput) {
    const input = (userInput || "").trim();
    if (!input) {
      return { level: "warn", title: "Please enter something to check", details: [], raw: "" };
    }

    try {
      // Layer 0: international government-agency signature database.
      const globalHit = await checkGlobalSignature(input);
      if (globalHit) {
        return buildGlobalSignatureVerdict(globalHit, input);
      }

      // Community layer: instant check against crowd-reported exact
      // matches, before running the slower local regex/keyword analysis.
      if (window.QRVFirebase && window.QRVFirebase.checkScamSignature) {
        const communityHit = await window.QRVFirebase.checkScamSignature(input);
        if (communityHit) {
          return {
            level: "danger",
            title: "Already reported by other QRaksha users as a scam",
            details: [
              `This exact ${category.replace("_", " ").toLowerCase()} was flagged by the community` + (communityHit.note ? `: "${communityHit.note}"` : "."),
              "Community reports are unverified crowd-sourced signals — still confirm independently before acting.",
            ],
            raw: input,
            riskScore: 100,
            fromCommunity: true,
          };
        }
      }

      switch (category) {
        case "WEBSITE_URL": return verifyWebsiteLink(input);
        case "WHATSAPP_TELEGRAM": return verifyChatLink(input);
        case "PHONE_NUMBER": return await verifyPhoneNumberRemote(input);
        case "EMAIL_ID": return verifyEmailAddress(input);
        case "SMS_HEADER": return verifySMSHeader(input);
        case "SOCIAL_MEDIA": return verifySocialMediaProfile(input);
        default:
          return { level: "warn", title: "Unknown category", details: [], raw: input };
      }
    } catch (err) {
      // A bug in one checker must never break the scanner/app around it.
      console.warn("QRVVerification: check failed, returning safe fallback", err);
      return {
        level: "warn",
        title: "Couldn't complete an automated check",
        details: ["Something went wrong running this check locally. Please verify manually via official channels before trusting this."],
        raw: input,
      };
    }
  }

  /* ------------------------------------------------------------------
     3A. WEBSITE URL ENGINE
  ------------------------------------------------------------------ */
  async function verifyWebsiteLink(input) {
    let hostname = input;
    let fullUrl = input;
    try {
      const withProto = /^https?:\/\//i.test(input) ? input : `https://${input}`;
      hostname = new URL(withProto).hostname.toLowerCase();
      fullUrl = withProto;
    } catch (e) {
      return { level: "warn", title: "That doesn't look like a valid URL", details: ["Double-check the link and try again."], raw: input };
    }

    const details = [];
    let riskScore = 0;

    const isRawIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
    if (isRawIp) {
      riskScore += 30;
      details.push("The link points directly to an IP address instead of a domain name — a common phishing technique.");

      // AbuseIPDB — OPT-IN ONLY, unlike Google Safe Browsing above.
      // AbuseIPDB keys cannot be restricted by domain/referrer, so
      // shipping one in public client-side code lets anyone who views
      // page source steal it and drain your free quota. This only
      // activates if you've explicitly set window.QRV_ABUSEIPDB_KEY
      // yourself (never injected by the GitHub Actions workflow, on
      // purpose) — an informed choice you make, not a default.
      const abuseResult = await checkAbuseIPDB(hostname);
      if (abuseResult.message) {
        riskScore += 40;
        details.unshift(abuseResult.message);
      }
      details.push(`[Debug] AbuseIPDB: ${abuseResult.debug}`);
    }

    const tldHit = INTEL.SUSPICIOUS_TLDS.find((tld) => hostname.endsWith(tld));
    if (tldHit) {
      riskScore += 25;
      details.push(`Uses "${tldHit}" — a top-level domain frequently abused for short-lived phishing sites (not proof alone, but raises risk).`);
    }

    const keywordHits = containsAny(input, INTEL.SCAM_KEYWORDS);
    if (keywordHits.length) {
      riskScore += 35;
      details.push(`Contains reported scam-pattern wording: "${keywordHits[0]}".`);
    }

    // Lookalike-brand detection: brand name present (leetspeak-aware) but not the real domain.
    const brandHit = detectBrandImpersonation(hostname);
    if (brandHit) {
      riskScore += brandHit.boosted ? 55 : 30;
      details.push(
        brandHit.boosted
          ? `Domain imitates "${brandHit.brand}" and pairs it with urgency wording (security/alert/verify/etc.) — a strong phishing pattern. This is not ${brandHit.brand}'s real domain.`
          : `Domain mentions "${brandHit.brand}" but isn't that brand's real domain — a classic lookalike-brand phishing pattern.`
      );
    }

    // Excess subdomains / hyphens — fast-flux-style disposable hosting.
    const subdomainCount = hostname.split(".").length - 2;
    if (subdomainCount >= 2 || (hostname.match(/-/g) || []).length >= 3) {
      riskScore += 15;
      details.push("Unusually long/hyphenated hostname structure, often seen in auto-generated phishing subdomains.");
    }

    // Live free threat-feed cross-check (phishunt.io — no key needed).
    const feedHit = await checkPhishuntFeed(hostname);
    if (feedHit) {
      riskScore += 50;
      details.unshift(feedHit); // most important signal first
    }

    // Google Safe Browsing — only runs if a referrer-restricted key has
    // been configured (see config.js). Silently skipped otherwise.
    const gsbHit = await checkGoogleSafeBrowsing(fullUrl, hostname);
    if (gsbHit) {
      riskScore += 60;
      details.unshift(gsbHit);
    }
    // Visible confirmation of whether the key loaded at all — helps
    // debugging from the UI alone without needing devtools on mobile.
    // Safe to remove once you've confirmed it's working.
    const gsbConfigured = Boolean(window.QRVConfig && window.QRVConfig.GOOGLE_SAFE_BROWSING_KEY);
    details.push(gsbConfigured ? "[Debug] Google Safe Browsing: key loaded, checked live." : "[Debug] Google Safe Browsing: no key loaded — skipped.");

    if (!details.length) details.push("No known suspicious TLD, brand-lookalike, or scam keyword pattern found in this URL, and it's not on the live phishunt.io threat feed.");

    return buildVerdict(riskScore, hostname, details, "URL");
  }

  /* ------------------------------------------------------------------
     Google Safe Browsing lookup — free tier, requires an HTTP-referrer-
     restricted API key (see config.js / runtime-config.js). If no key
     is configured, this silently returns null so the app degrades
     gracefully to the free offline + phishunt checks above.
  ------------------------------------------------------------------ */
  async function checkGoogleSafeBrowsing(fullUrl, hostname) {
    const apiKey = window.QRVConfig && window.QRVConfig.GOOGLE_SAFE_BROWSING_KEY;
    if (!apiKey) return null;
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 3500);
      // Check both the exact URL (path matters — many real phishing
      // pages and Google's own test URLs only trigger on a specific
      // path, not the bare domain) and the http:// variant of it.
      const httpVariant = fullUrl.replace(/^https:\/\//i, "http://");
      const res = await fetch(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            client: { clientId: "qraksha", clientVersion: "1.0" },
            threatInfo: {
              threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
              platformTypes: ["ANY_PLATFORM"],
              threatEntryTypes: ["URL"],
              threatEntries: [{ url: fullUrl }, { url: httpVariant }, { url: hostname }],
            },
          }),
        }
      );
      clearTimeout(t);
      if (!res.ok) return null;
      const data = await res.json();
      if (data && Array.isArray(data.matches) && data.matches.length) {
        const types = [...new Set(data.matches.map((m) => m.threatType))].join(", ");
        return `Flagged by Google Safe Browsing: ${types}.`;
      }
      return null;
    } catch (e) {
      return null; // offline / timed out / not configured — other checks still apply
    }
  }

  /* ------------------------------------------------------------------
     AbuseIPDB — OPT-IN ONLY. See the comment at the call site for why
     this is deliberately NOT wired into the GitHub Actions secret
     injection pattern used for Google Safe Browsing above. To use this,
     set window.QRV_ABUSEIPDB_KEY = "your-key" yourself in a script tag
     you control (e.g. a local-only override, or a value you accept the
     exposure risk for) — knowing that risk is on you, not silently
     assumed.
  ------------------------------------------------------------------ */
  async function checkAbuseIPDB(ip) {
    const apiKey = window.QRV_ABUSEIPDB_KEY;
    if (!apiKey) return { message: null, debug: "no key loaded — skipped" };
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=90`, {
        headers: { Key: apiKey, Accept: "application/json" },
        signal: controller.signal,
      });
      clearTimeout(t);
      if (!res.ok) {
        return { message: null, debug: `HTTP ${res.status} from AbuseIPDB — likely bad/expired key, or a CORS block if status is 0/opaque` };
      }
      const data = await res.json();
      const score = data && data.data ? data.data.abuseConfidenceScore : null;
      if (score === null) {
        return { message: null, debug: `unexpected response shape: ${JSON.stringify(data).slice(0, 120)}` };
      }
      if (score >= 25) {
        return { message: `AbuseIPDB reports a ${score}% abuse confidence score for this IP address (${data.data.totalReports || 0} reports).`, debug: `checked live, score=${score}%` };
      }
      return { message: null, debug: `checked live, score=${score}% (below 25% threshold)` };
    } catch (e) {
      return { message: null, debug: `fetch failed — ${e.name === "AbortError" ? "timed out" : "likely CORS-blocked by the browser, since AbuseIPDB's API may not allow direct browser calls"} (${e.message || e})` };
    }
  }

  /* ------------------------------------------------------------------
     phishunt.io live check — free, no API key, CORS-enabled. Replaces
     the PhishTank API (new-user registration has been closed since 2020
     and remains closed) as the live phishing-feed cross-check. Also
     cross-references PhishTank/OpenPhish/Google-Safe-Browsing/urlscan.io
     internally, so this single free call covers more ground than the
     old PhishTank-only lookup would have.
  ------------------------------------------------------------------ */
  async function checkPhishuntFeed(hostname) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`https://phishunt.io/api/v1/domains?limit=5&q=${encodeURIComponent(hostname)}`, { signal: controller.signal });
      clearTimeout(t);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data || !data.count || !Array.isArray(data.results)) return null;

      // CRITICAL: the API's `q` search can be loose/fuzzy or, in some
      // response shapes, may return unrelated "recent" entries rather
      // than a true match. Never trust results[0] blindly — only treat
      // this as a hit if a returned entry's own URL/domain field
      // genuinely contains (or is contained by) the hostname we asked
      // about. This is what previously caused false positives like
      // "console.cloud.google.com" being flagged via an unrelated
      // "facebook" entry that happened to be first in the response.
      const hit = data.results.find((r) => {
        const candidate = ((r.url || r.domain || "") + "").toLowerCase();
        if (!candidate) return false;
        return candidate.includes(hostname) || hostname.includes(candidate.replace(/^https?:\/\//, "").split("/")[0]);
      });
      if (!hit) return null;

      return `Listed on the live phishunt.io threat feed (aggregates PhishTank/OpenPhish/Google Safe Browsing/urlscan.io) — first seen ${hit.first_seen ? hit.first_seen.slice(0, 10) : "recently"}${hit.company ? `, impersonating "${hit.company}"` : ""}.`;
    } catch (e) {
      return null; // offline / timed out — local checks above still apply
    }
  }

  /* ------------------------------------------------------------------
     3B. WHATSAPP / TELEGRAM ENGINE
  ------------------------------------------------------------------ */
  function verifyChatLink(input) {
    const details = [];
    let riskScore = 0;

    const isInvite = /(t\.me\/|wa\.me\/|chat\.whatsapp\.com\/)/i.test(input);
    if (isInvite) {
      riskScore += 10;
      details.push("This is a group/channel invite link — invite links bypass normal contact checks, so verify the group's purpose independently before joining.");
    }

    const keywordHits = containsAny(input, INTEL.SCAM_KEYWORDS);
    if (keywordHits.length) {
      riskScore += 40;
      details.push(`Matches a reported task-scam / investment-scam pattern: "${keywordHits[0]}".`);
    }

    const supportHits = containsAny(input, INTEL.SUPPORT_IMPERSONATION_TERMS);
    if (supportHits.length) {
      riskScore += 25;
      details.push(`Uses a generic "official support"-style name ("${supportHits[0]}") — impersonation of customs/police/bank officials in group admin names is a widely reported pattern (per Chakshu/Sanchar Saathi advisories).`);
    }

    if (!details.length) details.push("No known scam-recruitment or impersonation keyword pattern detected in this text.");

    return buildVerdict(riskScore, input, details, "chat handle/link");
  }

  /* ------------------------------------------------------------------
     3C. PHONE NUMBER ENGINE (async, with local fallback)
  ------------------------------------------------------------------ */
  async function verifyPhoneNumberRemote(input) {
    const digits = input.replace(/[^\d]/g, "");
    const details = [];
    let riskScore = 0;

    if (digits.length < 10) {
      return { level: "warn", title: "That doesn't look like a complete phone number", details: [], raw: input };
    }

    // Real carrier/line-type lookup, via our own Cloud Function proxy —
    // Numverify's free tier is HTTP-only, and a browser on our HTTPS site
    // can't call an http:// endpoint directly (blocked as mixed content),
    // so this always goes through the server-side proxy instead.
    if (window.QRVConfig && window.QRVConfig.FUNCTIONS_BASE_URL) {
      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(`${window.QRVConfig.FUNCTIONS_BASE_URL}/phoneLookup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number: digits }),
          signal: controller.signal,
        });
        clearTimeout(t);
        if (res.ok) {
          const data = await res.json();
          if (data && data.valid) {
            details.push(`Carrier: ${data.carrier || "Unknown"}, Location: ${data.location || "Unknown"}, Line type: ${data.line_type || "Unknown"}.`);
            if (data.line_type === "voip" || data.line_type === "tollfree") {
              riskScore += 35;
              details.push("Registered as a VoIP/toll-free virtual line — frequently used to mask a scammer's real identity and location.");
            }
          }
        }
        // Any non-OK status (503 = key not configured yet, 502/504 = upstream
        // issue) is silently absorbed here — the local fallback below always
        // runs regardless, so the user still gets a useful answer.
      } catch (e) {
        details.push("Live carrier lookup unavailable right now — showing local pattern analysis only.");
      }
    }

    // Local fallback pattern analysis (always runs, even with a key).
    const isRepeatingSeries = /^(\d)\1{9}$/.test(digits.slice(-10));
    if (isRepeatingSeries) {
      riskScore += 20;
      details.push("Number is a suspicious repeating-digit series, uncommon for genuine personal or business lines.");
    }
    const looksLikeVoipPrefix = /^(140|160|180)/.test(digits.slice(-10));
    if (looksLikeVoipPrefix) {
      riskScore += 15;
      details.push("Prefix pattern is commonly associated with automated telemarketing/bulk-dialer series.");
    }

    if (!details.length) details.push("No known high-risk pattern found for this number via local analysis. Live carrier lookup was not run (no API key configured) — this does not confirm the number is safe.");

    return buildVerdict(riskScore, digits, details, "phone number");
  }

  /* ------------------------------------------------------------------
     3D. EMAIL ID ENGINE
  ------------------------------------------------------------------ */
  function verifyEmailAddress(input) {
    const details = [];
    let riskScore = 0;
    const email = input.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { level: "warn", title: "That doesn't look like a valid email address", details: [], raw: input };
    }

    const [localPart, domain] = email.split("@");

    if (INTEL.DISPOSABLE_MAIL_DOMAINS.some((d) => domain.endsWith(d))) {
      riskScore += 30;
      details.push("Uses a disposable/temporary email provider — legitimate businesses don't use throwaway addresses.");
    }

    if (INTEL.FREE_MAIL_DOMAINS.some((d) => domain === d)) {
      const spoofHit = INTEL.SPOOF_SUPPORT_PREFIXES.find((p) => localPart.includes(p));
      if (spoofHit) {
        riskScore += 40;
        details.push(`Local part ("${localPart}") mimics an official support address but is hosted on a free public mail provider (${domain}) — no genuine bank/courier/tax authority uses Gmail/Yahoo for official support.`);
      } else {
        details.push(`Hosted on a free public mail provider (${domain}) — not inherently unsafe, but be cautious if this claims to be an "official" address.`);
      }
    }

    // Brand-lookalike domain detection (catches leetspeak tricks like
    // "amaz0n-security-alert.com" that plain substring matching misses).
    const brandHit = detectBrandImpersonation(domain);
    if (brandHit) {
      riskScore += brandHit.boosted ? 55 : 35;
      details.push(
        brandHit.boosted
          ? `Domain ("${domain}") imitates "${brandHit.brand}" and pairs it with urgency wording (security/alert/verify/etc.) — a strong phishing pattern. This is not ${brandHit.brand}'s real domain.`
          : `Domain ("${domain}") mentions "${brandHit.brand}" but is not that brand's real domain — a lookalike-brand pattern.`
      );
    }

    if (!details.length) details.push("No known disposable-domain or support-impersonation pattern found.");

    return buildVerdict(riskScore, email, details, "email address");
  }

  /* ------------------------------------------------------------------
     3E. SMS SENDER HEADER ENGINE
  ------------------------------------------------------------------ */
  function verifySMSHeader(input) {
    const details = [];
    let riskScore = 0;
    const raw = input.trim().toUpperCase();

    // Standard TRAI DLT format: 2-letter prefix - 6 char alphanumeric, e.g. VM-SBIINB
    const headerMatch = raw.match(/^([A-Z]{2})-([A-Z0-9]{1,8})$/);
    const isPlainNumber = /^\+?\d{10,13}$/.test(raw.replace(/\s/g, ""));

    if (headerMatch) {
      const suffix = headerMatch[2];
      if (suffix.length !== 6) {
        riskScore += 20;
        details.push(`Header suffix "${suffix}" is ${suffix.length} characters — genuine TRAI-registered bank headers are exactly 6 characters. Non-standard length is a spoofing signal.`);
      }
      const looksLikeBank = /BK|BNK|SBI|HDFC|ICICI|AXIS|PNB|BANK/.test(suffix);
      if (looksLikeBank && !INTEL.VERIFIED_BANK_HEADERS.includes(suffix)) {
        riskScore += 30;
        details.push(`"${suffix}" looks like it's impersonating a bank header but isn't in the known verified list — treat any "urgent account action" SMS from it with suspicion.`);
      } else if (INTEL.VERIFIED_BANK_HEADERS.includes(suffix)) {
        details.push(`"${suffix}" matches a known verified bank SMS header pattern.`);
      }
    } else if (isPlainNumber) {
      riskScore += 35;
      details.push("This is a plain 10-digit personal mobile number, not a registered alphanumeric header. If the message content claims to be an automated bank alert, electricity disconnection notice, or similar official communication, that is a strong SMS-spoofing red flag — genuine automated alerts always come from registered alphanumeric headers, never a personal mobile number.");
    } else {
      details.push("Couldn't parse this as a standard TRAI header (XX-XXXXXX) or a 10-digit number — double-check the format.");
    }

    if (!details.length) details.push("No spoofing pattern detected.");

    return buildVerdict(riskScore, raw, details, "SMS header");
  }

  /* ------------------------------------------------------------------
     3F. SOCIAL MEDIA PROFILE ENGINE
  ------------------------------------------------------------------ */
  function verifySocialMediaProfile(input) {
    const details = [];
    let riskScore = 0;
    const lower = input.toLowerCase();

    const keywordHits = containsAny(input, INTEL.SCAM_KEYWORDS);
    if (keywordHits.length) {
      riskScore += 30;
      details.push(`Matches a reported scam-pattern keyword: "${keywordHits[0]}".`);
    }

    const GIVEAWAY_TERMS = ["giveaway", "airdrop", "double your", "claim now", "verified winner", "elonmusk", "official_", "_official"];
    const giveawayHits = containsAny(input, GIVEAWAY_TERMS);
    if (giveawayHits.length) {
      riskScore += 25;
      details.push(`Contains a pattern common to fake-giveaway/crypto-doubling or celebrity-impersonation profiles: "${giveawayHits[0]}".`);
    }

    // Excess digits/underscores in a handle is a common clone-account signal.
    const handleMatch = lower.match(/(?:instagram|facebook|x)\.com\/([a-z0-9_.]+)/);
    if (handleMatch) {
      const handle = handleMatch[1];
      const digitCount = (handle.match(/\d/g) || []).length;
      if (digitCount >= 4) {
        riskScore += 15;
        details.push(`Handle "${handle}" contains an unusually high number of digits — often seen in mass-produced clone/bot accounts impersonating real profiles.`);
      }
    }

    if (!details.length) details.push("No known clone-account or fake-giveaway pattern found in this link.");

    return buildVerdict(riskScore, input, details, "social profile");
  }

  /* ------------------------------------------------------------------
     Shared verdict builder
  ------------------------------------------------------------------ */
  function buildVerdict(riskScore, subject, details, subjectType) {
    let level = "safe";
    let title = `No known risk pattern found for this ${subjectType}`;
    if (riskScore >= 60) { level = "danger"; title = `High-risk ${subjectType} — treat as likely fraud`; }
    else if (riskScore >= 30) { level = "warn"; title = `Suspicious ${subjectType} — proceed with caution`; }
    else if (riskScore > 0) { level = "info"; title = `Minor caution flags found for this ${subjectType}`; }

    return { level, title, details, raw: subject, riskScore };
  }

  /* ------------------------------------------------------------------
     4. VERDICT CARD RENDERER — with inline AI chat prompt + footer notice
  ------------------------------------------------------------------ */
  const LEVEL_STYLES = {
    safe:   { border: "border-emerald-400/60", bg: "bg-gradient-to-br from-emerald-600 to-emerald-700", text: "text-white", subtext: "text-emerald-50", icon: "✅" },
    info:   { border: "border-sky-500/40",     bg: "bg-sky-500/10",                                     text: "text-sky-400",   subtext: "text-neutral-300", icon: "ℹ️" },
    warn:   { border: "border-amber-500/50",   bg: "bg-gradient-to-br from-amber-500/25 to-amber-600/10", text: "text-amber-300", subtext: "text-neutral-200", icon: "⚠️" },
    danger: { border: "border-red-400/60",     bg: "bg-gradient-to-br from-red-700 to-red-800",         text: "text-white",     subtext: "text-red-50",  icon: "🛑" },
  };

  function renderVerdictCard(containerId, verdict, onAskAi, options) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const style = LEVEL_STYLES[verdict.level] || LEVEL_STYLES.info;
    const showGovtLink = options && options.showGovtRegistryLink;
    const bold = verdict.level === "danger" || verdict.level === "safe";

    container.innerHTML = `
      <div class="rounded-2xl border ${style.border} ${style.bg} p-4 transition-all duration-300 ease-out animate-[fadeIn_.25s_ease-out] ${bold ? "shadow-lg" : ""}">
        <div class="flex items-start gap-2 mb-2">
          <span class="text-lg" aria-hidden="true">${style.icon}</span>
          <p class="font-semibold text-sm ${style.text}">${escapeHtml(verdict.title)}</p>
        </div>
        ${verdict.raw ? `<p class="text-[11px] font-mono ${bold ? style.subtext : "text-neutral-400"} break-all mb-2 opacity-90">${escapeHtml(verdict.raw)}</p>` : ""}
        <ul class="space-y-1.5 mb-3">
          ${verdict.details.map((d) => `<li class="text-xs ${bold ? style.subtext : "text-neutral-300"} leading-relaxed flex gap-1.5"><span class="opacity-60">•</span><span>${escapeHtml(d)}</span></li>`).join("")}
        </ul>

        ${showGovtLink ? `
        <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer"
           class="flex items-center gap-2 w-full rounded-xl bg-[#0B2E6B] hover:bg-[#0d3680] text-white text-xs font-semibold px-4 py-3 mb-3 transition">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-5 h-5 shrink-0"><circle cx="12" cy="12" r="9" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke-width="1.6" stroke-linecap="round"/></svg>
          <span class="flex-1 text-left">Verify via National Cyber Crime Suspect Registry / राष्ट्रीय साइबर अपराध रजिस्ट्री द्वारा जांचें</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-3.5 h-3.5 shrink-0"><path d="M7 17L17 7M9 7h8v8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <p class="text-[10px] text-neutral-500 mb-3 leading-relaxed">Opens the official portal in a new tab. It can't be embedded inside the app (the government's own site blocks embedding, for its users' security) — this is expected browser behavior, not an app error.</p>
        ` : ""}

        ${verdict.level === "danger" && !verdict.fromCommunity ? `
        <button type="button" data-verdict-report-scam
          class="w-full rounded-xl border border-red-500/40 text-red-400 text-xs font-semibold px-4 py-2.5 mb-3">
          🚩 Report this as a scam — help warn other users
        </button>
        ` : ""}

        <div class="qrv-ai-chat-prompt ${bold ? "!bg-black/20 !border-white/20" : ""}">
          <p class="text-xs ${bold ? "text-white" : "text-neutral-300"} flex-1">🤖 Want to know how to respond? Ask our AI Assistant...</p>
          <button type="button" data-verdict-ask-ai class="shrink-0">Chat with AI</button>
        </div>

        <p class="text-[10px] leading-relaxed ${bold ? "text-white/70" : "text-neutral-500"} mt-3 pt-3 border-t ${bold ? "border-white/20" : "border-line"}">
          हम अपने उपयोगकर्ताओं की सुरक्षा के लिए संबंधित सरकारी विनियामक प्राधिकरणों के साथ सीधे संरचनात्मक एकीकरण और आधिकारिक साझेदारी स्थापित करने के लिए सक्रिय रूप से प्रयासरत हैं।
        </p>
      </div>
    `;

    const askBtn = container.querySelector("[data-verdict-ask-ai]");
    if (askBtn && typeof onAskAi === "function") {
      askBtn.addEventListener("click", () => onAskAi(verdict));
    }
    const reportBtn = container.querySelector("[data-verdict-report-scam]");
    if (reportBtn) {
      reportBtn.addEventListener("click", async () => {
        reportBtn.disabled = true;
        reportBtn.textContent = "Reporting\u2026";
        try {
          if (window.QRVFirebase && window.QRVFirebase.reportScamSignature) {
            await window.QRVFirebase.reportScamSignature(verdict.raw, options && options.category, verdict.title);
            reportBtn.textContent = "\u2713 Reported — thank you";
          } else {
            reportBtn.textContent = "Reporting unavailable right now";
          }
        } catch (e) {
          reportBtn.textContent = "Couldn't report — try again later";
          reportBtn.disabled = false;
        }
      });
    }
    container.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return { handleVerificationCheck, renderVerdictCard, INTEL, checkGlobalSignature, buildGlobalSignatureVerdict };
})();
