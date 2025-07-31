import type { Product } from "../types/product";

export const mockProductList: { results: Product[] } = {
  results: [
    {
      id: "MLB1828680414",
      title: "Controle Xbox Series S/X Lacrado Original Carbon Black",
      price: 389.9,
      thumbnail:
        "http://http2.mlstatic.com/D_938331-MLA45268824993_032021-I.jpg",
    },
    {
      id: "MLB3387477987",
      title: "Console Playstation 5 Slim Standard 1TB",
      price: 3799.0,
      thumbnail:
        "http://http2.mlstatic.com/D_875631-MLA75362924982_032024-I.jpg",
    },
    {
      id: "MLB4049875475",
      title: "Headset Sem Fio Gamer Astro A50 X Para Ps5/Xbox/PC",
      price: 2499.99,
      thumbnail:
        "http://http2.mlstatic.com/D_806953-MLA74075558913_012024-I.jpg",
    },
    {
      id: "MLB3396349348",
      title: "Jogo The Last Of Us Part II Remastered Ps5 Mídia Física",
      price: 214.89,
      thumbnail:
        "http://http2.mlstatic.com/D_909565-MLA74189311688_012024-I.jpg",
    },
    ...Array.from({ length: 46 }).map((_, i) => ({
      id: `MOCKID${i + 1000}`,
      title: `Produto Tech Mock ${i + 1}`,
      price: parseFloat((Math.random() * 5000 + 50).toFixed(2)),
      thumbnail: `https://picsum.photos/seed/tech${i}/300/300`,
    })),
  ],
};
