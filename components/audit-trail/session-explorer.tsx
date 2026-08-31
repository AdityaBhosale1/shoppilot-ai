"use client";

import React, { useState } from "react";
import { AuditSession } from "@/data/mock-audit-sessions";

interface SessionExplorerProps {
  sessions: AuditSession[];
  selectedSessionId: string;
  onSelectSession: (id: string) => void;
}

export function SessionExplorer({
  sessions,
  selectedSessionId,
  onSelectSession,
}: SessionExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Completed" | "Blocked" | "Failed">("All");

  const filteredSessions = sessions.filter((sess) => {
    const matchesSearch =
      sess.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sess.intent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || sess.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status: AuditSession["status"]) => {
    switch (status) {
      case "Completed":
        return "text-emerald-400 bg-emerald-950/60 border-emerald-800/40";
      case "Blocked":
        return "text-rose-400 bg-rose-950/60 border-rose-800/40";
      case "Failed":
        return "text-amber-400 bg-amber-950/60 border-amber-800/40";
    }
  };

  return (
    <div className="rounded-2xl bg-[#050816]/90 border border-blue-900/40 backdrop-blur-xl p-4 sm:p-5 flex flex-col h-full space-y-4 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            Agent Sessions
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/40">
          {filteredSessions.length} Logged
        </span>
      </div>

      {/* SEARCH INPUT */}
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search session ID or intent..."
          className="w-full px-3 py-2 text-xs text-white bg-[#030612]/90 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-500 font-mono transition-all"
        />
      </div>

      {/* FILTER CHIPS */}
      <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
        {(["All", "Completed", "Blocked", "Failed"] as const).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              activeFilter === filter
                ? "bg-blue-600 border-blue-400 text-white font-bold shadow-sm"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* SESSION LIST */}
      <div className="space-y-2 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredSessions.map((sess) => {
          const isSelected = sess.id === selectedSessionId;
          return (
            <div
              key={sess.id}
              onClick={() => onSelectSession(sess.id)}
              className={`p-3 rounded-xl border font-mono text-xs cursor-pointer transition-all ${
                isSelected
                  ? "bg-blue-950/60 border-cyan-500/50 shadow-md shadow-cyan-950/30"
                  : "bg-[#030612]/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300">{sess.id}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] border font-bold ${getStatusStyle(
                    sess.status
                  )}`}
                >
                  {sess.status}
                </span>
              </div>

              <div className="text-slate-200 font-sans text-xs my-1 line-clamp-1">
                {sess.intent}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                <span>Time: {sess.startTime}</span>
                <span className="font-bold text-white">₹{sess.finalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SessionExplorer;
