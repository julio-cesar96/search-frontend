import React from "react";
import type { SearchInputProps } from "../types";
import { Input } from "../Input/Input";

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar produtos...",
  loading = false,
  className,
  unstyled = false,
  customSearchIcon,
  customLoadingIcon,
  variant = "default",
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const DefaultSearchIcon = () => (
    <svg
      className="h-4 w-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const DefaultLoadingIcon = () => (
    <svg className="h-4 w-4 animate-spin text-gray-400" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const searchIcon = customSearchIcon || <DefaultSearchIcon />;
  const loadingIcon = customLoadingIcon || <DefaultLoadingIcon />;

  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      leftIcon={searchIcon}
      rightIcon={loading ? loadingIcon : null}
      className={className}
      unstyled={unstyled}
      variant={variant}
    />
  );
};
