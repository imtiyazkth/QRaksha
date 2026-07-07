/* ==========================================================================
   CONFIG.JS
   Central place for the three-tier feature flags. This is what lets the
   developer switch Mesh AI off (e.g. to control cost) without touching
   any other file, and lets the frontend degrade gracefully when it does.
   ========================================================================== */

window.QRVConfig = (function () {
  "use strict";

  // Replace with your deployed Cloud Function base URL after `firebase deploy`.
  // Keep this as a plain URL — it is not a secret, only the Mesh key behind
  // it is. Anyone can see this value; that is fine by design.
  const FUNCTIONS_BASE_URL = "https://asia-south1-qraksha-india.cloudfunctions.net";

  const state = {
    // Becomes true only after /aiStatus confirms the backend is up AND
    // the developer has not disabled it. Never assume AI is available
    // before this check completes.
    aiAvailable: false,
    aiStatusChecked: false,
    userConsented: (() => {
      try { return localStorage.getItem("qrv-ai-consent") === "true"; }
      catch (e) { return false; }
    })(),
  };

  async function refreshAiStatus() {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${FUNCTIONS_BASE_URL}/aiStatus`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error("aiStatus non-200");
      const data = await res.json();
      state.aiAvailable = data && data.enabled === true;
    } catch (err) {
      // Any failure — network down, function down, developer disabled it,
      // timeout — is treated identically: AI is simply not available right
      // now. This is not an error state for the app, it's an expected one.
      // The reason IS logged to console though, so you can tell "Mesh is
      // just down right now" apart from "I never deployed the functions."
      console.warn("aiStatus check failed (AI features will show as unavailable):", err.message);
      state.aiAvailable = false;
    }
    state.aiStatusChecked = true;
    document.dispatchEvent(new CustomEvent("qrv:ai-status-updated", { detail: { available: state.aiAvailable } }));
    return state.aiAvailable;
  }

  function setConsent(value) {
    state.userConsented = !!value;
    try { localStorage.setItem("qrv-ai-consent", String(state.userConsented)); }
    catch (e) { /* if storage is blocked, consent just won't persist across reloads */ }
  }

  function aiUsable() {
    return state.aiAvailable && state.userConsented;
  }

  return {
    FUNCTIONS_BASE_URL,
    state,
    refreshAiStatus,
    setConsent,
    aiUsable,
  };
})();
