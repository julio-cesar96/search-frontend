import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { useDocumentTitle } from "./useDocumentTitle";

function TestComponent({ title }: { title: string }) {
  useDocumentTitle(title);
  return <div>Test</div>;
}

describe("useDocumentTitle", () => {
  beforeEach(() => {
    document.title = "initial title";
  });

  it("should set the document title", () => {
    const title = "Novo Título";

    render(<TestComponent title={title} />);
    expect(document.title).toBe(title);
  });

  it("should update the document title when prop changes", () => {
    const { rerender } = render(<TestComponent title="Título 1" />);
    expect(document.title).toBe("Título 1");

    rerender(<TestComponent title="Título 2" />);
    expect(document.title).toBe("Título 2");
  });
});
