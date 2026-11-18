import { useRef } from "react";
import type { ProductCardItem } from "../../../models/product";
import ProductCard from "./ProductCard";

export interface ProductSliderProps {
    title: string;
    subtitle?: string;
    headerBadge?: string;
    emptyMessage?: string;
    category: string;
    products: ProductCardItem[];
    limit?: number;
    viewAllText?: string;
    onViewAll?: (category: string) => void;
    onProductClick?: (product: ProductCardItem) => void;
    onAddToCart?: (product: ProductCardItem) => void;
    onFavoriteToggle?: (product: ProductCardItem) => void;
}

export default function ProductSlider({
    title,
    subtitle,
    headerBadge,
    emptyMessage = "Sin producto",
    category,
    products,
    limit = 6,
    viewAllText = "Ver todos",
    onViewAll,
    onProductClick,
    onAddToCart,
    onFavoriteToggle,
}: ProductSliderProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -290, behavior: "smooth" });
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 290, behavior: "smooth" });
        }
    };

    const displayedProducts = products.slice(0, limit);

    return (
        <section
            className="product-slider-card"
            style={{
                width: "100%",
                maxWidth: "1440px",
                backgroundColor: "#ffffff",
                border: "1px solid #dce5f2",
                borderRadius: "20px",
                boxSizing: "border-box",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)",
                display: "flex",
                flexDirection: "column",
                margin: "0 auto 2.5rem auto",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.5rem",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                        <h2
                            style={{
                                fontSize: "1.35rem",
                                fontWeight: 800,
                                color: "#0f172a",
                                margin: 0,
                                letterSpacing: "-0.015em",
                            }}
                        >
                            {title}
                        </h2>
                        {headerBadge && (
                            <span
                                style={{
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    color: "#1d4ed8",
                                    backgroundColor: "#eff6ff",
                                    border: "1px solid #bfdbfe",
                                    borderRadius: "999px",
                                    padding: "0.18rem 0.6rem",
                                    letterSpacing: "0.03em",
                                }}
                            >
                                {headerBadge}
                            </span>
                        )}
                    </div>
                    {subtitle && (
                        <span
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                color: "#64748b",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                marginTop: "0.25rem",
                            }}
                        >
                            {subtitle}
                        </span>
                    )}
                </div>

                {displayedProducts.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button
                        type="button"
                        onClick={handleScrollLeft}
                        aria-label="Desplazar hacia la izquierda"
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e2e8f0",
                            color: "#0f172a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "background-color 0.15s ease, border-color 0.15s ease",
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={handleScrollRight}
                        aria-label="Desplazar hacia la derecha"
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e2e8f0",
                            color: "#0f172a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "background-color 0.15s ease, border-color 0.15s ease",
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
                )}
            </div>

            {displayedProducts.length === 0 ? (
                <div
                    style={{
                        border: "1.5px dashed #cbd5e1",
                        borderRadius: "14px",
                        padding: "2rem 1.25rem",
                        textAlign: "center",
                        backgroundColor: "#f8fafc",
                        color: "#64748b",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                    }}
                >
                    {emptyMessage}
                </div>
            ) : (
            <div
                ref={scrollContainerRef}
                style={{
                    display: "flex",
                    gap: "1.25rem",
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    paddingBottom: "0.75rem",
                    scrollbarWidth: "none",
                }}
            >
                {displayedProducts.map((p) => (
                    <div
                        key={p.id}
                        style={{
                            flex: "0 0 260px",
                            scrollSnapAlign: "start",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ProductCard
                            product={p}
                            onClick={onProductClick}
                            onAddToCart={onAddToCart}
                            onFavoriteToggle={onFavoriteToggle}
                        />
                    </div>
                ))}

                <a
                    href={`#categoria/${category}`}
                    onClick={(e) => {
                        e.preventDefault();
                        onViewAll?.(category);
                    }}
                    style={{
                        flex: "0 0 220px",
                        scrollSnapAlign: "start",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "14px",
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "50%",
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "1rem",
                            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
                        }}
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </div>

                    <span
                        style={{
                            fontSize: "1rem",
                            fontWeight: 800,
                            color: "#0f172a",
                            marginBottom: "0.35rem",
                            lineHeight: 1.25,
                        }}
                    >
                        {viewAllText}
                    </span>

                    <span
                        style={{
                            fontSize: "0.8rem",
                            color: "#64748b",
                            fontWeight: 500,
                        }}
                    >
                        Explorar catálogo completo
                    </span>
                </a>
            </div>
            )}
        </section>
    );
}
