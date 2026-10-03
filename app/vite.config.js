import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // SINGLE_FILE=1 bundles every language into one script (for one-file hosting).
  build: process.env.SINGLE_FILE ? { rollupOptions: { output: { inlineDynamicImports: true } } } : {},
  server: {
    proxy: { '/api': 'http://localhost:3001' },
  },
});
