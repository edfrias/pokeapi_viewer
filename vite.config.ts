import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 4080
  },
  build: {
    cssCodeSplit: false
  }
});