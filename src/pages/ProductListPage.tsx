import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Card } from "../components/ui";

export default function ProductListPage() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";

  const { data, isLoading, error } = useProducts(query);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao buscar produtos</div>;

  return (
    <div>
      <h2>Resultados para: {query}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {data?.map((product) => (
          <Card key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%" }}
            />
            <h3>{product.title}</h3>
            <p>R$ {product.price.toFixed(2)}</p>
            {/* Você pode adicionar link para página de detalhes se quiser */}
          </Card>
        ))}
      </div>
    </div>
  );
}
