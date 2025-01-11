import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';  // Comment out PWA import
import CONFIG from './gitprofile.config';

// https://vitejs.dev/config/
export default defineConfig({
  base: CONFIG.base || '/',
  plugins: [
    react(),
    // Temporarily remove PWA plugin
  ],
  define: {
    CONFIG: CONFIG,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
