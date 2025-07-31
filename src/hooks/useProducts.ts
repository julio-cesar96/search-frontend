import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

import type {
  Product,
  SearchResponse,
  ApiError,
  ProductDescription,
  ProductDetail,
} from "../types/product";
import { MercadoLivreClient } from "../api/mercadoLivreApi.client";

export const productKeys = {
  all: ["products"] as const,
  search: (query: string) => [...productKeys.all, "search", query] as const,
  searchWithPagination: (query: string, limit: number, offset: number) =>
    [...productKeys.search(query), { limit, offset }] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
  description: (id: string) => [...productKeys.all, "description", id] as const,
  complete: (id: string) => [...productKeys.all, "complete", id] as const,
};

// Busca produtos (com todos os dados da SearchResponse)
export const useSearchProducts = (
  query: string,
  limit: number = 50,
  offset: number = 0,
  option?: UseQueryOptions<SearchResponse, ApiError>
) => {
  const enabled = option?.enabled ?? (!!query && query.length > 2);

  return useQuery({
    queryKey: productKeys.searchWithPagination(query, limit, offset),
    queryFn: () => MercadoLivreClient.searchProducts(query, limit, offset),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 10 * 60 * 1000,
    ...option,
  });
};

// Apenas lista de produtos
export const useProducts = (
  query: string,
  limit: number = 50,
  offset: number = 0,
  options?: UseQueryOptions<Product[], ApiError>
) => {
  return useQuery({
    queryKey: productKeys.searchWithPagination(query, limit, offset),
    queryFn: () => MercadoLivreClient.getProducts(query, limit, offset),
    enabled: !!query && query.length > 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

// Detalhes do produto
export const useProductDetail = (
  productId: string,
  options?: UseQueryOptions<ProductDetail, ApiError>
) => {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => MercadoLivreClient.getProductDetail(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...options,
  });
};

// Descrição do produto (string simples)
export const useProductDescription = (
  productId: string,
  options?: UseQueryOptions<ProductDescription, ApiError>
) => {
  return useQuery({
    queryKey: productKeys.description(productId),
    queryFn: () => MercadoLivreClient.getProductDescriptiton(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...options,
  });
};

// Produto completo (detalhe + descrição)
export const useCompletProduct = (
  productId: string,
  options?: UseQueryOptions<
    {
      detail: ProductDetail;
      description: ProductDescription; // aqui
    },
    ApiError
  >
) => {
  return useQuery({
    queryKey: productKeys.complete(productId),
    queryFn: () => MercadoLivreClient.getCompleteProduct(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...options,
  });
};
