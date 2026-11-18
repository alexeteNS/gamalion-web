import {
    Hero,
    HomeWidgets,
    FeaturedCategories,
    ProductSlider,
    PromoBanners,
    BrowsingHistorySection,
} from "../components/ui/home";
import {
    formatCurrencyMXN,
    isVisibleCategorySlug,
} from "../constants/storeConfig";
import type { CuratedSectionDto } from "../models/curated";
import type { ProductCardItem } from "../models/product";
import type { HomeStorefrontResponse } from "../models/storefront";
import type {
    HomeWidget,
    WidgetGridItem,
    WidgetSingleItem,
    WidgetListItem,
    WidgetSliderItem,
} from "../models/widget";

export interface HomePageProps {
    storefront: HomeStorefrontResponse | null;
    catalogProducts?: ProductCardItem[];
    isLoadingCatalog?: boolean;
    catalogError?: string | null;
    historyProducts?: ProductCardItem[];
    onNavigate?: (tabId: string) => void;
    onProductClick?: (product: ProductCardItem) => void;
    onAddToCart?: (product: ProductCardItem) => void;
    onFavoriteToggle?: (product: ProductCardItem) => void;
    onOpenSearchHistory?: () => void;
    onClearHistory?: () => void;
    onRetryCatalog?: () => void;
}

const SECTION_BADGE_LABELS: Record<string, string | undefined> = {
    ofertas: undefined,
    relevantes: "DESTACADOS",
    catalogo: undefined,
    mas_comprado: "LO MÁS COMPRADO",
    mejor_valorado: "MEJOR CALIFICADOS",
};

export default function HomePage({
    storefront,
    catalogProducts = [],
    isLoadingCatalog = false,
    catalogError = null,
    historyProducts = [],
    onNavigate,
    onProductClick,
    onAddToCart,
    onFavoriteToggle,
    onOpenSearchHistory,
    onClearHistory,
    onRetryCatalog,
}: HomePageProps) {
    const curatedSections = storefront?.curatedSections || [];
    const categorySliders = (storefront?.categorySliders || []).filter((s) =>
        isVisibleCategorySlug(s.category),
    );
    const categories = (storefront?.categories || []).filter((c) =>
        isVisibleCategorySlug(c.id),
    );
    const featuredCategories = (storefront?.featuredCategories || []).filter((c) =>
        isVisibleCategorySlug(c.id),
    );
    const promoBanners = (storefront?.promoBanners || []).filter((b) =>
        isVisibleCategorySlug(b.category),
    );
    const catalogEmpty = storefront ? storefront.catalogEmpty : false;

    const sectionMap = new Map<string, CuratedSectionDto>(
        curatedSections.map((sec) => [sec.slug, sec]),
    );

    const productLookup = new Map<string, ProductCardItem>();
    const categoryImageMap = new Map<string, string>();

    const indexProduct = (p: ProductCardItem) => {
        productLookup.set(String(p.id), p);
        if (p.category && p.imageUrl && !categoryImageMap.has(p.category)) {
            categoryImageMap.set(p.category, p.imageUrl);
        }
    };

    for (const p of catalogProducts) {
        indexProduct(p);
    }
    for (const slider of categorySliders) {
        for (const p of slider.products) {
            indexProduct(p);
        }
    }
    for (const section of curatedSections) {
        for (const p of section.products) {
            indexProduct(p);
        }
    }

    const buildDynamicWidgets = (): HomeWidget[] => {
        if (!storefront || storefront.catalogEmpty) {
            return [];
        }

        const ofertas = sectionMap.get("ofertas")?.products || [];
        const catalogoSec = sectionMap.get("catalogo")?.products || [];
        const relevantes = sectionMap.get("relevantes")?.products || [];
        const masComprado = sectionMap.get("mas_comprado")?.products || [];

        const gridCategories = categories
            .filter(
                (cat) => (cat.productCount || 0) > 0 && categoryImageMap.has(cat.id),
            )
            .slice(0, 4);

        const singleSpotlight = catalogoSec[0] || relevantes[0] || catalogProducts[0];
        const flashListItems: WidgetListItem[] = ofertas.slice(0, 3).map((prod) => ({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            originalPrice: prod.originalPrice ?? undefined,
            formattedPrice: formatCurrencyMXN(prod.price),
            formattedOriginalPrice: prod.originalPrice
                ? formatCurrencyMXN(prod.originalPrice)
                : undefined,
            imageUrl: prod.imageUrl,
            soldPercentage: Math.min(95, Math.max(40, (prod.purchaseCount || 0) + 55)),
            link: `/producto/${prod.id}`,
        }));

        const bestSellerSource = masComprado.length > 0 ? masComprado : relevantes;
        const bestSellerItems: WidgetSliderItem[] = bestSellerSource
            .slice(0, 3)
            .map((prod) => ({
                id: prod.id,
                title: prod.title,
                price: prod.price,
                formattedPrice: formatCurrencyMXN(prod.price),
                imageUrl: prod.imageUrl,
                link: `/producto/${prod.id}`,
            }));

        const widgets: HomeWidget[] = [];

        if (gridCategories.length > 0) {
            widgets.push({
                id: "featured-categories-grid",
                title: "Categorías Destacadas",
                type: "grid",
                linkText: `Explorar ${gridCategories[0].name.toLowerCase()} →`,
                linkUrl: `/categoria/${gridCategories[0].id}`,
                items: gridCategories.map((cat) => ({
                    id: `cat:${cat.id}`,
                    title: cat.name,
                    imageUrl: categoryImageMap.get(cat.id) || "",
                    link: `/categoria/${cat.id}`,
                })),
            });
        }

        if (singleSpotlight) {
            widgets.push({
                id: "catalog-spotlight",
                title: "Catálogo de Productos",
                type: "single",
                linkText: `Ver ${singleSpotlight.categoryLabel || "categoría"} →`,
                linkUrl: `/categoria/${singleSpotlight.category || "laptops"}`,
                item: {
                    id: singleSpotlight.id,
                    title: singleSpotlight.title,
                    badge: singleSpotlight.offerBadge || "CATÁLOGO",
                    imageUrl: singleSpotlight.imageUrl,
                    link: `/producto/${singleSpotlight.id}`,
                },
            });
        }

        if (flashListItems.length > 0) {
            const leadOffer = ofertas[0];
            widgets.push({
                id: "weekly-offers-list",
                title: "Ofertas Activas",
                type: "list",
                linkText: `Ver ${leadOffer?.categoryLabel?.toLowerCase() || "catálogo"} →`,
                linkUrl: `/categoria/${leadOffer?.category || categories[0]?.id || "laptops"}`,
                items: flashListItems,
            });
        }

        if (bestSellerItems.length > 0) {
            const leadTop = bestSellerSource[0];
            widgets.push({
                id: "top-bought-slider",
                title: "Lo Más Comprado",
                type: "slider",
                linkText: `Ver ${leadTop?.categoryLabel?.toLowerCase() || "catálogo"} →`,
                linkUrl: `/categoria/${leadTop?.category || categories[0]?.id || "laptops"}`,
                items: bestSellerItems,
            });
        }

        return widgets;
    };

    const dynamicWidgets = buildDynamicWidgets();

    const handleWidgetLinkClick = (widget: HomeWidget) => {
        const target = widget.linkUrl?.replace("/categoria/", "");
        if (target && !target.startsWith("/")) {
            onNavigate?.(target);
        } else {
            onNavigate?.("laptops");
        }
    };

    const handleWidgetItemClick = (
        item: WidgetGridItem | WidgetSingleItem | WidgetListItem | WidgetSliderItem,
    ) => {
        if (item.id.startsWith("cat:")) {
            onNavigate?.(item.id.slice(4));
            return;
        }
        const matchedProduct = productLookup.get(String(item.id));
        if (matchedProduct) {
            onProductClick?.(matchedProduct);
            return;
        }
        const targetCategory = item.link?.startsWith("/categoria/")
            ? item.link.replace("/categoria/", "")
            : "laptops";
        onNavigate?.(targetCategory);
    };

    const resolveCuratedViewAllCategory = (section: CuratedSectionDto): string => {
        return section.products[0]?.category || categories[0]?.id || "laptops";
    };

    const topCuratedSlugs = ["ofertas", "relevantes", "inicio_semana"];
    const bottomCuratedSlugs = ["mas_comprado", "mejor_valorado"];

    const topCuratedSections = topCuratedSlugs
        .map((slug) => sectionMap.get(slug))
        .filter((s): s is CuratedSectionDto => Boolean(s));
    const bottomCuratedSections = bottomCuratedSlugs
        .map((slug) => sectionMap.get(slug))
        .filter((s): s is CuratedSectionDto => Boolean(s));

    const firstHalfCategorySliders = categorySliders.slice(0, 2);
    const secondHalfCategorySliders = categorySliders.slice(2);

    const primaryCategoryId =
        categories.find((c) => (c.productCount || 0) > 0)?.id ||
        categories[0]?.id ||
        "laptops";
    const secondaryCategory =
        categories.find((c) => c.id === "componentes") ||
        categories.find((c) => (c.productCount || 0) > 0) ||
        categories[0];

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
                onCatalogClick={() => onNavigate?.(primaryCategoryId)}
                customPcButtonText={`Ver ${secondaryCategory?.name || "Componentes"}`}
                onCustomPcClick={() =>
                    onNavigate?.(secondaryCategory?.id || "componentes")
                }
            />

            {dynamicWidgets.length > 0 && (
                <HomeWidgets
                    widgets={dynamicWidgets}
                    overlap
                    onLinkClick={handleWidgetLinkClick}
                    onItemClick={handleWidgetItemClick}
                />
            )}

            <div
                className="site-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 3,
                    marginTop: dynamicWidgets.length === 0 ? "2rem" : undefined,
                }}
            >
                {catalogEmpty && !isLoadingCatalog && !catalogError && (
                    <section
                        style={{
                            width: "100%",
                            maxWidth: "1440px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #cbd5e1",
                            borderRadius: "20px",
                            padding: "3rem 2rem",
                            marginBottom: "2rem",
                            textAlign: "center",
                            boxSizing: "border-box",
                            boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)",
                        }}
                    >
                        <h2
                            style={{
                                margin: "0 0 0.65rem 0",
                                fontSize: "1.5rem",
                                fontWeight: 800,
                                color: "#0f172a",
                            }}
                        >
                            Sin producto
                        </h2>
                        <p
                            style={{
                                margin: "0 auto 1.25rem auto",
                                maxWidth: "560px",
                                fontSize: "0.98rem",
                                color: "#475569",
                                lineHeight: 1.55,
                            }}
                        >
                            No hay productos disponibles en el catálogo de la base de datos por el momento.
                        </p>
                        {onRetryCatalog && (
                            <button
                                type="button"
                                onClick={onRetryCatalog}
                                style={{
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "0.65rem 1.4rem",
                                    fontSize: "0.9rem",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                }}
                            >
                                Consultar catálogo de nuevo
                            </button>
                        )}
                    </section>
                )}

                {topCuratedSections.map((section) => (
                    <ProductSlider
                        key={section.slug}
                        title={section.title}
                        subtitle={`${section.subtitle} · REV. ${section.refreshVersion}`}
                        headerBadge={SECTION_BADGE_LABELS[section.slug] || "CURADO"}
                        emptyMessage="Sin producto"
                        category={resolveCuratedViewAllCategory(section)}
                        products={section.products}
                        limit={8}
                        viewAllText="Explorar categoría"
                        onViewAll={(cat) => onNavigate?.(cat)}
                        onProductClick={onProductClick}
                        onAddToCart={onAddToCart}
                        onFavoriteToggle={onFavoriteToggle}
                    />
                ))}

                {firstHalfCategorySliders.map((slider) => (
                    <ProductSlider
                        key={slider.id}
                        title={slider.title}
                        subtitle={slider.subtitle}
                        category={slider.category}
                        products={slider.products}
                        viewAllText={slider.viewAllText}
                        emptyMessage="Sin producto"
                        onViewAll={(cat) => onNavigate?.(cat)}
                        onProductClick={onProductClick}
                        onAddToCart={onAddToCart}
                        onFavoriteToggle={onFavoriteToggle}
                    />
                ))}
            </div>

            {!catalogEmpty && promoBanners.length > 0 && (
                <PromoBanners
                    banners={promoBanners}
                    onBannerClick={(cat) => onNavigate?.(cat)}
                />
            )}

            {featuredCategories.length > 0 && (
                <FeaturedCategories
                    categories={featuredCategories}
                    onCategoryClick={(cat) => onNavigate?.(cat.id)}
                />
            )}

            <div
                className="site-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 3,
                }}
            >
                {bottomCuratedSections.map((section) => (
                    <ProductSlider
                        key={section.slug}
                        title={section.title}
                        subtitle={`${section.subtitle} · REV. ${section.refreshVersion}`}
                        headerBadge={SECTION_BADGE_LABELS[section.slug]}
                        emptyMessage="Sin producto"
                        category={resolveCuratedViewAllCategory(section)}
                        products={section.products}
                        limit={8}
                        viewAllText="Explorar categoría"
                        onViewAll={(cat) => onNavigate?.(cat)}
                        onProductClick={onProductClick}
                        onAddToCart={onAddToCart}
                        onFavoriteToggle={onFavoriteToggle}
                    />
                ))}

                {secondHalfCategorySliders.map((slider) => (
                    <ProductSlider
                        key={slider.id}
                        title={slider.title}
                        subtitle={slider.subtitle}
                        category={slider.category}
                        products={slider.products}
                        viewAllText={slider.viewAllText}
                        emptyMessage="Sin producto"
                        onViewAll={(cat) => onNavigate?.(cat)}
                        onProductClick={onProductClick}
                        onAddToCart={onAddToCart}
                        onFavoriteToggle={onFavoriteToggle}
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
