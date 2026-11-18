export interface CartToastData {
    title: string;
    imageUrl: string;
    quantity: number;
    price: number;
}

export interface CartToastProps {
    toast: CartToastData | null;
    onClose: () => void;
    onViewCart: () => void;
}

export default function CartToast({ toast, onClose, onViewCart }: CartToastProps) {
    if (!toast) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "82px",
                right: "24px",
                zIndex: 950,
                width: "340px",
                backgroundColor: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                padding: "14px",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.12)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxSizing: "border-box",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#16a34a" }}>
                    ✓ Agregado al carrito
                </span>
                <button
                    type="button"
                    onClick={onClose}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#64748b",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        padding: "0 4px",
                    }}
                >
                    ✕
                </button>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <img
                    src={toast.imageUrl}
                    alt={toast.title}
                    style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                        flexShrink: 0,
                    }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                    <span
                        style={{
                            fontSize: "0.84rem",
                            fontWeight: 600,
                            color: "#0f172a",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {toast.title}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                        Cantidad: {toast.quantity} · ${(toast.price * toast.quantity).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
                <button
                    type="button"
                    onClick={onClose}
                    style={{
                        flex: 1,
                        padding: "8px 10px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        backgroundColor: "#ffffff",
                        color: "#334155",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Seguir comprando
                </button>
                <button
                    type="button"
                    onClick={onViewCart}
                    style={{
                        flex: 1,
                        padding: "8px 10px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#2563eb",
                        color: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Ver carrito
                </button>
            </div>
        </div>
    );
}
