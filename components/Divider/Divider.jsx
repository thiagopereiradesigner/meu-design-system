import React from "react";

export const Divider = ({
  orientation = "horizontal",
  color = "var(--ds-border)",
  thickness = 1,
  margin = 0,
  style,
  ...rest
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      style={{
        width: isHorizontal ? "100%" : thickness,
        height: isHorizontal ? thickness : "100%",
        backgroundColor: color,
        margin,
        ...style,
      }}
      {...rest}
    />
  );
};

