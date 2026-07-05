/* ==========================================================================
   AD-GATE.JS
   Every monetization gate in the app funnels through adGate() so there is
   exactly one place this logic lives. Two things are deliberate:

   1. There is NO gate on the "Analyze with AI" results themselves — that
      screen renders immediately. See the conversation history / SECURITY.md
      for why: gating the one screen that tells a scared, possibly
      mid-scam user "yes, this is fraud" behind an ad is the kind of thing
      that actively harms the exact person this app exists to help.
   2. EMERGENCY_BYPASS contexts (panic mode, 1930 call, cybercrime.gov.in
      complaint routing) skip this function's ad logic entirely and are
      never even routed through it — enforced by simply never calling
      adGate() from those handlers (see mobile-app.js).

   Replace the setTimeout-based simulation below with real AdMob/AdSense
   SDK calls when you have those credentials — the call sites elsewhere
   in the app don't need to change, only the inside of this function.
   ========================================================================== */

window.QRVAdGate = (function () {
  "use strict";

  const SIMULATED_AD_MS = 3500;
  let activeGateToken = null; // lets a cancelled gate's pending .then() know not to proceed

  function showOverlay(kind) {
    const el = document.getElementById("adGateOverlay");
    const label = document.getElementById("adGateLabel");
    if (label) {
      label.textContent = kind === "interstitial"
        ? "Advertisement — continuing in a moment\u2026"
        : "Loading\u2026";
    }
    if (el) el.hidden = false;
  }

  function hideOverlay() {
    const el = document.getElementById("adGateOverlay");
    if (el) el.hidden = true;
  }

  /**
   * Runs an ad gate before a non-safety-critical action.
   * @param {"interstitial"|"rewarded"} kind
   * @returns {Promise<boolean>} resolves true if the ad actually completed,
   *   false if it was cancelled (e.g. Panic Mode interrupted it) — callers
   *   MUST check this and skip whatever the ad was gating if false.
   */
  function adGate(kind) {
    const token = Symbol();
    activeGateToken = token;
    return new Promise((resolve) => {
      showOverlay(kind);
      // TODO: replace with real ad SDK show() call, resolve in its callback
      setTimeout(() => {
        if (activeGateToken !== token) { resolve(false); return; } // cancelled mid-flight
        hideOverlay();
        resolve(true);
      }, SIMULATED_AD_MS);
    });
  }

  /**
   * Immediately kills any ad currently showing or in-flight. Called by
   * Panic Mode the instant it opens — per Section 4, emergency access must
   * suspend all ad processes with zero delay, not just visually hide them.
   */
  function forceCancel() {
    activeGateToken = null;
    hideOverlay();
  }

  return { adGate, forceCancel };
})();
