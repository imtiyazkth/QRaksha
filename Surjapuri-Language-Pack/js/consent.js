/* ==========================================================================
   CONSENT.JS
   Shows the AI-consent modal exactly when needed: the user has tried to
   use an AI-dependent feature but has not yet opted in. Never call any
   Mesh-backed endpoint before QRVConfig.state.userConsented is true.
   ========================================================================== */

window.QRVConsent = (function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  let pendingAction = null; // function to run if the user accepts

  function init() {
    $("btnConsentAccept").addEventListener("click", () => {
      const checked = $("consentCheckbox").checked;
      if (!checked) return; // require the explicit checkbox, not just the button
      window.QRVConfig.setConsent(true);
      close();
      if (pendingAction) { pendingAction(); pendingAction = null; }
    });

    $("btnConsentDecline").addEventListener("click", () => {
      window.QRVConfig.setConsent(false);
      close();
      pendingAction = null;
    });
  }

  function open(onAccept) {
    pendingAction = onAccept || null;
    $("consentCheckbox").checked = false;
    $("consentModal").hidden = false;
  }

  function close() {
    $("consentModal").hidden = true;
  }

  // Call this before any AI-dependent action. Runs `action` immediately if
  // consent already given; otherwise shows the modal and runs it only if
  // the user accepts.
  function requireConsent(action) {
    if (window.QRVConfig.state.userConsented) { action(); return; }
    open(action);
  }

  return { init, open, close, requireConsent };
})();
