# QRaksha
### QR Verify + Scam Shield, unified under one name

A privacy-first QR code scanner and offline risk analyzer — now extended
with a scam message/screenshot checker. Built for the Mesh API Hackathon
2026.

## What it does

**QR Code Check** (the original QR Verify engine, unchanged): scan a QR code
via camera or image upload, decode it entirely in your browser, and get an
instant offline risk analysis — protocol, domain shape, known scam
keywords, brand impersonation checks — before you ever tap a link or pay
a rupee.

**Message / Screenshot Check** (new): paste a suspicious SMS or WhatsApp
message, or upload a screenshot of a notice (fake "digital arrest" call,
KYC fraud text, courier threat), and get a risk breakdown in plain
Hindi + English.

**Panic Mode** (new): a one-tap, always-available, zero-network emergency
screen with India's official Stop → Think → Act guidance, a direct
`tel:1930` link, and a link to cybercrime.gov.in — for someone who needs
help right now, not after a page loads.

## The three-tier system — this is the important part

This app is designed so that **AI is a bonus layer, never a dependency.**
The developer can disable the AI feature entirely (e.g. for cost control)
at any time, and everything else keeps working:

| Tier | What it does | Network needed? | Costs money? |
|---|---|---|---|
| **1 — Offline heuristics** | QR risk scoring (existing) + message keyword scoring (new) | No | No |
| **2 — Open threat-intel** | Checks URLs/domains against free OpenPhish, PhishTank, and URLhaus community feeds, plus a hand-curated Indian scam-phrase list | Only to fetch bundled static files, no live API calls | No |
| **3 — Mesh AI second opinion** | Deeper reasoning via Mesh API's auto-routed models, grounded against a RAG corpus of real Indian scam patterns; required for reading screenshot content | Yes | Yes — and can be switched off at any time via `functions/aiStatus.js` |

If Tier 3 is off, times out, or errors for any reason, the app shows a
calm "AI unavailable — showing offline + open threat-intel analysis only"
message and continues working. It never blocks or breaks Tier 1/2.

## Privacy

- QR scanning and the offline message heuristics never send anything
  anywhere — everything runs in your browser.
- The open threat-intel checks (Tier 2) only fetch static files bundled
  with the app; no personal data is sent to OpenPhish/PhishTank/URLhaus.
- The AI second opinion (Tier 3) is **off by default** and requires
  explicit, one-time consent before any message or screenshot is sent to
  our backend, which forwards it to Mesh API. Nothing is stored
  afterward — see `docs/SECURITY.md` for the full data-handling review.

## Project structure

```
public/            frontend — GitHub Pages
  index.html
  css/              base styles (existing) + new ai-mode.css
  js/               qr-verify-core.js (existing, unchanged) + new modules
  data/blocklists/  bundled free threat-intel snapshots
functions/          Firebase Cloud Functions — the only place the Mesh key lives
rag-corpus/         seed scam-pattern documents uploaded to Mesh's RAG feature
.github/workflows/  scheduled job that refreshes the free blocklists
docs/SECURITY.md    full security review + AI-off test checklist
```

## Setup

See the companion setup guide for the full Firebase Functions + API-key
walkthrough (Android/Termux-friendly, no laptop required). Short version:

```bash
firebase login --no-localhost
firebase init functions
firebase functions:secrets:set MESH_API_KEY
firebase deploy --only functions
```

Then update `FUNCTIONS_BASE_URL` in `public/js/config.js` and
`ALLOWED_ORIGIN` in `functions/scamCheck.js` / `functions/screenshotCheck.js`
to match your deployed URLs.

## Credits

Built by **Imtiyaz Surjapuri** — [@Imtiyazkth](https://x.com/Imtiyazkth) ·
[ImtiyazSurjapuri.com](https://imtiyazsurjapuri.com)

Powered by [Mesh API](https://meshapi.ai) for AI model routing —
integration lives in `functions/meshClient.js`, `functions/scamCheck.js`,
and `functions/screenshotCheck.js`.

Free threat-intelligence data from OpenPhish, PhishTank, and URLhaus
(abuse.ch) community feeds.
