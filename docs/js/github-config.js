/* ==========================================================================
   GITHUB-CONFIG.JS  —  Runtime configuration reader
   Reads window.QRV_RUNTIME_CONFIG that was baked into runtime-config.js
   by the "inject-config" GitHub Actions workflow (no Firebase plan needed).

   USAGE
   ─────
   Add  <script src="js/runtime-config.js"></script>
   then <script src="js/github-config.js"></script>
   before config.js in index.html.

   If runtime-config.js hasn't been generated yet (local dev without
   running the workflow), all values fall back to empty strings and the
   app runs in fully-offline/demo mode.

   HOW TO SET UP (one-time)
   ────────────────────────
   1. Open your repo on github.com → Settings → Secrets and variables
      → Actions → New repository secret.
   2. Add each key listed below (see "SECRETS YOU NEED" section).
   3. Push any commit to main. The "inject-config" workflow runs and
      writes docs/js/runtime-config.js into your repo.
   4. GitHub Pages re-deploys automatically.

   SECRETS YOU NEED
   ────────────────────────
   FIREBASE_API_KEY           — from Firebase console → Project settings
   FIREBASE_AUTH_DOMAIN       — e.g. qraksha-india.firebaseapp.com
   FIREBASE_PROJECT_ID        — e.g. qraksha-india
   FIREBASE_STORAGE_BUCKET    — e.g. qraksha-india.firebasestorage.app
   FIREBASE_MESSAGING_SENDER  — numeric sender ID
   FIREBASE_APP_ID            — e.g. 1:415501748287:web:abc123
   FUNCTIONS_BASE_URL         — your Cloud Functions base URL
                                (or a Cloudflare/Vercel serverless URL)
   AI_FEATURES_ENABLED        — true / false
   ========================================================================== */

(function () {
  "use strict";

  const raw = window.QRV_RUNTIME_CONFIG || {};

  // Expose a structured config object that config.js (and firebase-init.js)
  // can read instead of having values hardcoded in their source.
  window.QRVGitHubConfig = {
    firebase: {
      apiKey:            raw.firebaseApiKey           || "",
      authDomain:        raw.firebaseAuthDomain       || "",
      projectId:         raw.firebaseProjectId        || "",
      storageBucket:     raw.firebaseStorageBucket    || "",
      messagingSenderId: raw.firebaseMessagingSender  || "",
      appId:             raw.firebaseAppId            || "",
    },
    functionsBaseUrl:    raw.functionsBaseUrl         || "",
    aiFeaturesEnabled:   raw.aiFeaturesEnabled === true || raw.aiFeaturesEnabled === "true",
    generatedAt:         raw.generatedAt              || null,
    _isConfigured:       Boolean(raw.firebaseProjectId),
  };

  if (!window.QRVGitHubConfig._isConfigured) {
    console.info(
      "[QRaksha] runtime-config.js not found or incomplete. " +
      "Running in offline/demo mode. " +
      "Run the 'inject-config' GitHub Actions workflow to configure the app."
    );
  }
})();
