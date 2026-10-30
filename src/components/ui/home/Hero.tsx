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
            className="hero-section"
            style={{
                position: "relative",
                width: "100%",
                background:
                    "linear-gradient(180deg, #102a56 0%, #163568 22%, #21457d 38%, #355b94 52%, #5378ad 66%, #7d9dc7 78%, #b0c5e0 88%, #dce7f5 95%, #f2f6fb 100%)",
                backgroundImage:
                    "linear-gradient(180deg in oklab, #102a56 0%, #1d3f75 30%, #4b6ea1 62%, #f2f6fb 100%)",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                boxSizing: "border-box",
                overflow: "visible",
            }}
        >
            <div
                className="hero-grid"
                style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    maxWidth: "1440px",
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
                            fontSize: "clamp(1.9rem, 4vw, 3.4rem)",
                            fontWeight: 800,
                            lineHeight: 1.15,
                            letterSpacing: "-0.025em",
                            color: "#ffffff",
                            margin: "0 0 1.25rem 0",
                        }}
                    >
                        {titlePrefix}{" "}
                        <span style={{ color: "#7dd3fc", display: "inline-block" }}>
                            {highlightText}
                        </span>
                    </h1>

                    <p
                        style={{
                            fontSize: "1rem",
                            lineHeight: 1.6,
                            color: "#dbeafe",
                            maxWidth: "520px",
                            margin: "0 0 1.75rem 0",
                        }}
                    >
                        {subtitle}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.85rem",
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
