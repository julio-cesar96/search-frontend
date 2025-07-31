import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import MockAdapter from "axios-mock-adapter";
import type { api as ApiInstanceType } from "../api";
import type { ApiError } from "../../types/product";

describe("api instance", () => {
  let api: typeof ApiInstanceType;
  let mock: MockAdapter;

  beforeEach(async () => {
    // Simula as variáveis de ambiente do Vite
    vi.stubGlobal("import.meta", {
      env: {
        VITE_MELI_ACCESS_TOKEN: "fake-token",
      },
    });

    // Importa os módulos dinamicamente após definir o stub global
    const apiModule = await import("../api");
    const MockAdapterModule = await import("axios-mock-adapter");

    api = apiModule.api;
    const MockAdapter = MockAdapterModule.default;
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.restore();
    vi.resetAllMocks();
  });

  // Teste 1: Valida o interceptor de REQUISIÇÃO
  it("deve adicionar o token de autorização no header", async () => {
    mock.onGet("/test").reply(200, { success: true });

    await api.get("/test");

    expect(mock.history.get[0].headers?.Authorization).toBe(
      "Bearer fake-token"
    );
  });

  // Teste 2: Valida o interceptor de RESPOSTA para um erro de API
  it("deve transformar erro da API em ApiError customizado", async () => {
    const errorResponseData = {
      message: "Erro de autenticação",
      error: "AUTH_ERROR",
    };

    mock.onGet("/teste-erro").reply(401, errorResponseData);

    expect.assertions(3);

    try {
      await api.get("/teste-erro");
    } catch (error) {
      const apiError = error as ApiError;

      expect(apiError.message).toBe("Erro de autenticação");
      expect(apiError.error).toBe("AUTH_ERROR");
      expect(apiError.status).toBe(401);
    }
  });

  // Teste 3: Valida o interceptor de RESPOSTA para erro de rede com cause
  it("deve capturar a causa (cause) de um erro de rede", async () => {
    mock.onGet("/teste-causa").networkError();

    expect.assertions(4);

    try {
      await api.get("/teste-causa");
    } catch (error) {
      const apiError = error as ApiError;

      expect(apiError.message).toBe("An unexpected error occurred");
      expect(apiError.error).toBe("UNKNOWN_ERROR");
      expect(apiError.status).toBe(500);
      expect(apiError.cause).toBeInstanceOf(Error);
    }
  });
});
