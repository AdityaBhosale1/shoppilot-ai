"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  const [imgError, setImgError] = useState(false);

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <motion.div
      whileHover={{ y: isRejected ? 0 : -2 }}
      transition={{ duration: 0.2 }}
      className={`p-3 sm:p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between ${
        isRejected
          ? "bg-rose-950/20 border-rose-800/40 opacity-75"
          : "bg-[#030612]/90 border-slate-800/80 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/20"
      }`}
    >
      <div>
        {/* PRODUCT IMAGE CONTAINER */}
        <div className="relative w-full aspect-[4/3] rounded-lg bg-[#06091e] border border-slate-800/80 mb-2.5 overflow-hidden flex items-center justify-center p-2 group">
          {product.image && !imgError ? (
            <Image
              src={product.image}
              alt={`${product.name} product image`}
              width={240}
              height={180}
              loading="lazy"
              onError={() => setImgError(true)}
              className={`w-full h-full object-contain transition-transform duration-300 ${
                isRejected ? "grayscale opacity-50" : "group-hover:scale-[1.03]"
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/80 text-slate-400 font-mono text-center p-2">
              <span className="text-sm font-bold text-cyan-400">
                {getInitials(product.name)}
              </span>
              <span className="text-[9px] text-slate-500 mt-1">{product.category}</span>
            </div>
          )}

          {isRejected && (
            <div className="absolute inset-0 bg-rose-950/50 backdrop-blur-[1px] flex items-center justify-center">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-rose-200 bg-rose-900/90 border border-rose-500/50 rounded-md shadow-md">
                Rejected
              </span>
            </div>
          )}
        </div>

        {/* HEADER & PRICE */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4
              className={`font-bold text-xs sm:text-sm ${
                isRejected ? "text-slate-400 line-through" : "text-white"
              }`}
            >
              {product.name}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
              {product.description}
            </p>
          </div>
          <div className="text-right shrink-0 font-mono">
            <div className="font-bold text-white text-sm">
              ₹{product.price.toLocaleString("en-IN")}
            </div>
            <div className="text-[10px] text-emerald-400">★ {product.rating}</div>
          </div>
        </div>
      </div>

      {/* FOOTER TAGS & BADGE */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-slate-800/60">
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag) => (
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
    </motion.div>
  );
}

export default ProductCard;
