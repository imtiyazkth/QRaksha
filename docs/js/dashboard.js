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

  function renderCategoryGrid(categories, onNavigate) {
    const grid = $("dashboardGrid");
    grid.innerHTML = "";
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "flex flex-col items-start gap-1 rounded-2xl bg-panel border border-line p-4 text-left";
      btn.innerHTML = `
        <span class="text-2xl" aria-hidden="true">${cat.icon}</span>
        <span class="font-medium text-sm text-neutral-100">${cat.label}</span>
        <span class="text-[11px] text-neutral-500">${cat.desc}</span>
        ${cat.supported === false ? '<span class="text-[10px] text-warn mt-1">Coming soon — routes to official report portal</span>' : ""}
      `;
      btn.addEventListener("click", () => {
        if (cat.route === "external" && cat.url) {
          window.open(cat.url, "_blank", "noopener,noreferrer");
        } else {
          onNavigate("tabMessage");
          if (cat.note) {
            const banner = $("aiUnavailableBanner");
            if (banner && cat.note) { /* category-specific notes shown via alert to avoid overloading the shared banner */ }
          }
        }
      });
      grid.appendChild(btn);
    });
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

  function renderPlatformReports(platforms) {
    const grid = $("platformReportGrid");
    grid.innerHTML = "";
    platforms.forEach((p) => {
      const a = document.createElement("a");
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "flex items-center justify-center rounded-xl bg-panel border border-line py-3 text-xs font-medium text-neutral-200 text-center";
      a.textContent = p.label;
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
