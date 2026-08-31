"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { KpiCards } from "./kpi-cards";
import { RevenueChart } from "./revenue-chart";
import { ConversionFunnel } from "./conversion-funnel";
import { AgentContribution } from "./agent-contribution";
import { ConversionOpportunities } from "./conversion-opportunities";
import { SafeCommerceControls } from "./safe-commerce-controls";
import { RecentSessions } from "./recent-sessions";
import { AiInsightCard } from "./ai-insight-card";

export function MerchantDashboard() {
  const [activeFilter, setActiveFilter] = useState<string>("Last 30 Days");

  const filterOptions = ["Last 7 Days", "Last 30 Days", "This Month"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-3xl bg-[#050816]/90 border border-blue-900/40 backdrop-blur-xl p-5 sm:p-7 space-y-6 shadow-2xl"
    >
      
      {/* DASHBOARD CONSOLE TOP HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              ShopPilot Merchant Console
              <span className="text-[10px] font-mono font-medium text-slate-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                Live Demo Data
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Agentic commerce conversion &amp; revenue analytics
            </p>
          </div>
        </div>

        {/* DATE FILTER BUTTONS */}
        <div className="flex items-center gap-1.5 bg-[#030612]/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setActiveFilter(opt)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === opt
                  ? "bg-blue-600 text-white font-bold shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 1. TOP 6 KPI CARDS */}
      <KpiCards />

      {/* 2. REVENUE CHART & CONVERSION FUNNEL (2-COL GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RevenueChart />
        </div>
        <div className="lg:col-span-5">
          <ConversionFunnel />
        </div>
      </div>

      {/* 3. AGENT CONTRIBUTION & SAFE COMMERCE CONTROLS (2-COL GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <AgentContribution />
        </div>
        <div className="lg:col-span-5">
          <SafeCommerceControls />
        </div>
      </div>

      {/* 4. CONVERSION OPPORTUNITIES & RECENT SESSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ConversionOpportunities />
        </div>
        <div className="lg:col-span-5">
          <RecentSessions />
        </div>
      </div>

      {/* 5. AI INSIGHT CARD */}
      <AiInsightCard />

    </motion.div>
  );
}

export default MerchantDashboard;
