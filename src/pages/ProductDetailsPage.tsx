import { useEffect, useState } from "react";
import RectImage from "../components/ui/componentDetailsProducts/RectImage";
import Accordion from "../components/ui/componentDetailsProducts/Accordion";
import ColorSelector, { type ColorItem } from "../components/ui/componentDetailsProducts/ColorSelector";
import RatingSummary from "../components/ui/componentDetailsProducts/RatingSummary";
import ReviewCard from "../components/ui/componentDetailsProducts/ReviewCard";
import ProductSlider from "../components/ui/home/ProductSlider";
import WhatsAppModal from "../components/ui/WhatsAppModal";
import AsyncStatusBanner from "../components/ui/AsyncStatusBanner";
import type { RatingStats, ReviewItem } from "../models/review";
import type { ProductCardItem, ProductDetailsModel } from "../models/product";
import type { CategoryProductItem } from "../models/categoryPage";
import {
    buildProductDetails,
    calculateRatingStats,
    getRelatedProducts,
    initialReviews,
    WHATSAPP_PHONE,
} from "../data/productBackend";
import { getTabUrl, isPlainLeftClick } from "../data/urlRouter";
import { ApiRequestError } from "../services/apiConfig";
import { fetchProductDetailsById } from "../services/productsService";
import "./ProductDetailsPage.css";

export interface ProductDetailsProps {
    productIdOrSlug?: string | null;
    selectedProduct?: ProductCardItem | CategoryProductItem | null;
    onAddToCart?: (product: ProductDetailsModel, quantity: number, selectedColor?: string) => void;
    onFavoriteToggle?: (product: ProductDetailsModel) => void;
    onFavoriteSynced?: (productId: string, isFavorite: boolean, favoriteCount: number) => void;
    onNavigate?: (tab: string) => void;
    onProductClick?: (product: ProductCardItem) => void;
}

const emptyRatingStats: RatingStats = {
    averageRating: 0,
    totalReviews: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    positivePercentage: 0,
};

function getColorValue(item?: string | ColorItem): string {
    if (!item) return "";
    return typeof item === "string" ? item : item.value;
}

export default function ProductDetails({
    productIdOrSlug,
    selectedProduct,
    onAddToCart,
    onFavoriteToggle,
    onFavoriteSynced,
    onNavigate,
    onProductClick,
}: ProductDetailsProps) {
    const targetLookup = productIdOrSlug || (selectedProduct ? String(selectedProduct.id) : null);

    const [product, setProduct] = useState<ProductDetailsModel | null>(() =>
        selectedProduct ? buildProductDetails(selectedProduct) : null,
    );
    const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
    const [ratingStats, setRatingStats] = useState<RatingStats>(() =>
        calculateRatingStats(initialReviews),
    );
    const [isLoading, setIsLoading] = useState(Boolean(targetLookup && !selectedProduct));
    const [isNotFound, setIsNotFound] = useState(!targetLookup && !selectedProduct);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [imagenActual, setImagenActual] = useState(selectedProduct?.imageUrl || "");
    const [selectedColor, setSelectedColor] = useState("");
    const [qty, setQty] = useState(1);
    const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAuthor, setNewAuthor] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [whatsAppMessage, setWhatsAppMessage] = useState("");

    useEffect(() => {
        if (!targetLookup) return;
        let cancelled = false;
        setIsLoading(true);

        fetchProductDetailsById(targetLookup)
            .then((detailsRes) => {
                if (cancelled) return;
                setProduct(detailsRes);
                setImagenActual(detailsRes.images[0] || "");
                setSelectedColor(getColorValue(detailsRes.colors?.[0]));
                setIsNotFound(false);
                setLoadError(null);
                setSelectedStarFilter(null);
                setQty(1);
                if (typeof detailsRes.isFavorite === "boolean") {
                    onFavoriteSynced?.(
                        String(detailsRes.id),
                        detailsRes.isFavorite,
                        detailsRes.favoriteCount ?? 0,
                    );
                }
            })
            .catch((err) => {
                if (cancelled) return;
                if (err instanceof ApiRequestError && err.status === 404) {
                    setIsNotFound(true);
                    setLoadError(null);
                } else {
                    setIsNotFound(false);
                    setLoadError(
                        err instanceof Error
                            ? err.message
                            : "No se pudo consultar el producto en la base de datos.",
                    );
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [targetLookup]);

    if (isLoading && !product) {
        return (
            <main style={{ width: "100%", flex: 1, backgroundColor: "#f2f6fb" }}>
                <AsyncStatusBanner isLoading loadingText="Cargando detalles del producto..." />
            </main>
        );
    }

    if (isNotFound || !product) {
        return (
            <main style={{ width: "100%", flex: 1, backgroundColor: "#f2f6fb" }}>
                <AsyncStatusBanner
                    error={loadError || "Producto no encontrado."}
                    onRetry={() => onNavigate?.("inicio")}
                />
            </main>
        );
    }

    const relatedProducts = getRelatedProducts(product.id, product.category);
    const activeStats = reviews.length > 0 ? calculateRatingStats(reviews) : ratingStats || emptyRatingStats;
    const filteredReviews = selectedStarFilter
        ? reviews.filter((r) => r.rating === selectedStarFilter)
        : reviews;

    const handleWhatsAppClick = () => {
        const text = `Hola Gamalion Digital, me interesa ${product.title} (SKU: ${product.sku}, ${qty} unidad/es) por ${product.formattedPrice}. ¿Tienen disponibilidad inmediata?`;
        setWhatsAppMessage(text);
        setIsWhatsAppOpen(true);
    };

    const handleConfirmSendWhatsApp = () => {
        const encoded = encodeURIComponent(whatsAppMessage);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, "_blank");
        setIsWhatsAppOpen(false);
    };

    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAuthor.trim() || !newContent.trim()) return;

        const createdReview: ReviewItem = {
            id: Date.now(),
            author: newAuthor.trim(),
            rating: Number(newRating),
            title: newTitle.trim() || "Excelente producto",
            date: "Hoy",
            location: "Local",
            content: newContent.trim(),
            verified: true,
            helpfulCount: 0,
        };

        const updated = [createdReview, ...reviews];
        setReviews(updated);
        setRatingStats(calculateRatingStats(updated));
        setNewAuthor("");
        setNewTitle("");
        setNewContent("");
        setNewRating(5);
        setIsModalOpen(false);
    };

    return (
        <main style={{ width: "100%", flex: 1 }}>
            <div className="product-details-main">
                <nav className="product-breadcrumbs">
                    <a
                        href={getTabUrl("inicio")}
                        className="product-breadcrumb-btn"
                        style={{ textDecoration: "none" }}
                        onClick={(e) => {
                            if (isPlainLeftClick(e)) {
                                e.preventDefault();
                                onNavigate?.("inicio");
                            }
                        }}
                    >
                        Inicio
                    </a>
                    <span>/</span>
                    <a
                        href={getTabUrl(product.category)}
                        className="product-breadcrumb-btn"
                        style={{ textDecoration: "none" }}
                        onClick={(e) => {
                            if (isPlainLeftClick(e)) {
                                e.preventDefault();
                                onNavigate?.(product.category);
                            }
                        }}
                    >
                        {product.categoryLabel}
                    </a>
                    <span>/</span>
                    <span style={{ color: "#0f172a", fontWeight: 600 }}>{product.brand}</span>
                </nav>

                <div className="product-top-card">
                    <div className="product-gallery-flex">
                        <div className="product-thumbs-column">
                            {product.images.map((url, index) => (
                                <RectImage
                                    key={index}
                                    width={98}
                                    height={98}
                                    name={`${product.title} miniatura ${index + 1}`}
                                    urlImage={url}
                                    isSelected={imagenActual === url}
                                    onClick={() => setImagenActual(url)}
                                    onMouseEnter={() => setImagenActual(url)}
                                />
                            ))}
                        </div>
                        <div>
                            <RectImage
                                width={440}
                                height={440}
                                name={product.title}
                                urlImage={imagenActual || product.images[0]}
                            />
                        </div>
                    </div>

                    <div className="product-info-panel">
                        <div>
                            <div className="product-meta-row">
                                <p className="product-brand-tag">{product.brand}</p>
                                <span className="product-sku-badge">SKU: {product.sku}</span>
                                <span className="product-sku-badge">Modelo: {product.model}</span>
                            </div>

                            <h1 className="product-title">{product.title}</h1>

                            <div className="product-price-row">
                                <span className="product-price">{product.formattedPrice}</span>
                                {product.hasDiscount && (
                                    <>
                                        <span className="product-old-price">{product.formattedOriginalPrice}</span>
                                        <span className="product-sale-pill">Ahorras {product.formattedSavings}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="product-desc">{product.description}</p>

                        {product.colors && product.colors.length > 0 && (
                            <ColorSelector
                                colors={product.colors}
                                selectedColor={selectedColor}
                                onSelect={setSelectedColor}
                            />
                        )}

                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                                    style={{
                                        padding: "8px 12px",
                                        border: "none",
                                        background: "#f8fafc",
                                        cursor: "pointer",
                                        fontWeight: 700,
                                    }}
                                >
                                    −
                                </button>
                                <span style={{ padding: "0 14px", fontWeight: 700 }}>{qty}</span>
                                <button
                                    type="button"
                                    onClick={() => setQty((prev) => prev + 1)}
                                    style={{
                                        padding: "8px 12px",
                                        border: "none",
                                        background: "#f8fafc",
                                        cursor: "pointer",
                                        fontWeight: 700,
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => onAddToCart?.(product, qty, selectedColor || undefined)}
                                style={{
                                    flex: 1,
                                    minWidth: "180px",
                                    padding: "11px 18px",
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                }}
                            >
                                Agregar al carrito
                            </button>

                            <button
                                type="button"
                                onClick={handleWhatsAppClick}
                                style={{
                                    padding: "11px 18px",
                                    backgroundColor: "#16a34a",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                }}
                            >
                                Consultar por WhatsApp
                            </button>

                            {onFavoriteToggle && (
                                <button
                                    type="button"
                                    onClick={() => onFavoriteToggle(product)}
                                    style={{
                                        padding: "11px 14px",
                                        backgroundColor: "#ffffff",
                                        color: product.isFavorite ? "#ef4444" : "#475569",
                                        border: "1px solid #cbd5e1",
                                        borderRadius: "8px",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                    }}
                                >
                                    {product.isFavorite ? "♥ Guardado" : "♡ Favorito"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {product.specs && Object.keys(product.specs).length > 0 && (
                    <div className="product-accordions-container">
                        {Object.entries(product.specs).map(([title, content]) => (
                            <Accordion key={title} title={title} content={content} />
                        ))}
                    </div>
                )}

                <RatingSummary
                    averageRating={activeStats.averageRating}
                    totalReviews={activeStats.totalReviews}
                    breakdown={activeStats.breakdown}
                    recommendPercentage={activeStats.positivePercentage}
                    selectedStarFilter={selectedStarFilter}
                    onSelectStarFilter={setSelectedStarFilter}
                    onWriteReview={() => setIsModalOpen(true)}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {filteredReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>

                {relatedProducts.length > 0 && (
                    <ProductSlider
                        title="Productos relacionados"
                        category={product.category || "laptops"}
                        products={relatedProducts}
                        onProductClick={onProductClick}
                    />
                )}
            </div>

            {isModalOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(15, 23, 42, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "1rem",
                    }}
                >
                    <form
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleAddReview}
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            width: "100%",
                            maxWidth: "460px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.9rem",
                        }}
                    >
                        <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
                            Escribir una opinión
                        </h3>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            required
                            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                        />
                        <select
                            value={newRating}
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                        >
                            {[5, 4, 3, 2, 1].map((n) => (
                                <option key={n} value={n}>
                                    {n} {n === 1 ? "estrella" : "estrellas"}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Título de tu opinión"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                        />
                        <textarea
                            placeholder="Cuéntanos tu experiencia con el producto..."
                            rows={4}
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            required
                            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "6px",
                                    border: "1px solid #cbd5e1",
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "6px",
                                    border: "none",
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Publicar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <WhatsAppModal
                isOpen={isWhatsAppOpen}
                message={whatsAppMessage}
                onChangeMessage={setWhatsAppMessage}
                onClose={() => setIsWhatsAppOpen(false)}
                onConfirmSend={handleConfirmSendWhatsApp}
            />
        </main>
    );
}
