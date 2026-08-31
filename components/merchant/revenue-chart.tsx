"use client";

import React from "react";

interface RevenueDataPoint {
  day: string;
  base: number;
  shopPilot: number;
}

const REVENUE_DATA: RevenueDataPoint[] = [
  { day: "Day 1", base: 38, shopPilot: 45 },
  { day: "Day 2", base: 41, shopPilot: 49 },
  { day: "Day 3", base: 36, shopPilot: 44 },
  { day: "Day 4", base: 46, shopPilot: 57 },
  { day: "Day 5", base: 44, shopPilot: 55 },
  { day: "Day 6", base: 51, shopPilot: 63 },
  { day: "Day 7", base: 48, shopPilot: 61 },
];

export function RevenueChart() {
  const maxVal = 70; // Chart scaling max

  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            AI-Assisted Revenue Impact
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Comparing standard checkout revenue vs ShopPilot AI agentic workflow
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-600" />
            <span className="text-slate-400">Base Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
            <span className="text-cyan-300 font-bold">ShopPilot AI</span>
          </div>
          <span className="ml-2 px-2 py-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 rounded-full">
            +18.9% Revenue Lift
          </span>
        </div>
      </div>

      {/* REVENUE BARS GRAPH */}
      <div className="pt-2 pb-1 space-y-3">
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-800/80 pb-2">
          {REVENUE_DATA.map((item) => {
            const basePct = (item.base / maxVal) * 100;
            const shopPilotPct = (item.shopPilot / maxVal) * 100;

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
              >
                {/* Bar Stack Container */}
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  {/* Base Revenue Bar */}
                  <div
                    className="w-1/2 max-w-[18px] bg-slate-700 hover:bg-slate-600 rounded-t transition-all relative group/bar"
                    style={{ height: `${basePct}%` }}
                  >
                    <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-[9px] font-mono text-slate-200 px-1 py-0.5 rounded whitespace-nowrap z-10">
                      ₹{item.base}k
                    </span>
                  </div>

                  {/* ShopPilot AI Revenue Bar */}
                  <div
                    className="w-1/2 max-w-[18px] bg-gradient-to-t from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 rounded-t transition-all relative group/bar"
                    style={{ height: `${shopPilotPct}%` }}
                  >
                    <span className="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-950 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 px-1 py-0.5 rounded whitespace-nowrap z-10">
                      ₹{item.shopPilot}k
                    </span>
                  </div>
                </div>

                {/* Day Label */}
                <span className="text-[10px] font-mono text-slate-400">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RevenueChart;
