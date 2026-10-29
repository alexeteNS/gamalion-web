export interface ProductDetailsModel {
    id: string;
    sku: string;
    model: string;
    brand: string;
    category: string;
    categoryLabel: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    hasDiscount: boolean;
    discountSavings: number;
    formattedPrice: string;
    formattedOriginalPrice?: string;
    formattedSavings?: string;
    colors: string[];
    images: string[];
    specs: Record<string, (string | string[])[]>;
    bannerImages: string[];
}

export interface ProductCardItem {
    id: string | number;
    sku?: string;
    model?: string;
    title: string;
    brand: string;
    description?: string;
    specs?: string[];
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    category?: string;
    isFavorite?: boolean;
}
