import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp,
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
};

window.dispatchEvent(new CustomEvent("qrv:firebase-ready"));
