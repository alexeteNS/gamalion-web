import { useState } from "react";
import type { ReviewItem } from "../../../models/review";

export interface ReviewCardProps {
    review: ReviewItem;
    onHelpful?: (reviewId: number) => void;
}

export default function ReviewCard({ review, onHelpful }: ReviewCardProps) {
    const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);
    const [hasVoted, setHasVoted] = useState(false);

    const handleVoteHelpful = () => {
        if (!hasVoted) {
            setHelpfulCount((prev) => prev + 1);
            setHasVoted(true);
            onHelpful?.(review.id);
        } else {
            setHelpfulCount((prev) => prev - 1);
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

    const renderStars = (rating: number) => (
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

    return (
        <article
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                        style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            overflow: "hidden",
                            flexShrink: 0,
                        }}
                    >
                        {review.avatarUrl ? (
                            <img
                                src={review.avatarUrl}
                                alt={review.author}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            getInitials(review.author)
                        )}
                    </div>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>
                                {review.author}
                            </span>
                            {review.verified && (
                                <span
                                    style={{
                                        fontSize: "0.72rem",
                                        fontWeight: 600,
                                        color: "#16a34a",
                                        backgroundColor: "#f0fdf4",
                                        border: "1px solid #bbf7d0",
                                        borderRadius: "999px",
                                        padding: "1px 8px",
                                    }}
                                >
                                    Compra verificada
                                </span>
                            )}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                            {review.date}
                            {review.location ? ` · ${review.location}` : ""}
                            {review.variant ? ` · ${review.variant}` : ""}
                        </div>
                    </div>
                </div>
                {renderStars(review.rating)}
            </div>

            <div>
                <h4 style={{ margin: "0 0 0.35rem 0", fontSize: "0.98rem", fontWeight: 700, color: "#0f172a" }}>
                    {review.title}
                </h4>
                <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.55, color: "#334155" }}>
                    {review.content}
                </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <button
                    type="button"
                    onClick={handleVoteHelpful}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "6px",
                        border: `1px solid ${hasVoted ? "#2563eb" : "#cbd5e1"}`,
                        backgroundColor: hasVoted ? "#eff6ff" : "#ffffff",
                        color: hasVoted ? "#2563eb" : "#475569",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    <span>Útil</span>
                    <span>({helpfulCount})</span>
                </button>
            </div>
        </article>
    );
}
