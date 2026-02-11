import React, { useState, useRef, useEffect } from 'react';

// Design Tokens (reutilizados do Button)
const tokens = {
  colors: {
    primary: {
      50: '#E6F4ED',
      100: '#CCE9DB',
      200: '#99D3B7',
      300: '#66BD93',
      400: '#33A76F',
      500: '#04843B',
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
    content: {
      primary: '#393939',
      secondary: '#5E5E5E',
      tertiary: '#727272'
    },
    border: {
      primary: '#393939',
      secondary: '#DDDDDD',
      error: '#DC2626',
      focus: '#04843B'
    },
    semantic: {
      success: '#04843B',
      error: '#DC2626',
      warning: '#F59E0B',
      info: '#3B82F6'
    }
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px'
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
      normal: 1.5
    }
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    dropdown: '0 4px 12px rgba(0, 0, 0, 0.15)',
    focus: '0 0 0 3px rgba(4, 132, 59, 0.1)',
    error: '0 0 0 3px rgba(220, 38, 38, 0.1)'
  }
};

// ==================== ICONS ====================
const SearchIcon = ({ color = tokens.colors.primary[500], size = 20, state }) => {
  // Determina a cor baseada no estado se não for passada explicitamente
  let iconColor = color;
  if (state === 'error') {
    iconColor = tokens.colors.semantic.error;
  } else if (state === 'disabled') {
    iconColor = tokens.colors.content.tertiary;
  }
  
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
      <path d="M13.5 13.5L17 17" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

const InfoIcon = ({ color = tokens.colors.content.secondary, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5"/>
    <path d="M8 7V11M8 5V5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ChevronDownIcon = ({ color = tokens.colors.primary[500], size = 24, isOpen = false }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    style={{ 
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease'
    }}
  >
    <path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AlertCircleIcon = ({ color = tokens.colors.semantic.error, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5"/>
    <path d="M8 4V8M8 11V11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = ({ color = tokens.colors.primary[500], size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8L6 11L13 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ==================== INPUT COMPONENT ====================
const Input = ({
  label,
  sublabel,
  placeholder = 'Your text input here',
  value = '',
  onChange,
  error,
  helperText,
  disabled = false,
  leftIcon,
  showInfoIcon = false,
  type = 'text',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) onChange(e);
  };

  // Estilos do container do input
  const getInputContainerStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.xs,
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      backgroundColor: tokens.colors.neutral[0],
      borderRadius: tokens.borderRadius.xs,
      border: `1px solid ${tokens.colors.border.secondary}`,
      transition: 'all 0.2s ease',
      width: '100%'
    };

    if (disabled) {
      return {
        ...baseStyles,
        backgroundColor: tokens.colors.neutral[50],
        borderColor: tokens.colors.border.secondary,
        cursor: 'not-allowed',
        opacity: 0.6
      };
    }

    if (error) {
      return {
        ...baseStyles,
        borderColor: tokens.colors.border.error,
        boxShadow: isFocused ? tokens.shadows.error : 'none'
      };
    }

    if (isFocused) {
      return {
        ...baseStyles,
        borderColor: tokens.colors.border.focus,
        boxShadow: tokens.shadows.focus
      };
    }

    return baseStyles;
  };

  const inputStyles = {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.md,
    fontWeight: tokens.typography.fontWeight.regular,
    lineHeight: tokens.typography.lineHeight.normal,
    color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
    cursor: disabled ? 'not-allowed' : 'text'
  };

  const labelStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xxs,
    marginBottom: tokens.spacing.xxs
  };

  const labelTextStyles = {
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: error ? tokens.colors.semantic.error : tokens.colors.content.primary,
    lineHeight: tokens.typography.lineHeight.normal
  };

  const sublabelStyles = {
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.regular,
    color: tokens.colors.content.secondary,
    lineHeight: tokens.typography.lineHeight.normal
  };

  const helperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    marginTop: tokens.spacing.xxs,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.xs,
    fontWeight: tokens.typography.fontWeight.regular,
    color: error ? tokens.colors.semantic.error : tokens.colors.content.secondary,
    lineHeight: tokens.typography.lineHeight.normal
  };

  // Determina o estado atual para os ícones
  const getIconState = () => {
    if (disabled) return 'disabled';
    if (error) return 'error';
    return 'default';
  };

  return (
    <div className={className} style={{ width: '100%' }}>
      {/* Label */}
      {label && (
        <div style={labelStyles}>
          <span style={labelTextStyles}>{label}</span>
          {sublabel && <span style={sublabelStyles}>{sublabel}</span>}
          {showInfoIcon && <InfoIcon />}
        </div>
      )}

      {/* Input Container */}
      <div style={getInputContainerStyles()}>
        {leftIcon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {React.cloneElement(leftIcon, { state: getIconState() })}
          </span>
        )}
        <input
          type={type}
          value={internalValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyles}
          {...props}
        />
      </div>

      {/* Helper Text */}
      {(helperText || error) && (
        <div style={helperStyles}>
          {error ? <AlertCircleIcon /> : <InfoIcon />}
          <span>{error || helperText}</span>
        </div>
      )}
    </div>
  );
};

// ==================== SELECT COMPONENT ====================
const Select = ({
  label,
  sublabel,
  placeholder = 'Selecione uma opção',
  value = '',
  onChange,
  options = [],
  error,
  helperText,
  disabled = false,
  showInfoIcon = false,
  searchable = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (option) => {
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(!isOpen);
    }
  };

  // Filtra opções se searchable
  const filteredOptions = searchable
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Encontra label do valor selecionado
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Estilos do container do select
  const getSelectContainerStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.xs,
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      backgroundColor: tokens.colors.neutral[0],
      borderRadius: tokens.borderRadius.xs,
      border: `1px solid ${tokens.colors.border.secondary}`,
      transition: 'all 0.2s ease',
      width: '100%',
      cursor: disabled ? 'not-allowed' : 'pointer'
    };

    if (disabled) {
      return {
        ...baseStyles,
        backgroundColor: tokens.colors.neutral[50],
        borderColor: tokens.colors.border.secondary,
        opacity: 0.6
      };
    }

    if (error) {
      return {
        ...baseStyles,
        borderColor: tokens.colors.border.error,
        boxShadow: isFocused ? tokens.shadows.error : 'none'
      };
    }

    if (isFocused || isOpen) {
      return {
        ...baseStyles,
        borderColor: tokens.colors.border.focus,
        boxShadow: tokens.shadows.focus
      };
    }

    return baseStyles;
  };

  const dropdownStyles = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    backgroundColor: tokens.colors.neutral[0],
    border: `1px solid ${tokens.colors.border.secondary}`,
    borderRadius: tokens.borderRadius.xs,
    boxShadow: tokens.shadows.dropdown,
    maxHeight: '240px',
    overflowY: 'auto',
    zIndex: 1000
  };

  const optionStyles = (isSelected, isDisabled) => ({
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: isSelected ? tokens.colors.primary[50] : 'transparent',
    color: isDisabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
    fontSize: tokens.typography.fontSize.md,
    fontFamily: tokens.typography.fontFamily,
    transition: 'background-color 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  });

  const labelStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xxs,
    marginBottom: tokens.spacing.xxs
  };

  const labelTextStyles = {
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: error ? tokens.colors.semantic.error : tokens.colors.content.primary,
    lineHeight: tokens.typography.lineHeight.normal
  };

  const sublabelStyles = {
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.regular,
    color: tokens.colors.content.secondary,
    lineHeight: tokens.typography.lineHeight.normal
  };

  const helperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    marginTop: tokens.spacing.xxs,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.xs,
    fontWeight: tokens.typography.fontWeight.regular,
    color: error ? tokens.colors.semantic.error : tokens.colors.content.secondary,
    lineHeight: tokens.typography.lineHeight.normal
  };

  const displayTextStyles = {
    flex: 1,
    fontFamily: tokens.typography.fontFamily,
    fontSize: tokens.typography.fontSize.md,
    color: selectedOption ? tokens.colors.content.primary : tokens.colors.content.tertiary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  // Determina o estado atual para os ícones
  const getIconState = () => {
    if (disabled) return 'disabled';
    if (error) return 'error';
    return 'default';
  };

  return (
    <div className={className} style={{ width: '100%', position: 'relative' }} ref={selectRef}>
      {/* Label */}
      {label && (
        <div style={labelStyles}>
          <span style={labelTextStyles}>{label}</span>
          {sublabel && <span style={sublabelStyles}>{sublabel}</span>}
          {showInfoIcon && <InfoIcon />}
        </div>
      )}

      {/* Select Container */}
      <div style={getSelectContainerStyles()} onClick={toggleDropdown}>
        {searchable && <SearchIcon size={20} state={getIconState()} />}
        <span style={displayTextStyles}>{displayText}</span>
        <ChevronDownIcon isOpen={isOpen} color={disabled ? tokens.colors.content.tertiary : error ? tokens.colors.semantic.error : tokens.colors.primary[500]} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div style={dropdownStyles}>
          {searchable && (
            <div style={{ padding: tokens.spacing.xs, borderBottom: `1px solid ${tokens.colors.border.secondary}` }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                style={{
                  width: '100%',
                  padding: tokens.spacing.xs,
                  border: `1px solid ${tokens.colors.border.secondary}`,
                  borderRadius: tokens.borderRadius.xs,
                  fontSize: tokens.typography.fontSize.sm,
                  fontFamily: tokens.typography.fontFamily,
                  outline: 'none'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          {filteredOptions.length === 0 ? (
            <div style={{ padding: tokens.spacing.md, textAlign: 'center', color: tokens.colors.content.tertiary }}>
              Nenhuma opção encontrada
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                style={optionStyles(option.value === value, option.disabled)}
                onClick={() => !option.disabled && handleSelectOption(option)}
                onMouseEnter={(e) => {
                  if (!option.disabled && option.value !== value) {
                    e.currentTarget.style.backgroundColor = tokens.colors.primary[50];
                  }
                }}
                onMouseLeave={(e) => {
                  if (option.value !== value) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{option.label}</span>
                {option.value === value && <CheckIcon />}
              </div>
            ))
          )}
        </div>
      )}

      {/* Helper Text */}
      {(helperText || error) && (
        <div style={helperStyles}>
          {error ? <AlertCircleIcon /> : <InfoIcon />}
          <span>{error || helperText}</span>
        </div>
      )}
    </div>
  );
};

// ==================== DEMO COMPONENT ====================
export default function InputSelectDemo() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('br');

  const estados = [
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'es', label: 'Espírito Santo' },
    { value: 'pr', label: 'Paraná' },
    { value: 'sc', label: 'Santa Catarina' },
    { value: 'rs', label: 'Rio Grande do Sul' }
  ];

  const cidades = [
    { value: 'sao-paulo', label: 'São Paulo' },
    { value: 'rio', label: 'Rio de Janeiro' },
    { value: 'bh', label: 'Belo Horizonte' },
    { value: 'curitiba', label: 'Curitiba' },
    { value: 'porto-alegre', label: 'Porto Alegre', disabled: true }
  ];

  const paises = [
    { value: 'br', label: 'Brasil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'uk', label: 'Reino Unido' }
  ];

  const containerStyle = {
    padding: '40px',
    backgroundColor: tokens.colors.neutral[0],
    fontFamily: tokens.typography.fontFamily,
    minHeight: '100vh'
  };

  const sectionStyle = {
    marginBottom: '48px',
    padding: '32px',
    backgroundColor: tokens.colors.neutral[50],
    borderRadius: tokens.borderRadius.md
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: tokens.typography.fontWeight.bold,
    marginBottom: '24px',
    color: tokens.colors.neutral[800]
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px'
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: tokens.typography.fontWeight.bold, marginBottom: '8px', color: tokens.colors.primary[700] }}>
          Portal Empresa - Design System
        </h1>
        <p style={{ fontSize: '16px', color: tokens.colors.content.secondary }}>
          Componentes Input e Select
        </p>
      </div>

      {/* INPUT STATES */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📝 Input - Estados</h2>
        <div style={gridStyle}>
          <Input
            label="Input label"
            sublabel="Sublabel"
            placeholder="Your text input here"
            leftIcon={<SearchIcon />}
            showInfoIcon
            helperText="Input label"
          />
          <Input
            label="Input com valor"
            placeholder="Digite algo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            leftIcon={<SearchIcon />}
            helperText="Este input está controlado"
          />
          <Input
            label="Input com erro"
            placeholder="Campo obrigatório"
            error="Este campo é obrigatório"
            leftIcon={<SearchIcon />}
          />
          <Input
            label="Input desabilitado"
            placeholder="Campo desabilitado"
            disabled
            leftIcon={<SearchIcon />}
            helperText="Este campo está desabilitado"
          />
        </div>
      </div>

      {/* INPUT VARIATIONS */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🎨 Input - Variações</h2>
        <div style={gridStyle}>
          <Input
            label="Sem ícone"
            placeholder="Input simples"
            helperText="Input sem ícone à esquerda"
          />
          <Input
            label="Com ícone de busca"
            placeholder="Buscar..."
            leftIcon={<SearchIcon />}
          />
          <Input
            label="Só label"
            placeholder="Sem sublabel nem ícone info"
          />
          <Input
            label="Nome completo"
            sublabel="obrigatório"
            showInfoIcon
            placeholder="Digite seu nome"
            helperText="Este campo será usado no seu perfil"
          />
        </div>
      </div>

      {/* SELECT BASIC */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📋 Select - Básico</h2>
        <div style={gridStyle}>
          <Select
            label="Estado"
            sublabel="obrigatório"
            placeholder="Selecione um estado"
            value={selectedState}
            onChange={(opt) => setSelectedState(opt.value)}
            options={estados}
            showInfoIcon
            helperText="Selecione o estado onde você mora"
          />
          <Select
            label="Cidade"
            placeholder="Selecione uma cidade"
            value={selectedCity}
            onChange={(opt) => setSelectedCity(opt.value)}
            options={cidades}
            helperText="Algumas opções podem estar desabilitadas"
          />
          <Select
            label="Select com erro"
            placeholder="Selecione"
            options={estados}
            error="Este campo é obrigatório"
          />
          <Select
            label="Select desabilitado"
            placeholder="Campo desabilitado"
            disabled
            options={estados}
            helperText="Este campo está desabilitado"
          />
        </div>
      </div>

      {/* SELECT SEARCHABLE */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🔍 Select - Com busca</h2>
        <div style={gridStyle}>
          <Select
            label="País (com busca)"
            placeholder="Busque um país"
            value={selectedCountry}
            onChange={(opt) => setSelectedCountry(opt.value)}
            options={paises}
            searchable
            showInfoIcon
            helperText="Digite para filtrar as opções"
          />
          <Select
            label="Estado (com busca)"
            placeholder="Busque um estado"
            options={estados}
            searchable
            helperText="Útil para listas longas"
          />
        </div>
      </div>

      {/* FORM EXAMPLE */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>💼 Exemplo: Formulário Completo</h2>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ marginBottom: '24px' }}>
            <Input
              label="Nome completo"
              sublabel="obrigatório"
              placeholder="Digite seu nome"
              showInfoIcon
              helperText="Como você gostaria de ser chamado?"
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Input
              label="Email"
              sublabel="obrigatório"
              type="email"
              placeholder="seu@email.com"
              helperText="Usaremos este email para contato"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <Select
              label="Estado"
              sublabel="obrigatório"
              placeholder="Selecione"
              options={estados}
              searchable
            />
            <Select
              label="Cidade"
              placeholder="Selecione"
              options={cidades}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Input
              label="Buscar"
              placeholder="Buscar produtos..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              leftIcon={<SearchIcon />}
            />
          </div>
        </div>
      </div>

      {/* ACCESSIBILITY NOTE */}
      <div style={{ 
        marginTop: '48px', 
        padding: '24px', 
        backgroundColor: tokens.colors.primary[50], 
        borderRadius: tokens.borderRadius.md,
        borderLeft: `4px solid ${tokens.colors.primary[500]}`
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: tokens.typography.fontWeight.semibold, marginBottom: '12px', color: tokens.colors.primary[800] }}>
          ♿ Acessibilidade
        </h3>
        <ul style={{ fontSize: '14px', color: tokens.colors.neutral[700], lineHeight: 1.6, paddingLeft: '20px' }}>
          <li>Focus ring visível em todos os estados</li>
          <li>Estados de erro claramente identificados com cor e ícone</li>
          <li>Helper text fornece contexto adicional</li>
          <li>Placeholders descritivos</li>
          <li>Select com navegação por teclado (próxima iteração)</li>
          <li>Contrast ratio conforme WCAG AA</li>
        </ul>
      </div>
    </div>
  );
}
