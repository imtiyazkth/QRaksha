/* ==========================================================================
   CONFIG.JS  —  QRaksha v2 Production Build
   Central place for the three-tier feature flags and Functions URL.

   READING ORDER (first value wins, then falls back):
     1. window.QRVGitHubConfig  — injected by GitHub Actions from secrets
     2. Hardcoded fallback below — used only in local dev / demo mode
   ========================================================================== */

window.QRVConfig = (function () {
  "use strict";

  // Read from GitHub-Actions-injected config when available.
  // Falls back to empty string → AI features silently disabled.
  const gh = (window.QRVGitHubConfig && window.QRVGitHubConfig._isConfigured)
    ? window.QRVGitHubConfig
    : null;

  // FUNCTIONS_BASE_URL is NOT a secret — it's just a URL.
  // The real secret (MESH_API_KEY) lives server-side in functions/.env
  // and is never exposed here.
  const FUNCTIONS_BASE_URL = (gh && gh.functionsBaseUrl)
    ? gh.functionsBaseUrl
    : "https://asia-south1-qraksha-india.cloudfunctions.net"; // local-dev fallback

  const AI_FEATURES_ENABLED = gh
    ? gh.aiFeaturesEnabled
    : false; // always off until the GH Actions config workflow runs

  // Restricted by HTTP referrer in Google Cloud Console — safe to read
  // here the same way the Firebase client config is. Empty string means
  // "not configured yet", and callers must treat that as "skip this check".
  const GOOGLE_SAFE_BROWSING_KEY = (gh && gh.googleSafeBrowsingKey) ? gh.googleSafeBrowsingKey : "";

  const state = {
    aiAvailable: false,
    aiStatusChecked: false,
    userConsented: (() => {
      try { return localStorage.getItem("qrv-ai-consent") === "true"; }
      catch (e) { return false; }
    })(),
  };

  async function refreshAiStatus() {
    // Skip the network round-trip entirely when AI is explicitly disabled.
    if (!AI_FEATURES_ENABLED) {
      state.aiAvailable = false;
      state.aiStatusChecked = true;
      document.dispatchEvent(new CustomEvent("qrv:ai-status-updated", { detail: { available: false } }));
      return false;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${FUNCTIONS_BASE_URL}/aiStatus`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`aiStatus ${res.status}`);
      const data = await res.json();
      state.aiAvailable = data && data.enabled === true;
    } catch (err) {
      console.warn("[QRaksha] aiStatus check failed — AI features offline:", err.message);
      state.aiAvailable = false;
    }
    state.aiStatusChecked = true;
    document.dispatchEvent(new CustomEvent("qrv:ai-status-updated", { detail: { available: state.aiAvailable } }));
    return state.aiAvailable;
  }

  function setConsent(value) {
    state.userConsented = !!value;
    try { localStorage.setItem("qrv-ai-consent", String(state.userConsented)); } catch (e) {}
  }

  function aiUsable() {
    return state.aiAvailable && state.userConsented;
  }

  return { FUNCTIONS_BASE_URL, GOOGLE_SAFE_BROWSING_KEY, state, refreshAiStatus, setConsent, aiUsable };
})();
