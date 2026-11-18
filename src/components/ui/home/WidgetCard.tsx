import type {
    HomeWidget,
    GridWidget,
    SingleWidget,
    ListWidget,
    SliderWidget,
    WidgetGridItem,
    WidgetSingleItem,
    WidgetListItem,
    WidgetSliderItem,
} from "../../../models/widget";

export interface WidgetCardProps {
    widget: HomeWidget;
    onItemClick?: (
        item: WidgetGridItem | WidgetSingleItem | WidgetListItem | WidgetSliderItem,
    ) => void;
    onLinkClick?: (widget: HomeWidget) => void;
}

export default function WidgetCard({
    widget,
    onItemClick,
    onLinkClick,
}: WidgetCardProps) {
    const renderGridBody = (w: GridWidget) => (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.85rem",
                width: "100%",
            }}
        >
            {w.items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onItemClick?.(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onItemClick?.(item);
                        }
                    }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "1",
                            borderRadius: "10px",
                            overflow: "hidden",
                            backgroundColor: "#0f172a",
                            border: "1px solid #e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                opacity: 0.82,
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.82) 100%)",
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                                padding: "0.65rem",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.78rem",
                                    fontWeight: 800,
                                    color: "#ffffff",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    backgroundColor: "rgba(37, 99, 235, 0.88)",
                                    padding: "0.25rem 0.6rem",
                                    borderRadius: "6px",
                                    textAlign: "center",
                                }}
                            >
                                {item.title}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSingleBody = (w: SingleWidget) => (
        <div
            onClick={() => onItemClick?.(w.item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    onItemClick?.(w.item);
                }
            }}
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#0b1120",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
            }}
        >
            <img
                src={w.item.imageUrl}
                alt={w.item.title}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                        "linear-gradient(180deg, rgba(11, 17, 32, 0.4) 0%, rgba(11, 17, 32, 0.95) 100%)",
                    padding: "0.75rem 1rem",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <span
                    style={{
                        color: "#ffffff",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        margin: "0 0 0.2rem 0",
                    }}
                >
                    {w.item.title}
                </span>
                {w.item.subtitle && (
                    <span style={{ color: "#cbd5e1", fontSize: "0.78rem" }}>
                        {w.item.subtitle}
                    </span>
                )}
            </div>
        </div>
    );

    const renderListBody = (w: ListWidget) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
            {w.items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onItemClick?.(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onItemClick?.(item);
                        }
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        cursor: "pointer",
                        padding: "0.4rem",
                        borderRadius: "8px",
                        border: "1px solid #f1f5f9",
                    }}
                >
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                            width: "52px",
                            height: "52px",
                            objectFit: "contain",
                            borderRadius: "6px",
                            flexShrink: 0,
                        }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                            style={{
                                fontSize: "0.82rem",
                                fontWeight: 600,
                                color: "#0f172a",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {item.title}
                        </div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#2563eb" }}>
                            {item.formattedPrice ||
                                `$${item.price.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}`}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSliderBody = (w: SliderWidget) => (
        <div
            style={{
                display: "flex",
                gap: "0.75rem",
                overflowX: "auto",
                paddingBottom: "0.25rem",
                width: "100%",
            }}
        >
            {w.items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onItemClick?.(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onItemClick?.(item);
                        }
                    }}
                    style={{
                        minWidth: "120px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.4rem",
                        cursor: "pointer",
                    }}
                >
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "contain",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                        }}
                    />
                    <span
                        style={{
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "#0f172a",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {item.title}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <article
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
                boxSizing: "border-box",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3
                    style={{
                        margin: 0,
                        fontSize: "1.1rem",
                        fontWeight: 800,
                        color: "#0f172a",
                    }}
                >
                    {widget.title}
                </h3>

                {widget.type === "grid" && renderGridBody(widget)}
                {widget.type === "single" && renderSingleBody(widget)}
                {widget.type === "list" && renderListBody(widget)}
                {widget.type === "slider" && renderSliderBody(widget)}
            </div>

            {widget.linkText && (
                <button
                    type="button"
                    onClick={() => onLinkClick?.(widget)}
                    style={{
                        alignSelf: "flex-start",
                        background: "none",
                        border: "none",
                        padding: 0,
                        color: "#2563eb",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                    }}
                >
                    {widget.linkText} →
                </button>
            )}
        </article>
    );
}
