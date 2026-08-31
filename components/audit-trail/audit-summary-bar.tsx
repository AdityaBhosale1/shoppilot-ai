"use client";

import React from "react";

interface AuditSummaryBarProps {
  totalEvents: number;
}

export function AuditSummaryBar({ totalEvents }: AuditSummaryBarProps) {
  return (
    <div className="p-4 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-2.5 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Audit Summary Bar
        </span>
        <span className="text-[10px] text-cyan-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/40">
          Demo Audit Data
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="font-bold text-white text-sm">{totalEvents}</div>
          <div className="text-[10px] text-slate-400">Session Events</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="font-bold text-indigo-300 text-sm">4</div>
          <div className="text-[10px] text-slate-400">AI Decisions</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="font-bold text-cyan-300 text-sm">3</div>
          <div className="text-[10px] text-slate-400">Policy Checks</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="font-bold text-rose-300 text-sm">1</div>
          <div className="text-[10px] text-slate-400">Rejected Actions</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="font-bold text-emerald-300 text-sm">1</div>
          <div className="text-[10px] text-slate-400">Human Approvals</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="font-bold text-white text-sm">1</div>
          <div className="text-[10px] text-slate-400">Payment Actions</div>
        </div>

        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="font-bold text-emerald-400 text-sm">100%</div>
          <div className="text-[10px] text-slate-400">Audit Coverage</div>
        </div>
      </div>
    </div>
  );
}

export default AuditSummaryBar;
