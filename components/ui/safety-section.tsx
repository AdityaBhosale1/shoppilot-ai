"use client";

import React from "react";
import { SafetyDashboard } from "@/components/safety/safety-dashboard";

export function SafetySection() {
  return (
    <section
      id="safety"
      className="relative w-full pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28 overflow-hidden scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-[11px] font-mono font-semibold tracking-wider text-cyan-400 uppercase shadow-sm">
            Safe Agentic Commerce
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            AI Can Recommend.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              It Cannot Spend Freely.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            ShopPilot separates AI reasoning from financial authority. Every money action passes deterministic policy checks and explicit human approval before checkout.
          </p>
        </div>

        {/* ================================================== */}
        {/* MAIN SAFETY & GUARDRAIL ENGINE CONTENT */}
        {/* ================================================== */}
        <SafetyDashboard />

      </div>
    </section>
  );
}

export default SafetySection;
