/* ==========================================================================
   PANIC-MODE.JS
   Deliberately the simplest file in this project. No fetch calls, no
   dependencies on any other module's state, no async anything. Someone
   opening this is possibly mid-scam-call, scared, and maybe on a bad
   connection — it must open instantly regardless of what else is broken.
   ========================================================================== */

window.QRVPanicMode = (function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  function init() {
    $("btnOpenPanicMode").addEventListener("click", open);
    $("btnClosePanic").addEventListener("click", close);
    $("panicModal").addEventListener("click", (e) => {
      if (e.target.id === "panicModal") close(); // click on backdrop closes it
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  function open() {
    if (window.QRVAdGate) window.QRVAdGate.forceCancel();
    $("panicModal").hidden = false;
  }
  function close() { $("panicModal").hidden = true; }

  return { init, open, close };
})();
