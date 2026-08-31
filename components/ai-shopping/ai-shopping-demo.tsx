"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingInput } from "./shopping-input";
import { ProductCard } from "./product-card";
import { DecisionReceipt } from "./decision-receipt";
import { PaymentSimulator } from "./payment-simulator";
import { AuditTrail, AuditLogItem } from "./audit-trail";
import { Product } from "@/data/mock-products";

export function AIShoppingDemo() {
  const [stage, setStage] = useState<"IDLE" | "SEARCHING" | "PROPOSED" | "CART_READY">("IDLE");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const [, setMerchantProposedCart] = useState<Product[]>([]);
  const [finalCart, setFinalCart] = useState<Product[]>([]);
  const [rejectedUpsell, setRejectedUpsell] = useState<Product | null>(null);
  const [acceptedAlternative, setAcceptedAlternative] = useState<Product | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [budgetRemaining, setBudgetRemaining] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [aovLift, setAovLift] = useState<number>(0);
  const [customerApproved, setCustomerApproved] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const addLog = (
    type: AuditLogItem["type"],
    message: string,
    detail?: string,
    status?: AuditLogItem["status"]
  ) => {
    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }),
        type,
        message,
        detail,
        status: status || "INFO",
      },
    ]);
  };

  const handleStartDemo = async (prompt: string) => {
    const trimmedPrompt = prompt ? prompt.trim() : "";

    if (!trimmedPrompt) {
      addLog(
        "INPUT_VALIDATION_FAILED",
        "Shopping request is empty.",
        "Actor: ShopPilot Request Validator",
        "FAILED"
      );
      setIsLoading(false);
      setStage("IDLE");
      return;
    }

    setCurrentPrompt(trimmedPrompt);
    setIsLoading(true);
    setCustomerApproved(false);
    setLogs([]);
    setMatchedProducts([]);
    setMerchantProposedCart([]);
    setFinalCart([]);
    setRejectedUpsell(null);
    setAcceptedAlternative(null);
    setStage("SEARCHING");

    addLog("INTENT_RECEIVED", `User query: "${trimmedPrompt}"`, "Session: SP-1047", "INFO");

    try {
      const response = await fetch("/api/ai/shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "SP-1047",
          message: trimmedPrompt,
          prompt: trimmedPrompt,
          action: "PROCESS_INTENT",
        }),
      });

      const data = await response.json();

      if (!data.success) {
        if (data.error === "INPUT_VALIDATION_FAILED") {
          addLog(
            "INPUT_VALIDATION_FAILED",
            data.message || "Shopping request is empty.",
            "Actor: ShopPilot Request Validator",
            "FAILED"
          );
        } else {
          addLog("POLICY_CHECK", data.message || "Failed to process intent.", "Error", "FAILED");
        }
        setIsLoading(false);
        setStage("IDLE");
        return;
      }

      const result = data.data;

      // Stage 1: Parsed Intent
      addLog(
        "INTENT_PARSED",
        `Parsed Budget Cap: ₹${result.budget.toLocaleString("en-IN")}`,
        `Category: ${result.category || "General"}`,
        "SUCCESS"
      );

      // Stage 2: Catalog Tool
      setMatchedProducts(result.matchedProducts || []);
      addLog(
        "CATALOG_SEARCH",
        `Found ${result.matchedProducts?.length || 0} candidate items in inventory.`,
        "Catalog Search Completed",
        "INFO"
      );

      // Stage 3: Merchant Upsell Proposal
      if (result.rejectedUpsell) {
        setRejectedUpsell(result.rejectedUpsell);
        addLog(
          "MERCHANT_PROPOSAL",
          `Merchant Growth Agent proposed upsell: ${result.rejectedUpsell.name} (+₹${result.rejectedUpsell.price})`,
          "Targeting AOV Maximization",
          "INFO"
        );

        // Stage 4: Buyer Guardian Rejection
        addLog(
          "BUYER_GUARDIAN_BLOCK",
          `Buyer Guardian BLOCKED ${result.rejectedUpsell.name} (exceeds budget limit).`,
          `Rule Violation: CUSTOMER_BUDGET_CAP`,
          "FAILED"
        );
      }

      // Stage 5: Constraint Negotiation Alternative
      if (result.acceptedAlternative) {
        setAcceptedAlternative(result.acceptedAlternative);
        addLog(
          "ALTERNATIVE_FOUND",
          `Found compliant alternative: ${result.acceptedAlternative.name} (₹${result.acceptedAlternative.price})`,
          "Budget Preserved Safely",
          "SUCCESS"
        );
      }

      // Stage 6: Final Policy Validation & Cart
      setFinalCart(result.finalCart || []);
      setTotalAmount(result.finalAmount || 0);
      setBudgetRemaining(result.budgetRemaining || 0);
      setAovLift(result.aovLift || 0);

      addLog(
        "CART_FINALIZED",
        `Cart Total ₹${result.finalAmount.toLocaleString("en-IN")} passed 5/5 Policy Rules.`,
        "Budget PASS | Stock PASS | Price PASS",
        "SUCCESS"
      );

      addLog(
        "PAYMENT_GATE",
        "Payment State: BLOCKED. Requires Explicit Customer Authorization.",
        "Deterministic Policy Protection Active",
        "WARN"
      );

      setStage("CART_READY");
      setIsLoading(false);
    } catch {
      addLog(
        "POLICY_CHECK",
        "Error connecting to AI Shopping Service.",
        "Check network connection.",
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
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-[#050816]/80 border border-blue-900/40 backdrop-blur-xl p-8 text-center space-y-3 min-h-[380px] flex flex-col items-center justify-center"
            >
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
            </motion.div>
          )}

          {/* ACTIVE WORKFLOW PROGRESS STAGES */}
          {stage !== "IDLE" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              
              {/* MATCHED CANDIDATE PRODUCTS */}
              {matchedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                      Catalog Search Results ({matchedProducts.length})
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Authoritative Catalog Match
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedProducts.slice(0, 4).map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* DUAL-AGENT CONSTRAINT NEGOTIATION VISUAL STEP */}
              {rejectedUpsell && acceptedAlternative && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-4 rounded-2xl bg-[#050816]/90 border border-amber-500/30 space-y-3 font-mono text-xs shadow-lg"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                        Dual-Agent Constraint Negotiation
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">Budget Limit: ₹3,000</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* REJECTED UPSELL */}
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/50">
                          Rejected
                        </span>
                        <span className="text-[10px] text-rose-300/80">Exceeds Limit (+₹297)</span>
                      </div>
                      <div className="flex items-center gap-2.5 opacity-65">
                        <div className="relative w-10 h-10 rounded-lg bg-[#06091e] border border-slate-800 shrink-0 overflow-hidden p-0.5">
                          <Image
                            src={rejectedUpsell.image || "/products/rgb-mousepad-xl.svg"}
                            alt={`${rejectedUpsell.name} rejected thumbnail`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-300 font-sans text-xs line-through">{rejectedUpsell.name}</h5>
                          <div className="text-rose-400 font-bold line-through">₹{rejectedUpsell.price}</div>
                        </div>
                      </div>
                    </div>

                    {/* ACCEPTED REPLACEMENT */}
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-2 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                          Negotiated Replacement
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold">Within Budget ✓</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-10 h-10 rounded-lg bg-[#06091e] border border-slate-800 shrink-0 overflow-hidden p-0.5">
                          <Image
                            src={acceptedAlternative.image || "/products/essential-mousepad.svg"}
                            alt={`${acceptedAlternative.name} replacement thumbnail`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-white font-sans text-xs">{acceptedAlternative.name}</h5>
                          <div className="text-emerald-300 font-bold">₹{acceptedAlternative.price}</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* SAFE CART & DECISION RECEIPT */}
              {stage === "CART_READY" && finalCart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  {/* NEGOTIATED FINAL CART */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#050816]/90 border border-emerald-500/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide">
                          Safe Negotiated Cart
                        </h4>
                      </div>
                      <motion.span
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40"
                      >
                        POLICY PASSED ✓
                      </motion.span>
                    </div>

                    {/* CART ITEMS LIST WITH THUMBNAILS */}
                    <div className="space-y-2 font-mono text-xs">
                      <AnimatePresence>
                        {finalCart.map((item, idx) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="relative w-9 h-9 rounded-lg bg-[#06091e] border border-slate-800 shrink-0 overflow-hidden p-0.5">
                                {item.image && (
                                  <Image
                                    src={item.image}
                                    alt={`${item.name} thumbnail`}
                                    fill
                                    className="object-contain"
                                  />
                                )}
                              </div>
                              <div>
                                <span className="text-slate-200 font-sans text-xs font-semibold block">
                                  {item.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {item.category}
                                </span>
                              </div>
                            </div>
                            <span className="text-cyan-300 font-bold">
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                          </motion.div>
                        ))}
                      </AnimatePresence>

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
                      rejectedUpsell={rejectedUpsell || { name: "RGB Mousepad XL", price: 599, image: "/products/rgb-mousepad-xl.svg" }}
                      acceptedAlternative={acceptedAlternative || { name: "Essential Mousepad", price: 249, image: "/products/essential-mousepad.svg" }}
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
                </motion.div>
              )}

            </motion.div>
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
