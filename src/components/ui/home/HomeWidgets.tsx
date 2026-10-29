import type { HomeWidget, WidgetGridItem, WidgetSingleItem, WidgetListItem, WidgetSliderItem } from "../../../models/widget";
import { defaultHomeWidgets } from "../../../data/homeWidgetsData";
import WidgetCard from "./WidgetCard";

export interface HomeWidgetsProps {
    widgets?: HomeWidget[];
    overlap?: boolean;
    onItemClick?: (item: WidgetGridItem | WidgetSingleItem | WidgetListItem | WidgetSliderItem) => void;
    onLinkClick?: (widget: HomeWidget) => void;
}

export default function HomeWidgets({
    widgets = defaultHomeWidgets,
    overlap = false,
    onItemClick,
    onLinkClick,
}: HomeWidgetsProps) {
    return (
        <section
            style={{
                width: "100%",
                padding: overlap ? "0 2rem 2rem 2rem" : "2.5rem 2rem",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                position: overlap ? "relative" : undefined,
                zIndex: overlap ? 3 : undefined,
                marginTop: overlap ? "-13rem" : undefined,
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1440px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "1.75rem",
                    alignItems: "stretch",
                }}
            >
                {widgets.map((widget) => (
                    <WidgetCard
                        key={widget.id}
                        widget={widget}
                        onItemClick={onItemClick}
                        onLinkClick={onLinkClick}
                    />
                ))}
            </div>
        </section>
    );
}
