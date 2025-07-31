import { useNavigate } from "react-router-dom";
import { Box } from "../components/ui";
import { SearchForm } from "../components/shared/SearchForm";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function HomePage() {
  const navigate = useNavigate();

  useDocumentTitle("Home - Busca de Produtos");

  const handleSearch = (query: string) => {
    navigate(`/products?q=${encodeURIComponent(query)}`);
  };

  return (
    <Box
      display="flex"
      className="min-h-screen bg-gray-50 justify-center items-center p-4 sm:p-6"
    >
      <div className="w-full max-w-lg mx-4 sm:mx-0">
        <SearchForm onSearch={handleSearch} />
      </div>
    </Box>
  );
}
