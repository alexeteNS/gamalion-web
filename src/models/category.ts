export type CategoryIconType = "cpu" | "gpu" | "laptop" | "storage" | string;

export interface CategoryItem {
    id: string;
    name: string;
    icon: CategoryIconType;
    link?: string;
}
