import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import type { Mock } from "vitest";
import { useSearchProducts } from "../hooks/useProducts";
import ProductListPage from "./ProductListPage";

let mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  mockedNavigate = vi.fn();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useSearchParams: () => [
      new URLSearchParams({ q: "notebook", page: "1" }),
      vi.fn(),
    ],
  };
});

vi.mock("../../hooks/useDocumentTitle", () => ({
  useDocumentTitle: () => {},
}));

vi.mock("../../hooks/useProducts", () => ({
  useSearchProducts: vi.fn(),
}));

const mockedUseSearchProducts = useSearchProducts as unknown as Mock;

describe("ProductListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza aviso para termos com menos de 3 caracteres", () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ q: "ab" }),
      vi.fn(),
    ]);

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/digite ao menos 3 caracteres/i)
    ).toBeInTheDocument();
  });

  it("mostra loading enquanto carrega", () => {
    mockedUseSearchProducts.mockReturnValue({
      isLoading: true,
      isError: false,
      error: null,
      data: null,
    });

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it("mostra mensagem de erro", () => {
    mockedUseSearchProducts.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Erro inesperado" },
      data: null,
    });

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/erro: erro inesperado/i)).toBeInTheDocument();
  });

  it("mostra produtos encontrados", () => {
    mockedUseSearchProducts.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: {
        paging: { total: 2 },
        results: [
          {
            id: "1",
            title: "Produto 1",
            price: 100,
            thumbnail: "https://example.com/1.jpg",
          },
          {
            id: "2",
            title: "Produto 2",
            price: 200,
            thumbnail: "https://example.com/2.jpg",
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Produto 1")).toBeInTheDocument();
    expect(screen.getByText("Produto 2")).toBeInTheDocument();
    expect(screen.getByText("R$ 100.00")).toBeInTheDocument();
    expect(screen.getByText("R$ 200.00")).toBeInTheDocument();
  });

  it("mostra mensagem de nenhum produto encontrado", () => {
    mockedUseSearchProducts.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: {
        paging: { total: 0 },
        results: [],
      },
    });

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/nenhum produto encontrado/i)).toBeInTheDocument();
  });

  it("navega para a página de detalhes ao clicar em produto", async () => {
    mockedUseSearchProducts.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: {
        paging: { total: 1 },
        results: [
          {
            id: "abc123",
            title: "Notebook",
            price: 1500,
            thumbnail: "https://example.com/notebook.jpg",
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText("Notebook"));

    expect(mockedNavigate).toHaveBeenCalledWith("/products/abc123");
  });

  it("botão de próxima página chama setSearchParams", async () => {
    const setSearchParams = vi.fn();

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ q: "notebook", page: "1" }),
      setSearchParams,
    ]);

    mockedUseSearchProducts.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: {
        paging: { total: 30 },
        results: [
          {
            id: "1",
            title: "Notebook 1",
            price: 2000,
            thumbnail: "https://example.com/1.jpg",
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", { name: /próxima/i });
    await userEvent.click(nextButton);

    expect(setSearchParams).toHaveBeenCalledWith({
      q: "notebook",
      page: "2",
    });
  });
});
