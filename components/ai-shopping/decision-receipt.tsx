"use client";

import React from "react";
import Image from "next/image";

interface DecisionReceiptProps {
  intentQuery: string;
  budget: number;
  productsConsidered: number;
  selectedCount: number;
  rejectedUpsell: { name: string; price: number; image?: string };
  acceptedAlternative: { name: string; price: number; image?: string };
  finalTotal: number;
  aovIncrease: number;
  policyResult: "PASSED" | "FAILED";
  humanApprovalState: "REQUIRED" | "APPROVED" | "COMPLETED";
}

export function DecisionReceipt({
  intentQuery,
  budget,
  productsConsidered,
  selectedCount,
  rejectedUpsell,
  acceptedAlternative,
  finalTotal,
  aovIncrease,
  policyResult,
  humanApprovalState,
}: DecisionReceiptProps) {
  const getProductImage = (name: string, override?: string) => {
    if (override) return override;
    if (name.includes("RGB Mousepad")) return "/products/rgb-mousepad-xl.svg";
    if (name.includes("Essential Mousepad")) return "/products/essential-mousepad.svg";
    return "/products/essential-mousepad.svg";
  };

  return (
    <div className="rounded-2xl bg-[#050816]/90 border border-blue-900/40 backdrop-blur-xl p-4 sm:p-5 space-y-3 font-mono text-xs shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <h4 className="font-bold text-white text-xs tracking-wider uppercase">
            Commerce Decision Receipt
          </h4>
        </div>
        <span className="text-[10px] text-slate-400">ID: SP-TRACE-8841</span>
      </div>

      <div className="space-y-1.5 text-slate-300">
        <div className="flex justify-between py-1 border-b border-slate-900">
          <span className="text-slate-400">Customer Intent:</span>
          <span className="text-white font-sans text-[11px] truncate max-w-[180px] sm:max-w-[220px]">
            &ldquo;{intentQuery}&rdquo;
          </span>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-900">
          <span className="text-slate-400">Budget Limit:</span>
          <span className="text-white font-bold">₹{budget.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-900">
          <span className="text-slate-400">Products Scanned:</span>
          <span className="text-slate-200">{productsConsidered} items</span>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-900">
          <span className="text-slate-400">Selected Cart Items:</span>
          <span className="text-slate-200">{selectedCount} items</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-900 text-rose-300">
          <span className="text-slate-400">Rejected Upsell:</span>
          <div className="flex items-center gap-1.5 font-bold line-through">
            <div className="relative w-4 h-4 rounded bg-[#06091e] border border-slate-800 overflow-hidden shrink-0">
              <Image
                src={getProductImage(rejectedUpsell.name, rejectedUpsell.image)}
                alt={`${rejectedUpsell.name} thumbnail`}
                fill
                className="object-contain p-0.5 opacity-60"
              />
            </div>
            <span>{rejectedUpsell.name} (₹{rejectedUpsell.price})</span>
          </div>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-900 text-rose-300/80">
          <span className="text-slate-400">Rejection Reason:</span>
          <span className="bg-rose-500/15 px-1.5 py-0.5 rounded text-[10px] border border-rose-500/30">
            Budget Violation (+₹297)
          </span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-900 text-emerald-300">
          <span className="text-slate-400">Accepted Alternative:</span>
          <div className="flex items-center gap-1.5 font-bold">
            <div className="relative w-4 h-4 rounded bg-[#06091e] border border-slate-800 overflow-hidden shrink-0">
              <Image
                src={getProductImage(acceptedAlternative.name, acceptedAlternative.image)}
                alt={`${acceptedAlternative.name} thumbnail`}
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span>{acceptedAlternative.name} (₹{acceptedAlternative.price})</span>
          </div>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-900 text-cyan-300">
          <span className="text-slate-400">Merchant AOV Gain:</span>
          <span className="font-bold">+₹{aovIncrease}</span>
        </div>

        <div className="flex justify-between py-1 border-b border-slate-900">
          <span className="text-slate-400">Policy Result:</span>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[10px] ${
              policyResult === "PASSED"
                ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
                : "bg-rose-950/80 border border-rose-500/40 text-rose-300"
            }`}
          >
            {policyResult}
          </span>
        </div>

        <div className="flex justify-between py-1 font-bold text-white text-sm pt-2">
          <span>Final Cart Total:</span>
          <span className="text-cyan-300">₹{finalTotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between py-1 text-[11px]">
          <span className="text-slate-400">Human Approval:</span>
          <span
            className={`font-semibold ${
              humanApprovalState === "APPROVED" || humanApprovalState === "COMPLETED"
                ? "text-emerald-400"
                : "text-amber-400"
            }`}
          >
            {humanApprovalState}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DecisionReceipt;
