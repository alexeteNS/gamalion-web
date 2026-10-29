interface WhatsAppModalProps {
    isOpen: boolean;
    message: string;
    onChangeMessage: (newMessage: string) => void;
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
                onClick={e => e.stopPropagation()}
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
                <h3
                    style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "#0f172a",
                    }}
                >
                    Confirmar mensaje de WhatsApp
                </h3>

                <p
                    style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#64748b",
                    }}
                >
                    Puedes editar o agregar cualquier detalle antes de enviarlo:
                </p>

                <textarea
                    rows={6}
                    value={message}
                    onChange={e => onChangeMessage(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        backgroundColor: "#f5f3ef",
                        border: "1px solid #cbd5e1",
                        borderRadius: "12px",
                        fontSize: "14px",
                        lineHeight: 1.5,
                        color: "#334155",
                        fontFamily: "inherit",
                        resize: "vertical",
                        boxSizing: "border-box",
                        outline: "none",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                        marginTop: "4px",
                    }}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: "10px 18px",
                            backgroundColor: "#f1f5f9",
                            color: "#334155",
                            border: "none",
                            borderRadius: "999px",
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
                            padding: "10px 20px",
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "999px",
                            fontSize: "13px",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        Enviar a WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
