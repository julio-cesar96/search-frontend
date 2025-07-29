import React, { type JSX } from "react";
import { cn } from "../../../utils/cn";
import type { TypographyProps } from "../types";

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color = "primary",
  align = "left",
  className,
  children,
  as,
  unstyled = false,
}) => {
  const variants = {
    h1: "text-4xl font-bold tracking-tight",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-semibold",
    body: "text-base",
    caption: "text-sm",
    small: "text-xs",
    custom: "",
  };

  const colors = {
    primary: "text-gray-900",
    secondary: "text-gray-700",
    muted: "text-gray-500",
    error: "text-red-600",
    custom: "",
  };

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    custom: "",
  };

  const Component =
    as ||
    (variant.startsWith("h") && variant !== "custom"
      ? (variant as keyof JSX.IntrinsicElements)
      : "p");

  if (unstyled) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={cn(
        variant !== "custom" && variants[variant],
        color !== "custom" && colors[color],
        align !== "custom" && aligns[align],
        className
      )}
    >
      {children}
    </Component>
  );
};
