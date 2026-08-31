"use client";

import React, { useEffect } from "react";
import { AuditSession } from "@/data/mock-audit-sessions";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

interface ReceiptModalProps {
  session: AuditSession;
  onClose: () => void;
}

export function ReceiptModal({ session, onClose }: ReceiptModalProps) {
  const data = session.receiptData;

  useEffect(() => {
    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#050816] border border-cyan-500/50 p-6 space-y-4 shadow-2xl font-mono text-xs text-slate-200 scrollbar-thin scrollbar-thumb-slate-800">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-bold text-white text-sm tracking-wider uppercase">
              ShopPilot Commerce Decision Receipt
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* RECEIPT METRICS BODY */}
        <div className="space-y-2 bg-[#030612]/90 p-4 rounded-2xl border border-slate-800">
          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Session Reference:</span>
            <span className="text-cyan-300 font-bold">{session.id}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Customer Intent:</span>
            <span className="text-white font-sans text-xs font-medium">
              &ldquo;{data.customerIntent}&rdquo;
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Budget Limit:</span>
            <span className="text-white font-bold">₹{data.budget.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Primary Products:</span>
            <span className="text-slate-200">₹{data.primaryProductsCost.toLocaleString("en-IN")}</span>
          </div>

          {data.upsellProposed !== "None" && (
            <div className="flex justify-between py-1 border-b border-slate-900 text-rose-300">
              <span>Upsell Proposed:</span>
              <span className="line-through">{data.upsellProposed} (₹{data.upsellCost})</span>
            </div>
          )}

          <div className="flex justify-between py-1 border-b border-slate-900 text-rose-300">
            <span>Upsell Result:</span>
            <span className="font-bold">{data.upsellResult}</span>
          </div>

          {data.rejectionReason && (
            <div className="flex justify-between py-1 border-b border-slate-900 text-rose-300">
              <span>Rejection Reason:</span>
              <span className="bg-rose-500/15 px-1.5 py-0.5 rounded text-[10px]">
                {data.rejectionReason}
              </span>
            </div>
          )}

          {data.acceptedAlternative && (
            <div className="flex justify-between py-1 border-b border-slate-900 text-emerald-300">
              <span>Accepted Alternative:</span>
              <span>{data.acceptedAlternative} (₹{data.acceptedAlternativeCost})</span>
            </div>
          )}

          <div className="flex justify-between py-1 border-b border-slate-900 font-bold text-white text-sm pt-2">
            <span>Final Amount:</span>
            <span className="text-cyan-300">₹{data.finalAmount.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900 text-slate-300">
            <span>Budget Remaining:</span>
            <span>₹{data.budgetRemaining}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900 text-emerald-300 font-bold">
            <span>Merchant AOV Lift:</span>
            <span>+₹{data.aovLift}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Policy Checks:</span>
            <span className="text-emerald-400 font-bold">{data.policyChecks}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Human Approval:</span>
            <span className="text-emerald-400 font-bold">{data.humanApproval}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Payment Mode:</span>
            <span className="text-slate-200">{data.paymentMode}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400">Final Status:</span>
            <span className="text-emerald-300 font-bold">{data.finalStatus}</span>
          </div>
        </div>

        {/* MEMORABLE FOOTER */}
        <div className="p-3 rounded-xl bg-blue-950/60 border border-cyan-500/40 text-center">
          <span className="text-xs font-bold text-cyan-300 tracking-wide">
            &ldquo;AI proposes. Policies validate. Humans authorize.&rdquo;
          </span>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;
