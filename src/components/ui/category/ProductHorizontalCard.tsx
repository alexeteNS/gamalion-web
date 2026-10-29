import { useState } from "react";
import { WHATSAPP_PHONE } from "../../../data/productBackend";
import {
    getProductUrl,
    isPlainLeftClick,
    cacheDynamicProduct,
} from "../../../data/urlRouter";
import type { CategoryProductItem } from "../../../models/categoryPage";
import WhatsAppModal from "../WhatsAppModal";

export interface ProductHorizontalCardProps {
    product: CategoryProductItem;
    onClick?: (product: CategoryProductItem) => void;
}

export default function ProductHorizontalCard({
    product,
    onClick,
}: ProductHorizontalCardProps) {
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [whatsAppMessage, setWhatsAppMessage] = useState("");
    const productHref = getProductUrl(product);

    const formattedPrice = `$${product.price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

    const handleProductLinkClick = (e: React.MouseEvent) => {
        cacheDynamicProduct(product);
        if (!isPlainLeftClick(e)) return;
        e.preventDefault();
        onClick?.(product);
    };

    const handleWhatsAppClick = () => {
        const text = `Hola Gamalion Digital, me interesa ${product.title} (SKU: ${product.sku}) por ${formattedPrice}. ¿Tienen disponibilidad inmediata?`;
        setWhatsAppMessage(text);
        setIsWhatsAppOpen(true);
    };

    const handleConfirmSendWhatsApp = () => {
        const encoded = encodeURIComponent(whatsAppMessage);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, "_blank");
        setIsWhatsAppOpen(false);
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
            <a
                href={productHref}
                onMouseDown={() => cacheDynamicProduct(product)}
                onClick={handleProductLinkClick}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    width: "220px",
                    cursor: "pointer",
                    textDecoration: "none",
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
            </a>

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

                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>
                    <a
                        href={productHref}
                        onMouseDown={() => cacheDynamicProduct(product)}
                        onClick={handleProductLinkClick}
                        style={{
                            color: "#0f172a",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        {product.title}
                    </a>
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

                <a
                    href={productHref}
                    onMouseDown={() => cacheDynamicProduct(product)}
                    onClick={handleProductLinkClick}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        padding: "9px 12px",
                        backgroundColor: "#ffffff",
                        color: "#2563eb",
                        border: "1px solid #2563eb",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 700,
                        textDecoration: "none",
                        boxSizing: "border-box",
                    }}
                >
                    Ver detalles
                </a>
            </div>

            <WhatsAppModal
                isOpen={isWhatsAppOpen}
                message={whatsAppMessage}
                onChangeMessage={setWhatsAppMessage}
                onClose={() => setIsWhatsAppOpen(false)}
                onConfirmSend={handleConfirmSendWhatsApp}
            />
        </article>
    );
}
