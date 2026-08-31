"use client";

import React from "react";

interface SessionRow {
  session: string;
  intent: string;
  cart: string;
  aovLift: string;
  policy: "Passed" | "Blocked";
  payment: "Success" | "Failed" | "Not Started";
}

const RECENT_SESSIONS: SessionRow[] = [
  {
    session: "SP-1047",
    intent: "Gaming setup under ₹3,000",
    cart: "₹2,947",
    aovLift: "+₹249",
    policy: "Passed",
    payment: "Success",
  },
  {
    session: "SP-1046",
    intent: "Wireless headphones under ₹2,000",
    cart: "₹1,999",
    aovLift: "₹0",
    policy: "Passed",
    payment: "Success",
  },
  {
    session: "SP-1045",
    intent: "Gaming accessories under ₹5,000",
    cart: "₹4,860",
    aovLift: "+₹599",
    policy: "Passed",
    payment: "Success",
  },
  {
    session: "SP-1044",
    intent: "Keyboard under ₹1,500",
    cart: "₹1,299",
    aovLift: "₹0",
    policy: "Blocked",
    payment: "Not Started",
  },
  {
    session: "SP-1043",
    intent: "Office setup under ₹2,500",
    cart: "₹2,347",
    aovLift: "+₹249",
    policy: "Passed",
    payment: "Failed",
  },
];

export function RecentSessions() {
  const getPolicyStyle = (policy: SessionRow["policy"]) => {
    return policy === "Passed"
      ? "text-emerald-300 bg-emerald-950/60 border-emerald-800/40"
      : "text-rose-300 bg-rose-950/60 border-rose-800/40";
  };

  const getPaymentStyle = (payment: SessionRow["payment"]) => {
    switch (payment) {
      case "Success":
        return "text-emerald-400 font-bold";
      case "Failed":
        return "text-rose-400 font-bold";
      default:
        return "text-amber-400 font-medium";
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-[#030612]/80 border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="text-sm font-bold text-white tracking-tight">
          Recent Agent Sessions
        </h3>
        <span className="text-[10px] font-mono text-slate-400">
          Live Session Logs
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
              <th className="pb-2 font-semibold">Session</th>
              <th className="pb-2 font-semibold">Customer Intent</th>
              <th className="pb-2 font-semibold">Final Cart</th>
              <th className="pb-2 font-semibold">AOV Lift</th>
              <th className="pb-2 font-semibold">Policy</th>
              <th className="pb-2 font-semibold text-right">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {RECENT_SESSIONS.map((row) => (
              <tr
                key={row.session}
                className="hover:bg-blue-950/20 transition-colors group cursor-pointer"
              >
                <td className="py-2.5 font-bold text-cyan-300 group-hover:underline">
                  {row.session}
                </td>
                <td className="py-2.5 text-slate-200 font-sans text-xs">
                  {row.intent}
                </td>
                <td className="py-2.5 font-bold text-white">{row.cart}</td>
                <td className="py-2.5 text-emerald-400 font-bold">
                  {row.aovLift}
                </td>
                <td className="py-2.5">
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded border ${getPolicyStyle(
                      row.policy
                    )}`}
                  >
                    {row.policy}
                  </span>
                </td>
                <td className="py-2.5 text-right">
                  <span className={getPaymentStyle(row.payment)}>
                    {row.payment}
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

export default RecentSessions;
