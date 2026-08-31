"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/data/mock-products";
import { loadRazorpayScript } from "@/lib/load-razorpay-script";

export type PaymentState =
  | "IDLE"
  | "AWAITING_APPROVAL"
  | "APPROVED"
  | "CREATING_ORDER"
  | "CHECKOUT_READY"
  | "VERIFYING"
  | "PAYMENT_VERIFIED"
  | "PAYMENT_FAILED"
  | "SECURITY_HOLD"
  | "CHECKOUT_CANCELLED";

export type SdkStatus = "LOADING" | "READY" | "FAILED";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
}

export interface FailureDetails {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  payment_id?: string;
  order_id?: string;
}

interface PaymentSimulatorProps {
  cart: Array<{ product: Product; quantity: number }>;
  totalAmount: number;
  customerApproved: boolean;
  onApprove: () => void;
  onPaymentSuccess: (details: { paymentId: string; orderId: string }) => void;
  onPaymentFailed: (actor: string, reason: string) => void;
  onAuditEvent?: (type: string, message: string, detail?: string) => void;
}

export function PaymentSimulator({
  cart,
  totalAmount,
  customerApproved,
  onApprove,
  onPaymentSuccess,
  onPaymentFailed,
  onAuditEvent,
}: PaymentSimulatorProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>(
    customerApproved ? "APPROVED" : "AWAITING_APPROVAL"
  );
  const [sdkStatus, setSdkStatus] = useState<SdkStatus>("LOADING");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [razorpayDetails, setRazorpayDetails] = useState<{
    orderId?: string;
    paymentId?: string;
  }>({});

  const [failureDetails, setFailureDetails] = useState<FailureDetails | null>(null);
  const [showTechDetails, setShowTechDetails] = useState<boolean>(false);
  const [showDemoTests, setShowDemoTests] = useState<boolean>(false);

  const sessionId = "SP-1047";

  // LOAD RAZORPAY CHECKOUT SDK SCRIPT ON MOUNT
  const initSdkScript = async () => {
    setSdkStatus("LOADING");
    const isLoaded = await loadRazorpayScript();
    if (isLoaded) {
      setSdkStatus("READY");
    } else {
      setSdkStatus("FAILED");
    }
  };

  useEffect(() => {
    initSdkScript();
  }, []);

  // Sync prop changes
  useEffect(() => {
    if (customerApproved && paymentState === "AWAITING_APPROVAL") {
      setPaymentState("APPROVED");
    }
  }, [customerApproved, paymentState]);

  // Launch Real Razorpay Test Mode Checkout
  const handleLaunchRazorpayCheckout = async (simulateTamper = false) => {
    try {
      setFailureDetails(null);
      setPaymentState("CREATING_ORDER");
      setStatusMessage("Creating secure Razorpay Test Order on server...");

      onAuditEvent?.(
        "PAYMENT_ORDER_REQUESTED",
        "Requesting server-authoritative Razorpay Order creation.",
        `Session: ${sessionId} | Total: ₹${totalAmount}`
      );

      // 1. Call Server API to validate cart & create order
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          items: cart.map((c) => ({
            productId: c.product.id,
            quantity: c.quantity,
          })),
          customerApproved: true,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        setPaymentState("PAYMENT_FAILED");
        setStatusMessage(orderData.message || "Razorpay Order creation failed.");
        onPaymentFailed("Server Orders API", orderData.message || orderData.reason);
        return;
      }

      const realRazorpayOrderId = orderData.orderId;
      setRazorpayDetails({ orderId: realRazorpayOrderId });
      setPaymentState("CHECKOUT_READY");
      setStatusMessage("Razorpay Order Created. Opening Standard Checkout...");

      onAuditEvent?.(
        "RAZORPAY_ORDER_CREATED",
        `Razorpay Test Order created for ₹${totalAmount.toLocaleString("en-IN")}.`,
        `Amount: ₹${totalAmount.toLocaleString("en-IN")} | Currency: INR | Mode: TEST`
      );

      onAuditEvent?.(
        "CHECKOUT_OPENED",
        "Razorpay Standard Checkout opened in Test Mode.",
        `Order ID: ${realRazorpayOrderId}`
      );

      // 2. Configure Razorpay Standard Checkout options with returned order_id
      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amountPaise || totalAmount * 100,
        currency: "INR",
        name: "ShopPilot AI",
        description: "Agentic Commerce Test Purchase",
        order_id: realRazorpayOrderId,
        theme: { color: "#2563EB" },
        prefill: {
          name: "Test Customer",
          email: "customer@shoppilot.ai",
          contact: "9999999999",
        },
        handler: async function (response: RazorpayResponse) {
          onAuditEvent?.(
            "PAYMENT_AUTHORIZED",
            `Razorpay payment authorized: ${response.razorpay_payment_id}`,
            `Order ID: ${response.razorpay_order_id}`
          );

          setPaymentState("VERIFYING");
          setStatusMessage("VERIFYING PAYMENT SIGNATURE WITH SERVER...");

          onAuditEvent?.(
            "PAYMENT_VERIFICATION_STARTED",
            "Submitting Razorpay payment ID & signature for HMAC SHA-256 server verification.",
            `Payment ID: ${response.razorpay_payment_id}`
          );

          setRazorpayDetails({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
          });

          // 3. Call Server Verification API
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              simulateTamper,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.verified) {
            setPaymentState("PAYMENT_VERIFIED");
            setStatusMessage("Razorpay signature verified successfully. Order completed!");

            onAuditEvent?.(
              "PAYMENT_VERIFICATION",
              "Razorpay payment signature verified server-side using HMAC SHA-256. Payment integrity confirmed before order completion.",
              "Result: PASSED"
            );
            onAuditEvent?.(
              "PAYMENT_COMPLETED",
              "Order payment marked completed.",
              `Payment ID: ${response.razorpay_payment_id}`
            );
            onAuditEvent?.(
              "SESSION_COMPLETED",
              `Session ${sessionId} completed successfully.`,
              `Order Reference: ${response.razorpay_order_id}`
            );

            onPaymentSuccess({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });
          } else {
            setPaymentState("SECURITY_HOLD");
            setStatusMessage(
              "Payment authenticity could not be verified. Signature mismatch. Order fulfillment blocked!"
            );

            onAuditEvent?.(
              "PAYMENT_SIGNATURE_INVALID",
              "HMAC SHA-256 signature verification FAILED!",
              "Status: SECURITY_HOLD"
            );

            onPaymentFailed("Security Policy Engine", "SECURITY_HOLD_SIGNATURE_MISMATCH");
          }
        },
        modal: {
          ondismiss: function () {
            if (typeof window !== "undefined") {
              document.body.style.overflow = "";
              document.documentElement.style.overflow = "";
            }
            setPaymentState("CHECKOUT_CANCELLED");
            setStatusMessage(
              "Checkout was closed. Your cart is still available and no completed payment was recorded."
            );
            onAuditEvent?.(
              "CHECKOUT_CANCELLED",
              "Razorpay Checkout modal was closed by customer.",
              "Status: Cart Preserved"
            );
          },
        },
      };

      // 4. Instantiate Razorpay & Register payment.failed Event Listener
      const RazorpayConstructor = (window as unknown as {
        Razorpay: new (opts: typeof options) => {
          open: () => void;
          on: (event: string, handler: (resp: RazorpayFailureResponse) => void) => void;
        };
      }).Razorpay;

      if (RazorpayConstructor) {
        const razorpayInstance = new RazorpayConstructor(options);

        // LISTEN TO RAZORPAY PAYMENT.FAILED EVENT SAFELY
        razorpayInstance.on("payment.failed", function (failureResponse: RazorpayFailureResponse) {
          if (typeof window !== "undefined") {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
          }
          const err = failureResponse.error;
          const safeDetails: FailureDetails = {
            code: err.code || "PAYMENT_ERROR",
            description: err.description || "Payment was not completed.",
            source: err.source || "customer",
            step: err.step || "payment_authorization",
            reason: err.reason || "payment_failed",
            payment_id: err.metadata?.payment_id,
            order_id: err.metadata?.order_id || realRazorpayOrderId,
          };

          setFailureDetails(safeDetails);
          setPaymentState("PAYMENT_FAILED");
          setStatusMessage("Your payment was not completed. No order has been marked as completed.");

          onPaymentFailed("Razorpay Test Checkout", safeDetails.description);
        });

        onAuditEvent?.(
          "CHECKOUT_OPENED",
          "Razorpay Standard Checkout modal opened.",
          `Razorpay Order ID: ${realRazorpayOrderId}`
        );

        razorpayInstance.open();
      } else {
        setPaymentState("PAYMENT_FAILED");
        setStatusMessage("Razorpay Checkout SDK is not available in window.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Launch Razorpay Checkout error:", msg);
      setPaymentState("PAYMENT_FAILED");
      setStatusMessage(`Checkout initiation error: ${msg}`);
      onPaymentFailed("Checkout Client", msg);
    }
  };

  const handleSimulateFailure = () => {
    const mockDetails: FailureDetails = {
      code: "BAD_REQUEST_ERROR",
      description: "Payment failed due to simulated user authorization decline.",
      source: "customer",
      step: "payment_authorization",
      reason: "payment_failed",
      order_id: razorpayDetails.orderId || "order_real_razorpay",
    };
    setFailureDetails(mockDetails);
    setPaymentState("PAYMENT_FAILED");
    setStatusMessage("Your payment was not completed. No order has been marked as completed.");
    onPaymentFailed("Razorpay Test Checkout", mockDetails.description);
  };

  const isCheckoutDisabled =
    !customerApproved ||
    sdkStatus !== "READY" ||
    paymentState === "CREATING_ORDER" ||
    paymentState === "VERIFYING" ||
    paymentState === "PAYMENT_VERIFIED";

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#030612]/90 border border-slate-800 space-y-4 font-mono text-xs shadow-xl">
      {/* HEADER WITH BADGE */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-cyan-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h4 className="font-bold text-white tracking-wide">
            Razorpay Test Checkout
          </h4>
        </div>
        <span className="text-[10px] font-bold text-cyan-300 bg-blue-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
          TEST MODE
        </span>
      </div>

      <div className="text-[10px] text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-800/40 text-center">
        ⚡ TEST MODE ONLY • No real money will be charged
      </div>

      {/* SDK LOAD STATUS DISPLAY */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
        <span className="text-slate-400">Razorpay SDK Status:</span>
        {sdkStatus === "LOADING" && (
          <span className="text-cyan-300 font-bold animate-pulse">
            Loading Razorpay Test Checkout SDK...
          </span>
        )}
        {sdkStatus === "READY" && (
          <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            Razorpay Test Checkout Ready ✓
          </span>
        )}
        {sdkStatus === "FAILED" && (
          <div className="flex items-center gap-2">
            <span className="text-rose-400 font-bold">
              Razorpay Checkout could not be loaded.
            </span>
            <button
              type="button"
              onClick={initSdkScript}
              className="text-[10px] text-cyan-300 hover:underline bg-blue-950 px-2 py-0.5 rounded border border-cyan-500/40"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* APPROVAL STATE DISPLAY */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
        <div className="flex justify-between text-slate-300">
          <span>Authoritative Server Total:</span>
          <span className="text-white font-bold">₹{totalAmount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Human Approval Gate:</span>
          <span
            className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
              customerApproved
                ? "bg-emerald-950 text-emerald-300 border border-emerald-800/40"
                : "bg-amber-950 text-amber-300 border border-amber-800/40"
            }`}
          >
            {customerApproved ? "CONFIRMED ✓" : "BLOCKED (Approval Required)"}
          </span>
        </div>
      </div>

      {/* ================================================== */}
      {/* PREMIUM SHOPPILOT FAILURE PANEL */}
      {/* ================================================== */}
      {paymentState === "PAYMENT_FAILED" ? (
        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-3.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 border-b border-rose-900/40 pb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <h4 className="font-bold text-rose-200 text-xs uppercase tracking-wider">
              Payment Failed
            </h4>
          </div>

          <p className="text-slate-200 text-xs font-sans leading-relaxed">
            &ldquo;Your payment was not completed. No order has been marked as completed.&rdquo;
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
              <span className="text-slate-400 block">Cart Status</span>
              <strong className="text-emerald-300">Preserved ✓</strong>
            </div>
            <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
              <span className="text-slate-400 block">Duplicate Order</span>
              <strong className="text-cyan-300">Prevented ✓</strong>
            </div>
            <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-800/40">
              <span className="text-slate-400 block">Payment Status</span>
              <strong className="text-rose-400">FAILED</strong>
            </div>
          </div>

          {/* EXPANDABLE TECHNICAL DETAILS */}
          {failureDetails && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowTechDetails(!showTechDetails)}
                className="text-[10px] text-slate-400 hover:text-white underline flex items-center gap-1"
              >
                <span>{showTechDetails ? "Hide" : "Show"} Technical Failure Details</span>
                <span>{showTechDetails ? "▲" : "▼"}</span>
              </button>

              {showTechDetails && (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1 text-[10px] text-slate-300">
                  <div>Failure Code: <strong className="text-rose-300">{failureDetails.code}</strong></div>
                  <div>Failure Reason: <strong className="text-rose-300">{failureDetails.reason}</strong></div>
                  <div>Failure Step: <span className="text-slate-200">{failureDetails.step}</span></div>
                  <div>Description: <span className="text-slate-200">{failureDetails.description}</span></div>
                  <div>Source: <span className="text-slate-400">{failureDetails.source}</span></div>
                </div>
              )}
            </div>
          )}

          {/* FAILURE RECOVERY ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleLaunchRazorpayCheckout(false)}
              className="py-2 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30 text-center"
            >
              Retry Payment ↻
            </button>
            <button
              type="button"
              onClick={() => setPaymentState("APPROVED")}
              className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all text-center"
            >
              Return to Cart
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* STANDARD STATUS MESSAGE */}
          {statusMessage && (
            <div
              className={`p-2.5 rounded-lg border text-[11px] text-center font-mono ${
                paymentState === "VERIFYING"
                  ? "bg-blue-950 text-cyan-300 border-cyan-500/40 animate-pulse"
                  : paymentState === "PAYMENT_VERIFIED"
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                  : paymentState === "SECURITY_HOLD"
                  ? "bg-rose-950/80 text-rose-300 border-rose-800/40"
                  : "bg-slate-900 text-slate-300 border-slate-800"
              }`}
            >
              {statusMessage}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="space-y-2">
            {!customerApproved ? (
              <button
                type="button"
                onClick={onApprove}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Approve ₹{totalAmount.toLocaleString("en-IN")}</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  disabled={isCheckoutDisabled}
                  onClick={() => handleLaunchRazorpayCheckout(false)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                    paymentState === "PAYMENT_VERIFIED"
                      ? "bg-emerald-600 text-white cursor-default"
                      : isCheckoutDisabled
                      ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/20"
                  }`}
                >
                  <span>
                    {paymentState === "PAYMENT_VERIFIED"
                      ? "Order Verified & Completed ✓"
                      : paymentState === "VERIFYING"
                      ? "Verifying Payment..."
                      : paymentState === "CREATING_ORDER"
                      ? "Creating Razorpay Order..."
                      : "Continue to Razorpay Test Checkout →"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* COLLAPSIBLE DEMO SAFETY TESTS PANEL (STEP 10) */}
      <div className="pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => setShowDemoTests(!showDemoTests)}
          className="text-[10px] text-slate-400 hover:text-slate-200 underline flex items-center justify-between w-full font-mono"
        >
          <span>Demo Safety Tests (Developer Controls)</span>
          <span>{showDemoTests ? "▲" : "▼"}</span>
        </button>

        {showDemoTests && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-[10px] text-slate-400">
              Test safety behavior without real card entry:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleSimulateFailure}
                className="py-1.5 px-2 rounded-lg text-[10px] font-mono text-rose-300 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-800/40 transition-all text-center"
              >
                Test Failure Handling
              </button>

              <button
                type="button"
                onClick={() => handleLaunchRazorpayCheckout(true)}
                className="py-1.5 px-2 rounded-lg text-[10px] font-mono text-amber-300 bg-amber-950/40 hover:bg-amber-950/80 border border-amber-800/40 transition-all text-center"
              >
                Test Tampered Signature
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RAZORPAY TRANSACTION DETAILS */}
      {razorpayDetails.orderId && (
        <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-1">
          {razorpayDetails.orderId && (
            <div>Razorpay Order ID: <strong className="text-cyan-300">{razorpayDetails.orderId}</strong></div>
          )}
          {razorpayDetails.paymentId && (
            <div>Razorpay Payment ID: <strong className="text-emerald-300">{razorpayDetails.paymentId}</strong></div>
          )}
        </div>
      )}
    </div>
  );
}

export default PaymentSimulator;
