import type { ProductDetail } from "../types/product";
import { mockProductList } from "./productList";

export const mockProductDetails: Record<string, ProductDetail> =
  Object.fromEntries(
    mockProductList.results.map((product) => [
      product.id,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        pictures: [
          {
            url: `https://picsum.photos/seed/${product.id}-1/600/600`,
          },
          {
            url: `https://picsum.photos/seed/${product.id}-2/600/600`,
          },
        ],
        description:
          "Este é um produto de demonstração com características impressionantes e tecnologia de ponta. Ideal para quem busca performance e inovação.",
      },
    ])
  );
