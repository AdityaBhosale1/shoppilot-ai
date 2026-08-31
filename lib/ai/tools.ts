import { MOCK_PRODUCTS, Product } from "@/data/mock-products";

export interface SearchFilter {
  category?: string;
  productType?: string;
  maxPrice?: number;
  tags?: string[];
  keywords?: string[];
  inStockOnly?: boolean;
}

/**
 * SERVER-SIDE CATALOG TOOL: search_products
 * Searches authoritative local catalog. Never invents fake products.
 */
export function searchProducts(filter: SearchFilter): Product[] {
  let results = [...MOCK_PRODUCTS];

  if (filter.inStockOnly !== false) {
    results = results.filter((p) => p.stock !== "Out of Stock");
  }

  if (filter.category) {
    const cat = filter.category.toLowerCase();
    results = results.filter((p) => p.category.toLowerCase().includes(cat));
  }

  if (filter.maxPrice !== undefined && filter.maxPrice > 0) {
    results = results.filter((p) => p.price <= filter.maxPrice!);
  }

  if (filter.tags && filter.tags.length > 0) {
    const filterTags = filter.tags.map((t) => t.toLowerCase());
    results = results.filter((p) =>
      p.tags.some((tag) => filterTags.includes(tag.toLowerCase()))
    );
  }

  if (filter.keywords && filter.keywords.length > 0) {
    const kw = filter.keywords.map((k) => k.toLowerCase());
    results = results.filter((p) =>
      kw.some(
        (k) =>
          p.name.toLowerCase().includes(k) ||
          p.description.toLowerCase().includes(k) ||
          p.tags.some((t) => t.toLowerCase().includes(k))
      )
    );
  }

  return results;
}

/**
 * SERVER-SIDE CATALOG TOOL: get_product_details
 */
export function getProductDetails(productId: string): Product | null {
  return MOCK_PRODUCTS.find((p) => p.id === productId) || null;
}

/**
 * SERVER-SIDE CATALOG TOOL: compare_products
 */
export function compareProducts(productIds: string[]) {
  const products = productIds
    .map((id) => getProductDetails(id))
    .filter((p): p is Product => p !== null);

  return products.map((p) => ({
    productId: p.id,
    name: p.name,
    price: p.price,
    rating: p.rating,
    stock: p.stock,
    tags: p.tags,
    category: p.category,
  }));
}

/**
 * SERVER-SIDE CATALOG TOOL: find_related_products
 */
export function findRelatedProducts(productId: string, maxPrice?: number): Product[] {
  const target = getProductDetails(productId);
  if (!target) return [];

  return MOCK_PRODUCTS.filter(
    (p) =>
      p.id !== productId &&
      (p.category === target.category || p.tags.some((t) => target.tags.includes(t))) &&
      (maxPrice === undefined || p.price <= maxPrice)
  );
}

/**
 * HALLUCINATION DEFENSE: Verify product ID exists in authoritative catalog
 */
export function verifyProductId(productId: string): boolean {
  return MOCK_PRODUCTS.some((p) => p.id === productId);
}
