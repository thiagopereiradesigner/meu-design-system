import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

/**
 * Tema único: valores via CSS variables de demos/ds-demo-base.css (:root).
 * Importe ds-demo-base.css na app para whitelabel; fallbacks mantêm preview sem CSS.
 */
const tokens = {
  colors: {
    primary: {
      50: 'var(--ds-success-bg, #E6F4ED)',
      500: 'var(--ds-success, #04843B)',
      600: 'var(--ds-success-hover, #067647)',
      700: 'var(--ds-success-fg, #005A1A)',
    },
    neutral: {
      0: 'var(--ds-bg, #FFFFFF)',
      50: 'var(--ds-bg-subtle, #F9F9F9)',
      100: 'var(--ds-n100, #F3F3F3)',
      200: 'var(--ds-n200, #C6C6C6)',
      500: 'var(--ds-n500, #656976)',
      700: 'var(--ds-n700, #333333)',
      800: 'var(--ds-n800, #1A1A1A)',
      900: 'var(--ds-n900, #000000)',
    },
    content: {
      primary: 'var(--ds-content-primary, var(--ds-text-primary, #1A1A1A))',
      secondary: 'var(--ds-content-secondary, var(--ds-text-secondary, #656976))',
      tertiary: 'var(--ds-content-tertiary, var(--ds-text-tertiary, #727272))',
      inverse: 'var(--ds-on-inverse, #FFFFFF)',
      /** Texto sobre fill verde (--ds-success), ex. Ringgo / WCAG AA */
      onBrandPrimary: 'var(--ds-on-brand-primary, var(--ds-on-inverse, #FFFFFF))',
    },
    border: {
      primary: 'var(--ds-content-primary, var(--ds-text-primary, #1A1A1A))',
      secondary: 'var(--ds-border, #E0E0E0)',
    },
    overlay: 'var(--ds-overlay-scrim, rgba(0, 0, 0, 0.5))',
    shadowOverlay: 'var(--ds-shadow-overlay, 0 20px 25px rgba(0, 0, 0, 0.15))',
    brandSecondary900: 'var(--ds-color-brand-secondary-900, #273959)',
  },
  spacing: {
    xxs: 'var(--ds-space-xxs, 4px)',
    xs: 'var(--ds-space-xs, 8px)',
    sm: 'var(--ds-space-sm, 12px)',
    md: 'var(--ds-space-md, 16px)',
    lg: 'var(--ds-space-lg, 24px)',
    xl: 'var(--ds-space-xl, 32px)',
    xxl: 'var(--ds-space-xxl, 48px)',
  },
  borderRadius: {
    xs: 'var(--ds-radius-xs, 4px)',
    sm: 'var(--ds-radius-sm, 8px)',
    md: 'var(--ds-radius-md, 12px)',
    lg: 'var(--ds-radius-lg, 16px)',
  },
  typography: {
    fontFamily: "var(--ds-font-family, 'Inter', sans-serif)",
    fontSize: {
      xs: 'var(--ds-text-xs, 10px)',
      sm: 'var(--ds-text-sm, 12px)',
      md: 'var(--ds-text-md, 14px)',
      lg: 'var(--ds-text-lg, 16px)',
      xl: 'var(--ds-text-xl, 18px)',
      xxl: 'var(--ds-text-2xl, 24px)',
      xxxl: 'var(--ds-text-3xl, 32px)',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      normal: 1.5,
    },
  },
  shadows: {
    sm: 'var(--ds-shadow-xs, 0 1px 2px rgba(0, 0, 0, 0.05))',
    md: 'var(--ds-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1))',
    lg: 'var(--ds-shadow-lg, 0 10px 15px rgba(0, 0, 0, 0.1))',
    xl: 'var(--ds-shadow-xl, 0 20px 25px rgba(0, 0, 0, 0.15))',
  },
  zIndex: {
    tooltip: 9998,
    drawerBackdrop: 9999,
    drawerPanel: 10000,
    modalBackdrop: 10050,
    modalPanel: 10051,
  },
};

// ==================== SPINNER COMPONENT ====================
export const Spinner = ({
  size = 'medium', // 'small', 'medium', 'large'
  color = tokens.colors.primary[500],
}) => {
  const sizes = {
    small: 16,
    medium: 24,
    large: 40,
  };

  const spinnerSize = sizes[size];

  const spinnerStyles = {
    display: 'inline-block',
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    border: `3px solid ${tokens.colors.neutral[200]}`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyles} role="status" aria-label="Carregando">
        <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          Carregando...
        </span>
      </div>
    </>
  );
};

// ==================== SKELETON COMPONENT (shadcn-like) ====================
export const Skeleton = ({
  width = '100%',
  height = '1rem',
  rounded = 'md',
  style = {},
  'aria-hidden': ariaHidden = true,
}) => {
  const borderRadius =
    rounded === 'full' ? '9999px' : rounded === 'none' ? '0' : '6px';

  return (
    <>
      <style>
        {`
          @keyframes ds-skeleton-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.45; }
          }
        `}
      </style>
      <div
        style={{
          display: 'block',
          boxSizing: 'border-box',
          width,
          height,
          backgroundColor: tokens.colors.neutral[200],
          animation:
            'ds-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          borderRadius,
          ...style,
        }}
        aria-hidden={ariaHidden}
      />
    </>
  );
};

/** Layout típico shadcn: avatar circular + duas linhas (título / subtítulo). */
export const SkeletonProfileRow = ({
  avatarSize = 48,
  titleWidth = 250,
  subtitleWidth = 200,
  lineHeight = 16,
  gap = 16,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap,
    }}
  >
    <Skeleton
      width={avatarSize}
      height={avatarSize}
      rounded="full"
    />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 0,
      }}
    >
      <Skeleton width={titleWidth} height={lineHeight} rounded="full" />
      <Skeleton width={subtitleWidth} height={lineHeight} rounded="full" />
    </div>
  </div>
);

// ==================== CARD (composição estilo shadcn + variantes DS) ====================
const cardVariantStyles = {
  elevated: {
    backgroundColor: tokens.colors.neutral[0],
    border: `1px solid ${tokens.colors.border.secondary}`,
    boxShadow: tokens.shadows.lg,
    borderRadius: tokens.borderRadius.md,
  },
  outline: {
    backgroundColor: tokens.colors.neutral[0],
    border: `1px solid ${tokens.colors.border.secondary}`,
    boxShadow: 'none',
    borderRadius: tokens.borderRadius.md,
  },
  ghost: {
    backgroundColor: 'transparent',
    border: `1px dashed ${tokens.colors.border.secondary}`,
    boxShadow: 'none',
    borderRadius: tokens.borderRadius.md,
  },
  feature: {
    backgroundColor: tokens.colors.neutral[0],
    border: `1px solid ${tokens.colors.border.secondary}`,
    boxShadow: tokens.shadows.md,
    borderRadius: tokens.borderRadius.lg,
  },
  filledPrimary: {
    backgroundColor: tokens.colors.primary[500],
    border: 'none',
    boxShadow: tokens.shadows.md,
    borderRadius: tokens.borderRadius.md,
    color: tokens.colors.content.onBrandPrimary,
  },
  filledSecondary: {
    backgroundColor: tokens.colors.brandSecondary900,
    border: 'none',
    boxShadow: tokens.shadows.lg,
    borderRadius: tokens.borderRadius.md,
    color: tokens.colors.content.inverse,
  },
};

const cardPaddingMap = {
  none: '0',
  sm: tokens.spacing.sm,
  md: tokens.spacing.lg,
  lg: tokens.spacing.xl,
};

export const Card = ({
  variant = 'outline',
  padding = 'md',
  as: Comp = 'div',
  children,
  style = {},
  ...rest
}) => {
  const v = cardVariantStyles[variant] || cardVariantStyles.outline;
  const isFilled = variant === 'filledPrimary' || variant === 'filledSecondary';
  const innerColor = isFilled
    ? {
        color:
          variant === 'filledPrimary'
            ? tokens.colors.content.onBrandPrimary
            : tokens.colors.content.inverse,
      }
    : {};

  return (
    <Comp
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden',
        ...v,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          padding: cardPaddingMap[padding] ?? cardPaddingMap.md,
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.md,
          flex: 1,
          ...innerColor,
        }}
      >
        {children}
      </div>
    </Comp>
  );
};

export const CardHeader = ({ children, action, style = {} }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacing.xs,
      ...style,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: tokens.spacing.sm,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {action ? (
        <div style={{ flexShrink: 0, fontSize: tokens.typography.fontSize.md, fontWeight: tokens.typography.fontWeight.semibold }}>
          {action}
        </div>
      ) : null}
    </div>
  </div>
);

export const CardTitle = ({
  children,
  as: Tag = 'h2',
  id,
  tone = 'default',
  style = {},
  ...rest
}) =>
  React.createElement(
    Tag,
    {
      id,
      style: {
        fontSize: tokens.typography.fontSize.xl,
        fontWeight: tokens.typography.fontWeight.bold,
        margin: 0,
        lineHeight: 1.25,
        color:
          tone === 'onFilled'
            ? tokens.colors.content.inverse
            : tone === 'onBrand'
              ? tokens.colors.content.onBrandPrimary
              : tokens.colors.content.primary,
        ...style,
      },
      ...rest,
    },
    children,
  );

export const CardDescription = ({
  children,
  style = {},
  tone = 'default',
  ...rest
}) => (
  <p
    style={{
      margin: 0,
      fontSize: tokens.typography.fontSize.md,
      color:
        tone === 'onFilled'
          ? 'color-mix(in srgb, var(--ds-on-inverse, #ffffff) 92%, transparent)'
          : tone === 'onBrand'
            ? 'color-mix(in srgb, var(--ds-on-brand-primary, #0a0a0b) 88%, transparent)'
            : tokens.colors.content.secondary,
      lineHeight: tokens.typography.lineHeight.normal,
      ...style,
    }}
    {...rest}
  >
    {children}
  </p>
);

export const CardContent = ({ children, style = {}, ...rest }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md, ...style }} {...rest}>
    {children}
  </div>
);

export const CardFooter = ({ children, style = {}, ...rest }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacing.sm,
      paddingTop: tokens.spacing.xs,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

// ==================== TOOLTIP COMPONENT ====================
export const Tooltip = ({
  children,
  content,
  position = 'top', // 'top', 'right', 'bottom', 'left'
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positions = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-8px)',
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%) translateY(8px)',
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%) translateX(-8px)',
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%) translateX(8px)',
    },
  };

  const arrowPositions = {
    top: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: `6px solid ${tokens.colors.neutral[800]}`,
    },
    bottom: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: `6px solid ${tokens.colors.neutral[800]}`,
    },
    left: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent',
      borderLeft: `6px solid ${tokens.colors.neutral[800]}`,
    },
    right: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent',
      borderRight: `6px solid ${tokens.colors.neutral[800]}`,
    },
  };

  const containerStyles = {
    position: 'relative',
    display: 'inline-block',
  };

  const tooltipStyles = {
    position: 'absolute',
    backgroundColor: tokens.colors.neutral[800],
    color: tokens.colors.content.inverse,
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    borderRadius: tokens.borderRadius.xs,
    fontSize: tokens.typography.fontSize.sm,
    whiteSpace: 'nowrap',
    zIndex: tokens.zIndex.tooltip,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    pointerEvents: 'none',
    ...positions[position],
  };

  const arrowStyles = {
    position: 'absolute',
    width: 0,
    height: 0,
    ...arrowPositions[position],
  };

  return (
    <div
      style={containerStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div style={tooltipStyles} role="tooltip">
        {content}
        <div style={arrowStyles} />
      </div>
    </div>
  );
};

// ==================== MENU COMPONENT ====================
export const Menu = ({
  items = [],
  collapsed = false,
  onItemClick,
}) => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const menuStyles = {
    width: collapsed ? '60px' : '240px',
    backgroundColor: tokens.colors.neutral[0],
    borderRight: `1px solid ${tokens.colors.border.secondary}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    fontFamily: tokens.typography.fontFamily,
  };

  const menuItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
    color: isActive ? tokens.colors.primary[500] : tokens.colors.content.primary,
    backgroundColor: isActive ? tokens.colors.primary[50] : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    borderLeft: isActive ? `3px solid ${tokens.colors.primary[500]}` : '3px solid transparent',
    fontSize: tokens.typography.fontSize.md,
    fontWeight: isActive ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.regular,
  });

  const iconStyles = {
    width: '20px',
    height: '20px',
    flexShrink: 0,
  };

  const labelStyles = {
    opacity: collapsed ? 0 : 1,
    transition: 'opacity 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  return (
    <nav style={menuStyles}>
      {items.map((item) => (
        <div
          key={item.id}
          style={menuItemStyles(activeItem === item.id)}
          onClick={() => handleItemClick(item)}
          onMouseEnter={(e) => {
            if (!activeItem || activeItem !== item.id) {
              e.currentTarget.style.backgroundColor = tokens.colors.neutral[50];
            }
          }}
          onMouseLeave={(e) => {
            if (activeItem !== item.id) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {item.icon && <div style={iconStyles}>{item.icon}</div>}
          <span style={labelStyles}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

// ==================== TABS COMPONENT ====================
export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'underline', // 'underline', 'filled'
}) => {
  const [internalActive, setInternalActive] = useState(activeTab || tabs[0]?.id);

  const currentActive = activeTab !== undefined ? activeTab : internalActive;

  const handleTabClick = (tabId) => {
    if (onChange) {
      onChange(tabId);
    } else {
      setInternalActive(tabId);
    }
  };

  const tabsContainerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: variant === 'underline' ? tokens.spacing.md : tokens.spacing.xs,
    borderBottom: variant === 'underline' ? '1px solid var(--ds-border, #DDDDDD)' : 'none',
    fontFamily: 'var(--ds-font-family, system-ui, sans-serif)',
  };

  const getTabStyles = (isActive) => {
    if (variant === 'underline') {
      return {
        display: 'inline-flex',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
        fontSize: `var(--ds-font-size-md, ${tokens.typography.fontSize.md})`,
        fontWeight: isActive ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.regular,
        color: isActive
          ? `var(--ds-success, ${tokens.colors.primary[500]})`
          : `var(--ds-fg-muted, ${tokens.colors.content.secondary})`,
        cursor: 'pointer',
        transition: 'color 0.15s ease, border-color 0.15s ease',
        borderBottom: isActive
          ? `2px solid var(--ds-success, ${tokens.colors.primary[500]})`
          : '2px solid transparent',
        marginBottom: '-1px',
        userSelect: 'none',
        background: 'transparent',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
      };
    }
    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: tokens.spacing.xs,
      padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
      fontSize: `var(--ds-font-size-md, ${tokens.typography.fontSize.md})`,
      fontWeight: tokens.typography.fontWeight.medium,
      color: isActive
        ? `var(--ds-success, ${tokens.colors.primary[500]})`
        : `var(--ds-fg-muted, ${tokens.colors.content.secondary})`,
      backgroundColor: isActive
        ? `var(--ds-surface, ${tokens.colors.neutral[0]})`
        : 'transparent',
      boxShadow: isActive ? 'var(--ds-shadow-sm, 0 2px 8px rgba(0,0,0,0.06))' : 'none',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      borderRadius: '100px',
      userSelect: 'none',
      border: 'none',
    };
  };

  return (
    <div style={tabsContainerStyles} role="tablist">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          style={getTabStyles(currentActive === tab.id)}
          onClick={() => handleTabClick(tab.id)}
          role="tab"
          aria-selected={currentActive === tab.id}
        >
          {tab.icon ? (
            <span style={{ display: 'inline-flex', flexShrink: 0, color: 'currentColor' }} aria-hidden="true">
              {tab.icon}
            </span>
          ) : null}
          {tab.label}
        </div>
      ))}
    </div>
  );
};

// ==================== DRAWER COMPONENT ====================
export const Drawer = ({
  isOpen = false,
  onClose,
  children,
  title,
  position = 'right', // 'left', 'right', 'bottom'
  width = '400px',
  height = '340px',
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.colors.overlay,
    zIndex: tokens.zIndex.drawerBackdrop,
    opacity: isAnimating ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  const isBottom = position === 'bottom';

  const drawerStyles = {
    position: 'fixed',
    top: isBottom ? 'auto' : 0,
    bottom: 0,
    left: isBottom ? 0 : 'auto',
    right: position === 'right' || isBottom ? 0 : 'auto',
    [position === 'left' ? 'left' : 'right']: !isBottom ? 0 : undefined,
    width: isBottom ? 'auto' : width,
    height: isBottom ? height : '100vh',
    backgroundColor: tokens.colors.neutral[0],
    boxShadow: tokens.colors.shadowOverlay,
    zIndex: tokens.zIndex.drawerPanel,
    display: 'flex',
    flexDirection: 'column',
    borderTopLeftRadius: isBottom ? tokens.borderRadius.md : 0,
    borderTopRightRadius: isBottom ? tokens.borderRadius.md : 0,
    transform: isAnimating
      ? 'translate(0, 0)'
      : isBottom
        ? 'translateY(100%)'
        : `translateX(${position === 'right' ? '100%' : '-100%'})`,
    transition: 'transform 0.3s ease',
    fontFamily: tokens.typography.fontFamily,
  };

  const headerStyles = {
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    borderBottom: `1px solid ${tokens.colors.border.secondary}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyles = {
    fontSize: tokens.typography.fontSize.xl,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.neutral[800],
    margin: 0,
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: tokens.spacing.xs,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.borderRadius.xs,
    transition: 'background-color 0.15s ease',
    color: tokens.colors.neutral[200],
  };

  const contentStyles = {
    flex: 1,
    padding: tokens.spacing.lg,
    overflowY: 'auto',
  };

  return (
    <>
      <div style={overlayStyles} onClick={onClose} />
      <div style={drawerStyles} role="dialog" aria-modal="true">
        <div style={headerStyles}>
          <h2 style={titleStyles}>{title}</h2>
          <button
            type="button"
            style={closeButtonStyles}
            onClick={onClose}
            aria-label="Fechar"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.neutral[100]}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={contentStyles}>
          {children}
        </div>
      </div>
    </>
  );
};

// ==================== MODAL COMPONENT ====================
export const Modal = ({
  isOpen = false,
  onClose,
  children,
  title,
  size = 'medium', // 'small', 'medium', 'large'
  showCloseButton = true,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 300);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  const sizes = {
    small: '400px',
    medium: '600px',
    large: '800px',
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.colors.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: tokens.zIndex.modalBackdrop,
    opacity: isAnimating ? 1 : 0,
    transition: 'opacity 0.3s ease',
    padding: tokens.spacing.lg,
  };

  const modalStyles = {
    position: 'relative',
    zIndex: tokens.zIndex.modalPanel,
    backgroundColor: tokens.colors.neutral[0],
    borderRadius: tokens.borderRadius.md,
    boxShadow: tokens.colors.shadowOverlay,
    width: '100%',
    maxWidth: sizes[size],
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    transform: isAnimating ? 'scale(1)' : 'scale(0.95)',
    opacity: isAnimating ? 1 : 0,
    transition: 'all 0.3s ease',
    fontFamily: tokens.typography.fontFamily,
  };

  const headerStyles = {
    padding: tokens.spacing.lg,
    borderBottom: `1px solid ${tokens.colors.border.secondary}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyles = {
    fontSize: tokens.typography.fontSize.xl,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.neutral[800],
    margin: 0,
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: tokens.spacing.xs,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.borderRadius.xs,
    transition: 'background-color 0.15s ease',
    color: tokens.colors.neutral[200],
  };

  const contentStyles = {
    padding: tokens.spacing.lg,
    overflowY: 'auto',
    flex: 1,
  };

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div
        style={modalStyles}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {(title || showCloseButton) && (
          <div style={headerStyles}>
            {title && <h2 id="modal-title" style={titleStyles}>{title}</h2>}
            {showCloseButton && (
              <button
                type="button"
                style={closeButtonStyles}
                onClick={onClose}
                aria-label="Fechar"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.neutral[100]}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        )}
        <div style={contentStyles}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ==================== BREADCRUMB COMPONENT ====================
export const Breadcrumb = ({
  items = [],
  separator = '/',
}) => {
  const breadcrumbStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.md,
    flexWrap: 'wrap',
  };

  const itemStyles = (isLast) => ({
    color: isLast ? tokens.colors.content.primary : tokens.colors.content.secondary,
    textDecoration: 'none',
    cursor: isLast ? 'default' : 'pointer',
    transition: 'color 0.15s ease',
    fontWeight: isLast ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.regular,
  });

  const separatorStyles = {
    color: tokens.colors.content.tertiary,
    userSelect: 'none',
  };

  return (
    <nav style={breadcrumbStyles} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.id || index}>
            {item.href && !isLast ? (
              <a
                href={item.href}
                style={itemStyles(isLast)}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                onMouseEnter={(e) => {
                  if (!isLast) {
                    e.currentTarget.style.color = tokens.colors.primary[500];
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLast) {
                    e.currentTarget.style.color = tokens.colors.content.secondary;
                  }
                }}
              >
                {item.label}
              </a>
            ) : (
              <span style={itemStyles(isLast)} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <span style={separatorStyles}>{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// ==================== DEMO ====================
export default function FinalComponentsDemo() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      ),
    },
    {
      id: 'users',
      label: 'Usuários',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
        </svg>
      ),
    },
  ];

  const tabs = [
    {
      id: 'tab1',
      label: 'Visão Geral',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    { id: 'tab2', label: 'Detalhes' },
    { id: 'tab3', label: 'Configurações' },
  ];

  const containerStyle = {
    padding: tokens.spacing.xl,
    backgroundColor: tokens.colors.neutral[50],
    minHeight: '100vh',
    fontFamily: tokens.typography.fontFamily,
  };

  const sectionStyle = {
    marginBottom: tokens.spacing.xxl,
    padding: tokens.spacing.xl,
    backgroundColor: tokens.colors.neutral[0],
    borderRadius: tokens.borderRadius.md,
  };

  const titleStyle = {
    fontSize: tokens.typography.fontSize.xxl,
    fontWeight: 700,
    marginBottom: tokens.spacing.lg,
    color: tokens.colors.neutral[800],
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  };

  const buttonStyle = {
    padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
    backgroundColor: tokens.colors.primary[500],
    color: tokens.colors.content.onBrandPrimary,
    border: 'none',
    borderRadius: tokens.borderRadius.sm,
    fontSize: tokens.typography.fontSize.md,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: tokens.typography.fontSize.xxxl, fontWeight: 700, marginBottom: tokens.spacing.xs, color: tokens.colors.primary[700] }}>
          Portal Empresa - Design System
        </h1>
        <p style={{ fontSize: tokens.typography.fontSize.lg, color: tokens.colors.content.secondary }}>
          Spinner, Skeleton, Tooltip, Menu, Tabs, Drawer, Modal & Breadcrumb
        </p>
      </div>

      {/* CARD */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🃏 Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <Card variant="outline" as="section" aria-labelledby="demo-card-login-title">
            <CardHeader
              action={
                <a href="#card" style={{ color: tokens.colors.primary[600], textDecoration: 'none', fontWeight: 600 }}>
                  Criar conta
                </a>
              }
            >
              <CardTitle id="demo-card-login-title">Entrar</CardTitle>
              <CardDescription>Use seu e-mail corporativo.</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="email"
                placeholder="voce@empresa.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: `1px solid ${tokens.colors.border.secondary}`,
                  fontSize: 14,
                }}
              />
            </CardContent>
            <CardFooter>
              <button type="button" style={{ ...buttonStyle, width: '100%', borderRadius: 9999 }}>
                Continuar
              </button>
            </CardFooter>
          </Card>

          <Card variant="filledPrimary" as="section" aria-labelledby="demo-card-banner-title" padding="lg">
            <CardHeader>
              <CardTitle id="demo-card-banner-title" tone="onBrand">
                Conta digital
              </CardTitle>
              <CardDescription tone="onBrand">Abertura rápida com o DS TP.IA.</CardDescription>
            </CardHeader>
            <CardFooter>
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  backgroundColor: 'color-mix(in srgb, var(--ds-on-inverse, #ffffff) 20%, transparent)',
                  border: `1px solid color-mix(in srgb, var(--ds-on-inverse, #ffffff) 50%, transparent)`,
                  width: '100%',
                  borderRadius: 9999,
                }}
              >
                Saiba mais
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🍞 Breadcrumb</h2>
        <Breadcrumb
          items={[
            { id: 'home', label: 'Home', href: '/', onClick: () => console.log('Home') },
            { id: 'products', label: 'Produtos', href: '/products', onClick: () => console.log('Produtos') },
            { id: 'category', label: 'Eletrônicos', href: '/products/electronics', onClick: () => console.log('Eletrônicos') },
            { id: 'current', label: 'Notebook Dell' },
          ]}
        />
        
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '24px', marginBottom: '16px' }}>
          Com separador customizado
        </h3>
        <Breadcrumb
          separator=">"
          items={[
            { id: 'home', label: 'Início', onClick: () => console.log('Início') },
            { id: 'config', label: 'Configurações', onClick: () => console.log('Config') },
            { id: 'profile', label: 'Perfil' },
          ]}
        />
      </div>

      {/* SPINNER */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>⏳ Spinner / Loader</h2>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <Spinner size="small" />
            <p style={{ marginTop: tokens.spacing.xs, fontSize: tokens.typography.fontSize.sm, color: tokens.colors.content.secondary }}>Small</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Spinner size="medium" />
            <p style={{ marginTop: tokens.spacing.xs, fontSize: tokens.typography.fontSize.sm, color: tokens.colors.content.secondary }}>Medium</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Spinner size="large" />
            <p style={{ marginTop: tokens.spacing.xs, fontSize: tokens.typography.fontSize.sm, color: tokens.colors.content.secondary }}>Large</p>
          </div>
        </div>
      </div>

      {/* SKELETON */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>◻ Skeleton (shadcn-like)</h2>
        <div style={{ padding: tokens.spacing.md, background: tokens.colors.neutral[0], border: `1px solid ${tokens.colors.border.secondary}`, borderRadius: tokens.borderRadius.md, maxWidth: '360px' }}>
          <SkeletonProfileRow />
        </div>
      </div>

      {/* TOOLTIP */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>💬 Tooltip</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', padding: '40px 0' }}>
          <Tooltip content="Tooltip no topo" position="top">
            <button style={buttonStyle}>Top</button>
          </Tooltip>
          <Tooltip content="Tooltip à direita" position="right">
            <button style={buttonStyle}>Right</button>
          </Tooltip>
          <Tooltip content="Tooltip embaixo" position="bottom">
            <button style={buttonStyle}>Bottom</button>
          </Tooltip>
          <Tooltip content="Tooltip à esquerda" position="left">
            <button style={buttonStyle}>Left</button>
          </Tooltip>
        </div>
      </div>

      {/* MENU */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📋 Menu / Sidebar</h2>
        <button
          style={{ ...buttonStyle, marginBottom: '16px' }}
          onClick={() => setMenuCollapsed(!menuCollapsed)}
        >
          {menuCollapsed ? 'Expandir Menu' : 'Colapsar Menu'}
        </button>
        <div style={{ border: `1px solid ${tokens.colors.border.secondary}`, borderRadius: '8px', overflow: 'hidden' }}>
          <Menu
            items={menuItems}
            collapsed={menuCollapsed}
            onItemClick={(item) => console.log('Clicou em:', item.label)}
          />
        </div>
      </div>

      {/* TABS */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📑 Tabs</h2>
        
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Underline</h3>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />
        <div style={{ padding: '24px', border: `1px solid ${tokens.colors.border.secondary}`, borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
          <p>Conteúdo da aba: {tabs.find(t => t.id === activeTab)?.label}</p>
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '32px', marginBottom: '16px' }}>Filled</h3>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="filled"
        />
        <div style={{ padding: '24px', border: `1px solid ${tokens.colors.border.secondary}`, marginTop: '16px', borderRadius: '8px' }}>
          <p>Conteúdo da aba: {tabs.find(t => t.id === activeTab)?.label}</p>
        </div>
      </div>

      {/* DRAWER */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🗂️ Drawer</h2>
        <button style={buttonStyle} onClick={() => setShowDrawer(true)}>
          Abrir Drawer
        </button>

        <Drawer
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          title="Configurações"
          position="right"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>Este é um drawer lateral que desliza da direita.</p>
            <p>Pode conter formulários, configurações, ou qualquer conteúdo.</p>
            <button style={buttonStyle}>Salvar</button>
          </div>
        </Drawer>
      </div>

      {/* MODAL */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🪟 Modal</h2>
        <button style={buttonStyle} onClick={() => setShowModal(true)}>
          Abrir Modal
        </button>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Confirmar Ação"
          size="medium"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>Você tem certeza que deseja realizar esta ação?</p>
            <p>Esta operação não pode ser desfeita.</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                style={buttonStyle}
                onClick={() => {
                  console.log('Confirmado');
                  setShowModal(false);
                }}
              >
                Confirmar
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: tokens.colors.neutral[200],
                  color: tokens.colors.content.primary,
                }}
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
