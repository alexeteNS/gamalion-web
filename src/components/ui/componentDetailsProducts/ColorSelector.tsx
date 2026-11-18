import { useState } from "react";

export interface ColorItem {
  name?: string;
  value: string;
}

export interface ColorSelectorProps {
  label?: string;
  colors: (string | ColorItem)[];
  defaultColor?: string;
  selectedColor?: string;
  onSelect?: (color: string) => void;
}

export default function ColorSelector({
  label = "Color",
  colors = [],
  defaultColor,
  selectedColor,
  onSelect,
}: ColorSelectorProps) {
  const getInitialColor = () => {
    if (selectedColor) return selectedColor;
    if (defaultColor) return defaultColor;
    if (colors.length > 0) {
      const first = colors[0];
      return typeof first === "string" ? first : first.value;
    }
    return "";
  };

  const [currentSelected, setCurrentSelected] = useState<string>(getInitialColor());

  const activeColor = selectedColor !== undefined ? selectedColor : currentSelected;

  const handleSelect = (val: string) => {
    setCurrentSelected(val);
    onSelect?.(val);
  };

  return (
    <div style={{ textAlign: "left", width: "100%", marginBottom: "16px" }}>
      {label && (
        <span
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: 500,
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          {label}
        </span>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {colors.map((item, index) => {
          const colorValue = typeof item === "string" ? item : item.value;
          const colorName = typeof item === "string" ? item : item.name || item.value;
          const isSelected = activeColor === colorValue;

          return (
            <button
              key={index}
              type="button"
              title={colorName}
              onClick={() => handleSelect(colorValue)}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: colorValue,
                border: "1px solid rgba(0, 0, 0, 0.12)",
                outline: isSelected ? "1.5px solid #111827" : "none",
                outlineOffset: "2px",
                cursor: "pointer",
                padding: 0,
                transition: "outline 0.15s ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
