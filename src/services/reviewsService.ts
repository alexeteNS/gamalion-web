import { apiFetch } from "./apiConfig";
import type {
    CreateReviewPayload,
    ProductReviewsResponse,
    ReviewHelpfulResponse,
} from "../models/review";

export async function fetchProductReviews(
    productIdOrSlug: string,
): Promise<ProductReviewsResponse> {
    return apiFetch<ProductReviewsResponse>(
        `/products/${encodeURIComponent(productIdOrSlug)}/reviews`,
    );
}

export async function createProductReview(
    productIdOrSlug: string,
    payload: CreateReviewPayload,
): Promise<ProductReviewsResponse> {
    return apiFetch<ProductReviewsResponse>(
        `/products/${encodeURIComponent(productIdOrSlug)}/reviews`,
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
    );
}

export async function markReviewHelpful(
    reviewId: number,
): Promise<ReviewHelpfulResponse> {
    return apiFetch<ReviewHelpfulResponse>(
        `/reviews/${encodeURIComponent(String(reviewId))}/helpful`,
        {
            method: "POST",
        },
    );
}
