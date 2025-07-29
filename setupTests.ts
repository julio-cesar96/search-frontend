import { vi } from "vitest";

vi.stubGlobal("import.meta", {
  env: {
    VITE_MELI_ACCESS_TOKEN: "test-token-123",
  },
});
