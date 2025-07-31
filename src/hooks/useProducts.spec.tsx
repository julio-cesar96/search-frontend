// __tests__/useProducts.test.tsx
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MercadoLivreClient } from "../api/mercadoLivreApi.client";
import {
  useProductDescription,
  useProductDetail,
  useSearchProducts,
} from "./useProducts";

// Mocks
jest.mock("../../clients/mercadoLivreClient", () => ({
  MercadoLivreClient: {
    get: jest.fn(),
  },
}));

const mockedGet = (MercadoLivreClient as unknown as { get: jest.Mock }).get;

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Hooks em useProducts.ts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------------
  it("useSearchProducts deve retornar resultados de busca", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        results: [
          {
            id: "123",
            title: "Produto Teste",
            price: 100,
            thumbnail: "imagem.jpg",
            condition: "new",
            currency_id: "BRL",
            permalink: "https://produto.com",
            seller: { id: 1, nickname: "vendedor" },
            shipping: { free_shipping: true },
          },
        ],
        paging: { total: 1 },
      },
    });

    const { result } = renderHook(() => useSearchProducts("teste"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data!.results[0].title).toBe("Produto Teste");
    expect(mockedGet).toHaveBeenCalledWith("/sites/MLB/search", {
      params: { q: "teste" },
    });
  });

  // -------------------------------
  it("useProductDetail deve retornar detalhes do produto", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        id: "123",
        title: "Produto Detalhado",
        price: 200,
      },
    });

    const { result } = renderHook(() => useProductDetail("123"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data!.title).toBe("Produto Detalhado");
    expect(mockedGet).toHaveBeenCalledWith("/items/123");
  });

  // -------------------------------
  it("useProductDescription deve retornar descrição do produto", async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        plain_text: "Descrição do produto em texto.",
      },
    });

    const { result } = renderHook(() => useProductDescription("123"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data!.plain_text).toBe(
      "Descrição do produto em texto."
    );
    expect(mockedGet).toHaveBeenCalledWith("/items/123/description");
  });
});
