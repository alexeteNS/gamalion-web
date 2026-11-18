import type { ProductCardItem } from "./product";

export type CuratedSectionSlug =
    | "ofertas"
    | "relevantes"
    | "inicio_semana"
    | "catalogo"
    | "mas_comprado"
    | "mejor_valorado";

export type CuratedItemSource = "auto" | "manual";

export interface CuratedSectionItemEntry {
    position: number;
    source: CuratedItemSource;
    isPinned: boolean;
    customBadge?: string | null;
    computedScore: number;
    product: ProductCardItem;
}

export interface CuratedSectionDto {
    slug: CuratedSectionSlug;
    title: string;
    subtitle: string;
    description: string;
    autoLimit: number;
    refreshIntervalDays: number;
    lastRefreshedAt?: string | null;
    nextRefreshAt: string;
    refreshVersion: number;
    lastRefreshHadChanges: boolean;
    isEmpty: boolean;
    products: ProductCardItem[];
    entries: CuratedSectionItemEntry[];
}

export interface AdminCuratedItemEntry {
    id: number;
    productId: string;
    position: number;
    source: CuratedItemSource;
    isPinned: boolean;
    isExcluded: boolean;
    customBadge?: string | null;
    computedScore: number;
    product: ProductCardItem;
}

export interface AdminCuratedSectionDto {
    slug: CuratedSectionSlug;
    title: string;
    subtitle: string;
    description: string;
    autoLimit: number;
    refreshIntervalDays: number;
    lastRefreshedAt?: string | null;
    nextRefreshAt: string;
    refreshVersion: number;
    lastRefreshHadChanges: boolean;
    activeItems: AdminCuratedItemEntry[];
    excludedItems: AdminCuratedItemEntry[];
}

export interface UpdateCuratedSectionItemInput {
    productId: string;
    position: number;
    isPinned?: boolean;
    customBadge?: string | null;
}

export interface UpdateCuratedSectionPayload {
    items: UpdateCuratedSectionItemInput[];
    excludedProductIds?: string[];
    title?: string;
    subtitle?: string;
    autoLimit?: number;
}

export interface AddCuratedItemPayload {
    productId: string;
    position?: number;
    isPinned?: boolean;
    customBadge?: string | null;
}

export interface ReorderCuratedItemsPayload {
    orderedProductIds: string[];
}

export interface CuratedRefreshResult {
    slug: CuratedSectionSlug;
    hadChanges: boolean;
    itemCount: number;
    refreshVersion: number;
    lastRefreshedAt: string;
    nextRefreshAt: string;
}
