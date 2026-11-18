export interface ProductColorOption {
    name: string;
    value: string;
}

export interface ProductCardItem {
    id: string;
    slug?: string;
    sku?: string;
    model?: string;
    title: string;
    brand: string;
    description?: string;
    specs?: string[];
    price: number;
    originalPrice?: number | null;
    currency?: string;
    discountPercentage?: number | null;
    isOnOffer?: boolean;
    offerBadge?: string | null;
    stock?: number;
    inStock?: boolean;
    rating: number;
    reviewCount: number;
    favoriteCount?: number;
    purchaseCount?: number;
    imageUrl: string;
    images?: string[];
    colors?: ProductColorOption[];
    category?: string;
    categoryLabel?: string;
    isFavorite?: boolean;
    filterTags?: Record<string, string>;
}

export interface ProductDetailsModel {
    id: string;
    slug: string;
    sku: string;
    model: string;
    brand: string;
    category: string;
    categoryLabel: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number | null;
    currency: string;
    hasDiscount: boolean;
    discountSavings: number;
    discountPercentage?: number | null;
    isOnOffer: boolean;
    offerBadge?: string | null;
    formattedPrice: string;
    formattedOriginalPrice?: string;
    formattedSavings?: string;
    stock: number;
    inStock: boolean;
    rating: number;
    reviewCount: number;
    favoriteCount: number;
    purchaseCount: number;
    isFavorite: boolean;
    colors: (string | ProductColorOption)[];
    images: string[];
    bulletSpecs: string[];
    specs: Record<string, (string | string[])[]>;
    bannerImages: string[];
    relatedProducts?: ProductCardItem[];
}

export interface ProductCatalogQuery {
    category?: string;
    q?: string;
    brand?: string;
    onOffer?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sort?: "relevantes" | "price_asc" | "price_desc" | "mas_comprado" | "mejor_valorado" | "ofertas";
    limit?: number;
    offset?: number;
}

export interface ProductListResponse {
    products: ProductCardItem[];
    total: number;
    isEmpty: boolean;
}

export interface FavoriteToggleResponse {
    productId: string;
    isFavorite: boolean;
    favoriteCount: number;
}
