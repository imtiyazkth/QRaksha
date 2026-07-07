/* ==========================================================================
   firestore.js — shared Firebase Admin SDK / Firestore init
   Required independently by any function that needs Firestore, so no
   file ever requires index.js (which would create a circular require).
   ========================================================================== */

const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

module.exports = { db: admin.firestore(), admin };
