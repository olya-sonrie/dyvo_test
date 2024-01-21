import { defineConfig } from 'vite'

export default defineConfig({
  base: 'dyvo_test/',
  assetsDir: 'assets',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
})