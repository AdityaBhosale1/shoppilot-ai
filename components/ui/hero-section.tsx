"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isApproved, setIsApproved] = useState(false);

  return (
    <section className="relative w-full pt-28 sm:pt-32 lg:pt-36 pb-12 lg:pb-20 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP ALIGNMENT: items-start aligns the top of badge with top of right card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ================================================== */}
          {/* LEFT COLUMN — MESSAGING & CTAs (7 cols on lg) */}
          {/* ================================================== */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            
            {/* 1. TOP BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 backdrop-blur-md text-xs sm:text-sm font-medium text-slate-300 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span>Agentic Commerce • Safe by Design</span>
            </motion.div>

            {/* 2. MAIN HEADING (2 STAGE REVEAL) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.12]">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="block"
              >
                Turn Shopping Intent
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="inline-block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent"
              >
                Into Safe Commerce.
              </motion.span>
            </h1>

            {/* 3. DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal"
            >
              ShopPilot AI combines a Merchant Growth Agent and Buyer Guardian
              Agent to discover products, optimize carts, protect customer
              constraints, and safely move every purchase from conversation to
              checkout.
            </motion.p>

            {/* 4. CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-1"
            >
              {/* Primary CTA */}
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#ai-shopping"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-full transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Start AI Shopping</span>
                <svg
                  className="w-4 h-4 text-blue-100 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>

              {/* Secondary CTA */}
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] hover:border-slate-600 active:bg-white/10 border border-slate-700/60 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>See How It Works</span>
              </a>
            </motion.div>

            {/* 5. TRUST / SAFETY ROW */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="pt-3 border-t border-slate-800/80 w-full max-w-xl"
            >
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-400 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-cyan-400 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Human approval before payment
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-cyan-400 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Budget-aware
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-cyan-400 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Full audit trail
                </span>
              </div>
            </motion.div>

          </div>

          {/* ================================================== */}
          {/* RIGHT COLUMN — AGENTIC COMMERCE VISUAL (5 cols on lg) */}
          {/* ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 w-full"
          >
            {/* MAIN GLASSMORPHISM CARD */}
            <div className="relative rounded-3xl bg-[#050816]/85 border border-blue-900/40 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/80 space-y-4">
              
              {/* HEADER */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                    ShopPilot Session
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-slate-400">
                    Live Agent Workflow
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                </div>
              </div>

              {/* WORKFLOW CONTAINER WITH VERTICAL CONNECTING ACCENT */}
              <div className="relative space-y-3.5 pl-3 border-l-2 border-dashed border-blue-900/50">
                
                {/* 1. INTENT CARD */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-800/30 relative"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      Customer Intent
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono bg-blue-900/40 px-2 py-0.5 rounded-full border border-blue-700/30">
                      Input
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-100">
                    &ldquo;Gaming keyboard + mouse under ₹3,000&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span>Budget: <strong className="text-slate-200">₹3,000</strong></span>
                    <span>•</span>
                    <span>Category: <strong className="text-slate-200">Gaming</strong></span>
                  </div>
                </motion.div>

                {/* FLOW ARROW 1 */}
                <div className="flex justify-center -my-1">
                  <span className="text-blue-500/60 text-xs font-mono">↓</span>
                </div>

                {/* 2. MERCHANT AGENT BLOCK */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.58 }}
                  className="p-3.5 rounded-2xl bg-indigo-950/25 border border-indigo-800/30"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 font-semibold">
                      Merchant Growth Agent
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      +AOV Opportunity
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    Found a higher-value setup with an RGB mousepad.
                  </p>
                  
                  {/* Cart Breakdown */}
                  <div className="bg-[#030612]/70 rounded-xl p-2.5 space-y-1 text-xs font-mono border border-slate-800/80">
                    <div className="flex justify-between text-slate-300">
                      <span>Keyboard</span>
                      <span>₹1,799</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Mouse</span>
                      <span>₹899</span>
                    </div>
                    <div className="flex justify-between text-indigo-300">
                      <span>RGB Mousepad</span>
                      <span>₹599</span>
                    </div>
                    <div className="pt-1.5 border-t border-slate-800 flex justify-between font-bold text-white">
                      <span>Total</span>
                      <span>₹3,297</span>
                    </div>
                  </div>
                </motion.div>

                {/* FLOW ARROW 2 */}
                <div className="flex justify-center -my-1">
                  <span className="text-blue-500/60 text-xs font-mono">↓</span>
                </div>

                {/* 3. BUYER GUARDIAN BLOCK */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.71 }}
                  className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/30"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300 font-semibold">
                      Buyer Guardian Agent
                    </span>
                    <span className="text-[10px] font-bold font-mono text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-full">
                      REJECTED
                    </span>
                  </div>
                  <p className="text-xs text-rose-200/90 font-medium">
                    Cart exceeds customer budget by ₹297.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 italic">
                    Searching for a safer alternative...
                  </p>
                </motion.div>

                {/* FLOW ARROW 3 */}
                <div className="flex justify-center -my-1">
                  <span className="text-blue-500/60 text-xs font-mono">↓</span>
                </div>

                {/* 4. NEGOTIATED RESULT */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.84 }}
                  className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-800/30"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      Negotiated Optimal Cart
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      +₹249 AOV
                    </span>
                  </div>
                  
                  <div className="text-xs text-slate-300 space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Swapped Mousepad:</span>
                      <span className="text-emerald-300">Standard Mousepad (₹249)</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-emerald-900/40 font-bold text-white text-sm">
                      <span>Final Total:</span>
                      <span className="text-cyan-300">₹2,947 / ₹3,000</span>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-300">
                      Budget ✓
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-300">
                      Preference ✓
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-300">
                      Stock ✓
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-700/40 text-emerald-300">
                      Price ✓
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* 5. PAYMENT GATE & APPROVAL */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.95 }}
                className="pt-3 border-t border-slate-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-cyan-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Payment requires customer approval
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Razorpay Test Mode
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsApproved(!isApproved)}
                  className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isApproved
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                      : "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40"
                  }`}
                >
                  {isApproved ? (
                    <>
                      <svg
                        className="w-4 h-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Approved ₹2,947 (Simulated)</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 text-blue-100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Confirm ₹2,947</span>
                    </>
                  )}
                </button>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
