export interface AsyncStatusBannerProps {
    isLoading?: boolean;
    loadingText?: string;
    error?: string | null;
    onRetry?: () => void;
}

export default function AsyncStatusBanner({
    isLoading = false,
    loadingText = "Cargando productos...",
    error = null,
    onRetry,
}: AsyncStatusBannerProps) {
    if (!isLoading && !error) return null;

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1440px",
                margin: "16px auto 0 auto",
                padding: "0 2rem",
                boxSizing: "border-box",
            }}
        >
            {isLoading ? (
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        color: "#334155",
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    <span
                        style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            border: "2px solid #cbd5e1",
                            borderTopColor: "#2563eb",
                            display: "inline-block",
                        }}
                    />
                    <span>{loadingText}</span>
                </div>
            ) : (
                <div
                    style={{
                        backgroundColor: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: "10px",
                        padding: "14px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        color: "#b91c1c",
                        fontSize: "14px",
                    }}
                >
                    <span>{error}</span>
                    {onRetry && (
                        <button
                            type="button"
                            onClick={onRetry}
                            style={{
                                padding: "6px 14px",
                                borderRadius: "6px",
                                border: "1px solid #fca5a5",
                                backgroundColor: "#ffffff",
                                color: "#b91c1c",
                                fontSize: "13px",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Reintentar
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
