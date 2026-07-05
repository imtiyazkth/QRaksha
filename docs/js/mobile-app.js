/* ==========================================================================
   MOBILE-APP.JS
   Entrypoint for the redesigned mobile UI. Where ad gates are and are not
   applied is the most important thing in this file to read carefully —
   see the comment above each handler.
   ========================================================================== */

(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const { setText } = window.QRVSanitize;

  /* ------------------------------------------------------------------
     Tab navigation (Point 9)
  ------------------------------------------------------------------ */
  function activateTab(tabId) {
    document.querySelectorAll(".tab-panel").forEach((el) => { el.hidden = el.id !== tabId; });
    document.querySelectorAll(".qrv-navbtn[data-tab]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === tabId);
    });
    if (tabId === "tabScan") window.QRVScanner.resumeScanning();
  }
  document.querySelectorAll(".qrv-navbtn[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });
  $("btnGoMessageCheck").addEventListener("click", () => activateTab("tabMessage"));

  /* ------------------------------------------------------------------
     Camera control wiring (Points 5-8, 10)
  ------------------------------------------------------------------ */
  $("btnTorch").addEventListener("click", () => window.QRVScanner.toggleTorch());
  $("btnSwitchCamera").addEventListener("click", () => window.QRVScanner.switchCamera());
  $("btnAspectToggle").addEventListener("click", () => window.QRVScanner.toggleAspect());
  $("zoomSlider").addEventListener("input", (e) => window.QRVScanner.setZoom(e.target.value));
  $("uploadInput").addEventListener("change", () => {
    const file = $("uploadInput").files[0];
    if (file) window.QRVScanner.scanImageFile(file);
  });

  /* ------------------------------------------------------------------
     Route A — offline QR result (Section 2). Runs automatically,
     free, instant, no ad, no network. This is the default path.
  ------------------------------------------------------------------ */
  let lastDecodedText = null;

  window.addEventListener("qrv:qr-decoded", (e) => {
    lastDecodedText = e.detail.rawText;
    const parsed = window.QRVEngine.parseQRContent(lastDecodedText);
    const brand = window.QRVEngine.detectBrand(parsed);
    const risk = window.QRVEngine.computeRisk(parsed);
    const explanation = window.QRVEngine.buildExplanation(parsed, risk, brand);

    // Instant notification the moment the QR is decoded — before the
    // rest of the result card even finishes rendering below.
    showScanToast(risk);

    renderScanResult({ parsed, brand, risk, explanation });
  });

  /* ------------------------------------------------------------------
     Instant toast + sound on scan. A suspicious/dangerous QR gets a
     short "tut-tut" double-beep; a safe one is silent (no sound spam
     for the common case).
  ------------------------------------------------------------------ */
  let toastTimer = null;
  function showScanToast(risk) {
    const el = $("qrvToast");
    const textEl = $("qrvToastText");
    if (!el || !textEl) return;
    const level = risk.level;
    const label = level === "critical" ? "\u26a0\ufe0f Dangerous QR detected"
      : level === "high" ? "\u26a0\ufe0f High risk QR detected"
      : level === "medium" ? "\u2753 Suspicious QR — check before opening"
      : "\u2705 Looks safe — low risk";
    textEl.textContent = label;
    el.style.background = level === "critical" || level === "high" ? "#EF4444"
      : level === "medium" ? "#F5A524" : "#22C55E";
    el.style.color = "#0B0E11";
    el.style.borderColor = "rgba(0,0,0,0.15)";
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 3200);

    if (level === "critical" || level === "high" || level === "medium") playTutTutSound();
  }

  function playTutTutSound() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const beep = (startTime) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);
        osc.connect(gain).connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.15);
      };
      beep(ctx.currentTime);
      beep(ctx.currentTime + 0.22);
    } catch (e) { /* audio not available — never block the UI for this */ }
  }

  function renderScanResult({ parsed, brand, risk, explanation }) {
    // brand is always an object ({known, label}) from detectBrand — never
    // interpolate it directly (that produced the old "[object Object]"
    // text). Only mention a brand name when we actually recognized one.
    const appName = parsed.app || (brand && brand.known ? brand.label : null);
    const contextLine = appName
      ? `This looks like a ${appName} QR code (${parsed.typeLabel || parsed.type}).`
      : `This is a ${parsed.typeLabel || parsed.type} QR code.`;
    setText($("resultContext"), contextLine);
    setText($("historicalAudit"), explanation);

    const pct = risk.score;
    const circumference = 2 * Math.PI * 27;
    const offset = circumference * (1 - pct / 100);
    const circle = $("riskMeterCircle");
    circle.style.strokeDasharray = String(circumference);
    circle.style.strokeDashoffset = String(offset);
    const color = pct >= 80 ? "#EF4444" : pct >= 55 ? "#F5A524" : pct >= 25 ? "#F5A524" : "#22C55E";
    circle.setAttribute("stroke", color);
    setText($("riskMeterNumber"), `${pct}%`);
    setText($("riskMeterLabel"), risk.level === "critical" ? "Confirmed Risk"
      : risk.level === "high" ? "High Risk" : risk.level === "medium" ? "Suspicious" : "Low Risk");

    const flagsEl = $("offlineFlagsList");
    flagsEl.innerHTML = "";
    (risk.flags || []).forEach((f) => {
      const div = document.createElement("div");
      div.className = "qrv-flag";
      div.setAttribute("data-severity", f.severity || "medium");
      div.textContent = f.message || f;
      flagsEl.appendChild(div);
    });

    $("resultCard").hidden = false;
    $("resultCard").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ------------------------------------------------------------------
     Route B — "Analyze with AI" (Section 2 / Section 3).
     DELIBERATELY NOT AD-GATED. Requires consent, then runs immediately.
     See ad-gate.js and docs/SECURITY.md for why this button is exempt.
  ------------------------------------------------------------------ */
  $("btnAnalyzeAI").addEventListener("click", () => {
    window.QRVConsent.requireConsent(async () => {
      $("btnAnalyzeAI").disabled = true;
      $("btnAnalyzeAI").textContent = "Analyzing\u2026";
      await window.QRVAiScamCheck.runMessageCheck(lastDecodedText || "");
      $("btnAnalyzeAI").disabled = false;
      $("btnAnalyzeAI").textContent = "Analyze with AI — deeper check, instant result";
      activateTab("tabMessage"); // AI result renders into the shared message-report UI
    });
  });

  /* ------------------------------------------------------------------
     Message/Screenshot check tab wiring (unchanged behavior)
  ------------------------------------------------------------------ */
  function activateMsgTab(which) {
    const textActive = which === "text";
    $("msgTabText").classList.toggle("bg-amber", textActive);
    $("msgTabText").classList.toggle("text-ink", textActive);
    $("msgTabText").classList.toggle("bg-panel", !textActive);
    $("msgTabImage").classList.toggle("bg-amber", !textActive);
    $("msgTabImage").classList.toggle("text-ink", !textActive);
    $("msgTabImage").classList.toggle("bg-panel", textActive);
    $("msgPanelText").hidden = !textActive;
    $("msgPanelImage").hidden = textActive;
  }
  $("msgTabText").addEventListener("click", () => activateMsgTab("text"));
  $("msgTabImage").addEventListener("click", () => activateMsgTab("image"));

  // Show immediate feedback that a file was actually picked — previously
  // nothing happened visibly here, so it looked like the tap did nothing.
  $("msgFileInput").addEventListener("change", () => {
    const file = $("msgFileInput").files[0];
    if ($("msgFileName")) setText($("msgFileName"), file ? `Selected: ${file.name}` : "");
  });

  $("btnCheckMessage").addEventListener("click", async () => {
    const imageMode = !$("msgPanelImage").hidden;
    if (imageMode) {
      const file = $("msgFileInput").files[0];
      if (!file) { if ($("msgFileName")) setText($("msgFileName"), "Please choose a screenshot first."); return; }
      window.QRVConsent.requireConsent(async () => {
        try {
          const reader = new FileReader();
          const base64 = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          const res = await fetch(`${window.QRVConfig.FUNCTIONS_BASE_URL}/checkScreenshot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });
          if (!res.ok) throw new Error(`checkScreenshot ${res.status}`);
          const data = await res.json();
          await window.QRVAiScamCheck.runMessageCheck(data.extractedText || "");
        } catch (err) {
          // Text-extraction from an image REQUIRES the backend (there is
          // no offline OCR here) — so unlike pasted text, a failure here
          // genuinely means no result can be shown. Say so clearly instead
          // of silently doing nothing.
          $("aiUnavailableBanner").hidden = false;
          setText($("aiUnavailableBanner"),
            "Could not read this screenshot — the text-extraction service is unavailable right now. Try pasting the message text instead using the \u201cPaste Message\u201d tab.");
        }
      });
      return;
    }
    const text = $("msgTextInput").value.trim();
    if (!text) { $("msgTextInput").focus(); return; }
    await window.QRVAiScamCheck.runMessageCheck(text);
  });

  /* ------------------------------------------------------------------
     Generator suite (Point 14) — real implementation using the
     qrcodejs CDN library. Generating and previewing a QR code is
     always free (no ad); only the PNG download is ad-gated, per
     Section 3 / the notice already shown under the tile grid.
  ------------------------------------------------------------------ */
  const QR_SIZE = 220;
  document.querySelectorAll(".qrv-gen-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      document.querySelectorAll(".qrv-gen-tile").forEach((t) => t.classList.remove("is-active"));
      tile.classList.add("is-active");
      renderGenForm(tile.dataset.kind);
    });
  });

  function renderGenForm(kind) {
    const area = $("genFormArea");
    const field = (label, id, type, placeholder) =>
      `<div class="mb-3"><label class="block text-xs text-neutral-400 mb-1">${label}</label>
       <input id="${id}" type="${type}" placeholder="${placeholder || ""}"
         class="w-full rounded-xl bg-panel border border-line p-3 text-sm text-neutral-100 placeholder:text-neutral-500"></div>`;

    if (kind === "campaign") {
      area.innerHTML = field("Campaign / landing page URL", "genUrl", "url", "https://example.com/promo") +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => genQR($("genUrl").value.trim()));
    } else if (kind === "review") {
      area.innerHTML = field("Google Review link", "genUrl", "url", "https://g.page/r/your-place/review") +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => genQR($("genUrl").value.trim()));
    } else if (kind === "maps") {
      area.innerHTML = field("Google Maps location link", "genUrl", "url", "https://maps.app.goo.gl/...") +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => genQR($("genUrl").value.trim()));
    } else if (kind === "store") {
      area.innerHTML = field("App / Play Store / App Store link", "genUrl", "url", "https://play.google.com/store/apps/details?id=...") +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => genQR($("genUrl").value.trim()));
    } else if (kind === "account") {
      area.innerHTML = field("Full name", "genName", "text") +
        field("Phone", "genPhone", "tel") +
        field("Email", "genEmail", "email") +
        field("Organization (optional)", "genOrg", "text") +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => {
        const n = $("genName").value.trim(), p = $("genPhone").value.trim(),
          e = $("genEmail").value.trim(), o = $("genOrg").value.trim();
        if (!n) { $("genName").focus(); return; }
        genQR(`BEGIN:VCARD\nVERSION:3.0\nFN:${n}\nORG:${o}\nTEL:${p}\nEMAIL:${e}\nEND:VCARD`);
      });
    } else { // social — combine up to 4 profile links into one QR
      area.innerHTML = `<div class="hint text-xs text-neutral-400 mb-3">Add your profiles — we combine them into one QR code. Scanning shows all the links, tap any to open it.</div>` +
        field("Title (optional)", "msTitle", "text", "e.g. Imtiyaz Surjapuri") +
        field("Instagram", "msIg", "url", "https://instagram.com/yourhandle") +
        field("YouTube", "msYt", "url", "https://youtube.com/@yourchannel") +
        field("Facebook", "msFb", "url", "https://facebook.com/yourpage") +
        field("X (Twitter)", "msX", "url", "https://x.com/yourhandle") +
        `<button id="genSubmit" class="w-full py-3 rounded-2xl bg-amber text-ink font-semibold text-sm">Generate QR Code</button>
         <div id="genOut" class="mt-4"></div>`;
      $("genSubmit").addEventListener("click", () => {
        const title = $("msTitle").value.trim() || "My Links";
        const platforms = [
          { label: "Instagram", val: $("msIg").value.trim() },
          { label: "YouTube", val: $("msYt").value.trim() },
          { label: "Facebook", val: $("msFb").value.trim() },
          { label: "X (Twitter)", val: $("msX").value.trim() },
        ].filter((p) => p.val);
        if (!platforms.length) { $("msIg").focus(); return; }
        const text = [title, ...platforms.map((p) => `${p.label}: ${p.val}`)].join("\n");
        genQR(text);
      });
    }
  }
  // Default form shown when the Generate tab first opens
  if ($("genFormArea")) renderGenForm("social");

  function genQR(text) {
    if (!text) return;
    const out = $("genOut");
    if (!out) return;
    if (!window.QRCode) {
      out.innerHTML = `<p class="text-sm text-danger">QR library failed to load — check your connection and try again.</p>`;
      return;
    }
    out.innerHTML = `
      <div id="qrBox" style="display:none"></div>
      <div class="flex justify-center bg-white rounded-2xl p-4 mb-3"><canvas id="genCanvas"></canvas></div>
      <button id="genDownload" class="w-full py-3 rounded-2xl border border-amber text-amber font-semibold text-sm">Download PNG</button>`;
    new window.QRCode($("qrBox"), { text, width: QR_SIZE, height: QR_SIZE, colorDark: "#0b0f14", colorLight: "#ffffff" });
    setTimeout(() => {
      const src = document.querySelector("#qrBox canvas") || document.querySelector("#qrBox img");
      const canvas = $("genCanvas");
      if (!src || !canvas) return;
      canvas.width = QR_SIZE; canvas.height = QR_SIZE;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, QR_SIZE, QR_SIZE);
      ctx.drawImage(src, 0, 0, QR_SIZE, QR_SIZE);
    }, 30);
    $("genDownload").addEventListener("click", async () => {
      const completed = await window.QRVAdGate.adGate("interstitial");
      if (!completed) return;
      const canvas = $("genCanvas");
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "qrcode.png";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }, "image/png");
    });
  }

  /* ------------------------------------------------------------------
     Point 15 — Generate Complain. Zero ad gate, zero delay, ever.
  ------------------------------------------------------------------ */
  $("btnGenerateComplain").addEventListener("click", () => {
    window.open("https://cybercrime.gov.in", "_blank", "noopener,noreferrer");
  });

  /* ------------------------------------------------------------------
     Point 11 — Settings, ad-gated on open (this is a fine, low-stakes
     place for a gate — nothing safety-critical lives behind it).
  ------------------------------------------------------------------ */
  $("btnOpenSettings").addEventListener("click", async () => {
    const completed = await window.QRVAdGate.adGate("interstitial");
    if (completed) $("settingsModal").hidden = false;
  });
  $("btnCloseSettings").addEventListener("click", () => { $("settingsModal").hidden = true; });

  document.querySelectorAll(".qrv-theme-swatch[data-theme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.setAttribute("data-theme", btn.dataset.theme);
      try { localStorage.setItem("qrv-theme", btn.dataset.theme); } catch (e) {}
    });
  });

  const customAccentInput = $("customAccentInput");
  if (customAccentInput) {
    customAccentInput.addEventListener("input", (e) => {
      applyAccent(e.target.value);
    });
  }
  function applyAccent(color) {
    document.documentElement.style.setProperty("--qrv-accent", color);
    try { localStorage.setItem("qrv-accent", color); } catch (e) {}
  }

  /* ------------------------------------------------------------------
     Boot
  ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", async () => {
    window.QRVConsent.init();
    window.QRVPanicMode.init();
    await window.QRVConfig.refreshAiStatus();
    $("aiUnavailableBanner").hidden = window.QRVConfig.state.aiAvailable;

    try {
      const savedTheme = localStorage.getItem("qrv-theme");
      if (savedTheme) document.body.setAttribute("data-theme", savedTheme);
      const savedAccent = localStorage.getItem("qrv-accent");
      if (savedAccent) {
        document.documentElement.style.setProperty("--qrv-accent", savedAccent);
        if ($("customAccentInput")) $("customAccentInput").value = savedAccent;
      }
    } catch (e) {}

    await window.QRVScanner.start();
  });
})();
