import { mockProductDetails } from "../mocks/productDetail.mock";
import { mockProductList } from "../mocks/productList";
import type {
  Product,
  ProductDescription,
  ProductDetail,
  SearchResponse,
} from "../types/product";

export class MercadoLivreApiMock {
  static async searchProducts(
    query: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<SearchResponse> {
    const allResults = mockProductList.results;

    const filtered = allResults.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      site_id: "MLB",
      query,
      paging: {
        total: filtered.length,
        offset,
        limit,
        primary_results: filtered.length,
      },
      results: filtered.slice(offset, offset + limit),
    };
  }

  static async getProducts(
    query: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Product[]> {
    const response = await this.searchProducts(query, limit, offset);
    return response.results;
  }

  static async getProductDetail(productId: string): Promise<ProductDetail> {
    const detail = mockProductDetails[productId];
    if (!detail) throw new Error("Produto não encontrado");
    return detail;
  }

  static async getProductDescriptiton(
    productId: string
  ): Promise<ProductDescription> {
    const detail = mockProductDetails[productId];
    if (!detail) throw new Error("Produto não encontrado");
    return { plain_text: detail.description };
  }

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
