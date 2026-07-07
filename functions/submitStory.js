/* ==========================================================================
   submitStory.js — POST /submitStory
   Writes to Firestore via the Admin SDK only — the client never gets a
   Firestore SDK reference at all, so there is no read/list path to lock
   down; this Cloud Function IS the entire access control surface.

   Stories are stored with approved:false by default. Nothing here
   auto-publishes to social media — a human should review a story before
   it's ever posted publicly, since these are user-submitted, unmoderated
   text that could otherwise contain spam, third-party personal details,
   or defamatory claims about a named "fraudster."
   ========================================================================== */

const { onRequest } = require("firebase-functions/v2/https");
const { db } = require("./firestore");
const { isRateLimited, getClientIp } = require("./rateLimiter");

const ALLOWED_ORIGIN = "https://imtiyazkth.github.io";
const FRAUD_TYPES = ["QR Code Scam", "WhatsApp Job Fraud", "Fake Customer Care", "Suspicious App", "Other"];
const MAX_NAME_LEN = 80;
const MAX_CITY_LEN = 60;
const MAX_STORY_LEN = 3000;
const MAX_REASONABLE_AMOUNT = 100000000; // ₹10 crore ceiling — sanity bound, not a real limit

// Strips any HTML tags rather than escaping — stories may later be
// rendered in contexts (social captions, plain-text feeds) where
// escaped entities would look broken, so removing tags entirely is
// safer than assuming a particular downstream renderer.
function stripTags(str) {
  return String(str).replace(/<[^>]*>/g, "").trim();
}

exports.submitStory = onRequest(
  { region: "asia-south1", cors: [ALLOWED_ORIGIN] },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Too many submissions — please wait a minute and try again" });
    }

    const body = req.body || {};

    // Consent is mandatory and re-verified server-side — a modified
    // client can't submit consent:false (or omit it) and have this
    // silently accepted.
    if (body.consent !== true) {
      return res.status(400).json({ error: "Consent to publish is required" });
    }

    const fullName = stripTags(body.fullName).slice(0, MAX_NAME_LEN);
    const city = stripTags(body.city).slice(0, MAX_CITY_LEN);
    const story = stripTags(body.story).slice(0, MAX_STORY_LEN);
    const anonymous = body.anonymous === true;
    const fraudType = FRAUD_TYPES.includes(body.fraudType) ? body.fraudType : "Other";
    const amountSaved = Number(body.amountSaved);

    if (!fullName || !city || !story) {
      return res.status(400).json({ error: "Name, city, and story are all required" });
    }
    if (story.length < 20) {
      return res.status(400).json({ error: "Please share a few more details about what happened" });
    }
    if (!Number.isFinite(amountSaved) || amountSaved < 0 || amountSaved > MAX_REASONABLE_AMOUNT) {
      return res.status(400).json({ error: "Amount saved must be a valid, reasonable number" });
    }

    try {
      await db.collection("successStories").add({
        fullName,
        displayName: anonymous ? "Anonymous" : fullName,
        city,
        amountSaved,
        fraudType,
        story,
        anonymous,
        consent: true,
        approved: false, // a human reviews before this is ever shown publicly or posted
        submittedAt: new Date().toISOString(),
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("submitStory failed:", err.message); // never log the story content itself
      return res.status(502).json({ error: "Could not submit right now — please try again shortly" });
    }
  }
);
