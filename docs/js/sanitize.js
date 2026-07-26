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
  // Strip prompt injection attempts before sending to Mesh AI.
  // Removes: null bytes, common jailbreak phrases, role-switching attempts,
  // instruction overrides, and control characters. Defense-in-depth only —
  // the real protection lives in the server-side system prompt.
  function normalizeForAiInput(text) {
    return String(text)
      .slice(0, 2000)
      .replace(/\u0000/g, "")
      .replace(/[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "")
      .replace(/ignore\s+(previous|all|above)\s+instructions?/gi, "[removed]")
      .replace(/you\s+are\s+now\s+(a|an|the)?\s*/gi, "[removed]")
      .replace(/act\s+as\s+(a|an|the)?\s*/gi, "[removed]")
      .replace(/system\s*:/gi, "[removed]")
      .replace(/\[system\]/gi, "[removed]")
      .replace(/jailbreak/gi, "[removed]")
      .replace(/DAN\b/g, "[removed]")
      .replace(/forget\s+(your|all|previous)\s*/gi, "[removed]")
      .replace(/new\s+instructions?\s*:/gi, "[removed]")
      .trim();
  }

  return { escapeHtml, setText, safeHtml, normalizeForAiInput };
})();
