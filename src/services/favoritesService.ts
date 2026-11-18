import { apiFetch, getClientId } from "./apiConfig";
import type { FavoriteToggleResponse } from "../models/product";

export async function toggleProductFavorite(
    productId: string,
    isFavorite?: boolean,
): Promise<FavoriteToggleResponse> {
    return apiFetch<FavoriteToggleResponse>(
        `/products/${encodeURIComponent(productId)}/favorite`,
        {
            method: "POST",
            body: JSON.stringify({
                clientId: getClientId(),
                ...(typeof isFavorite === "boolean" ? { isFavorite } : {}),
            }),
        },
    );
}
