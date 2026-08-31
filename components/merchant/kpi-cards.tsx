"use client";

import React from "react";

interface KpiCardData {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  context: string;
}

const KPI_DATA: KpiCardData[] = [
  {
    title: "AI Shopping Sessions",
    value: "1,284",
    change: "+18.4%",
    isPositive: true,
    context: "vs previous 30 days",
  },
  {
    title: "Conversion Rate",
    value: "24.6%",
    change: "+5.8%",
    isPositive: true,
    context: "industry avg: 14.2%",
  },
  {
    title: "Revenue Generated",
    value: "₹3,84,720",
    change: "+21.2%",
    isPositive: true,
    context: "via agentic checkout",
  },
  {
    title: "Average Order Value",
    value: "₹2,418",
    change: "+₹286",
    isPositive: true,
    context: "upsell & cross-sell lift",
  },
  {
    title: "Upsell Revenue",
    value: "₹48,940",
    change: "+14.7%",
    isPositive: true,
    context: "Growth Agent proposals",
  },
  {
    title: "Unsafe Actions Blocked",
    value: "37",
    change: "Protected",
    isPositive: true,
    context: "by Buyer Guardian",
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {KPI_DATA.map((kpi) => (
        <div
          key={kpi.title}
          className="p-3.5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 hover:border-blue-800/50 transition-all flex flex-col justify-between"
        >
          <span className="text-[11px] font-mono text-slate-400 font-medium">
            {kpi.title}
          </span>

          <div className="my-2">
            <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-mono">
              {kpi.value}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                {kpi.change}
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                {kpi.context}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KpiCards;
