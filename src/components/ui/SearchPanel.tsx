import { useEffect, useState } from "react";
import { formatCurrencyMXN, isVisibleCategorySlug } from "../../constants/storeConfig";
import type { CategoryItem } from "../../models/category";
import type { ProductCardItem } from "../../models/product";
import { fetchProductsList } from "../../services";
import ViewDetailsButton from "./ViewDetailsButton";

export interface SearchPanelProps {
    isOpen: boolean;
    query: string;
    historyProducts: ProductCardItem[];
    categories?: CategoryItem[];
    catalogEmpty?: boolean;
    onClose: () => void;
    onProductClick: (product: ProductCardItem) => void;
    onSelectCategory?: (category: string) => void;
    onFavoriteToggle?: (product: ProductCardItem) => void;
}

export default function SearchPanel({
    isOpen,
    query,
    historyProducts,
    categories = [],
    catalogEmpty = false,
    onClose,
    onProductClick,
    onSelectCategory,
    onFavoriteToggle,
}: SearchPanelProps) {
    const [searchState, setSearchState] = useState<{
        query: string;
        products: ProductCardItem[];
        error: string | null;
    } | null>(null);

    const trimmedQuery = query.trim();

    useEffect(() => {
        if (!isOpen || trimmedQuery.length === 0) {
            return;
        }

        let cancelled = false;
        const timer = window.setTimeout(() => {
            fetchProductsList({ q: trimmedQuery, limit: 12 })
                .then((res) => {
                    if (!cancelled) {
                        setSearchState({
                            query: trimmedQuery,
                            products: res.products,
                            error: null,
                        });
                    }
                })
                .catch((err) => {
                    if (!cancelled) {
                        setSearchState({
                            query: trimmedQuery,
                            products: [],
                            error:
                                err instanceof Error
                                    ? err.message
                                    : "No se pudo consultar el catálogo.",
                        });
                    }
                });
        }, 220);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [isOpen, trimmedQuery]);

    if (!isOpen) return null;

    const showingSearch = trimmedQuery.length > 0;
    const isSearching =
        showingSearch && searchState?.query !== trimmedQuery;
    const searchError =
        showingSearch && searchState?.query === trimmedQuery
            ? searchState.error
            : null;
    const searchResults =
        showingSearch && searchState?.query === trimmedQuery
            ? searchState.products
            : [];

    const renderMiniStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => {
            const filled = i < Math.floor(rating);
            return (
                <svg
                    key={i}
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill={filled ? "#f59e0b" : "#e2e8f0"}
                    stroke={filled ? "#f59e0b" : "#cbd5e1"}
                    strokeWidth="1"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        });
    };

    const displayProducts = showingSearch ? searchResults : historyProducts;

    const visibleCategories = categories.filter((cat) =>
        isVisibleCategorySlug(cat.id),
    );
    const matchingCategories = showingSearch
        ? visibleCategories.filter((cat) =>
              `${cat.name} ${cat.description || ""}`
                  .toLowerCase()
                  .includes(trimmedQuery.toLowerCase()),
          )
        : visibleCategories;
    const categorySuggestions =
        matchingCategories.length > 0 ? matchingCategories : visibleCategories;

    return (
        <div
            className="search-panel-container"
            style={{
                position: "fixed",
                top: "70px",
                left: 0,
                right: 0,
                zIndex: 99,
                display: "flex",
                justifyContent: "center",
                boxSizing: "border-box",
                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1440px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderTop: "none",
                    borderRadius: "0 0 16px 16px",
                    boxShadow: "0 14px 30px rgba(0, 0, 0, 0.12)",
                    padding: "20px 24px",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    pointerEvents: "auto",
                }}
            >
                <div>
                    <h4
                        style={{
                            margin: "0 0 12px 0",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#64748b",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                        }}
                    >
                        {showingSearch
                            ? `Resultados para "${trimmedQuery}"`
                            : "Historial de productos"}
                    </h4>

                    {isSearching ? (
                        <div
                            style={{
                                padding: "18px 14px",
                                borderRadius: "10px",
                                backgroundColor: "#f8fafc",
                                color: "#475569",
                                fontSize: "13px",
                                fontWeight: 500,
                            }}
                        >
                            Buscando en el catálogo...
                        </div>
                    ) : searchError ? (
                        <div
                            style={{
                                padding: "14px",
                                borderRadius: "10px",
                                backgroundColor: "#fef2f2",
                                border: "1px solid #fecaca",
                                color: "#b91c1c",
                                fontSize: "13px",
                            }}
                        >
                            {searchError}
                        </div>
                    ) : displayProducts.length === 0 ? (
                        <div
                            style={{
                                padding: "18px 14px",
                                borderRadius: "10px",
                                backgroundColor: "#f8fafc",
                                border: "1px dashed #cbd5e1",
                                color: "#64748b",
                                fontSize: "13px",
                            }}
                        >
                            {showingSearch || catalogEmpty ? (
                                <span>
                                    <strong>Sin producto</strong>
                                    {showingSearch
                                        ? ` — No encontramos artículos para "${trimmedQuery}" en la base de datos.`
                                        : " — No hay productos registrados en la base de datos."}
                                </span>
                            ) : (
                                "Aún no has visitado productos recientemente."
                            )}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                overflowX: "auto",
                                paddingBottom: "8px",
                            }}
                        >
                            {displayProducts.map((product) => {
                                const discount =
                                    product.discountPercentage ||
                                    (product.originalPrice && product.originalPrice > product.price
                                        ? Math.round(
                                              ((product.originalPrice - product.price) /
                                                  product.originalPrice) *
                                                  100,
                                          )
                                        : null);

                                return (
                                    <article
                                        key={product.id}
                                        onClick={() => {
                                            onProductClick(product);
                                            onClose();
                                        }}
                                        style={{
                                            position: "relative",
                                            flex: "0 0 165px",
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e2e8f0",
                                            borderRadius: "12px",
                                            padding: "10px",
                                            display: "flex",
                                            flexDirection: "column",
                                            boxSizing: "border-box",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {discount && discount > 0 && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "8px",
                                                    left: "8px",
                                                    backgroundColor: "#ef4444",
                                                    color: "#ffffff",
                                                    fontSize: "10px",
                                                    fontWeight: 800,
                                                    padding: "2px 6px",
                                                    borderRadius: "999px",
                                                    zIndex: 2,
                                                }}
                                            >
                                                -{discount}%
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            aria-label="Alternar favorito"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onFavoriteToggle?.({
                                                    ...product,
                                                    isFavorite: !product.isFavorite,
                                                });
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: "8px",
                                                right: "8px",
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "50%",
                                                backgroundColor: "#ffffff",
                                                border: "1px solid #f1f5f9",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                zIndex: 2,
                                                cursor: "pointer",
                                                padding: 0,
                                            }}
                                        >
                                            <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill={product.isFavorite ? "#ef4444" : "none"}
                                                stroke={product.isFavorite ? "#ef4444" : "#94a3b8"}
                                                strokeWidth="2"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </button>

                                        <div
                                            style={{
                                                width: "100%",
                                                height: "105px",
                                                backgroundColor: "#f8fafc",
                                                borderRadius: "8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                overflow: "hidden",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            <img
                                                src={product.imageUrl}
                                                alt={product.title}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>

                                        <span
                                            style={{
                                                fontSize: "10px",
                                                fontWeight: 700,
                                                color: "#2563eb",
                                                textTransform: "uppercase",
                                                marginBottom: "2px",
                                            }}
                                        >
                                            {product.brand}
                                        </span>

                                        <h5
                                            style={{
                                                margin: "0 0 4px 0",
                                                fontSize: "12px",
                                                fontWeight: 700,
                                                color: "#0f172a",
                                                lineHeight: 1.3,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                minHeight: "31px",
                                            }}
                                        >
                                            {product.title}
                                        </h5>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            <div style={{ display: "flex", gap: "1px" }}>
                                                {renderMiniStars(product.rating)}
                                            </div>
                                            <span style={{ fontSize: "10px", color: "#64748b" }}>
                                                ({product.reviewCount})
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginTop: "auto",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "13px",
                                                    fontWeight: 800,
                                                    color: "#0f172a",
                                                }}
                                            >
                                                {formatCurrencyMXN(product.price)}
                                            </span>

                                            <div style={{ transform: "scale(0.75)", transformOrigin: "right center" }}>
                                                <ViewDetailsButton
                                                    variant="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onProductClick(product);
                                                        onClose();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div
                    style={{
                        borderTop: "1px solid #e2e8f0",
                        paddingTop: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <h4
                        style={{
                            margin: 0,
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#64748b",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                        }}
                    >
                        Categorías del catálogo
                    </h4>

                    {categorySuggestions.length === 0 ? (
                        <div
                            style={{
                                padding: "12px 14px",
                                borderRadius: "8px",
                                backgroundColor: "#f8fafc",
                                color: "#64748b",
                                fontSize: "13px",
                            }}
                        >
                            Sin producto
                        </div>
                    ) : (
                        <ul
                            style={{
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                            }}
                        >
                            {categorySuggestions.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onSelectCategory?.(cat.id);
                                            onClose();
                                        }}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "8px 10px",
                                            backgroundColor: "#f8fafc",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            color: "#334155",
                                            cursor: "pointer",
                                            textAlign: "left",
                                        }}
                                    >
                                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ color: "#94a3b8" }}>🔎</span>
                                            <span>{cat.name}</span>
                                        </span>
                                        <span style={{ fontSize: "12px", color: "#2563eb", fontWeight: 600 }}>
                                            {typeof cat.productCount === "number"
                                                ? cat.productCount > 0
                                                    ? `${cat.productCount} artículos`
                                                    : "Sin producto"
                                                : `Ver ${cat.name}`}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
