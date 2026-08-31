export interface ServerOrderRecord {
  sessionId: string;
  razorpayOrderId: string;
  amountInr: number;
  amountPaise: number;
  currency: string;
  cart: Array<{ productId: string; quantity: number; price: number }>;
  approvalStatus: "CONFIRMED" | "PENDING";
  policyStatus: "PASSED" | "FAILED";
  paymentId?: string;
  paymentStatus: "CREATED" | "AUTHORIZED" | "COMPLETED" | "FAILED" | "SECURITY_HOLD";
  verificationStatus: "PENDING" | "PASSED" | "FAILED";
  createdAt: string;
  updatedAt: string;
}

// In-memory development store for session & order state
const ordersStore: Map<string, ServerOrderRecord> = new Map();

export const ServerStore = {
  getOrderBySessionId(sessionId: string): ServerOrderRecord | undefined {
    return ordersStore.get(sessionId);
  },

  getOrderByRazorpayOrderId(razorpayOrderId: string): ServerOrderRecord | undefined {
    for (const record of ordersStore.values()) {
      if (record.razorpayOrderId === razorpayOrderId) {
        return record;
      }
    }
    return undefined;
  },

  saveOrder(record: ServerOrderRecord): void {
    ordersStore.set(record.sessionId, record);
  },

  updateOrder(sessionId: string, updates: Partial<ServerOrderRecord>): ServerOrderRecord | undefined {
    const existing = ordersStore.get(sessionId);
    if (!existing) return undefined;
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    ordersStore.set(sessionId, updated);
    return updated;
  },

  clearOrder(sessionId: string): void {
    ordersStore.delete(sessionId);
  },
};
