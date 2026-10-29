import { API_BASE_URL, isBackendConfigured } from "./apiConfig";
import { allProducts } from "../data/productsData";
import { categoryProductsData } from "../data/categoryPageData";
import { buildProductDetails } from "../data/productBackend";
import {
    cacheDynamicProduct,
    findProductByRouteParam,
    registerDynamicProducts,
} from "../data/urlRouter";
import type { ProductCardItem, ProductDetailsModel } from "../models/product";
import type { CategoryProductItem } from "../models/categoryPage";

export interface CatalogResponse {
    homeProducts: ProductCardItem[];
    categoryProducts: CategoryProductItem[];
}

export async function fetchProductsCatalog(): Promise<CatalogResponse> {
    if (!isBackendConfigured()) {
        return {
            homeProducts: allProducts,
            categoryProducts: categoryProductsData,
        };
    }

    const response = await fetch(`${API_BASE_URL}/products`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error al cargar el catálogo (${response.status})`);
    }

    const data = await response.json();
    const list: (ProductCardItem & Partial<CategoryProductItem>)[] = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
        ? data.products
        : [];

    registerDynamicProducts(list);

    const normalizedCategoryProducts: CategoryProductItem[] = list.map(item => ({
        id: String(item.id),
        sku: item.sku || `GML-${String(item.id).toUpperCase()}`,
        model: item.model || `${item.brand}-${String(item.id).toUpperCase()}`,
        brand: item.brand,
        title: item.title,
        specs: Array.isArray(item.specs) ? item.specs : [],
        imageUrl: item.imageUrl,
        price: item.price,
        originalPrice: item.originalPrice,
        category: item.category || "laptops",
    }));

    return {
        homeProducts: list,
        categoryProducts: normalizedCategoryProducts,
    };
}

export async function fetchProductDetailsById(
    idOrSlug: string
): Promise<ProductDetailsModel> {
    if (!isBackendConfigured()) {
        const local = findProductByRouteParam(idOrSlug);
        return buildProductDetails(local);
    }

    const response = await fetch(
        `${API_BASE_URL}/products/${encodeURIComponent(idOrSlug)}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(`No se pudo cargar el producto (${response.status})`);
    }

    const item: ProductCardItem | CategoryProductItem = await response.json();
    cacheDynamicProduct(item);
    return buildProductDetails(item);
}
