"use client";

import React from "react";
import { motion } from "framer-motion";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full pt-20 sm:pt-24 lg:pt-28 pb-16 lg:pb-24 overflow-hidden scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================== */}
        {/* SECTION HEADER */}
        {/* ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-14 sm:mb-16"
        >
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
        </motion.div>

        {/* ================================================== */}
        {/* MAIN 5-STEP WORKFLOW WITH STAGGERED SCROLL REVEAL */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16 relative">
          
          {/* STEP 1 — CUSTOMER INTENT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative rounded-2xl bg-[#050816]/80 border border-blue-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-blue-700/50 transition-all"
          >
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
          </motion.div>

          {/* STEP 2 — MERCHANT GROWTH AGENT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative rounded-2xl bg-[#050816]/80 border border-indigo-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-indigo-700/50 transition-all"
          >
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
          </motion.div>

          {/* STEP 3 — BUYER GUARDIAN AGENT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative rounded-2xl bg-[#050816]/80 border border-rose-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-rose-700/50 transition-all"
          >
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
                Acts as customer advocate, strictly enforcing budget limits, explicit exclusions, and item requirements.
              </p>

              <div className="space-y-1 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-1.5 text-rose-200">
                  <span className="text-rose-400">✓</span> Hard budget enforcement
                </div>
                <div className="flex items-center gap-1.5 text-rose-200">
                  <span className="text-rose-400">✓</span> Preference checking
                </div>
                <div className="flex items-center gap-1.5 text-rose-200">
                  <span className="text-rose-400">✓</span> Exclusion enforcement
                </div>
                <div className="flex items-center gap-1.5 text-rose-200">
                  <span className="text-rose-400">✓</span> Over-spending blocker
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">User Goal</span>
              <span className="text-rose-300 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-700/40">
                Protect Budget
              </span>
            </div>
          </motion.div>

          {/* STEP 4 — CONSTRAINT NEGOTIATION */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative rounded-2xl bg-[#050816]/80 border border-amber-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-amber-600/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-center">
                  4
                </span>
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider">
                  Resolution Loop
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                Constraint Negotiation
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                When merchant suggestions exceed constraints, negotiators find compliant alternatives instead of failing.
              </p>

              <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/30 space-y-1 text-xs font-mono">
                <div className="text-[10px] text-amber-300 font-semibold uppercase">
                  Automatic Resolution
                </div>
                <div className="text-[11px] text-slate-300">
                  RGB Mousepad (₹599) → Standard Mousepad (₹249)
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Outcome</span>
              <span className="text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-700/40">
                Optimal Cart
              </span>
            </div>
          </motion.div>

          {/* STEP 5 — APPROVAL & PAYMENT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="relative rounded-2xl bg-[#050816]/80 border border-emerald-900/40 backdrop-blur-xl p-5 flex flex-col justify-between hover:border-emerald-700/50 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center">
                  5
                </span>
                <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider">
                  Checkout Gate
                </span>
              </div>

              <h3 className="text-base font-bold text-white">
                Approval & Payment
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Passed carts generate a Decision Receipt. The customer authorizes, and Razorpay executes Test payment.
              </p>

              <div className="space-y-1 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-1.5 text-emerald-200">
                  <span className="text-emerald-400">✓</span> Explicit human consent
                </div>
                <div className="flex items-center gap-1.5 text-emerald-200">
                  <span className="text-emerald-400">✓</span> Server price verification
                </div>
                <div className="flex items-center gap-1.5 text-emerald-200">
                  <span className="text-emerald-400">✓</span> Razorpay Test Checkout
                </div>
                <div className="flex items-center gap-1.5 text-emerald-200">
                  <span className="text-emerald-400">✓</span> HMAC SHA-256 verify
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Payment Engine</span>
              <span className="text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/40">
                Razorpay Test Mode
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
