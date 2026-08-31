import { MOCK_PRODUCTS, Product } from "@/data/mock-products";

export interface CartItemInput {
  productId: string;
  quantity: number;
}

export interface ValidatedCartResult {
  valid: boolean;
  totalInr: number;
  totalPaise: number;
  items: Array<{ product: Product; quantity: number; itemSubtotal: number }>;
  policyResult: "PASSED" | "FAILED";
  failureReason?: string;
}

const MAX_CART_VALUE_INR = 5000;
const MAX_QUANTITY_PER_PRODUCT = 3;

/**
 * SERVER-SIDE DETERMINISTIC CATALOG AUTHORITY
 * Never trusts prices, subtotals, or totals submitted by client-side code.
 */
export function recalculateAndValidateCart(
  itemsInput: CartItemInput[]
): ValidatedCartResult {
  if (!itemsInput || itemsInput.length === 0) {
    return {
      valid: false,
      totalInr: 0,
      totalPaise: 0,
      items: [],
      policyResult: "FAILED",
      failureReason: "EMPTY_CART",
    };
  }

  let calculatedTotalInr = 0;
  const validatedItems: Array<{
    product: Product;
    quantity: number;
    itemSubtotal: number;
  }> = [];

  for (const item of itemsInput) {
    // 1. Validate quantity bounds
    if (
      !item.quantity ||
      item.quantity <= 0 ||
      item.quantity > MAX_QUANTITY_PER_PRODUCT
    ) {
      return {
        valid: false,
        totalInr: 0,
        totalPaise: 0,
        items: [],
        policyResult: "FAILED",
        failureReason: `INVALID_QUANTITY: Item ${item.productId} exceeds max quantity limit (${MAX_QUANTITY_PER_PRODUCT})`,
      };
    }

    // 2. Load authoritative product price from server catalog
    const serverProduct = MOCK_PRODUCTS.find((p) => p.id === item.productId);
    if (!serverProduct) {
      return {
        valid: false,
        totalInr: 0,
        totalPaise: 0,
        items: [],
        policyResult: "FAILED",
        failureReason: `UNKNOWN_PRODUCT_ID: ${item.productId}`,
      };
    }

    // 3. Stock validation
    if (serverProduct.stock === "Out of Stock") {
      return {
        valid: false,
        totalInr: 0,
        totalPaise: 0,
        items: [],
        policyResult: "FAILED",
        failureReason: `OUT_OF_STOCK: ${serverProduct.name}`,
      };
    }

    const itemSubtotal = serverProduct.price * item.quantity;
    calculatedTotalInr += itemSubtotal;
    validatedItems.push({
      product: serverProduct,
      quantity: item.quantity,
      itemSubtotal,
    });
  }

  // 4. Validate Max Cart Limit Policy
  if (calculatedTotalInr > MAX_CART_VALUE_INR) {
    return {
      valid: false,
      totalInr: calculatedTotalInr,
      totalPaise: calculatedTotalInr * 100,
      items: validatedItems,
      policyResult: "FAILED",
      failureReason: `MAX_CART_VALUE_EXCEEDED: Calculated total ₹${calculatedTotalInr} exceeds max policy cap of ₹${MAX_CART_VALUE_INR}`,
    };
  }

  return {
    valid: true,
    totalInr: calculatedTotalInr,
    totalPaise: calculatedTotalInr * 100,
    items: validatedItems,
    policyResult: "PASSED",
  };
}
