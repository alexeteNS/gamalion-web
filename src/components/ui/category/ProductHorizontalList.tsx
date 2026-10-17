import type { CategoryProductItem } from "../../../models/categoryPage";
import ProductHorizontalCard from "./ProductHorizontalCard";

export interface ProductHorizontalListProps {
    products: CategoryProductItem[];
    onProductClick?: (product: CategoryProductItem) => void;
}

export default function ProductHorizontalList({
    products,
    onProductClick,
}: ProductHorizontalListProps) {
    if (products.length === 0) {
        return (
            <div
                style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "32px",
                    textAlign: "center",
                    color: "#64748b",
                }}
            >
                No hay productos con los filtros seleccionados.
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
