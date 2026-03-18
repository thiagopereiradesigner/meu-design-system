import React from "react";

// Icons (Lucide-inspired) used in the DS
const CheckCircleIcon = ({ color = "currentColor", size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CircleXIcon = ({ color = "currentColor", size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const TriangleAlertIcon = ({ color = "currentColor", size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const InfoCircleIcon = ({ color = "currentColor", size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const DotIcon = ({ color = "currentColor", size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="3.5" fill={color} />
  </svg>
);

const ChevronRightIcon = ({ color = "currentColor", size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const Badge = ({
  children,
  variant = "success",
  size = "medium",
  showIcon = false,
  icon,
  showRightIcon = false,
  rightIcon,
}) => {
  const stylesByVariant = {
    success: {
      backgroundColor: "var(--ds-success-bg)",
      color: "var(--ds-success-fg)",
    },
    error: {
      backgroundColor: "var(--ds-error-bg)",
      color: "var(--ds-error-fg)",
    },
    warning: {
      backgroundColor: "var(--ds-warning-bg)",
      color: "var(--ds-warning-fg)",
    },
    info: {
      backgroundColor: "var(--ds-info-bg)",
      color: "var(--ds-info-fg)",
    },
    neutral: {
      backgroundColor: "var(--ds-neutral-bg)",
      color: "var(--ds-neutral-fg)",
    },
  };

  const stylesBySize = {
    small: {
      padding: "2px 8px",
      fontSize: "10px",
      gap: 6,
      iconSize: 14,
    },
    medium: {
      padding: "4px 10px",
      fontSize: "12px",
      gap: 6,
      iconSize: 16,
    },
  };

  const Icon =
    icon ||
    (variant === "success"
      ? CheckCircleIcon
      : variant === "error"
        ? CircleXIcon
        : variant === "warning"
          ? TriangleAlertIcon
          : variant === "info"
            ? InfoCircleIcon
            : DotIcon);

  const isRightIconElement = React.isValidElement(rightIcon);
  const RightIcon = isRightIconElement ? null : rightIcon || ChevronRightIcon;

  const badgeStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--ds-radius-full)",
    fontFamily: "var(--ds-font-family)",
    fontWeight: 500,
    lineHeight: 1.5,
    whiteSpace: "nowrap",
    ...stylesByVariant[variant],
    ...stylesBySize[size],
    gap: stylesBySize[size].gap,
  };

  return (
    <span style={badgeStyles}>
      {showIcon && (
        <span style={{ display: "inline-flex", lineHeight: 0 }}>
          <Icon color="currentColor" size={stylesBySize[size].iconSize} />
        </span>
      )}
      {children}
      {showRightIcon && (
        <span style={{ display: "inline-flex", lineHeight: 0 }}>
          {isRightIconElement ? (
            rightIcon
          ) : (
            <RightIcon color="currentColor" size={stylesBySize[size].iconSize} />
          )}
        </span>
      )}
    </span>
  );
};

