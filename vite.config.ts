import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    port: 3000,
    open: true
  },
  base: '/',  // 确保基础路径正确
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});