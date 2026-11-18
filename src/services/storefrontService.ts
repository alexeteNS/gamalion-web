import { apiFetch } from "./apiConfig";
import type { CategoryCatalogResponse } from "../models/categoryPage";
import type { HomeStorefrontResponse } from "../models/storefront";

export async function fetchHomeStorefront(): Promise<HomeStorefrontResponse> {
    return apiFetch<HomeStorefrontResponse>("/storefront/home");
}

export async function fetchCategoryCatalog(
    categorySlug: string,
): Promise<CategoryCatalogResponse> {
    return apiFetch<CategoryCatalogResponse>(
        `/categories/${encodeURIComponent(categorySlug)}`,
    );
}
