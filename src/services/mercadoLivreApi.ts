import { api } from "../api/api";
import type {
  SearchResponse,
  ProductDetail,
  Product,
  ProductDescription,
} from "../types/product";

export class MercadoLivreApi {
  /**
   * Busca produtos por termo
   */
  static async searchProducts(
    query: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<SearchResponse> {
    const response = await api.get<SearchResponse>("/sites/MLB/search", {
      params: {
        q: query,
        limit,
        offset,
      },
    });
    return response.data;
  }

  /**
   * Busca apenas os resultados dos produtos (sem metadados)
   */

  static async getProducts(
    query: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Product[]> {
    const response = await this.searchProducts(query, limit, offset);
    return response.results;
  }

  /**
   * Busca detalhes de um produto específico
   */

  static async getProductDetail(productId: string): Promise<ProductDetail> {
    const response = await api.get<ProductDetail>(`/items/${productId}`);
    return response.data;
  }

  /**
   * Busca descrição de um produto específico
   */

  static async getProductDescriptiton(
    productId: string
  ): Promise<ProductDescription> {
    const response = await api.get<ProductDescription>(
      `/items/${productId}/description`
    );
    return response.data;
  }

  /**
   * Busca produto completo (detalhes + descrição)
   */

  static async getCompleteProduct(productId: string): Promise<{
    detail: ProductDetail;
    description: ProductDescription;
  }> {
    const [detail, description] = await Promise.all([
      this.getProductDetail(productId),
      this.getProductDescriptiton(productId),
    ]);
    return { detail, description };
  }
}
