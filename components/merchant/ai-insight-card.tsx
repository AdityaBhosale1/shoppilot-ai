"use client";

import React from "react";

export function AiInsightCard() {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-blue-950/60 border border-cyan-500/40 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
            ShopPilot Insight
          </h4>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/40">
          Automated Recommendation
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
        &ldquo;Budget-friendly cross-sells are converting <strong className="text-cyan-300 font-bold">2.3× better</strong> than premium add-ons. Essential Mousepad is currently the highest-performing cross-sell for gaming sessions.&rdquo;
      </p>

      <div className="pt-2 border-t border-cyan-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
        <div className="text-slate-300">
          <strong className="text-cyan-400">Suggested Action:</strong> Prioritize budget-compatible accessories below ₹300.
        </div>
        <span className="text-[10px] text-slate-400 italic">Informational Only</span>
      </div>
    </div>
  );
}

export default AiInsightCard;
