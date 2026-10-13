export interface ProductDetailsModel {
    id: string;
    brand: string;
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
    title: string;
    brand: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    category?: string;
    isFavorite?: boolean;
}
