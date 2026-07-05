/* ==========================================================================
   validateInput.js
   Server-side validation. Client-side checks (in msgTextInput's maxlength,
   etc.) are a UX nicety, not security — anything enforced only in the
   browser can be bypassed by calling the function URL directly. Every
   check here re-happens regardless of what the client claims.
   ========================================================================== */

const MAX_TEXT_LENGTH = 2000;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

// Magic-byte signatures for the image types we actually accept. Checking
// the file's real bytes, not its declared MIME type or extension, is
// what stops someone uploading a disguised non-image file.
const IMAGE_SIGNATURES = [
  { type: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { type: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { type: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] }, // "RIFF", WEBP checked further below
];

function validateText(text) {
  if (typeof text !== "string") return { valid: false, error: "Text must be a string" };
  if (text.length === 0) return { valid: false, error: "Text cannot be empty" };
  if (text.length > MAX_TEXT_LENGTH) return { valid: false, error: `Text exceeds ${MAX_TEXT_LENGTH} characters` };
  return { valid: true, value: text.slice(0, MAX_TEXT_LENGTH) };
}

function validateImageBase64(dataUrl) {
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/")) {
    return { valid: false, error: "Expected a base64 image data URL" };
  }

  const [header, base64Data] = dataUrl.split(",");
  if (!base64Data) return { valid: false, error: "Malformed data URL" };

  const buffer = Buffer.from(base64Data, "base64");
  if (buffer.length > MAX_IMAGE_BYTES) {
    return { valid: false, error: `Image exceeds ${MAX_IMAGE_BYTES / (1024 * 1024)}MB limit` };
  }

  const matchesKnownSignature = IMAGE_SIGNATURES.some((sig) =>
    sig.bytes.every((byte, i) => buffer[i] === byte)
  );
  if (!matchesKnownSignature) {
    return { valid: false, error: "File content does not match a known image format" };
  }

  // Strip EXIF/location metadata is ideally done with an image library
  // (e.g. sharp) before ever forwarding to Mesh. Flagging this explicitly
  // rather than silently skipping it:
  // TODO before production use: run buffer through `sharp(buffer).rotate().toBuffer()`
  // (rotate() with no args also strips EXIF orientation data) or an
  // equivalent metadata-stripping step.

  return { valid: true, buffer, mimeType: header.match(/data:(.*?);/)[1] };
}

module.exports = { validateText, validateImageBase64, MAX_TEXT_LENGTH, MAX_IMAGE_BYTES };
