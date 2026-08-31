"use client";

import React from "react";

export function AgentContribution() {
  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="text-sm font-bold text-white tracking-tight">
          Agent Contribution
        </h3>
        <span className="text-[10px] font-mono text-slate-400">
          Dual-Agent Balance
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MERCHANT GROWTH AGENT COLUMN */}
        <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-800/30 space-y-2.5">
          <div className="flex items-center justify-between border-b border-indigo-900/40 pb-2">
            <span className="text-xs font-mono font-bold text-indigo-300">
              Merchant Growth Agent
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
              +AOV Focus
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <div className="flex justify-between py-0.5">
              <span>Recommendations:</span>
              <span className="text-white font-bold">2,841</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Upsells Proposed:</span>
              <span className="text-white font-bold">684</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Cross-sells Accepted:</span>
              <span className="text-emerald-300 font-bold">196</span>
            </div>
            <div className="flex justify-between py-1 border-t border-indigo-900/40 text-indigo-300 font-bold">
              <span>Revenue Added:</span>
              <span className="text-cyan-300">₹48,940</span>
            </div>
          </div>
        </div>

        {/* BUYER GUARDIAN AGENT COLUMN */}
        <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-2.5">
          <div className="flex items-center justify-between border-b border-rose-900/40 pb-2">
            <span className="text-xs font-mono font-bold text-rose-300">
              Buyer Guardian Agent
            </span>
            <span className="text-[10px] font-mono text-cyan-300 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40">
              Safety Focus
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <div className="flex justify-between py-0.5">
              <span>Policy Checks:</span>
              <span className="text-white font-bold">1,926</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Unsafe Proposals Blocked:</span>
              <span className="text-rose-300 font-bold">37</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Budget Violations Prevented:</span>
              <span className="text-rose-300 font-bold">24</span>
            </div>
            <div className="flex justify-between py-1 border-t border-rose-900/40 text-slate-300">
              <span>Price/Stock Issues Prevented:</span>
              <span className="text-rose-300 font-bold">13</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/30 text-center">
        <p className="text-xs text-slate-300 font-mono italic">
          &ldquo;ShopPilot increased merchant value without bypassing customer constraints.&rdquo;
        </p>
      </div>
    </div>
  );
}

export default AgentContribution;
