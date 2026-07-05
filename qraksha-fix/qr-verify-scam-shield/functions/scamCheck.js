/* ==========================================================================
   scamCheck.js — POST /checkMessage
   ========================================================================== */

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { classifyAndExplain, searchRagCorpus } = require("./meshClient");
const { validateText } = require("./validateInput");
const { isRateLimited, getClientIp } = require("./rateLimiter");

const meshApiKey = defineSecret("MESH_API_KEY");

// Restrict to your actual deployed frontend — replace before final deploy.
const ALLOWED_ORIGIN = "https://YOUR-GITHUB-USERNAME.github.io";

// Server-side mirror of aiStatus.js's flag. Keeping this check here too
// means someone hitting this endpoint directly (bypassing the frontend's
// /aiStatus check entirely) still can't use it while AI is switched off.
const AI_FEATURE_ENABLED = true;

exports.checkMessage = onRequest(
  { secrets: [meshApiKey], region: "asia-south1", cors: [ALLOWED_ORIGIN] },
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

    const validation = validateText(req.body && req.body.text);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    try {
      const ragContext = await searchRagCorpus({ meshApiKey: meshApiKey.value(), query: validation.value });
      const result = await classifyAndExplain({
        meshApiKey: meshApiKey.value(),
        text: validation.value,
        ragContext,
      });

      if (!result) {
        return res.status(502).json({ error: "AI check unavailable right now" });
      }

      return res.status(200).json({
        score: result.score,
        matchedPattern: result.matchedPattern,
        explanation: result.explanation,
        resolvedModel: result.resolvedModel,
      });
    } catch (err) {
      // Log only what's needed to debug — never the raw message text,
      // which may contain personal information about the user or a
      // third party mentioned in the scam attempt.
      console.error("checkMessage failed:", err.message);
      return res.status(502).json({ error: "AI check unavailable right now" });
    }
  }
);
