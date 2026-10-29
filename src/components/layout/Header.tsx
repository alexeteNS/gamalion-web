import { useState } from "react";
import gamalionLogo from "../../assets/gamalion-logo.png";
import { getTabUrl, isPlainLeftClick } from "../../data/urlRouter";

export interface NavItem {
    id: string;
    label: string;
}

export interface HeaderProps {
    brandFirst?: string;
    brandSecond?: string;
    cartCount?: number;
    initialTab?: string;
    isSearchOpen?: boolean;
    searchQuery?: string;
    onSearchQueryChange?: (value: string) => void;
    onTabChange?: (tabId: string) => void;
    onSearchClick?: () => void;
    onCartClick?: () => void;
}

const defaultNavItems: NavItem[] = [
    { id: "inicio", label: "Inicio" },
    { id: "laptops", label: "Laptops" },
    { id: "monitores", label: "Monitores" },
    { id: "perifericos", label: "Periféricos" },
];

const extraCategoryItems: NavItem[] = [
    { id: "componentes", label: "Componentes" },
    { id: "procesadores", label: "Procesadores" },
    { id: "tarjetas-de-video", label: "Tarjetas de Video" },
    { id: "almacenamiento", label: "Almacenamiento" },
    { id: "armado-pc", label: "Armado de PC" },
];

export default function Header({
    brandFirst = "Gamalion",
    brandSecond = "Digital",
    cartCount = 2,
    initialTab = "inicio",
    isSearchOpen = false,
    searchQuery = "",
    onSearchQueryChange,
    onTabChange,
    onSearchClick,
    onCartClick,
}: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleTabSelect = (e: React.MouseEvent, tabId: string) => {
        if (!isPlainLeftClick(e)) return;
        e.preventDefault();
        setIsDropdownOpen(false);
        onTabChange?.(tabId);
    };

    const handleCartLinkClick = (e: React.MouseEvent) => {
        if (!isPlainLeftClick(e)) return;
        e.preventDefault();
        setIsDropdownOpen(false);
        onCartClick?.();
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
                    maxWidth: "1440px",
                    height: "70px",
                    padding: "0 2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isSearchOpen ? "1.1rem" : "2.5rem",
                        transition: "gap 0.25s ease",
                    }}
                >
                    <a
                        href={getTabUrl("inicio")}
                        onClick={e => handleTabSelect(e, "inicio")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            cursor: "pointer",
                            userSelect: "none",
                            flexShrink: 0,
                            textDecoration: "none",
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
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >
                            <img
                                src={gamalionLogo}
                                alt="Gamalion Digital Logo"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", fontSize: "1.25rem", fontWeight: 800 }}>
                            <span style={{ color: "#0f172a" }}>{brandFirst}</span>
                            <span style={{ color: "#2563eb" }}>{brandSecond}</span>
                        </div>
                    </a>

                    <nav
                        style={{
                            display: "flex",
                            alignItems: "center",
                            transform: isSearchOpen ? "translateX(-8px)" : "translateX(0)",
                            transition: "transform 0.25s ease",
                        }}
                    >
                        <ul
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: isSearchOpen ? "0.2rem" : "0.5rem",
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                                transition: "gap 0.25s ease",
                            }}
                        >
                            {defaultNavItems.map(item => {
                                const isActive = initialTab === item.id;
                                return (
                                    <li key={item.id}>
                                        <a
                                            href={getTabUrl(item.id)}
                                            onClick={e => handleTabSelect(e, item.id)}
                                            style={{
                                                display: "inline-block",
                                                textDecoration: "none",
                                                background: isActive ? "#eff6ff" : "none",
                                                padding: isSearchOpen ? "0.45rem 0.65rem" : "0.5rem 0.85rem",
                                                borderRadius: "6px",
                                                fontSize: "0.9rem",
                                                fontWeight: isActive ? 700 : 500,
                                                color: isActive ? "#2563eb" : "#475569",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                fontFamily: "inherit",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}

                            <li style={{ position: "relative" }}>
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    style={{
                                        background:
                                            isDropdownOpen ||
                                            extraCategoryItems.some(c => c.id === initialTab)
                                                ? "#eff6ff"
                                                : "none",
                                        border: "none",
                                        padding: isSearchOpen ? "0.45rem 0.65rem" : "0.5rem 0.85rem",
                                        borderRadius: "6px",
                                        fontSize: "0.9rem",
                                        fontWeight: extraCategoryItems.some(c => c.id === initialTab)
                                            ? 700
                                            : 500,
                                        color: extraCategoryItems.some(c => c.id === initialTab)
                                            ? "#2563eb"
                                            : "#475569",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontFamily: "inherit",
                                        whiteSpace: "nowrap",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <span>Más categorías</span>
                                    <span style={{ fontSize: "0.75rem" }}>▾</span>
                                </button>

                                {isDropdownOpen && (
                                    <ul
                                        style={{
                                            position: "absolute",
                                            top: "110%",
                                            left: 0,
                                            minWidth: "190px",
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e2e8f0",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                            listStyle: "none",
                                            margin: 0,
                                            padding: "6px",
                                            zIndex: 200,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "2px",
                                        }}
                                    >
                                        {extraCategoryItems.map(cat => {
                                            const isCatActive = initialTab === cat.id;
                                            return (
                                                <li key={cat.id}>
                                                    <a
                                                        href={getTabUrl(cat.id)}
                                                        onClick={e => handleTabSelect(e, cat.id)}
                                                        style={{
                                                            display: "block",
                                                            textDecoration: "none",
                                                            width: "100%",
                                                            textAlign: "left",
                                                            background: isCatActive ? "#eff6ff" : "none",
                                                            padding: "8px 12px",
                                                            borderRadius: "6px",
                                                            fontSize: "0.88rem",
                                                            fontWeight: isCatActive ? 700 : 500,
                                                            color: isCatActive ? "#2563eb" : "#334155",
                                                            cursor: "pointer",
                                                            fontFamily: "inherit",
                                                            boxSizing: "border-box",
                                                        }}
                                                    >
                                                        {cat.label}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: isSearchOpen ? 1 : "unset", justifyContent: "flex-end", marginLeft: isSearchOpen ? "1rem" : 0 }}>
                    {isSearchOpen ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                width: "100%",
                                maxWidth: "560px",
                                backgroundColor: "#f8fafc",
                                border: "1px solid #cbd5e1",
                                borderRadius: "999px",
                                padding: "7px 16px",
                                boxSizing: "border-box",
                            }}
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>

                            <input
                                type="text"
                                autoFocus
                                placeholder="Buscar laptops, monitores..."
                                value={searchQuery}
                                onChange={e => onSearchQueryChange?.(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: "none",
                                    outline: "none",
                                    backgroundColor: "transparent",
                                    fontSize: "0.88rem",
                                    color: "#0f172a",
                                }}
                            />

                            <button
                                type="button"
                                onClick={onSearchClick}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: "2px",
                                    color: "#64748b",
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
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
                    )}

                    <a
                        href={getTabUrl("carrito")}
                        aria-label="Carrito de compras"
                        onClick={handleCartLinkClick}
                        style={{
                            position: "relative",
                            background: "none",
                            padding: "0.5rem",
                            borderRadius: "50%",
                            color: "#334155",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            textDecoration: "none",
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
                    </a>
                </div>
            </div>
        </header>
    );
}
