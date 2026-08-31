"use client";

import React from "react";

interface FunnelStep {
  label: string;
  count: number;
  pct: number;
}

const FUNNEL_STEPS: FunnelStep[] = [
  { label: "Shopping Sessions", count: 1284, pct: 100.0 },
  { label: "Intent Understood", count: 1197, pct: 93.2 },
  { label: "Products Recommended", count: 1086, pct: 84.6 },
  { label: "Cart Created", count: 642, pct: 50.0 },
  { label: "Customer Approved", count: 371, pct: 28.9 },
  { label: "Payment Completed", count: 316, pct: 24.6 },
];

export function ConversionFunnel() {
  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="text-sm font-bold text-white tracking-tight">
          Agentic Commerce Funnel
        </h3>
        <span className="text-[10px] font-mono text-cyan-300 bg-blue-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          Conversion: 24.6%
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {FUNNEL_STEPS.map((step) => (
          <div key={step.label} className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-300">{step.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{step.count.toLocaleString()}</span>
                <span className="text-slate-400 text-[10px]">({step.pct}%)</span>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${step.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversionFunnel;
