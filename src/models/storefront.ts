import type { CategoryItem } from "./category";
import type { CuratedSectionDto } from "./curated";
import type { ProductCardItem } from "./product";
import type { PromoBannerItem } from "./promoBanner";

export interface CategoryShowcaseSlider {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    products: ProductCardItem[];
    viewAllLink: string;
    viewAllText: string;
}

export interface HomeStorefrontResponse {
    categories: CategoryItem[];
    featuredCategories: CategoryItem[];
    curatedSections: CuratedSectionDto[];
    categorySliders: CategoryShowcaseSlider[];
    promoBanners: PromoBannerItem[];
    totalProducts: number;
    catalogEmpty: boolean;
}
