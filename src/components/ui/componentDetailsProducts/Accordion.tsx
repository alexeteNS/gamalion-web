import { useState, type ReactNode } from "react";

export type AccordionContentItem = string | string[] | ReactNode;

export interface AccordionProps {
  title: string;
  content?: AccordionContentItem[];
  description?: ReactNode;
  items?: string[];
  children?: ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({
  title,
  content,
  description,
  items,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  function renderBody() {
    if (children) return children;

    if (Array.isArray(content) && content.length > 0) {
      return content.map((block, idx) => {
        if (Array.isArray(block)) {
          return (
            <ol key={idx} style={{ margin: "0 0 12px 0", paddingLeft: "20px", color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
              {block.map((item, itemIdx) => (
                <li key={itemIdx} style={{ marginBottom: "6px" }}>{item}</li>
              ))}
            </ol>
          );
        }

        if (typeof block === "string") {
          return (
            <p key={idx} style={{ margin: "0 0 12px 0", color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
              {block}
            </p>
          );
        }

        return <div key={idx}>{block}</div>;
      });
    }

    const listItems =
      Array.isArray(items) && items.length > 0
        ? items
        : Array.isArray(description)
        ? description
        : null;

    const textDescription = Array.isArray(description) ? null : description;

    return (
      <>
        {textDescription && (
          <p style={{ margin: "0 0 12px 0", color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
            {textDescription}
          </p>
        )}

        {listItems && listItems.length > 0 && (
          <ol style={{ margin: "0 0 12px 0", paddingLeft: "20px", color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
            {listItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "6px" }}>{item}</li>
            ))}
          </ol>
        )}
      </>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        textAlign: "left",
        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          padding: "16px 0",
          background: "none",
          border: "none",
          borderBottom: isOpen ? "1px solid #e5e7eb" : "none",
          cursor: "pointer",
          textAlign: "left",
          color: "#111827",
          fontSize: "15px",
          fontWeight: 500,
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span>{title}</span>
      </button>

      {isOpen && (
        <div style={{ padding: "14px 16px 18px 38px", textAlign: "left" }}>
          {renderBody()}
        </div>
      )}
    </div>
  );
}
