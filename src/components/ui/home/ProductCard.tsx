import { useState } from "react";
import type { ProductCardItem } from "../../../models/product";

export interface ProductCardProps {
    product: ProductCardItem;
    onAddToCart?: (product: ProductCardItem) => void;
    onClick?: (product: ProductCardItem) => void;
    onFavoriteToggle?: (product: ProductCardItem) => void;
}

export default function ProductCard({
    product,
    onAddToCart,
    onClick,
    onFavoriteToggle,
}: ProductCardProps) {
    const [isFav, setIsFav] = useState(product.isFavorite || false);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => {
            const filled = i < Math.floor(rating);
            return (
                <svg
                    key={i}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill={filled ? "#f59e0b" : "#e2e8f0"}
                    stroke={filled ? "#f59e0b" : "#cbd5e1"}
                    strokeWidth="1"
                    style={{ flexShrink: 0 }}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            );
        });
    };

    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart?.(product);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const nextState = !isFav;
        setIsFav(nextState);
        onFavoriteToggle?.({ ...product, isFavorite: nextState });
    };

    const discount = product.discountPercentage !== undefined
        ? product.discountPercentage
        : product.originalPrice && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <article
            onClick={() => onClick?.(product)}
            style={{
                position: "relative",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
            }}
        >
            {discount && discount > 0 && (
                <span
                    style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "999px",
                        letterSpacing: "0.02em",
                        zIndex: 2,
                    }}
                >
                    -{discount}%
                </span>
            )}

            <button
                type="button"
                onClick={handleFavoriteClick}
                aria-label="Agregar a favoritos"
                style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 2,
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.15s ease",
                }}
            >
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill={isFav ? "#ef4444" : "none"}
                    stroke={isFav ? "#ef4444" : "#94a3b8"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </button>

            <div
                style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: "10px",
                    backgroundColor: "#f8fafc",
                    marginBottom: "1rem",
                }}
            >
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        transition: "transform 0.25s ease",
                    }}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <span
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#2563eb",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "0.35rem",
                    }}
                >
                    {product.brand}
                </span>

                <h3
                    style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "#0f172a",
                        margin: "0 0 0.5rem 0",
                        lineHeight: 1.35,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "2.7em",
                    }}
                >
                    {product.title}
                </h3>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        marginBottom: "1rem",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        {renderStars(product.rating)}
                    </div>
                    <span
                        style={{
                            fontSize: "0.78rem",
                            color: "#64748b",
                            fontWeight: 500,
                        }}
                    >
                        ({product.reviewCount})
                    </span>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto",
                        paddingTop: "0.5rem",
                    }}
                >
                    <span
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: 800,
                            color: "#0f172a",
                        }}
                    >
                        ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>

                    <button
                        type="button"
                        onClick={handleAddClick}
                        aria-label="Agregar al carrito"
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#0f172a",
                            color: "#ffffff",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "background-color 0.15s ease, transform 0.15s ease",
                        }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
}
