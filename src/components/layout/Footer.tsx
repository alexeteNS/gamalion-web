import { useState } from "react";
import gamalionLogo from "../../assets/gamalion-logo.png";
import {
    footerColumnsData,
    footerContactInfo,
    footerSocialLinks,
    paymentMethodsList,
} from "../../data/footerData";
import type { FooterLinkItem } from "../../models/footer";

export interface FooterProps {
    onNavigateHome?: () => void;
}

export default function Footer({ onNavigateHome }: FooterProps) {
    const [activeItem, setActiveItem] = useState<FooterLinkItem | null>(null);

    return (
        <footer
            style={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderTop: "1px solid #e2e8f0",
                marginTop: "auto",
                boxSizing: "border-box",
            }}
        >
            <div
                className="site-container"
                style={{
                    paddingTop: "2.5rem",
                    paddingBottom: "1.5rem",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "2rem",
                        paddingBottom: "2rem",
                        borderBottom: "1px solid #e2e8f0",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div
                            onClick={onNavigateHome}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                cursor: "pointer",
                            }}
                        >
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "7px",
                                    backgroundColor: "#2563eb",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "4px",
                                    boxSizing: "border-box",
                                }}
                            >
                                <img
                                    src={gamalionLogo}
                                    alt="Gamalion Digital"
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            </div>
                            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                                Gamalion <span style={{ color: "#2563eb" }}>Digital</span>
                            </span>
                        </div>

                        <a
                            href={`mailto:${footerContactInfo.email}`}
                            style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}
                        >
                            {footerContactInfo.email}
                        </a>

                        <a
                            href={`https://wa.me/${footerContactInfo.whatsappNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#475569", textDecoration: "none", fontSize: "0.85rem" }}
                        >
                            Tel: {footerContactInfo.phoneDisplay}
                        </a>

                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
                            {footerSocialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        color: "#475569",
                                        fontSize: "0.85rem",
                                        textDecoration: "none",
                                        fontWeight: 600,
                                    }}
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerColumnsData.map((col) => (
                        <div
                            key={col.id}
                            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
                        >
                            <h4
                                style={{
                                    margin: 0,
                                    fontSize: "0.9rem",
                                    fontWeight: 700,
                                    color: "#0f172a",
                                }}
                            >
                                {col.title}
                            </h4>

                            {col.links.map((link) => (
                                <button
                                    key={link.id}
                                    type="button"
                                    onClick={() => setActiveItem(link)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        color: "#64748b",
                                        fontSize: "0.85rem",
                                        textAlign: "left",
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                    }}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        paddingTop: "1.25rem",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        fontSize: "0.8rem",
                        color: "#64748b",
                    }}
                >
                    <span>© 2026 Gamalion Digital. Todos los derechos reservados.</span>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                        {paymentMethodsList.map((method) => (
                            <span
                                key={method}
                                style={{
                                    padding: "3px 8px",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "4px",
                                    color: "#475569",
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                }}
                            >
                                {method}
                            </span>
                        ))}
                        <span
                            style={{
                                padding: "3px 8px",
                                border: "1px solid #cbd5e1",
                                borderRadius: "4px",
                                color: "#475569",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                            }}
                        >
                            SSL
                        </span>
                    </div>
                </div>
            </div>

            {activeItem && (
                <div
                    onClick={() => setActiveItem(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(15, 23, 42, 0.5)",
                        zIndex: 999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "100%",
                            maxWidth: "520px",
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            padding: "1.5rem",
                            boxSizing: "border-box",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "1rem",
                            }}
                        >
                            <h3 style={{ margin: 0, fontSize: "1rem", color: "#0f172a" }}>
                                {activeItem.label}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setActiveItem(null)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    color: "#64748b",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <p
                            style={{
                                margin: 0,
                                fontSize: "0.88rem",
                                lineHeight: 1.5,
                                color: "#334155",
                                whiteSpace: "pre-line",
                                minHeight: "40px",
                            }}
                        >
                            {activeItem.content}
                        </p>
                    </div>
                </div>
            )}
        </footer>
    );
}
