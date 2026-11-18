export interface CartItem {
    id: string;
    sku: string;
    model: string;
    brand: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    originalPrice?: number | null;
    currency?: string;
    selectedColor?: string;
    stock?: number;
    quantity: number;
    category?: string;
}
