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
            className={overlap ? "home-widgets-section" : undefined}
            style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                position: overlap ? "relative" : undefined,
                zIndex: overlap ? 3 : undefined,
                padding: overlap ? undefined : "2rem 0",
            }}
        >
            <div
                className="site-container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                    gap: "1.5rem",
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
