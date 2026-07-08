/* ==========================================================================
   phoneLookup.js — POST /phoneLookup
   Proxies a Numverify (apilayer) phone-validation lookup.

   WHY THIS PROXY EXISTS: Numverify's free tier only supports the plain
   http:// endpoint — HTTPS access is a paid-plan feature. Since QRaksha
   is served over https://, a browser calling http://apilayer.net directly
   would be blocked as "mixed content" by every modern browser. This
   Cloud Function calls the http:// endpoint server-side (where there's
   no such restriction) and returns the result to the browser over HTTPS,
   the same way the site already proxies the Mesh AI key.
   ========================================================================== */

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { isRateLimited, getClientIp } = require("./rateLimiter");

const numverifyApiKey = defineSecret("NUMVERIFY_API_KEY");
const ALLOWED_ORIGIN = "https://imtiyazkth.github.io";

exports.phoneLookup = onRequest(
  { secrets: [numverifyApiKey], region: "asia-south1", cors: [ALLOWED_ORIGIN] },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Too many requests — please wait a minute and try again" });
    }

    const digits = String((req.body && req.body.number) || "").replace(/[^\d]/g, "");
    if (digits.length < 8 || digits.length > 15) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const key = numverifyApiKey.value();
    if (!key) {
      // No key configured yet — fail cleanly so the client falls back to
      // its local-only pattern analysis instead of hanging or crashing.
      return res.status(503).json({ error: "Phone lookup not configured yet" });
    }

    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 5000);
      const upstream = await fetch(
        `http://apilayer.net/api/validate?access_key=${key}&number=${digits}&country_code=IN`,
        { signal: controller.signal }
      );
      clearTimeout(t);
      const data = await upstream.json();
      if (data && data.success === false) {
        return res.status(502).json({ error: data.error && data.error.info ? data.error.info : "Upstream lookup failed" });
      }
      return res.status(200).json(data);
    } catch (err) {
      return res.status(504).json({ error: "Lookup timed out or failed" });
    }
  }
);
