"use client";

import React, { useEffect } from "react";
import { AuditEvent } from "@/data/mock-audit-sessions";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

interface EventDetailDrawerProps {
  event: AuditEvent | null;
  onClose: () => void;
}

export function EventDetailDrawer({ event, onClose }: EventDetailDrawerProps) {
  useEffect(() => {
    if (event) {
      lockBodyScroll();
      return () => {
        unlockBodyScroll();
      };
    }
  }, [event]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#050816] border border-cyan-500/40 p-5 space-y-4 shadow-2xl font-mono text-xs text-slate-200 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="font-bold text-white text-sm">
              Event Detail: {event.type}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 bg-[#030612]/90 p-3.5 rounded-xl border border-slate-800">
          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Event ID:</span>
            <span className="text-cyan-300 font-bold">{event.id}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Timestamp:</span>
            <span className="text-slate-200">{event.timestamp}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-900">
            <span className="text-slate-400">Actor / Module:</span>
            <span className="text-indigo-300 font-bold">{event.actor}</span>
          </div>

          <div className="py-1 border-b border-slate-900">
            <span className="text-slate-400 block mb-1">Description:</span>
            <div className="text-white bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px] font-sans">
              {event.description}
            </div>
          </div>

          {event.reason && (
            <div className="flex justify-between py-1 border-b border-slate-900 text-rose-300">
              <span>Policy Reason:</span>
              <span className="font-bold">{event.reason}</span>
            </div>
          )}

          {event.stateBefore && (
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">State Before:</span>
              <span className="text-slate-300">{event.stateBefore}</span>
            </div>
          )}

          {event.stateAfter && (
            <div className="flex justify-between py-1 border-b border-slate-900">
              <span className="text-slate-400">State After:</span>
              <span className="text-emerald-300 font-bold">{event.stateAfter}</span>
            </div>
          )}

          <div className="flex justify-between py-1">
            <span className="text-slate-400">Financial Action Executed:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                event.financialExecuted
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-700/40"
                  : "bg-slate-900 text-slate-400 border border-slate-800"
              }`}
            >
              {event.financialExecuted ? "YES" : "NO"}
            </span>
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailDrawer;
