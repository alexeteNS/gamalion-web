import { useState } from "react";
import { CartItemCard } from "../components/ui/cart";
import WhatsAppModal from "../components/ui/WhatsAppModal";
import { WHATSAPP_PHONE } from "../data/productBackend";
import { submitOrder } from "../services/ordersService";
import type { CartItem } from "../models/cart";
import type { OrderResponse } from "../models/order";

export interface CartPageProps {
    items: CartItem[];
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
    onClearCart?: () => void;
    onViewDetails: (item: CartItem) => void;
    onContinueShopping: () => void;
}

export default function CartPage({
    items,
    onIncrease,
    onDecrease,
    onRemove,
    onClearCart,
    onViewDetails,
    onContinueShopping,
}: CartPageProps) {
    const [includeAssemblyNote, setIncludeAssemblyNote] = useState(false);
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [whatsAppMessage, setWhatsAppMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);
    const [confirmedOrder, setConfirmedOrder] = useState<OrderResponse | null>(null);

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleProcessOrder = async () => {
        if (items.length === 0 || isSubmitting) return;
        setIsSubmitting(true);
        setOrderError(null);

        try {
            const response = await submitOrder({
                items: items.map(item => ({
                    productId: item.id,
                    sku: item.sku,
                    model: item.model,
                    brand: item.brand,
                    title: item.title,
                    unitPrice: item.price,
                    quantity: item.quantity,
                })),
                totalQuantity,
                subtotal: totalAmount,
                includeAssemblyNote,
            });

            if (response.checkoutUrl) {
                window.location.assign(response.checkoutUrl);
                return;
            }

            setConfirmedOrder(response);
            onClearCart?.();
        } catch (err) {
            setOrderError(
                err instanceof Error
                    ? err.message
                    : "Error al conectar con el servidor de pedidos."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenWhatsAppPreview = () => {
        const lines = items.map(
            item =>
                `- ${item.title} (SKU: ${item.sku}) x${item.quantity} - $${(
                    item.price * item.quantity
                ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`
        );
        const extraNote = includeAssemblyNote
            ? "\nNota: Solicito asesoría o revisión técnica al entregar."
            : "";
        const generatedText = `Hola Gamalion Digital, quiero hacer el siguiente pedido:\n\n${lines.join(
            "\n"
        )}\n\nSubtotal (${totalQuantity} productos): $${totalAmount.toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        )}${extraNote}`;

        setWhatsAppMessage(generatedText);
        setIsWhatsAppOpen(true);
    };

    const handleConfirmSendWhatsApp = () => {
        const encoded = encodeURIComponent(whatsAppMessage);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, "_blank");
        setIsWhatsAppOpen(false);
    };

    return (
        <main
            style={{
                width: "100%",
                flex: 1,
                backgroundColor: "#f2f6fb",
                padding: "32px 0 60px 0",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    maxWidth: "1440px",
                    margin: "0 auto",
                    padding: "0 2rem",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: "24px",
                        fontWeight: 800,
                        color: "#0f172a",
                    }}
                >
                    Carrito de compras
                </h2>

                {confirmedOrder ? (
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #cbd5e1",
                            borderRadius: "10px",
                            padding: "36px 24px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#16a34a",
                            }}
                        >
                            ✓ Pedido registrado correctamente
                        </span>
                        <h3 style={{ margin: 0, fontSize: "20px", color: "#0f172a" }}>
                            Folio de orden: {confirmedOrder.orderId}
                        </h3>
                        <p style={{ margin: 0, fontSize: "14px", color: "#475569" }}>
                            Total procesado: $
                            {confirmedOrder.totalAmount.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setConfirmedOrder(null);
                                onContinueShopping();
                            }}
                            style={{
                                marginTop: "8px",
                                padding: "10px 20px",
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Volver al catálogo
                        </button>
                    </div>
                ) : items.length === 0 ? (
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            padding: "40px 24px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "14px",
                        }}
                    >
                        <p style={{ margin: 0, fontSize: "15px", color: "#64748b" }}>
                            Tu carrito está vacío.
                        </p>
                        <button
                            type="button"
                            onClick={onContinueShopping}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Ver catálogo
                        </button>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 320px",
                            gap: "20px",
                            alignItems: "start",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            {items.map(item => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onIncrease={onIncrease}
                                    onDecrease={onDecrease}
                                    onRemove={onRemove}
                                    onViewDetails={onViewDetails}
                                />
                            ))}
                        </div>

                        <aside
                            style={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                padding: "22px 20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px",
                                boxSizing: "border-box",
                                position: "sticky",
                                top: "90px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "18px",
                                    color: "#0f172a",
                                    lineHeight: 1.35,
                                }}
                            >
                                <span>
                                    Subtotal ({totalQuantity}{" "}
                                    {totalQuantity === 1 ? "producto" : "productos"}):{" "}
                                </span>
                                <strong style={{ fontWeight: 800 }}>
                                    ${totalAmount.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </strong>
                            </div>

                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "13px",
                                    color: "#475569",
                                    lineHeight: 1.45,
                                }}
                            >
                                Entrega y retiro local directo con{" "}
                                <span
                                    style={{
                                        color: "#2563eb",
                                        fontWeight: 600,
                                    }}
                                >
                                    Gamalion Digital
                                </span>{" "}
                                al confirmar tu pedido.
                            </p>

                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    fontSize: "13px",
                                    color: "#0f172a",
                                    cursor: "pointer",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={includeAssemblyNote}
                                    onChange={e =>
                                        setIncludeAssemblyNote(e.target.checked)
                                    }
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        accentColor: "#2563eb",
                                        cursor: "pointer",
                                        margin: 0,
                                    }}
                                />
                                <span>Solicitar asesoría al entregar</span>
                            </label>

                            {orderError && (
                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#b91c1c",
                                        backgroundColor: "#fef2f2",
                                        border: "1px solid #fecaca",
                                        padding: "8px 10px",
                                        borderRadius: "6px",
                                    }}
                                >
                                    {orderError}
                                </div>
                            )}

                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={handleProcessOrder}
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    cursor: isSubmitting ? "wait" : "pointer",
                                    opacity: isSubmitting ? 0.75 : 1,
                                }}
                            >
                                {isSubmitting ? "Procesando pedido..." : "Procesar pedido"}
                            </button>

                            <button
                                type="button"
                                onClick={handleOpenWhatsAppPreview}
                                style={{
                                    width: "100%",
                                    padding: "10px 16px",
                                    backgroundColor: "#16a34a",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                }}
                            >
                                Enviar pedido por WhatsApp
                            </button>
                        </aside>
                    </div>
                )}
            </div>

            <WhatsAppModal
                isOpen={isWhatsAppOpen}
                message={whatsAppMessage}
                onChangeMessage={setWhatsAppMessage}
                onClose={() => setIsWhatsAppOpen(false)}
                onConfirmSend={handleConfirmSendWhatsApp}
            />
        </main>
    );
}
