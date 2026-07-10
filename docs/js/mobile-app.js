/* ==========================================================================
   MOBILE-APP.JS  — QRaksha v2 Production Build
   Entrypoint for the mobile UI. Drives the scan → result pipeline,
   message-check tab, QR generator, settings, founder modal and boot sequence.

   CHANGED IN THIS BUILD
   ─────────────────────
   1. Audio engine: 4 distinct pulses at 800 Hz / 80 ms / 50 ms gap (was 2 × 880 Hz).
      Audio fires synchronously BEFORE the result card renders so the tactile
      feedback lands at the exact moment of decode, not after the DOM paint.
   2. Dual-tier connectivity gate: navigator.onLine (fast) →
      lightweight ping to confirm real internet (robust). Result label
      switches between "[INTERNET SOURCE DATA]" and
      "[INTERNET SOURCE DATA / OFFLINE MODE]" accordingly.
   3. "Scan Another" button wired to fully reset the camera + result state.
   4. Settings modal: enforces smooth kinetic scrolling on Android WebView.
   5. Boot restores saved theme + accent without a FOUC.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const { setText } = window.QRVSanitize;

  /* ====================================================================
     AUDIO ENGINE
     Shared AudioContext singleton.
     Mobile browsers (Chrome Android, iOS Safari) suspend a new
     AudioContext until the first user gesture. We create one lazily on
     the first touch/click, then reuse it for every beep. This prevents
     the "first beep is always silent" regression that plagued the old
     per-beep approach.
  ==================================================================== */
  let _audioCtx = null;

  function getAudioCtx() {
    if (!_audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      _audioCtx = new Ctx();
    }
    if (_audioCtx.state === "suspended") {
      _audioCtx.resume().catch(() => {});
    }
    return _audioCtx;
  }

  // Unlock on very first interaction so every subsequent beep works.
  document.addEventListener("touchstart", () => getAudioCtx(), { once: true, passive: true });
  document.addEventListener("click",      () => getAudioCtx(), { once: true });

  /* --------------------------------------------------------------------
     playTutTutSound  — danger / suspicious QR alert
     Spec:  4 pulses · 800 Hz · 80 ms ON · 50 ms gap · square wave
     The sound fires SYNCHRONOUSLY with audio scheduling so pulse 1 lands
     at ctx.currentTime + 0 (immediately), not after a setTimeout.
  -------------------------------------------------------------------- */
  function playTutTutSound() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;

      const FREQ     = 800;   // Hz
      const DURATION = 0.080; // 80 ms
      const GAP      = 0.050; // 50 ms gap between pulses
      const PULSES   = 4;
      const GAIN_PEAK = 0.20;

      for (let i = 0; i < PULSES; i++) {
        const t0 = ctx.currentTime + i * (DURATION + GAP);
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type          = "square";
        osc.frequency.value = FREQ;

        // Sharp attack, very fast decay to avoid clipping artifacts on
        // low-end phone speakers.
        gain.gain.setValueAtTime(0.001, t0);
        gain.gain.linearRampToValueAtTime(GAIN_PEAK, t0 + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + DURATION);

        osc.connect(gain).connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + DURATION + 0.004); // tiny tail to prevent pop
      }
    } catch (e) {
      // Audio is never allowed to block the UI.
    }
  }

  /* --------------------------------------------------------------------
     playSuccessChime  — safe / low-risk QR confirmation
  -------------------------------------------------------------------- */
  function playSuccessChime() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type            = "sine";
      osc.frequency.value = 1320;
      gain.gain.setValueAtTime(0.10, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.19);
    } catch (e) {}
  }

  /* ====================================================================
     DUAL-TIER CONNECTIVITY CHECK
     Tier 1 — navigator.onLine (instant, but lies on captive portals and
               hotspot-connected-but-no-real-internet scenarios)
     Tier 2 — lightweight HEAD fetch to a well-known always-up endpoint
               with a 3-second abort timeout. We use 'no-cors' mode so
               CORS can never block us; the request completing (not
               throwing) is proof of internet access.

     Returns: Promise<boolean>  (true = real internet, false = offline)
  ==================================================================== */
  async function checkConnectivity() {
    // Fast path: browser is explicitly offline.
    if (typeof navigator.onLine === "boolean" && !navigator.onLine) return false;

    // Ping path: actually test internet reachability.
    try {
      const ctrl    = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 3000);
      await fetch("https://www.gstatic.com/generate_204", {
        method: "HEAD",
        mode:   "no-cors",
        cache:  "no-store",
        signal: ctrl.signal,
      });
      clearTimeout(timeout);
      return true;
    } catch {
      return false;
    }
  }

  /* ====================================================================
     TAB NAVIGATION
  ==================================================================== */
  let scannerStarted = false;

  function activateTab(tabId) {
    document.querySelectorAll(".tab-panel").forEach((el) => {
      el.hidden = el.id !== tabId;
    });
    document.querySelectorAll(".qrv-navbtn[data-tab]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === tabId);
    });
    if (tabId === "tabScan") {
      if (!scannerStarted) {
        scannerStarted = true;
        window.QRVScanner.start();
      } else {
        window.QRVScanner.resumeScanning();
      }
    }
  }

  document.querySelectorAll(".qrv-navbtn[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  if ($("btnGoMessageCheck")) {
    $("btnGoMessageCheck").addEventListener("click", () => activateTab("tabMessage"));
  }

  /* ====================================================================
     CAMERA CONTROLS  (torch · switch · aspect · zoom · upload)
  ==================================================================== */
  $("btnTorch").addEventListener("click",        () => window.QRVScanner.toggleTorch());
  $("btnSwitchCamera").addEventListener("click", () => window.QRVScanner.switchCamera());
  $("btnAspectToggle").addEventListener("click", () => window.QRVScanner.toggleAspect());
  $("zoomSlider").addEventListener("input", (e)  => window.QRVScanner.setZoom(e.target.value));
  $("uploadInput").addEventListener("change", () => {
    const file = $("uploadInput").files[0];
    if (file) window.QRVScanner.scanImageFile(file);
  });

  /* ====================================================================
     ROUTE A — QR DECODED HANDLER
     Order of operations (critical — must not be reordered):
       1. Parse QR content (sync, no network)
       2. Play audio alert (sync, fires immediately with AudioContext)
       3. Show instant toast
       4. Check connectivity in background
       5. Render result card (may be slightly async due to connectivity check)
       6. Attempt Firestore signature lookup (best-effort, non-blocking)
  ==================================================================== */
  let lastDecodedText = null;

  window.addEventListener("qrv:qr-decoded", async (e) => {
    lastDecodedText = e.detail.rawText;

    // ── Step 1: Parse, brand detect, compute risk (all local, instant) ──
    const parsed      = window.QRVEngine.parseQRContent(lastDecodedText);
    const brand       = window.QRVEngine.detectBrand(parsed);
    const risk        = window.QRVEngine.computeRisk(parsed);
    const explanation = window.QRVEngine.buildExplanation(parsed, risk, brand);

    // ── Step 2: Audio — fires before ANY async work so user feels it immediately ──
    if (risk.level === "critical" || risk.level === "high" || risk.level === "medium") {
      playTutTutSound();
    } else {
      playSuccessChime();
    }

    // ── Step 3: Instant toast (sync, no await) ──
    showScanToast(risk);

    // ── Step 4: Connectivity check (parallel — doesn't block the toast) ──
    const isOnline = await checkConnectivity();

    // ── Step 5a: Global signature check if Firestore is available ──
    if (window.QRVVerification) {
      try {
        const globalHit = await window.QRVVerification.checkGlobalSignature(
          lastDecodedText.trim()
        );
        if (globalHit) {
          risk.level = "critical";
          risk.score = 100;
          risk.flags = [
            {
              severity: "critical",
              message:  `${globalHit.scam_type} — flagged by ${globalHit.source_agency}. ${globalHit.action_payload}`,
            },
            {
              severity: "critical",
              message:  `Verify independently at: ${globalHit.verification_link}`,
            },
            ...(risk.flags || []),
          ];
        }
      } catch (err) {
        // Signature DB unavailable — local analysis still shown.
      }
    }

    // ── Step 5b: Free-intel URL check if online ──
    let freeIntelFlags = [];
    if (isOnline && parsed.url && window.QRVFreeIntel) {
      try {
        const freeResult = await window.QRVFreeIntel.checkUrl(parsed.url);
        freeIntelFlags = freeResult.flags || [];
        risk.flags = [...(risk.flags || []), ...freeIntelFlags];
        // Re-score if new flags are worse than local heuristics.
        if (freeIntelFlags.some((f) => f.severity === "critical")) {
          risk.score = Math.max(risk.score, 95);
          risk.level = "critical";
        }
      } catch (err) {
        // Free intel unavailable — silently degrade.
      }
    }

    // ── Step 6: Render result card ──
    renderScanResult({ parsed, brand, risk, explanation, isOnline });
  });

  /* ====================================================================
     INSTANT TOAST
  ==================================================================== */
  let _toastTimer = null;

  function showScanToast(risk) {
    const el     = $("qrvToast");
    const textEl = $("qrvToastText");
    if (!el || !textEl) return;

    const LABELS = {
      critical: "⚠️ Dangerous QR detected",
      high:     "⚠️ High risk QR detected",
      medium:   "❓ Suspicious QR — check before opening",
      low:      "✅ Looks safe — low risk",
    };
    textEl.textContent = LABELS[risk.level] || LABELS.low;

    el.style.background  = (risk.level === "critical" || risk.level === "high")
      ? "#EF4444"
      : risk.level === "medium"
        ? "#F5A524"
        : "#22C55E";
    el.style.color       = "#0B0E11";
    el.style.borderColor = "rgba(0,0,0,0.15)";
    el.hidden            = false;

    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => { el.hidden = true; }, 3400);
  }

  /* ====================================================================
     RENDER SCAN RESULT CARD
  ==================================================================== */
  function renderScanResult({ parsed, brand, risk, explanation, isOnline }) {
    // Context line — show app/brand name only when we recognised one.
    const appName     = parsed.app || (brand && brand.known ? brand.label : null);
    const contextLine = appName
      ? `This looks like a ${appName} QR code (${parsed.typeLabel || parsed.type}).`
      : `This is a ${parsed.typeLabel || parsed.type} QR code.`;
    setText($("resultContext"),    contextLine);
    setText($("historicalAudit"), explanation);
    setText($("resultRawContent"), parsed.raw != null ? String(parsed.raw) : "(no content decoded)");

    // Source label — clearly communicates online vs offline path.
    const sourceLabel = isOnline
      ? "[INTERNET SOURCE DATA — live threat-intel active]"
      : "[INTERNET SOURCE DATA / OFFLINE MODE — cached signatures only]";
    setText($("resultSourceLabel"), sourceLabel);

    // Apply the offline-mode highlight so the user can't miss it.
    const sourceLabelEl = $("resultSourceLabel");
    if (sourceLabelEl) {
      sourceLabelEl.classList.toggle("text-warn", !isOnline);
      sourceLabelEl.classList.toggle("text-neutral-500", isOnline);
    }

    // UPI / payment summary block.
    const upiBlock = $("upiSummaryBlock");
    if (upiBlock) {
      if (parsed.type === "upi") {
        upiBlock.hidden = false;
        setText($("upiSummaryPayee"),  parsed.upiPayeeName || parsed.fields["Payee name"] || "Not specified in QR");
        setText($("upiSummaryAmount"), parsed.upiAmount
          ? `₹${Number(parsed.upiAmount).toLocaleString("en-IN")}`
          : "Not fixed — you'll be asked to enter it");
        setText($("upiSummaryVpa"),    parsed.upiHandle || "Not found");
      } else {
        upiBlock.hidden = true;
      }
    }

    // Risk meter SVG circle.
    const pct         = risk.score;
    const radius      = 27;
    const circumference = 2 * Math.PI * radius;
    const offset      = circumference * (1 - pct / 100);
    const circle      = $("riskMeterCircle");
    circle.style.strokeDasharray  = String(circumference);
    circle.style.strokeDashoffset = String(offset);
    const strokeColor = pct >= 80 ? "#EF4444" : pct >= 55 ? "#F5A524" : pct >= 25 ? "#F5A524" : "#22C55E";
    circle.setAttribute("stroke", strokeColor);
    setText($("riskMeterNumber"), `${pct}%`);

    // Risk label — i18n aware.
    const L = window.QRVLang;
    setText($("riskMeterLabel"),
      risk.level === "critical" ? (L ? L.t("confirmedRisk") : "Confirmed Risk")
      : risk.level === "high"   ? (L ? L.t("highRisk")     : "High Risk")
      : risk.level === "medium" ? (L ? L.t("suspicious")   : "Suspicious")
      :                           (L ? L.t("lowRisk")      : "Low Risk")
    );

    // Risk flags list.
    const flagsEl = $("offlineFlagsList");
    flagsEl.innerHTML = "";
    (risk.flags || []).forEach((f) => {
      const div = document.createElement("div");
      div.className = "qrv-flag";
      div.setAttribute("data-severity", f.severity || "medium");
      div.textContent = f.message || f;
      flagsEl.appendChild(div);
    });

    // Show the card and scroll to it.
    $("resultCard").hidden = false;
    $("resultCard").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ====================================================================
     "SCAN ANOTHER" — full state reset
     Clears the result card, flushes all text buffers, resumes the
     camera listener so the next code is decoded fresh.
  ==================================================================== */
  function resetScanState() {
    lastDecodedText = null;

    // Hide result card.
    const card = $("resultCard");
    if (card) card.hidden = true;

    // Clear all text nodes inside the card.
    const clearIds = [
      "resultContext", "historicalAudit", "resultRawContent",
      "resultSourceLabel", "riskMeterNumber", "riskMeterLabel",
      "upiSummaryPayee", "upiSummaryAmount", "upiSummaryVpa",
    ];
    clearIds.forEach((id) => { const el = $(id); if (el) el.textContent = ""; });

    // Reset the risk meter circle to 0.
    const circle = $("riskMeterCircle");
    if (circle) {
      const c = 2 * Math.PI * 27;
      circle.style.strokeDasharray  = String(c);
      circle.style.strokeDashoffset = String(c);
      circle.setAttribute("stroke", "#22C55E");
    }

    // Clear flag list and UPI block.
    const flagsEl = $("offlineFlagsList");
    if (flagsEl) flagsEl.innerHTML = "";
    const upiBlock = $("upiSummaryBlock");
    if (upiBlock) upiBlock.hidden = true;

    // Re-enable AI button.
    const aiBtn = $("btnAnalyzeAI");
    if (aiBtn) {
      aiBtn.disabled    = false;
      aiBtn.textContent = "Analyze with AI — deeper check, instant result";
    }

    // Hide toast.
    const toast = $("qrvToast");
    if (toast) { toast.hidden = true; clearTimeout(_toastTimer); }

    // Resume the camera decode loop.
    window.QRVScanner.resumeScanning();

    // Flash "Ready to scan" status.
    const status = $("scanStatusText");
    if (status) status.textContent = "Ready — point your camera at a QR code.";
  }

  // Wire the "Scan Another" button (rendered inside resultCard in index.html).
  const btnScanAnother = $("btnScanAnother");
  if (btnScanAnother) {
    btnScanAnother.addEventListener("click", resetScanState);
  }

  /* ====================================================================
     ROUTE B — "Analyze with AI" (NOT ad-gated, requires consent)
  ==================================================================== */
  $("btnAnalyzeAI").addEventListener("click", () => {
    window.QRVConsent.requireConsent(async () => {
      $("btnAnalyzeAI").disabled    = true;
      $("btnAnalyzeAI").textContent = "Analyzing…";
      await window.QRVAiScamCheck.runMessageCheck(lastDecodedText || "");
      $("btnAnalyzeAI").disabled    = false;
      $("btnAnalyzeAI").textContent = "Analyze with AI — deeper check, instant result";
      activateTab("tabMessage");
    });
  });

  /* ====================================================================
     "Chat with AI" — pre-fills the message tab with a contextual question
  ==================================================================== */
  if ($("btnAskAiSafety")) {
    $("btnAskAiSafety").addEventListener("click", () => {
      const question = `How can I avoid falling for a scam like this QR code?\n\nDecoded content: ${lastDecodedText || "(none)"}`;
      activateTab("tabMessage");
      const msgInput = $("msgTextInput");
      if (msgInput) msgInput.value = question;
      window.QRVConsent.requireConsent(async () => {
        await window.QRVAiScamCheck.runMessageCheck(question);
      });
    });
  }

  /* ====================================================================
     MESSAGE / SCREENSHOT CHECK TAB
  ==================================================================== */
  function activateMsgTab(which) {
    const textActive = which === "text";
    const tabText  = $("msgTabText");
    const tabImage = $("msgTabImage");
    const panelText  = $("msgPanelText");
    const panelImage = $("msgPanelImage");

    [tabText, tabImage].forEach((btn, idx) => {
      const active = idx === 0 ? textActive : !textActive;
      btn.classList.toggle("bg-amber",  active);
      btn.classList.toggle("text-ink",  active);
      btn.classList.toggle("bg-panel",  !active);
    });
    panelText.hidden  = !textActive;
    panelImage.hidden = textActive;
  }

  $("msgTabText").addEventListener("click",  () => activateMsgTab("text"));
  $("msgTabImage").addEventListener("click", () => activateMsgTab("image"));

  $("msgFileInput").addEventListener("change", () => {
    const file = $("msgFileInput").files[0];
    if ($("msgFileName")) {
      setText($("msgFileName"), file ? `Selected: ${file.name}` : "");
    }
  });

  $("btnCheckMessage").addEventListener("click", async () => {
    const imageMode = !$("msgPanelImage").hidden;

    if (imageMode) {
      const file = $("msgFileInput").files[0];
      if (!file) {
        if ($("msgFileName")) setText($("msgFileName"), "Please choose a screenshot first.");
        return;
      }
      window.QRVConsent.requireConsent(async () => {
        try {
          const reader = new FileReader();
          const base64 = await new Promise((resolve, reject) => {
            reader.onload  = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          const res = await fetch(`${window.QRVConfig.FUNCTIONS_BASE_URL}/checkScreenshot`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ image: base64 }),
          });
          if (!res.ok) throw new Error(`checkScreenshot ${res.status}`);
          const data = await res.json();
          await window.QRVAiScamCheck.runMessageCheck(data.extractedText || "");
        } catch (err) {
          $("aiUnavailableBanner").hidden = false;
          setText(
            $("aiUnavailableBanner"),
            "Could not read this screenshot \u2014 the text-extraction service is unavailable right now. Try pasting the message text instead using the \u201cPaste Message\u201d tab."
          );
        }
      });
      return;
    }

    const text = $("msgTextInput").value.trim();
    if (!text) { $("msgTextInput").focus(); return; }
    await window.QRVAiScamCheck.runMessageCheck(text);
  });

  /* ====================================================================
     QR GENERATOR  (always free to generate; PNG download is ad-gated)
  ==================================================================== */
  const QR_SIZE = 220;

  document.querySelectorAll(".qrv-gen-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      document.querySelectorAll(".qrv-gen-tile").forEach((t) => t.classList.remove("is-active"));
      tile.classList.add("is-active");
      renderGenForm(tile.dataset.kind);
    });
  });

  function field(label, id, type, placeholder) {
    return `<div class="mb-3">
      <label class="block text-xs text-neutral-400 mb-1">${label}</label>
      <input id="${id}" type="${type}" placeholder="${placeholder || ""}"
        class="w-full rounded-xl bg-panel border border-line p-3 text-sm text-neutral-100 placeholder:text-neutral-500">
    </div>`;
  }

  function renderGenForm(kind) {
    const area = $("genFormArea");
    if (!area) return;

    if (kind === "campaign" || kind === "review" || kind === "maps" || kind === "store") {
      const labels = {
        campaign: "Campaign / landing page URL",
        review:   "Google Review link",
        maps:     "Google Maps location link",
        store:    "App / Play Store link",
      };
      const placeholders = {
        campaign: "https://example.com/promo",
        review:   "https://g.page/r/your-place/review",
        maps:     "https://maps.app.goo.gl/...",
        store:    "https://play.google.com/store/apps/details?id=...",
      };
      area.innerHTML = field(labels[kind], "genUrl", "url", placeholders[kind]) +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => genQR($("genUrl").value.trim()));

    } else if (kind === "account") {
      area.innerHTML =
        field("Full name", "genName", "text") +
        field("Phone",     "genPhone", "tel") +
        field("Email",     "genEmail", "email") +
        field("Organization (optional)", "genOrg", "text") +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => {
        const n = $("genName").value.trim(), p = $("genPhone").value.trim(),
              e = $("genEmail").value.trim(), o = $("genOrg").value.trim();
        if (!n) { $("genName").focus(); return; }
        genQR(`BEGIN:VCARD\nVERSION:3.0\nFN:${n}\nORG:${o}\nTEL:${p}\nEMAIL:${e}\nEND:VCARD`);
      });

    } else {
      // social — multi-platform link QR
      area.innerHTML =
        `<p class="text-xs text-neutral-400 mb-3">Add your profiles — they're combined into one QR. Scanning shows all links.</p>` +
        field("Title (optional)", "msTitle", "text", "e.g. Imtiyaz Surjapuri") +
        field("Instagram", "msIg", "url", "https://instagram.com/yourhandle") +
        field("YouTube",   "msYt", "url", "https://youtube.com/@yourchannel") +
        field("Facebook",  "msFb", "url", "https://facebook.com/yourpage") +
        field("X (Twitter)", "msX", "url", "https://x.com/yourhandle") +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => {
        const title = $("msTitle").value.trim() || "My Links";
        const platforms = [
          { label: "Instagram",  val: $("msIg").value.trim() },
          { label: "YouTube",    val: $("msYt").value.trim() },
          { label: "Facebook",   val: $("msFb").value.trim() },
          { label: "X (Twitter)", val: $("msX").value.trim() },
        ].filter((p) => p.val);
        if (!platforms.length) { $("msIg").focus(); return; }
        const text = [title, ...platforms.map((p) => `${p.label}: ${p.val}`)].join("\n");
        genQR(text);
      });
    }
  }

  if ($("genFormArea")) renderGenForm("social");

  function genQR(text) {
    if (!text) return;
    const out = $("genOut");
    if (!out) return;
    if (!window.QRCode) {
      out.innerHTML = `<p class="text-sm text-danger">QR library failed to load — check your connection.</p>`;
      return;
    }
    out.innerHTML = `
      <div id="qrBox" style="display:none"></div>
      <div class="flex justify-center bg-white rounded-2xl p-4 mb-3">
        <canvas id="genCanvas"></canvas>
      </div>
      <button id="genDownload" class="w-full py-3 rounded-2xl border border-amber text-amber font-semibold text-sm">
        Download PNG
      </button>`;

    new window.QRCode($("qrBox"), {
      text, width: QR_SIZE, height: QR_SIZE,
      colorDark: "#0b0f14", colorLight: "#ffffff",
    });

    setTimeout(() => {
      const src    = document.querySelector("#qrBox canvas") || document.querySelector("#qrBox img");
      const canvas = $("genCanvas");
      if (!src || !canvas) return;
      canvas.width  = QR_SIZE;
      canvas.height = QR_SIZE;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, QR_SIZE, QR_SIZE);
      ctx.drawImage(src, 0, 0, QR_SIZE, QR_SIZE);
    }, 30);

    $("genDownload").addEventListener("click", async () => {
      const completed = await window.QRVAdGate.adGate("interstitial");
      if (!completed) return;
      const canvas = $("genCanvas");
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a   = document.createElement("a");
        a.href     = url;
        a.download = "qrcode.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }, "image/png");
    });
  }

  /* ====================================================================
     COMPLAIN NAV BUTTON — opens cybercrime.gov.in, no ad gate ever.
  ==================================================================== */
  $("btnGenerateComplain").addEventListener("click", () => {
    window.open("https://cybercrime.gov.in", "_blank", "noopener,noreferrer");
  });

  /* ====================================================================
     SETTINGS MODAL
     The modal inner div gets explicit scroll rules via JS here as a
     belt-and-suspenders companion to the CSS overrides in index.html,
     because some Android WebViews ignore overflow-y: scroll on elements
     inside a position:fixed parent unless it's also set imperatively.
  ==================================================================== */
  function enforceSettingsScroll() {
    const inner = document.querySelector("#settingsModal > div");
    if (!inner) return;
    inner.style.overflowY              = "scroll";
    inner.style.webkitOverflowScrolling = "touch";
    inner.style.maxHeight              = "90vh";
  }

  $("btnOpenSettings").addEventListener("click", async () => {
    const completed = await window.QRVAdGate.adGate("interstitial");
    if (completed) {
      $("settingsModal").hidden = false;
      enforceSettingsScroll();
    }
  });

  if ($("btnHomeLanguage")) {
    $("btnHomeLanguage").addEventListener("click", () => {
      $("settingsModal").hidden = false;
      enforceSettingsScroll();
      setTimeout(() => {
        const langSection = $("langPickerOptions");
        if (langSection) langSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
    });
  }

  $("btnCloseSettings").addEventListener("click", () => { $("settingsModal").hidden = true; });

  if ($("btnSettingsHome")) {
    $("btnSettingsHome").addEventListener("click", () => {
      $("settingsModal").hidden = true;
      activateTab("tabHome");
    });
  }
  if ($("btnAboutHome")) {
    $("btnAboutHome").addEventListener("click", () => {
      $("settingsModal").hidden = true;
      activateTab("tabHome");
    });
  }

  /* ====================================================================
     THEME ENGINE  — swatch buttons + custom accent colour picker
  ==================================================================== */
  document.querySelectorAll(".qrv-theme-swatch[data-theme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.setAttribute("data-theme", btn.dataset.theme);
      try { localStorage.setItem("qrv-theme", btn.dataset.theme); } catch (e) {}
    });
  });

  const customAccentInput = $("customAccentInput");
  if (customAccentInput) {
    customAccentInput.addEventListener("input", (e) => applyAccent(e.target.value));
  }

  function applyAccent(color) {
    document.documentElement.style.setProperty("--qrv-accent", color);
    try { localStorage.setItem("qrv-accent", color); } catch (e) {}
  }

  /* ====================================================================
     FOUNDER MODAL + PORTFOLIO GRID
  ==================================================================== */
  const FOUNDER_PORTFOLIO = [
    { projectName: "QRVerify",                tagline: "QR scanner & studio",    projectLink: "https://imtiyazkth.github.io/QRVerify/" },
    { projectName: "TeleprompterPro",         tagline: "On-screen teleprompter", projectLink: "https://imtiyazkth.github.io/Teleprompter/" },
    { projectName: "SM 10X",                  tagline: "Private messaging",      projectLink: "https://github.com/imtiyazkth" },
    { projectName: "School Management System",tagline: "Institution admin",      projectLink: "https://github.com/imtiyazkth" },
  ];

  function renderFounderPortfolio() {
    const grid = $("founderPortfolioGrid");
    if (!grid) return;
    grid.innerHTML = "";
    FOUNDER_PORTFOLIO.forEach((p) => {
      const a       = document.createElement("a");
      a.href        = p.projectLink;
      a.target      = "_blank";
      a.rel         = "noopener noreferrer";
      a.className   = "qrv-portfolio-card group flex flex-col justify-between rounded-2xl bg-gradient-to-br from-ink to-panel border border-line p-4 min-h-[92px] shadow-md hover:border-amber/50 transition";
      a.innerHTML   = `
        <span class="flex items-center justify-center w-9 h-9 rounded-lg bg-amber/10 text-amber font-display font-bold text-sm mb-2">
          ${p.projectName.charAt(0)}
        </span>
        <span class="font-display font-semibold text-sm text-neutral-100 leading-tight">${p.projectName}</span>
        <span class="text-[11px] text-neutral-500 mt-0.5">${p.tagline}</span>`;
      grid.appendChild(a);
    });
  }

  function wireFounderModal(openBtnId) {
    const openBtn = $(openBtnId);
    if (!openBtn) return;
    openBtn.addEventListener("click", () => {
      $("founderModal").hidden = false;
      renderFounderPortfolio();
    });
  }

  wireFounderModal("btnOpenFounder");
  wireFounderModal("btnOpenFounderHome");

  if ($("btnCloseFounder")) {
    $("btnCloseFounder").addEventListener("click", () => { $("founderModal").hidden = true; });
  }
  if ($("btnFounderHome")) {
    $("btnFounderHome").addEventListener("click", () => {
      $("founderModal").hidden = true;
      $("settingsModal").hidden = true;
      activateTab("tabHome");
    });
  }

  function wirePrivacyModal(openBtnId) {
    const openBtn = $(openBtnId);
    if (openBtn) openBtn.addEventListener("click", () => { $("privacyModal").hidden = false; });
  }
  wirePrivacyModal("btnOpenPrivacy");
  wirePrivacyModal("btnOpenPrivacyHome");
  if ($("btnClosePrivacy")) {
    $("btnClosePrivacy").addEventListener("click", () => { $("privacyModal").hidden = true; });
  }

  /* ====================================================================
     BOOT SEQUENCE
  ==================================================================== */
  document.addEventListener("DOMContentLoaded", async () => {
    // Restore saved theme immediately to prevent FOUC.
    try {
      const savedTheme = localStorage.getItem("qrv-theme");
      if (savedTheme) document.body.setAttribute("data-theme", savedTheme);

      const savedAccent = localStorage.getItem("qrv-accent");
      if (savedAccent) {
        document.documentElement.style.setProperty("--qrv-accent", savedAccent);
        if ($("customAccentInput")) $("customAccentInput").value = savedAccent;
      }
    } catch (e) {}

    // Init subsystems.
    window.QRVConsent.init();
    window.QRVPanicMode.init();

    // AI status check — non-blocking, updates banner after resolve.
    window.QRVConfig.refreshAiStatus().then((available) => {
      const banner = $("aiUnavailableBanner");
      if (banner) banner.hidden = available;
    });

    if (window.QRVDashboard) window.QRVDashboard.init(activateTab);
    if (window.QRVLang)      window.QRVLang.init();
    if (window.QRVStorySubmit) window.QRVStorySubmit.init();

    // Ensure default tab is Home.
    activateTab("tabHome");
  });
})();
