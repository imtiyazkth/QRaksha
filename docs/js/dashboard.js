/* ==========================================================================
   DASHBOARD.JS
   Renders the Home tab's 3 sections from data/cyber-resources.json:
   category grid, awareness gallery, platform report router. Everything
   here uses generic emoji icons and text — deliberately no reproduced
   logos or ministry branding (see the "note" field in that JSON file).
   ========================================================================== */

window.QRVDashboard = (function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  let resources = null;

  async function loadResources() {
    if (resources) return resources;
    try {
      const res = await fetch("data/cyber-resources.json");
      resources = await res.json();
    } catch (e) {
      resources = { categories: [], awareness: [], booklets: [], platformReports: [] };
    }
    return resources;
  }

  const CATEGORY_PROMPTS = {
    url: { labelKey: "pasteUrlPrompt", label: "Paste the suspicious URL below", placeholder: "https://example.com/…", engineKey: "WEBSITE_URL" },
    whatsapp: { labelKey: "pasteHandlePrompt", label: "Paste the WhatsApp / Telegram link or handle", placeholder: "https://wa.me/91… or @handle", engineKey: "WHATSAPP_TELEGRAM" },
    phone: { labelKey: "pastePhonePrompt", label: "Enter the suspicious phone number", placeholder: "+91XXXXXXXXXX", engineKey: "PHONE_NUMBER" },
    email: { label: "Paste the suspicious sender's email address", placeholder: "someone@example.com", engineKey: "EMAIL_ID" },
    sms: { label: "Paste the SMS header / sender number", placeholder: "e.g. VM-AXISBK or +91XXXXXXXXXX", engineKey: "SMS_HEADER" },
    social: { label: "Paste the social media profile URL", placeholder: "https://instagram.com/…", engineKey: "SOCIAL_MEDIA" },
  };

  function renderCategoryGrid(categories, onNavigate) {
    const grid = $("dashboardGrid");
    grid.innerHTML = "";
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      if (cat.featured) {
        btn.className = "col-span-2 flex items-center gap-3 rounded-2xl p-4 text-left bg-gradient-to-r from-[#0B2E6B] to-[#123a82] border border-blue-400/30 shadow-[0_0_16px_rgba(29,78,216,0.35)]";
        btn.innerHTML = `
          <span class="text-2xl shrink-0" aria-hidden="true">${cat.icon}</span>
          <span class="flex-1 min-w-0">
            <span class="block font-semibold text-sm text-white">${cat.label}</span>
            <span class="block text-[11px] text-blue-200">${cat.desc}</span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-4 h-4 text-blue-200 shrink-0"><path d="M7 17L17 7M9 7h8v8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        `;
      } else {
        btn.className = "flex flex-col items-start gap-1 rounded-2xl bg-panel border border-line p-4 text-left";
        btn.innerHTML = `
          <span class="text-2xl" aria-hidden="true">${cat.icon}</span>
          <span class="font-medium text-sm text-neutral-100">${cat.label}</span>
          <span class="text-[11px] text-neutral-500">${cat.desc}</span>
          ${cat.supported === false ? '<span class="text-[10px] text-warn mt-1">Coming soon — routes to official report portal</span>' : ""}
        `;
      }
      btn.addEventListener("click", () => {
        if (cat.route === "external" && cat.url) {
          window.open(cat.url, "_blank", "noopener,noreferrer");
        } else if (CATEGORY_PROMPTS[cat.id]) {
          openCategoryInputPanel(cat, onNavigate);
        } else {
          onNavigate("tabMessage");
        }
      });
      grid.appendChild(btn);
    });
  }

  function openCategoryInputPanel(cat, onNavigate) {
    const panel = $("categoryInputPanel");
    if (!panel) { onNavigate("tabMessage"); return; }
    const prompt = CATEGORY_PROMPTS[cat.id];
    const L = window.QRVLang;
    const labelText = prompt.labelKey && L ? L.t(prompt.labelKey) : prompt.label;
    panel.innerHTML = `
      <p class="text-sm font-medium text-neutral-100 mb-2">${escapeHtml(labelText)}</p>
      <textarea id="categoryInputBox" rows="3" placeholder="${escapeHtml(prompt.placeholder)}"
        class="w-full rounded-xl bg-ink border border-line p-3 text-sm text-neutral-100 placeholder:text-neutral-500 mb-3"></textarea>
      <div class="flex gap-2">
        <button id="btnCategoryCheckNow" type="button" class="flex-1 py-2.5 rounded-xl bg-amber text-ink text-sm font-semibold">
          ${L ? escapeHtml(L.t("checkNow")) : "Check now"}
        </button>
        <button id="btnCategoryCancel" type="button" class="px-4 py-2.5 rounded-xl border border-line text-sm text-neutral-300">Cancel</button>
      </div>
    `;
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "center" });
    $("categoryInputBox").focus();

    $("btnCategoryCheckNow").addEventListener("click", async () => {
      const value = $("categoryInputBox").value.trim();
      const checkBtn = $("btnCategoryCheckNow");
      if (!value) return;

      checkBtn.disabled = true;
      checkBtn.textContent = "Checking\u2026";

      const verdict = await window.QRVVerification.handleVerificationCheck(prompt.engineKey, value);

      checkBtn.disabled = false;
      checkBtn.textContent = (window.QRVLang ? window.QRVLang.t("checkNow") : "Check now");
      panel.hidden = true;

      window.QRVVerification.renderVerdictCard("verdictCardDisplay", verdict, () => {
        // "Chat with AI" inside the verdict card — reuses the existing
        // consent + message-check pipeline, pre-filled with context.
        const question = `I checked this ${cat.label}: "${value}"\nVerdict: ${verdict.title}\n\nHow should I respond, and how do I report this to the cyber cell if needed?`;
        onNavigate("tabMessage");
        const msgInput = document.getElementById("msgTextInput");
        if (msgInput) msgInput.value = question;
        window.QRVConsent.requireConsent(async () => {
          await window.QRVAiScamCheck.runMessageCheck(question);
        });
      }, { showGovtRegistryLink: prompt.engineKey === "PHONE_NUMBER", category: prompt.engineKey });
    });
    $("btnCategoryCancel").addEventListener("click", () => { panel.hidden = true; });
  }

  function renderAwarenessGallery(items) {
    const gallery = $("awarenessGallery");
    gallery.innerHTML = "";
    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "snap-start shrink-0 w-64 rounded-2xl bg-panel border border-line p-4";
      card.innerHTML = `
        <p class="font-display font-semibold text-sm text-amber mb-1">${escapeHtml(item.title)}</p>
        <p class="text-xs text-neutral-300 mb-2">${escapeHtml(item.body)}</p>
        <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-[10px] text-neutral-500 underline">Source: ${escapeHtml(item.source)}</a>
      `;
      gallery.appendChild(card);
    });
  }

  const PLATFORM_ICONS = {
    google: { color: "#FFFFFF", svg: '<svg viewBox="0 0 24 24" class="w-8 h-8"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.85A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.67-2.85z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.67 2.85C6.71 7.3 9.14 5.38 12 5.38z"/></svg>' },
    x: { color: "#000000", svg: '<svg viewBox="0 0 24 24" fill="#fff" class="w-5 h-5"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.6l-5.2-6.8L5 22H1.9l8.1-9.3L1 2h6.8l4.7 6.3L18.9 2zm-1.2 18h1.8L7.4 4H5.5l12.2 16z"/></svg>' },
    whatsapp: { color: "#25D366", svg: '<svg viewBox="0 0 24 24" fill="#fff" class="w-6 h-6"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.82.83-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.13-.16.25-.63.8-.78.96-.14.16-.28.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.13-.14.17-.24.25-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28z"/></svg>' },
    telegram: { color: "#26A5E4", svg: '<svg viewBox="0 0 24 24" fill="#fff" class="w-6 h-6"><path d="M21.9 4.5 18.6 20a1.1 1.1 0 0 1-1.7.68l-4.6-3.4-2.3 2.2a.7.7 0 0 1-1.2-.5l.4-4.3L18 8.3c.34-.3-.07-.46-.5-.17l-9.7 6.1-4.2-1.3A.9.9 0 0 1 3.5 11L20.6 3.9c.7-.3 1.5.2 1.3 1.4z"/></svg>' },
    facebook: { color: "#0866FF", svg: '<svg viewBox="0 0 24 24" fill="#fff" class="w-5 h-5"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/></svg>' },
    instagram: { color: "radial-gradient(circle at 30% 110%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" class="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="5" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/></svg>' },
  };

  function renderPlatformReports(platforms) {
    const grid = $("platformReportGrid");
    grid.innerHTML = "";
    platforms.forEach((p) => {
      const icon = PLATFORM_ICONS[p.id] || null;
      const a = document.createElement("a");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "qrv-platform-logo-btn";
      a.innerHTML = `
        <span class="w-11 h-11 rounded-xl flex items-center justify-center" style="background:${icon ? icon.color : "#333"}">
          ${icon ? icon.svg : ""}
        </span>
        <span class="text-[11px] font-medium text-neutral-200">${escapeHtml(p.label)}</span>
      `;
      grid.appendChild(a);
    });
  }

  function escapeHtml(str) {
    return window.QRVSanitize ? window.QRVSanitize.escapeHtml(str) : String(str);
  }

  async function init(onNavigate) {
    const data = await loadResources();
    renderCategoryGrid(data.categories || [], onNavigate);
    renderAwarenessGallery(data.awareness || []);
    renderPlatformReports(data.platformReports || []);
  }

  return { init };
})();
