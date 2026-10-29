import type { ProductCardItem } from "../../../models/product";

export interface BrowsingHistorySectionProps {
    products: ProductCardItem[];
    onProductClick?: (product: ProductCardItem) => void;
    onOpenSearchHistory?: () => void;
    onClearHistory?: () => void;
}

export default function BrowsingHistorySection({
    products,
    onProductClick,
    onOpenSearchHistory,
    onClearHistory,
}: BrowsingHistorySectionProps) {
    if (products.length === 0) return null;

    return (
        <section
            style={{
                width: "100%",
                padding: "0 2rem 4rem 2rem",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1440px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #dce5f2",
                    borderRadius: "16px",
                    padding: "1.75rem 2.25rem",
                    boxSizing: "border-box",
                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "1.3rem",
                                fontWeight: 800,
                                color: "#0f172a",
                                letterSpacing: "-0.015em",
                            }}
                        >
                            Tu historial
                        </h2>

                        <button
                            type="button"
                            onClick={onOpenSearchHistory}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                color: "#2563eb",
                                cursor: "pointer",
                                fontFamily: "inherit",
                            }}
                        >
                            Ir a mi historial de navegación
                        </button>

                        {onClearHistory && (
                            <button
                                type="button"
                                onClick={onClearHistory}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    color: "#94a3b8",
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                }}
                            >
                                Borrar historial
                            </button>
                        )}
                    </div>

                    <span
                        style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            backgroundColor: "#2563eb",
                            flexShrink: 0,
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "1.75rem",
                        overflowX: "auto",
                        paddingBottom: "0.5rem",
                    }}
                >
                    {products.map((product) => (
                        <article
                            key={product.id}
                            onClick={() => onProductClick?.(product)}
                            style={{
                                flex: "0 0 185px",
                                display: "flex",
                                flexDirection: "column",
                                cursor: "pointer",
                                boxSizing: "border-box",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "145px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "0.85rem",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    padding: "0.5rem",
                                    boxSizing: "border-box",
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
                                    }}
                                />
                            </div>

                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "0.86rem",
                                    fontWeight: 500,
                                    color: "#334155",
                                    lineHeight: 1.4,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {product.title}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
