import type { PromoBannerItem } from "../../../models/promoBanner";
import { defaultPromoBanners } from "../../../data/promoBannersData";

export interface PromoBannersProps {
    banners?: PromoBannerItem[];
    onBannerClick?: (category: string) => void;
}

export default function PromoBanners({
    banners = defaultPromoBanners,
    onBannerClick,
}: PromoBannersProps) {
    return (
        <section
            style={{
                width: "100%",
                paddingBottom: "2.5rem",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div className="site-container">
                <div className="promo-banners-grid">
                    {banners.map((banner) => (
                        <article
                            key={banner.id}
                            className="promo-banner-card"
                            onClick={() => onBannerClick?.(banner.category)}
                            style={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #dce5f2",
                                borderRadius: "14px",
                                overflow: "hidden",
                                minHeight: "220px",
                                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                                cursor: "pointer",
                            }}
                        >
                        <div
                            style={{
                                padding: "2rem 2.25rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                boxSizing: "border-box",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    color: "#64748b",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    marginBottom: "0.65rem",
                                }}
                            >
                                {banner.tag}
                            </span>

                            <h3
                                style={{
                                    margin: "0 0 1.35rem 0",
                                    fontSize: "1.55rem",
                                    fontWeight: 800,
                                    color: "#1e293b",
                                    lineHeight: 1.2,
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {banner.titleLine1}
                                <br />
                                {banner.titleLine2}
                            </h3>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBannerClick?.(banner.category);
                                }}
                                style={{
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.65rem 1.85rem",
                                    fontSize: "0.88rem",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                }}
                            >
                                {banner.buttonText}
                            </button>
                        </div>

                        <div
                            style={{
                                backgroundColor: banner.imageBg,
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={banner.imageUrl}
                                alt={banner.tag}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </div>
                    </article>
                ))}
                </div>
            </div>
        </section>
    );
}
