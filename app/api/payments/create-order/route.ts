import { NextRequest, NextResponse } from "next/server";
import { recalculateAndValidateCart } from "@/lib/catalog-authority";
import {
  razorpayInstance,
  RAZORPAY_KEY_ID,
  getRazorpayDiagnostics,
} from "@/lib/razorpay-server";
import { ServerStore } from "@/lib/server-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId = "SP-1047", items, customerApproved } = body;

    // 1. DIAGNOSTICS & CREDENTIAL VALIDATION
    const diagnostics = getRazorpayDiagnostics();
    if (!diagnostics.keyConfigured || !diagnostics.secretConfigured) {
      return NextResponse.json(
        {
          success: false,
          status: "ORDER_CREATION_FAILED",
          reason: "RAZORPAY_CREDENTIALS_MISSING",
          message:
            "Razorpay API keys missing in .env.local. Configure NEXT_PUBLIC_RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET.",
          diagnostics,
        },
        { status: 400 }
      );
    }

    // 2. POLICY CHECK: Customer Approval Required
    if (!customerApproved) {
      return NextResponse.json(
        {
          success: false,
          status: "PAYMENT_BLOCKED",
          reason: "USER_APPROVAL_REQUIRED",
          message: "Explicit customer approval is required before checkout creation.",
          diagnostics,
        },
        { status: 400 }
      );
    }

    // 3. SERVER-SIDE AUTHORITATIVE CART RECALCULATION & POLICY CHECKS
    const cartResult = recalculateAndValidateCart(items);
    if (!cartResult.valid) {
      return NextResponse.json(
        {
          success: false,
          status: "PAYMENT_BLOCKED",
          reason: cartResult.failureReason || "POLICY_VALIDATION_FAILED",
          message: cartResult.failureReason,
          diagnostics,
        },
        { status: 400 }
      );
    }

    // 4. IDEMPOTENCY CHECK: Reuse existing valid order for session if cart is unchanged
    const existingOrder = ServerStore.getOrderBySessionId(sessionId);
    if (
      existingOrder &&
      existingOrder.amountPaise === cartResult.totalPaise &&
      existingOrder.paymentStatus === "CREATED" &&
      existingOrder.razorpayOrderId.startsWith("order_")
    ) {
      return NextResponse.json({
        success: true,
        orderId: existingOrder.razorpayOrderId,
        amount: cartResult.totalInr,
        amountPaise: cartResult.totalPaise,
        currency: "INR",
        keyId: RAZORPAY_KEY_ID,
        sessionId,
        isReused: true,
        diagnostics,
      });
    }

    // 5. CALL REAL RAZORPAY ORDERS API (NO MOCK FALLBACK)
    const orderOptions = {
      amount: cartResult.totalPaise, // e.g. 294700 paise for ₹2,947
      currency: "INR",
      receipt: `sp_${sessionId}_${Date.now()}`,
      notes: {
        shopPilotSessionId: sessionId,
        environment: "test",
        source: "ShopPilot AI",
      },
    };

    const razorpayOrder = await razorpayInstance.orders.create(orderOptions);

    if (!razorpayOrder || !razorpayOrder.id) {
      return NextResponse.json(
        {
          success: false,
          status: "ORDER_CREATION_FAILED",
          reason: "RAZORPAY_API_INVALID_RESPONSE",
          message: "Razorpay Orders API did not return a valid order ID.",
          diagnostics,
        },
        { status: 500 }
      );
    }

    // 6. SAVE AUTHORITATIVE ORDER RECORD TO SERVER STORE
    ServerStore.saveOrder({
      sessionId,
      razorpayOrderId: razorpayOrder.id,
      amountInr: cartResult.totalInr,
      amountPaise: cartResult.totalPaise,
      currency: "INR",
      cart: cartResult.items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        price: i.product.price,
      })),
      approvalStatus: "CONFIRMED",
      policyStatus: "PASSED",
      paymentStatus: "CREATED",
      verificationStatus: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: cartResult.totalInr,
      amountPaise: cartResult.totalPaise,
      currency: "INR",
      keyId: RAZORPAY_KEY_ID,
      sessionId,
      diagnostics,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error("Razorpay Create Order Error:", errMessage);
    return NextResponse.json(
      {
        success: false,
        status: "ORDER_CREATION_FAILED",
        reason: "RAZORPAY_API_ERROR",
        message: `Failed to create Razorpay Test Order: ${errMessage}`,
        diagnostics: getRazorpayDiagnostics(),
      },
      { status: 500 }
    );
  }
}
