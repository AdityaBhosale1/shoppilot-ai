"use client";

import React from "react";

export function ExplainableCard() {
  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-3.5 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <h3 className="text-sm font-bold text-white tracking-tight">
            Explainable Decisions
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            Reason Required ✓
          </span>
        </div>

        <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/30 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-300">
            <span className="text-slate-400">Proposed Action:</span>
            <span className="text-white font-bold">Add Essential Mousepad</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span className="text-slate-400">Price:</span>
            <span className="text-cyan-300 font-bold">₹249</span>
          </div>

          <div className="pt-1.5 border-t border-slate-800/80 space-y-1 text-slate-300 text-[11px]">
            <div className="font-semibold text-cyan-400 text-[10px] uppercase tracking-wider">
              Traceable Why Statement:
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">•</span> Relevant to gaming setup
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">•</span> Fits remaining budget (₹53 remaining)
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">•</span> Improves cart completeness
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <span className="text-emerald-400">•</span> Merchant AOV increases by ₹249
            </div>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
        <p className="text-[11px] text-slate-300 font-mono italic">
          &ldquo;Every commercial recommendation includes a traceable reason.&rdquo;
        </p>
      </div>
    </div>
  );
}

export default ExplainableCard;
