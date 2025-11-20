import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setup-vitest.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text'],
    },
  },
});
