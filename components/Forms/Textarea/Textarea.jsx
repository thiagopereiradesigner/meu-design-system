import React, { useState } from 'react';
import { tokens } from '../tokens';

// ==================== TEXTAREA COMPONENT ====================
export const Textarea = ({
  label,
  placeholder = '',
  value = '',
  onChange,
  error = '',
  helperText = '',
  disabled = false,
  rows = 4,
  maxLength,
  showCharCount = false,
  resize = 'vertical',
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const currentValue = value !== undefined ? value : internalValue;
  const hasError = !!error;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;

    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(newValue);
    }
  };

  const borderColor = (() => {
    if (hasError) {
      if (isHovered && !disabled) {
        return `color-mix(in srgb, var(--ds-error, ${tokens.colors.semantic.error}) 68%, var(--ds-surface, ${tokens.colors.neutral[0]}))`;
      }
      return `var(--ds-error, ${tokens.colors.semantic.error})`;
    }
    if (isFocused) {
      return `var(--ds-success, ${tokens.colors.primary[500]})`;
    }
    if (isHovered && !disabled) {
      return `var(--ds-success, ${tokens.colors.primary[500]})`;
    }
    return `var(--ds-border, ${tokens.colors.border.secondary})`;
  })();

  const boxShadow =
    isFocused && !hasError && !disabled
      ? 'var(--ds-focus-ring, 0 0 0 3px rgba(4,132,59,0.14))'
      : hasError && isFocused
        ? `0 0 0 3px color-mix(in srgb, var(--ds-error, ${tokens.colors.semantic.error}) 14%, transparent)`
        : 'none';

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: `var(--ds-space-xs, ${tokens.spacing.xs})`,
    width: '100%',
    fontFamily: 'var(--ds-font-family, system-ui, sans-serif)',
  };

  const labelStyles = {
    fontSize: `var(--ds-font-size-md, ${tokens.typography.fontSize.md})`,
    fontWeight: tokens.typography.fontWeight.medium,
    color: disabled
      ? `var(--ds-fg-subtle, ${tokens.colors.content.tertiary})`
      : `var(--ds-fg, ${tokens.colors.content.primary})`,
    lineHeight: tokens.typography.lineHeight.normal,
  };

  const textareaStyles = {
    width: '100%',
    padding: `var(--ds-space-md, ${tokens.spacing.sm})`,
    fontSize: `var(--ds-font-size-md, ${tokens.typography.fontSize.md})`,
    fontFamily: 'var(--ds-font-family, system-ui, sans-serif)',
    lineHeight: tokens.typography.lineHeight.normal,
    color: disabled
      ? `var(--ds-fg-muted, ${tokens.colors.content.tertiary})`
      : `var(--ds-fg, ${tokens.colors.content.primary})`,
    backgroundColor: disabled
      ? `var(--ds-bg-subtle, ${tokens.colors.neutral[50]})`
      : `var(--ds-surface, ${tokens.colors.neutral[0]})`,
    border: `1px solid ${borderColor}`,
    borderRadius: `var(--ds-radius-md, ${tokens.borderRadius.sm})`,
    outline: 'none',
    resize: resize,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'text',
    boxShadow,
  };

  const helperTextStyles = {
    fontSize: `var(--ds-font-size-sm, ${tokens.typography.fontSize.sm})`,
    color: hasError
      ? `var(--ds-error, ${tokens.colors.semantic.error})`
      : `var(--ds-fg-muted, ${tokens.colors.content.secondary})`,
    lineHeight: tokens.typography.lineHeight.normal,
  };

  const charCountStyles = {
    fontSize: `var(--ds-font-size-sm, ${tokens.typography.fontSize.sm})`,
    color: `var(--ds-fg-muted, ${tokens.colors.content.tertiary})`,
    textAlign: 'right',
  };

  const bottomRowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: `var(--ds-space-sm, ${tokens.spacing.sm})`,
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && (
            <span style={{ color: `var(--ds-error, ${tokens.colors.semantic.error})` }}> *</span>
          )}
        </label>
      )}

      <textarea
        style={textareaStyles}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={hasError}
        aria-describedby={error ? 'error-message' : helperText ? 'helper-text' : undefined}
      />

      {(helperText || error || showCharCount) && (
        <div style={bottomRowStyles}>
          <div style={{ flex: 1 }}>
            {error && (
              <p id="error-message" style={helperTextStyles}>
                {error}
              </p>
            )}
            {!error && helperText && (
              <p id="helper-text" style={helperTextStyles}>
                {helperText}
              </p>
            )}
          </div>

          {showCharCount && maxLength && (
            <span style={charCountStyles}>
              {currentValue.length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
