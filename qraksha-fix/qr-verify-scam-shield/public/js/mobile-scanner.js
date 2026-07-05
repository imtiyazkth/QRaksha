/* ==========================================================================
   MOBILE-SCANNER.JS
   Owns the live camera viewport: getUserMedia stream, torch toggle,
   front/back camera switch, digital zoom, aspect-ratio toggle, and
   feeding decoded QR text into QRVEngine (the extracted pure risk logic)
   plus the free-intel/AI pipeline already built for messages.

   Uses html5-qrcode (already loaded in index.html) for the actual
   decode loop rather than reinventing camera-to-QR decoding.
   ========================================================================== */

window.QRVScanner = (function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  let html5QrCode = null;
  let currentFacingMode = "environment"; // back camera by default
  let torchOn = false;
  let zoomLevel = 1;
  let fullScreenAspect = true;

  async function start() {
    if (html5QrCode) await stop();
    html5QrCode = new Html5Qrcode("scanViewport");
    try {
      await html5QrCode.start(
        { facingMode: currentFacingMode },
        { fps: 10, qrbox: fullScreenAspect ? undefined : { width: 240, height: 240 } },
        onDecoded,
        () => {} // per-frame "no QR found yet" callback — intentionally silent
      );
      updateTorchAvailability();
    } catch (err) {
      $("scanStatusText").textContent = "Camera unavailable — check permissions, or use Upload instead.";
    }
  }

  async function stop() {
    if (!html5QrCode) return;
    try { await html5QrCode.stop(); } catch (e) { /* already stopped */ }
    html5QrCode = null;
  }

  async function onDecoded(rawText) {
    // Pause immediately on a hit so the same code isn't decoded 10x/sec
    // while the result renders.
    if (html5QrCode) { try { await html5QrCode.pause(true); } catch (e) {} }
    window.dispatchEvent(new CustomEvent("qrv:qr-decoded", { detail: { rawText } }));
  }

  function resumeScanning() {
    if (html5QrCode) html5QrCode.resume();
  }

  /* ---------------------------------------------------------------
     Point 5 — Flashlight / torch toggle
  --------------------------------------------------------------- */
  async function updateTorchAvailability() {
    const capabilities = html5QrCode && html5QrCode.getRunningTrackCapabilities
      ? html5QrCode.getRunningTrackCapabilities() : null;
    $("btnTorch").hidden = !(capabilities && capabilities.torch);
  }

  async function toggleTorch() {
    if (!html5QrCode) return;
    torchOn = !torchOn;
    try {
      await html5QrCode.applyVideoConstraints({ advanced: [{ torch: torchOn }] });
      $("btnTorch").classList.toggle("is-active", torchOn);
    } catch (err) {
      torchOn = false; // device doesn't actually support it despite capability check
    }
  }

  /* ---------------------------------------------------------------
     Point 6 — Front/back camera switch
  --------------------------------------------------------------- */
  async function switchCamera() {
    currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
    torchOn = false;
    await start();
  }

  /* ---------------------------------------------------------------
     Point 7 — Aspect ratio toggle (full-screen vs boxed viewport)
  --------------------------------------------------------------- */
  async function toggleAspect() {
    fullScreenAspect = !fullScreenAspect;
    $("scanViewport").classList.toggle("qrv-viewport--boxed", !fullScreenAspect);
    await start(); // qrbox option must be re-applied via a restart
  }

  /* ---------------------------------------------------------------
     Point 10 — Digital zoom
  --------------------------------------------------------------- */
  async function setZoom(value) {
    zoomLevel = Number(value);
    if (!html5QrCode) return;
    try {
      await html5QrCode.applyVideoConstraints({ advanced: [{ zoom: zoomLevel }] });
    } catch (err) {
      // Zoom constraint unsupported on this device/browser — fail silently,
      // the slider simply won't visibly change anything, which is a safe
      // no-op rather than a broken error state.
    }
  }

  /* ---------------------------------------------------------------
     Point 8 — Media upload (image containing a QR, handled via the
     same html5-qrcode file-scan API rather than the live stream)
  --------------------------------------------------------------- */
  async function scanImageFile(file) {
    const tempScanner = new Html5Qrcode("scanViewport");
    try {
      const rawText = await tempScanner.scanFile(file, false);
      window.dispatchEvent(new CustomEvent("qrv:qr-decoded", { detail: { rawText } }));
    } catch (err) {
      $("scanStatusText").textContent = "No QR code found in that image.";
    } finally {
      try { await tempScanner.clear(); } catch (e) {}
    }
  }

  return { start, stop, resumeScanning, toggleTorch, switchCamera, toggleAspect, setZoom, scanImageFile };
})();
