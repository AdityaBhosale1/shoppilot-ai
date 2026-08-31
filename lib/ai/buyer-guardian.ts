import { MerchantProposal } from "./merchant-agent";

export interface BuyerGuardianEvaluation {
  decision: "ACCEPT" | "REJECT" | "REQUEST_ALTERNATIVE";
  violations: string[];
  reason: string;
  exceededAmount?: number;
}

/**
 * BUYER GUARDIAN AGENT
 * Protects customer's declared budget, preferences, and transaction constraints.
 */
export function evaluateBuyerGuardian(
  proposal: MerchantProposal,
  customerBudget: number | null,
  exclusions: string[] = []
): BuyerGuardianEvaluation {
  const violations: string[] = [];

  // 1. BUDGET CONSTRAINT EVALUATION
  if (customerBudget !== null && customerBudget > 0) {
    if (proposal.proposedCartTotal > customerBudget) {
      const diff = proposal.proposedCartTotal - customerBudget;
      violations.push("BUDGET_EXCEEDED");
      return {
        decision: "REJECT",
        violations,
        reason: `The proposed cart total of ₹${proposal.proposedCartTotal.toLocaleString("en-IN")} exceeds the declared budget limit of ₹${customerBudget.toLocaleString("en-IN")} by ₹${diff.toLocaleString("en-IN")}.`,
        exceededAmount: diff,
      };
    }
  }

  // 2. EXCLUSIONS EVALUATION (e.g., "no RGB")
  if (exclusions.length > 0) {
    const allProposedProducts = [
      ...proposal.primaryProducts,
      ...(proposal.proposedUpsell ? [proposal.proposedUpsell] : []),
    ];

    for (const prod of allProposedProducts) {
      for (const exc of exclusions) {
        if (
          prod.tags.some((t) => t.toLowerCase() === exc.toLowerCase()) ||
          prod.name.toLowerCase().includes(exc.toLowerCase())
        ) {
          violations.push(`EXCLUDED_TAG_${exc.toUpperCase()}`);
          return {
            decision: "REJECT",
            violations,
            reason: `Proposed item "${prod.name}" contains explicitly excluded tag/feature: "${exc}".`,
          };
        }
      }
    }
  }

  return {
    decision: "ACCEPT",
    violations: [],
    reason: `Proposed cart total of ₹${proposal.proposedCartTotal.toLocaleString("en-IN")} complies with all customer constraints and budget limits.`,
  };
}
