import { createWhatsAppUrl } from "../../../data/productBackend";
import type { CategoryProductItem } from "../../../models/categoryPage";
import ViewDetailsButton from "../ViewDetailsButton";

export interface ProductHorizontalCardProps {
    product: CategoryProductItem;
    onClick?: (product: CategoryProductItem) => void;
}

export default function ProductHorizontalCard({
    product,
    onClick,
}: ProductHorizontalCardProps) {
    const formattedPrice = `$${product.price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

    const handleWhatsAppClick = () => {
        const url = createWhatsAppUrl(product.title, formattedPrice, 1);
        window.open(url, "_blank");
    };

    return (
        <article
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                boxSizing: "border-box",
                width: "100%",
            }}
        >
            <div
                onClick={() => onClick?.(product)}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    width: "220px",
                    cursor: "pointer",
                }}
            >
                <span
                    style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#2563eb",
                        textTransform: "uppercase",
                    }}
                >
                    {product.brand}
                </span>

                <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                        width: "150px",
                        height: "130px",
                        objectFit: "contain",
                    }}
                />
            </div>

            <div
                style={{
                    flex: 1,
                    minWidth: "250px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                }}
            >
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                    <span>SKU: <strong>{product.sku}</strong></span>
                    <span style={{ margin: "0 8px" }}>•</span>
                    <span>Modelo: <strong>{product.model}</strong></span>
                </div>

                <h3
                    onClick={() => onClick?.(product)}
                    style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#0f172a",
                        cursor: "pointer",
                    }}
                >
                    {product.title}
                </h3>

                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                    }}
                >
                    {product.specs.map((spec, index) => (
                        <li
                            key={index}
                            style={{
                                fontSize: "13px",
                                color: "#64748b",
                            }}
                        >
                            - {spec}
                        </li>
                    ))}
                </ul>
            </div>

            <div
                style={{
                    width: "210px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: "22px",
                            fontWeight: 800,
                            color: "#0f172a",
                        }}
                    >
                        {formattedPrice}
                    </div>

                    {product.originalPrice && (
                        <div
                            style={{
                                fontSize: "13px",
                                color: "#94a3b8",
                                textDecoration: "line-through",
                            }}
                        >
                            ${product.originalPrice.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </div>
                    )}
                </div>

                <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600 }}>
                    ✓ Entrega y retiro local
                </span>

                <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        backgroundColor: "#16a34a",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                >
                    Pedir por WhatsApp
                </button>

                <ViewDetailsButton
                    variant="text"
                    text="Ver detalles"
                    onClick={() => onClick?.(product)}
                />
            </div>
        </article>
    );
}
