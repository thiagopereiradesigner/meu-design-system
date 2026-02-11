import React, { useState } from 'react';
import { tokens } from '../tokens';

// ==================== SWITCH COMPONENT ====================
export const Switch = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  size = 'medium', // 'small', 'medium'
  labelPosition = 'right', // 'left', 'right'
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
    },
    medium: {
      width: 44,
      height: 24,
      thumbSize: 20,
      thumbOffset: 2,
    },
  };

  const currentSize = sizes[size];

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    fontFamily: tokens.typography.fontFamily,
  };

  const switchTrackStyles = {
    position: 'relative',
    width: `${currentSize.width}px`,
    height: `${currentSize.height}px`,
    backgroundColor: isChecked ? tokens.colors.primary[500] : tokens.colors.neutral[200],
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
    backgroundColor: tokens.colors.neutral[0],
    borderRadius: '50%',
    transition: 'left 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const labelStyles = {
    fontSize: tokens.typography.fontSize.md,
    color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
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

