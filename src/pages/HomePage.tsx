import { Hero, ProductSlider } from "../components/ui/home";
import { categorySlidersData } from "../data/productsData";
import type { ProductCardItem } from "../models/product";

export interface HomePageProps {
    onNavigate?: (tabId: string) => void;
    onProductClick?: (product: ProductCardItem) => void;
    onAddToCart?: (product: ProductCardItem) => void;
}

export default function HomePage({
    onNavigate,
    onProductClick,
    onAddToCart,
}: HomePageProps) {
    return (
        <main
            style={{
                width: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
            }}
        >
            <Hero
                onCatalogClick={() => onNavigate?.("laptops")}
                onCustomPcClick={() => onNavigate?.("armado-pc")}
            />

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0 1.5rem 4rem 1.5rem",
                    boxSizing: "border-box",
                    marginTop: "-15rem",
                    position: "relative",
                    zIndex: 3,
                }}
            >
                {categorySlidersData.map((slider) => (
                    <ProductSlider
                        key={slider.id}
                        title={slider.title}
                        subtitle={slider.subtitle}
                        category={slider.category}
                        products={slider.products}
                        viewAllText={slider.viewAllText}
                        onViewAll={(cat) => onNavigate?.(cat)}
                        onProductClick={onProductClick}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </main>
    );
}
