import { MercadoLivreApi } from "../services/mercadoLivreApi";
import { MercadoLivreApiMock } from "../services/mercadoLivreApi.mock";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export const MercadoLivreClient = USE_MOCKS
  ? MercadoLivreApiMock
  : MercadoLivreApi;
