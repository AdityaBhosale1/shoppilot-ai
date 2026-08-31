"use client";

import React from "react";

interface SafetyMetric {
  label: string;
  value: string;
  badge: string;
  color: "emerald" | "blue" | "cyan";
}

const SAFETY_METRICS: SafetyMetric[] = [
  {
    label: "Payments without confirmation",
    value: "0",
    badge: "100% Gated",
    color: "emerald",
  },
  {
    label: "Policy checks executed",
    value: "1,926",
    badge: "Verified",
    color: "blue",
  },
  {
    label: "Unsafe actions blocked",
    value: "37",
    badge: "Hard Stop",
    color: "cyan",
  },
  {
    label: "Duplicate payment attempts prevented",
    value: "3",
    badge: "Idempotent",
    color: "emerald",
  },
  {
    label: "Audit coverage",
    value: "100%",
    badge: "Immutable",
    color: "blue",
  },
];

export function SafetyMetricsStrip() {
  return (
    <div className="p-4 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          Demo Safety Metrics
        </span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          99.7% Safety Score
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {SAFETY_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 font-mono space-y-1 text-center"
          >
            <div className="text-base sm:text-lg font-bold text-white">
              {metric.value}
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">
              {metric.label}
            </div>
            <div className="pt-1">
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-950/60 border border-blue-800/40 text-cyan-300">
                {metric.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SafetyMetricsStrip;
