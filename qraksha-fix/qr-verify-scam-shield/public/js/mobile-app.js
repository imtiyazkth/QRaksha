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

    renderScanResult({ parsed, brand, risk, explanation });
  });

  function renderScanResult({ parsed, brand, risk, explanation }) {
    const contextLine = brand
      ? `This looks like a ${brand} QR code (${parsed.typeLabel || parsed.type}).`
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

  $("btnCheckMessage").addEventListener("click", async () => {
    const imageMode = !$("msgPanelImage").hidden;
    if (imageMode) {
      const file = $("msgFileInput").files[0];
      if (!file) return;
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
          const data = await res.json();
          await window.QRVAiScamCheck.runMessageCheck(data.extractedText || "");
        } catch (err) {
          $("aiUnavailableBanner").hidden = false;
        }
      });
      return;
    }
    const text = $("msgTextInput").value.trim();
    if (!text) return;
    await window.QRVAiScamCheck.runMessageCheck(text);
  });

  /* ------------------------------------------------------------------
     Generator suite (Point 14) — placeholder routing to be wired to
     your actual generator implementation; Points 12/13 (Compress,
     Convert) are simply absent from this file and its nav by design.
  ------------------------------------------------------------------ */
  document.querySelectorAll(".qrv-gen-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      // TODO: replace with real generator flows per kind (social/campaign/
      // account/review/maps/store). Download action (not generation
      // itself) is the only ad-gated step, per Section 3.
      alert(`Generator: ${tile.dataset.kind} — wire this up to your actual QR-generation logic.`);
    });
  });

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

  document.querySelectorAll(".qrv-theme-swatch").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("appWrapper").setAttribute("data-theme", btn.dataset.theme);
      try { localStorage.setItem("qrv-theme", btn.dataset.theme); } catch (e) {}
    });
  });

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
      if (savedTheme) document.getElementById("appWrapper").setAttribute("data-theme", savedTheme);
    } catch (e) {}

    await window.QRVScanner.start();
  });
})();
