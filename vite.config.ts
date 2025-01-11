import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import CONFIG from './gitprofile.config';
import { createHtmlPlugin } from 'vite-plugin-html';
import { isDarkishTheme } from './src/utils';

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
          metaThemeColor: isDarkishTheme(CONFIG.themeConfig.defaultTheme) ? '#000000' : '#ffffff',
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
    ...(CONFIG.enablePWA
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            workbox: {
              navigateFallback: undefined,
            },
            manifest: {
              name: CONFIG.seo.title,
              short_name: 'Portfolio',
              description: CONFIG.seo.description,
              icons: [
                {
                  src: CONFIG.seo.githubId ? 'https://avatars.githubusercontent.com/u/' + CONFIG.seo.githubId + '?s=16' : CONFIG.seo.imageURL,
                  sizes: '16x16',
                  type: 'image/png',
                },
                {
                  src: CONFIG.seo.githubId ? 'https://avatars.githubusercontent.com/u/' + CONFIG.seo.githubId + '?s=32' : CONFIG.seo.imageURL,
                  sizes: '32x32',
                  type: 'image/png',
                },
                {
                  src: CONFIG.seo.githubId ? 'https://avatars.githubusercontent.com/u/' + CONFIG.seo.githubId + '?s=64' : CONFIG.seo.imageURL,
                  sizes: '64x64',
                  type: 'image/png',
                },
                {
                  src: CONFIG.seo.githubId ? 'https://avatars.githubusercontent.com/u/' + CONFIG.seo.githubId + '?s=192' : CONFIG.seo.imageURL,
                  sizes: '192x192',
                  type: 'image/png',
                },
                {
                  src: CONFIG.seo.githubId ? 'https://avatars.githubusercontent.com/u/' + CONFIG.seo.githubId + '?s=460' : CONFIG.seo.imageURL,
                  sizes: '460x460',
                  type: 'image/png',
                },
              ],
              theme_color: '#ffffff',
              background_color: '#ffffff',
            },
          }),
        ]
      : []),
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
          if (id.includes('/src/utils/')) return 'utils';
          if (id.includes('/src/components/')) return 'components';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
