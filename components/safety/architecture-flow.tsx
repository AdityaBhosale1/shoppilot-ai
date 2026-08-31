"use client";

import React from "react";

interface FlowStep {
  number: string;
  title: string;
  sub: string;
  badge: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    number: "01",
    title: "AI Proposal",
    sub: "Growth Agent recommendation",
    badge: "LLM Level",
  },
  {
    number: "02",
    title: "Policy Engine",
    sub: "Deterministic budget/price checks",
    badge: "Rule Engine",
  },
  {
    number: "03",
    title: "Risk Checks",
    sub: "Stock & fraud limit verification",
    badge: "Validation",
  },
  {
    number: "04",
    title: "Human Approval",
    sub: "Customer confirms exact total",
    badge: "Gated Step",
  },
  {
    number: "05",
    title: "Payment Tool",
    sub: "Razorpay secure token",
    badge: "SDK Level",
  },
  {
    number: "06",
    title: "Audit Log",
    sub: "Immutable event recording",
    badge: "Traceability",
  },
];

export function ArchitectureFlow() {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
          Deterministic Financial Safety Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 relative">
        {FLOW_STEPS.map((step, idx) => (
          <div
            key={step.number}
            className="p-3.5 rounded-2xl bg-[#030612]/90 border border-blue-900/40 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800/40">
                  {step.number}
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  {step.badge}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white tracking-tight">
                {step.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                {step.sub}
              </p>
            </div>

            {idx < FLOW_STEPS.length - 1 && (
              <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-cyan-500/60 font-mono text-xs">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArchitectureFlow;
