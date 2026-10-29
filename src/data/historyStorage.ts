import type { ProductCardItem } from "../models/product";
import { allProducts } from "./productsData";
import { categoryProductsData } from "./categoryPageData";

const STORAGE_KEY = "gamalion_history";
const COOKIE_KEY = "gamalion_history_ids";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setHistoryCookie(ids: string[]) {
    const encoded = encodeURIComponent(ids.join(","));
    document.cookie = `${COOKIE_KEY}=${encoded}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

function getHistoryCookieIds(): string[] {
    const cookies = document.cookie.split("; ");
    const target = cookies.find((row) => row.startsWith(`${COOKIE_KEY}=`));
    if (!target) return [];
    const value = decodeURIComponent(target.split("=")[1] || "");
    return value ? value.split(",").filter(Boolean) : [];
}

function findCatalogProductById(id: string): ProductCardItem | null {
    const fromHome = allProducts.find((p) => String(p.id) === id);
    if (fromHome) return fromHome;

    const fromCategory = categoryProductsData.find((p) => String(p.id) === id);
    if (fromCategory) {
        return {
            id: fromCategory.id,
            title: fromCategory.title,
            brand: fromCategory.brand,
            price: fromCategory.price,
            originalPrice: fromCategory.originalPrice,
            imageUrl: fromCategory.imageUrl,
            category: fromCategory.category,
            rating: 4.8,
            reviewCount: 120,
        };
    }

    return null;
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

    const cookieIds = getHistoryCookieIds();
    if (cookieIds.length > 0) {
        const rebuilt: ProductCardItem[] = [];
        cookieIds.forEach((id) => {
            const found = findCatalogProductById(id);
            if (found) {
                rebuilt.push(found);
            }
        });
        if (rebuilt.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(rebuilt));
            return rebuilt;
        }
    }

    return allProducts.slice(0, 4);
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
