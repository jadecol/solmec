import { defineConfig } from 'vite';

// base './' permite subir la carpeta dist a cualquier hosting o subcarpeta.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 }
});
