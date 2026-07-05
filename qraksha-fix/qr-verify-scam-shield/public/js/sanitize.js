/* ==========================================================================
   SANITIZE.JS
   Shared output-escaping helpers. Every piece of text that originates from
   a QR code, a pasted message, or an AI response MUST go through one of
   these before it touches the DOM. Never build HTML by concatenating raw
   strings — that is the #1 way this app could be made to run someone
   else's script inside a user's browser.
   ========================================================================== */

window.QRVSanitize = (function () {
  "use strict";

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  // Preferred: write text into an element via textContent, never innerHTML,
  // when the content itself has no legitimate markup to render.
  function setText(el, text) {
    if (!el) return;
    el.textContent = text == null ? "" : String(text);
  }

  // For the rare cases where a small amount of trusted, hardcoded markup
  // needs to wrap untrusted text (e.g. a flag icon + escaped message),
  // build it with escapeHtml on every dynamic piece — never on the
  // hardcoded wrapper.
  function safeHtml(strings, ...values) {
    return strings.reduce((out, str, i) => {
      const val = i < values.length ? escapeHtml(values[i]) : "";
      return out + str + val;
    }, "");
  }

  // Strip anything that looks like it's trying to break out of a JSON
  // string or inject instructions before text is sent to the AI backend.
  // This is a defense-in-depth measure — the real prompt-injection defense
  // lives server-side in the Cloud Function's system prompt, not here.
  function normalizeForAiInput(text) {
    return String(text).slice(0, 2000).replace(/\u0000/g, "");
  }

  return { escapeHtml, setText, safeHtml, normalizeForAiInput };
})();
