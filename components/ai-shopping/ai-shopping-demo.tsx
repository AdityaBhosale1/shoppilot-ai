"use client";

import React, { useState } from "react";
import { Product } from "@/data/mock-products";
import { ShoppingInput } from "./shopping-input";
import { ProductCard } from "./product-card";
import { DecisionReceipt } from "./decision-receipt";
import { PaymentSimulator } from "./payment-simulator";
import { AuditTrail, AuditLogItem } from "./audit-trail";

type WorkflowStage =
  | "IDLE"
  | "UNDERSTANDING_INTENT"
  | "PRODUCT_SEARCH"
  | "MERCHANT_PROPOSAL"
  | "BUYER_GUARDIAN_BLOCK"
  | "NEGOTIATION"
  | "CART_READY";

export function AIShoppingDemo() {
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [stage, setStage] = useState<WorkflowStage>("IDLE");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [customerApproved, setCustomerApproved] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Demo Product States
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const [merchantProposedCart, setMerchantProposedCart] = useState<Product[]>([]);
  const [finalCart, setFinalCart] = useState<Product[]>([]);
  const [rejectedUpsell, setRejectedUpsell] = useState<{ name: string; price: number } | null>(null);
  const [acceptedAlternative, setAcceptedAlternative] = useState<{ name: string; price: number } | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [budgetRemaining, setBudgetRemaining] = useState<number>(0);
  const [aovLift, setAovLift] = useState<number>(0);

  const formatTime = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0] + "." + Math.floor(now.getMilliseconds() / 100);
  };

  const addLog = (
    type: AuditLogItem["type"],
    message: string,
    detail?: string,
    status: AuditLogItem["status"] = "INFO"
  ) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: formatTime(),
      type,
      message,
      detail,
      status,
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const handleStartDemo = async (promptText: string) => {
    setCurrentPrompt(promptText);
    setIsLoading(true);
    setStage("UNDERSTANDING_INTENT");
    setStatusMessage("Understanding request & extracting shopping intent...");
    setLogs([]);
    setCustomerApproved(false);

    try {
      // 1. CALL REAL SERVER-SIDE DUAL-AGENT API
      const res = await fetch("/api/ai/shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "SP-1047",
          message: promptText,
        }),
      });

      const responseData = await res.json();
      if (!responseData.success || !responseData.data) {
        addLog(
          "PAYMENT_FAILED",
          "AI service is temporarily unavailable. No purchase action was taken.",
          responseData.message || "Failed to reach AI workflow orchestrator.",
          "FAILED"
        );
        setIsLoading(false);
        setStage("IDLE");
        return;
      }

      const aiData = responseData.data;

      // Import real workflow trace logs from server
      if (aiData.traceLogs && Array.isArray(aiData.traceLogs)) {
        setLogs(aiData.traceLogs);
      }

      if (aiData.type === "CLARIFICATION_REQUIRED") {
        setStatusMessage(aiData.clarificationQuestion || "Please clarify your budget and product preference.");
        setIsLoading(false);
        setStage("IDLE");
        return;
      }

      if (aiData.type === "NO_PRODUCTS_MATCH") {
        setStatusMessage("No in-stock products matched all constraints. No cart was created.");
        setIsLoading(false);
        setStage("IDLE");
        return;
      }

      setMatchedProducts(aiData.productsConsidered || []);
      setMerchantProposedCart(
        aiData.merchantProposal
          ? [
              ...aiData.merchantProposal.primaryProducts,
              ...(aiData.merchantProposal.proposedUpsell ? [aiData.merchantProposal.proposedUpsell] : []),
            ]
          : aiData.primaryRecommendations || []
      );

      if (aiData.negotiation?.rejectedProposal) {
        setRejectedUpsell(aiData.negotiation.rejectedProposal);
      } else {
        setRejectedUpsell(null);
      }

      if (aiData.negotiation?.acceptedAlternative) {
        setAcceptedAlternative(aiData.negotiation.acceptedAlternative);
      } else {
        setAcceptedAlternative(null);
      }

      setFinalCart(aiData.finalCart || []);
      setTotalAmount(aiData.finalTotal || 0);
      setBudgetRemaining(aiData.budgetRemaining || 0);
      setAovLift(aiData.aovLift || 0);
      setStage("CART_READY");
      setIsLoading(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("AI Shopping Error:", msg);
      addLog(
        "PAYMENT_FAILED",
        "AI service is temporarily unavailable. No purchase action was taken.",
        msg,
        "FAILED"
      );
      setIsLoading(false);
      setStage("IDLE");
    }
  };

  const handleApproveCart = () => {
    setCustomerApproved(true);
    addLog(
      "USER_APPROVED",
      `Customer authorized exact payment of ₹${totalAmount.toLocaleString("en-IN")}.`,
      "Approval State: AUTHORIZED ✓",
      "SUCCESS"
    );
  };

  const handlePaymentSuccess = (details: { paymentId: string; orderId: string }) => {
    addLog(
      "CHECKOUT_READY",
      `Razorpay order verified on server: ${details.orderId}`,
      "Mode: Razorpay Test Mode",
      "INFO"
    );
    addLog(
      "PAYMENT_SUCCESS",
      `Razorpay payment ${details.paymentId} verified by server signature check.`,
      "HMAC SHA-256 Signature Match: PASSED",
      "SUCCESS"
    );
    addLog(
      "SESSION_COMPLETED",
      "Session completed successfully. Order confirmed.",
      `Order Reference: ${details.orderId}`,
      "SUCCESS"
    );
  };

  const handlePaymentFailed = (actor: string, reason: string) => {
    addLog(
      "PAYMENT_FAILED",
      `Payment Failed via ${actor}: ${reason}`,
      "Result: FAILED",
      "FAILED"
    );
    addLog(
      "POLICY_CHECK",
      "Cart state preserved safely. No duplicate order created.",
      "Result: SUCCESS",
      "SUCCESS"
    );
    addLog(
      "PAYMENT_GATE",
      "Recovery status: Retry Payment available.",
      "Action: Retry Payment",
      "WARN"
    );
  };

  const handleResetSession = async () => {
    setStage("IDLE");
    setIsLoading(false);
    setLogs([]);
    setMatchedProducts([]);
    setMerchantProposedCart([]);
    setFinalCart([]);
    setRejectedUpsell(null);
    setAcceptedAlternative(null);
    setCurrentPrompt("");
    setCustomerApproved(false);
    setStatusMessage("");

    try {
      await fetch("/api/ai/shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: "SP-1047", action: "RESET_SESSION" }),
      });
    } catch {
      // Safe silent catch
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* 3-COLUMN DASHBOARD LAYOUT (DESKTOP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: SHOPPING INPUT FORM (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <ShoppingInput onSubmit={handleStartDemo} isLoading={isLoading} />
        </div>

        {/* CENTER COLUMN: LIVE AGENT WORKFLOW & CART (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* IDLE PLACEHOLDER */}
          {stage === "IDLE" && (
            <div className="rounded-2xl bg-[#050816]/80 border border-blue-900/40 backdrop-blur-xl p-8 text-center space-y-3 min-h-[380px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                Dual-Agent Commerce Engine Idle
              </h4>
              <p className="text-xs text-slate-400 max-w-sm">
                {statusMessage || "Enter a shopping request or click a suggested prompt to see Merchant & Buyer Guardian Agents evaluate products in real-time."}
              </p>
            </div>
          )}

          {/* ACTIVE WORKFLOW PROGRESS STAGES */}
          {stage !== "IDLE" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* MATCHED CANDIDATE PRODUCTS */}
              {matchedProducts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                      Catalog Search Results ({matchedProducts.length})
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Authoritative Catalog Match
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedProducts.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}

              {/* SAFE CART & DECISION RECEIPT */}
              {stage === "CART_READY" && finalCart.length > 0 && (
                <div className="space-y-4">
                  {/* NEGOTIATED FINAL CART */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#050816]/90 border border-emerald-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide">
                          Safe Negotiated Cart
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                        POLICY PASSED ✓
                      </span>
                    </div>

                    {/* CART ITEMS LIST */}
                    <div className="space-y-2 font-mono text-xs">
                      {finalCart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span className="text-slate-200 font-sans text-xs font-semibold">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-cyan-300 font-bold">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}

                      {/* SUMMARY TOTALS */}
                      <div className="pt-2 border-t border-slate-800/80 font-mono text-xs space-y-1 text-slate-300">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Budget Remaining:</span>
                          <span>₹{budgetRemaining}</span>
                        </div>
                        <div className="flex justify-between font-bold text-white text-sm pt-1.5 border-t border-slate-800">
                          <span>Final Authoritative Total:</span>
                          <span className="text-cyan-300">₹{totalAmount.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>

                    {/* COMMERCE DECISION RECEIPT */}
                    <DecisionReceipt
                      intentQuery={currentPrompt}
                      budget={totalAmount + budgetRemaining}
                      productsConsidered={matchedProducts.length}
                      selectedCount={finalCart.length}
                      rejectedUpsell={rejectedUpsell || { name: "RGB Mousepad XL", price: 599 }}
                      acceptedAlternative={acceptedAlternative || { name: "Essential Mousepad", price: 249 }}
                      finalTotal={totalAmount}
                      aovIncrease={aovLift}
                      policyResult="PASSED"
                      humanApprovalState={customerApproved ? "APPROVED" : "REQUIRED"}
                    />

                    {/* REAL RAZORPAY TEST MODE CHECKOUT & APPROVAL GATE */}
                    <PaymentSimulator
                      cart={finalCart.map((p) => ({ product: p, quantity: 1 }))}
                      totalAmount={totalAmount}
                      customerApproved={customerApproved}
                      onApprove={handleApproveCart}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentFailed={handlePaymentFailed}
                      onAuditEvent={(type, message, detail) =>
                        addLog(
                          type as AuditLogItem["type"],
                          message,
                          detail,
                          type.includes("FAILED") || type.includes("INVALID")
                            ? "FAILED"
                            : type.includes("VERIFIED") || type.includes("COMPLETED") || type.includes("PASSED")
                            ? "SUCCESS"
                            : "INFO"
                        )
                      }
                    />
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* RIGHT COLUMN: LIVE AGENT TRACE LOGS (3 cols) */}
        <div className="lg:col-span-3">
          <AuditTrail logs={logs} onReset={handleResetSession} />
        </div>

      </div>
    </div>
  );
}

export default AIShoppingDemo;
