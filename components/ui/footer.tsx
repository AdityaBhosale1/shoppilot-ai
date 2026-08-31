"use client";

import React from "react";

export function Footer() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <footer className="w-full bg-[#02040a] border-t border-blue-900/30 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: BRAND & TAGLINE (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-blue-950/60 border border-blue-500/30">
                <svg
                  className="w-3.5 h-3.5 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                ShopPilot
                <span className="ml-1.5 inline-flex items-center px-1.5 py-0.2 text-[9px] font-semibold font-mono uppercase tracking-wider text-cyan-300 bg-blue-500/15 border border-cyan-500/30 rounded-full">
                  AI
                </span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Safe agentic commerce from customer intent to controlled checkout.
              Combining Merchant Growth and Buyer Guardian AI agents under deterministic policy rules.
            </p>
          </div>

          {/* MIDDLE COLUMN: NAVIGATION LINKS (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 font-medium text-slate-300">
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleNavClick(e, "#how-it-works")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#ai-shopping"
                  onClick={(e) => handleNavClick(e, "#ai-shopping")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  AI Shopping
                </a>
              </li>
              <li>
                <a
                  href="#merchant"
                  onClick={(e) => handleNavClick(e, "#merchant")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Merchant Intelligence
                </a>
              </li>
              <li>
                <a
                  href="#safety"
                  onClick={(e) => handleNavClick(e, "#safety")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Safety Engine
                </a>
              </li>
              <li>
                <a
                  href="#audit-trail"
                  onClick={(e) => handleNavClick(e, "#audit-trail")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Commerce Audit Trail
                </a>
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN: SUBMISSION INFO & TECH BADGES (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Razorpay AI Builder 2026</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Built as an internship submission demonstrating safe agentic commerce.
              </p>
              <div className="text-[10px] text-slate-400 space-y-0.5 font-mono pt-1 border-t border-slate-800/80">
                <div>• Payments demonstrated using Razorpay Test Mode</div>
                <div>• AI powered by Google Gemini</div>
              </div>
            </div>

            {/* TECH STACK BADGES */}
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Next.js
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Gemini AI
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                Razorpay Test Mode
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                TypeScript
              </span>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL NOTICE STRIP */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            &copy; 2026 ShopPilot AI. All rights reserved. Demonstrative submission for Razorpay AI Builder 2026.
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span>Deterministic Policy Enabled</span>
            <span>•</span>
            <span>Zero Unbounded Spending</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
