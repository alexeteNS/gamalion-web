export interface ReviewItem {
    id: number;
    productId?: string;
    author: string;
    avatarUrl?: string;
    verified: boolean;
    rating: number;
    title: string;
    date: string;
    location?: string;
    variant?: string;
    content: string;
    helpfulCount: number;
}

export interface RatingBreakdown {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
}

export interface RatingStats {
    averageRating: number;
    totalReviews: number;
    breakdown: RatingBreakdown;
    positivePercentage: number;
}

export interface CreateReviewPayload {
    author: string;
    rating: number;
    title: string;
    content: string;
    location?: string;
    variant?: string;
}

export interface ProductReviewsResponse {
    productId: string;
    reviews: ReviewItem[];
    stats: RatingStats;
}

export interface ReviewHelpfulResponse {
    reviewId: number;
    helpfulCount: number;
}
