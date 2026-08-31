"use client";

import React from "react";
import { Product } from "@/data/mock-products";

interface ProductCardProps {
  product: Product;
  badge?: string;
  badgeColor?: "indigo" | "rose" | "emerald" | "blue";
  isRejected?: boolean;
}

export function ProductCard({
  product,
  badge,
  badgeColor = "blue",
  isRejected = false,
}: ProductCardProps) {
  const getBadgeStyle = () => {
    switch (badgeColor) {
      case "rose":
        return "bg-rose-500/15 border-rose-500/30 text-rose-300";
      case "emerald":
        return "bg-emerald-500/15 border-emerald-500/30 text-emerald-300";
      case "indigo":
        return "bg-indigo-500/15 border-indigo-500/30 text-indigo-300";
      default:
        return "bg-blue-500/15 border-blue-500/30 text-cyan-300";
    }
  };

  return (
    <div
      className={`p-3.5 rounded-xl border transition-all text-xs ${
        isRejected
          ? "bg-rose-950/20 border-rose-800/40 line-through opacity-70"
          : "bg-[#030612]/80 border-slate-800/80 hover:border-blue-700/50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-bold text-white text-xs sm:text-sm">
            {product.name}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
            {product.description}
          </p>
        </div>
        <div className="text-right shrink-0 font-mono">
          <div className="font-bold text-white text-sm">₹{product.price.toLocaleString("en-IN")}</div>
          <div className="text-[10px] text-emerald-400">★ {product.rating}</div>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-slate-800/60">
        <div className="flex flex-wrap gap-1">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-900/80 border border-slate-800 text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {badge && (
          <span
            className={`px-2 py-0.5 text-[10px] font-mono rounded-full border ${getBadgeStyle()}`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
