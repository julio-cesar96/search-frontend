import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.stubGlobal("import.meta", {
  env: {
    VITE_MELI_ACCESS_TOKEN: "test-token-123",
  },
});
