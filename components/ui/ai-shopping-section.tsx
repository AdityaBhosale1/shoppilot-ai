"use client";

import React from "react";
import { AIShoppingDemo } from "@/components/ai-shopping/ai-shopping-demo";

export function AIShoppingSection() {
  return (
    <section
      id="ai-shopping"
      className="relative w-full pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28 overflow-hidden scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-[11px] font-mono font-semibold tracking-wider text-cyan-400 uppercase shadow-sm">
            Live AI Shopping
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Describe What You Want.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              ShopPilot Handles the Rest.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Turn a natural-language shopping request into a transparent, budget-aware purchase flow powered by specialized commerce agents.
          </p>
        </div>

        {/* ================================================== */}
        {/* INTERACTIVE DEMO APPLICATION PANEL */}
        {/* ================================================== */}
        <AIShoppingDemo />

      </div>
    </section>
  );
}

export default AIShoppingSection;
