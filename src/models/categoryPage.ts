export type FilterType = "words" | "checkbox" | "checklist" | "range" | "radio";

export interface FilterOption {
    label: string;
    value: string;
    count?: number;
}

export interface FilterConfig {
    id: string;
    title: string;
    type: FilterType;
    options?: FilterOption[];
    min?: number;
    max?: number;
}

export interface CategoryProductItem {
    id: string;
    sku: string;
    model: string;
    brand: string;
    title: string;
    specs: string[];
    imageUrl: string;
    price: number;
    originalPrice?: number;
    category: string;
}
