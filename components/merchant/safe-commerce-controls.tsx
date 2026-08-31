"use client";

import React from "react";

export function SafeCommerceControls() {
  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <h3 className="text-sm font-bold text-white tracking-tight">
            Safe Commerce Controls
          </h3>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-slate-400">Safety Score:</span>
          <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
            99.7%
          </span>
        </div>
      </div>

      <div className="space-y-2 font-mono text-xs text-slate-300">
        <div className="flex justify-between py-1.5 border-b border-slate-900">
          <span className="text-slate-300">Payments requiring approval:</span>
          <span className="text-emerald-400 font-bold">100%</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-900">
          <span className="text-slate-300">Payments executed without confirmation:</span>
          <span className="text-emerald-400 font-bold">0</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-900">
          <span className="text-slate-300">Budget violations blocked:</span>
          <span className="text-cyan-300 font-bold">24</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-900">
          <span className="text-slate-300">Invalid price states blocked:</span>
          <span className="text-cyan-300 font-bold">8</span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-900">
          <span className="text-slate-300">Out-of-stock actions blocked:</span>
          <span className="text-cyan-300 font-bold">5</span>
        </div>

        <div className="flex justify-between py-1.5">
          <span className="text-slate-300">Duplicate payment attempts prevented:</span>
          <span className="text-cyan-300 font-bold">3</span>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-center">
        <span className="text-xs text-emerald-300 font-mono font-semibold">
          &ldquo;Every financial action is validated before execution.&rdquo;
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center text-[10px] font-mono text-slate-400">
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
          Explainable ✓
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
          Bounded ✓
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
          Gated ✓
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
          Auditable ✓
        </span>
      </div>
    </div>
  );
}

export default SafeCommerceControls;
