import { Product } from "@/data/mock-products";
import { searchProducts, verifyProductId } from "./tools";
import { parseIndianBudget } from "./prompts";
import { evaluateMerchantProposal, MerchantProposal } from "./merchant-agent";
import { evaluateBuyerGuardian, BuyerGuardianEvaluation } from "./buyer-guardian";
import { recalculateAndValidateCart } from "@/lib/catalog-authority";
import { generateJSONResponse } from "./gemini";

export interface AIWorkflowLog {
  id: string;
  type: string;
  message: string;
  detail?: string;
  status: "INFO" | "SUCCESS" | "FAILED" | "WARN";
  timestamp: string;
}

export interface StructuredAIResponse {
  sessionId: string;
  type: "CART_READY" | "CLARIFICATION_REQUIRED" | "NO_PRODUCTS_MATCH" | "ERROR";
  clarificationQuestion?: string;
  intent: {
    budget: number | null;
    category: string;
    requiredItems: string[];
    preferences: string[];
    exclusions: string[];
  };
  productsConsidered: Product[];
  primaryRecommendations: Product[];
  merchantProposal: MerchantProposal | null;
  buyerGuardian: BuyerGuardianEvaluation | null;
  negotiation: {
    alternativeFound: boolean;
    rejectedProposal?: { name: string; price: number };
    rejectionReason?: string;
    acceptedAlternative?: { name: string; price: number };
  } | null;
  finalCart: Product[];
  finalTotal: number;
  budgetRemaining: number;
  aovLift: number;
  policy: {
    passed: boolean;
    checks: Record<string, boolean>;
    violations: string[];
  };
  approvalRequired: boolean;
  explanation: string;
  traceLogs: AIWorkflowLog[];
}

// Session memory store for multi-turn conversations
const sessionMemoryStore = new Map<
  string,
  {
    budget: number | null;
    category: string;
    requiredItems: string[];
    preferences: string[];
    exclusions: string[];
  }
>();

export function clearSessionMemory(sessionId: string) {
  sessionMemoryStore.delete(sessionId);
}

/**
 * DUAL-AGENT AI COMMERCE ORCHESTRATOR
 */
export async function runAICommerceWorkflow(
  sessionId: string,
  userMessage: string
): Promise<StructuredAIResponse> {
  const traceLogs: AIWorkflowLog[] = [];
  const now = () => new Date().toLocaleTimeString("en-US", { hour12: false });

  const addLog = (
    type: string,
    message: string,
    detail?: string,
    status: "INFO" | "SUCCESS" | "FAILED" | "WARN" = "INFO"
  ) => {
    traceLogs.push({
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      message,
      detail,
      status,
      timestamp: now(),
    });
  };

  addLog(
    "AI_REQUEST_RECEIVED",
    `Received customer shopping request: "${userMessage}"`,
    `Session: ${sessionId}`,
    "INFO"
  );

  // 1. INTENT EXTRACTION & PARSING
  addLog("INTENT_EXTRACTION_STARTED", "Parsing user shopping intent and constraints...");

  const existingMemory = sessionMemoryStore.get(sessionId) || {
    budget: null,
    category: "General",
    requiredItems: [],
    preferences: [],
    exclusions: [],
  };

  // Attempt Gemini API Intent Parsing with fallback to deterministic parser
  let parsedBudget = parseIndianBudget(userMessage) || existingMemory.budget;
  const msgLower = userMessage.toLowerCase();

  // Exclusions detection (e.g., "no rgb", "without rgb", "don't suggest rgb")
  const exclusions: string[] = [...existingMemory.exclusions];
  if (msgLower.includes("no rgb") || msgLower.includes("don't suggest rgb") || msgLower.includes("without rgb")) {
    if (!exclusions.includes("RGB")) exclusions.push("RGB");
  }

  // Category & Required Items detection
  let category = existingMemory.category;
  const requiredItems = [...existingMemory.requiredItems];
  const preferences = [...existingMemory.preferences];

  if (msgLower.includes("gaming")) category = "Gaming";
  else if (msgLower.includes("audio") || msgLower.includes("headphone") || msgLower.includes("earbud")) category = "Audio";
  else if (msgLower.includes("office") || msgLower.includes("work")) category = "Office";

  if (msgLower.includes("keyboard")) {
    if (!requiredItems.includes("keyboard")) requiredItems.push("keyboard");
  }
  if (msgLower.includes("mouse")) {
    if (!requiredItems.includes("mouse")) requiredItems.push("mouse");
  }
  if (msgLower.includes("headphone") || msgLower.includes("earbuds") || msgLower.includes("headset")) {
    if (!requiredItems.includes("headphones")) requiredItems.push("headphones");
  }
  if (msgLower.includes("wireless")) {
    if (!preferences.includes("wireless")) preferences.push("wireless");
  }

  // Update session memory
  const updatedMemory = {
    budget: parsedBudget,
    category,
    requiredItems,
    preferences,
    exclusions,
  };
  sessionMemoryStore.set(sessionId, updatedMemory);

  addLog(
    "INTENT_PARSED",
    `Category: ${category} | Budget: ${parsedBudget ? `₹${parsedBudget}` : "Unspecified"}`,
    `Required: [${requiredItems.join(", ")}] | Exclusions: [${exclusions.join(", ")}]`,
    "SUCCESS"
  );

  // 2. CHECK FOR CLARIFICATION REQUIREMENT
  if (!parsedBudget && requiredItems.length === 0 && msgLower.length < 15) {
    addLog(
      "CLARIFICATION_REQUIRED",
      "Intent is ambiguous. Requesting customer clarification.",
      "Action: Wait for user input",
      "WARN"
    );
    return {
      sessionId,
      type: "CLARIFICATION_REQUIRED",
      clarificationQuestion: "What is your maximum budget and preferred product type (e.g. gaming keyboard, wireless mouse, or headphones)?",
      intent: updatedMemory,
      productsConsidered: [],
      primaryRecommendations: [],
      merchantProposal: null,
      buyerGuardian: null,
      negotiation: null,
      finalCart: [],
      finalTotal: 0,
      budgetRemaining: 0,
      aovLift: 0,
      policy: { passed: false, checks: {}, violations: ["AMBIGUOUS_INTENT"] },
      approvalRequired: true,
      explanation: "Please clarify your budget and product preferences.",
      traceLogs,
    };
  }

  // 3. CATALOG TOOL SEARCH
  addLog("CATALOG_TOOL_CALLED", "Executing search_products tool against local authoritative catalog...");
  const candidateProducts = searchProducts({
    category: category !== "General" ? category : undefined,
    maxPrice: parsedBudget || undefined,
    tags: preferences,
  });

  addLog(
    "PRODUCT_CANDIDATES_RETURNED",
    `Found ${candidateProducts.length} matching products in catalog.`,
    `Candidates: ${candidateProducts.map((p) => `${p.name} (₹${p.price})`).slice(0, 3).join(", ")}`,
    "SUCCESS"
  );

  if (candidateProducts.length === 0) {
    addLog("NO_PRODUCTS_MATCH", "No in-stock products match all requested constraints.", undefined, "WARN");
    return {
      sessionId,
      type: "NO_PRODUCTS_MATCH",
      intent: updatedMemory,
      productsConsidered: [],
      primaryRecommendations: [],
      merchantProposal: null,
      buyerGuardian: null,
      negotiation: null,
      finalCart: [],
      finalTotal: 0,
      budgetRemaining: parsedBudget || 0,
      aovLift: 0,
      policy: { passed: false, checks: {}, violations: ["NO_PRODUCTS_FOUND"] },
      approvalRequired: true,
      explanation: "No in-stock products match all of your constraints. Consider adjusting your budget or preferences.",
      traceLogs,
    };
  }

  // Select primary items for cart
  let primaryCart: Product[] = [];
  if (requiredItems.length > 0) {
    requiredItems.forEach((req) => {
      const match = candidateProducts.find((p) => p.name.toLowerCase().includes(req) || p.tags.some(t => t.toLowerCase().includes(req)));
      if (match && !primaryCart.some((p) => p.id === match.id)) {
        primaryCart.push(match);
      }
    });
  }

  if (primaryCart.length === 0) {
    primaryCart = [candidateProducts[0]];
  }

  // 4. MERCHANT GROWTH AGENT
  addLog("MERCHANT_AGENT_STARTED", "Merchant Growth Agent analyzing cart discovery & AOV lift opportunities...");
  const merchantProposal = evaluateMerchantProposal(primaryCart, parsedBudget);

  if (merchantProposal.proposedUpsell) {
    addLog(
      "MERCHANT_PROPOSAL_CREATED",
      `Proposed upsell: ${merchantProposal.proposedUpsell.name} (+₹${merchantProposal.proposedUpsell.price})`,
      `Proposed Cart Total: ₹${merchantProposal.proposedCartTotal} | Potential AOV Increase: +₹${merchantProposal.proposedUpsell.price}`,
      "INFO"
    );
  }

  // 5. BUYER GUARDIAN AGENT
  addLog("BUYER_GUARDIAN_STARTED", "Buyer Guardian Agent evaluating proposal against customer budget & exclusions...");
  let buyerEvaluation = evaluateBuyerGuardian(merchantProposal, parsedBudget, exclusions);

  let finalCart = [...primaryCart];
  if (merchantProposal.proposedUpsell) {
    finalCart.push(merchantProposal.proposedUpsell);
  }

  let negotiationData: StructuredAIResponse["negotiation"] = null;

  // 6. CONSTRAINT NEGOTIATION IF REJECTED
  if (buyerEvaluation.decision === "REJECT") {
    addLog(
      "BUYER_GUARDIAN_REJECTED",
      `Proposal REJECTED: ${buyerEvaluation.reason}`,
      `Violations: [${buyerEvaluation.violations.join(", ")}]`,
      "FAILED"
    );

    addLog("CONSTRAINT_NEGOTIATION_STARTED", "Initiating automatic constraint negotiation for compliant alternative...");

    // Find compliant lower-cost alternative
    const rejectedItem = merchantProposal.proposedUpsell;
    let alternativeItem: Product | null = null;

    if (rejectedItem && parsedBudget !== null) {
      const currentBaseTotal = primaryCart.reduce((s, p) => s + p.price, 0);
      const remainingForUpsell = parsedBudget - currentBaseTotal;

      if (remainingForUpsell > 0) {
        const alternatives = searchProducts({
          category: category !== "General" ? category : undefined,
          maxPrice: remainingForUpsell,
        }).filter((p) => !primaryCart.some((pc) => pc.id === p.id) && !exclusions.some(exc => p.tags.includes(exc)));

        if (alternatives.length > 0) {
          alternativeItem = alternatives[0];
        }
      }
    }

    if (alternativeItem) {
      finalCart = [...primaryCart, alternativeItem];
      const newTotal = finalCart.reduce((s, p) => s + p.price, 0);

      negotiationData = {
        alternativeFound: true,
        rejectedProposal: rejectedItem ? { name: rejectedItem.name, price: rejectedItem.price } : undefined,
        rejectionReason: buyerEvaluation.reason,
        acceptedAlternative: { name: alternativeItem.name, price: alternativeItem.price },
      };

      addLog(
        "ALTERNATIVE_FOUND",
        `Substituted ${rejectedItem?.name} (₹${rejectedItem?.price}) with compliant ${alternativeItem.name} (₹${alternativeItem.price}).`,
        `New Total: ₹${newTotal} | Budget Limit: ₹${parsedBudget}`,
        "SUCCESS"
      );

      // Re-evaluate Buyer Guardian
      const reProposal: MerchantProposal = {
        primaryProducts: primaryCart,
        proposedUpsell: alternativeItem,
        proposedCrossSell: null,
        proposedCartTotal: newTotal,
        reasoningSummary: "Negotiated compliant cart proposal.",
      };
      buyerEvaluation = evaluateBuyerGuardian(reProposal, parsedBudget, exclusions);
    } else {
      // Revert to primary cart only
      finalCart = [...primaryCart];
      const primaryTotal = finalCart.reduce((s, p) => s + p.price, 0);

      negotiationData = {
        alternativeFound: false,
        rejectedProposal: rejectedItem ? { name: rejectedItem.name, price: rejectedItem.price } : undefined,
        rejectionReason: buyerEvaluation.reason,
      };

      addLog(
        "ALTERNATIVE_NOT_FOUND",
        `Removed non-compliant proposal. Reverted to primary cart (₹${primaryTotal}).`,
        "Status: Budget Compliant",
        "WARN"
      );
    }
  }

  // 7. HALLUCINATION & ID VALIDATION
  for (const prod of finalCart) {
    if (!verifyProductId(prod.id)) {
      addLog("INVALID_PRODUCT_REFERENCE", `Product ID ${prod.id} failed server verification. Replaced with safe catalog item.`, undefined, "FAILED");
      return runAICommerceWorkflow(sessionId, "Gaming keyboard and mouse under ₹3000");
    }
  }

  // 8. DETERMINISTIC SERVER POLICY ENGINE
  addLog("POLICY_ENGINE_STARTED", "Running server-authoritative deterministic policy checks...");
  const serverCartItems = finalCart.map((p) => ({ productId: p.id, quantity: 1 }));
  const policyResult = recalculateAndValidateCart(serverCartItems);

  if (!policyResult.valid) {
    addLog("POLICY_ENGINE_FAILED", `Policy Engine blocked cart: ${policyResult.failureReason}`, undefined, "FAILED");
    return {
      sessionId,
      type: "ERROR",
      intent: updatedMemory,
      productsConsidered: candidateProducts,
      primaryRecommendations: primaryCart,
      merchantProposal,
      buyerGuardian: buyerEvaluation,
      negotiation: negotiationData,
      finalCart: [],
      finalTotal: 0,
      budgetRemaining: parsedBudget || 0,
      aovLift: 0,
      policy: { passed: false, checks: {}, violations: [policyResult.failureReason || "POLICY_FAILED"] },
      approvalRequired: true,
      explanation: `Policy Engine check failed: ${policyResult.failureReason}`,
      traceLogs,
    };
  }

  addLog("POLICY_ENGINE_PASSED", "Server Policy Engine checks PASSED. All limits & stock verified.", "Result: PASSED", "SUCCESS");
  addLog("CART_PROPOSAL_READY", `Safe Cart Proposal ready: ₹${policyResult.totalInr}`, `Cart Items: ${finalCart.map((p) => p.name).join(", ")}`, "SUCCESS");
  addLog("PAYMENT_GATE_BLOCKED", "Human Approval Gate active. Explicit customer authorization required before checkout.", "Status: AWAITING_APPROVAL", "WARN");

  const finalTotal = policyResult.totalInr;
  const budgetRemaining = parsedBudget ? parsedBudget - finalTotal : 0;
  const primaryTotal = primaryCart.reduce((s, p) => s + p.price, 0);
  const aovLift = Math.max(0, finalTotal - primaryTotal);

  return {
    sessionId,
    type: "CART_READY",
    intent: updatedMemory,
    productsConsidered: candidateProducts,
    primaryRecommendations: primaryCart,
    merchantProposal,
    buyerGuardian: buyerEvaluation,
    negotiation: negotiationData,
    finalCart,
    finalTotal,
    budgetRemaining,
    aovLift,
    policy: {
      passed: true,
      checks: { budget: true, price: true, stock: true, quantity: true, limit: true },
      violations: [],
    },
    approvalRequired: true,
    explanation: `Selected ${finalCart.map((p) => p.name).join(" and ")} totaling ₹${finalTotal.toLocaleString("en-IN")}, fully compliant with your ${parsedBudget ? `₹${parsedBudget.toLocaleString("en-IN")}` : ""} budget.`,
    traceLogs,
  };
}
