"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { Divider } from "@/components/Divider/Divider";

// Chevron down (Lucide-inspired)
const ChevronDownIcon = ({ color = "currentColor", size = 18, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

export const Accordion = ({
  type = "single", // "single" | "multiple"
  collapsible = true,
  defaultValue,
  value,
  onValueChange,
  children,
  style,
}) => {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(() => {
    if (isControlled) return value;
    if (type === "multiple") return Array.isArray(defaultValue) ? defaultValue : [];
    return defaultValue ?? null;
  });

  const currentValue = isControlled ? value : internalValue;

  const toggle = (itemValue) => {
    if (type === "multiple") {
      const current = Array.isArray(currentValue) ? currentValue : [];
      const exists = current.includes(itemValue);
      const next = exists ? current.filter((v) => v !== itemValue) : [...current, itemValue];
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
      return;
    }

    const isOpen = currentValue === itemValue;
    const next = isOpen ? (collapsible ? null : itemValue) : itemValue;
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const ctx = useMemo(
    () => ({
      type,
      collapsible,
      currentValue,
      toggle,
    }),
    [type, collapsible, currentValue]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div style={style}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ value: itemValue, children }) => {
  return (
    <AccordionItemContext.Provider value={itemValue}>{children}</AccordionItemContext.Provider>
  );
};

export const AccordionTrigger = ({ children, style, ...buttonProps }) => {
  const itemValue = useContext(AccordionItemContext);
  const { type, currentValue, toggle } = useContext(AccordionContext);

  const isOpen = type === "multiple" ? (Array.isArray(currentValue) ? currentValue.includes(itemValue) : false) : currentValue === itemValue;

  const contentId = `accordion-content-${String(itemValue).replace(/\s+/g, "-").toLowerCase()}`;
  const parsedStringTrigger =
    typeof children === "string" ? children.match(/^\s*(\d+)\.\s+(.*)$/) : null;

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={() => toggle(itemValue)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "12px 0",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "var(--ds-n800)",
        fontFamily: "var(--ds-font-family)",
        fontWeight: 700,
        fontSize: 14,
        ...style,
      }}
      {...buttonProps}
    >
      <span>
        {parsedStringTrigger ? (
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontWeight: 500 }}>{parsedStringTrigger[1]}.</span>
            <span style={{ fontWeight: 700 }}>{parsedStringTrigger[2]}</span>
          </span>
        ) : (
          children
        )}
      </span>
      <ChevronDownIcon
        color="currentColor"
        style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: "transform 200ms ease" }}
      />
    </button>
  );
};

export const AccordionContent = ({
  children,
  withDivider = true,
  dividerThickness = 1,
  dividerColor = "var(--ds-border)",
  style,
  contentStyle,
}) => {
  const itemValue = useContext(AccordionItemContext);
  const { type, currentValue } = useContext(AccordionContext);

  const isOpen = type === "multiple" ? (Array.isArray(currentValue) ? currentValue.includes(itemValue) : false) : currentValue === itemValue;
  const contentId = `accordion-content-${String(itemValue).replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      id={contentId}
      role="region"
      aria-label={`Conteudo do item ${String(itemValue)}`}
      style={{
        overflow: "hidden",
        maxHeight: isOpen ? 500 : 0,
        transition: "max-height 220ms ease",
        ...style,
      }}
    >
      <div
        style={{
          padding: isOpen ? "0 0 16px 0" : "0",
          color: "var(--ds-n800)",
          fontFamily: "var(--ds-font-family)",
          fontSize: 14,
          lineHeight: 1.6,
          ...contentStyle,
        }}
      >
        {children}
      </div>

      {isOpen && withDivider && (
        <Divider thickness={dividerThickness} color={dividerColor} margin={0} />
      )}
    </div>
  );
};

