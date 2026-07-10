# 🛡️ QRaksha — QR Scam Detection & Cyber Safety App

**India's free, multilingual web app to scan QR codes, check suspicious URLs, detect fraud, and report cyber crimes.**

Built entirely from an Android phone using Termux. No laptop required.

[![Live Site](https://img.shields.io/badge/Live_Site-imtiyazkth.github.io/QRaksha-blue)](https://imtiyazkth.github.io/QRaksha/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting_%26_Functions-orange)](https://console.firebase.google.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## What QRaksha Does

| Feature | Description |
|---|---|
| 📷 QR Scanner | Camera-based on-device QR decode — no upload |
| 🔗 URL Risk Check | 3-tier: offline heuristics → blocklists → Mesh AI |
| 📱 Phone Check | India-specific scam number database |
| 💬 SMS/Email Check | Pattern + TRAI sender analysis |
| 🌐 22 Languages | All Eighth Schedule languages (9 fully translated) |
| 🚨 Panic Mode | Instant 1930 helpline + cybercrime.gov.in — offline |
| 🔒 Privacy-first | Camera never leaves device. No scan history stored. |

---

## Project Structure

```
QRaksha/
├── docs/                        ← Static site (served by GitHub Pages + Firebase Hosting)
│   ├── index.html               ← Main app (single responsive file)
│   ├── manifest.json            ← PWA manifest
│   ├── sw.js                    ← Service worker (offline support)
│   ├── icons/                   ← App icons (192px, 512px)
│   ├── data/
│   │   ├── global-scam-signatures.json  ← Known malicious patterns
│   │   ├── cyber-resources.json         ← Awareness resources
│   │   └── blocklists/                  ← Auto-updated PhishTank / OpenPhish / URLhaus
│   └── js/
│       ├── firebase-init.js     ← Firebase SDK init (public config — safe to commit)
│       ├── risk-engine-core.js  ← Heuristic scorer (window.QRVEngine)
│       ├── verification-engine.js ← Full URL/text analysis orchestrator
│       ├── lang.js              ← 22-language translation system (window.QRVLang)
│       ├── mobile-app.js        ← Main app logic, modals, dashboard wiring
│       ├── mobile-scanner.js    ← QR camera scanning
│       ├── ai-scam-check.js     ← Mesh AI integration (via Cloud Function proxy)
│       ├── free-intel-check.js  ← Blocklist lookup
│       ├── dashboard.js         ← Home tab category grid + resources
│       ├── panic-mode.js        ← Panic/emergency mode
│       ├── story-submit.js      ← Success story form
│       ├── sanitize.js          ← Input sanitization
│       ├── consent.js           ← Cookie/service-worker consent banner
│       ├── ad-gate.js           ← Ad gate (blocklist-based)
│       └── config.js            ← App config (API endpoint URLs)
├── functions/                   ← Firebase Cloud Functions (Node.js)
│   ├── index.js                 ← Exports all functions
│   ├── scamCheck.js             ← POST /scamCheck — Mesh AI text analysis
│   ├── screenshotCheck.js       ← POST /screenshotCheck — Mesh AI image analysis
│   ├── phoneLookup.js           ← POST /phoneLookup — NumVerify proxy
│   ├── submitStory.js           ← POST /submitStory — Firestore write
│   ├── meshClient.js            ← Mesh API client (server-side only)
│   ├── rateLimiter.js           ← Rate limiting middleware
│   ├── validateInput.js         ← Input validation
│   ├── firestore.js             ← Firestore helpers
│   ├── aiStatus.js              ← AI service health check
│   ├── .env.example             ← Template — copy to .env, fill real keys
│   └── package.json
├── rag-corpus/                  ← 15 scam scenario texts for AI context
├── .github/
│   ├── scripts/build-blocklist.js     ← Blocklist update script
│   └── workflows/update-blocklists.yml ← Auto-runs daily via GitHub Actions
├── firebase.json                ← Firebase hosting + functions config
├── firestore.rules              ← Firestore security rules
├── .firebaserc                  ← Firebase project alias
└── .gitignore                   ← Excludes .env, node_modules, secrets
```

---

## API Keys — Public vs Private

| Key | Where it lives | Why |
|---|---|---|
| Firebase Web API Key (`apiKey` in `firebase-init.js`) | ✅ Committed — public file | Firebase Web keys are public by design. Security is enforced by Firestore Rules, not by hiding this key. |
| `MESH_API_KEY` | 🔒 Firebase Secret Manager + local `.env` only | Server-side only. Never in frontend code. |
| `NUMVERIFY_API_KEY` | 🔒 Firebase Secret Manager + local `.env` only | Phone lookup proxy. Cloud Function only. |
| `CORS_ORIGIN` (optional env var) | Firebase environment | Adds a custom domain to the CORS allowlist |

---

## Quick Deploy (Termux on Android)

```bash
# 1. Setup (run once)
termux-setup-storage
pkg update && pkg install git nodejs -y
npm install -g firebase-tools

# 2. Clone
git clone https://github.com/imtiyazkth/QRaksha.git
cd QRaksha

# 3. Set secret keys (stays local, never committed)
cd functions && cp .env.example .env
nano .env   # fill MESH_API_KEY and NUMVERIFY_API_KEY

# 4. Login and deploy
firebase login
firebase deploy

# 5. For code changes — push to GitHub Pages
git add docs/
git commit -m "Update"
git push origin main
```

---

## Security

- No secret keys in source code
- All API keys in Firebase Secret Manager
- Input sanitized before any analysis
- Rate limiting on all Cloud Functions
- Firestore Security Rules enforce write restrictions
- CORS allowlist covers only known domains
- See `functions/.env.example` for key names

---

## Founder

**Imtiyaz Surjapuri** — Journalist · Analyst · Civic Tech Builder

Built QRaksha entirely from an Android phone (Termux). Covers political, social, and economic affairs from India and Qatar. Speaking truth without fear.

- 🌐 [ImtiyazSurjapuri.com](https://ImtiyazSurjapuri.com)
- 📘 [Facebook](https://facebook.com/ImtiyaSurjapuri)
- 📸 [Instagram](https://instagram.com/ImtiyazSurjapuri)  
- 🐦 [X / Twitter](https://x.com/Imtiyazkth)
- 📺 [YouTube — How Political](https://youtube.com/@imtiyazvedio)

---

## License

MIT License — see [LICENSE](LICENSE)

*QRaksha is free and will always be free for core safety features.*
