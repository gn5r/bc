import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    include: ["**/__tests__/**/*.spec.ts"],
    coverage: {
      exclude: ["dist", "vitest.config.mts", "esbuild.mjs"],
    },
  },
});
