interface RectImageProps {
    width: number;
    height: number;
    name: string;
    urlImage: string;
    isSelected?: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void;
}

export default function RectImage({
    width,
    height,
    name,
    urlImage,
    isSelected = false,
    onClick,
    onMouseEnter,
}: RectImageProps) {
    return (
        <div
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            style={{
                width: width,
                height: height,
                backgroundColor: "transparent",
                padding: "2px",
                border: isSelected ? "2px solid #111827" : "1px solid #e5e7eb",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                cursor: onClick || onMouseEnter ? "pointer" : "default",
                transition: "border 0.15s ease",
                boxSizing: "border-box",
            }}
        >
            <img
                src={urlImage}
                alt={name}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
            />
        </div>
    );
}