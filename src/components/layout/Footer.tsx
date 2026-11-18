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
                                        fontSize: "0.82rem",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        padding: "4px 10px",
                                        borderRadius: "6px",
                                        border: "1px solid #e2e8f0",
                                        backgroundColor: "#f8fafc",
                                    }}
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerColumnsData.map((col) => (
                        <div key={col.id} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                            <h4
                                style={{
                                    margin: "0 0 0.25rem 0",
                                    fontSize: "0.95rem",
                                    fontWeight: 700,
                                    color: "#0f172a",
                                }}
                            >
                                {col.title}
                            </h4>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.45rem",
                                }}
                            >
                                {col.links.map((link) => (
                                    <li key={link.id}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveItem(link)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                color: "#475569",
                                                fontSize: "0.85rem",
                                                cursor: "pointer",
                                                textAlign: "left",
                                                fontFamily: "inherit",
                                            }}
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
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
                    }}
                >
                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        © {new Date().getFullYear()} Gamalion Digital. Todos los derechos reservados.
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        {paymentMethodsList.map((method) => (
                            <span
                                key={method}
                                style={{
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    color: "#475569",
                                    backgroundColor: "#f8fafc",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "4px",
                                    padding: "3px 8px",
                                }}
                            >
                                {method}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {activeItem && (
                <div
                    onClick={() => setActiveItem(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(15, 23, 42, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "1rem",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            maxWidth: "560px",
                            width: "100%",
                            padding: "1.5rem",
                            boxShadow: "0 20px 45px rgba(15, 23, 42, 0.2)",
                            maxHeight: "80vh",
                            overflowY: "auto",
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
                            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
                                {activeItem.label}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setActiveItem(null)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "1.1rem",
                                    color: "#64748b",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "0.9rem",
                                lineHeight: 1.6,
                                color: "#334155",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {activeItem.content || "Información disponible próximamente."}
                        </p>
                    </div>
                </div>
            )}
        </footer>
    );
}
