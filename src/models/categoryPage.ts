import type { ProductColorOption } from "./product";

export type FilterType = "words" | "checkbox" | "checklist" | "range" | "radio";

export interface FilterOption {
    label: string;
    value: string;
    count?: number;
}

export interface FilterConfig {
    id: string;
    title: string;
    type: FilterType;
    options?: FilterOption[];
    min?: number;
    max?: number;
}

export interface CategoryProductItem {
    id: string;
    slug?: string;
    sku: string;
    model: string;
    brand: string;
    title: string;
    description?: string;
    specs: string[];
    imageUrl: string;
    images?: string[];
    colors?: ProductColorOption[];
    price: number;
    originalPrice?: number | null;
    currency?: string;
    discountPercentage?: number | null;
    isOnOffer?: boolean;
    offerBadge?: string | null;
    stock?: number;
    inStock?: boolean;
    rating?: number;
    reviewCount?: number;
    favoriteCount?: number;
    purchaseCount?: number;
    isFavorite?: boolean;
    category: string;
    categoryLabel?: string;
    filterTags?: Record<string, string>;
}

export interface CategoryCatalogResponse {
    category: string;
    categoryLabel: string;
    products: CategoryProductItem[];
    filters: FilterConfig[];
    totalProducts: number;
    isEmpty: boolean;
}
