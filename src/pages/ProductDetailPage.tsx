import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail } from "../hooks/useProducts";
import {
  Box,
  Button,
  Card,
  ErrorMessage,
  Loading,
  Typography,
} from "../components/ui";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ImageCarousel } from "../components/shared/ImageCarousel";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: detail, isLoading, error } = useProductDetail(id || "");

  useDocumentTitle(detail?.title ?? "Detalhe do Produto");

  if (isLoading) return <Loading />;
  if (error || !detail)
    return (
      <ErrorMessage
        message="Erro ao carregar detalhes do produto."
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <Box padding="md" className="max-w-5xl mx-auto">
      <Button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
      >
        ← Voltar
      </Button>

      <Card
        padding="lg"
        variant="elevated"
        className="flex flex-col md:flex-row gap-6"
      >
        <Box className="flex flex-col gap-2 max-w-md w-full">
          <ImageCarousel pictures={detail.pictures} altBase={detail.title} />
        </Box>

        <Box className="flex flex-col justify-between flex-1">
          <Typography variant="h2" className="mb-3">
            {detail.title}
          </Typography>

          <Typography variant="body" className="mb-4 whitespace-pre-line">
            {detail.description || "Sem descrição disponível."}
          </Typography>

          <Typography variant="h3" color="primary">
            R$ {detail.price.toFixed(2)}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
