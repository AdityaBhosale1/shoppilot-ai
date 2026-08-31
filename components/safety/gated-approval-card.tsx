"use client";

import React, { useState } from "react";

export function GatedApprovalCard() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-3.5 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <h3 className="text-sm font-bold text-white tracking-tight">
            Human Approval Gate
          </h3>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
              isAuthorized
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                : "bg-amber-950/80 border-amber-500/40 text-amber-300"
            }`}
          >
            {isAuthorized ? "AUTHORIZED" : "BLOCKED"}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/30 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-300">
            <span className="text-slate-400">Final Cart Total:</span>
            <span className="text-white font-bold">₹2,947</span>
          </div>

          <div className="space-y-1 pt-1 border-t border-slate-800/80">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Automated Policy Checks:
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px] text-emerald-400">
              <span className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 text-center">
                Budget ✓
              </span>
              <span className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 text-center">
                Price ✓
              </span>
              <span className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 text-center">
                Stock ✓
              </span>
              <span className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 text-center">
                Quantity ✓
              </span>
            </div>
          </div>

          <div className="flex justify-between py-1 border-t border-slate-800/80 text-[11px]">
            <span className="text-slate-400">Gate Reason:</span>
            <span className="text-amber-300">Customer approval required</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE SIMULATED APPROVAL BUTTON */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setIsAuthorized(!isAuthorized)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-2 transition-all shadow-md ${
            isAuthorized
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            {isAuthorized ? (
              <polyline points="20 6 9 17 4 12" />
            ) : (
              <>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </>
            )}
          </svg>
          <span>
            {isAuthorized ? "State: AUTHORIZED ✓" : "Simulate Approve ₹2,947"}
          </span>
        </button>

        <p className="text-[10px] text-slate-400 font-mono text-center italic">
          Visual demo interaction • Real payment is blocked without confirmation
        </p>
      </div>
    </div>
  );
}

export default GatedApprovalCard;
