import { useState } from "react";
import {
    CategorySidebarFilters,
    ProductHorizontalList,
} from "../components/ui/category";
import {
    categoryFiltersData,
    categoryProductsData,
} from "../data/categoryPageData";
import { getTabUrl, isPlainLeftClick } from "../data/urlRouter";
import type { CategoryProductItem } from "../models/categoryPage";

export interface CategoryPageProps {
    category: string;
    onProductClick?: (product: CategoryProductItem) => void;
    onNavigateHome?: () => void;
}

const categoryLabels: Record<string, string> = {
    laptops: "Laptops",
    monitores: "Monitores",
    perifericos: "Periféricos",
    componentes: "Componentes",
    procesadores: "Procesadores",
    "tarjetas-de-video": "Tarjetas de Video",
    almacenamiento: "Almacenamiento",
    "armado-pc": "Armado de PC",
};

export default function CategoryPage({
    category,
    onProductClick,
    onNavigateHome,
}: CategoryPageProps) {
    const filters = categoryFiltersData[category] || categoryFiltersData.laptops;
    const priceFilter = filters.find(f => f.type === "range");
    const defaultMaxPrice = priceFilter?.max || 45000;

    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(defaultMaxPrice);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const categoryProducts = categoryProductsData.filter(
        p => p.category === category
    );

    const handleToggleOption = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(v => v !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    const handleClearFilters = () => {
        setSelectedValues([]);
        setMaxPrice(defaultMaxPrice);
    };

    const filteredProducts = categoryProducts.filter(product => {
        if (product.price > maxPrice) {
            return false;
        }

        if (selectedValues.length === 0) {
            return true;
        }

        const fullText = `${product.brand} ${product.title} ${product.specs.join(" ")}`.toLowerCase();
        return selectedValues.some(val =>
            fullText.includes(val.toLowerCase())
        );
    });

    const categoryTitle = categoryLabels[category] || category;

    return (
        <main
            style={{
                width: "100%",
                flex: 1,
                backgroundColor: "#f2f6fb",
                padding: "20px 0 60px 0",
                boxSizing: "border-box",
            }}
        >
            <div className="site-container">
                <p
                    style={{
                        margin: "0 0 16px 0",
                        fontSize: "14px",
                        color: "#64748b",
                    }}
                >
                    <a
                        href={getTabUrl("inicio")}
                        onClick={e => {
                            if (isPlainLeftClick(e)) {
                                e.preventDefault();
                                onNavigateHome?.();
                            }
                        }}
                        style={{
                            cursor: "pointer",
                            color: "#2563eb",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        Inicio
                    </a>{" "}
                    &gt; Categoría &gt;{" "}
                    <strong style={{ color: "#0f172a" }}>{categoryTitle}</strong>
                </p>

                <button
                    type="button"
                    className="category-mobile-filter-btn"
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                        <line x1="1" y1="14" x2="7" y2="14" />
                        <line x1="9" y1="8" x2="15" y2="8" />
                        <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                    <span>
                        {isMobileFiltersOpen
                            ? "Ocultar filtros"
                            : `Filtrar productos (${selectedValues.length > 0 ? selectedValues.length : "Todos"})`}
                    </span>
                </button>

                <div className="category-layout-grid">
                    <div className={`category-sidebar-desktop ${isMobileFiltersOpen ? "is-open-mobile" : ""}`}>
                        <CategorySidebarFilters
                            filters={filters}
                            selectedValues={selectedValues}
                            maxPrice={maxPrice}
                            onToggleOption={handleToggleOption}
                            onPriceChange={setMaxPrice}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    <ProductHorizontalList
                        products={filteredProducts}
                        onProductClick={onProductClick}
                    />
                </div>
            </div>
        </main>
    );
}
