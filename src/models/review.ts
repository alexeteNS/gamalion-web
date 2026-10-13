export interface ReviewItem {
    id: number;
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
