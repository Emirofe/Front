import { Product, Review, BusinessLocation, mockBusinesses } from "./mock-data";

function uniqueStrings(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))));
}

export function getProductPrice(product: Product) {
  return product.pricing?.current ?? product.price ?? 0;
}

export function getProductOriginalPrice(product: Product) {
  return product.pricing?.original ?? product.originalPrice;
}

export function getProductImages(product: Product) {
  const mediaGallery = product.media?.gallery?.map((entry) =>
    typeof entry === "string" ? entry : entry.url
  ) ?? [];

  return uniqueStrings([product.media?.cover, ...mediaGallery, ...product.images, product.image]);
}

export function getProductPrimaryImage(product: Product) {
  return getProductImages(product)[0] ?? "";
}

export function getProductReviews(product: Product): Review[] {
  return product.reviewSummary?.items ?? product.reviews ?? [];
}

export function getProductReviewCount(product: Product) {
  return product.reviewSummary?.total ?? product.reviewCount ?? getProductReviews(product).length;
}

export function getProductRating(product: Product) {
  return product.reviewSummary?.average ?? product.rating ?? 0;
}

export function getProductStock(product: Product) {
  return product.stock ?? 0;
}

export function getProductSellerName(product: Product) {
  return product.business?.commercialName ?? product.sellerName;
}

export function getProductSellerRating(product: Product) {
  return product.business?.rating ?? product.sellerRating ?? 0;
}

function getFallbackLocation(sellerId: string): BusinessLocation | undefined {
  const business = mockBusinesses.find((item) => item.sellerId === sellerId);

  if (!business) {
    return undefined;
  }

  return {
    id: business.id,
    address: business.address,
    city: business.city,
    state: business.state,
    country: business.country,
    postalCode: business.postalCode,
    lat: business.lat,
    lng: business.lng,
  };
}

export function getProductLocation(product: Product): BusinessLocation | undefined {
  return product.business?.location ?? getFallbackLocation(product.sellerId);
}

export function matchesCatalogSearch(product: Product, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const haystack = [
    product.name,
    product.description,
    product.category,
    getProductSellerName(product),
    getProductLocation(product)?.address,
    getProductLocation(product)?.city,
    getProductLocation(product)?.state,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}
