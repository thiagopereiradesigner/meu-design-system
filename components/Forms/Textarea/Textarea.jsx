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
  resize = 'vertical', // 'vertical', 'horizontal', 'both', 'none'
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
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

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.xs,
    width: '100%',
    fontFamily: tokens.typography.fontFamily,
  };

  const labelStyles = {
    fontSize: tokens.typography.fontSize.md,
    fontWeight: tokens.typography.fontWeight.medium,
    color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
    lineHeight: tokens.typography.lineHeight.normal,
  };

  const textareaWrapperStyles = {
    position: 'relative',
    width: '100%',
  };

  const textareaStyles = {
    width: '100%',
    padding: tokens.spacing.sm,
    fontSize: tokens.typography.fontSize.md,
    fontFamily: tokens.typography.fontFamily,
    lineHeight: tokens.typography.lineHeight.normal,
    color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
    backgroundColor: disabled ? tokens.colors.neutral[50] : tokens.colors.neutral[0],
    border: `1px solid ${
      hasError
        ? tokens.colors.semantic.error
        : isFocused
        ? tokens.colors.primary[500]
        : tokens.colors.border.secondary
    }`,
    borderRadius: tokens.borderRadius.sm,
    outline: 'none',
    resize: resize,
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    cursor: disabled ? 'not-allowed' : 'text',
    boxShadow: isFocused && !hasError ? `0 0 0 3px ${tokens.colors.primary[50]}` : 'none',
  };

  const helperTextStyles = {
    fontSize: tokens.typography.fontSize.sm,
    color: hasError ? tokens.colors.semantic.error : tokens.colors.content.secondary,
    lineHeight: tokens.typography.lineHeight.normal,
  };

  const charCountStyles = {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.content.tertiary,
    textAlign: 'right',
  };

  const bottomRowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: tokens.colors.semantic.error }}> *</span>}
        </label>
      )}
      
      <div style={textareaWrapperStyles}>
        <textarea
          style={textareaStyles}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={error ? 'error-message' : helperText ? 'helper-text' : undefined}
        />
      </div>

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

