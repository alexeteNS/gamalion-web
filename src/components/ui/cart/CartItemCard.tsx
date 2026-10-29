import type { CartItem } from "../../../models/cart";
import ViewDetailsButton from "../ViewDetailsButton";

export interface CartItemCardProps {
    item: CartItem;
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
    onViewDetails: (item: CartItem) => void;
}

export default function CartItemCard({
    item,
    onIncrease,
    onDecrease,
    onRemove,
    onViewDetails,
}: CartItemCardProps) {
    const formatPriceParts = (amount: number) => {
        const fixed = amount.toFixed(2);
        const [intPart, decPart] = fixed.split(".");
        return {
            intPart: Number(intPart).toLocaleString("en-US"),
            decPart,
        };
    };

    const unitPrice = formatPriceParts(item.price);
    const totalPrice = formatPriceParts(item.price * item.quantity);

    return (
        <article
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    padding: "20px 24px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "24px",
                    boxSizing: "border-box",
                }}
            >
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                        width: "85px",
                        height: "85px",
                        objectFit: "contain",
                        flexShrink: 0,
                    }}
                />

                <div
                    style={{
                        flex: 1,
                        minWidth: "240px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: "15px",
                            color: "#0f172a",
                            lineHeight: 1.45,
                        }}
                    >
                        {item.description}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            fontSize: "12px",
                            color: "#94a3b8",
                        }}
                    >
                        <span>
                            SKU: <strong style={{ color: "#94a3b8" }}>{item.sku}</strong>
                        </span>
                        <span>
                            Modelo: <strong style={{ color: "#94a3b8" }}>{item.model}</strong>
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        minWidth: "110px",
                        textAlign: "center",
                        paddingTop: "4px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#4db86b",
                            marginBottom: "2px",
                        }}
                    >
                        Disponible
                    </div>
                    <div
                        style={{
                            fontSize: "12px",
                            color: "#334155",
                        }}
                    >
                        Listo para envío
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        paddingTop: "4px",
                    }}
                >
                    <button
                        type="button"
                        onClick={() => onDecrease(item.id)}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            color: "#64748b",
                            cursor: "pointer",
                            padding: "0 4px",
                        }}
                    >
                        −
                    </button>

                    <div
                        style={{
                            width: "56px",
                            height: "32px",
                            border: "1px solid #94a3b8",
                            borderRadius: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            color: "#0f172a",
                        }}
                    >
                        {item.quantity}
                    </div>

                    <button
                        type="button"
                        onClick={() => onIncrease(item.id)}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "20px",
                            color: "#64748b",
                            cursor: "pointer",
                            padding: "0 4px",
                        }}
                    >
                        +
                    </button>
                </div>

                <div
                    style={{
                        minWidth: "145px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "10px",
                        paddingTop: "4px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            fontWeight: 800,
                            color: "#0f172a",
                            lineHeight: 1,
                        }}
                    >
                        <span style={{ fontSize: "18px" }}>${unitPrice.intPart}</span>
                        <sup style={{ fontSize: "11px", marginTop: "2px" }}>
                            .{unitPrice.decPart}
                        </sup>
                    </div>

                    <ViewDetailsButton
                        variant="text"
                        text="Ver detalles"
                        onClick={() => onViewDetails(item)}
                    />

                    <button
                        type="button"
                        aria-label="Eliminar del carrito"
                        onClick={() => onRemove(item.id)}
                        style={{
                            background: "none",
                            border: "none",
                            padding: "4px 0 0 0",
                            color: "#cbd5e1",
                            cursor: "pointer",
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                style={{
                    borderTop: "1px solid #e2e8f0",
                    padding: "14px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "32px",
                }}
            >
                <span
                    style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#0f172a",
                    }}
                >
                    Importe:
                </span>

                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        fontWeight: 800,
                        color: "#0f172a",
                        lineHeight: 1,
                    }}
                >
                    <span style={{ fontSize: "16px" }}>${totalPrice.intPart}</span>
                    <sup style={{ fontSize: "10px", marginTop: "2px" }}>
                        .{totalPrice.decPart}
                    </sup>
                </div>
            </div>
        </article>
    );
}
