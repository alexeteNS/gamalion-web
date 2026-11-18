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
          justifyContent: "space-between",
          gap: "12px",
          width: "100%",
          padding: "16px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "15px",
          fontWeight: 600,
          color: "#0f172a",
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: "18px", lineHeight: 1, color: "#64748b" }}>
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div style={{ paddingBottom: "16px" }}>
          {renderBody()}
        </div>
      )}
    </div>
  );
}
