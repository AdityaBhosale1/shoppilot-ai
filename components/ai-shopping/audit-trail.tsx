"use client";

import React, { useRef, useEffect } from "react";

export interface AuditLogItem {
  id: string;
  timestamp: string;
  type:
    | "INTENT_RECEIVED"
    | "INTENT_PARSED"
    | "CATALOG_SEARCH"
    | "PRODUCT_MATCH"
    | "MERCHANT_PROPOSAL"
    | "POLICY_CHECK"
    | "BUYER_GUARDIAN_BLOCK"
    | "NEGOTIATION_STARTED"
    | "ALTERNATIVE_FOUND"
    | "CART_FINALIZED"
    | "PAYMENT_GATE"
    | "USER_APPROVED"
    | "CHECKOUT_READY"
    | "PAYMENT_SUCCESS"
    | "PAYMENT_FAILED"
    | "SESSION_COMPLETED"
    | "PAYMENT_ORDER_REQUESTED"
    | "RAZORPAY_ORDER_CREATED"
    | "CHECKOUT_OPENED"
    | "PAYMENT_AUTHORIZED"
    | "PAYMENT_VERIFICATION_STARTED"
    | "PAYMENT_SIGNATURE_VERIFIED"
    | "PAYMENT_COMPLETED"
    | "CHECKOUT_CANCELLED"
    | "PAYMENT_SIGNATURE_INVALID";
  message: string;
  detail?: string;
  status?: "INFO" | "SUCCESS" | "FAILED" | "WARN";
}

interface AuditTrailProps {
  logs: AuditLogItem[];
  onReset: () => void;
}

export function AuditTrail({ logs, onReset }: AuditTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new log entries arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "SUCCESS":
        return "text-emerald-400 bg-emerald-950/60 border-emerald-800/40";
      case "FAILED":
      case "WARN":
        return "text-rose-400 bg-rose-950/60 border-rose-800/40";
      default:
        return "text-cyan-400 bg-blue-950/60 border-blue-800/40";
    }
  };

  return (
    <div className="rounded-2xl bg-[#050816]/90 border border-blue-900/40 backdrop-blur-xl p-4 sm:p-5 flex flex-col h-[560px] shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h4 className="font-bold text-white text-xs font-mono tracking-wider uppercase">
            Live Agent Trace
          </h4>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/30">
          Auditable Session
        </span>
      </div>

      {/* LOG ENTRIES CONTAINER */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-2.5 my-3 pr-1 scrollbar-thin scrollbar-thumb-slate-800"
      >
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-4">
            <span className="text-xs text-slate-500 font-mono italic">
              Awaiting shopping request... Click &ldquo;Find Products&rdquo; to start trace.
            </span>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-xl bg-[#030612]/80 border border-slate-800/80 font-mono text-[11px] space-y-1 animate-in fade-in slide-in-from-bottom-1 duration-200"
            >
              <div className="flex items-center justify-between font-mono">
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getStatusColor(
                    log.status
                  )}`}
                >
                  {log.type}
                </span>
                <span className="text-[9px] text-slate-500">{log.timestamp}</span>
              </div>

              <div className="text-slate-200 leading-snug">{log.message}</div>

              {log.detail && (
                <div className="text-[10px] text-slate-400 italic pt-0.5 border-t border-slate-900">
                  {log.detail}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* FOOTER RESET BUTTON */}
      <div className="pt-2 border-t border-slate-800 shrink-0 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-mono">
          Logs: {logs.length} events
        </span>
        <button
          type="button"
          onClick={onReset}
          className="px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/10 border border-slate-700/60 rounded-lg transition-colors"
        >
          Reset Session
        </button>
      </div>
    </div>
  );
}

export default AuditTrail;
