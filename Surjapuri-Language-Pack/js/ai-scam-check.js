/* ==========================================================================
   AI-SCAM-CHECK.JS — Tier 3 orchestration
   Runs Tier 1 (offline) + Tier 2 (free intel) always. Only calls the
   Cloud Function (Tier 3 / Mesh AI) if config says it's available AND the
   user has consented. Combines results conservatively: the most cautious
   verdict from any tier that ran wins, and each tier's contribution is
   labeled so the user can see where each flag came from.
   ========================================================================== */

window.QRVAiScamCheck = (function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const { escapeHtml, setText } = window.QRVSanitize;
  const SEVERITY_WEIGHT = { info: 5, low: 20, medium: 45, high: 70, critical: 95 };

  /* ------------------------------------------------------------------
     Offline heuristic scorer for free-text messages (Tier 1's message
     counterpart to the QR risk-engine's computeRisk — same idea,
     different rule set, and it must work with zero network).
  ------------------------------------------------------------------ */
  const OFFLINE_MESSAGE_RULES = [
    { pattern: /digital arrest/i, severity: "critical", message: "\u2018Digital arrest\u2019 is not a real legal process in India \u2014 this is a known scam script." },
    { pattern: /(cbi|narcotics|customs) (officer|department)/i, severity: "high", message: "Claims to be from a central investigation agency over chat/call \u2014 a major red flag for impersonation scams." },
    { pattern: /aadhaar.{0,20}(linked|suspend|block)/i, severity: "high", message: "Threats about your Aadhaar being linked to a crime are a widespread fraud pattern." },
    { pattern: /kyc.{0,20}(expire|update|suspend|block)/i, severity: "medium", message: "Urgent KYC-update demands via link/message are a common phishing pattern." },
    { pattern: /(otp|one.time.password)/i, severity: "high", message: "Never share an OTP with anyone \u2014 no legitimate bank or agency will ever ask for it." },
    { pattern: /anydesk|teamviewer|remote.{0,10}access/i, severity: "critical", message: "Requests to install remote-access software are extremely common in fraud calls that later drain bank accounts." },
    { pattern: /(courier|parcel).{0,25}(illegal|drugs|seized|customs)/i, severity: "high", message: "Fake courier/customs seizure notices are a well-documented scam pattern." },
    { pattern: /(loan|emi).{0,20}(overdue|legal action|arrest)/i, severity: "medium", message: "Threatening loan-recovery language pressuring immediate payment is a common fraud pattern." },
    { pattern: /video call.{0,20}(uniform|police|court)/i, severity: "high", message: "Fraudsters often stage a fake uniformed 'video call' to appear legitimate \u2014 no real agency arrests people this way." },
  ];

  function offlineMessageCheck(text) {
    const flags = [];
    OFFLINE_MESSAGE_RULES.forEach((rule) => {
      if (rule.pattern.test(text)) {
        flags.push({ severity: rule.severity, message: rule.message, source: "offline" });
      }
    });
    return { flags };
  }

  /* ------------------------------------------------------------------
     If the pasted text IS a bare URL (nothing else), also run it through
     the sharper URL-specific engine (suspicious TLDs, lookalike brands,
     fast-flux subdomain patterns, phishunt.io live feed, global
     government-signature database) — the generic message rules above
     only look for known scam PHRASES, so a link like "https://blocklog.xyz"
     with no scam wording in it previously showed "no risk found" even
     though the TLD/structure itself is a real signal.
  ------------------------------------------------------------------ */
  async function urlSpecificCheck(text) {
    const trimmed = text.trim();
    const isBareUrl = /^https?:\/\/\S+$/i.test(trimmed) && !/\s/.test(trimmed);
    if (!isBareUrl || !window.QRVVerification) return [];
    try {
      const verdict = await window.QRVVerification.handleVerificationCheck("WEBSITE_URL", trimmed);
      if (!verdict || !verdict.details) return [];
      const severity = verdict.level === "danger" ? "critical" : verdict.level === "warn" ? "high" : verdict.level === "info" ? "medium" : "low";
      return verdict.details
        .filter((d) => !d.startsWith("No known")) // skip the "all clear" filler line
        .map((d) => ({ severity, message: d, source: "url-engine" }));
    } catch (e) {
      return [];
    }
  }

  function scoreFromFlags(flags) {
    if (!flags.length) return 5;
    return Math.min(100, Math.max(...flags.map((f) => SEVERITY_WEIGHT[f.severity] || 10)));
  }

  function verdictFromScore(score) {
    if (score >= 80) return { level: "critical", label: "Confirmed Scam Pattern" };
    if (score >= 55) return { level: "high", label: "High Risk" };
    if (score >= 25) return { level: "medium", label: "Suspicious" };
    return { level: "low", label: "Low Risk" };
  }

  /* ------------------------------------------------------------------
     Tier 3 — calls the Cloud Function. Assumes caller already checked
     config.aiUsable(). Fails soft: any error here must never throw up
     to the UI as a broken state, only as "AI unavailable this time."
  ------------------------------------------------------------------ */
  async function callAiCheckMessage(text) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(`${window.QRVConfig.FUNCTIONS_BASE_URL}/checkMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: window.QRVSanitize.normalizeForAiInput(text),
          lang: window.QRVLang ? window.QRVLang.currentLangForAi() : "English",
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`checkMessage ${res.status}`);
      return await res.json(); // expected: { score, level, explanation, matchedPattern }
    } catch (err) {
      clearTimeout(timeout);
      return null; // caller treats null as "AI unavailable this time"
    }
  }

  /* ------------------------------------------------------------------
     Combine tiers conservatively: highest severity wins, all shown.
  ------------------------------------------------------------------ */
  function combineResults({ offline, freeIntel, ai }) {
    const allFlags = [...offline.flags, ...freeIntel.flags];
    let score = scoreFromFlags(allFlags);
    let explanation = allFlags.length
      ? "Offline and open threat-intel checks found known scam indicators in this content."
      : "No known scam indicators found by offline or open threat-intel checks.";
    let source = "[Internet Source Data / Offline Mode]";

    if (ai) {
      // AI can only ever raise the score / add detail, never silently
      // lower a critical/high verdict already established by Tier 1/2.
      const aiScore = typeof ai.score === "number" ? ai.score : scoreFromFlags(allFlags);
      score = Math.max(score, aiScore);
      if (ai.explanation) explanation = ai.explanation;
      source = "[AI Analysis Result]";
      if (ai.matchedPattern) {
        allFlags.push({ severity: "high", message: `Matches known pattern: ${ai.matchedPattern}`, source: "ai" });
      }
    }

    const verdict = verdictFromScore(score);
    return { score, verdict, flags: allFlags, explanation, source };
  }

  /* ------------------------------------------------------------------
     Full pipeline for the Message/Screenshot Check tab
  ------------------------------------------------------------------ */
  async function runMessageCheck(text) {
    const offline = offlineMessageCheck(text);
    const urlFlags = await urlSpecificCheck(text);
    offline.flags = [...offline.flags, ...urlFlags];
    const freeIntel = await window.QRVFreeIntel.checkText(text);
    let result = combineResults({ offline, freeIntel, ai: null });
    renderMessageResult(result, { aiRan: false });

    // Offer AI Advance Opinion only if it's actually usable right now
    const showAiButton = window.QRVConfig.state.aiAvailable;
    $("btnAiSecondOpinionMsg").hidden = !showAiButton;
    $("aiUnavailableBanner").hidden = window.QRVConfig.state.aiAvailable;

    $("btnAiSecondOpinionMsg").onclick = () => {
      window.QRVConsent.requireConsent(async () => {
        $("btnAiSecondOpinionMsg").disabled = true;
        $("btnAiSecondOpinionMsg").textContent = "Checking with AI\u2026";
        const ai = await callAiCheckMessage(text);
        $("btnAiSecondOpinionMsg").disabled = false;
        $("btnAiSecondOpinionMsg").textContent = "Get AI Advance Opinion";
        if (!ai) {
          $("aiUnavailableBanner").hidden = false;
          return;
        }
        const combined = combineResults({ offline, freeIntel, ai });
        renderMessageResult(combined, { aiRan: true });
      });
    };

    return result;
  }

  function renderMessageResult(result, { aiRan }) {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference * (1 - result.score / 100);
    const gaugeValue = $("msgRiskGaugeValue");
    if (gaugeValue) {
      gaugeValue.style.strokeDasharray = String(circumference);
      gaugeValue.style.strokeDashoffset = String(offset);
      gaugeValue.setAttribute("data-level", result.verdict.level);
    }
    if ($("msgRiskScoreNumber")) setText($("msgRiskScoreNumber"), result.score);
    if ($("msgRiskVerdictChip")) {
      setText($("msgRiskVerdictChip"), result.verdict.label);
      $("msgRiskVerdictChip").setAttribute("data-level", result.verdict.level);
    }
    setText($("msgSourceHeading"), result.source);
    setText($("msgExplanation"), result.explanation);
    $("msgReportSection").hidden = false;

    const flagsEl = $("msgRiskFlags");
    flagsEl.innerHTML = "";
    result.flags.forEach((f) => {
      const div = document.createElement("div");
      div.className = "qrv-flag";
      div.setAttribute("data-severity", f.severity);
      const span = document.createElement("span");
      span.className = "qrv-flag__source";
      span.textContent = f.source === "ai" ? "AI" : f.source === "free-intel" ? "Open Intel" : "Offline";
      const msg = document.createElement("span");
      msg.textContent = f.message; // textContent, never innerHTML — safe even if this came from AI output
      div.appendChild(span);
      div.appendChild(msg);
      flagsEl.appendChild(div);
    });

    // Voice accessibility — same pattern as the QR scan and category-
    // check result cards: auto-speak a short alert immediately, and
    // wire the replay button to read the full explanation + flags
    // on demand, as many times as the user wants.
    if (window.QRVVoice) {
      const level = result.verdict.level;
      if (level === "danger") window.QRVVoice.speakDangerAlert();
      else if (level === "warn") window.QRVVoice.speakWarnAlert();
      else window.QRVVoice.speakSafeAlert();

      const replayBtn = $("btnReplayMsgResult");
      if (replayBtn) {
        replayBtn.onclick = () => {
          const flagTexts = result.flags.map((f) => f.message).join(". ");
          window.QRVVoice.speak([result.explanation, flagTexts].filter(Boolean).join(". "));
        };
      }
    }
    // Sound feedback — same centralized engine used everywhere else.
    if (window.QRVSound) {
      const level = result.verdict.level;
      if (level === "danger") window.QRVSound.playDanger();
      else if (level === "warn") window.QRVSound.playWarning();
      else window.QRVSound.playSuccess();
    }
  }

  /* ------------------------------------------------------------------
     Ambiguous-QR escalation — wired from app.js once a QR scan lands in
     the 25-75 band. Reuses the same message-check pipeline against the
     decoded QR text (not the raw image).
  ------------------------------------------------------------------ */
  function wireQrSecondOpinion(getDecodedText) {
    const btn = $("btnAiSecondOpinionQr");
    btn.onclick = () => {
      window.QRVConsent.requireConsent(async () => {
        btn.disabled = true;
        btn.textContent = "Checking with AI\u2026";
        if (window.QRVSound) window.QRVSound.playClick();
        const ai = await callAiCheckMessage(getDecodedText());
        btn.disabled = false;
        btn.textContent = "Get AI Advance Opinion";
        if (!ai) {
          window.QRVUtils && window.QRVUtils.toast && window.QRVUtils.toast("AI check unavailable right now.");
          if (window.QRVSound) window.QRVSound.playError();
          return;
        }
        const explanation = ai.explanation || $("qrExplanation").textContent;
        setText($("qrExplanation"), explanation);
        if (window.QRVSound) window.QRVSound.playSuccess();
        if (window.QRVVoice) window.QRVVoice.speak(explanation);
      });
    };
  }

  return { runMessageCheck, offlineMessageCheck, wireQrSecondOpinion };
})();
