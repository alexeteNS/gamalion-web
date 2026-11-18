import type { FilterConfig } from "../../../models/categoryPage";
import FilterBox from "./FilterBox";

export interface CategorySidebarFiltersProps {
    filters: FilterConfig[];
    selectedValues: string[];
    maxPrice?: number;
    onToggleOption: (value: string) => void;
    onPriceChange: (price: number) => void;
    onClearFilters: () => void;
}

export default function CategorySidebarFilters({
    filters,
    selectedValues,
    maxPrice,
    onToggleOption,
    onPriceChange,
    onClearFilters,
}: CategorySidebarFiltersProps) {
    return (
        <aside
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
            }}
        >
            {selectedValues.length > 0 && (
                <button
                    type="button"
                    onClick={onClearFilters}
                    style={{
                        padding: "8px 12px",
                        backgroundColor: "#eff6ff",
                        color: "#2563eb",
                        border: "1px solid #bfdbfe",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Limpiar filtros ({selectedValues.length})
                </button>
            )}

            {filters.map(filter => (
                <FilterBox
                    key={filter.id}
                    filter={filter}
                    selectedValues={selectedValues}
                    maxPrice={maxPrice}
                    onToggleOption={onToggleOption}
                    onPriceChange={onPriceChange}
                />
            ))}
        </aside>
    );
}
