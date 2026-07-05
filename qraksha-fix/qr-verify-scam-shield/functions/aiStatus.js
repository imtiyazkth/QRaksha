/* ==========================================================================
   aiStatus.js
   The entire "developer can switch AI off" mechanism lives in this one
   tiny function. Flip AI_FEATURE_ENABLED below (or better, set it via
   `firebase functions:config:set` / a Secret Manager value you control)
   and redeploy just this function — nothing else in the app needs to
   change, and the frontend degrades to Tier 1 + Tier 2 automatically.
   ========================================================================== */

const { onRequest } = require("firebase-functions/v2/https");

// Simplest possible toggle. For a slightly nicer workflow, this can be
// swapped for `defineString("AI_FEATURE_ENABLED")` from
// firebase-functions/params so you can flip it without editing code —
// left as plain source here for clarity given the current project stage.
const AI_FEATURE_ENABLED = true;

exports.aiStatus = onRequest(
  { region: "asia-south1", cors: true },
  async (req, res) => {
    res.set("Cache-Control", "no-store"); // never let a browser/CDN cache a stale "enabled" state
    res.status(200).json({ enabled: AI_FEATURE_ENABLED });
  }
);
