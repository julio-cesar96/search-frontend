export interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  condition: "new" | "used";
  currency_id: string;
  permalink: string;
  seller: {
    id: number;
    nickname: string;
  };
  shipping: {
    free_shipping: boolean;
  };
}

export interface ProductDetail {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  pictures: Array<{
    id: string;
    url: string;
    secure_url: string;
  }>;
  condition: "new" | "used";
  currency_id: string;
  permalink: string;
  seller_id: number;
  category_id: string;
  warranty: string;
  shipping: {
    free_shipping: boolean;
  };
  attributes: Array<{
    id: string;
    name: string;
    value_name: string;
  }>;
}

export interface ProductDescription {
  text: string;
  plain_text: string;
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
