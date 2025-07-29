import React, { useState } from "react";
import { Box, Button, Input, Typography } from "../ui";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 2) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box
        display="flex"
        className="flex-col gap-6 bg-white rounded-lg shadow-md p-6 sm:p-8"
      >
        <Typography
          variant="h2"
          align="center"
          className="text-gray-900 text-xl sm:text-3xl"
        >
          Buscar Produtos
        </Typography>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do produto"
          autoFocus
          aria-label="Buscar produtos"
          className="shadow-sm"
        />

        <Button
          type="submit"
          disabled={query.trim().length <= 2}
          variant="primary"
          size="large"
          className="disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buscar
        </Button>

        {query.trim().length > 0 && query.trim().length <= 2 && (
          <Typography variant="caption" color="error" align="center">
            Por favor, digite pelo menos 3 caracteres para buscar.
          </Typography>
        )}
      </Box>
    </form>
  );
}
