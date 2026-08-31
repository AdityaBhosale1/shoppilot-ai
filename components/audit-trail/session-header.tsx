"use client";

import React from "react";
import { AuditSession } from "@/data/mock-audit-sessions";

interface SessionHeaderProps {
  session: AuditSession;
  onOpenReceipt: () => void;
}

export function SessionHeader({ session, onOpenReceipt }: SessionHeaderProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#050816]/90 border border-blue-900/40 backdrop-blur-xl space-y-3.5 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-300">
              Session {session.id}
            </span>
            <span className="text-[10px] font-mono text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-medium">
              {session.intent}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {session.badges.map((badge) => {
              const isLiveTrace = badge === "LIVE SESSION TRACE";
              const isDemoData = badge === "Demo Audit Data";
              return (
                <span
                  key={badge}
                  className={`px-2.5 py-0.5 text-[10px] font-mono rounded-full border ${
                    isLiveTrace
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)] animate-pulse"
                      : isDemoData
                      ? "bg-slate-900/90 border-slate-700/80 text-slate-400 font-medium"
                      : "bg-blue-950/60 border-cyan-500/30 text-cyan-300"
                  }`}
                >
                  {badge}
                </span>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenReceipt}
          className="px-3.5 py-1.5 text-xs font-mono font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/30 shrink-0"
        >
          View Decision Receipt
        </button>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs text-slate-300 pt-0.5">
        <div className="p-2 rounded-lg bg-[#030612]/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Started:</span>
          <strong className="text-white">{session.startTime}</strong>
        </div>
        <div className="p-2 rounded-lg bg-[#030612]/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Completed:</span>
          <strong className="text-white">{session.endTime}</strong>
        </div>
        <div className="p-2 rounded-lg bg-[#030612]/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Duration:</span>
          <strong className="text-white">{session.duration}</strong>
        </div>
        <div className="p-2 rounded-lg bg-[#030612]/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Final Amount:</span>
          <strong className="text-cyan-300">₹{session.finalAmount.toLocaleString("en-IN")}</strong>
        </div>
        <div className="p-2 rounded-lg bg-[#030612]/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block">AOV Lift:</span>
          <strong className="text-emerald-400">{session.aovLift}</strong>
        </div>
      </div>
    </div>
  );
}

export default SessionHeader;
