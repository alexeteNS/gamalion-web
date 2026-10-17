import { useState } from "react";
import {
    CategorySidebarFilters,
    ProductHorizontalList,
} from "../components/ui/category";
import {
    categoryFiltersData,
    categoryProductsData,
} from "../data/categoryPageData";
import type { CategoryProductItem } from "../models/categoryPage";

export interface CategoryPageProps {
    category: string;
    onProductClick?: (product: CategoryProductItem) => void;
}

export default function CategoryPage({
    category,
    onProductClick,
}: CategoryPageProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(30000);

    const filters = categoryFiltersData[category] || categoryFiltersData.laptops;
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
        setMaxPrice(30000);
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

    return (
        <main
            style={{
                width: "100%",
                flex: 1,
                backgroundColor: "#f8fafc",
                padding: "24px 0 60px 0",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    maxWidth: "1240px",
                    margin: "0 auto",
                    padding: "0 24px",
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
                    Inicio &gt; Categoría &gt; <strong style={{ color: "#0f172a", textTransform: "capitalize" }}>{category}</strong>
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
