"use client";

import React, { useState, useEffect } from "react";
import { lockBodyScroll, unlockBodyScroll, forceResetBodyScroll } from "@/lib/scroll-lock";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI Shopping", href: "#ai-shopping" },
  { label: "Merchant", href: "#merchant" },
  { label: "Safety", href: "#safety" },
  { label: "Audit Trail", href: "#audit-trail" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync mobile menu scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    return () => {
      if (mobileMenuOpen) {
        unlockBodyScroll();
      }
    };
  }, [mobileMenuOpen]);

  // IntersectionObserver to accurately track which section is currently visible in viewport
  useEffect(() => {
    const sectionIds = [
      "how-it-works",
      "ai-shopping",
      "merchant",
      "safety",
      "audit-trail",
    ];

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    forceResetBodyScroll();

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header className="fixed top-4 sm:top-5 inset-x-0 z-50 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`relative rounded-full border px-4 sm:px-6 h-16 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "bg-[#030612]/90 border-blue-900/40 shadow-xl shadow-black/50 backdrop-blur-xl"
            : "bg-[#050816]/75 border-slate-800/60 shadow-lg shadow-black/20 backdrop-blur-md"
        }`}
      >
        {/* BRAND LOGO & MARK WITH ORIGINKIT-INSPIRED NEON BORDER */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            forceResetBodyScroll();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", "#");
          }}
          className="relative group p-[1.5px] rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-transform active:scale-95"
        >
          {/* ANIMATED CONIC NEON TRACE SEGMENT */}
          <div
            className="absolute inset-[-150%] animate-neon-spin pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, #2563eb 310deg, #22d3ee 340deg, transparent 360deg)",
            }}
          />

          {/* SUBTLE AMBIENT NEON GLOW SEGMENT */}
          <div
            className="absolute inset-[-100%] animate-neon-spin pointer-events-none opacity-30 blur-[6px]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 280deg, #2563eb 310deg, #22d3ee 340deg, transparent 360deg)",
            }}
          />

          {/* INNER BRAND CONTAINER */}
          <div className="relative z-10 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#030612]/90 border border-blue-900/40 backdrop-blur-md">
            {/* Abstract Minimal ShopPilot Mark SVG */}
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-blue-950/70 border border-blue-500/30 group-hover:border-cyan-400/60 transition-colors">
              <svg
                className="w-3.5 h-3.5 text-cyan-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            {/* Brand Typography */}
            <span className="text-white font-bold text-sm sm:text-base tracking-tight flex items-center">
              ShopPilot
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.2 text-[9px] font-semibold font-mono uppercase tracking-wider text-cyan-300 bg-blue-500/15 border border-cyan-500/30 rounded-full">
                AI
              </span>
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive
                    ? "text-white bg-blue-600/20 border border-blue-500/40 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22D3EE]" />
                )}
              </a>
            );
          })}
        </div>

        {/* RIGHT SIDE CTA BUTTON & MOBILE HAMBURGER TOGGLE */}
        <div className="flex items-center gap-3">
          {/* "Try ShopPilot" CTA Button */}
          <a
            href="#ai-shopping"
            onClick={(e) => handleNavClick(e, "#ai-shopping")}
            className="group inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-full transition-all duration-200 shadow-sm shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Try ShopPilot</span>
            <svg
              className="w-3.5 h-3.5 text-blue-100 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            className="md:hidden flex items-center justify-center p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN PANEL */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden mt-3 p-4 rounded-2xl bg-[#050816]/95 border border-blue-900/40 backdrop-blur-xl shadow-2xl space-y-1.5 transition-all animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? "text-white bg-blue-600/20 border border-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default Navbar;
