import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds the standalone 3D Kobe preview page.
export default defineConfig({
  plugins: [react()],
  root: 'preview',
  base: './',
  build: { outDir: process.env.OUT || '../dist-preview', emptyOutDir: true, rollupOptions: { output: { inlineDynamicImports: false } } },
});
