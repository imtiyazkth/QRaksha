/* ==========================================================================
   SW.JS — minimal service worker
   Required for the app to qualify as an installable PWA (and therefore for
   the TWA/APK wrapper to work correctly). Caches just enough of the app
   shell so the offline QR-check path (which is already local-JS-only)
   keeps working with no network at all. Deliberately NOT caching
   data/blocklists/*.json aggressively — those should refresh from network
   when available, falling back to cache only when offline.
   ========================================================================== */

const CACHE_NAME = "qraksha-shell-v1";
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
  "./js/story-submit.js",
  "./js/mobile-scanner.js",
  "./js/mobile-app.js",
  "./data/cyber-resources.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
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

  // Cache-first for the app shell — instant load + offline support.
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
