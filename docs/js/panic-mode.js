/* ==========================================================================
   PANIC-MODE.JS
   Deliberately the simplest file in this project. No fetch calls, no
   dependencies on any other module's state, no async anything. Someone
   opening this is possibly mid-scam-call, scared, and maybe on a bad
   connection — it must open instantly regardless of what else is broken.
   ========================================================================== */

window.QRVPanicMode = (function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  function init() {
    $("btnOpenPanicMode").addEventListener("click", open);
    $("btnClosePanic").addEventListener("click", close);
    $("panicModal").addEventListener("click", (e) => {
      if (e.target.id === "panicModal") close(); // click on backdrop closes it
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // This dropdown previously had no event listener at all — selecting
    // a language here did nothing. Now it calls the same setLanguage()
    // entry point the Settings picker uses, so it actually changes the
    // whole app's language (persists it, re-renders all translated
    // text, and notifies voice.js), not just this modal.
    const picker = $("inlineLanguagePicker");
    if (picker) {
      picker.addEventListener("change", () => {
        if (window.QRVLang) window.QRVLang.setLanguage(picker.value);
        // Re-speak the guidance immediately in the newly-selected
        // language, since the whole point of this dropdown existing
        // inside Panic Mode is to let a scared/rushed user switch
        // language without leaving this screen.
        speakGuidance();
      });
    }
  }

  function speakGuidance() {
    if (window.QRVVoice && window.QRVLang) {
      const plain = (html) => html.replace(/<[^>]+>/g, "");
      const parts = ["panicStopText", "panicThinkText", "panicActText"]
        .map((k) => plain(window.QRVLang.t(k)));
      window.QRVVoice.speak(parts.join(". "), { force: true });
    }
  }

  function open() {
    if (window.QRVAdGate) window.QRVAdGate.forceCancel();
    syncInlineLanguagePicker();
    $("panicModal").hidden = false;
    // Voice accessibility — this is the single most important place in
    // the whole app for spoken guidance: someone opening Panic Mode may
    // be mid-scam-call, scared, and may not be able to read the screen
    // at all. Speak the Stop/Think/Act guidance immediately, in
    // whichever language is currently active.
    speakGuidance();
  }
  function close() {
    $("panicModal").hidden = true;
    if (window.QRVVoice) window.QRVVoice.stop();
  }

  // Keeps the modal's own quick-switch dropdown showing whatever
  // language is currently active app-wide, instead of always resetting
  // to "English" on every open regardless of the real saved choice.
  function syncInlineLanguagePicker() {
    const picker = $("inlineLanguagePicker");
    if (picker && window.QRVLang) {
      picker.value = window.QRVLang.currentLangForAi();
    }
  }

  return { init, open, close };
})();
