export interface OrderItemPayload {
    productId: string;
    sku: string;
    model: string;
    brand: string;
    title: string;
    selectedColor?: string;
    unitPrice: number;
    quantity: number;
}

export type OrderDeliveryMethod = "pickup" | "local_delivery" | "shipping";
export type OrderPaymentMethod = "whatsapp" | "cash" | "transfer" | "card_gateway";
export type OrderStatus = "pending" | "confirmed" | "processing" | "completed" | "cancelled";

export interface CreateOrderPayload {
    clientId?: string;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    deliveryMethod?: OrderDeliveryMethod;
    deliveryAddress?: string;
    paymentMethod?: OrderPaymentMethod;
    notes?: string;
    items: OrderItemPayload[];
    totalQuantity: number;
    subtotal: number;
    includeAssemblyNote: boolean;
}

export interface OrderItemSummary {
    productId: string;
    sku: string;
    model: string;
    brand: string;
    title: string;
    selectedColor?: string | null;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
}

export interface OrderResponse {
    orderId: string;
    orderCode: string;
    status: OrderStatus;
    createdAt: string;
    currency: string;
    totalQuantity: number;
    totalAmount: number;
    items: OrderItemSummary[];
    whatsAppSummary?: string;
    checkoutUrl?: string | null;
}
