export type WidgetType = "grid" | "single" | "list" | "slider";

export interface WidgetGridItem {
    id: string;
    title: string;
    imageUrl: string;
    link?: string;
}

export interface WidgetSingleItem {
    id: string;
    title: string;
    subtitle?: string;
    badge?: string;
    imageUrl: string;
    link?: string;
}

export interface WidgetListItem {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    formattedPrice?: string;
    formattedOriginalPrice?: string;
    imageUrl: string;
    soldPercentage?: number;
    link?: string;
}

export interface WidgetSliderItem {
    id: string;
    title: string;
    price?: number;
    formattedPrice?: string;
    imageUrl: string;
    link?: string;
}

export interface BaseWidget {
    id: string;
    title: string;
    linkText?: string;
    linkUrl?: string;
}

export interface GridWidget extends BaseWidget {
    type: "grid";
    items: WidgetGridItem[];
}

export interface SingleWidget extends BaseWidget {
    type: "single";
    item: WidgetSingleItem;
}

export interface ListWidget extends BaseWidget {
    type: "list";
    items: WidgetListItem[];
}

export interface SliderWidget extends BaseWidget {
    type: "slider";
    items: WidgetSliderItem[];
}

export type HomeWidget = GridWidget | SingleWidget | ListWidget | SliderWidget;
