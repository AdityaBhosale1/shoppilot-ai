"use client";

import React from "react";

export function SafetyGuaranteeStrip() {
  return (
    <div className="rounded-3xl bg-[#050816]/90 border border-blue-900/40 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          ShopPilot Safety Guarantees
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-1.5 font-mono">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Explainable
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            &ldquo;Every recommendation includes a traceable reason.&rdquo;
          </p>
        </div>

        {/* Column 2 */}
        <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-1.5 font-mono">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Bounded
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            &ldquo;Agent actions stay inside deterministic limits.&rdquo;
          </p>
        </div>

        {/* Column 3 */}
        <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-1.5 font-mono">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Gated
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            &ldquo;Money actions require explicit customer approval.&rdquo;
          </p>
        </div>

        {/* Column 4 */}
        <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-1.5 font-mono">
          <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
            Auditable
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            &ldquo;Every decision and payment event is recorded.&rdquo;
          </p>
        </div>
      </div>

      {/* HIGHLIGHTED MEMORABLE STATEMENT */}
      <div className="pt-2">
        <div className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-950/70 via-blue-900/50 to-blue-950/70 border border-cyan-500/40 text-center shadow-lg">
          <span className="text-sm sm:text-base font-mono font-bold text-cyan-300 tracking-wide">
            &ldquo;AI proposes. Policies validate. Humans authorize. Payments execute.&rdquo;
          </span>
        </div>
      </div>
    </div>
  );
}

export default SafetyGuaranteeStrip;
