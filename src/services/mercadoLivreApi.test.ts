import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "../api/api";
import type {
  SearchResponse,
  ProductDetail,
  ProductDescription,
} from "../types/product";
import { MercadoLivreApi } from "./mercadoLivreApi";

vi.mock("../api/api", () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockSearchResponse: SearchResponse = {
  site_id: "MLB",
  query: "teste",
  paging: { total: 1, offset: 0, limit: 1, primary_results: 1 },
  results: [
    {
      id: "MLB1",
      title: "Produto Teste",
      price: 100,
      thumbnail: "url.jpg",
      condition: "new",
      currency_id: "BRL",
      permalink: "link",
      seller: { id: 1, nickname: "Vendedor" },
      shipping: { free_shipping: true },
    },
  ],
};

const mockProductDetail: ProductDetail = {
  id: "MLB123",
  title: "Detalhe Produto",
  price: 250,
  thumbnail: "url_principal.jpg",
  pictures: [{ id: "pic1", url: "url.jpg", secure_url: "secure_url.jpg" }],
  condition: "new",
  currency_id: "BRL",
  permalink: "link",
  seller_id: 1,
  category_id: "cat1",
  warranty: "1 ano",
  shipping: { free_shipping: false },
  attributes: [],
};

const mockProductDescription: ProductDescription = {
  text: "Descrição longa do produto.",
  plain_text: "Descrição longa do produto.",
};

describe("MercadoLivreApi", () => {
  // 3. Criamos uma referência tipada ao nosso mock da API.
  const mockedApi = vi.mocked(api, true);

  // 4. Limpamos os mocks antes de cada teste para garantir isolamento.
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Testes para cada método ---

  it('deve buscar produtos com "searchProducts"', async () => {
    // Arrange: Configuramos o que o mock de 'api.get' deve retornar.
    mockedApi.get.mockResolvedValue({ data: mockSearchResponse });

    const query = "celular";
    // Act: Chamamos o método que queremos testar.
    const response = await MercadoLivreApi.searchProducts(query);

    // Assert: Verificamos se o método se comportou como esperado.
    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith("/sites/MLB/search", {
      params: {
        q: query,
        limit: 50, // valor padrão
        offset: 0, // valor padrão
      },
    });
    expect(response).toEqual(mockSearchResponse);
  });

  it('deve buscar apenas a lista de produtos com "getProducts"', async () => {
    // Arrange: Desta vez, mockamos o método 'searchProducts' da própria classe
    // para isolar o teste apenas à lógica de 'getProducts'.
    const searchSpy = vi
      .spyOn(MercadoLivreApi, "searchProducts")
      .mockResolvedValue(mockSearchResponse);

    // Act
    const products = await MercadoLivreApi.getProducts("notebook");

    // Assert
    expect(searchSpy).toHaveBeenCalledWith("notebook", 50, 0);
    expect(products).toEqual(mockSearchResponse.results);
  });

  it('deve buscar detalhes de um produto com "getProductDetail"', async () => {
    // Arrange
    mockedApi.get.mockResolvedValue({ data: mockProductDetail });
    const productId = "MLB123";

    // Act
    const detail = await MercadoLivreApi.getProductDetail(productId);

    // Assert
    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith(`/items/${productId}`);
    expect(detail).toEqual(mockProductDetail);
  });

  it('deve buscar a descrição de um produto com "getProductDescriptiton"', async () => {
    // Arrange
    mockedApi.get.mockResolvedValue({ data: mockProductDescription });
    const productId = "MLB456";

    // Act
    const description = await MercadoLivreApi.getProductDescriptiton(productId);

    // Assert
    expect(mockedApi.get).toHaveBeenCalledTimes(1);
    expect(mockedApi.get).toHaveBeenCalledWith(
      `/items/${productId}/description`
    );
    expect(description).toEqual(mockProductDescription);
  });

  it('deve buscar o produto completo com "getCompleteProduct"', async () => {
    // Arrange: Para testar o Promise.all, precisamos que o 'api.get' retorne
    // valores diferentes dependendo da chamada.
    mockedApi.get
      .mockResolvedValueOnce({ data: mockProductDetail }) // Primeira chamada get (detalhe)
      .mockResolvedValueOnce({ data: mockProductDescription }); // Segunda chamada get (descrição)

    const productId = "MLB789";

    // Act
    const completeProduct = await MercadoLivreApi.getCompleteProduct(productId);

    // Assert
    expect(mockedApi.get).toHaveBeenCalledTimes(2);
    expect(mockedApi.get).toHaveBeenCalledWith(`/items/${productId}`);
    expect(mockedApi.get).toHaveBeenCalledWith(
      `/items/${productId}/description`
    );
    expect(completeProduct).toEqual({
      detail: mockProductDetail,
      description: mockProductDescription,
    });
  });
});
