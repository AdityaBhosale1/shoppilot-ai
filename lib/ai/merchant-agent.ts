import { Product } from "@/data/mock-products";
import { findRelatedProducts } from "./tools";

export interface MerchantProposal {
  primaryProducts: Product[];
  proposedUpsell: Product | null;
  proposedCrossSell: Product | null;
  proposedCartTotal: number;
  reasoningSummary: string;
}

/**
 * MERCHANT GROWTH AGENT
 * Proposes relevant complementary products to optimize discovery & AOV.
 * NOTE: The Merchant Agent only PROPOSES. It cannot approve its own proposal.
 */
export function evaluateMerchantProposal(
  primaryProducts: Product[],
  customerBudget: number | null
): MerchantProposal {
  const baseTotal = primaryProducts.reduce((sum, p) => sum + p.price, 0);

  // Search for complementary items (e.g. Mousepad, Hub, Stand)
  let proposedUpsell: Product | null = null;

  if (primaryProducts.length > 0) {
    const related = findRelatedProducts(primaryProducts[0].id);
    // Find an accessory or item that fits near the budget or boosts AOV
    const accessory = related.find((p) => p.tags.includes("RGB") || p.tags.includes("Mousepad"));
    if (accessory) {
      proposedUpsell = accessory;
    }
  }

  const proposedCartTotal = baseTotal + (proposedUpsell ? proposedUpsell.price : 0);

  const reasoningSummary = proposedUpsell
    ? `Proposed ${proposedUpsell.name} (+₹${proposedUpsell.price}) as a premium complementary accessory.`
    : `Primary items fulfill the initial query with cart total of ₹${baseTotal}.`;

  return {
    primaryProducts,
    proposedUpsell,
    proposedCrossSell: null,
    proposedCartTotal,
    reasoningSummary,
  };
}
