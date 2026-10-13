import { useState } from "react";
import type { RatingBreakdown } from "../../../models/review";

export type RatingBreakdownData = RatingBreakdown;

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

    const renderStars = (rating: number, size = 18) => {
        return (
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
    };

    const starLevels = [5, 4, 3, 2, 1] as const;

    return (
        <section
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "28px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
            }}
        >
            <div>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>
                    {title}
                </h3>

                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ fontSize: "52px", fontWeight: "800", color: "#0f172a", lineHeight: 1 }}>
                        {averageRating.toFixed(1)}
                    </span>
                    <span style={{ fontSize: "16px", color: "#64748b", fontWeight: "500" }}>
                        de 5.0
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                    {renderStars(averageRating, 20)}
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>
                        · {effectiveTotal} calificaciones
                    </span>
                </div>

                {positivePercentage > 0 && (
                    <div
                        style={{
                            marginTop: "14px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            backgroundColor: "#ecfdf5",
                            color: "#065f46",
                            fontSize: "12px",
                            fontWeight: "600",
                            border: "1px solid #a7f3d0",
                        }}
                    >
                        <span>✓</span>
                        <span>{positivePercentage}% de clientes recomiendan este producto</span>
                    </div>
                )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {starLevels.map(stars => {
                    const count = breakdown[stars] || 0;
                    const percent = effectiveTotal > 0 ? Math.round((count / effectiveTotal) * 100) : 0;
                    const isSelected = selectedStarFilter === stars;
                    const isHovered = hoveredStar === stars;

                    return (
                        <div
                            key={stars}
                            onClick={() => onSelectStarFilter?.(isSelected ? null : stars)}
                            onMouseEnter={() => setHoveredStar(stars)}
                            onMouseLeave={() => setHoveredStar(null)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "4px 8px",
                                borderRadius: "8px",
                                cursor: onSelectStarFilter ? "pointer" : "default",
                                backgroundColor: isSelected ? "#f1f5f9" : isHovered ? "#f8fafc" : "transparent",
                                transition: "background-color 0.15s ease",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "13px",
                                    fontWeight: isSelected ? "700" : "500",
                                    color: "#334155",
                                    minWidth: "75px",
                                }}
                            >
                                {stars} estrellas
                            </span>

                            <div
                                style={{
                                    flex: 1,
                                    height: "9px",
                                    backgroundColor: "#f1f5f9",
                                    borderRadius: "9999px",
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                <div
                                    style={{
                                        width: `${percent}%`,
                                        height: "100%",
                                        backgroundColor: isSelected ? "#ea580c" : "#f59e0b",
                                        borderRadius: "9999px",
                                        transition: "width 0.4s ease, background-color 0.2s ease",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "6px",
                                    minWidth: "55px",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    color: isSelected ? "#0f172a" : "#64748b",
                                }}
                            >
                                <span>{percent}%</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {onWriteReview && (
                <button
                    type="button"
                    onClick={onWriteReview}
                    style={{
                        width: "100%",
                        padding: "12px 20px",
                        borderRadius: "24px",
                        border: "1.5px solid #0f172a",
                        backgroundColor: "#ffffff",
                        color: "#0f172a",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        marginTop: "4px",
                    }}
                >
                    Escribir una opinión
                </button>
            )}
        </section>
    );
}
