import { useState } from "react";

export interface RatingBreakdownData {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
}

export interface RatingSummaryProps {
    title?: string;
    averageRating: number;
    totalReviews: number;
    breakdown: RatingBreakdownData;
    recommendPercentage?: number;
    onWriteReview?: () => void;
    onSelectStarFilter?: (stars: number | null) => void;
    selectedStarFilter?: number | null;
}

export default function RatingSummary({
    title = "Opiniones de clientes",
    averageRating,
    totalReviews,
    breakdown,
    recommendPercentage,
    onWriteReview,
    onSelectStarFilter,
    selectedStarFilter = null,
}: RatingSummaryProps) {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    const calculatedTotal = Object.values(breakdown).reduce((acc, curr) => acc + curr, 0);
    const effectiveTotal = calculatedTotal > 0 ? calculatedTotal : totalReviews;

    const positiveCount = (breakdown[5] || 0) + (breakdown[4] || 0);
    const positivePercentage =
        recommendPercentage !== undefined
            ? recommendPercentage
            : effectiveTotal > 0
            ? Math.round((positiveCount / effectiveTotal) * 100)
            : 0;

    const renderStars = (rating: number, size = 18) => (
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {Array.from({ length: 5 }, (_, i) => {
                const filled = i < Math.round(rating);
                return (
                    <svg
                        key={i}
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        fill={filled ? "#f59e0b" : "#e2e8f0"}
                        stroke={filled ? "#f59e0b" : "#cbd5e1"}
                        strokeWidth="1"
                        style={{ flexShrink: 0 }}
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                );
            })}
        </div>
    );

    const starLevels: (keyof RatingBreakdownData)[] = [5, 4, 3, 2, 1];

    return (
        <section
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
                    {title}
                </h3>
                {onWriteReview && (
                    <button
                        type="button"
                        onClick={onWriteReview}
                        style={{
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "0.55rem 1rem",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Escribir opinión
                    </button>
                )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                    <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
                        {averageRating.toFixed(1)}
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "#64748b" }}>/ 5</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {renderStars(averageRating)}
                    <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                        {totalReviews} {totalReviews === 1 ? "opinión" : "opiniones"} · {positivePercentage}% recomiendan este producto
                    </span>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {starLevels.map((star) => {
                    const count = breakdown[star] || 0;
                    const pct = effectiveTotal > 0 ? Math.round((count / effectiveTotal) * 100) : 0;
                    const isSelected = selectedStarFilter === star;
                    const isHovered = hoveredStar === star;

                    return (
                        <button
                            key={star}
                            type="button"
                            onClick={() => onSelectStarFilter?.(isSelected ? null : star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(null)}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "68px 1fr 44px",
                                alignItems: "center",
                                gap: "0.75rem",
                                background: isSelected ? "#eff6ff" : isHovered ? "#f8fafc" : "transparent",
                                border: isSelected ? "1px solid #bfdbfe" : "1px solid transparent",
                                borderRadius: "6px",
                                padding: "4px 8px",
                                cursor: onSelectStarFilter ? "pointer" : "default",
                                textAlign: "left",
                            }}
                        >
                            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>
                                {star} {star === 1 ? "estrella" : "estrellas"}
                            </span>
                            <div
                                style={{
                                    height: "8px",
                                    backgroundColor: "#e2e8f0",
                                    borderRadius: "999px",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        width: `${pct}%`,
                                        height: "100%",
                                        backgroundColor: "#f59e0b",
                                        borderRadius: "999px",
                                    }}
                                />
                            </div>
                            <span style={{ fontSize: "0.8rem", color: "#64748b", textAlign: "right" }}>
                                {pct}%
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
