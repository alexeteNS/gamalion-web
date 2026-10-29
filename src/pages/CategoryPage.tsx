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
                padding: "24px 0 60px 0",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    maxWidth: "1440px",
                    margin: "0 auto",
                    padding: "0 2rem",
                    boxSizing: "border-box",
                }}
            >
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

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "250px 1fr",
                        gap: "20px",
                        alignItems: "start",
                    }}
                >
                    <CategorySidebarFilters
                        filters={filters}
                        selectedValues={selectedValues}
                        maxPrice={maxPrice}
                        onToggleOption={handleToggleOption}
                        onPriceChange={setMaxPrice}
                        onClearFilters={handleClearFilters}
                    />

                    <ProductHorizontalList
                        products={filteredProducts}
                        onProductClick={onProductClick}
                    />
                </div>
            </div>
        </main>
    );
}
