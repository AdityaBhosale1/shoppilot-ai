"use client";

import React from "react";
import Image from "next/image";

interface OpportunityRow {
  product: string;
  image: string;
  recommendations: number;
  conversion: string;
  upsellRevenue: string;
  status: string;
  statusColor: "indigo" | "blue" | "emerald";
}

const OPPORTUNITIES_DATA: OpportunityRow[] = [
  {
    product: "Gaming Keyboard Pro",
    image: "/products/gaming-keyboard-pro.svg",
    recommendations: 214,
    conversion: "31.8%",
    upsellRevenue: "₹12,840",
    status: "High Opportunity",
    statusColor: "indigo",
  },
  {
    product: "Gaming Mouse X",
    image: "/products/gaming-mouse-x.svg",
    recommendations: 198,
    conversion: "29.4%",
    upsellRevenue: "₹9,420",
    status: "Growing",
    statusColor: "blue",
  },
  {
    product: "Wireless Headphones Pro",
    image: "/products/wireless-headphones-pro.svg",
    recommendations: 176,
    conversion: "27.9%",
    upsellRevenue: "₹8,760",
    status: "High Opportunity",
    statusColor: "indigo",
  },
  {
    product: "Essential Mousepad",
    image: "/products/essential-mousepad.svg",
    recommendations: 143,
    conversion: "38.2%",
    upsellRevenue: "₹6,490",
    status: "Best Cross-sell",
    statusColor: "emerald",
  },
  {
    product: "Office Keyboard",
    image: "/products/office-keyboard.svg",
    recommendations: 126,
    conversion: "22.7%",
    upsellRevenue: "₹4,380",
    status: "Stable",
    statusColor: "blue",
  },
];

export function ConversionOpportunities() {
  const getBadgeStyle = (color: OpportunityRow["statusColor"]) => {
    switch (color) {
      case "emerald":
        return "bg-emerald-950/60 border-emerald-700/40 text-emerald-300";
      case "indigo":
        return "bg-indigo-950/60 border-indigo-700/40 text-indigo-300";
      default:
        return "bg-blue-950/60 border-blue-700/40 text-cyan-300";
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="text-sm font-bold text-white tracking-tight">
          Top AI Conversion Opportunities
        </h3>
        <span className="text-[10px] font-mono text-slate-400">
          5 Top Performing SKUs
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
              <th className="pb-2 font-semibold">Product</th>
              <th className="pb-2 font-semibold">AI Recommendations</th>
              <th className="pb-2 font-semibold">Conversion</th>
              <th className="pb-2 font-semibold">Upsell Revenue</th>
              <th className="pb-2 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {OPPORTUNITIES_DATA.map((row) => (
              <tr key={row.product} className="hover:bg-blue-950/20 transition-colors">
                <td className="py-2 font-bold text-white flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded bg-[#06091e] border border-slate-800 shrink-0 overflow-hidden">
                    <Image
                      src={row.image}
                      alt={`${row.product} product thumbnail`}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <span className="truncate max-w-[160px] sm:max-w-[200px]">{row.product}</span>
                </td>
                <td className="py-2.5">{row.recommendations}</td>
                <td className="py-2.5 text-emerald-400 font-bold">{row.conversion}</td>
                <td className="py-2.5 text-cyan-300 font-bold">{row.upsellRevenue}</td>
                <td className="py-2.5 text-right">
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded border ${getBadgeStyle(
                      row.statusColor
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConversionOpportunities;
