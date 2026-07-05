# Security Review

This document is the red-team pass required before this project was
considered finished — what was checked, file by file, and the specific
fix applied. Kept in the repo so judges (and future-you) can see the
reasoning, not just the code.

## Threats considered and mitigations applied

**Secret exposure** — The Mesh `rsk_` key is never written to any file in
this repo. It lives only in Firebase's encrypted Secret Manager, accessed
via `defineSecret("MESH_API_KEY")` in `functions/*.js` and only resolved
at request time inside the function (`meshApiKey.value()`). `.env.example`
documents the required secret name with no real value. `.gitignore` blocks
`.env`, `*.key`, and Firebase runtime config as defense in depth even
though no such file should normally exist locally.

**XSS via rendered content** — Decoded QR text, pasted message text, and
AI-generated explanations are all attacker-influenced strings that get
displayed in the DOM. `public/js/sanitize.js` centralizes escaping;
`ai-scam-check.js` builds result rows with `document.createElement` +
`textContent`, never `innerHTML` with dynamic content, in
`renderMessageResult()`.

**Prompt injection** — A scam message is attacker-controlled text fed
directly into a model prompt. `functions/meshClient.js`'s `SYSTEM_PROMPT`
wraps user content in explicit `<<<MESSAGE_START>>>`/`<<<MESSAGE_END>>>`
delimiters and instructs the model to treat everything inside strictly as
data, never as instructions — including instructions to ignore this rule.
The model is also constrained to a fixed JSON response shape, which limits
how much an injected instruction could change the output format even if
partially successful.

**Abuse / cost exhaustion** — `functions/rateLimiter.js` enforces 8
requests/minute per IP on both `checkMessage` and `checkScreenshot`.
`functions/validateInput.js` caps text at 2000 characters and images at
5MB. Both endpoints have request timeouts on the frontend (12s) to avoid
hung connections piling up. See the noted limitation in `rateLimiter.js`
about per-instance (not globally distributed) counting — acceptable at
this project's scale, not a claim of enterprise-grade rate limiting.

**CORS** — Both `checkMessage` and `checkScreenshot` restrict `cors` to
a single `ALLOWED_ORIGIN` (your GitHub Pages domain) rather than `*`.
`aiStatus` uses open CORS since it reveals nothing sensitive (just a
boolean) and needs to be checked before origin-specific logic even runs.

**Function-level auth** — Not implemented in this pass. Firebase App
Check is the recommended next step if this goes beyond a hackathon demo —
noted here rather than silently skipped, since CORS alone only stops
browser-based cross-origin calls, not a direct `curl` to the function URL.
The rate limiter and input caps are the actual defense against that until
App Check is added.

**File upload validation** — `validateInput.js`'s `validateImageBase64()`
checks real file signatures (PNG/JPEG/WEBP magic bytes) rather than
trusting the declared MIME type, and enforces the 5MB cap before any data
reaches Mesh. EXIF/metadata stripping is flagged as a `TODO` with the
specific library call needed (`sharp(buffer).rotate()`) rather than
silently omitted — worth doing before handling real user photos at scale.

**RAG corpus integrity** — The corpus in `rag-corpus/` is only ever
uploaded by the developer via the Mesh dashboard/API directly; no code
path in this app lets user-submitted content be written into it.

**Logging hygiene** — Both `scamCheck.js` and `screenshotCheck.js` log
only `err.message` on failure, never the raw message text or image bytes
being analyzed.

**Client validation is not security** — `msgTextInput`'s `maxlength`
attribute and the frontend's own checks are UX conveniences only,
`validateText()`/`validateImageBase64()` re-enforce every limit
server-side regardless of what the client sends.

**Conservative score merging** — `ai-scam-check.js`'s `combineResults()`
takes `Math.max()` of the offline/free-intel score and the AI score —
the AI can add detail and raise a verdict but can never lower one already
established by Tier 1/2. All flags from every tier that ran are shown
together with a source label.

**Fail-safe, not fail-open, on AI errors** — `config.js`'s
`refreshAiStatus()` and `ai-scam-check.js`'s `callAiCheckMessage()` treat
every failure mode (timeout via `AbortController`, non-200, network error,
malformed JSON) identically: AI is simply unavailable, Tier 1/2 results
still render, and the "AI unavailable" banner shows instead of an error.

**Supply chain** — `public/index.html` currently loads html5-qrcode and
jsPDF without Subresource Integrity hashes — flagged explicitly in a
comment in the file rather than shipped with fabricated hashes (a wrong
SRI hash would silently break script loading entirely). **Action item
before final submission:** generate the real hashes for the exact pinned
versions via https://www.srihash.org and add them to the `<script>` tags.

**Generic error handling** — All Cloud Function error responses return a
fixed, generic message (e.g. `"AI check unavailable right now"`); the
underlying error detail only ever goes to `console.error` server-side,
never into the HTTP response body.

**CSP** — Not yet added to `index.html`. **Action item before final
submission:** add a `Content-Security-Policy` meta tag restricting
`script-src`/`style-src` to `cdnjs.cloudflare.com`, `fonts.googleapis.com`,
`fonts.gstatic.com`, and `connect-src` to your Cloud Functions domain.

## Manual test checklist: does the app still fully work with AI off?

Run through this with `AI_FEATURE_ENABLED = false` in `aiStatus.js` (and
matching in `scamCheck.js`/`screenshotCheck.js`), or simply before you've
deployed any function at all:

- [ ] QR camera scan still decodes and scores a code end-to-end
- [ ] QR image upload still decodes and scores a code end-to-end
- [ ] PDF report download still works
- [ ] Pasting a message with a known keyword (e.g. "digital arrest") still
      shows a correctly-scored offline result
- [ ] The "Get AI second opinion" button does **not** appear anywhere
      (neither on ambiguous QR results nor under a message result)
- [ ] The "AI second opinion is currently unavailable" banner appears on
      the Message Check tab
- [ ] Uploading a screenshot shows a clear message that this needs AI,
      rather than silently doing nothing
- [ ] Panic Mode opens instantly with the browser's network connection
      fully disabled (airplane mode) — this must never depend on any
      fetch call succeeding
- [ ] No error appears in the browser console that surfaces raw fetch
      failures to the user
