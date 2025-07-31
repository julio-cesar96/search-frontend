import { render, screen } from "@testing-library/react";
import { Box } from "../Box/Box";

describe("Box component", () => {
  it("renders children", () => {
    render(<Box>Conteúdo</Box>);
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("renders as a different element when `as` prop is provided", () => {
    render(<Box as="section">Seção</Box>);
    const section = screen.getByText("Seção");
    expect(section.tagName.toLowerCase()).toBe("section");
  });

  it("applies padding, margin and display classes correctly", () => {
    render(
      <Box padding="sm" margin="md" display="flex" data-testid="box">
        Conteúdo
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("p-2"); // padding sm
    expect(box).toHaveClass("m-4"); // margin md
    expect(box).toHaveClass("flex"); // display flex
  });

  it("does not apply padding, margin, display classes when unstyled=true", () => {
    render(
      <Box padding="lg" margin="xl" display="grid" unstyled data-testid="box">
        Conteúdo
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).not.toHaveClass("p-6");
    expect(box).not.toHaveClass("m-8");
    expect(box).not.toHaveClass("grid");
  });

  it("includes custom className", () => {
    render(
      <Box className="custom-class" data-testid="box">
        Conteúdo
      </Box>
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveClass("custom-class");
  });
});
