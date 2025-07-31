import React, { type JSX, type ReactNode } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "custom";
  size?: "small" | "medium" | "large" | "custom";
  loading?: boolean;
  children: React.ReactNode;
  unstyled?: boolean;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  unstyled?: boolean;
  variant?: "default" | "custom";
}

export interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "small" | "custom";
  color?: "primary" | "secondary" | "muted" | "error" | "custom";
  align?: "left" | "center" | "right" | "custom";
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  unstyled?: boolean;
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "custom";
  variant?: "default" | "outlined" | "elevated" | "custom";
  as?: keyof JSX.IntrinsicElements;
  unstyled?: boolean;
  onClick?: () => void;
}

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  display?: "block" | "flex" | "inline" | "inline-block" | "grid" | "custom";
  unstyled?: boolean;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  unstyled?: boolean;
  customSearchIcon?: React.ReactNode;
  customLoadingIcon?: React.ReactNode;
  variant?: "default" | "custom";
}

export interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  children?: ReactNode;
}
