import { describe, it, expect } from "vitest";
import { MercadoLivreApiMock } from "../mercadoLivreApi.mock";
import { mockProductDetails } from "../../mocks/productDetail.mock";

describe("MercadoLivreApiMock", () => {
  it("searchProducts should return filtered and paginated results", async () => {
    const query = "produto"; // escolha um nome genérico
    const result = await MercadoLivreApiMock.searchProducts(query, 10, 0);

    expect(result).toHaveProperty("results");
    expect(result.results.length).toBeLessThanOrEqual(10);
    expect(
      result.results.every((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    ).toBe(true);
  });

  it("getProducts should return only the results array", async () => {
    const query = "produto";
    const results = await MercadoLivreApiMock.getProducts(query, 5, 0);

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("getProductDetail should return the correct product", async () => {
    const productId = Object.keys(mockProductDetails)[0];
    const detail = await MercadoLivreApiMock.getProductDetail(productId);

    expect(detail.id).toBe(productId);
  });

  it("getProductDescriptiton should return the description text", async () => {
    const productId = Object.keys(mockProductDetails)[0];
    const description = await MercadoLivreApiMock.getProductDescriptiton(
      productId
    );

    expect(description).toHaveProperty("plain_text");
    expect(typeof description.plain_text).toBe("string");
  });

  it("getCompleteProduct should return detail and description", async () => {
    const productId = Object.keys(mockProductDetails)[0];
    const complete = await MercadoLivreApiMock.getCompleteProduct(productId);

    expect(complete).toHaveProperty("detail");
    expect(complete).toHaveProperty("description");
    expect(complete.detail.id).toBe(productId);
    expect(typeof complete.description.plain_text).toBe("string");
  });

  it("getProductDetail should throw if product not found", async () => {
    await expect(
      MercadoLivreApiMock.getProductDetail("nao-existe")
    ).rejects.toThrow("Produto não encontrado");
  });
});
