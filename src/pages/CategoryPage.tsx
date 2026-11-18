import { useCallback, useEffect, useState } from "react";
import {
    CategorySidebarFilters,
    ProductHorizontalList,
} from "../components/ui/category";
import { getTabUrl, isPlainLeftClick } from "../data/urlRouter";
import type {
    CategoryCatalogResponse,
    CategoryProductItem,
    FilterConfig,
} from "../models/categoryPage";
import { ApiRequestError, fetchCategoryCatalog } from "../services";

export interface CategoryPageProps {
    category: string;
    onProductClick?: (product: CategoryProductItem) => void;
    onNavigateHome?: () => void;
}

function formatCategorySlug(slug: string): string {
    const clean = slug.trim();
    if (!clean) return "Catálogo";
    return clean
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export default function CategoryPage({
    category,
    onProductClick,
    onNavigateHome,
}: CategoryPageProps) {
    const [catalog, setCatalog] = useState<CategoryCatalogResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(75000);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const loadCategory = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setSelectedValues([]);
        try {
            const response = await fetchCategoryCatalog(category);
            setCatalog(response);
            const priceFilter = response.filters.find((f) => f.type === "range");
            setMaxPrice(priceFilter?.max || 75000);
        } catch (err) {
            if (err instanceof ApiRequestError && err.status === 404) {
                setCatalog({
                    category,
                    categoryLabel: formatCategorySlug(category),
                    products: [],
                    filters: [],
                    totalProducts: 0,
                    isEmpty: true,
                });
                setError(null);
            } else {
                setError(
                    err instanceof Error
                        ? err.message
                        : "No se pudo consultar la categoría en el servidor.",
                );
                setCatalog(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, [category]);

    useEffect(() => {
        let cancelled = false;
        fetchCategoryCatalog(category)
            .then((response) => {
                if (cancelled) return;
                setCatalog(response);
                const priceFilter = response.filters.find((f) => f.type === "range");
                setMaxPrice(priceFilter?.max || 75000);
                setError(null);
            })
            .catch((err) => {
                if (cancelled) return;
                if (err instanceof ApiRequestError && err.status === 404) {
                    setCatalog({
                        category,
                        categoryLabel: formatCategorySlug(category),
                        products: [],
                        filters: [],
                        totalProducts: 0,
                        isEmpty: true,
                    });
                    setError(null);
                } else {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "No se pudo consultar la categoría en el servidor.",
                    );
                    setCatalog(null);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setIsLoading(false);
                }
            });
        return () => {
            cancelled = true;
        };
    }, [category]);

    const filters: FilterConfig[] = catalog?.filters || [];
    const priceFilter = filters.find((f) => f.type === "range");
    const defaultMaxPrice = priceFilter?.max || 75000;
    const categoryProducts = catalog?.products || [];
    const categoryTitle =
        catalog?.categoryLabel || formatCategorySlug(category);

    const handleToggleOption = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((v) => v !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    const handleClearFilters = () => {
        setSelectedValues([]);
        setMaxPrice(defaultMaxPrice);
    };

    const filteredProducts = categoryProducts.filter((product) => {
        if (product.price > maxPrice) {
            return false;
        }

        if (selectedValues.length === 0) {
            return true;
        }

        const tagsText = Object.values(product.filterTags || {}).join(" ");
        const fullText = `${product.brand} ${product.title} ${product.specs.join(" ")} ${tagsText}`.toLowerCase();
        return selectedValues.some((val) =>
            fullText.includes(val.toLowerCase()),
        );
    });

    return (
        <main
            style={{
                width: "100%",
                flex: 1,
                backgroundColor: "#f2f6fb",
                padding: "20px 0 60px 0",
                boxSizing: "border-box",
            }}
        >
            <div className="site-container">
                <p
                    style={{
                        margin: "0 0 16px 0",
                        fontSize: "14px",
                        color: "#64748b",
                    }}
                >
                    <a
                        href={getTabUrl("inicio")}
                        onClick={(e) => {
                            if (isPlainLeftClick(e)) {
                                e.preventDefault();
                                onNavigateHome?.();
                            }
                        }}
                        style={{
                            cursor: "pointer",
                            color: "#2563eb",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        Inicio
                    </a>{" "}
                    &gt; Categoría &gt;{" "}
                    <strong style={{ color: "#0f172a" }}>{categoryTitle}</strong>
                </p>

                {isLoading ? (
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "12px",
                            padding: "48px 24px",
                            textAlign: "center",
                            color: "#475569",
                            fontWeight: 500,
                        }}
                    >
                        Consultando productos de {categoryTitle}...
                    </div>
                ) : error ? (
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #fecaca",
                            borderRadius: "12px",
                            padding: "36px 24px",
                            textAlign: "center",
                            color: "#b91c1c",
                        }}
                    >
                        <p style={{ margin: "0 0 14px 0", fontWeight: 600 }}>
                            {error}
                        </p>
                        <button
                            type="button"
                            onClick={() => void loadCategory()}
                            style={{
                                padding: "10px 18px",
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "13px",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Reintentar
                        </button>
                    </div>
                ) : (
                    <>
                        {filters.length > 0 && categoryProducts.length > 0 && (
                            <button
                                type="button"
                                className="category-mobile-filter-btn"
                                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" y1="21" x2="4" y2="14" />
                                    <line x1="4" y1="10" x2="4" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12" y2="3" />
                                    <line x1="20" y1="21" x2="20" y2="16" />
                                    <line x1="20" y1="12" x2="20" y2="3" />
                                    <line x1="1" y1="14" x2="7" y2="14" />
                                    <line x1="9" y1="8" x2="15" y2="8" />
                                    <line x1="17" y1="16" x2="23" y2="16" />
                                </svg>
                                <span>
                                    {isMobileFiltersOpen
                                        ? "Ocultar filtros"
                                        : `Filtrar productos (${selectedValues.length > 0 ? selectedValues.length : "Todos"})`}
                                </span>
                            </button>
                        )}

                        <div
                            className="category-layout-grid"
                            style={
                                filters.length === 0 || categoryProducts.length === 0
                                    ? { gridTemplateColumns: "1fr" }
                                    : undefined
                            }
                        >
                            {filters.length > 0 && categoryProducts.length > 0 && (
                                <div className={`category-sidebar-desktop ${isMobileFiltersOpen ? "is-open-mobile" : ""}`}>
                                    <CategorySidebarFilters
                                        filters={filters}
                                        selectedValues={selectedValues}
                                        maxPrice={maxPrice}
                                        onToggleOption={handleToggleOption}
                                        onPriceChange={setMaxPrice}
                                        onClearFilters={handleClearFilters}
                                    />
                                </div>
                            )}

                            <ProductHorizontalList
                                products={filteredProducts}
                                categoryTotalCount={catalog?.totalProducts ?? 0}
                                categoryLabel={categoryTitle}
                                onProductClick={onProductClick}
                            />
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
