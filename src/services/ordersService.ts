import type { CreateOrderPayload, OrderResponse } from "../models";
import { apiFetch, getClientId } from "./apiConfig";

export async function submitOrder(
    payload: CreateOrderPayload,
): Promise<OrderResponse> {
    return apiFetch<OrderResponse>("/orders", {
        method: "POST",
        body: JSON.stringify({
            ...payload,
            clientId: payload.clientId || getClientId(),
        }),
    });
}

export async function fetchOrderByCode(
    orderCode: string,
): Promise<OrderResponse> {
    return apiFetch<OrderResponse>(
        `/orders/${encodeURIComponent(orderCode.trim())}`,
    );
}
