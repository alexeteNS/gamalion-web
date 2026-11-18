import type { CategoryProductItem } from "../../../models/categoryPage";
import ProductHorizontalCard from "./ProductHorizontalCard";

export interface ProductHorizontalListProps {
    products: CategoryProductItem[];
    categoryTotalCount?: number;
    categoryLabel?: string;
    onProductClick?: (product: CategoryProductItem) => void;
}

export default function ProductHorizontalList({
    products,
    categoryTotalCount,
    categoryLabel,
    onProductClick,
}: ProductHorizontalListProps) {
    if (products.length === 0) {
        const isCategoryActuallyEmpty = categoryTotalCount === 0;
        return (
            <div
                style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "40px 28px",
                    textAlign: "center",
                    color: "#475569",
                }}
            >
                <div
                    style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginBottom: "0.4rem",
                    }}
                >
                    Sin producto
                </div>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>
                    {isCategoryActuallyEmpty
                        ? `No hay productos registrados en ${categoryLabel || "esta categoría"} en la base de datos.`
                        : "Ningún producto coincide con los filtros seleccionados."}
                </p>
            </div>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
            }}
        >
            {products.map(product => (
                <ProductHorizontalCard
                    key={product.id}
                    product={product}
                    onClick={onProductClick}
                />
            ))}
        </div>
    );
}
