"use client";

import React, { useState } from "react";
import { MOCK_AUDIT_SESSIONS, AuditEvent } from "@/data/mock-audit-sessions";
import { SessionExplorer } from "./session-explorer";
import { SessionHeader } from "./session-header";
import { TimelineView } from "./timeline-view";
import { EventDetailDrawer } from "./event-detail-drawer";
import { ReceiptModal } from "./receipt-modal";
import { AuditSummaryBar } from "./audit-summary-bar";

export function AuditTrailDashboard() {
  const [selectedSessionId, setSelectedSessionId] = useState<string>("SP-1047");
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState<boolean>(false);

  const selectedSession =
    MOCK_AUDIT_SESSIONS.find((s) => s.id === selectedSessionId) ||
    MOCK_AUDIT_SESSIONS[0];

  return (
    <div className="w-full space-y-6">
      {/* 2-COLUMN LAYOUT (DESKTOP: 30% LEFT / 70% RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: SESSION EXPLORER (4 cols on lg) */}
        <div className="lg:col-span-4 h-[640px]">
          <SessionExplorer
            sessions={MOCK_AUDIT_SESSIONS}
            selectedSessionId={selectedSessionId}
            onSelectSession={(id) => setSelectedSessionId(id)}
          />
        </div>

        {/* RIGHT PANEL: SESSION HEADER + TIMELINE (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-5">
          <SessionHeader
            session={selectedSession}
            onOpenReceipt={() => setReceiptModalOpen(true)}
          />

          <TimelineView
            events={selectedSession.events}
            onSelectEvent={(evt) => setSelectedEvent(evt)}
          />
        </div>

      </div>

      {/* AUDIT SUMMARY BAR */}
      <AuditSummaryBar totalEvents={selectedSession.events.length} />

      {/* EVENT DETAIL DRAWER / MODAL */}
      <EventDetailDrawer
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* DECISION RECEIPT MODAL */}
      {receiptModalOpen && (
        <ReceiptModal
          session={selectedSession}
          onClose={() => setReceiptModalOpen(false)}
        />
      )}
    </div>
  );
}

export default AuditTrailDashboard;
