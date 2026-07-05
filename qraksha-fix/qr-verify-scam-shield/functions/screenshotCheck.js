/* ==========================================================================
   screenshotCheck.js — POST /checkScreenshot
   ========================================================================== */

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { extractTextFromImage } = require("./meshClient");
const { validateImageBase64 } = require("./validateInput");
const { isRateLimited, getClientIp } = require("./rateLimiter");

const meshApiKey = defineSecret("MESH_API_KEY");
const ALLOWED_ORIGIN = "https://YOUR-GITHUB-USERNAME.github.io";
const AI_FEATURE_ENABLED = true;

exports.checkScreenshot = onRequest(
  { secrets: [meshApiKey], region: "asia-south1", cors: [ALLOWED_ORIGIN], memory: "512MiB" },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (!AI_FEATURE_ENABLED) {
      return res.status(503).json({ error: "AI checking is currently disabled" });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Too many requests — please wait a minute and try again" });
    }

    const validation = validateImageBase64(req.body && req.body.image);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    try {
      const extractedText = await extractTextFromImage({
        meshApiKey: meshApiKey.value(),
        base64DataUrl: req.body.image,
      });
      // Only the extracted text is returned — the image itself is never
      // stored or logged anywhere past this request.
      return res.status(200).json({ extractedText });
    } catch (err) {
      console.error("checkScreenshot failed:", err.message); // never log image bytes
      return res.status(502).json({ error: "AI check unavailable right now" });
    }
  }
);
