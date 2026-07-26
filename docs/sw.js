/* ==========================================================================
   SW.JS — minimal service worker
   Required for the app to qualify as an installable PWA (and therefore for
   the TWA/APK wrapper to work correctly). Caches just enough of the app
   shell so the offline QR-check path (which is already local-JS-only)
   keeps working with no network at all.

   CACHE_NAME MUST be bumped on every deploy that changes any file listed
   in SHELL_FILES. Previously this stayed at "qraksha-shell-v1" forever,
   which meant the activate handler's "delete any cache that isn't
   CACHE_NAME" cleanup never actually deleted anything — old cached
   JS/HTML stayed forever, and users only saw updates after manually
   clearing browser data. Bumping this string is what actually triggers
   the old-cache cleanup below.
   ========================================================================== */

const CACHE_NAME = "qraksha-shell-20260726-3998ad2";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/qr-verify-core.css",
  "./css/ai-mode.css",
  "./js/sanitize.js",
  "./js/config.js",
  "./js/risk-engine-core.js",
  "./js/free-intel-check.js",
  "./js/ad-gate.js",
  "./js/consent.js",
  "./js/panic-mode.js",
  "./js/ai-scam-check.js",
  "./js/dashboard.js",
  "./js/lang.js",
  "./js/voice.js",
  "./js/verification-engine.js",
  "./js/story-submit.js",
  "./js/mobile-scanner.js",
  "./js/mobile-app.js",
  "./js/github-config.js",
  "./js/runtime-config.js",
  "./data/cyber-resources.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

// Allows the page (index.html) to explicitly tell a waiting new service
// worker to activate immediately, rather than staying "waiting" until
// every open tab of the app is closed — this is the other half of the
// auto-update handshake, paired with the controllerchange listener and
// reg.update() call in index.html.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Network-first for data files (blocklists etc.) so they stay fresh when
  // online, falling back to cache only when the network is unavailable.
  if (req.url.includes("/data/")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Network-first for the app shell (HTML/JS/CSS) too — this is the
  // actual fix for "users see the old version until they clear data".
  // Cache-first meant a stale shell could be served indefinitely even
  // after a new version was deployed and the SW itself updated,
  // because the fetch handler never even checked the network first.
  // Network-first still falls back to cache when offline, so the PWA's
  // offline capability is unaffected — it just prefers fresh content
  // whenever a connection is available, which is the common case.
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});
