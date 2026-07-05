/* ==========================================================================
   rateLimiter.js
   A simple in-memory sliding-window limiter, keyed by client IP. This is
   deliberately lightweight for a hackathon-scale deployment.

   Honest limitation: Cloud Functions can run multiple instances under
   load, and this counter is per-instance, not shared across all of them.
   For this project's scale that's an acceptable trade-off, but it is NOT
   a substitute for the CORS + input-size limits + budget alert already
   in place — those matter more here. If this app ever needs real
   distributed rate limiting, move the counter into Firestore or a
   dedicated store (e.g. Redis via Memorystore) instead of this Map.
   ========================================================================== */

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 8; // generous for a real user, tight for a script

const hits = new Map(); // ip -> [timestamps]

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = (hits.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

function getClientIp(req) {
  // Cloud Functions sit behind Google's front end, which sets this header.
  // Never trust a client-supplied IP header instead of this one.
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.ip || "unknown";
}

module.exports = { isRateLimited, getClientIp };
