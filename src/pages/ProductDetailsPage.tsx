import { useState } from "react";
import RectImage from "../components/ui/componentDetailsProducts/RectImage";
import Accordion from "../components/ui/componentDetailsProducts/Accordion";
import ColorSelector from "../components/ui/componentDetailsProducts/ColorSelector";
import RatingSummary from "../components/ui/componentDetailsProducts/RatingSummary";
import ReviewCard from "../components/ui/componentDetailsProducts/ReviewCard";
import type { ReviewItem } from "../models/review";
import {
    productData,
    initialReviews,
    calculateRatingStats,
    createWhatsAppUrl,
} from "../data/productBackend";
import "./ProductDetailsPage.css";

export default function ProductDetails() {
    const product = productData;

    const [imagenActual, setImagenActual] = useState(product.images[0]);
    const [stock, setStock] = useState(1);
    const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
    const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAuthor, setNewAuthor] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const ratingStats = calculateRatingStats(reviews);

    const filteredReviews = selectedStarFilter
        ? reviews.filter(r => r.rating === selectedStarFilter)
        : reviews;

    const handleWhatsAppClick = () => {
        const url = createWhatsAppUrl(product.title, product.formattedPrice, stock);
        window.open(url, "_blank");
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

        setReviews([createdReview, ...reviews]);
        setNewAuthor("");
        setNewTitle("");
        setNewContent("");
        setNewRating(5);
        setIsModalOpen(false);
    };

    return (
        <main className="product-details-main">
            <div>
                <table width="100%">
                    <tbody>
                        <tr>
                            <td width="35%" valign="top">
                                <p className="product-breadcrumbs">Home / Products / {product.brand}</p>
                            </td>
                            <td width="65%" valign="top">
                                <h2 className="product-header-quote">
                                    Discover trending <strong>tech products</strong> refined for the forward thinkers
                                </h2>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <table className="product-main-table">
                <tbody>
                    <tr>
                        <td className="product-gallery-td">
                            <div className="product-gallery-flex">
                                <div className="product-thumbs-column">
                                    {product.images.map((url, index) => (
                                        <RectImage
                                            key={index}
                                            width={80}
                                            height={80}
                                            name={`Producto miniatura ${index + 1}`}
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
                                        name="Imagen principal seleccionada"
                                        urlImage={imagenActual}
                                    />
                                </div>
                            </div>
                        </td>
                        <td className="product-info-td">
                            <div className="product-info-panel">
                                <div>
                                    <p className="product-brand-tag">{product.brand}</p>
                                    <h3 className="product-title">{product.title}</h3>
                                    <div className="product-price-row">
                                        <span className="product-price">{product.formattedPrice}</span>
                                        {product.hasDiscount && (
                                            <>
                                                <span className="product-old-price">{product.formattedOriginalPrice}</span>
                                                <span className="product-sale-pill">Ahorra {product.formattedSavings}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <p className="product-desc">{product.description}</p>

                                <ColorSelector colors={product.colors} />

                                <div className="product-actions-group">
                                    <div className="product-cart-row">
                                        <div className="stock-selector">
                                            <button
                                                type="button"
                                                onClick={() => setStock(prev => Math.max(1, prev - 1))}
                                                className="stock-btn"
                                            >
                                                −
                                            </button>
                                            <span className="stock-value">{stock}</span>
                                            <button
                                                type="button"
                                                onClick={() => setStock(prev => prev + 1)}
                                                className="stock-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button type="button" className="btn-add-cart">
                                            Agregar al carrito
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleWhatsAppClick}
                                        className="btn-whatsapp"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.66 20.15 9.31 19.8 8.11 19.14L7.81 18.97L4.7 19.79L5.53 16.76L5.34 16.45C4.61 15.19 4.22 13.57 4.22 11.91C4.22 7.37 7.91 3.67 12.05 3.67ZM8.78 7.37C8.6 7.37 8.36 7.44 8.15 7.67C7.94 7.9 7.34 8.46 7.34 9.61C7.34 10.76 8.18 11.87 8.3 12.02C8.42 12.18 9.94 14.51 12.27 15.52C14.2 16.36 14.59 16.19 15.01 16.15C15.43 16.11 16.38 15.59 16.58 15.03C16.77 14.47 16.77 13.99 16.71 13.89C16.65 13.79 16.5 13.73 16.27 13.62C16.03 13.51 14.9 12.95 14.69 12.87C14.48 12.8 14.33 12.76 14.18 12.99C14.03 13.22 13.59 13.73 13.46 13.89C13.33 14.04 13.2 14.06 12.97 13.95C12.74 13.84 12.01 13.6 11.14 12.82C10.46 12.21 10 11.46 9.87 11.23C9.74 11 9.86 10.87 9.97 10.76C10.08 10.65 10.21 10.48 10.33 10.34C10.45 10.19 10.49 10.08 10.56 9.93C10.63 9.78 10.6 9.65 10.54 9.53C10.48 9.42 10.03 8.31 9.84 7.86C9.66 7.42 9.48 7.48 9.34 7.47C9.21 7.47 9.06 7.37 8.78 7.37Z" />
                                        </svg>
                                        <span>Pedir detalles por WhatsApp</span>
                                    </button>

                                    <p className="product-guarantee-note">
                                        ✓ Atención directa Gamalion Digital · Entrega y retiro local
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="product-accordions-container">
                {Object.entries(product.specs).map(([title, content]) => (
                    <Accordion
                        key={title}
                        title={title}
                        content={content}
                    />
                ))}
            </div>

            <div className="product-showcase-container">
                {product.bannerImages.map((url, index) => (
                    <div key={index} className="product-showcase-item">
                        <img
                            src={url}
                            alt={`Detalle del producto ${index + 1}`}
                            className="product-showcase-image"
                        />
                    </div>
                ))}
            </div>

            <div className="product-reviews-section">
                <div>
                    <RatingSummary
                        averageRating={ratingStats.averageRating}
                        totalReviews={ratingStats.totalReviews}
                        breakdown={ratingStats.breakdown}
                        recommendPercentage={ratingStats.positivePercentage}
                        selectedStarFilter={selectedStarFilter}
                        onSelectStarFilter={setSelectedStarFilter}
                        onWriteReview={() => setIsModalOpen(true)}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>
                            {selectedStarFilter ? `Opiniones con ${selectedStarFilter} estrellas (${filteredReviews.length})` : `Comentarios destacados (${reviews.length})`}
                        </h3>
                        {selectedStarFilter && (
                            <button
                                type="button"
                                onClick={() => setSelectedStarFilter(null)}
                                style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                            >
                                Ver todas
                            </button>
                        )}
                    </div>

                    {filteredReviews.length > 0 ? (
                        filteredReviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))
                    ) : (
                        <div style={{ padding: "32px", textAlign: "center", backgroundColor: "#f8fafc", borderRadius: "16px", color: "#64748b" }}>
                            No hay opiniones con {selectedStarFilter} estrellas todavía.
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="review-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="review-modal-card" onClick={e => e.stopPropagation()}>
                        <h3 className="review-modal-title">Escribir una opinión</h3>
                        <form onSubmit={handleAddReview} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div className="review-form-group">
                                <label className="review-form-label">Tu nombre</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej. Juan Pérez"
                                    value={newAuthor}
                                    onChange={e => setNewAuthor(e.target.value)}
                                    className="review-form-input"
                                />
                            </div>

                            <div className="review-form-group">
                                <label className="review-form-label">Calificación</label>
                                <select
                                    value={newRating}
                                    onChange={e => setNewRating(Number(e.target.value))}
                                    className="review-form-select"
                                >
                                    <option value={5}>5 estrellas (Excelente)</option>
                                    <option value={4}>4 estrellas (Muy bueno)</option>
                                    <option value={3}>3 estrellas (Regular)</option>
                                    <option value={2}>2 estrellas (Malo)</option>
                                    <option value={1}>1 estrella (Muy malo)</option>
                                </select>
                            </div>

                            <div className="review-form-group">
                                <label className="review-form-label">Título del comentario</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Excelente calidad y atención rápida"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    className="review-form-input"
                                />
                            </div>

                            <div className="review-form-group">
                                <label className="review-form-label">Comentario</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Describe tu experiencia con el producto..."
                                    value={newContent}
                                    onChange={e => setNewContent(e.target.value)}
                                    className="review-form-textarea"
                                />
                            </div>

                            <div className="review-modal-actions">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="review-btn-cancel">
                                    Cancelar
                                </button>
                                <button type="submit" className="review-btn-submit">
                                    Publicar opinión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}