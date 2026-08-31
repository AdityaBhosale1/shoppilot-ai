"use client";

import React from "react";

interface PolicyRule {
  key: string;
  status: "PASS" | "REQUIRED";
}

const POLICY_RULES: PolicyRule[] = [
  { key: "budget_limit", status: "PASS" },
  { key: "price_integrity", status: "PASS" },
  { key: "stock_available", status: "PASS" },
  { key: "quantity_limit", status: "PASS" },
  { key: "discount_limit", status: "PASS" },
  { key: "user_confirmation", status: "REQUIRED" },
  { key: "payment_verification", status: "REQUIRED" },
];

export function PolicyEngineConsole() {
  return (
    <div className="p-5 rounded-2xl bg-[#030612]/90 border border-slate-800/80 space-y-3.5 shadow-xl font-mono">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Policy Engine Console
          </h3>
        </div>
        <span className="text-[10px] text-slate-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/40">
          Deterministic Rules
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-300">
        {POLICY_RULES.map((rule) => (
          <div
            key={rule.key}
            className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80"
          >
            <span className="text-slate-300">{rule.key}</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                rule.status === "PASS"
                  ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                  : "bg-amber-950/80 border-amber-500/40 text-amber-300"
              }`}
            >
              {rule.status}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-center space-y-1">
        <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
          Final Pipeline Decision
        </span>
        <strong className="text-xs font-bold text-amber-300 tracking-wide block">
          PAYMENT BLOCKED UNTIL APPROVAL
        </strong>
      </div>
    </div>
  );
}

export default PolicyEngineConsole;
