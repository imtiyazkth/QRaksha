#!/usr/bin/env node
/* ==========================================================================
   build-blocklist.js
   Converts raw feed files into { source, updatedAt, domains, ips } JSON.
   Supports: plain text (one URL/domain per line), JSON arrays,
             ThreatFox JSON, Spamhaus IP format.
   ========================================================================== */

const fs   = require("fs");
const path = require("path");
const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}

const inputPath  = getArg("--input");
const outputPath = getArg("--output");
const source     = getArg("--source") || "Unknown source";
const format     = getArg("--format") || "text";

if (!inputPath || !outputPath) {
  console.error("Usage: build-blocklist.js --input <file> --output <file> --source <str> [--format text|json|threatfox|ip]");
  process.exit(1);
}

const raw = fs.existsSync(inputPath) ? fs.readFileSync(inputPath, "utf8") : "";
const domains = new Set();
const ips     = new Set();

function extractDomain(url) {
  try {
    const u = url.startsWith("http") ? new URL(url) : new URL("https://" + url);
    return u.hostname.replace(/^www\./, "").toLowerCase().trim();
  } catch (_) {
    return url.replace(/^www\./, "").toLowerCase().trim();
  }
}

if (format === "threatfox") {
  // ThreatFox API response: {"query_status":"ok","data":[{"ioc":"domain.com","ioc_type":"domain",...}]}
  try {
    const parsed = JSON.parse(raw);
    const items  = parsed.data || [];
    items.forEach((item) => {
      const ioc  = (item.ioc || "").toLowerCase().trim();
      const type = (item.ioc_type || "").toLowerCase();
      if (type === "domain" || type === "url") {
        domains.add(extractDomain(ioc));
      } else if (type === "ip:port" || type === "ip") {
        ips.add(ioc.split(":")[0]);
      }
    });
  } catch (e) {
    console.error("ThreatFox parse error:", e.message);
  }

} else if (format === "json") {
  // Generic JSON array of objects with url/domain fields, or phishunt array of strings
  try {
    const parsed = JSON.parse(raw);
    const items  = Array.isArray(parsed) ? parsed : (parsed.data || parsed.results || []);
    items.forEach((item) => {
      const url = typeof item === "string" ? item : (item.url || item.domain || item.host || "");
      if (url) domains.add(extractDomain(url));
    });
  } catch (e) {
    console.error("JSON parse error:", e.message);
  }

} else if (format === "ip") {
  // Spamhaus DROP — lines like "1.2.3.0/24 ; SBL123456"
  raw.split("\n").forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith(";")) return;
    const ip = line.split(";")[0].trim();
    if (ip) ips.add(ip);
  });

} else {
  // Plain text — one URL or domain per line (OpenPhish, URLhaus, BLP, Phishing Army)
  raw.split("\n").forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;
    domains.add(extractDomain(line));
  });
}

// Remove empty entries
domains.delete("");
ips.delete("");

const output = {
  source,
  updatedAt: new Date().toISOString(),
  totalDomains: domains.size,
  totalIps: ips.size,
  domains: [...domains].sort(),
  ips: ips.size > 0 ? [...ips].sort() : undefined,
};

// Ensure output directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`✓ ${source}: ${domains.size} domains, ${ips.size} IPs → ${outputPath}`);
