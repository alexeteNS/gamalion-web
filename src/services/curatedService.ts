import { apiFetch } from "./apiConfig";
import type { CuratedSectionDto } from "../models/curated";

export async function fetchPublicCuratedSections(): Promise<CuratedSectionDto[]> {
    return apiFetch<CuratedSectionDto[]>("/curated");
}

export async function fetchPublicCuratedSection(
    slug: string,
): Promise<CuratedSectionDto> {
    return apiFetch<CuratedSectionDto>(`/curated/${encodeURIComponent(slug)}`);
}
