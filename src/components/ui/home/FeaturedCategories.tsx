import type { CategoryItem } from "../../../models/category";
import { featuredCategories as defaultCategories } from "../../../data/categoriesData";

export interface FeaturedCategoriesProps {
    title?: string;
    categories?: CategoryItem[];
    overlap?: boolean;
    onCategoryClick?: (category: CategoryItem) => void;
}

const renderCategoryIcon = (icon: string) => {
    switch (icon) {
        case "cpu":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                </svg>
            );
        case "gpu":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="6" />
                    <path d="M6 12h4M8 10v4" />
                    <circle cx="15" cy="11" r="1" fill="currentColor" />
                    <circle cx="18" cy="13" r="1" fill="currentColor" />
                </svg>
            );
        case "laptop":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <line x1="2" y1="20" x2="22" y2="20" />
                </svg>
            );
        case "storage":
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="7" rx="2" />
                    <rect x="2" y="13" width="20" height="7" rx="2" />
                    <circle cx="18" cy="7.5" r="1" fill="currentColor" />
                    <circle cx="18" cy="16.5" r="1" fill="currentColor" />
                </svg>
            );
        default:
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            );
    }
};

export default function FeaturedCategories({
    title = "Categorías Destacadas",
    categories = defaultCategories,
    overlap = false,
    onCategoryClick,
}: FeaturedCategoriesProps) {
    return (
        <section
            style={{
                width: "100%",
                padding: overlap ? "0 2rem 2.5rem 2rem" : "1rem 2rem 2.5rem 2rem",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "transparent",
                position: overlap ? "relative" : undefined,
                zIndex: overlap ? 3 : undefined,
                marginTop: overlap ? "-6rem" : undefined,
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1440px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "1.6rem",
                        fontWeight: 800,
                        color: "#0f172a",
                        textAlign: "center",
                        margin: "0 0 2rem 0",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {title}
                </h2>

                <div
                    style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => onCategoryClick?.(cat)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    onCategoryClick?.(cat);
                                }
                            }}
                            style={{
                                background: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                padding: "2rem 1rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textDecoration: "none",
                                cursor: "pointer",
                                boxSizing: "border-box",
                                transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                            }}
                        >
                            <div
                                style={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "50%",
                                    backgroundColor: "#eff6ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "1.1rem",
                                    color: "#2563eb",
                                    transition: "background-color 0.2s ease, transform 0.2s ease",
                                }}
                            >
                                {renderCategoryIcon(cat.icon)}
                            </div>
                            <span
                                style={{
                                    fontSize: "0.95rem",
                                    fontWeight: 700,
                                    color: "#0f172a",
                                    textAlign: "center",
                                    margin: 0,
                                    lineHeight: 1.3,
                                    transition: "color 0.2s ease",
                                }}
                            >
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
