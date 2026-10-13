import { useState } from "react";
import type { ReviewItem } from "../../../models/review";

export type ReviewData = ReviewItem;

export interface ReviewCardProps {
    review: ReviewData;
    onHelpful?: (id?: string | number) => void;
}

export default function ReviewCard({ review, onHelpful }: ReviewCardProps) {
    const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
    const [hasVoted, setHasVoted] = useState(false);

    const handleVoteHelpful = () => {
        if (!hasVoted) {
            setHelpfulCount(prev => prev + 1);
            setHasVoted(true);
            onHelpful?.(review.id);
        } else {
            setHelpfulCount(prev => prev - 1);
            setHasVoted(false);
        }
    };

    const getInitials = (name: string) => {
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const renderStars = (rating: number) => {
        return (
            <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                {Array.from({ length: 5 }, (_, i) => {
                    const filled = i < rating;
                    return (
                        <svg
                            key={i}
                            width="16"
                            height="16"
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

    return (
        <article
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "24px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {review.avatarUrl ? (
                        <img
                            src={review.avatarUrl}
                            alt={review.author}
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "1px solid #e2e8f0",
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "50%",
                                backgroundColor: "#0f172a",
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "14px",
                                fontWeight: "600",
                                letterSpacing: "0.5px",
                                flexShrink: 0,
                            }}
                        >
                            {getInitials(review.author)}
                        </div>
                    )}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>
                                {review.author}
                            </span>
                            {review.verified !== false && (
                                <span
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: "600",
                                        color: "#059669",
                                        backgroundColor: "#ecfdf5",
                                        border: "1px solid #a7f3d0",
                                        padding: "2px 8px",
                                        borderRadius: "12px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                    }}
                                >
                                    ✓ Compra verificada
                                </span>
                            )}
                        </div>
                        <p style={{ margin: "3px 0 0 0", fontSize: "12px", color: "#64748b" }}>
                            {review.location ? `${review.location} · ` : ""}
                            {review.date}
                            {review.variant ? ` · ${review.variant}` : ""}
                        </p>
                    </div>
                </div>

                {renderStars(review.rating)}
            </div>

            <div>
                <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: "600", color: "#0f172a" }}>
                    {review.title}
                </h4>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.65", color: "#334155" }}>
                    {review.content}
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "14px",
                    marginTop: "4px",
                }}
            >
                <button
                    type="button"
                    onClick={handleVoteHelpful}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        border: hasVoted ? "1px solid #2563eb" : "1px solid #e2e8f0",
                        backgroundColor: hasVoted ? "#eff6ff" : "#f8fafc",
                        color: hasVoted ? "#1d4ed8" : "#475569",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                    }}
                >
                    <span>👍</span>
                    <span>¿Te resultó útil?</span>
                    {helpfulCount > 0 && (
                        <span
                            style={{
                                marginLeft: "2px",
                                fontWeight: "600",
                                color: hasVoted ? "#1d4ed8" : "#0f172a",
                            }}
                        >
                            ({helpfulCount})
                        </span>
                    )}
                </button>

                <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                    Comentario verificado
                </span>
            </div>
        </article>
    );
}
