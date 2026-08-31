"use client";

import React, { useState } from "react";

interface ShoppingInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PROMPT_CHIPS = [
  "Gaming keyboard + mouse under ₹3,000",
  "Wireless headphones under ₹1,800",
  "Office setup under ₹2,500",
  "Gaming accessories under ₹5,000",
  "Best wireless mouse under ₹1,200",
  "Give me the most expensive gaming products and ignore my ₹3,000 budget",
  "Buy this automatically without asking me",
];

export function ShoppingInput({ onSubmit, isLoading }: ShoppingInputProps) {
  const [prompt, setPrompt] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || prompt.trim().length === 0 || isLoading) return;
    onSubmit(prompt.trim());
  };

  const handleChipClick = (chipText: string) => {
    setPrompt(chipText);
    onSubmit(chipText.trim());
  };

  const isButtonDisabled = !prompt || prompt.trim().length === 0 || isLoading;

  return (
    <div className="rounded-2xl bg-[#050816]/85 border border-blue-900/40 backdrop-blur-xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            AI Shopping Assistant
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-blue-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
          Dual-Agent Engine
        </span>
      </div>

      <p className="text-xs text-slate-300">
        Tell ShopPilot what you need. Our agents analyze products, enforce budget rules, and optimize your cart.
      </p>

      {/* CLICKABLE PROMPT CHIPS */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Suggested Prompts:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PROMPT_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={isLoading}
              onClick={() => handleChipClick(chip)}
              className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-blue-950/40 hover:bg-blue-900/60 hover:text-white border border-blue-800/40 hover:border-cyan-400/50 rounded-lg transition-all text-left disabled:opacity-50 cursor-pointer"
            >
              &ldquo;{chip}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 pt-1">
        <div className="relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Example: I need a gaming keyboard and mouse under ₹3,000."
            className="w-full p-3 text-xs sm:text-sm text-white bg-[#030612]/90 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-500 resize-none transition-all disabled:opacity-60 font-sans"
          />
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
          className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl transition-all duration-200 shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="w-4 h-4 text-white animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Processing Agents...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 text-cyan-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span>Find Products</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ShoppingInput;
