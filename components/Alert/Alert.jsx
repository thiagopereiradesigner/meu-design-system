import React from "react";

const CheckCircleIcon = ({ color = "currentColor", size = 20 }) => (
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

const CircleXIcon = ({ color = "currentColor", size = 20 }) => (
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

const TriangleAlertIcon = ({ color = "currentColor", size = 20 }) => (
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

const InfoCircleIcon = ({ color = "currentColor", size = 20 }) => (
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

const CloseIcon = ({ color = "currentColor", size = 16 }) => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Alert = ({
  type = "info",
  variant = "active",
  title,
  message,
  showText = true,
  maxWidth = 720,
  dismissible = true,
  onDismiss,
}) => {
  const isActive = variant === "active";
  const colors = {
    success: {
      bg: isActive ? "var(--ds-success)" : "var(--ds-success-bg)",
      text: isActive ? "var(--ds-on-brand-primary, #FFFFFF)" : "var(--ds-success-fg)",
      icon: isActive ? "var(--ds-on-brand-primary, #FFFFFF)" : "var(--ds-success)",
      close: isActive ? "var(--ds-on-brand-primary, #FFFFFF)" : "var(--ds-success-fg)",
    },
    error: {
      bg: isActive ? "var(--ds-error)" : "var(--ds-error-bg)",
      text: isActive ? "#FFFFFF" : "var(--ds-error-fg)",
      icon: isActive ? "#FFFFFF" : "var(--ds-error)",
      close: isActive ? "#FFFFFF" : "var(--ds-error-fg)",
    },
    warning: {
      bg: isActive ? "var(--ds-warning)" : "var(--ds-warning-bg)",
      text: isActive ? "#FFFFFF" : "var(--ds-warning-fg)",
      icon: isActive ? "#FFFFFF" : "var(--ds-warning)",
      close: isActive ? "#FFFFFF" : "var(--ds-warning-fg)",
    },
    info: {
      bg: isActive ? "var(--ds-info)" : "var(--ds-info-bg)",
      text: isActive ? "#FFFFFF" : "var(--ds-info-fg)",
      icon: isActive ? "#FFFFFF" : "var(--ds-info)",
      close: isActive ? "#FFFFFF" : "var(--ds-info-fg)",
    },
  }[type];

  // `showText` controla apenas o "corpo" (message). O título continua podendo aparecer.
  const shouldRenderTitle = Boolean(title);
  const shouldRenderMessage = Boolean(showText) && Boolean(message);
  const shouldRenderAnyText = shouldRenderTitle || shouldRenderMessage;
  const ariaLabel = title || (shouldRenderMessage ? message : undefined) || type;
  const Icon =
    type === "success"
      ? CheckCircleIcon
      : type === "error"
        ? CircleXIcon
        : type === "warning"
          ? TriangleAlertIcon
          : InfoCircleIcon;

  const titleStyles = {
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1.5,
    color: colors.text,
    margin: 0,
  };

  const messageStyles = {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.text,
    margin: 0,
  };

  const closeButtonStyles = {
    background: "none",
    border: "none",
    padding: 4,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  };

  return (
    <div
      role="alert"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        alignItems: shouldRenderMessage ? "flex-start" : "center",
        gap: 12,
        padding: shouldRenderAnyText ? 16 : 12,
        backgroundColor: colors.bg,
        borderRadius: "8px",
        fontFamily: "var(--ds-font-family)",
        position: "relative",
        width: "100%",
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        alignSelf: "flex-start",
      }}
    >
      <Icon color={colors.icon} />

      {shouldRenderAnyText && (
        <div style={{ display: "flex", flexDirection: "column", gap: shouldRenderMessage ? 4 : 0 }}>
          {shouldRenderTitle && <p style={titleStyles}>{title}</p>}
          {shouldRenderMessage && <p style={messageStyles}>{message}</p>}
        </div>
      )}

      {dismissible && (
        <button
          style={closeButtonStyles}
          onClick={onDismiss}
          aria-label="Fechar alerta"
        >
          <CloseIcon color={colors.close} />
        </button>
      )}
    </div>
  );
};

