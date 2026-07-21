/* ==========================================================================
   APP.JS — entrypoint
   Wires up: the QR-mode / Message-mode switcher, the message sub-tabs,
   module initialization, and the integration between the existing QR
   core (unchanged) and the new AI/free-intel features via the
   qrv:qr-analysis-ready event dispatched from qr-verify-core.js.
   ========================================================================== */

(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  /* ------------------------------------------------------------------
     App-level mode switcher (QR Check vs Message/Screenshot Check)
  ------------------------------------------------------------------ */
  function activateAppMode(which) {
    const qrActive = which === "qr";
    $("modeTabQr").classList.toggle("is-active", qrActive);
    $("modeTabMessage").classList.toggle("is-active", !qrActive);
    $("modeTabQr").setAttribute("aria-selected", String(qrActive));
    $("modeTabMessage").setAttribute("aria-selected", String(!qrActive));
    $("modeQr").hidden = !qrActive;
    $("modeMessage").hidden = qrActive;
  }
  $("modeTabQr").addEventListener("click", () => activateAppMode("qr"));
  $("modeTabMessage").addEventListener("click", () => activateAppMode("message"));

  /* ------------------------------------------------------------------
     Message-mode sub-tabs (Paste Message / Upload Screenshot)
  ------------------------------------------------------------------ */
  function activateMsgTab(which) {
    const textActive = which === "text";
    $("msgTabText").classList.toggle("is-active", textActive);
    $("msgTabImage").classList.toggle("is-active", !textActive);
    $("msgTabText").setAttribute("aria-selected", String(textActive));
    $("msgTabImage").setAttribute("aria-selected", String(!textActive));
    $("msgPanelText").hidden = !textActive;
    $("msgPanelImage").hidden = textActive;
  }
  $("msgTabText").addEventListener("click", () => activateMsgTab("text"));
  $("msgTabImage").addEventListener("click", () => activateMsgTab("image"));

  /* ------------------------------------------------------------------
     Message check — text path (always available, Tier 1 + Tier 2 run
     with zero network; Tier 3 only via the "Get AI Advance Opinion" flow
     already wired inside ai-scam-check.js)
  ------------------------------------------------------------------ */
  $("btnCheckMessage").addEventListener("click", async () => {
    const imageMode = !$("msgPanelImage").hidden;

    if (imageMode) {
      // Reading a screenshot's content requires a vision-capable model —
      // there is no offline/free-intel equivalent for image content, so
      // this path is honest about needing AI consent rather than
      // pretending to analyze something it can't see.
      const file = $("msgFileInput").files[0];
      if (!file) { return; }
      window.QRVConsent.requireConsent(async () => {
        $("btnCheckMessage").disabled = true;
        $("btnCheckMessage").textContent = "Reading screenshot\u2026";
        try {
          const base64 = await fileToBase64(file);
          const res = await fetch(`${window.QRVConfig.FUNCTIONS_BASE_URL}/checkScreenshot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64 }),
          });
          if (!res.ok) throw new Error("checkScreenshot failed");
          const data = await res.json();
          // Feed the extracted text back through the same combined pipeline
          // used for pasted messages, so offline/free-intel context is
          // still shown alongside the AI's reading of the image.
          await window.QRVAiScamCheck.runMessageCheck(data.extractedText || "");
        } catch (err) {
          $("aiUnavailableBanner").hidden = false;
        } finally {
          $("btnCheckMessage").disabled = false;
          $("btnCheckMessage").textContent = "Check for scam";
        }
      });
      return;
    }

    const text = $("msgTextInput").value.trim();
    if (!text) return;
    await window.QRVAiScamCheck.runMessageCheck(text);
  });

  $("btnClearMsg").addEventListener("click", () => {
    $("msgTextInput").value = "";
    $("msgFileInput").value = "";
    $("msgUploadPreview").hidden = true;
    $("msgReportSection").hidden = true;
  });

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  $("msgFileInput").addEventListener("change", () => {
    const file = $("msgFileInput").files[0];
    if (!file) return;
    $("msgUploadPreviewImg").src = URL.createObjectURL(file);
    $("msgUploadPreview").hidden = false;
  });
  $("btnClearMsgUpload").addEventListener("click", () => {
    $("msgFileInput").value = "";
    $("msgUploadPreview").hidden = true;
  });

  /* ------------------------------------------------------------------
     Ambiguous-QR escalation — listens for the event dispatched by the
     unmodified qr-verify-core.js, shows "Get AI Advance Opinion" only
     when the offline score lands in the 25-75 band, and only if AI is
     actually available right now.
  ------------------------------------------------------------------ */
  let lastDecodedQrText = null;
  document.addEventListener("qrv:qr-analysis-ready", (e) => {
    lastDecodedQrText = e.detail.raw;
    const inAmbiguousBand = e.detail.score >= 25 && e.detail.score <= 75;
    $("btnAiSecondOpinionQr").hidden = !(inAmbiguousBand && window.QRVConfig.state.aiAvailable);
  });
  window.QRVAiScamCheck.wireQrSecondOpinion(() => lastDecodedQrText);

  /* ------------------------------------------------------------------
     Boot
  ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", async () => {
    window.QRVConsent.init();
    window.QRVPanicMode.init();
    await window.QRVConfig.refreshAiStatus();
    $("aiUnavailableBanner").hidden = window.QRVConfig.state.aiAvailable;
  });

  document.addEventListener("qrv:ai-status-updated", (e) => {
    if (!e.detail.available) {
      $("btnAiSecondOpinionQr").hidden = true;
      $("btnAiSecondOpinionMsg").hidden = true;
    }
  });
})();
