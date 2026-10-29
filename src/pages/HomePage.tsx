import {
    Hero,
    HomeWidgets,
    FeaturedCategories,
    ProductSlider,
    PromoBanners,
    BrowsingHistorySection,
} from "../components/ui/home";
import { allProducts, categorySlidersData } from "../data/productsData";
import type { ProductCardItem } from "../models/product";
import type {
    HomeWidget,
    WidgetGridItem,
    WidgetSingleItem,
    WidgetListItem,
    WidgetSliderItem,
} from "../models/widget";

export interface HomePageProps {
    historyProducts?: ProductCardItem[];
    onNavigate?: (tabId: string) => void;
    onProductClick?: (product: ProductCardItem) => void;
    onAddToCart?: (product: ProductCardItem) => void;
    onOpenSearchHistory?: () => void;
    onClearHistory?: () => void;
}

export default function HomePage({
    historyProducts = [],
    onNavigate,
    onProductClick,
    onAddToCart,
    onOpenSearchHistory,
    onClearHistory,
}: HomePageProps) {
    const handleWidgetLinkClick = (widget: HomeWidget) => {
        if (widget.id === "elite-components") {
            onNavigate?.("laptops");
        } else if (widget.id === "notebooks-gamer") {
            onNavigate?.("laptops");
        } else {
            onNavigate?.("perifericos");
        }
    };

    const handleWidgetItemClick = (
        item: WidgetGridItem | WidgetSingleItem | WidgetListItem | WidgetSliderItem
    ) => {
        if (item.id === "brand-nvidia") {
            onNavigate?.("tarjetas-de-video");
            return;
        }
        if (item.id === "brand-logitech") {
            onNavigate?.("perifericos");
            return;
        }
        if (item.id === "brand-asus" || item.id === "brand-lenovo") {
            onNavigate?.("laptops");
            return;
        }

        const matchedProduct = allProducts.find(p =>
            p.title.toLowerCase().includes(item.title.toLowerCase().split(" ")[0])
        );
        if (matchedProduct) {
            onProductClick?.(matchedProduct);
        } else {
            onNavigate?.("laptops");
        }
    };

    const firstHalfSliders = categorySlidersData.slice(0, 2);
    const secondHalfSliders = categorySlidersData.slice(2);

    return (
        <main
            style={{
                width: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f2f6fb",
                boxSizing: "border-box",
            }}
        >
            <Hero
                onCatalogClick={() => onNavigate?.("laptops")}
                onCustomPcClick={() => onNavigate?.("armado-pc")}
            />

            <HomeWidgets
                overlap
                onLinkClick={handleWidgetLinkClick}
                onItemClick={handleWidgetItemClick}
            />

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0 2rem",
                    boxSizing: "border-box",
                    position: "relative",
                    zIndex: 3,
                }}
            >
                {firstHalfSliders.map((slider) => (
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

            <PromoBanners
                onBannerClick={(cat) => onNavigate?.(cat)}
            />

            <FeaturedCategories
                onCategoryClick={(cat) => onNavigate?.(cat.id)}
            />

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0 2rem",
                    boxSizing: "border-box",
                    position: "relative",
                    zIndex: 3,
                }}
            >
                {secondHalfSliders.map((slider) => (
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

            <BrowsingHistorySection
                products={historyProducts}
                onProductClick={onProductClick}
                onOpenSearchHistory={onOpenSearchHistory}
                onClearHistory={onClearHistory}
            />
        </main>
    );
}
