/* ==========================================================================
   FIREBASE-INIT.JS
   Initializes the Firebase client SDK (v10, modular, loaded as ES modules
   directly from the CDN in index.html) and exposes `db` + the Firestore
   helpers story-submit.js and verification-engine.js need.
   ========================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp, query, where, limit, getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWwe6FI_d33b5CGDidDqBjuR3TAcxZaSI",
  authDomain: "qraksha-india.firebaseapp.com",
  projectId: "qraksha-india",
  storageBucket: "qraksha-india.firebasestorage.app",
  messagingSenderId: "415501748287",
  appId: "1:415501748287:web:c1290bf2e849a9122dd08a",
  measurementId: "G-FK5XJRB48B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.QRVFirebase = {
  async addSuccessStory(payload) {
    const ref = collection(db, "success_stories");
    return addDoc(ref, { ...payload, submittedAt: serverTimestamp() });
  },

  // Community fraud-signature layer: a shared, crowd-reported list of
  // exact strings (UPI VPAs, phone numbers, email domains, URLs) that
  // other users have already flagged. Checked as a fast lookup
  // alongside the regex-based local engine in verification-engine.js.
  async checkScamSignature(value) {
    try {
      const normalized = String(value).trim().toLowerCase();
      if (!normalized) return null;
      const ref = collection(db, "verified_scam_signatures");
      const q = query(ref, where("signature", "==", normalized), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) return null;
      return snap.docs[0].data();
    } catch (e) {
      return null; // offline or blocked — caller falls back to local-only checks
    }
  },

  async reportScamSignature(value, category, note) {
    const normalized = String(value).trim().toLowerCase();
    if (!normalized) return;
    const ref = collection(db, "verified_scam_signatures");
    return addDoc(ref, {
      signature: normalized,
      category: category || "unknown",
      note: note || "",
      reportedAt: serverTimestamp(),
    });
  },
};

window.dispatchEvent(new CustomEvent("qrv:firebase-ready"));
