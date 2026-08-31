"use client";

import React, { useState } from "react";

type ScenarioKey = "A" | "B" | "C";

interface ScenarioDetails {
  key: ScenarioKey;
  label: string;
  title: string;
  field1Label: string;
  field1Value: string;
  field2Label: string;
  field2Value: string;
  result: string;
  resultStyle: string;
  reason: string;
  action: string;
}

const SCENARIOS: Record<ScenarioKey, ScenarioDetails> = {
  A: {
    key: "A",
    label: "A. Budget Violation",
    title: "Scenario A: Hard Limit Exceeded",
    field1Label: "Requested Cart Total",
    field1Value: "₹6,499",
    field2Label: "Allowed Limit",
    field2Value: "₹5,000",
    result: "BLOCKED",
    resultStyle: "text-rose-400 bg-rose-950/60 border-rose-800/40",
    reason: "Maximum transaction limit exceeded.",
    action: "No payment created. Hard stop enforced.",
  },
  B: {
    key: "B",
    label: "B. Payment Failure",
    title: "Scenario B: Gateway Disruption",
    field1Label: "Payment Attempt",
    field1Value: "FAILED",
    field2Label: "Duplicate Order",
    field2Value: "PREVENTED",
    result: "CART PRESERVED",
    resultStyle: "text-amber-400 bg-amber-950/60 border-amber-800/40",
    reason: "Gateway returned payment failure.",
    action: "Cart preserved safely. Recovery retry available.",
  },
  C: {
    key: "C",
    label: "C. Invalid Payment Verification",
    title: "Scenario C: Signature Mismatch",
    field1Label: "Callback Received",
    field1Value: "Verification FAILED",
    field2Label: "Razorpay Signature",
    field2Value: "INVALID",
    result: "SECURITY HOLD",
    resultStyle: "text-rose-400 bg-rose-950/60 border-rose-800/40",
    reason: "Razorpay webhooks verification failed.",
    action: "Order fulfillment blocked until security clearance.",
  },
};

export function FailureEngineDemo() {
  const [activeTab, setActiveTab] = useState<ScenarioKey>("A");

  const scenario = SCENARIOS[activeTab];

  return (
    <div className="p-5 rounded-2xl bg-[#030612]/90 border border-slate-800/80 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            Failure Handling Engine
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive demo: Select a failure scenario to inspect deterministic safety guards
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
          Zero Data Loss
        </span>
      </div>

      {/* SELECTABLE SCENARIO TABS */}
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              activeTab === key
                ? "bg-blue-600 border-blue-400 text-white font-bold shadow-md shadow-blue-600/30"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            {SCENARIOS[key].label}
          </button>
        ))}
      </div>

      {/* DISPLAYED SCENARIO DETAILS */}
      <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span className="font-bold text-white">{scenario.title}</span>
          <span
            className={`px-2 py-0.5 rounded font-bold border text-[10px] ${scenario.resultStyle}`}
          >
            {scenario.result}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-slate-300">
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{scenario.field1Label}</span>
            <strong className="text-white text-xs">{scenario.field1Value}</strong>
          </div>
          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{scenario.field2Label}</span>
            <strong className="text-white text-xs">{scenario.field2Value}</strong>
          </div>
        </div>

        <div className="space-y-1 pt-1 text-slate-300 text-[11px]">
          <div>
            <strong className="text-rose-300">Reason:</strong> {scenario.reason}
          </div>
          <div>
            <strong className="text-cyan-300">System Action:</strong> {scenario.action}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FailureEngineDemo;
