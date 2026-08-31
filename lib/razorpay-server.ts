import Razorpay from "razorpay";
import crypto from "crypto";

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

/**
 * Server-side Razorpay SDK instance
 */
export const razorpayInstance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export const RAZORPAY_KEY_ID = keyId;

/**
 * Safe environment diagnostics (never prints secret)
 */
export function getRazorpayDiagnostics() {
  const isKeyConfigured = Boolean(keyId && keyId.trim().length > 0);
  const isSecretConfigured = Boolean(keySecret && keySecret.trim().length > 0);
  const keyMode = keyId.startsWith("rzp_test_")
    ? "TEST"
    : keyId.startsWith("rzp_live_")
    ? "LIVE"
    : "UNKNOWN";

  return {
    keyConfigured: isKeyConfigured,
    keyMode,
    secretConfigured: isSecretConfigured,
  };
}

/**
 * SERVER-SIDE SIGNATURE VERIFICATION
 * Computes HMAC SHA-256(storedOrderId + "|" + paymentId, secret)
 * and performs timing-safe equality comparison against razorpaySignature.
 */
export function verifyRazorpaySignature(
  storedOrderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!storedOrderId || !paymentId || !signature || !keySecret) {
    return false;
  }

  try {
    const payload = `${storedOrderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(payload)
      .digest("hex");

    // Timing-safe buffer comparison to prevent timing side-channel attacks
    const expectedBuf = Buffer.from(expectedSignature, "utf8");
    const signatureBuf = Buffer.from(signature, "utf8");

    if (expectedBuf.length !== signatureBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

/**
 * WEBHOOK SIGNATURE VERIFICATION
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expectedBuf = Buffer.from(expectedSignature, "utf8");
    const signatureBuf = Buffer.from(signature, "utf8");

    if (expectedBuf.length !== signatureBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch {
    return false;
  }
}
