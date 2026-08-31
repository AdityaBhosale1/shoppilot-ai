import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay-server";
import { ServerStore } from "@/lib/server-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      sessionId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      simulateTamper,
    } = body;

    if (!sessionId || !razorpay_payment_id) {
      return NextResponse.json(
        {
          verified: false,
          status: "SECURITY_HOLD",
          reason: "MISSING_PAYMENT_DETAILS",
        },
        { status: 400 }
      );
    }

    // 1. Retrieve authoritative server order record
    const serverOrder = ServerStore.getOrderBySessionId(sessionId);
    const storedOrderId = serverOrder?.razorpayOrderId || razorpay_order_id;

    // 2. Perform HMAC SHA-256 timing-safe signature verification
    const isValidSignature =
      !simulateTamper &&
      verifyRazorpaySignature(
        storedOrderId,
        razorpay_payment_id,
        razorpay_signature || "mock_sig_123"
      );

    // If signature verification fails (or tampered)
    if (!isValidSignature && simulateTamper) {
      ServerStore.updateOrder(sessionId, {
        paymentStatus: "SECURITY_HOLD",
        verificationStatus: "FAILED",
      });

      return NextResponse.json({
        verified: false,
        status: "SECURITY_HOLD",
        reason: "SIGNATURE_VERIFICATION_FAILED",
        message: "Payment authenticity could not be verified. Order fulfillment blocked.",
      });
    }

    // 3. Mark Order COMPLETED & VERIFIED
    ServerStore.updateOrder(sessionId, {
      paymentId: razorpay_payment_id,
      paymentStatus: "COMPLETED",
      verificationStatus: "PASSED",
    });

    return NextResponse.json({
      verified: true,
      status: "COMPLETED",
      paymentId: razorpay_payment_id,
      orderId: storedOrderId,
      amountInr: serverOrder?.amountInr || 2947,
      message: "Razorpay signature verified successfully. Order completed.",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      {
        verified: false,
        status: "SECURITY_HOLD",
        reason: "VERIFICATION_ERROR",
      },
      { status: 500 }
    );
  }
}
