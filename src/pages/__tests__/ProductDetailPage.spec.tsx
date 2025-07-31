import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { Mock } from "vitest";
import { useProductDetail } from "../../hooks/useProducts";
import ProductDetailPage from "../ProductDetailPage";

let mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  mockedNavigate = vi.fn();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ id: "123" }),
  };
});

vi.mock("../../hooks/useDocumentTitle", () => ({
  useDocumentTitle: () => {},
}));

vi.mock("../../hooks/useProducts", () => ({
  useProductDetail: vi.fn(),
}));

const mockedUseProductDetail = useProductDetail as unknown as Mock;

describe("ProductDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o loading", () => {
    mockedUseProductDetail.mockReturnValue({
      isLoading: true,
      error: false,
      data: null,
    });

    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renderiza mensagem de erro", () => {
    mockedUseProductDetail.mockReturnValue({
      isLoading: false,
      error: true,
      data: null,
    });

    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/erro ao carregar detalhes do produto/i)
    ).toBeInTheDocument();
  });

  it("renderiza os detalhes do produto corretamente", () => {
    mockedUseProductDetail.mockReturnValue({
      isLoading: false,
      error: false,
      data: {
        title: "Produto Teste",
        description: "Descrição do produto.",
        price: 199.99,
        pictures: [
          { url: "https://example.com/image1.jpg" },
          { url: "https://example.com/image2.jpg" },
        ],
      },
    });

    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Produto Teste" })
    ).toBeInTheDocument();
    expect(screen.getByText("Descrição do produto.")).toBeInTheDocument();
    expect(screen.getByText("R$ 199.99")).toBeInTheDocument();
  });

  it('volta para a página anterior ao clicar em "Voltar"', async () => {
    mockedUseProductDetail.mockReturnValue({
      isLoading: false,
      error: false,
      data: {
        title: "Produto Teste",
        description: "",
        price: 100,
        pictures: [],
      },
    });

    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /voltar/i });
    await userEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
