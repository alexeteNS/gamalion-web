import { useState } from "react";

export interface NavItem {
    id: string;
    label: string;
    isSpecial?: boolean;
}

export interface HeaderProps {
    brandFirst?: string;
    brandSecond?: string;
    cartCount?: number;
    initialTab?: string;
    onTabChange?: (tabId: string) => void;
    onSearchClick?: () => void;
    onCartClick?: () => void;
}

const defaultNavItems: NavItem[] = [
    { id: "inicio", label: "Inicio" },
    { id: "laptops", label: "Laptops" },
    { id: "componentes", label: "Componentes" },
    { id: "armado-pc", label: "Armado de PC" },
    { id: "ofertas", label: "Ofertas", isSpecial: true },
];

export default function Header({
    brandFirst = "Gamalion",
    brandSecond = "Digital",
    cartCount = 2,
    initialTab = "inicio",
    onTabChange,
    onSearchClick,
    onCartClick,
}: HeaderProps) {
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleTabSelect = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                width: "100%",
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                display: "flex",
                justifyContent: "center",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1280px",
                    height: "70px",
                    padding: "0 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    <div
                        onClick={() => handleTabSelect("inicio")}
                        role="button"
                        tabIndex={0}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            cursor: "pointer",
                            userSelect: "none",
                        }}
                    >
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "8px",
                                backgroundColor: "#2563eb",
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                <rect x="9" y="9" width="6" height="6" />
                                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                            </svg>
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", fontSize: "1.25rem", fontWeight: 800 }}>
                            <span style={{ color: "#0f172a" }}>{brandFirst}</span>
                            <span style={{ color: "#2563eb" }}>{brandSecond}</span>
                        </div>
                    </div>

                    <nav style={{ display: "flex", alignItems: "center" }}>
                        <ul
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                            }}
                        >
                            {defaultNavItems.map(item => {
                                const isActive = activeTab === item.id;
                                return (
                                    <li key={item.id}>
                                        <button
                                            type="button"
                                            onClick={() => handleTabSelect(item.id)}
                                            style={{
                                                background: isActive ? "#eff6ff" : "none",
                                                border: "none",
                                                padding: "0.5rem 0.85rem",
                                                borderRadius: "6px",
                                                fontSize: "0.92rem",
                                                fontWeight: isActive ? 700 : 500,
                                                color: item.isSpecial
                                                    ? "#ef4444"
                                                    : isActive
                                                    ? "#2563eb"
                                                    : "#475569",
                                                cursor: "pointer",
                                                transition: "all 0.15s ease",
                                                fontFamily: "inherit",
                                            }}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button
                        type="button"
                        aria-label="Buscar"
                        onClick={onSearchClick}
                        style={{
                            background: "none",
                            border: "none",
                            padding: "0.5rem",
                            borderRadius: "50%",
                            color: "#334155",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        aria-label="Carrito de compras"
                        onClick={onCartClick}
                        style={{
                            position: "relative",
                            background: "none",
                            border: "none",
                            padding: "0.5rem",
                            borderRadius: "50%",
                            color: "#334155",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: "0px",
                                    right: "0px",
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    fontSize: "0.7rem",
                                    fontWeight: 800,
                                    minWidth: "18px",
                                    height: "18px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
