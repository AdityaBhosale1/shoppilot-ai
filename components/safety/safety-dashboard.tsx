"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArchitectureFlow } from "./architecture-flow";
import { ExplainableCard } from "./explainable-card";
import { BoundedLimitsCard } from "./bounded-limits-card";
import { GatedApprovalCard } from "./gated-approval-card";
import { FailureEngineDemo } from "./failure-engine-demo";
import { PolicyEngineConsole } from "./policy-engine-console";
import { SafetyGuaranteeStrip } from "./safety-guarantee-strip";
import { SafetyMetricsStrip } from "./safety-metrics-strip";

export function SafetyDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-8"
    >
      {/* 1. MAIN ARCHITECTURE PIPELINE FLOW */}
      <ArchitectureFlow />

      {/* 2. THREE CORE SAFETY PILLARS (EXPLAINABLE, BOUNDED, GATED) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ExplainableCard />
        <BoundedLimitsCard />
        <GatedApprovalCard />
      </div>

      {/* 3. FAILURE HANDLING DEMO & POLICY ENGINE CONSOLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <FailureEngineDemo />
        </div>
        <div className="lg:col-span-5">
          <PolicyEngineConsole />
        </div>
      </div>

      {/* 4. SAFETY GUARANTEE STRIP & MEMORABLE STATEMENT */}
      <SafetyGuaranteeStrip />

      {/* 5. COMPACT SAFETY METRICS STRIP */}
      <SafetyMetricsStrip />
    </motion.div>
  );
}

export default SafetyDashboard;
