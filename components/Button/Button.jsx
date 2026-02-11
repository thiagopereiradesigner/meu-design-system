import React, { useState } from 'react';

// Design Tokens (based on our previous conversation)
const tokens = {
  colors: {
    primary: {
      50: '#E6F4ED',
      100: '#CCE9DB',
      200: '#99D3B7',
      300: '#66BD93',
      400: '#33A76F',
      500: '#04843B', // Brand primary
      600: '#067647',
      700: '#005A1A',
      800: '#004D16',
      900: '#003D11'
    },
    neutral: {
      0: '#FFFFFF',
      50: '#F9F9F9',
      100: '#F3F3F3',
      200: '#C6C6C6',
      300: '#999999',
      400: '#6C6C6C',
      500: '#656976',
      600: '#4D4D4D',
      700: '#333333',
      800: '#1A1A1A',
      900: '#000000'
    },
    semantic: {
      success: '#04843B',
      error: '#DC2626',
      warning: '#F59E0B',
      info: '#3B82F6'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '16px',
      xl: '18px'
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    focus: '0 0 0 3px rgba(4, 132, 59, 0.1)'
  }
};

// Icon Components
const PlusIcon = ({ color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = ({ color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon = ({ color = 'currentColor', size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = ({ color = 'currentColor', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M12 4L4 12M4 4L12 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Button Component
const Button = ({
  children, // Se não passar children, o botão fica só com ícones
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'large', // large, medium
  state = 'default', // default, hover, focus, active, disabled
  leftIcon, // Ícone à esquerda (opcional)
  rightIcon, // Ícone à direita (opcional)
  iconOnly = false, // Se true, renderiza apenas o ícone (children é ignorado)
  onClick,
  className = '',
  ariaLabel, // Importante para acessibilidade quando iconOnly=true
  ...props
}) => {
  const [internalState, setInternalState] = useState('default');
  
  const isDisabled = state === 'disabled';
  const currentState = isDisabled ? 'disabled' : (state !== 'default' ? state : internalState);
  
  // Determina se deve mostrar texto
  const showText = !iconOnly && children;

  // Size styles
  const sizeStyles = {
    large: {
      padding: iconOnly ? '12px' : '12px 24px', // Quadrado se icon-only
      fontSize: tokens.typography.fontSize.md,
      height: '48px',
      width: iconOnly ? '48px' : 'auto', // Quadrado se icon-only
      gap: tokens.spacing.sm
    },
    medium: {
      padding: iconOnly ? '8px' : '8px 16px', // Quadrado se icon-only
      fontSize: tokens.typography.fontSize.sm,
      height: '40px',
      width: iconOnly ? '40px' : 'auto', // Quadrado se icon-only
      gap: tokens.spacing.sm
    }
  };

  // Variant + State combinations
  const getVariantStyles = () => {
    const baseStyles = {
      fontFamily: tokens.typography.fontFamily,
      fontWeight: tokens.typography.fontWeight.regular,
      lineHeight: tokens.typography.lineHeight.normal,
      borderRadius: tokens.borderRadius.full,
      border: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease-in-out',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none',
      ...sizeStyles[size]
    };

    const variants = {
      primary: {
        default: {
          backgroundColor: tokens.colors.primary[500],
          color: tokens.colors.neutral[0],
        },
        hover: {
          backgroundColor: tokens.colors.primary[600],
          color: tokens.colors.neutral[0],
        },
        focus: {
          backgroundColor: tokens.colors.primary[500],
          color: tokens.colors.neutral[0],
          boxShadow: tokens.shadows.focus,
        },
        active: {
          backgroundColor: tokens.colors.primary[700],
          color: tokens.colors.neutral[0],
        },
        disabled: {
          backgroundColor: tokens.colors.neutral[100],
          color: tokens.colors.neutral[200],
        }
      },
      secondary: {
        default: {
          backgroundColor: tokens.colors.primary[50],
          color: tokens.colors.primary[600],
        },
        hover: {
          backgroundColor: tokens.colors.primary[100],
          color: tokens.colors.primary[600],
        },
        focus: {
          backgroundColor: tokens.colors.primary[50],
          color: tokens.colors.primary[600],
          boxShadow: tokens.shadows.focus,
        },
        active: {
          backgroundColor: tokens.colors.primary[200],
          color: tokens.colors.primary[600],
        },
        disabled: {
          backgroundColor: tokens.colors.neutral[50],
          color: tokens.colors.neutral[200],
        }
      },
      outline: {
        default: {
          backgroundColor: 'transparent',
          color: tokens.colors.primary[600],
          border: `1px solid ${tokens.colors.primary[600]}`,
        },
        hover: {
          backgroundColor: tokens.colors.primary[50],
          color: tokens.colors.primary[600],
          border: `1px solid ${tokens.colors.primary[600]}`,
        },
        focus: {
          backgroundColor: 'transparent',
          color: tokens.colors.primary[600],
          border: `1px solid ${tokens.colors.primary[600]}`,
          boxShadow: tokens.shadows.focus,
        },
        active: {
          backgroundColor: tokens.colors.primary[100],
          color: tokens.colors.primary[600],
          border: `1px solid ${tokens.colors.primary[600]}`,
        },
        disabled: {
          backgroundColor: 'transparent',
          color: tokens.colors.neutral[200],
          border: `1px solid ${tokens.colors.neutral[200]}`,
        }
      },
      ghost: {
        default: {
          backgroundColor: 'transparent',
          color: tokens.colors.primary[600],
        },
        hover: {
          backgroundColor: tokens.colors.primary[50],
          color: tokens.colors.primary[600],
        },
        focus: {
          backgroundColor: 'transparent',
          color: tokens.colors.primary[600],
          boxShadow: tokens.shadows.focus,
        },
        active: {
          backgroundColor: tokens.colors.primary[100],
          color: tokens.colors.primary[600],
        },
        disabled: {
          backgroundColor: 'transparent',
          color: tokens.colors.neutral[200],
        }
      }
    };

    return {
      ...baseStyles,
      ...variants[variant][currentState]
    };
  };

  const iconColor = variant === 'primary' && currentState !== 'disabled' 
    ? tokens.colors.neutral[0] 
    : currentState === 'disabled'
    ? tokens.colors.neutral[200]
    : tokens.colors.primary[600];

  return (
    <button
      style={getVariantStyles()}
      onClick={!isDisabled ? onClick : undefined}
      onMouseEnter={() => !isDisabled && state === 'default' && setInternalState('hover')}
      onMouseLeave={() => !isDisabled && state === 'default' && setInternalState('default')}
      onFocus={() => !isDisabled && state === 'default' && setInternalState('focus')}
      onBlur={() => !isDisabled && state === 'default' && setInternalState('default')}
      onMouseDown={() => !isDisabled && state === 'default' && setInternalState('active')}
      onMouseUp={() => !isDisabled && state === 'default' && setInternalState('hover')}
      disabled={isDisabled}
      className={className}
      aria-label={iconOnly ? ariaLabel : undefined}
      {...props}
    >
      {leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{React.cloneElement(leftIcon, { color: iconColor })}</span>}
      {showText && <span>{children}</span>}
      {rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{React.cloneElement(rightIcon, { color: iconColor })}</span>}
    </button>
  );
};

// Filter Button Component (special case)
const FilterButton = ({ active = false, onRemove }) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    padding: '6px 12px',
    borderRadius: tokens.borderRadius.full,
    border: `1px solid ${tokens.colors.primary[600]}`,
    backgroundColor: active ? tokens.colors.primary[50] : 'transparent',
    color: tokens.colors.primary[500],
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.semibold,
    fontFamily: tokens.typography.fontFamily,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out'
  };

  const removeButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: tokens.colors.primary[800],
    border: 'none',
    cursor: 'pointer',
    padding: 0
  };

  return (
    <div style={baseStyles}>
      <FilterIcon color={tokens.colors.primary[500]} size={24} />
      <span>Filtro</span>
      {active && (
        <button style={removeButtonStyles} onClick={onRemove}>
          <CloseIcon color={tokens.colors.neutral[0]} size={12} />
        </button>
      )}
    </div>
  );
};

// Demo Component
export default function ButtonDemo() {
  const [filterActive, setFilterActive] = useState(false);

  const containerStyle = {
    padding: '40px',
    backgroundColor: tokens.colors.neutral[0],
    fontFamily: tokens.typography.fontFamily,
    minHeight: '100vh'
  };

  const sectionStyle = {
    marginBottom: '48px'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: tokens.typography.fontWeight.bold,
    marginBottom: '24px',
    color: tokens.colors.neutral[800]
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  };

  const labelStyle = {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.neutral[500],
    marginBottom: '8px',
    fontWeight: tokens.typography.fontWeight.medium
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ ...titleStyle, fontSize: '32px', marginBottom: '48px' }}>
        Portal Empresa - Design System Buttons
      </h1>

      {/* Primary Buttons */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Primary Buttons</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <p style={labelStyle}>Large (L)</p>
          <div style={gridStyle}>
            <div>
              <p style={labelStyle}>Default</p>
              <Button variant="primary" size="large" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Hover</p>
              <Button variant="primary" size="large" state="hover" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Focus</p>
              <Button variant="primary" size="large" state="focus" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Active</p>
              <Button variant="primary" size="large" state="active" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Disabled</p>
              <Button variant="primary" size="large" state="disabled" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
          </div>
        </div>

        <div>
          <p style={labelStyle}>Medium (M)</p>
          <div style={gridStyle}>
            <div>
              <p style={labelStyle}>Default</p>
              <Button variant="primary" size="medium" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Hover</p>
              <Button variant="primary" size="medium" state="hover" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Focus</p>
              <Button variant="primary" size="medium" state="focus" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Active</p>
              <Button variant="primary" size="medium" state="active" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Disabled</p>
              <Button variant="primary" size="medium" state="disabled" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Secondary Buttons</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <p style={labelStyle}>Large (L)</p>
          <div style={gridStyle}>
            <div>
              <p style={labelStyle}>Default</p>
              <Button variant="secondary" size="large" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Hover</p>
              <Button variant="secondary" size="large" state="hover" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Focus</p>
              <Button variant="secondary" size="large" state="focus" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Active</p>
              <Button variant="secondary" size="large" state="active" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Disabled</p>
              <Button variant="secondary" size="large" state="disabled" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
          </div>
        </div>

        <div>
          <p style={labelStyle}>Medium (M)</p>
          <div style={gridStyle}>
            <div>
              <p style={labelStyle}>Default</p>
              <Button variant="secondary" size="medium" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Hover</p>
              <Button variant="secondary" size="medium" state="hover" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Focus</p>
              <Button variant="secondary" size="medium" state="focus" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Active</p>
              <Button variant="secondary" size="medium" state="active" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Disabled</p>
              <Button variant="secondary" size="medium" state="disabled" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Outline Buttons */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Outline Buttons</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <p style={labelStyle}>Large (L)</p>
          <div style={gridStyle}>
            <div>
              <p style={labelStyle}>Default</p>
              <Button variant="outline" size="large" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Hover</p>
              <Button variant="outline" size="large" state="hover" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Focus</p>
              <Button variant="outline" size="large" state="focus" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Active</p>
              <Button variant="outline" size="large" state="active" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Disabled</p>
              <Button variant="outline" size="large" state="disabled" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
          </div>
        </div>

        <div>
          <p style={labelStyle}>Medium (M)</p>
          <div style={gridStyle}>
            <div>
              <p style={labelStyle}>Default</p>
              <Button variant="outline" size="medium" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Hover</p>
              <Button variant="outline" size="medium" state="hover" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Focus</p>
              <Button variant="outline" size="medium" state="focus" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Active</p>
              <Button variant="outline" size="medium" state="active" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Disabled</p>
              <Button variant="outline" size="medium" state="disabled" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Ghost Buttons</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <p style={labelStyle}>Large (L)</p>
          <div style={gridStyle}>
            <div>
              <p style={labelStyle}>Default</p>
              <Button variant="ghost" size="large" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Hover</p>
              <Button variant="ghost" size="large" state="hover" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Focus</p>
              <Button variant="ghost" size="large" state="focus" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Active</p>
              <Button variant="ghost" size="large" state="active" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Disabled</p>
              <Button variant="ghost" size="large" state="disabled" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
          </div>
        </div>

        <div>
          <p style={labelStyle}>Medium (M)</p>
          <div style={gridStyle}>
            <div>
              <p style={labelStyle}>Default</p>
              <Button variant="ghost" size="medium" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Hover</p>
              <Button variant="ghost" size="medium" state="hover" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Focus</p>
              <Button variant="ghost" size="medium" state="focus" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Active</p>
              <Button variant="ghost" size="medium" state="active" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
            <div>
              <p style={labelStyle}>Disabled</p>
              <Button variant="ghost" size="medium" state="disabled" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
                Button
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Button */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Filter Button (Special)</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div>
            <p style={labelStyle}>Default</p>
            <FilterButton />
          </div>
          <div>
            <p style={labelStyle}>Active (com close)</p>
            <FilterButton 
              active={true} 
              onRemove={() => setFilterActive(false)}
            />
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Exemplos de Uso</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="large" onClick={() => alert('Primary clicked!')}>
            Criar novo
          </Button>
          <Button variant="secondary" size="medium" leftIcon={<FilterIcon />}>
            Filtrar resultados
          </Button>
          <Button variant="outline" size="medium" rightIcon={<ArrowRightIcon />}>
            Ver mais
          </Button>
          <Button variant="ghost" size="medium">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
