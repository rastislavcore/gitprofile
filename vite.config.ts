import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import CONFIG from './gitprofile.config';

// https://vitejs.dev/config/
export default defineConfig({
  base: CONFIG.base || '/',
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          metaTitle: CONFIG.seo.title,
          metaDescription: CONFIG.social.coreid ? CONFIG.seo.description + ' / Core ID: ' + CONFIG.social.coreid : CONFIG.seo.description,
          metaImageURL: CONFIG.seo.githubId ? 'https://avatars.githubusercontent.com/u/' + CONFIG.seo.githubId : CONFIG.seo.imageURL,
          metaPaytoProperty: CONFIG.seo.payto?.property || '',
          metaPaytoContent: CONFIG.seo.payto?.content || '',
          googleAnalytics: CONFIG.googleAnalytics.id ? `
            <script async src="https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalytics.id}"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${CONFIG.googleAnalytics.id}');
            </script>
          ` : '',
        },
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: CONFIG.seo.title || 'Portfolio',
        short_name: 'Portfolio',
        description: CONFIG.seo.description || '',
      },
    }),
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
