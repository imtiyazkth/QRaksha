/* ==========================================================================
   QR VERIFY — APPLICATION LOGIC
   "Know Before You Open"

   100% vanilla JavaScript. No frameworks, no backend, no network calls
   except the one-time CDN load of html5-qrcode / jsPDF declared in
   index.html. All decoding and analysis below runs locally in the browser.

   Module map:
     1. State & DOM cache
     2. Theme toggle
     3. Tab switching (Camera / Upload)
     4. Camera scanner   (html5-qrcode)
     5. Image upload scanner (html5-qrcode scanFile)
     6. QR content parser / classifier
     7. Brand detector
     8. Risk engine (offline heuristics)
     9. Human-language explanation generator
    10. Report rendering
    11. Action utilities (copy / open / share / pdf / clear / rescan)
    12. Bootstrap
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. STATE & DOM CACHE
  ------------------------------------------------------------------ */
  const state = {
    html5QrCode: null,
    cameras: [],
    activeCameraIndex: 0,
    isCameraRunning: false,
    isPaused: false,
    torchOn: false,
    torchSupported: false,
    continuous: false,
    lastDecodedText: null,
    lastDecodedAt: 0,
    currentAnalysis: null, // { raw, parsed, risk }
  };

  const $ = (id) => document.getElementById(id);

  const dom = {
    // header
    themeToggle: $("themeToggle"),
    // tabs
    tabCamera: $("tabCamera"),
    tabUpload: $("tabUpload"),
    panelCamera: $("panelCamera"),
    panelUpload: $("panelUpload"),
    // camera
    viewfinder: $("viewfinder"),
    viewfinderPlaceholder: $("viewfinderPlaceholder"),
    cameraStatus: $("cameraStatus"),
    btnStartCamera: $("btnStartCamera"),
    btnPauseCamera: $("btnPauseCamera"),
    btnResumeCamera: $("btnResumeCamera"),
    btnFlipCamera: $("btnFlipCamera"),
    btnFlash: $("btnFlash"),
    btnStopCamera: $("btnStopCamera"),
    continuousScan: $("continuousScan"),
    // upload
    dropzone: $("dropzone"),
    fileInput: $("fileInput"),
    uploadPreview: $("uploadPreview"),
    uploadPreviewImg: $("uploadPreviewImg"),
    btnClearUpload: $("btnClearUpload"),
    // report
    reportSection: $("reportSection"),
    riskGaugeValue: $("riskGaugeValue"),
    riskScoreNumber: $("riskScoreNumber"),
    riskVerdictChip: $("riskVerdictChip"),
    qrTypeHeading: $("qrTypeHeading"),
    qrBrandLine: $("qrBrandLine"),
    qrExplanation: $("qrExplanation"),
    decodedContent: $("decodedContent"),
    dataGrid: $("dataGrid"),
    riskFlags: $("riskFlags"),
    btnOpenLink: $("btnOpenLink"),
    btnCopy: $("btnCopy"),
    btnShare: $("btnShare"),
    btnDownloadReport: $("btnDownloadReport"),
    btnScanAgain: $("btnScanAgain"),
    btnClearScan: $("btnClearScan"),
    toast: $("toast"),
  };

  const GAUGE_CIRCUMFERENCE = 2 * Math.PI * 50; // r=50 from SVG

  /* ------------------------------------------------------------------
     2. THEME TOGGLE
  ------------------------------------------------------------------ */
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("qrv-theme"); } catch (e) { /* storage unavailable */ }
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = saved || (prefersLight ? "light" : "dark");
    applyTheme(theme);
  }

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    dom.themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    dom.themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
    try { localStorage.setItem("qrv-theme", theme); } catch (e) { /* local-only preference, safe to ignore if blocked */ }
  }

  dom.themeToggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    applyTheme(current === "light" ? "dark" : "light");
  });

  /* ------------------------------------------------------------------
     3. TAB SWITCHING
  ------------------------------------------------------------------ */
  function activateTab(which) {
    const camActive = which === "camera";
    dom.tabCamera.classList.toggle("is-active", camActive);
    dom.tabUpload.classList.toggle("is-active", !camActive);
    dom.tabCamera.setAttribute("aria-selected", String(camActive));
    dom.tabUpload.setAttribute("aria-selected", String(!camActive));
    dom.panelCamera.hidden = !camActive;
    dom.panelUpload.hidden = camActive;

    if (!camActive && state.isCameraRunning) {
      stopCamera();
    }
  }
  dom.tabCamera.addEventListener("click", () => activateTab("camera"));
  dom.tabUpload.addEventListener("click", () => activateTab("upload"));

  /* ------------------------------------------------------------------
     4. CAMERA SCANNER (html5-qrcode)
  ------------------------------------------------------------------ */
  function setCameraStatus(text) { dom.cameraStatus.textContent = text; }

  async function listCameras() {
    try {
      state.cameras = await Html5Qrcode.getCameras();
    } catch (err) {
      state.cameras = [];
    }
  }

  async function startCamera() {
    if (typeof Html5Qrcode === "undefined") {
      toast("Scanner library failed to load. Check your internet connection on first load.");
      return;
    }

    setCameraStatus("Requesting camera access…");
    dom.btnStartCamera.disabled = true;

    try {
      if (!state.html5QrCode) {
        state.html5QrCode = new Html5Qrcode("cameraReader", { verbose: false });
      }
      if (!state.cameras.length) await listCameras();

      const cameraConfig = state.cameras.length
        ? { deviceId: { exact: state.cameras[state.activeCameraIndex].id } }
        : { facingMode: "environment" };

      const scanConfig = {
        fps: 12,
        qrbox: (vw, vh) => {
          const size = Math.floor(Math.min(vw, vh) * 0.7);
          return { width: size, height: size };
        },
        aspectRatio: 1.33,
      };

      await state.html5QrCode.start(
        cameraConfig,
        scanConfig,
        onScanSuccess,
        () => { /* per-frame "not found" noise — intentionally ignored */ }
      );

      state.isCameraRunning = true;
      state.isPaused = false;
      dom.viewfinder.classList.add("is-scanning");
      dom.viewfinderPlaceholder.hidden = true;
      setCameraStatus("Scanning — point at a QR code");

      dom.btnStartCamera.hidden = true;
      dom.btnPauseCamera.disabled = false;
      dom.btnStopCamera.disabled = false;
      dom.btnFlipCamera.disabled = state.cameras.length < 2;
      checkTorchSupport();
    } catch (err) {
      setCameraStatus("Camera unavailable");
      toast("Couldn't access the camera. Check permissions and try again.");
      dom.btnStartCamera.disabled = false;
      dom.btnStartCamera.hidden = false;
    }
  }

  async function stopCamera() {
    if (!state.html5QrCode || !state.isCameraRunning) return;
    try {
      await state.html5QrCode.stop();
      state.html5QrCode.clear();
    } catch (err) { /* already stopped */ }
    state.isCameraRunning = false;
    state.isPaused = false;
    state.torchOn = false;
    dom.viewfinder.classList.remove("is-scanning");
    dom.viewfinderPlaceholder.hidden = false;
    setCameraStatus("Camera idle");

    dom.btnStartCamera.hidden = false;
    dom.btnStartCamera.disabled = false;
    dom.btnPauseCamera.disabled = true;
    dom.btnPauseCamera.hidden = false;
    dom.btnResumeCamera.hidden = true;
    dom.btnResumeCamera.disabled = true;
    dom.btnStopCamera.disabled = true;
    dom.btnFlipCamera.disabled = true;
    dom.btnFlash.hidden = true;
  }

  function pauseCamera() {
    if (!state.html5QrCode || !state.isCameraRunning) return;
    state.html5QrCode.pause(true);
    state.isPaused = true;
    setCameraStatus("Paused");
    dom.btnPauseCamera.hidden = true;
    dom.btnResumeCamera.hidden = false;
    dom.btnResumeCamera.disabled = false;
  }

  function resumeCamera() {
    if (!state.html5QrCode || !state.isCameraRunning) return;
    state.html5QrCode.resume();
    state.isPaused = false;
    setCameraStatus("Scanning — point at a QR code");
    dom.btnResumeCamera.hidden = true;
    dom.btnPauseCamera.hidden = false;
    dom.btnPauseCamera.disabled = false;
  }

  async function flipCamera() {
    if (state.cameras.length < 2) return;
    state.activeCameraIndex = (state.activeCameraIndex + 1) % state.cameras.length;
    await stopCamera();
    await startCamera();
  }

  function checkTorchSupport() {
    dom.btnFlash.hidden = true;
    try {
      const videoEl = dom.viewfinder.querySelector("video");
      if (!videoEl || !videoEl.srcObject) return;
      const track = videoEl.srcObject.getVideoTracks()[0];
      const capabilities = track.getCapabilities ? track.getCapabilities() : {};
      if (capabilities && capabilities.torch) {
        state.torchSupported = true;
        dom.btnFlash.hidden = false;
        dom.btnFlash.disabled = false;
      }
    } catch (e) { state.torchSupported = false; }
  }

  async function toggleFlash() {
    if (!state.html5QrCode || !state.torchSupported) {
      toast("Flash isn't supported on this device.");
      return;
    }
    try {
      state.torchOn = !state.torchOn;
      await state.html5QrCode.applyVideoConstraints({ advanced: [{ torch: state.torchOn }] });
      dom.btnFlash.style.color = state.torchOn ? "var(--accent)" : "";
    } catch (err) {
      toast("Flash control isn't available on this browser.");
      state.torchOn = false;
    }
  }

  function onScanSuccess(decodedText) {
    const now = Date.now();
    // de-duplicate rapid repeat callbacks of the same code
    if (decodedText === state.lastDecodedText && now - state.lastDecodedAt < 2500) return;
    state.lastDecodedText = decodedText;
    state.lastDecodedAt = now;

    handleDecodedText(decodedText);

    if (!dom.continuousScan.checked) {
      pauseCamera();
    } else {
      setCameraStatus("Match found — still scanning…");
      setTimeout(() => {
        if (state.isCameraRunning && !state.isPaused) setCameraStatus("Scanning — point at a QR code");
      }, 1500);
    }
  }

  dom.btnStartCamera.addEventListener("click", startCamera);
  dom.btnStopCamera.addEventListener("click", stopCamera);
  dom.btnPauseCamera.addEventListener("click", pauseCamera);
  dom.btnResumeCamera.addEventListener("click", resumeCamera);
  dom.btnFlipCamera.addEventListener("click", flipCamera);
  dom.btnFlash.addEventListener("click", toggleFlash);

  /* ------------------------------------------------------------------
     5. IMAGE UPLOAD SCANNER
  ------------------------------------------------------------------ */
  function handleFiles(fileList) {
    const file = fileList && fileList[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast("Please upload a PNG, JPG, JPEG, or WEBP image.");
      return;
    }

    // preview
    const reader = new FileReader();
    reader.onload = (e) => {
      dom.uploadPreviewImg.src = e.target.result;
      dom.uploadPreview.hidden = false;
    };
    reader.readAsDataURL(file);

    // decode using a fresh, dedicated instance so it never collides with the camera scanner
    const tempId = "uploadScannerTemp";
    let tempDiv = document.getElementById(tempId);
    if (!tempDiv) {
      tempDiv = document.createElement("div");
      tempDiv.id = tempId;
      tempDiv.style.display = "none";
      document.body.appendChild(tempDiv);
    }
    const fileScanner = new Html5Qrcode(tempId, { verbose: false });
    fileScanner
      .scanFile(file, true)
      .then((decodedText) => {
        handleDecodedText(decodedText);
        fileScanner.clear();
      })
      .catch(() => {
        toast("No QR code could be detected in that image.");
        fileScanner.clear();
      });
  }

  dom.fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

  ["dragenter", "dragover"].forEach((evt) =>
    dom.dropzone.addEventListener(evt, (e) => { e.preventDefault(); dom.dropzone.classList.add("is-dragover"); })
  );
  ["dragleave", "drop"].forEach((evt) =>
    dom.dropzone.addEventListener(evt, (e) => { e.preventDefault(); dom.dropzone.classList.remove("is-dragover"); })
  );
  dom.dropzone.addEventListener("drop", (e) => handleFiles(e.dataTransfer.files));

  dom.btnClearUpload.addEventListener("click", () => {
    dom.fileInput.value = "";
    dom.uploadPreview.hidden = true;
    dom.uploadPreviewImg.src = "";
  });

  /* ------------------------------------------------------------------
     6. QR CONTENT PARSER / CLASSIFIER
  ------------------------------------------------------------------ */
  const SHORTENERS = [
    "bit.ly", "tinyurl.com", "cutt.ly", "rebrand.ly", "t.co", "is.gd",
    "ow.ly", "shorturl.at", "buff.ly", "shorte.st", "adf.ly", "lnkd.in", "tiny.cc",
  ];

  const SUSPICIOUS_KEYWORDS = [
    "login", "verify", "reward", "gift", "bonus", "otp", "bank", "payment",
    "wallet", "update", "free", "urgent", "win", "crypto", "secure", "confirm", "suspend",
  ];

  function parseQRContent(raw) {
    const text = (raw || "").trim();
    const result = {
      raw: text,
      type: "unknown",
      typeLabel: "Unknown",
      purpose: "The content of this QR code doesn't match a recognized format.",
      protocol: null,
      url: null,
      domain: null,
      subdomain: null,
      tld: null,
      isHttps: null,
      isShortener: false,
      isIp: false,
      paramCount: 0,
      fields: {}, // extra type-specific fields shown in grid
    };

    if (!text) {
      result.purpose = "Empty QR code.";
      return result;
    }

    // --- WiFi ---
    if (/^WIFI:/i.test(text)) {
      result.type = "wifi";
      result.typeLabel = "WiFi Network";
      result.purpose = "Joins a WiFi network automatically.";
      const ssidMatch = text.match(/S:((?:\\.|[^;])*);/i);
      const passMatch = text.match(/P:((?:\\.|[^;])*);/i);
      const encMatch = text.match(/T:((?:\\.|[^;])*);/i);
      const hiddenMatch = text.match(/H:((?:\\.|[^;])*);/i);
      result.fields = {
        "Network (SSID)": ssidMatch ? unescapeQr(ssidMatch[1]) : "—",
        "Security": encMatch ? encMatch[1].toUpperCase() : "Unknown",
        "Password set": passMatch && passMatch[1] ? "Yes" : "No",
        "Hidden network": hiddenMatch && /true/i.test(hiddenMatch[1]) ? "Yes" : "No",
      };
      return result;
    }

    // --- vCard ---
    if (/^BEGIN:VCARD/i.test(text)) {
      result.type = "vcard";
      result.typeLabel = "Contact Card (vCard)";
      result.purpose = "Adds a contact to your address book.";
      const nameMatch = text.match(/FN:(.*)/i);
      const telMatch = text.match(/TEL[^:]*:(.*)/i);
      const emailMatch = text.match(/EMAIL[^:]*:(.*)/i);
      const orgMatch = text.match(/ORG:(.*)/i);
      result.fields = {
        "Name": nameMatch ? nameMatch[1].trim() : "—",
        "Phone": telMatch ? telMatch[1].trim() : "—",
        "Email": emailMatch ? emailMatch[1].trim() : "—",
        "Organization": orgMatch ? orgMatch[1].trim() : "—",
      };
      return result;
    }

    // --- Calendar event ---
    if (/^BEGIN:VEVENT/i.test(text) || /^BEGIN:VCALENDAR/i.test(text)) {
      result.type = "calendar";
      result.typeLabel = "Calendar Event";
      result.purpose = "Adds an event to your calendar.";
      const summaryMatch = text.match(/SUMMARY:(.*)/i);
      const dtStartMatch = text.match(/DTSTART[^:]*:(.*)/i);
      const locMatch = text.match(/LOCATION:(.*)/i);
      result.fields = {
        "Event": summaryMatch ? summaryMatch[1].trim() : "—",
        "Starts": dtStartMatch ? dtStartMatch[1].trim() : "—",
        "Location": locMatch ? locMatch[1].trim() : "—",
      };
      return result;
    }

    // --- Email ---
    if (/^mailto:/i.test(text)) {
      result.type = "email";
      result.typeLabel = "Email";
      result.purpose = "Opens your email app with a pre-filled recipient.";
      const url = safeParseUrl(text);
      const addr = text.replace(/^mailto:/i, "").split("?")[0];
      const params = url ? Object.fromEntries(url.searchParams) : {};
      result.fields = {
        "To": decodeURIComponent(addr) || "—",
        "Subject": params.subject || "—",
        "Body preview": params.body ? decodeURIComponent(params.body).slice(0, 80) : "—",
      };
      return result;
    }

    // --- SMS ---
    if (/^sms(to)?:/i.test(text)) {
      result.type = "sms";
      result.typeLabel = "SMS Message";
      result.purpose = "Opens your messaging app with a pre-filled text.";
      const body = text.split(":").slice(1).join(":");
      const [number, msg] = body.split(/[:?]/);
      result.fields = {
        "To number": (number || "—").trim(),
        "Message preview": msg ? msg.replace(/^body=/i, "").slice(0, 80) : "—",
      };
      return result;
    }

    // --- Phone ---
    if (/^tel:/i.test(text)) {
      result.type = "phone";
      result.typeLabel = "Phone Call";
      result.purpose = "Dials a phone number.";
      result.fields = { "Number": text.replace(/^tel:/i, "") };
      return result;
    }

    // --- Geolocation ---
    if (/^geo:/i.test(text)) {
      result.type = "location";
      result.typeLabel = "Geographic Location";
      result.purpose = "Opens a map at a specific coordinate.";
      const coords = text.replace(/^geo:/i, "").split(",");
      result.fields = {
        "Latitude": coords[0] || "—",
        "Longitude": (coords[1] || "—").split("?")[0],
      };
      return result;
    }

    // --- UPI Payment ---
    if (/^upi:\/\/pay/i.test(text)) {
      result.type = "upi";
      result.typeLabel = "UPI Payment";
      result.purpose = "Opens a UPI app to complete a payment.";
      const url = safeParseUrl(text);
      const params = url ? Object.fromEntries(url.searchParams) : {};
      result.fields = {
        "Payee (VPA)": params.pa || "—",
        "Payee name": params.pn || "—",
        "Amount": params.am ? `₹${params.am}` : "Not fixed (you'll be asked)",
        "Note": params.tn || "—",
      };
      result.upiHandle = params.pa || "";
      return result;
    }

    // --- Crypto wallets ---
    const cryptoMatch = text.match(/^(bitcoin|ethereum|litecoin|dogecoin|tron|bitcoincash|ripple|solana):(.+)/i);
    if (cryptoMatch) {
      result.type = "crypto";
      result.typeLabel = "Cryptocurrency Wallet";
      result.purpose = `Opens a wallet app to send ${cryptoMatch[1]} to an address.`;
      const address = cryptoMatch[2].split("?")[0];
      result.fields = {
        "Coin": cryptoMatch[1].charAt(0).toUpperCase() + cryptoMatch[1].slice(1),
        "Wallet address": address,
        "Address length": String(address.length),
      };
      return result;
    }

    // --- URL (http/https/www/bare-domain) ---
    const looksLikeUrl = /^https?:\/\//i.test(text) || /^www\./i.test(text) || isLikelyBareDomain(text);
    if (looksLikeUrl) {
      let normalized = text;
      if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;
      const url = safeParseUrl(normalized);

      result.type = "url";
      result.typeLabel = "Website URL";
      result.url = normalized;
      result.protocol = url ? url.protocol.replace(":", "") : (text.startsWith("https") ? "https" : "http");
      result.isHttps = result.protocol === "https";
      result.domain = url ? url.hostname : null;
      result.isIp = result.domain ? /^(\d{1,3}\.){3}\d{1,3}$/.test(result.domain) : false;
      result.paramCount = url ? Array.from(url.searchParams.keys()).length : 0;

      if (result.domain && !result.isIp) {
        const parts = result.domain.split(".");
        result.tld = parts.length > 1 ? parts[parts.length - 1] : null;
        result.subdomain = parts.length > 2 ? parts.slice(0, parts.length - 2).join(".") : null;
      }
      result.isShortener = result.domain ? SHORTENERS.some((s) => result.domain === s || result.domain.endsWith("." + s)) : false;

      // sub-classify recognizable app/service links
      const appInfo = detectAppFromUrl(result.domain, text);
      if (appInfo) {
        result.purpose = appInfo.purpose;
        result.app = appInfo.app;
      } else {
        result.purpose = "Opens a website in your browser.";
      }

      result.fields = {
        "Full URL": text,
      };
      return result;
    }

    // --- Plain text fallback ---
    result.type = "text";
    result.typeLabel = "Plain Text";
    result.purpose = "This QR code just contains text — it doesn't open or trigger anything by itself.";
    return result;
  }

  function unescapeQr(str) {
    return str.replace(/\\([\\;,:])/g, "$1");
  }

  function safeParseUrl(text) {
    try { return new URL(text); } catch (e) { return null; }
  }

  function isLikelyBareDomain(text) {
    // e.g. "example.com/path" with no protocol and no spaces
    return /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/[^\s]*)?$/i.test(text.trim()) && !text.includes(" ") && text.length < 300;
  }

  function detectAppFromUrl(domain, fullText) {
    if (!domain) return null;
    const d = domain.toLowerCase();
    const map = [
      { test: (h) => h === "wa.me" || h.endsWith("whatsapp.com"), app: "WhatsApp", purpose: "Opens a WhatsApp chat." },
      { test: (h) => h === "t.me" || h.endsWith("telegram.org") || h.endsWith("telegram.me"), app: "Telegram", purpose: "Opens a Telegram chat or channel." },
      { test: (h) => h.endsWith("instagram.com"), app: "Instagram", purpose: "Opens an Instagram profile or post." },
      { test: (h) => h.endsWith("facebook.com") || h === "fb.me", app: "Facebook", purpose: "Opens a Facebook page or post." },
      { test: (h) => h.endsWith("youtube.com") || h === "youtu.be", app: "YouTube", purpose: "Opens a YouTube video or channel." },
      { test: (h) => h.endsWith("phonepe.com") || h === "phon.pe", app: "PhonePe", purpose: "Opens PhonePe — likely a payment or link action." },
      { test: (h) => h.endsWith("paytm.com") || h === "paytm.me", app: "Paytm", purpose: "Opens Paytm — likely a payment or link action." },
      { test: (h) => h.endsWith("google.com") || h === "g.co" || h === "goo.gl", app: "Google", purpose: "Opens a Google service." },
      { test: (h) => h.endsWith("amazon.in") || h.endsWith("amazon.com") || h === "amzn.to", app: "Amazon", purpose: "Opens an Amazon product or page." },
      { test: (h) => h.endsWith("flipkart.com") || h === "fkrt.it", app: "Flipkart", purpose: "Opens a Flipkart product or page." },
      { test: (h) => h.endsWith("github.com"), app: "GitHub", purpose: "Opens a GitHub repository or page." },
      { test: (h) => h.endsWith("linkedin.com"), app: "LinkedIn", purpose: "Opens a LinkedIn profile or post." },
      { test: (h) => h.endsWith("twitter.com") || h.endsWith("x.com"), app: "X (Twitter)", purpose: "Opens a post or profile on X." },
      { test: (h) => h.endsWith("npci.org.in") || h.endsWith("bhimupi.org.in"), app: "BHIM / NPCI", purpose: "Relates to a BHIM/UPI payment service." },
    ];
    const match = map.find((m) => m.test(d));
    return match ? { app: match.app, purpose: match.purpose } : null;
  }

  /* ------------------------------------------------------------------
     7. BRAND DETECTION
  ------------------------------------------------------------------ */
  const OFFICIAL_BRANDS = [
    "phonepe.com", "paytm.com", "google.com", "wa.me", "whatsapp.com", "t.me",
    "telegram.org", "youtube.com", "youtu.be", "amazon.in", "amazon.com",
    "flipkart.com", "instagram.com", "facebook.com", "github.com", "linkedin.com",
    "twitter.com", "x.com", "npci.org.in",
  ];

  // UPI handle suffix → likely issuing app (best-effort heuristic, not authoritative)
  const UPI_HANDLE_MAP = [
    { suffix: "ybl", app: "PhonePe" }, { suffix: "ibl", app: "PhonePe" }, { suffix: "axl", app: "PhonePe" },
    { suffix: "paytm", app: "Paytm" },
    { suffix: "okhdfcbank", app: "Google Pay" }, { suffix: "okaxis", app: "Google Pay" },
    { suffix: "oksbi", app: "Google Pay" }, { suffix: "okicici", app: "Google Pay" },
    { suffix: "apl", app: "Amazon Pay" },
    { suffix: "upi", app: "Generic UPI / BHIM" },
  ];

  function detectBrand(parsed) {
    if (parsed.type === "url" && parsed.domain) {
      const isOfficial = OFFICIAL_BRANDS.some((b) => parsed.domain === b || parsed.domain.endsWith("." + b));
      return {
        known: isOfficial,
        label: isOfficial ? (parsed.app ? `Official ${parsed.app} domain` : "Recognized official domain") : "Unrecognized / unofficial domain",
      };
    }
    if (parsed.type === "upi" && parsed.upiHandle) {
      const suffix = parsed.upiHandle.split("@")[1] || "";
      const match = UPI_HANDLE_MAP.find((m) => suffix.toLowerCase().includes(m.suffix));
      return {
        known: !!match,
        label: match ? `Likely linked to ${match.app}` : "Payment handle not in our known-app list",
      };
    }
    return { known: null, label: "Not applicable for this QR type" };
  }

  /* ------------------------------------------------------------------
     8. RISK ENGINE
  ------------------------------------------------------------------ */
  function computeRisk(parsed) {
    let score = 0;
    const flags = [];

    const addFlag = (severity, points, message) => {
      score += points;
      flags.push({ severity, message });
    };

    if (parsed.type === "url") {
      if (!parsed.isHttps) {
        addFlag("high", 25, "Uses unencrypted HTTP instead of HTTPS — data sent to this site isn't protected in transit.");
      } else {
        addFlag("info", 0, "Connection is encrypted with HTTPS.");
      }

      if (parsed.isIp) {
        addFlag("critical", 30, "The link points directly to an IP address instead of a domain name — a common phishing technique.");
      }

      if (/@/.test(parsed.url.replace(/^https?:\/\//i, ""))) {
        addFlag("critical", 30, "The URL contains an \"@\" symbol — browsers ignore everything before it, a classic disguised-link trick.");
      }

      const len = parsed.raw.length;
      if (len > 150) addFlag("medium", 20, `The URL is very long (${len} characters), which can be used to hide the real destination.`);
      else if (len > 90) addFlag("low", 10, `The URL is longer than typical (${len} characters).`);

      if (parsed.paramCount > 6) {
        addFlag("medium", 10, `The link carries an unusually high number of parameters (${parsed.paramCount}).`);
      }

      if (parsed.isShortener) {
        addFlag("medium", 15, "This is a shortened link — the real destination is hidden until you open it.");
      }

      if (parsed.domain && /xn--/i.test(parsed.domain)) {
        addFlag("high", 20, "The domain uses Punycode encoding, sometimes used to mimic a trusted brand with look-alike characters.");
      }

      if (parsed.subdomain && parsed.subdomain.split(".").length >= 3) {
        addFlag("medium", 10, "The domain has an unusually deep subdomain chain.");
      }

      const hostForKeywords = (parsed.domain || "") + " " + parsed.raw;
      const foundKeywords = SUSPICIOUS_KEYWORDS.filter((kw) => new RegExp(kw, "i").test(hostForKeywords));
      if (foundKeywords.length) {
        const pts = Math.min(foundKeywords.length * 8, 32);
        addFlag(foundKeywords.length >= 3 ? "high" : "medium", pts,
          `Contains scam-associated keyword${foundKeywords.length > 1 ? "s" : ""}: ${foundKeywords.slice(0, 5).join(", ")}.`);
      }

      // brand impersonation heuristic: known brand word appears in domain, but domain isn't the official one
      const brandWords = ["phonepe", "paytm", "google", "whatsapp", "amazon", "flipkart", "instagram", "facebook", "youtube", "bank", "sbi", "hdfc", "icici"];
      const domainLower = (parsed.domain || "").toLowerCase();
      const isOfficial = OFFICIAL_BRANDS.some((b) => domainLower === b || domainLower.endsWith("." + b));
      const mentionsBrand = brandWords.some((w) => domainLower.includes(w));
      if (mentionsBrand && !isOfficial) {
        addFlag("critical", 35, "The domain references a well-known brand name but does not match that brand's official domain — a strong sign of impersonation.");
      }

      if (!flags.some((f) => f.severity !== "info")) {
        addFlag("info", 0, "No obvious danger was detected in this link's structure.");
      }
    }

    if (parsed.type === "upi") {
      addFlag("info", 5, "Always check the payee name shown in your UPI app before approving any payment.");
      if (parsed.fields["Amount"] && parsed.fields["Amount"] !== "Not fixed (you'll be asked)") {
        addFlag("low", 5, "This QR requests a pre-filled amount — confirm it matches what you expect to pay.");
      }
    }

    if (parsed.type === "wifi") {
      const security = (parsed.fields["Security"] || "").toLowerCase();
      if (!security || security === "nopass") {
        addFlag("medium", 20, "This connects to an open WiFi network with no password — traffic on open networks can be intercepted.");
      }
    }

    if (parsed.type === "crypto") {
      addFlag("medium", 15, "Cryptocurrency transfers can't be reversed — verify the wallet address character-by-character before sending funds.");
    }

    if (parsed.type === "text") {
      addFlag("info", 0, "This is plain text with no link or action — generally low risk.");
    }

    if (parsed.type === "unknown") {
      addFlag("low", 10, "The content format wasn't recognized, so it couldn't be fully analyzed.");
    }

    score = Math.max(0, Math.min(100, Math.round(score)));
    let level = "low";
    if (score >= 75) level = "critical";
    else if (score >= 50) level = "high";
    else if (score >= 25) level = "medium";

    return { score, level, flags };
  }

  /* ------------------------------------------------------------------
     9. HUMAN-LANGUAGE EXPLANATION
  ------------------------------------------------------------------ */
  function buildExplanation(parsed, risk, brand) {
    const sentences = [];

    switch (parsed.type) {
      case "url":
        sentences.push(parsed.app ? `This QR opens a website — it appears to be ${parsed.app}.` : "This QR opens a website.");
        sentences.push(parsed.isHttps ? "This connection uses HTTPS." : "This connection uses plain HTTP, not HTTPS.");
        if (parsed.isShortener) sentences.push("This may be a shortened link, so the real destination is hidden until you open it.");
        if (brand.known === false) sentences.push("This domain isn't on our list of recognized official brand domains.");
        break;
      case "upi":
        sentences.push(`This appears to be a UPI payment request${parsed.fields["Payee name"] && parsed.fields["Payee name"] !== "—" ? ` to "${parsed.fields["Payee name"]}"` : ""}.`);
        sentences.push("Always confirm the payee name and amount inside your UPI app before paying.");
        break;
      case "wifi":
        sentences.push(`This QR connects your device to the WiFi network "${parsed.fields["Network (SSID)"]}".`);
        break;
      case "vcard":
        sentences.push("This QR adds a contact card to your phone.");
        break;
      case "calendar":
        sentences.push("This QR adds an event to your calendar.");
        break;
      case "email":
        sentences.push("This QR opens your email app with a message ready to send.");
        break;
      case "sms":
        sentences.push("This QR opens your messaging app with a text ready to send.");
        break;
      case "phone":
        sentences.push("This QR starts a phone call.");
        break;
      case "location":
        sentences.push("This QR opens a map at a specific location.");
        break;
      case "crypto":
        sentences.push("This QR contains a cryptocurrency wallet address for sending funds.");
        break;
      case "text":
        sentences.push("This QR just contains plain text. It won't open a link or trigger any action.");
        break;
      default:
        sentences.push("We couldn't confidently classify the content of this QR code.");
    }

    if (risk.level === "low") sentences.push("No obvious danger was detected.");
    else if (risk.level === "medium") sentences.push("A few details are worth double-checking before you continue.");
    else if (risk.level === "high") sentences.push("Several warning signs were found — proceed with real caution.");
    else if (risk.level === "critical") sentences.push("Multiple serious warning signs were found. We strongly recommend not opening or paying this.");

    return sentences.join(" ");
  }

  /* ------------------------------------------------------------------
     10. REPORT RENDERING
  ------------------------------------------------------------------ */
  function handleDecodedText(rawText) {
    const parsed = parseQRContent(rawText);
    const brand = detectBrand(parsed);
    const risk = computeRisk(parsed);
    const explanation = buildExplanation(parsed, risk, brand);

    state.currentAnalysis = { raw: rawText, parsed, brand, risk, explanation, scannedAt: new Date() };
    renderReport(state.currentAnalysis);

    dom.reportSection.hidden = false;
    dom.reportSection.scrollIntoView({ behavior: "smooth", block: "start" });

    // Non-breaking integration hook for app.js / ai-scam-check.js — lets
    // the AI-second-opinion feature react to new scan results without
    // this closure exposing any of its internal state directly.
    document.dispatchEvent(new CustomEvent("qrv:qr-analysis-ready", {
      detail: { score: risk.score, raw: rawText },
    }));
  }

  function renderReport(analysis) {
    const { raw, parsed, brand, risk, explanation } = analysis;

    // Gauge
    const offset = GAUGE_CIRCUMFERENCE * (1 - risk.score / 100);
    dom.riskGaugeValue.style.strokeDashoffset = String(offset);
    const riskColorVar = { low: "var(--risk-low)", medium: "var(--risk-medium)", high: "var(--risk-high)", critical: "var(--risk-critical)" }[risk.level];
    dom.riskGaugeValue.style.stroke = riskColorVar;
    dom.riskScoreNumber.textContent = String(risk.score);
    dom.riskScoreNumber.style.fill = riskColorVar;

    const levelLabels = { low: "Low Risk", medium: "Medium Risk", high: "High Risk", critical: "Critical Risk" };
    dom.riskVerdictChip.textContent = levelLabels[risk.level];
    dom.riskVerdictChip.setAttribute("data-level", risk.level);

    // Summary
    dom.qrTypeHeading.textContent = parsed.typeLabel;
    dom.qrBrandLine.textContent = brand.label;
    dom.qrExplanation.textContent = explanation;

    // Console
    dom.decodedContent.textContent = raw;

    // Data grid
    dom.dataGrid.innerHTML = "";
    const gridItems = buildGridItems(parsed);
    gridItems.forEach(([label, value, mono]) => {
      if (value === undefined || value === null || value === "") return;
      const item = document.createElement("div");
      item.className = "qrv-grid__item";
      item.innerHTML = `<span class="qrv-grid__label">${escapeHtml(label)}</span><span class="qrv-grid__value${mono ? " qrv-grid__value--mono" : ""}">${escapeHtml(String(value))}</span>`;
      dom.dataGrid.appendChild(item);
    });

    // Flags
    dom.riskFlags.innerHTML = "";
    risk.flags
      .filter((f) => f.severity !== "info" || f.message)
      .forEach((f) => {
        const row = document.createElement("div");
        row.className = "qrv-flag";
        row.setAttribute("data-severity", f.severity);
        row.innerHTML = `${flagIcon(f.severity)}<span>${escapeHtml(f.message)}</span>`;
        dom.riskFlags.appendChild(row);
      });

    // Actions
    if (parsed.type === "url" && parsed.url) {
      dom.btnOpenLink.hidden = false;
      dom.btnOpenLink.onclick = () => window.open(parsed.url, "_blank", "noopener,noreferrer");
    } else if (parsed.type === "phone") {
      dom.btnOpenLink.hidden = false;
      dom.btnOpenLink.textContent = "Call Number";
      dom.btnOpenLink.onclick = () => { window.location.href = raw; };
    } else if (parsed.type === "upi") {
      dom.btnOpenLink.hidden = false;
      dom.btnOpenLink.textContent = "Open in UPI App";
      dom.btnOpenLink.onclick = () => { window.location.href = raw; };
    } else {
      dom.btnOpenLink.hidden = true;
      dom.btnOpenLink.textContent = "Open Link";
    }
  }

  function buildGridItems(parsed) {
    const items = [
      ["Detected Type", parsed.typeLabel],
      ["Detected App", parsed.app || "—"],
      ["Protocol", parsed.protocol ? parsed.protocol.toUpperCase() : "—"],
      ["HTTPS / HTTP", parsed.type === "url" ? (parsed.isHttps ? "HTTPS (secure)" : "HTTP (not secure)") : "—"],
      ["Domain", parsed.domain || "—", true],
      ["Subdomain", parsed.subdomain || "None", true],
      ["Top-Level Domain", parsed.tld ? "." + parsed.tld : "—"],
      ["Short URL Detected", parsed.type === "url" ? (parsed.isShortener ? "Yes" : "No") : "—"],
      ["Character Count", String(parsed.raw.length)],
      ["Encoding", detectEncodingLabel(parsed.raw)],
      ["QR Version", "Not exposed by browser decoder"],
    ];
    // append type-specific fields
    Object.entries(parsed.fields || {}).forEach(([k, v]) => items.push([k, v, true]));
    return items;
  }

  function detectEncodingLabel(text) {
    if (/^[\x00-\x7F]*$/.test(text)) return "ASCII / UTF-8 (Latin)";
    return "UTF-8 (extended characters)";
  }

  function flagIcon(severity) {
    const paths = {
      info: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 7.2v4M8 5.2v.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
      low: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 8.3 7.2 10l3.3-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
      medium: '<path d="M8 1.8 14.7 13.5H1.3L8 1.8Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 6.5v3M8 11.5v.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
      high: '<path d="M8 1.8 14.7 13.5H1.3L8 1.8Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 6.5v3M8 11.5v.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
      critical: '<circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    };
    return `<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">${paths[severity] || paths.info}</svg>`;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ------------------------------------------------------------------
     11. ACTION UTILITIES
  ------------------------------------------------------------------ */
  let toastTimer = null;
  function toast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => dom.toast.classList.remove("is-visible"), 2800);
  }

  dom.btnCopy.addEventListener("click", async () => {
    if (!state.currentAnalysis) return;
    try {
      await navigator.clipboard.writeText(state.currentAnalysis.raw);
      toast("Copied decoded content to clipboard.");
    } catch (e) {
      toast("Couldn't copy automatically — please select and copy manually.");
    }
  });

  dom.btnShare.addEventListener("click", async () => {
    if (!state.currentAnalysis) return;
    const { parsed, risk } = state.currentAnalysis;
    const shareText = `QRaksha report\nType: ${parsed.typeLabel}\nRisk: ${risk.score}/100 (${risk.level})\nContent: ${state.currentAnalysis.raw}`;
    if (navigator.share) {
      try { await navigator.share({ title: "QRaksha Report", text: shareText }); }
      catch (e) { /* user cancelled */ }
    } else {
      try { await navigator.clipboard.writeText(shareText); toast("Sharing isn't supported here — report copied instead."); }
      catch (e) { toast("Sharing isn't supported on this browser."); }
    }
  });

  dom.btnScanAgain.addEventListener("click", () => {
    if (!dom.panelCamera.hidden && state.isCameraRunning) {
      resumeCamera();
    } else if (!dom.panelCamera.hidden) {
      startCamera();
    } else {
      activateTab("camera");
    }
    dom.reportSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  dom.btnClearScan.addEventListener("click", () => {
    state.currentAnalysis = null;
    dom.reportSection.hidden = true;
    dom.uploadPreview.hidden = true;
    dom.fileInput.value = "";
    state.lastDecodedText = null;
  });

  dom.btnDownloadReport.addEventListener("click", () => {
    if (!state.currentAnalysis) return;
    try {
      generatePdfReport(state.currentAnalysis);
    } catch (e) {
      toast("Couldn't generate the PDF in this browser.");
    }
  });

  function generatePdfReport(analysis) {
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) { toast("PDF library failed to load."); return; }
    const { raw, parsed, brand, risk, explanation, scannedAt } = analysis;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 48;
    let y = margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(20, 30, 35);
    doc.text("QRaksha — Security Report", margin, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110, 120, 125);
    doc.text(`Generated locally on ${scannedAt.toLocaleString()}`, margin, y);
    y += 28;

    doc.setDrawColor(220, 224, 226);
    doc.line(margin, y, 547, y);
    y += 24;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(20, 30, 35);
    doc.text(`Risk Score: ${risk.score} / 100  (${risk.level.toUpperCase()})`, margin, y);
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Type: ${parsed.typeLabel}`, margin, y); y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Brand: ${brand.label}`, margin, y); y += 16;
    doc.text(`App: ${parsed.app || "—"}`, margin, y); y += 16;
    if (parsed.domain) { doc.text(`Domain: ${parsed.domain}`, margin, y); y += 16; }
    if (parsed.protocol) { doc.text(`Protocol: ${parsed.protocol.toUpperCase()}`, margin, y); y += 16; }
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Explanation:", margin, y); y += 16;
    doc.setFont("helvetica", "normal");
    const explLines = doc.splitTextToSize(explanation, 500);
    doc.text(explLines, margin, y);
    y += explLines.length * 14 + 12;

    doc.setFont("helvetica", "bold");
    doc.text("Risk Flags:", margin, y); y += 16;
    doc.setFont("helvetica", "normal");
    if (risk.flags.length) {
      risk.flags.forEach((f) => {
        const lines = doc.splitTextToSize(`• [${f.severity.toUpperCase()}] ${f.message}`, 500);
        if (y > 760) { doc.addPage(); y = margin; }
        doc.text(lines, margin, y);
        y += lines.length * 14 + 4;
      });
    } else {
      doc.text("None.", margin, y); y += 16;
    }
    y += 8;

    if (y > 700) { doc.addPage(); y = margin; }
    doc.setFont("helvetica", "bold");
    doc.text("Decoded Content:", margin, y); y += 16;
    doc.setFont("courier", "normal");
    doc.setFontSize(9.5);
    const rawLines = doc.splitTextToSize(raw, 500);
    rawLines.forEach((line) => {
      if (y > 780) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += 12;
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(140, 150, 155);
    doc.text("Generated entirely on-device by QRaksha — no data was uploaded or stored. Created by Imtiyaz Surjapuri.", margin, 812);

    doc.save("qr-verify-report.pdf");
    toast("Report downloaded.");
  }

  /* ------------------------------------------------------------------
     12. BOOTSTRAP
  ------------------------------------------------------------------ */
  function init() {
    initTheme();
    $("year").textContent = String(new Date().getFullYear());

    // Keyboard support for dropzone (it's a <label>, native click works on Enter/Space already)
    dom.dropzone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dom.fileInput.click(); }
    });

    // Stop camera cleanly if the user navigates away
    window.addEventListener("beforeunload", () => {
      if (state.isCameraRunning && state.html5QrCode) {
        try { state.html5QrCode.stop(); } catch (e) { /* noop */ }
      }
    });

    // Warn (without blocking) if library failed to load due to no network on first visit
    window.addEventListener("load", () => {
      if (typeof Html5Qrcode === "undefined") {
        toast("Scanner library couldn't load — check your connection, then reload.");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
