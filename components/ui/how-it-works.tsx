"use client";

import React from "react";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28 overflow-hidden scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-[11px] font-mono font-semibold tracking-wider text-cyan-400 uppercase shadow-sm">
            How ShopPilot Works
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Two AI Agents.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              One Safer Purchase.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            ShopPilot balances merchant growth with customer protection by letting
            two specialized AI agents evaluate every purchase before checkout.
          </p>
        </div>

        {/* ================================================== */}
        {/* MAIN 5-STEP WORKFLOW */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16 relative">
          
          {/* STEP 1 — CUSTOMER INTENT */}
          <div className="relative rounded-2xl bg-[#050816]/80 border border-blue-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-blue-700/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Input Phase
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                Customer Intent
              </h3>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/30 text-xs text-slate-200 italic">
                &ldquo;I need a gaming keyboard and mouse under ₹3,000.&rdquo;
              </div>

              <div className="space-y-1.5 pt-1 text-xs font-mono">
                <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                  Extracted Constraints
                </div>
                <div className="flex justify-between text-slate-300 bg-slate-900/40 px-2 py-1 rounded">
                  <span>Budget:</span>
                  <span className="font-bold text-white">₹3,000</span>
                </div>
                <div className="flex justify-between text-slate-300 bg-slate-900/40 px-2 py-1 rounded">
                  <span>Category:</span>
                  <span className="text-slate-200">Gaming</span>
                </div>
                <div className="flex justify-between text-slate-300 bg-slate-900/40 px-2 py-1 rounded">
                  <span>Items:</span>
                  <span className="text-slate-200">Keyboard + Mouse</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
              Natural Language → Structured JSON
            </div>
          </div>

          {/* STEP 2 — MERCHANT GROWTH AGENT */}
          <div className="relative rounded-2xl bg-[#050816]/80 border border-indigo-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-indigo-700/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider">
                  Growth Engine
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                Merchant Growth Agent
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Finds relevant products and identifies safe opportunities to increase conversion and average order value.
              </p>

              <div className="space-y-1 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-1.5 text-indigo-200">
                  <span className="text-indigo-400">✓</span> Product ranking
                </div>
                <div className="flex items-center gap-1.5 text-indigo-200">
                  <span className="text-indigo-400">✓</span> Upsell discovery
                </div>
                <div className="flex items-center gap-1.5 text-indigo-200">
                  <span className="text-indigo-400">✓</span> Cross-sell discovery
                </div>
                <div className="flex items-center gap-1.5 text-indigo-200">
                  <span className="text-indigo-400">✓</span> Offer selection
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Revenue Goal</span>
              <span className="text-indigo-300 font-bold bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-700/40">
                Increase AOV
              </span>
            </div>
          </div>

          {/* STEP 3 — BUYER GUARDIAN AGENT */}
          <div className="relative rounded-2xl bg-[#050816]/80 border border-rose-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-rose-700/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold flex items-center justify-center">
                  3
                </span>
                <span className="text-[10px] font-mono text-rose-300 uppercase tracking-wider">
                  Protection Layer
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                Buyer Guardian Agent
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Independently protects the customer&rsquo;s budget, preferences, and purchase boundaries.
              </p>

              <div className="space-y-1 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Budget protection
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Preference validation
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Price verification
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Quantity limits
                </div>
              </div>

              {/* Warning Box */}
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-[11px] font-mono text-rose-200">
                <div className="font-bold flex items-center justify-between text-rose-300">
                  <span>Rejected Proposal</span>
                  <span className="bg-rose-500/20 px-1.5 py-0.5 rounded text-[10px]">
                    ₹599 Mousepad
                  </span>
                </div>
                <div className="text-slate-400 mt-0.5">
                  Reason: Budget exceeded
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-rose-300 font-mono">
              Policy Enforcer • Hard Stop
            </div>
          </div>

          {/* STEP 4 — CONSTRAINT NEGOTIATION ENGINE (PROMINENT HIGHLIGHT) */}
          <div className="relative rounded-2xl bg-[#050816]/95 border-2 border-cyan-500/50 backdrop-blur-xl p-5 flex flex-col justify-between shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/20 md:col-span-2 lg:col-span-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center">
                  4
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                  Balanced Outcome
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                Constraint Negotiation Engine
              </h3>

              <p className="text-xs text-slate-200 leading-relaxed">
                When a merchant recommendation violates customer constraints, ShopPilot searches for a better alternative instead of blindly continuing.
              </p>

              {/* Mini Flow Diagram Inside Negotiation Card */}
              <div className="p-3 rounded-xl bg-blue-950/60 border border-cyan-800/40 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Proposal:</span>
                  <span className="line-through text-slate-500">₹3,297</span>
                </div>
                <div className="text-rose-400 text-[11px] text-center italic border-y border-slate-800/80 py-0.5">
                  ↓ Rejected by Guardian
                </div>
                <div className="flex justify-between text-emerald-300 font-bold">
                  <span>Alternative Found:</span>
                  <span>₹2,947</span>
                </div>
              </div>

              <div className="space-y-1 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span>✓</span> Customer protected
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span>✓</span> Merchant AOV improved (+₹249)
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-900/50 text-[11px] text-cyan-300 font-mono font-semibold text-center">
              Win-Win Dual Equilibrium
            </div>
          </div>

          {/* STEP 5 — APPROVAL & PAYMENT */}
          <div className="relative rounded-2xl bg-[#050816]/80 border border-blue-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-blue-700/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                  5
                </span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  Final Gate
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                Approval &amp; Payment
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Financial actions remain blocked until every policy check passes and the customer explicitly approves the final amount.
              </p>

              {/* Status Checks */}
              <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-emerald-400">
                <span className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 text-center">
                  Budget ✓
                </span>
                <span className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 text-center">
                  Price ✓
                </span>
                <span className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 text-center">
                  Stock ✓
                </span>
                <span className="bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40 text-center">
                  Policy ✓
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-800/40 text-center space-y-1">
                <div className="text-[11px] font-mono text-slate-300">
                  Human Approval Required
                </div>
                <div className="text-sm font-bold text-white font-mono">
                  Final Amount: ₹2,947
                </div>
                <div className="pt-1">
                  <div className="w-full py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs inline-flex items-center justify-center gap-1">
                    <svg
                      className="w-3 h-3 text-blue-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Confirm &amp; Pay
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono text-center">
              Razorpay Test Mode
            </div>
          </div>

        </div>

        {/* ================================================== */}
        {/* NOVELTY SUMMARY STRIP */}
        {/* ================================================== */}
        <div className="rounded-3xl bg-[#050816]/90 border border-blue-900/40 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Why ShopPilot is Different
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Column 1 */}
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-2">
              <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                Merchant Value
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                &ldquo;AI actively improves conversion and average order value.&rdquo;
              </p>
            </div>

            {/* Column 2 */}
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Customer Protection
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                &ldquo;An independent agent prevents unsafe or unwanted commerce decisions.&rdquo;
              </p>
            </div>

            {/* Column 3 */}
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Explainable Commerce
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                &ldquo;Every accepted and rejected decision can be traced before payment.&rdquo;
              </p>
            </div>
          </div>

          {/* Highlighted Statement Banner */}
          <div className="pt-2">
            <div className="w-full p-3.5 rounded-xl bg-gradient-to-r from-blue-950/60 via-blue-900/40 to-blue-950/60 border border-cyan-500/40 text-center">
              <span className="text-sm sm:text-base font-mono font-bold text-cyan-300 tracking-wide">
                &ldquo;AI proposes. Policies validate. Humans authorize.&rdquo;
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
