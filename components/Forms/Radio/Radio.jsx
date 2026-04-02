import React, { useId, useState } from 'react';
import { tokens } from '../tokens';

const RADIO_SIZES = {
  sm: { outer: 16, inner: 8, border: 1.5 },
  md: { outer: 20, inner: 10, border: 1.5 },
  lg: { outer: 24, inner: 12, border: 2 },
};

const LABEL_FONT_FOR_SIZE = {
  sm: tokens.typography.fontSize.sm,
  md: tokens.typography.fontSize.md,
  lg: tokens.typography.fontSize.lg,
};

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
  size = 'md',
  invalid = false,
}) => {
  const hasError = !!error || invalid;
  const dim = RADIO_SIZES[size] || RADIO_SIZES.md;

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

  const borderColor = hasError
    ? tokens.colors.semantic.error
    : disabled
    ? tokens.colors.border.secondary
    : checked
    ? tokens.colors.primary[500]
    : tokens.colors.border.secondary;

  const radioInputStyles = {
    appearance: 'none',
    width: `${dim.outer}px`,
    height: `${dim.outer}px`,
    boxSizing: 'border-box',
    border: `${dim.border}px solid ${borderColor}`,
    borderRadius: '50%',
    backgroundColor: disabled ? tokens.colors.neutral[50] : tokens.colors.neutral[0],
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    flexShrink: 0,
    opacity: disabled ? 0.85 : 1,
  };

  const dotColor = hasError
    ? tokens.colors.semantic.error
    : disabled
    ? tokens.colors.content.tertiary
    : tokens.colors.primary[500];

  const dotStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${dim.inner}px`,
    height: `${dim.inner}px`,
    borderRadius: '50%',
    backgroundColor: dotColor,
    pointerEvents: 'none',
  };

  const labelStyles = {
    fontSize: LABEL_FONT_FOR_SIZE[size] || LABEL_FONT_FOR_SIZE.md,
    color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
    lineHeight: tokens.typography.lineHeight.normal,
  };

  const helperTextStyles = {
    fontSize: tokens.typography.fontSize.sm,
    color: hasError ? tokens.colors.semantic.error : tokens.colors.content.secondary,
    marginLeft: `${dim.outer + 8}px`,
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
            aria-describedby={
              error ? 'error-message' : helperText ? 'helper-text' : undefined
            }
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
  size = 'md',
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const uid = useId();
  const groupLabelId = `radio-group-label-${uid}`;
  const groupDescId = `radio-group-desc-${uid}`;

  const currentValue = value !== undefined ? value : internalValue;
  const hasError = !!error;
  const hasGroupMessage = !!(error || helperText);

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
      {label && (
        <span id={groupLabelId} style={labelStyles}>
          {label}
        </span>
      )}

      <div
        style={optionsContainerStyles}
        role="radiogroup"
        aria-labelledby={label ? groupLabelId : undefined}
        aria-describedby={hasGroupMessage ? groupDescId : undefined}
        aria-invalid={hasError}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            value={option.value}
            checked={currentValue === option.value}
            onChange={handleChange}
            disabled={disabled || option.disabled}
            name={name}
            size={option.size || size}
            invalid={hasError}
          />
        ))}
      </div>

      {hasGroupMessage && (
        <p id={groupDescId} style={helperTextStyles}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

