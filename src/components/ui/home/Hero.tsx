import type { ReactNode } from "react";

export interface HeroProps {
    titlePrefix?: string;
    highlightText?: string;
    subtitle?: string;
    catalogButtonText?: string;
    customPcButtonText?: string;
    imageUrl?: string;
    imageAlt?: string;
    onCatalogClick?: () => void;
    onCustomPcClick?: () => void;
    children?: ReactNode;
}

export default function Hero({
    titlePrefix = "Potencia Local para tus",
    highlightText = "Proyectos",
    subtitle = "Desde laptops de alto rendimiento hasta el armado de tu PC gamer soñada. Asesoría técnica real, sin bots.",
    catalogButtonText = "Ver Catálogo",
    customPcButtonText = "Armar mi PC",
    imageUrl = "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80",
    imageAlt = "Gamalion Digital Laptop Gamer Setup",
    onCatalogClick,
    onCustomPcClick,
    children,
}: HeroProps) {
    return (
        <section
            style={{
                position: "relative",
                width: "100%",
                minHeight: "880px",
                background:
                    "linear-gradient(180deg, #0b1120 0%, #0b1120 28%, #0e1525 38%, #141c2c 48%, #1e2739 58%, #2d384c 68%, #445166 77%, #64738a 85%, #8f9fb6 92%, #c4cfe0 96.5%, #f1f4f9 99%, #ffffff 100%)",
                backgroundImage:
                    "linear-gradient(180deg in oklab, #0b1120 0%, #0b1120 28%, #ffffff 100%)",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "3.5rem 1.5rem 22rem 1.5rem",
                boxSizing: "border-box",
                overflow: "visible",
            }}
        >
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    maxWidth: "1200px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "3rem",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                            fontWeight: 800,
                            lineHeight: 1.15,
                            letterSpacing: "-0.025em",
                            color: "#ffffff",
                            margin: "0 0 1.25rem 0",
                        }}
                    >
                        {titlePrefix}{" "}
                        <span style={{ color: "#3b82f6", display: "inline-block" }}>
                            {highlightText}
                        </span>
                    </h1>

                    <p
                        style={{
                            fontSize: "1.05rem",
                            lineHeight: 1.6,
                            color: "#94a3b8",
                            maxWidth: "480px",
                            margin: "0 0 2rem 0",
                        }}
                    >
                        {subtitle}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1rem",
                            alignItems: "center",
                        }}
                    >
                        <button
                            type="button"
                            onClick={onCatalogClick}
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                padding: "0.75rem 1.6rem",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 4px 14px rgba(37, 99, 235, 0.45)",
                                fontFamily: "inherit",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "background-color 0.2s ease, transform 0.15s ease",
                            }}
                        >
                            {catalogButtonText}
                        </button>

                        <button
                            type="button"
                            onClick={onCustomPcClick}
                            style={{
                                backgroundColor: "#111827",
                                color: "#f1f5f9",
                                fontSize: "0.95rem",
                                fontWeight: 500,
                                padding: "0.75rem 1.6rem",
                                borderRadius: "8px",
                                border: "1px solid #334155",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "background-color 0.2s ease, border-color 0.2s ease",
                            }}
                        >
                            {customPcButtonText}
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "520px",
                            borderRadius: "18px",
                            overflow: "hidden",
                            backgroundColor: "#0d1527",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 30px rgba(37, 99, 235, 0.15)",
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            style={{
                                width: "100%",
                                height: "auto",
                                aspectRatio: "16 / 11",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>
                </div>
            </div>

            {children && (
                <div
                    style={{
                        position: "relative",
                        zIndex: 3,
                        marginTop: "-14rem",
                        width: "100%",
                    }}
                >
                    {children}
                </div>
            )}
        </section>
    );
}
