import React from "react";
import { cn } from "../../../utils/cn";
import type { BoxProps } from "../types";

export const Box: React.FC<BoxProps> = ({
  className,
  children,
  as: Component = "div",
  padding = "none",
  margin = "none",
  display = "block",
  unstyled = false,
  ...props
}) => {
  if (unstyled) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  const paddings = {
    none: "",
    xs: "p-1",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
    custom: "",
  };

  const margins = {
    none: "",
    xs: "m-1",
    sm: "m-2",
    md: "m-4",
    lg: "m-6",
    xl: "m-8",
    custom: "",
  };

  const displays = {
    block: "block",
    flex: "flex",
    inline: "inline",
    "inline-block": "inline-block",
    grid: "grid",
    custom: "",
  };

  return (
    <Component
      className={cn(
        display !== "custom" && displays[display],
        padding !== "custom" && paddings[padding],
        margin !== "custom" && margins[margin],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
