import React from "react";
import { cn } from "../../../utils/cn";
import type { CardProps } from "../types";

export const Card: React.FC<CardProps> = ({
  className,
  children,
  hover = false,
  padding = "md",
  variant = "default",
  as: Component = "div",
  unstyled = false,
  onClick,
  ...props
}) => {
  if (unstyled) {
    return (
      <Component className={className} onClick={onClick} {...props}>
        {children}
      </Component>
    );
  }

  const variants = {
    default: "rounded-lg border border-gray-200 bg-white shadow-sm",
    outlined: "rounded-lg border-2 border-gray-300 bg-white",
    elevated: "rounded-lg bg-white shadow-lg border-0",
    custom: "",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    custom: "",
  };

  const hoverEffect =
    hover && variant !== "custom"
      ? "transition-shadow hover:shadow-md cursor-pointer"
      : "";

  return (
    <Component
      className={cn(
        variant !== "custom" && variants[variant],
        padding !== "custom" && paddings[padding],
        hoverEffect,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};
