"use client";

import React from "react";
import { MerchantDashboard } from "@/components/merchant/merchant-dashboard";

export function MerchantSection() {
  return (
    <section
      id="merchant"
      className="relative w-full pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28 overflow-hidden scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-[11px] font-mono font-semibold tracking-wider text-cyan-400 uppercase shadow-sm">
            Merchant Intelligence
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Turn Conversations{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Into Revenue.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Track how ShopPilot AI improves product discovery, conversion, average order value, and safe checkout performance across every agentic shopping session.
          </p>
        </div>

        {/* ================================================== */}
        {/* MAIN MERCHANT DASHBOARD CONSOLE */}
        {/* ================================================== */}
        <MerchantDashboard />

      </div>
    </section>
  );
}

export default MerchantSection;
