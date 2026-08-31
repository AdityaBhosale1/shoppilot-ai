"use client";

import React from "react";

interface ShopPilotBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function ShopPilotBackground({
  children,
  className = "",
}: ShopPilotBackgroundProps) {
  return (
    <div
      className={`relative min-h-screen w-full bg-[#030612] text-slate-100 overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-200 ${className}`}
    >
      {/* FIXED DECORATIVE BACKGROUND WRAPPER (Never controls page height or traps scrolling) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* BASE DARK NAVY / BLUE-BLACK GRADIENT */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #030612 0%, #050818 40%, #06091e 70%, #02040a 100%)",
          }}
        />

        {/* CENTER-UPPER HERO BACKSTAGE SOFT BLUE AMBIENT GLOW */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 28%, rgba(37, 99, 235, 0.10) 0%, rgba(30, 58, 138, 0.03) 60%, transparent 100%)",
          }}
        />

        {/* REFINED DIAGONAL PERSPECTIVE GRID */}
        <div
          className="absolute inset-0"
          style={{
            perspective: "1200px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.25) 55%, rgba(0, 0, 0, 0) 82%), linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 18%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0.2) 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.25) 55%, rgba(0, 0, 0, 0) 82%), linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 18%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0.2) 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <div
            className="animate-grid-drift absolute -top-[35%] -left-[35%] h-[170%] w-[170%]"
            style={{
              transform: "rotateX(55deg) rotateZ(-12deg) scale(1.25)",
              transformOrigin: "50% 40%",
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.078) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.078) 1px, transparent 1px)
              `,
              backgroundSize: "55px 55px",
            }}
          />
        </div>

        {/* SOFT VIGNETTE CORNER SHADING */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(2, 4, 10, 0.75) 70%, rgba(2, 4, 10, 0.98) 100%)",
          }}
        />
      </div>

      {/* FOREGROUND CONTENT WRAPPER */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export default ShopPilotBackground;
