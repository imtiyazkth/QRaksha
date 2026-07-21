/* ==========================================================================
   VOICE.JS
   App-wide accessibility voice layer using the browser's built-in
   Web Speech API (SpeechSynthesis) — free, no API key, no server,
   works fully offline once the page has loaded (the device's own TTS
   engine does the work). No network dependency, no Blaze plan needed.

   Real-world limitation, stated honestly: voice *quality and language
   availability* depend on what's installed on the user's device/OS.
   Hindi and English are near-universal on Android. Some regional
   languages (e.g. Gujarati, Marathi, Kannada) may not have a voice
   installed on older/budget phones — in that case this module falls
   back gracefully (uses the closest available voice, or stays silent
   rather than erroring) instead of breaking anything.
   ========================================================================== */

window.QRVVoice = (function () {
  "use strict";

  const MUTE_KEY = "qrv-voice-muted";

  // Maps QRVLang's language names to BCP-47 speech codes. Only languages
  // that have full text translations get a real spoken-language code;
  // "(beta)" languages fall back to English speech, matching how the
  // text itself already falls back.
  const LANG_CODES = {
    English: "en-IN",
    Hindi: "hi-IN",
    Bengali: "bn-IN",
    Telugu: "te-IN",
    Marathi: "mr-IN",
    Tamil: "ta-IN",
    Urdu: "ur-IN",
    Gujarati: "gu-IN",
    Kannada: "kn-IN",
  };

  function supported() {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  function isMuted() {
    try { return localStorage.getItem(MUTE_KEY) === "true"; }
    catch (e) { return false; }
  }

  function setMuted(muted) {
    try { localStorage.setItem(MUTE_KEY, muted ? "true" : "false"); } catch (e) {}
  }

  function currentLangCode() {
    const lang = window.QRVLang ? window.QRVLang.currentLangForAi() : "English";
    return LANG_CODES[lang] || LANG_CODES.English;
  }

  // Voice list loads asynchronously in some browsers. This resolves
  // once voices are actually available (or immediately if already
  // cached), so pickVoice() below doesn't silently get an empty list.
  let voicesReadyPromise = null;
  function voicesReady() {
    if (!supported()) return Promise.resolve([]);
    if (voicesReadyPromise) return voicesReadyPromise;
    voicesReadyPromise = new Promise((resolve) => {
      const existing = window.speechSynthesis.getVoices();
      if (existing.length) { resolve(existing); return; }
      const onChange = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", onChange);
        resolve(window.speechSynthesis.getVoices());
      };
      window.speechSynthesis.addEventListener("voiceschanged", onChange);
      // Safety timeout — some WebViews never fire voiceschanged at all.
      setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1200);
    });
    return voicesReadyPromise;
  }

  function pickVoice(voices, langCode) {
    if (!voices || !voices.length) return null;
    const exact = voices.find((v) => v.lang && v.lang.toLowerCase() === langCode.toLowerCase());
    if (exact) return exact;
    const prefix = langCode.split("-")[0].toLowerCase();
    const partial = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(prefix));
    if (partial) return partial;
    return null; // let the browser use its own default rather than forcing a wrong-language voice
  }

  let currentUtterance = null;

  function stop() {
    if (supported()) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    currentUtterance = null;
  }

  /**
   * Speak arbitrary text in the user's currently selected app language.
   * Always cancels any in-progress speech first, so rapid taps on
   * different 🔊 buttons don't queue up a confusing pile of audio.
   */
  async function speak(text, opts) {
    opts = opts || {};
    if (!text || !supported()) return false;
    if (isMuted() && !opts.force) return false; // "force" used only for the danger-alert toggle test, never for normal content

    stop();
    const langCode = currentLangCode();
    const voices = await voicesReady();
    const voice = pickVoice(voices, langCode);

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langCode;
    if (voice) utter.voice = voice;
    utter.rate = opts.rate || 0.95;
    utter.pitch = 1;
    currentUtterance = utter;
    try {
      window.speechSynthesis.speak(utter);
      return true;
    } catch (e) {
      return false;
    }
  }

  /** Speaks a lang.js key directly, with optional {placeholder} substitution. */
  function speakKey(key, vars) {
    if (!window.QRVLang) return;
    speak(window.QRVLang.t(key, vars));
  }

  /**
   * Auto-speaks a high-risk warning — used by verdict-rendering code so
   * a user who can't read still hears "this is dangerous" immediately,
   * without needing to find and tap a button. Respects mute. Browsers
   * generally allow SpeechSynthesis without a fresh user gesture as
   * long as *some* interaction already happened on the page this
   * session (which is true here, since the user had to tap a category
   * button or the scan trigger to get a result in the first place).
   */
  function speakDangerAlert() { speakKey("voiceDangerAlert"); }
  function speakWarnAlert() { speakKey("voiceWarnAlert"); }
  function speakSafeAlert() { speakKey("voiceSafeAlert"); }

  /**
   * Injects a 🔊 speaker button next to every element carrying a
   * [data-voice-key] attribute that hasn't already been wired up.
   * Call this after any dynamic re-render (dashboard cards, platform
   * grid, etc.) — it's safe to call repeatedly, already-wired elements
   * are skipped via a data-voice-attached marker.
   */
  function attachSpeakerButtons(root) {
    if (!supported()) return; // don't clutter the UI with buttons that can't work
    const scope = root || document;
    scope.querySelectorAll("[data-voice-key]:not([data-voice-attached])").forEach((el) => {
      el.setAttribute("data-voice-attached", "1");
      const key = el.getAttribute("data-voice-key");
      const varsAttr = el.getAttribute("data-voice-vars");
      let vars = null;
      if (varsAttr) {
        try { vars = JSON.parse(varsAttr); } catch (e) {}
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Listen");
      btn.className = "qrv-voice-btn";
      btn.textContent = "🔊";
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        speakKey(key, vars);
      });
      // <a> (hyperlink) elements may not legally contain another
      // interactive element (the speaker button) — insert it as a
      // sibling right after instead, so it never ends up nested inside
      // a real link or button.
      if (el.tagName === "A") {
        el.insertAdjacentElement("afterend", btn);
      } else {
        el.appendChild(btn);
      }
    });
  }

  function wireMuteToggle() {
    const btn = document.getElementById("btnToggleVoice");
    const state = document.getElementById("voiceToggleState");
    if (!btn || !state) return;
    const render = () => {
      const muted = isMuted();
      state.textContent = muted ? "OFF" : "ON";
      state.className = "text-xs font-semibold px-2.5 py-1 rounded-full " +
        (muted ? "bg-neutral-700 text-neutral-400" : "bg-amber/15 text-amber");
    };
    render();
    btn.addEventListener("click", () => {
      setMuted(!isMuted());
      render();
      if (!isMuted()) speak("Voice guidance on.", { force: true });
    });
  }

  function init() {
    if (!supported()) return;
    // Minimal injected styling for the speaker buttons — kept here
    // rather than the main stylesheet so this module is fully
    // self-contained and easy to remove later if ever needed.
    const style = document.createElement("style");
    style.textContent = `
      .qrv-voice-btn {
        display: inline-flex; align-items: center; justify-content: center;
        width: 26px; height: 26px; border-radius: 999px;
        background: rgba(255,176,32,0.14); border: 1px solid rgba(255,176,32,0.35);
        font-size: 13px; line-height: 1; flex-shrink: 0;
        cursor: pointer; padding: 0;
      }
      .qrv-voice-btn:active { transform: scale(0.92); }
      /* Cards/wrappers with position:relative get the speaker pinned to
         the corner instead of disrupting their internal layout flow. */
      .relative > .qrv-voice-btn {
        position: absolute; top: 8px; right: 8px; margin-left: 0;
      }
    `;
    document.head.appendChild(style);
    attachSpeakerButtons(document);
    wireMuteToggle();

    // Re-attach whenever the app language changes, in case new
    // dynamic content appeared between renders.
    document.addEventListener("qrv:lang-changed", () => attachSpeakerButtons(document));
  }

  return {
    supported, isMuted, setMuted, speak, speakKey,
    speakDangerAlert, speakWarnAlert, speakSafeAlert,
    attachSpeakerButtons, stop, init,
  };
})();
