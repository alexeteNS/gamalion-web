import { useState } from "react";
import type { FilterConfig } from "../../../models/categoryPage";

export interface FilterBoxProps {
    filter: FilterConfig;
    selectedValues: string[];
    maxPrice?: number;
    onToggleOption: (value: string) => void;
    onPriceChange?: (price: number) => void;
}

export default function FilterBox({
    filter,
    selectedValues,
    maxPrice,
    onToggleOption,
    onPriceChange,
}: FilterBoxProps) {
    const [showAll, setShowAll] = useState(false);
    const [searchText, setSearchText] = useState("");

    const options = filter.options || [];

    const filteredOptions = searchText
        ? options.filter(opt => opt.label.toLowerCase().includes(searchText.toLowerCase()))
        : options;

    const visibleOptions = showAll ? filteredOptions : filteredOptions.slice(0, 5);

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "16px",
                boxSizing: "border-box",
                width: "100%",
            }}
        >
            <div
                style={{
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "10px",
                    marginBottom: "12px",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#0f172a",
                    }}
                >
                    {filter.title}
                </h3>
            </div>

            {filter.type === "checklist" && (
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "6px 10px",
                        marginBottom: "10px",
                        fontSize: "13px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        boxSizing: "border-box",
                    }}
                />
            )}

            {filter.type === "words" && (
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {visibleOptions.map(opt => {
                        const isSelected = selectedValues.includes(opt.value);
                        return (
                            <li key={opt.value}>
                                <button
                                    type="button"
                                    onClick={() => onToggleOption(opt.value)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        fontSize: "14px",
                                        color: isSelected ? "#2563eb" : "#475569",
                                        fontWeight: isSelected ? 700 : 400,
                                        cursor: "pointer",
                                        textAlign: "left",
                                    }}
                                >
                                    {opt.label} {opt.count !== undefined ? `(${opt.count})` : ""}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}

            {(filter.type === "checkbox" || filter.type === "checklist") && (
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {visibleOptions.map(opt => {
                        const isChecked = selectedValues.includes(opt.value);
                        return (
                            <li key={opt.value}>
                                <label
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        fontSize: "14px",
                                        color: "#475569",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => onToggleOption(opt.value)}
                                    />
                                    <span>
                                        {opt.label} {opt.count !== undefined ? `(${opt.count})` : ""}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            )}

            {filter.type === "radio" && (
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {visibleOptions.map(opt => {
                        const isSelected = selectedValues.includes(opt.value);
                        return (
                            <li key={opt.value}>
                                <label
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        fontSize: "14px",
                                        color: "#475569",
                                        cursor: "pointer",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name={filter.id}
                                        checked={isSelected}
                                        onChange={() => onToggleOption(opt.value)}
                                    />
                                    <span>
                                        {opt.label} {opt.count !== undefined ? `(${opt.count})` : ""}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            )}

            {filter.type === "range" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input
                        type="range"
                        min={filter.min || 0}
                        max={filter.max || 50000}
                        step={500}
                        value={maxPrice || filter.max || 50000}
                        onChange={e => onPriceChange?.(Number(e.target.value))}
                        style={{ width: "100%", cursor: "pointer" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b" }}>
                        <span>${(filter.min || 0).toLocaleString("en-US")}</span>
                        <span style={{ fontWeight: 700, color: "#0f172a" }}>
                            Hasta ${(maxPrice || filter.max || 50000).toLocaleString("en-US")}
                        </span>
                    </div>
                </div>
            )}

            {filter.type !== "range" && filteredOptions.length > 5 && (
                <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    style={{
                        marginTop: "10px",
                        background: "none",
                        border: "none",
                        padding: 0,
                        fontSize: "13px",
                        color: "#64748b",
                        cursor: "pointer",
                    }}
                >
                    {showAll ? "Ver menos..." : "Ver más..."}
                </button>
            )}
        </div>
    );
}
