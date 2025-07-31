import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../hooks/useProducts";
import { Box } from "../components/ui";
import { Card } from "../components/ui";
import { Button } from "../components/ui";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const ITEMS_PER_PAGE = 10;

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const offset = (page - 1) * ITEMS_PER_PAGE;

  useDocumentTitle(query ? `Busca: ${query}` : "Busca de Produtos");

  const { data, isLoading, isError, error } = useSearchProducts(
    query,
    ITEMS_PER_PAGE,
    offset
  );

  function handlePageChange(newPage: number) {
    if (!data) return;
    const totalPages = Math.ceil(data.paging.total / ITEMS_PER_PAGE);
    if (newPage < 1 || newPage > totalPages) return;

    setSearchParams({ q: query, page: newPage.toString() });
  }

  if (query.length <= 2) {
    return (
      <Box padding="lg" className="max-w-6xl mx-auto">
        <p>Digite ao menos 3 caracteres para buscar produtos.</p>
      </Box>
    );
  }

  return (
    <Box padding="lg" className="max-w-6xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold">
        Resultados da busca por "{query}"
      </h1>

      {isLoading && <p>Carregando...</p>}
      {isError && <p className="text-red-600">Erro: {error?.message}</p>}

      {!isLoading && data && (
        <>
          <p className="mb-4 text-gray-700">
            Total de resultados: {data.paging.total} | Página {page} de{" "}
            {Math.ceil(data.paging.total / ITEMS_PER_PAGE)}
          </p>

          <div
            className="grid gap-6 mb-6"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            {data.results.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Nenhum produto encontrado.
              </p>
            )}

            {data.results.map((product) => (
              <Card
                key={product.id}
                hover
                onClick={() => navigate(`/products/${product.id}`)}
                className="cursor-pointer"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold">{product.title}</h3>
                <p className="mt-1 text-blue-600 font-bold">
                  R$ {product.price.toFixed(2)}
                </p>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              variant="outline"
              size="medium"
            >
              Anterior
            </Button>

            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= Math.ceil(data.paging.total / ITEMS_PER_PAGE)}
              variant="primary"
              size="medium"
            >
              Próxima
            </Button>
          </div>
        </>
      )}
    </Box>
  );
}
