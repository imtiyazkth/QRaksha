/* ==========================================================================
   STORY-SUBMIT.JS
   Handles the success-story form end-to-end: client-side validation for
   good UX, then a direct write to Firestore's `success_stories` collection
   via the Firebase Web SDK (see firebase-init.js) — no longer depends on
   the submitStory Cloud Function, which was never deployed and blocked
   every submission. Server-side enforcement now lives in firestore.rules
   instead. Ends with the celebration/share modal on success.
   ========================================================================== */

window.QRVStorySubmit = (function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  const APP_URL = "https://imtiyazkth.github.io/QRaksha/";
  let lastSubmission = null; // { fullName, city, amountSaved, fraudType, anonymous }

  function buildViralMessage() {
    const amount = lastSubmission ? lastSubmission.amountSaved : 0;
    const fraudType = lastSubmission ? lastSubmission.fraudType : "cyber";
    return `Mera paisa bach gaya! \ud83d\udea8 Maine ek ${fraudType} se ₹${amount.toLocaleString("en-IN")} bachaye QRaksha App (${APP_URL}) ka use karke. Main bach gaya, aap bhi bachiye! Apne pariwar ko safe rakhne ke liye abhi check karein. #CyberMasiha #QRaksha #CyberSafeIndia`;
  }

  /* ------------------------------------------------------------------
     Shareable Image Template Generator — draws a real PNG card via
     Canvas so "share image" is an actual image, not just text.
  ------------------------------------------------------------------ */
  function generateShareImage() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, "#0B0E11");
    gradient.addColorStop(1, "#1a1008");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.fillStyle = "#FFB020";
    ctx.font = "bold 64px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("\ud83d\udee1\ufe0f QRaksha", 540, 160);

    ctx.fillStyle = "#22C55E";
    ctx.font = "bold 88px sans-serif";
    const amount = lastSubmission ? lastSubmission.amountSaved : 0;
    ctx.fillText(`I saved ₹${amount.toLocaleString("en-IN")}`, 540, 480);

    ctx.fillStyle = "#E5E7EB";
    ctx.font = "48px sans-serif";
    const fraudType = lastSubmission ? lastSubmission.fraudType : "a scam";
    ctx.fillText(`from a ${fraudType}`, 540, 560);

    ctx.fillStyle = "#8B95A1";
    ctx.font = "36px sans-serif";
    ctx.fillText("using QRaksha App", 540, 640);
    ctx.fillStyle = "#FFB020";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("\ud83d\udee1\ufe0f Join the movement", 540, 760);

    ctx.fillStyle = "#8B95A1";
    ctx.font = "32px sans-serif";
    ctx.fillText(APP_URL, 540, 980);

    return canvas;
  }

  function openForm() {
    $("storyFormError").hidden = true;
    $("storyForm").reset();
    $("storyFormModal").hidden = false;
  }
  function closeForm() { $("storyFormModal").hidden = true; }

  function showError(msg) {
    $("storyFormError").textContent = msg;
    $("storyFormError").hidden = false;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!$("storyConsent").checked) {
      showError("Consent checkbox is required before submitting.");
      return;
    }

    const payload = {
      fullName: $("storyFullName").value.trim(),
      city: $("storyCity").value.trim(),
      amountSaved: Number($("storyAmount").value),
      fraudType: $("storyFraudType").value,
      story: $("storyDescription").value.trim(),
      anonymous: $("storyAnonymous").checked,
      consent: $("storyConsent").checked,
    };

    if (payload.story.length < 20) {
      showError("Please share a few more details about what happened.");
      return;
    }

    lastSubmission = payload;

    const btn = $("btnSubmitStory");
    btn.disabled = true;
    btn.textContent = "Submitting\u2026";

    try {
      await waitForFirebase();
      if (!window.QRVFirebase) throw new Error("firebase-unavailable");
      await window.QRVFirebase.addSuccessStory(payload);
      closeForm();
      openCelebration();
    } catch (err) {
      if (err && err.message === "firebase-unavailable") {
        showError("Story sharing isn't configured yet on this deployment (Firebase config missing). Your story was NOT lost — please try again in a moment, or contact the team.");
      } else if (!navigator.onLine) {
        showError("You're offline — please check your connection and try again. Your story hasn't been submitted yet.");
      } else {
        showError("Couldn't save your story right now. Please check your connection and try again in a moment.");
      }
    } finally {
      btn.disabled = false;
      btn.textContent = "Submit";
    }
  }

  // firebase-init.js loads as an ES module and may still be initializing
  // when the user hits Submit — wait briefly for the qrv:firebase-ready
  // event rather than failing immediately on a fast connection.
  function waitForFirebase(timeoutMs = 4000) {
    if (window.QRVFirebase) return Promise.resolve();
    return new Promise((resolve) => {
      const onReady = () => { clearTimeout(timer); resolve(); };
      const timer = setTimeout(() => {
        window.removeEventListener("qrv:firebase-ready", onReady);
        resolve(); // resolve anyway — the addSuccessStory call above will throw its own clear error
      }, timeoutMs);
      window.addEventListener("qrv:firebase-ready", onReady, { once: true });
    });
  }

  /* ------------------------------------------------------------------
     Celebration + share
  ------------------------------------------------------------------ */
  function openCelebration() {
    const canvas = generateShareImage();
    const img = $("celebrationShareImage");
    if (img) img.src = canvas.toDataURL("image/png");
    $("celebrationModal").hidden = false;
  }
  function closeCelebration() { $("celebrationModal").hidden = true; }

  async function shareNative() {
    const message = buildViralMessage();
    if (navigator.share) {
      try {
        const canvas = generateShareImage();
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        const file = new File([blob], "qraksha-story.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ title: "QRaksha", text: message, url: APP_URL, files: [file] });
        } else {
          await navigator.share({ title: "QRaksha", text: message, url: APP_URL });
        }
      } catch (e) { /* user cancelled the share sheet — not an error */ }
    } else {
      shareWhatsapp(); // sensible fallback on desktop browsers without Web Share API
    }
  }

  function shareWhatsapp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(buildViralMessage())}`, "_blank", "noopener,noreferrer");
  }

  function shareX() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(buildViralMessage())}`, "_blank", "noopener,noreferrer");
  }

  function shareFacebook() {
    // Facebook's sharer reliably uses only the `u` param for the shared
    // link; `quote` is inconsistently honored depending on FB's own
    // review of the URL, so the message is also copied to the clipboard
    // as a fallback the user can paste in.
    const message = buildViralMessage();
    navigator.clipboard && navigator.clipboard.writeText(message).catch(() => {});
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(APP_URL)}&quote=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function downloadImage() {
    const canvas = generateShareImage();
    const link = document.createElement("a");
    link.download = "qraksha-story.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function copyTextAndShareImage() {
    const message = buildViralMessage();
    try {
      await navigator.clipboard.writeText(message);
    } catch (e) { /* clipboard permission denied — image download still proceeds */ }
    if (navigator.share) {
      await shareNative();
    } else {
      downloadImage();
    }
  }

  function init() {
    $("btnOpenStoryForm").addEventListener("click", openForm);
    $("btnCancelStoryForm").addEventListener("click", closeForm);
    $("storyForm").addEventListener("submit", handleSubmit);

    $("btnCloseCelebration").addEventListener("click", closeCelebration);
    $("btnShareNative").addEventListener("click", shareNative);
    $("btnShareWhatsapp").addEventListener("click", shareWhatsapp);
    $("btnShareX").addEventListener("click", shareX);
    $("btnShareFacebook").addEventListener("click", shareFacebook);
    if ($("btnCopyShareImage")) $("btnCopyShareImage").addEventListener("click", copyTextAndShareImage);
  }

  return { init };
})();
