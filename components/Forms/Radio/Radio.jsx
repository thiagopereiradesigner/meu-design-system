import React, { useState } from 'react';
import { tokens } from '../tokens';

// ==================== RADIO COMPONENT ====================
export const Radio = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  name,
  value,
  error = '',
  helperText = '',
}) => {
  const hasError = !!error;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.xs,
    fontFamily: tokens.typography.fontFamily,
  };

  const radioWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };

  const radioInputStyles = {
    appearance: 'none',
    width: '20px',
    height: '20px',
    border: `1.5px solid ${
      hasError
        ? tokens.colors.semantic.error
        : checked
        ? tokens.colors.primary[500]
        : tokens.colors.border.secondary
    }`,
    borderRadius: '50%',
    backgroundColor: tokens.colors.neutral[0],
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    transition: 'all 0.15s ease',
    flexShrink: 0,
    opacity: disabled ? 0.5 : 1,
  };

  const dotStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: tokens.colors.primary[500],
    pointerEvents: 'none',
  };

  const labelStyles = {
    fontSize: tokens.typography.fontSize.md,
    color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
    lineHeight: tokens.typography.lineHeight.normal,
  };

  const helperTextStyles = {
    fontSize: tokens.typography.fontSize.sm,
    color: hasError ? tokens.colors.semantic.error : tokens.colors.content.secondary,
    marginLeft: '28px',
  };

  return (
    <div style={containerStyles}>
      <label style={radioWrapperStyles}>
        <div style={{ position: 'relative' }}>
          <input
            type="radio"
            style={radioInputStyles}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            name={name}
            value={value}
            aria-invalid={hasError}
            aria-describedby={error ? 'error-message' : helperText ? 'helper-text' : undefined}
          />
          {checked && <div style={dotStyles} />}
        </div>
        {label && <span style={labelStyles}>{label}</span>}
      </label>

      {(error || helperText) && (
        <p
          id={error ? 'error-message' : 'helper-text'}
          style={helperTextStyles}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

// ==================== RADIO GROUP COMPONENT ====================
export const RadioGroup = ({
  label,
  options = [],
  value,
  onChange,
  disabled = false,
  error = '',
  helperText = '',
  name,
  direction = 'vertical', // 'vertical' or 'horizontal'
}) => {
  const [internalValue, setInternalValue] = useState(value);
  
  const currentValue = value !== undefined ? value : internalValue;
  const hasError = !!error;

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
    fontFamily: tokens.typography.fontFamily,
  };

  const labelStyles = {
    fontSize: tokens.typography.fontSize.md,
    fontWeight: tokens.typography.fontWeight.medium,
    color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
    lineHeight: tokens.typography.lineHeight.normal,
  };

  const optionsContainerStyles = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    gap: tokens.spacing.sm,
    flexWrap: direction === 'horizontal' ? 'wrap' : 'nowrap',
  };

  const helperTextStyles = {
    fontSize: tokens.typography.fontSize.sm,
    color: hasError ? tokens.colors.semantic.error : tokens.colors.content.secondary,
  };

  return (
    <div style={containerStyles}>
      {label && <label style={labelStyles}>{label}</label>}
      
      <div style={optionsContainerStyles} role="radiogroup" aria-invalid={hasError}>
        {options.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            value={option.value}
            checked={currentValue === option.value}
            onChange={handleChange}
            disabled={disabled || option.disabled}
            name={name}
          />
        ))}
      </div>

      {(error || helperText) && (
        <p
          id={error ? 'error-message' : 'helper-text'}
          style={helperTextStyles}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

