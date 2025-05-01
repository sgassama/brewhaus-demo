import vue from '@vitejs/plugin-vue'
import path from 'path';
import { defineConfig } from "vite";
import { coverageConfigDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Map '@' to the 'src' directory
    },
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    sourcemap: true, // enable production source maps
  },
  css: {
    devSourcemap: true // enable CSS source maps during development
  },
  dev: {
    sourcemap: true
  },
  // @ts-ignore
  test: {
    globals: true, // Allows using global test functions like `describe`, `it` without import
    environment: 'happy-dom', // Simulates a DOM for unit tests
    setupFiles: './vitest.setup.ts', // (Optional) Specify a setup file (see next step)
    // @ts-ignore
    transformIgnorePatterns: ['node_modules/(?!(ion|@ionic))'],
    coverage: {
      exclude: ["ios", "dist", "cypress", "vitest.setup.*", "src/types", "capacitor.config.ts", ...coverageConfigDefaults.exclude]
    }
  },
})
