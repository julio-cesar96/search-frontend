import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Button } from "../Button/Button";

describe("Button component", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies correct variant and size classes", () => {
    const { rerender } = render(
      <Button variant="primary" size="small">
        Btn
      </Button>
    );
    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-600");
    expect(button).toHaveClass("h-9");

    rerender(
      <Button variant="secondary" size="large">
        Btn
      </Button>
    );
    button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-100");
    expect(button).toHaveClass("h-11");
  });

  it("disables button when disabled or loading", () => {
    const { rerender } = render(<Button disabled>Btn</Button>);
    let button = screen.getByRole("button");
    expect(button).toBeDisabled();

    rerender(<Button loading>Btn</Button>);
    button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders unstyled button when unstyled is true", () => {
    render(
      <Button unstyled className="custom-class" disabled>
        Btn
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
    expect(button).not.toHaveClass("bg-blue-600");
  });

  it("passes other props like onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Btn</Button>);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
