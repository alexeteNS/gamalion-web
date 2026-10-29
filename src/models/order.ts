export interface OrderItemPayload {
    productId: string;
    sku: string;
    model: string;
    brand: string;
    title: string;
    unitPrice: number;
    quantity: number;
}

export interface CreateOrderPayload {
    items: OrderItemPayload[];
    totalQuantity: number;
    subtotal: number;
    includeAssemblyNote: boolean;
}

export interface OrderResponse {
    orderId: string;
    status: "pending" | "confirmed" | "processing";
    createdAt: string;
    totalAmount: number;
    checkoutUrl?: string;
}
