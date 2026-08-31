"use client";

import React from "react";

export function BoundedLimitsCard() {
  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-3.5 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <h3 className="text-sm font-bold text-white tracking-tight">
            Deterministic Limits
          </h3>
          <span className="text-[10px] font-mono text-cyan-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
            Hard Boundaries
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-xs text-slate-300">
          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Maximum Cart Value:</span>
            <span className="text-white font-bold">₹5,000</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Maximum Quantity / Product:</span>
            <span className="text-white font-bold">3 items</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Maximum Agent Discount:</span>
            <span className="text-white font-bold">10%</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Price Source:</span>
            <span className="text-cyan-300 font-bold">Catalog DB Only</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Stock Validation:</span>
            <span className="text-emerald-400 font-bold">Required</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400">Payment Mode:</span>
            <span className="text-amber-300 font-bold">Test Mode Only</span>
          </div>
        </div>
      </div>

      {/* VISUAL EMPHASIS: LLM vs BACKEND */}
      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 space-y-2 text-center font-mono">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
            <strong className="text-indigo-300">LLM</strong> = Proposes
          </div>
          <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
            <strong className="text-cyan-400">Backend</strong> = Decides
          </div>
        </div>
        <p className="text-[10px] text-slate-400 italic">
          &ldquo;LLM suggestions cannot override deterministic limits.&rdquo;
        </p>
      </div>
    </div>
  );
}

export default BoundedLimitsCard;
