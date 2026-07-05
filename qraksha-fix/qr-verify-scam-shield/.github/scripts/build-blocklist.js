#!/usr/bin/env node
/* ==========================================================================
   build-blocklist.js
   Converts a raw free-feed text file (one URL/domain per line, or a JSON
   array depending on --format) into the { source, updatedAt, domains }
   shape that free-intel-check.js expects. Used only by the scheduled
   GitHub Action — never needs to run on your phone.
   ========================================================================== */

const fs = require("fs");

function getArg(name, fallback) {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : fallback;
}

const inputPath = getArg("input");
const outputPath = getArg("output");
const source = getArg("source", "unknown");
const format = getArg("format", "lines"); // "lines" (URLs/domains per line) or "json"

if (!inputPath || !outputPath) {
  console.error("Usage: build-blocklist.js --input <path> --output <path> --source <name> [--format lines|json]");
  process.exit(1);
}

let domains = new Set();

try {
  const raw = fs.readFileSync(inputPath, "utf8").trim();

  if (raw) {
    if (format === "json") {
      const parsed = JSON.parse(raw);
      const entries = Array.isArray(parsed) ? parsed : Object.values(parsed);
      entries.forEach((entry) => {
        const url = typeof entry === "string" ? entry : entry.url || entry.domain;
        const d = extractDomain(url);
        if (d) domains.add(d);
      });
    } else {
      raw.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const d = extractDomain(trimmed);
        if (d) domains.add(d);
      });
    }
  }
} catch (err) {
  console.error(`Could not process ${inputPath}: ${err.message}. Keeping previous snapshot if present.`);
  process.exit(0); // do not fail the whole workflow over one feed being briefly unavailable
}

function extractDomain(value) {
  try {
    const url = value.includes("://") ? value : `http://${value}`;
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch (e) {
    return null;
  }
}

const output = {
  source,
  updatedAt: new Date().toISOString(),
  domains: Array.from(domains).sort(),
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Wrote ${output.domains.length} domains to ${outputPath}`);
