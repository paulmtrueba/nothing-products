import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'; // Import path module

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    host: true,
    open: true, // This will automatically open the browser
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: 'dist', // Output directory for production build
    sourcemap: true, // Generate sourcemaps for debugging
  },
})
