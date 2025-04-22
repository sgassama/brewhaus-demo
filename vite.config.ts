import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

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
  // @ts-ignore
  test: {
    globals: true, // Allows using global test functions like `describe`, `it` without import
    environment: 'happy-dom', // Simulates a DOM for unit tests
    setupFiles: './vitest.setup.ts', // (Optional) Specify a setup file (see next step)
  },
})
