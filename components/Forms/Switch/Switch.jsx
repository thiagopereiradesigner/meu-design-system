import React, { useState } from 'react';
import { tokens } from '../tokens';

// ==================== SWITCH COMPONENT ====================
export const Switch = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  size = 'medium', // 'small' | 'medium' | 'large'
  labelPosition = 'right', // 'left' | 'right'
}) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = () => {
    if (disabled) return;

    const newChecked = !isChecked;
    if (onChange) {
      onChange(newChecked);
    } else {
      setInternalChecked(newChecked);
    }
  };

  const sizes = {
    small: {
      width: 36,
      height: 20,
      thumbSize: 16,
      thumbOffset: 2,
      labelFont: `var(--ds-font-size-sm, ${tokens.typography.fontSize.sm})`,
    },
    medium: {
      width: 44,
      height: 24,
      thumbSize: 20,
      thumbOffset: 2,
      labelFont: `var(--ds-font-size-md, ${tokens.typography.fontSize.md})`,
    },
    large: {
      width: 52,
      height: 28,
      thumbSize: 24,
      thumbOffset: 2,
      labelFont: `var(--ds-font-size-lg, ${tokens.typography.fontSize.lg})`,
    },
  };

  const currentSize = sizes[size] || sizes.medium;

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    fontFamily: 'var(--ds-font-family, system-ui, sans-serif)',
  };

  const switchTrackStyles = {
    position: 'relative',
    width: `${currentSize.width}px`,
    height: `${currentSize.height}px`,
    backgroundColor: isChecked
      ? `var(--ds-success, ${tokens.colors.primary[500]})`
      : `var(--ds-n200, ${tokens.colors.neutral[200]})`,
    borderRadius: `${currentSize.height / 2}px`,
    transition: 'background-color 0.2s ease',
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
  };

  const switchThumbStyles = {
    position: 'absolute',
    top: `${currentSize.thumbOffset}px`,
    left: isChecked
      ? `${currentSize.width - currentSize.thumbSize - currentSize.thumbOffset}px`
      : `${currentSize.thumbOffset}px`,
    width: `${currentSize.thumbSize}px`,
    height: `${currentSize.thumbSize}px`,
    backgroundColor: `var(--ds-on-inverse, ${tokens.colors.neutral[0]})`,
    borderRadius: '50%',
    transition: 'left 0.2s ease',
    boxShadow: 'var(--ds-shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.12))',
  };

  const labelStyles = {
    fontSize: currentSize.labelFont,
    color: disabled
      ? `var(--ds-fg-subtle, ${tokens.colors.content.tertiary})`
      : `var(--ds-fg, ${tokens.colors.content.primary})`,
    lineHeight: tokens.typography.lineHeight.normal,
  };

  return (
    <label style={containerStyles} onClick={handleChange}>
      <div style={switchTrackStyles}>
        <div style={switchThumbStyles} />
      </div>
      {label && <span style={labelStyles}>{label}</span>}
    </label>
  );
};
