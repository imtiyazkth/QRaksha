/* ==========================================================================
   index.js — Firebase Functions entrypoint
   ========================================================================== */

exports.checkMessage = require("./scamCheck").checkMessage;
exports.checkScreenshot = require("./screenshotCheck").checkScreenshot;
exports.aiStatus = require("./aiStatus").aiStatus;
exports.submitStory = require("./submitStory").submitStory;
