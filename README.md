# QRaksha

**Scan with privacy. Verify before you trust.**

🔗 **Live app:** [imtiyazkth.github.io/QRaksha](https://imtiyazkth.github.io/QRaksha/) · [qraksha-india.web.app](https://qraksha-india.web.app)
🤖 **Powered by:** [Mesh API](https://app.meshapi.ai) — AI-powered scam analysis, opt-in, consent-gated

QRaksha is a privacy-first web app that helps everyday users — in India and worldwide — catch scams before they fall for them: QR codes, suspicious messages, screenshots, phone numbers, and more, with a permanent one-tap emergency panic mode built in. It runs entirely in the browser for its core checks, with Advance AI Opinion and Analysis (via Mesh API) available for deeper insight.

---

## What it does

### 🔍 QR Code Check
Scan a QR code with your camera or upload an image. The code is decoded and risk-analyzed **entirely in your browser** — nothing is sent anywhere for the free/offline check. You get an instant risk score, a plain-language explanation, and the exact decoded content (including UPI payee/amount/VPA details when it's a payment QR) before you ever tap a link or enter a UPI PIN.

### 💬 Message & Screenshot Check
Paste a suspicious SMS or WhatsApp message, or upload a screenshot, and get a risk breakdown. Text checks run offline/free by default; Advance AI Opinion and Analysis (via [Mesh API](https://app.meshapi.ai)) is available with explicit user consent for a deeper, sharper verdict — explained in the user's own selected language.

### 🗂️ Check by Category
Six dedicated flows, each with its own detection logic:
- **Website URL** — phishing/fake link detection, brand-lookalike and leetspeak-typosquat detection (e.g. `amaz0n-security-alert.com`), suspicious TLDs, live cross-checks against phishunt.io and Google Safe Browsing
- **WhatsApp / Telegram** — chat handle and invite-link scam pattern detection
- **Phone Number** — carrier/line-type lookup (Numverify) plus offline pattern checks (repeating digits, known VoIP-spam prefixes)
- **Email ID** — disposable-domain detection, free-mail + support-impersonation combo detection, brand-lookalike domain detection
- **SMS Header / Number** — financial/courier spoof-message pattern detection
- **Social Media URL** — profile/username impersonation detection (bank+support handles, fake-military/romance-scam personas), not just domain-level checks — since the platform domain (facebook.com, twitter.com) is always legitimate, the *username* is where the scam signal actually lives

Plus a **"Verify with Government Data"** card that routes deepfake-media and untrusted/modded mobile app (`.apk`) reports straight to the official Cyber Crime Portal, since QRaksha doesn't run its own detection engine for those yet.

### 🚨 Panic Mode
A permanent, always-visible emergency banner at the top of the screen. One tap opens a zero-network, zero-ad screen with India's **Stop → Think → Act** guidance, a direct `tel:1930` dialer link to the official Cyber Fraud Helpline, and a link to report at **cybercrime.gov.in**.

### 🛡️ Scam Shield — awareness center
A dedicated education hub, separate from the detection tools above:
- **How to Avoid Scams** — 9 government-sourced safety practices (OTP/PIN secrecy, QR verification before payment, unknown-app installs, fake customer care numbers, 2FA, etc.)
- **Indian Cyber Fraud Statistics** — headline figures (36L+ complaints registered, ₹1,750+ Cr reported losses, rising trend) and the 8 most common scam categories (UPI fraud, QR scams, fake investment, digital arrest, job scams, loan-app scams, phishing, fake support), sourced from I4C / National Cyber Crime Reporting Portal
- **How to Save Your Money From Scammers** — a 6-step action guide
- **If You Have Already Lost Money** — one-tap `tel:1930` call button and a direct link to file a complaint at cybercrime.gov.in

### 📣 Report Directly to a Platform
One-tap links to each platform's own official abuse/report form (Google, X, WhatsApp, Telegram, Facebook, Instagram) — QRaksha never processes these reports itself, it just gets you to the right place faster.

### 🧾 QR Code Generator
Generate your own QR codes for the things people actually scan in real life:
- Social Media Profile
- Marketing Campaign
- Account Card
- Google Review
- Google Maps Location
- App / Play Store Link

### 🌐 Multi-language support
The interface, AI scam explanations, and share text are all available in the user's selected language and persist across sessions (`localStorage`). Fully translated today: **English, Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada.** Listed but not yet fully translated (shown as "beta," falling back to English rather than guessing at safety-critical text): Malayalam, Odia, Punjabi, Assamese, Maithili, Sanskrit, Kashmiri, Nepali, Sindhi, Konkani, Manipuri, Bodo, Santali, Dogri.

### 📤 Share QRaksha
One-tap sharing via the Web Share API (with a copy-link and social fallback for browsers that don't support it), with share text that automatically matches the user's selected language.

### 🏆 Success Stories
Users who avoided a scam using QRaksha can share their story for public awareness, reviewed by a human before publication.

### 🔓 Transparency (Settings)
QRaksha discloses its own roadmap in-app rather than hiding it: the app is free today; possible future additions include non-intrusive ads, an optional premium tier (unlimited AI checks, ad-free), and B2B API licensing — but core safety features (offline QR check, Panic Mode, basic scam detection) are intended to always remain free. The team is also working toward direct API integrations and formal partnerships with government law enforcement authorities.

---

## Why it's built this way

- **Offline-first.** The core QR decode and risk scoring happens on-device. No network round trip stands between you and a safety verdict.
- **Global + local threat-intel.** Offline checks combine worldwide phishing/malware feeds (OpenPhish, PhishTank, URLhaus, Google Safe Browsing) with an India-specific scam-keyword list, so both international and Indian users get relevant, up-to-date signals.
- **Consent before AI.** Anything sent to a server (Advance AI Opinion and Analysis via Mesh API, or screenshot text extraction) requires explicit, informed opt-in — off by default.
- **No fake authority.** QRaksha never impersonates a bank, platform, or government body, and never claims to run detection it doesn't actually have (see the Government Data card above).
- **Transparent about the roadmap.** Sustainability plans are disclosed openly in-app, not hidden until launch.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | HTML, Tailwind CSS, vanilla JavaScript (PWA, installable) |
| QR decoding | [html5-qrcode](https://github.com/mebjas/html5-qrcode) |
| QR generation | qrcodejs, jsPDF |
| Backend | Firebase Cloud Functions (Node.js 20) |
| Database | Firebase Firestore |
| Advance AI Opinion and Analysis | [Mesh API](https://app.meshapi.ai) |
| Threat intel | OpenPhish, URLhaus, phishunt.io, Google Safe Browsing, Numverify |
| Hosting | Firebase Hosting ([qraksha-india.web.app](https://qraksha-india.web.app)) and GitHub Pages ([imtiyazkth.github.io/QRaksha](https://imtiyazkth.github.io/QRaksha/)), both serving the `docs/` directory |

## Project structure

```
qr-verify-scam-shield/
├── docs/                     ← the deployed frontend (Firebase Hosting public dir)
│   ├── index.html            ← main app shell
│   ├── css/                  ← styling (qr-verify-core.css, ai-mode.css)
│   ├── js/                   ← app logic (scanner, risk engine, i18n, AI pipeline, etc.)
│   ├── data/                 ← awareness content, blocklists, platform report links
│   ├── icons/, manifest.json, sw.js  ← PWA assets
│   └── SECURITY.md           ← threat model & mitigations for this project
├── functions/                ← Firebase Cloud Functions (message/screenshot checks, phone lookup, story submission)
├── firestore.rules, firestore.indexes.json, firebase.json
├── rag-corpus/                ← reference material backing Advance AI Opinion and Analysis
├── LICENSE
└── README.md                  ← this file
```

## Getting started

```bash
# install root dependencies
npm install

# install Cloud Functions dependencies
cd functions && npm install && cd ..

# serve the frontend locally (any static file server works)
npx serve docs

# deploy (requires the Firebase CLI and project access)
firebase deploy
```

Advance AI Opinion and Analysis requires a `MESH_API_KEY` configured as a Firebase secret — see `docs/SECURITY.md` for how secrets are handled. Everything else (QR check, Panic Mode, category checks against local blocklists) works with no backend configuration at all.

## Security & privacy

See [`docs/SECURITY.md`](docs/SECURITY.md) for the full threat model — secret handling, XSS mitigations, prompt-injection defenses, rate limiting, and known limitations, documented file-by-file rather than just claimed.

## License

See [`LICENSE`](LICENSE).

## Credits

Built by **Imtiyaz Surjapuri** — Founder & Lead Developer. Powered by [Mesh API](https://app.meshapi.ai).
