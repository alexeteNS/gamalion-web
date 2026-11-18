import type React from "react";

export interface ViewDetailsButtonProps {
    variant?: "icon" | "text";
    text?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ViewDetailsButton({
    variant = "text",
    text = "Ver detalles",
    onClick,
}: ViewDetailsButtonProps) {
    if (variant === "icon") {
        return (
            <button
                type="button"
                onClick={onClick}
                aria-label={text}
                style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background-color 0.15s ease, transform 0.15s ease",
                }}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                width: "100%",
                padding: "9px 12px",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
            }}
        >
            {text}
        </button>
    );
}
