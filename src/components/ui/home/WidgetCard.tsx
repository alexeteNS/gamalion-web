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
    onItemClick?: (item: WidgetGridItem | WidgetSingleItem | WidgetListItem | WidgetSliderItem) => void;
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
                            width: "100%",
                            aspectRatio: "1",
                            borderRadius: "8px",
                            overflow: "hidden",
                            backgroundColor: "#0b1120",
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
                            }}
                        />
                    </div>
                    <span
                        style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "#475569",
                            textTransform: "uppercase",
                            marginTop: "0.45rem",
                            textAlign: "center",
                            letterSpacing: "0.04em",
                        }}
                    >
                        {item.title}
                    </span>
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
                {w.item.badge && (
                    <span
                        style={{
                            color: "#3b82f6",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        {w.item.badge}
                    </span>
                )}
            </div>
        </div>
    );

    const renderListBody = (w: ListWidget) => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
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
                        gap: "0.85rem",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "0.25rem 0",
                    }}
                >
                    <div
                        style={{
                            width: "56px",
                            height: "56px",
                            minWidth: "56px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #f1f5f9",
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
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <span
                            style={{
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                color: "#1e293b",
                                margin: "0 0 0.2rem 0",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {item.title}
                        </span>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: "0.45rem",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.95rem",
                                    fontWeight: 800,
                                    color: "#0f172a",
                                }}
                            >
                                {item.formattedPrice || `$${item.price.toFixed(2)}`}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                                <span
                                    style={{
                                        fontSize: "0.78rem",
                                        color: "#94a3b8",
                                        textDecoration: "line-through",
                                    }}
                                >
                                    {item.formattedOriginalPrice || `$${item.originalPrice.toFixed(2)}`}
                                </span>
                            )}
                        </div>
                        {item.soldPercentage !== undefined && (
                            <>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "3px",
                                        backgroundColor: "#fee2e2",
                                        borderRadius: "2px",
                                        overflow: "hidden",
                                        marginTop: "0.35rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${Math.min(100, Math.max(0, item.soldPercentage))}%`,
                                            height: "100%",
                                            backgroundColor: "#ef4444",
                                            borderRadius: "2px",
                                        }}
                                    />
                                </div>
                                <span
                                    style={{
                                        fontSize: "0.65rem",
                                        fontWeight: 800,
                                        color: "#ef4444",
                                        textTransform: "uppercase",
                                        marginTop: "0.2rem",
                                        letterSpacing: "0.03em",
                                    }}
                                >
                                    {item.soldPercentage}% VENDIDO
                                </span>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSliderBody = (w: SliderWidget) => (
        <div
            style={{
                display: "flex",
                gap: "0.85rem",
                overflowX: "auto",
                paddingBottom: "0.5rem",
                scrollSnapType: "x mandatory",
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
                        flex: "0 0 120px",
                        scrollSnapAlign: "start",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            aspectRatio: "1",
                            borderRadius: "8px",
                            overflow: "hidden",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
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
                            }}
                        />
                    </div>
                    <span
                        style={{
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "#1e293b",
                            margin: "0.4rem 0 0.15rem 0",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {item.title}
                    </span>
                    {item.price !== undefined && (
                        <span
                            style={{
                                fontSize: "0.85rem",
                                fontWeight: 800,
                                color: "#2563eb",
                            }}
                        >
                            {item.formattedPrice || `$${item.price.toFixed(2)}`}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <article
            style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "1.5rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                height: "100%",
            }}
        >
            <header style={{ marginBottom: "1.25rem" }}>
                <h3
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: "#0f172a",
                        margin: 0,
                        lineHeight: 1.25,
                        letterSpacing: "-0.015em",
                    }}
                >
                    {widget.title}
                </h3>
            </header>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {widget.type === "grid" && renderGridBody(widget as GridWidget)}
                {widget.type === "single" && renderSingleBody(widget as SingleWidget)}
                {widget.type === "list" && renderListBody(widget as ListWidget)}
                {widget.type === "slider" && renderSliderBody(widget as SliderWidget)}
            </div>

            {widget.linkText && (
                <footer
                    style={{
                        marginTop: "1.25rem",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <button
                        type="button"
                        onClick={() => onLinkClick?.(widget)}
                        style={{
                            fontSize: "0.88rem",
                            fontWeight: 600,
                            color: "#2563eb",
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            fontFamily: "inherit",
                        }}
                    >
                        {widget.linkText}
                    </button>
                </footer>
            )}
        </article>
    );
}
