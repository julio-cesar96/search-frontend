import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import HomePage from "../HomePage";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("../../hooks/useDocumentTitle", () => ({
  useDocumentTitle: () => {},
}));

describe("HomePage", () => {
  it("deve renderizar o formulário de busca", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /buscar/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("deve navegar ao buscar um termo", async () => {
    const mockNavigate = vi.fn();
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /buscar/i });

    await userEvent.type(input, "monitor gamer");
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/products?q=monitor%20gamer");
  });
});
