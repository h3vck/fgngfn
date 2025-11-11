import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      // пример для конкретного файла
      'asset-image': path.resolve(__dirname, './src/assets/a961f3deed9b36e975c032f2c124a4e49ba9d072.png'),
    },
  },
  build: {
    target: 'es2020', // стабильный таргет для Vercel
    outDir: 'dist',   // папка для деплоя
    chunkSizeWarningLimit: 2000, // отключаем лишние предупреждения
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

