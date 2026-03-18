"use client";

import React from "react";

const StepSegment = ({ status }) => {
  // status: "completed" | "active" | "upcoming"
  const isGreen = status === "completed" || status === "active";

  return (
    <div
      aria-hidden="true"
      style={{
        flex: 1,
        height: 6,
        borderRadius: 9999,
        background: isGreen ? "var(--ds-success)" : "var(--ds-border)",
      }}
    />
  );
};

export const Stepper = ({
  steps = [],
  currentStep = 0,
  sticky = true,
  offsetTop = 56,
  style,
  topLabelStyle,
}) => {
  const safeCurrent = Math.max(0, Math.min(currentStep, steps.length - 1));

  return (
    <div
      style={{
        position: sticky ? "sticky" : "relative",
        top: offsetTop,
        zIndex: 30,
        background: "var(--ds-bg)",
        borderBottom: "1px solid var(--ds-border)",
        padding: "12px 0",
        ...style,
      }}
    >
      <div
        role="list"
        aria-label="Etapas do fluxo"
        style={{ display: "flex", alignItems: "center", gap: 6 }}
      >
        {steps.map((s, idx) => {
          const status = idx < safeCurrent ? "completed" : idx === safeCurrent ? "active" : "upcoming";

          return (
            <div
              key={idx}
              role="listitem"
              aria-current={idx === safeCurrent ? "step" : undefined}
              aria-label={s?.label ?? `Step ${idx + 1}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <StepSegment status={status} />
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 8,
          fontFamily: "var(--ds-font-family)",
          fontSize: 12,
          fontWeight: 900,
          color: "var(--ds-success)",
          textAlign: "center",
          width: "100%",
          ...topLabelStyle,
        }}
      >
        {steps[safeCurrent]?.label ?? ""}
      </div>
    </div>
  );
};

