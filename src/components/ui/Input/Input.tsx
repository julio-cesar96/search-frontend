import React from "react";
import { cn } from "../../../utils/cn";
import type { InputProps } from "../types";

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  unstyled = false,
  variant = "default",
  ...props
}) => {
  const inputStyles =
    variant === "default" && !unstyled
      ? "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      : "";

  const errorStyles =
    error && !unstyled ? "border-red-500 focus-visible:ring-red-500" : "";
  const leftPadding = leftIcon && !unstyled ? "pl-10" : "";
  const rightPadding = rightIcon && !unstyled ? "pr-10" : "";

  return (
    <div className="w-full">
      {label && (
        <label
          className={cn(
            !unstyled && "block text-sm font-medium text-gray-700 mb-1"
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div
            className={cn(
              !unstyled &&
                "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            )}
          >
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            inputStyles,
            leftPadding,
            rightPadding,
            errorStyles,
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div
            className={cn(
              !unstyled && "absolute inset-y-0 right-0 pr-3 flex items-center"
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className={cn(!unstyled && "mt-1 text-sm text-red-600")}>{error}</p>
      )}
      {helperText && !error && (
        <p className={cn(!unstyled && "mt-1 text-sm text-gray-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
};
