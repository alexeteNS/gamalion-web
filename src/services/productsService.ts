import { apiFetch } from "./apiConfig";
import { fetchHomeStorefront } from "./storefrontService";
import type { CategoryShowcaseSlider } from "../models/storefront";
import type {
    ProductCardItem,
    ProductCatalogQuery,
    ProductDetailsModel,
    ProductListResponse,
} from "../models/product";

export interface CatalogResponse {
    products: ProductCardItem[];
    categorySliders: CategoryShowcaseSlider[];
    total: number;
    catalogEmpty: boolean;
}

export async function fetchProductsList(
    query: ProductCatalogQuery = {},
): Promise<ProductListResponse> {
    const params = new URLSearchParams();
    if (query.category) params.set("category", query.category);
    if (query.q) params.set("q", query.q);
    if (query.brand) params.set("brand", query.brand);
    if (typeof query.onOffer === "boolean") {
        params.set("onOffer", String(query.onOffer));
    }
    if (typeof query.minPrice === "number") {
        params.set("minPrice", String(query.minPrice));
    }
    if (typeof query.maxPrice === "number") {
        params.set("maxPrice", String(query.maxPrice));
    }
    if (query.sort) params.set("sort", query.sort);
    if (typeof query.limit === "number") params.set("limit", String(query.limit));
    if (typeof query.offset === "number") params.set("offset", String(query.offset));

    const qs = params.toString();
    const path = qs ? `/products?${qs}` : "/products";
    return apiFetch<ProductListResponse>(path);
}

export async function fetchProductsCatalog(): Promise<CatalogResponse> {
    const [listRes, storefrontRes] = await Promise.all([
        fetchProductsList({ limit: 200 }),
        fetchHomeStorefront(),
    ]);

    return {
        products: listRes.products,
        categorySliders: storefrontRes.categorySliders,
        total: listRes.total,
        catalogEmpty: listRes.isEmpty || listRes.products.length === 0,
    };
}

export async function fetchProductDetailsById(
    productIdOrSlug: string,
): Promise<ProductDetailsModel> {
    return apiFetch<ProductDetailsModel>(
        `/products/${encodeURIComponent(productIdOrSlug)}`,
    );
}
