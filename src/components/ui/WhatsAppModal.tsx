export interface WhatsAppModalProps {
    isOpen: boolean;
    message: string;
    onChangeMessage: (value: string) => void;
    onClose: () => void;
    onConfirmSend: () => void;
}

export default function WhatsAppModal({
    isOpen,
    message,
    onChangeMessage,
    onClose,
    onConfirmSend,
}: WhatsAppModalProps) {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(15, 23, 42, 0.45)",
                zIndex: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                boxSizing: "border-box",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: "480px",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    padding: "24px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    boxSizing: "border-box",
                }}
            >
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#0f172a" }}>
                    Confirmar mensaje de WhatsApp
                </h3>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
                    Puedes editar el mensaje antes de abrir WhatsApp para enviarlo a nuestro equipo.
                </p>
                <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => onChangeMessage(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        resize: "vertical",
                        boxSizing: "border-box",
                    }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: "8px 14px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            backgroundColor: "#ffffff",
                            color: "#334155",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirmSend}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            fontSize: "13px",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        Enviar por WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
