import { API_BASE_URL, isBackendConfigured } from "./apiConfig";
import type { CreateOrderPayload, OrderResponse } from "../models/order";

export async function submitOrder(
    payload: CreateOrderPayload
): Promise<OrderResponse> {
    if (!isBackendConfigured()) {
        return {
            orderId: `GML-${Date.now().toString().slice(-6)}`,
            status: "confirmed",
            createdAt: new Date().toISOString(),
            totalAmount: payload.subtotal,
        };
    }

    const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`No se pudo procesar el pedido (${response.status})`);
    }

    const data: OrderResponse = await response.json();
    return data;
}
