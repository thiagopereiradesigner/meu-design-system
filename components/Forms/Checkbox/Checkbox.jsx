import React, { useState } from 'react';
import { tokens } from '../tokens';

// ==================== CHECKBOX COMPONENT ====================
export const Checkbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  error = '',
  helperText = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(checked);
  
  const isChecked = checked !== undefined ? checked : internalChecked;
  const hasError = !!error;

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    if (onChange) {
      onChange(newChecked);
    } else {
      setInternalChecked(newChecked);
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.xs,
    fontFamily: tokens.typography.fontFamily,
  };

  const checkboxWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };

  const checkboxInputStyles = {
    appearance: 'none',
    width: '20px',
    height: '20px',
    border: `1.5px solid ${
      hasError
        ? tokens.colors.semantic.error
        : isChecked || indeterminate
        ? tokens.colors.primary[500]
        : tokens.colors.border.secondary
    }`,
    borderRadius: tokens.borderRadius.xs,
    backgroundColor: isChecked || indeterminate ? tokens.colors.primary[500] : tokens.colors.neutral[0],
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    transition: 'all 0.15s ease',
    flexShrink: 0,
    opacity: disabled ? 0.5 : 1,
  };

  const checkmarkStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '12px',
    height: '12px',
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
      <label style={checkboxWrapperStyles}>
        <div style={{ position: 'relative' }}>
          <input
            type="checkbox"
            style={checkboxInputStyles}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={error ? 'error-message' : helperText ? 'helper-text' : undefined}
          />
          {(isChecked || indeterminate) && (
            <svg
              style={checkmarkStyles}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {indeterminate ? (
                <rect x="2" y="5" width="8" height="2" fill="white" />
              ) : (
                <path
                  d="M2 6L5 9L10 3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          )}
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

