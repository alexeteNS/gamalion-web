import { allProducts } from "./productsData";
import { categoryProductsData } from "./categoryPageData";
import type { ProductCardItem } from "../models/product";
import type { CategoryProductItem } from "../models/categoryPage";

const DYNAMIC_CACHE_KEY = "gamalion_dynamic_products_cache";
const BASE_PATH = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

function withBasePath(subpath: string): string {
    const normalized = subpath.startsWith("/") ? subpath : `/${subpath}`;
    if (normalized === "/") {
        return `${BASE_PATH}/`;
    }
    return `${BASE_PATH}${normalized}`;
}

export function toProductSlug(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function getProductUrl(product: { id: string | number; title: string }): string {
    const slug = toProductSlug(product.title || "producto");
    const cleanId = encodeURIComponent(String(product.id));
    return withBasePath(`/producto/${slug}--${cleanId}`);
}

export function getTabUrl(tab: string): string {
    if (!tab || tab === "inicio") return withBasePath("/");
    if (tab === "carrito") return withBasePath("/carrito");
    if (tab.startsWith("/")) return withBasePath(tab);
    return withBasePath(`/categoria/${encodeURIComponent(tab)}`);
}

export function isPlainLeftClick(e: React.MouseEvent): boolean {
    return (
        e.button === 0 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
    );
}

export function cacheDynamicProduct(
    product: ProductCardItem | CategoryProductItem
): void {
    try {
        const raw = localStorage.getItem(DYNAMIC_CACHE_KEY);
        const map: Record<string, ProductCardItem | CategoryProductItem> = raw
            ? JSON.parse(raw)
            : {};
        map[String(product.id)] = product;
        localStorage.setItem(DYNAMIC_CACHE_KEY, JSON.stringify(map));
    } catch {
        return;
    }
}

export function registerDynamicProducts(
    products: (ProductCardItem | CategoryProductItem)[]
): void {
    try {
        const raw = localStorage.getItem(DYNAMIC_CACHE_KEY);
        const map: Record<string, ProductCardItem | CategoryProductItem> = raw
            ? JSON.parse(raw)
            : {};
        for (const item of products) {
            map[String(item.id)] = item;
        }
        localStorage.setItem(DYNAMIC_CACHE_KEY, JSON.stringify(map));
    } catch {
        return;
    }
}

function loadDynamicCache(): Record<string, ProductCardItem | CategoryProductItem> {
    try {
        const raw = localStorage.getItem(DYNAMIC_CACHE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

export function findProductByRouteParam(
    rawParam: string
): ProductCardItem | CategoryProductItem | null {
    const decoded = decodeURIComponent(rawParam);
    const parts = decoded.split("--");
    const candidateId = parts.length > 1 ? parts[parts.length - 1] : decoded;
    const candidateSlug = parts[0];

    const fromCategoryById = categoryProductsData.find(
        p => String(p.id) === candidateId
    );
    if (fromCategoryById) return fromCategoryById;

    const fromHomeById = allProducts.find(p => String(p.id) === candidateId);
    if (fromHomeById) return fromHomeById;

    const dynamicMap = loadDynamicCache();
    if (dynamicMap[candidateId]) {
        return dynamicMap[candidateId];
    }

    const fromCategoryBySlug = categoryProductsData.find(
        p => toProductSlug(p.title) === candidateSlug
    );
    if (fromCategoryBySlug) return fromCategoryBySlug;

    const fromHomeBySlug = allProducts.find(
        p => toProductSlug(p.title) === candidateSlug
    );
    if (fromHomeBySlug) return fromHomeBySlug;

    for (const item of Object.values(dynamicMap)) {
        if (toProductSlug(item.title) === candidateSlug) {
            return item;
        }
    }

    try {
        const savedProduct = localStorage.getItem("gamalion_selected_product");
        if (savedProduct) {
            const parsed = JSON.parse(savedProduct);
            if (
                String(parsed.id) === candidateId ||
                toProductSlug(parsed.title || "") === candidateSlug
            ) {
                return parsed;
            }
        }
    } catch {
        return null;
    }

    return null;
}

export interface ParsedRoute {
    tab: string;
    product: ProductCardItem | CategoryProductItem | null;
}

export function parseCurrentUrl(): ParsedRoute {
    const hashPath = window.location.hash.replace(/^#\/?/, "");
    let rawPath = hashPath
        ? `/${hashPath}`
        : window.location.pathname || "/";

    if (BASE_PATH && rawPath.startsWith(BASE_PATH)) {
        rawPath = rawPath.slice(BASE_PATH.length) || "/";
    }

    const cleanPath = rawPath.replace(/\/+$/, "") || "/";

    if (cleanPath === "/" || cleanPath === "/inicio") {
        return { tab: "inicio", product: null };
    }

    if (cleanPath === "/carrito") {
        return { tab: "carrito", product: null };
    }

    if (cleanPath.startsWith("/categoria/")) {
        const category = decodeURIComponent(
            cleanPath.replace("/categoria/", "")
        ) || "laptops";
        return { tab: category, product: null };
    }

    if (cleanPath.startsWith("/producto/")) {
        const param = cleanPath.replace("/producto/", "");
        const found = findProductByRouteParam(param);
        return { tab: "detalles", product: found };
    }

    return { tab: "inicio", product: null };
}
