export interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

export interface ProductDetail {
  id: string;
  title: string;
  price: number;
  pictures: Array<{ url: string }>;
  description: string;
}

export interface ProductDescription {
  plain_text: string;
  text?: string;
  last_updated?: string;
}

export interface SearchResponse {
  site_id: string;
  query: string;
  paging: {
    total: number;
    offset: number;
    limit: number;
    primary_results: number;
  };
  results: Product[];
}

export interface ApiError {
  message: string;
  error: string;
  status: number;
  cause?: unknown;
}
