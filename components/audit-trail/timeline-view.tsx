"use client";

import React from "react";
import { AuditEvent } from "@/data/mock-audit-sessions";

interface TimelineViewProps {
  events: AuditEvent[];
  onSelectEvent: (event: AuditEvent) => void;
}

export function TimelineView({ events, onSelectEvent }: TimelineViewProps) {
  const getEventBadgeStyle = (result?: string) => {
    switch (result) {
      case "SUCCESS":
      case "PASSED":
      case "AUTHORIZED":
      case "COMPLETED":
        return "text-emerald-400 bg-emerald-950/60 border-emerald-800/40";
      case "FAILED":
      case "BLOCKED":
        return "text-rose-400 bg-rose-950/60 border-rose-800/40";
      case "READY":
        return "text-cyan-300 bg-blue-950/60 border-cyan-500/30";
      default:
        return "text-slate-400 bg-slate-900 border-slate-800";
    }
  };

  return (
    <div className="rounded-2xl bg-[#050816]/90 border border-blue-900/40 backdrop-blur-xl p-4 sm:p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
          Chronological Audit Timeline
        </h3>
        <span className="text-[10px] font-mono text-slate-400">
          Click event to inspect detail trace
        </span>
      </div>

      {/* VERTICAL TIMELINE CONTAINER */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-900/50">
        {events.map((evt) => (
          <div
            key={evt.id}
            onClick={() => onSelectEvent(evt)}
            className="relative group cursor-pointer"
          >
            {/* Timeline Node Icon/Dot */}
            <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#050816] border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

            {/* Event Card */}
            <div className="p-3.5 rounded-xl bg-[#030612]/80 border border-slate-800/80 group-hover:border-cyan-500/40 transition-all font-mono text-xs space-y-1.5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-[11px] font-bold">
                    {evt.timestamp}
                  </span>
                  <span className="text-white font-bold tracking-tight">
                    {evt.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                    Actor: {evt.actor}
                  </span>
                  {evt.result && (
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getEventBadgeStyle(
                        evt.result
                      )}`}
                    >
                      {evt.result}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-300 font-sans text-xs leading-snug">
                {evt.description}
              </p>

              {evt.details && (
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                  {Object.entries(evt.details).map(([k, v]) => (
                    <span key={k} className="bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
                      {k}: <strong className="text-slate-200">{String(v)}</strong>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineView;
