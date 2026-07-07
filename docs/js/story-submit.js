/* ==========================================================================
   STORY-SUBMIT.JS
   Handles the success-story form end-to-end: client-side validation for
   good UX, a real fetch to the submitStory Cloud Function (server-side
   validation is the actual security boundary, not this file), and the
   celebration/share modal on success.
   ========================================================================== */

window.QRVStorySubmit = (function () {
  "use strict";
  const $ = (id) => document.getElementById(id);

  const APP_URL = "https://imtiyazkth.github.io/QRaksha/";
  const VIRAL_MESSAGE =
    `Mera paisa bach gaya! \ud83d\udea8 Aaj mere sath ek bada cyber fraud hone wala tha, lekin maine QRaksha App (${APP_URL}) ka use karke fraud link ko pakad liya. Main bach gaya, aap bhi bachiye! Apne pariwar ko safe rakhne ke liye abhi check karein. #CyberMasiha #QRaksha #CyberSafeIndia`;

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

    const btn = $("btnSubmitStory");
    btn.disabled = true;
    btn.textContent = "Submitting\u2026";

    try {
      const res = await fetch(`${window.QRVConfig.FUNCTIONS_BASE_URL}/submitStory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        showError(data.error || "Something went wrong — please try again.");
        return;
      }
      closeForm();
      openCelebration();
    } catch (err) {
      showError("Couldn't reach the server — check your connection and try again.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Submit";
    }
  }

  /* ------------------------------------------------------------------
     Celebration + share
  ------------------------------------------------------------------ */
  function openCelebration() { $("celebrationModal").hidden = false; }
  function closeCelebration() { $("celebrationModal").hidden = true; }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "QRaksha", text: VIRAL_MESSAGE, url: APP_URL });
      } catch (e) { /* user cancelled the share sheet — not an error */ }
    } else {
      shareWhatsapp(); // sensible fallback on desktop browsers without Web Share API
    }
  }

  function shareWhatsapp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(VIRAL_MESSAGE)}`, "_blank", "noopener,noreferrer");
  }

  function shareX() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(VIRAL_MESSAGE)}`, "_blank", "noopener,noreferrer");
  }

  function shareFacebook() {
    // Facebook's sharer reliably uses only the `u` param for the shared
    // link; `quote` is inconsistently honored depending on FB's own
    // review of the URL, so the message is also copied to the clipboard
    // as a fallback the user can paste in.
    navigator.clipboard && navigator.clipboard.writeText(VIRAL_MESSAGE).catch(() => {});
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(APP_URL)}&quote=${encodeURIComponent(VIRAL_MESSAGE)}`, "_blank", "noopener,noreferrer");
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
  }

  return { init };
})();
