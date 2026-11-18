import type { ProductCardItem } from "../models/product";

const STORAGE_KEY = "gamalion_history";
const COOKIE_KEY = "gamalion_history_ids";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setHistoryCookie(ids: string[]) {
    const encoded = encodeURIComponent(ids.join(","));
    document.cookie = `${COOKIE_KEY}=${encoded}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

export function loadViewedHistory(): ProductCardItem[] {
    const savedStorage = localStorage.getItem(STORAGE_KEY);
    if (savedStorage) {
        try {
            const parsed: ProductCardItem[] = JSON.parse(savedStorage);
            if (Array.isArray(parsed) && parsed.length > 0) {
                setHistoryCookie(parsed.map((item) => String(item.id)));
                return parsed;
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    return [];
}

export function reconcileViewedHistoryWithCatalog(
    catalogProducts: ProductCardItem[],
    catalogEmpty: boolean,
): ProductCardItem[] {
    if (catalogEmpty || catalogProducts.length === 0) {
        return clearViewedHistory();
    }

    const current = loadViewedHistory();
    if (current.length === 0) {
        return [];
    }

    const byId = new Map(catalogProducts.map((p) => [String(p.id), p]));
    const updated = current
        .map((item) => byId.get(String(item.id)))
        .filter((item): item is ProductCardItem => Boolean(item));

    if (updated.length !== current.length) {
        saveViewedHistory(updated);
    } else if (updated.length > 0) {
        saveViewedHistory(updated);
    }
    return updated;
}

export function saveViewedHistory(items: ProductCardItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setHistoryCookie(items.map((item) => String(item.id)));
}

export function recordProductInHistory(
    current: ProductCardItem[],
    product: ProductCardItem
): ProductCardItem[] {
    const updated = [
        product,
        ...current.filter((item) => String(item.id) !== String(product.id)),
    ].slice(0, 10);

    saveViewedHistory(updated);
    return updated;
}

export function clearViewedHistory(): ProductCardItem[] {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${COOKIE_KEY}=; max-age=0; path=/; SameSite=Lax`;
    return [];
}
