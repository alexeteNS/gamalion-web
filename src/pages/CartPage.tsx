import { useState } from "react";
import { CartItemCard } from "../components/ui/cart";
import WhatsAppModal from "../components/ui/WhatsAppModal";
import { WHATSAPP_PHONE } from "../constants/storeConfig";
import { submitOrder } from "../services/ordersService";
import type { CartItem } from "../models/cart";
import type { OrderDeliveryMethod, OrderResponse } from "../models/order";

export interface CartPageProps {
    items: CartItem[];
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
    onClearCart?: () => void;
    onViewDetails: (item: CartItem) => void;
    onContinueShopping: () => void;
    onOrderCreated?: () => void;
}

export default function CartPage({
    items,
    onIncrease,
    onDecrease,
    onRemove,
    onClearCart,
    onViewDetails,
    onContinueShopping,
    onOrderCreated,
}: CartPageProps) {
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState<OrderDeliveryMethod>("pickup");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [includeAssemblyNote, setIncludeAssemblyNote] = useState(false);

    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [whatsAppMessage, setWhatsAppMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);
    const [confirmedOrder, setConfirmedOrder] = useState<OrderResponse | null>(null);

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const handleProcessOrder = async () => {
        if (items.length === 0 || isSubmitting) return;
        setIsSubmitting(true);
        setOrderError(null);

        try {
            const response = await submitOrder({
                customerName: customerName.trim() || undefined,
                customerPhone: customerPhone.trim() || undefined,
                deliveryMethod,
                deliveryAddress:
                    deliveryMethod === "pickup"
                        ? undefined
                        : deliveryAddress.trim() || undefined,
                paymentMethod: "whatsapp",
                items: items.map((item) => ({
                    productId: item.id,
                    sku: item.sku,
                    model: item.model,
                    brand: item.brand,
                    title: item.title,
                    selectedColor: item.selectedColor,
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
            onOrderCreated?.();
        } catch (err) {
            setOrderError(
                err instanceof Error
                    ? err.message
                    : "Error al conectar con el servidor de pedidos.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenWhatsAppPreview = () => {
        const lines = items.map(
            (item) =>
                `- ${item.title} (SKU: ${item.sku}${
                    item.selectedColor ? `, Color: ${item.selectedColor}` : ""
                }) x${item.quantity} - $${(item.price * item.quantity).toLocaleString(
                    "en-US",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    },
                )} MXN`,
        );
        const contactParts: string[] = [];
        if (customerName.trim()) contactParts.push(`Cliente: ${customerName.trim()}`);
        if (customerPhone.trim()) contactParts.push(`Teléfono: ${customerPhone.trim()}`);
        const contactBlock =
            contactParts.length > 0 ? `\n${contactParts.join(" | ")}` : "";
        const extraNote = includeAssemblyNote
            ? "\nNota: Solicito asesoría o revisión técnica al entregar."
            : "";
        const generatedText = `Hola Gamalion Digital, quiero hacer el siguiente pedido:${contactBlock}\n\n${lines.join(
            "\n",
        )}\n\nSubtotal (${totalQuantity} productos): $${totalAmount.toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        )} MXN${extraNote}`;

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
                className="site-container"
                style={{
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
                        <h3 style={{ margin: 0, fontSize: "22px", color: "#0f172a" }}>
                            Código de pedido: {confirmedOrder.orderCode}
                        </h3>
                        <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                            ID interno: {confirmedOrder.orderId} · Estado: {confirmedOrder.status}
                        </p>
                        <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
                            Total procesado: $
                            {confirmedOrder.totalAmount.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{" "}
                            {confirmedOrder.currency}
                        </p>

                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
                            {confirmedOrder.whatsAppSummary && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setWhatsAppMessage(confirmedOrder.whatsAppSummary || "");
                                        setIsWhatsAppOpen(true);
                                    }}
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#16a34a",
                                        color: "#ffffff",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                    }}
                                >
                                    Confirmar por WhatsApp
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setConfirmedOrder(null);
                                    onContinueShopping();
                                }}
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
                                Volver al catálogo
                            </button>
                        </div>
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
                    <div className="cart-layout-grid">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            {items.map((item) => (
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
                            className="cart-summary-card"
                            style={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                padding: "22px 20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                boxSizing: "border-box",
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
                                    })}{" "}
                                    MXN
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
                                Registra tu orden en{" "}
                                <span style={{ color: "#2563eb", fontWeight: 600 }}>
                                    Gamalion Digital
                                </span>{" "}
                                para apartar stock y coordinar entrega.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <input
                                    type="text"
                                    placeholder="Nombre completo (opcional)"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    style={{
                                        padding: "9px 10px",
                                        borderRadius: "6px",
                                        border: "1px solid #cbd5e1",
                                        fontSize: "13px",
                                        width: "100%",
                                        boxSizing: "border-box",
                                    }}
                                />
                                <input
                                    type="tel"
                                    placeholder="Teléfono / WhatsApp (opcional)"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    style={{
                                        padding: "9px 10px",
                                        borderRadius: "6px",
                                        border: "1px solid #cbd5e1",
                                        fontSize: "13px",
                                        width: "100%",
                                        boxSizing: "border-box",
                                    }}
                                />
                                <select
                                    value={deliveryMethod}
                                    onChange={(e) =>
                                        setDeliveryMethod(e.target.value as OrderDeliveryMethod)
                                    }
                                    style={{
                                        padding: "9px 10px",
                                        borderRadius: "6px",
                                        border: "1px solid #cbd5e1",
                                        fontSize: "13px",
                                        backgroundColor: "#ffffff",
                                        width: "100%",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <option value="pickup">Recoger en tienda / punto local</option>
                                    <option value="local_delivery">Entrega local a domicilio</option>
                                    <option value="shipping">Envío nacional por paquetería</option>
                                </select>
                                {deliveryMethod !== "pickup" && (
                                    <input
                                        type="text"
                                        placeholder="Dirección o código postal de envío"
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                        style={{
                                            padding: "9px 10px",
                                            borderRadius: "6px",
                                            border: "1px solid #cbd5e1",
                                            fontSize: "13px",
                                            width: "100%",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                )}
                            </div>

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
                                    onChange={(e) =>
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
