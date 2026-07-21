/* ==========================================================================
   FREE-INTEL-CHECK.JS — Tier 2
   Checks URLs and message text against bundled, free, open threat-intel
   snapshots (OpenPhish, PhishTank, URLhaus community feeds) and a
   hand-maintained Indian scam-keyword list. Zero API keys, zero cost,
   completely independent of whether Mesh AI is enabled or reachable.
   These files are same-origin static assets — once the page has loaded
   once, this tier keeps working even with no network at all (they're
   served from the browser cache / are part of the deployed site).
   ========================================================================== */

window.QRVFreeIntel = (function () {
  "use strict";

  let cache = null; // { domains: Set, keywords: [] }

  async function loadLists() {
    if (cache) return cache;
    const [openphish, phishtank, urlhaus, keywords] = await Promise.all([
      fetchJsonSafe("data/blocklists/openphish.json"),
      fetchJsonSafe("data/blocklists/phishtank.json"),
      fetchJsonSafe("data/blocklists/urlhaus.json"),
      fetchJsonSafe("data/blocklists/scam-keywords-in.json"),
    ]);

    const domains = new Set();
    [openphish, phishtank, urlhaus].forEach((list) => {
      (list && list.domains ? list.domains : []).forEach((d) => domains.add(d.toLowerCase()));
    });

    cache = {
      domains,
      keywords: (keywords && keywords.patterns) || [],
      updatedAt: (openphish && openphish.updatedAt) || null,
    };
    return cache;
  }

  async function fetchJsonSafe(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      // Missing/stale blocklist file should never break the app — it just
      // means Tier 2 runs with whatever data it does have.
      return null;
    }
  }

  function extractDomain(url) {
    try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ""); }
    catch (e) { return null; }
  }

  function extractUrls(text) {
    const matches = String(text).match(/https?:\/\/[^\s]+/gi) || [];
    return matches;
  }

  // Returns { flags: [{severity, message, source}], matchedDomain }
  async function checkUrl(url) {
    const lists = await loadLists();
    const domain = extractDomain(url);
    const flags = [];
    if (domain && lists.domains.has(domain)) {
      flags.push({
        severity: "critical",
        message: `This domain (${domain}) appears on public phishing block-lists (OpenPhish/PhishTank/URLhaus).`,
        source: "free-intel",
      });
    }
    return { flags, matchedDomain: domain && lists.domains.has(domain) ? domain : null };
  }

  // Returns { flags, matchedKeywords } for free-text scam-pattern keyword matching
  async function checkText(text) {
    const lists = await loadLists();
    const lower = String(text).toLowerCase();
    const flags = [];
    const matchedKeywords = [];

    lists.keywords.forEach((entry) => {
      if (lower.includes(entry.phrase.toLowerCase())) {
        matchedKeywords.push(entry.phrase);
        flags.push({
          severity: entry.severity || "medium",
          message: entry.explanation || `Matches a known scam pattern: "${entry.phrase}"`,
          source: "free-intel",
        });
      }
    });

    // Also check any URLs embedded in the message text
    const urls = extractUrls(text);
    for (const url of urls) {
      const urlResult = await checkUrl(url);
      flags.push(...urlResult.flags);
    }

    return { flags, matchedKeywords };
  }

  return { loadLists, checkUrl, checkText, extractUrls };
})();
