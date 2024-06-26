import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import CONFIG from './gitprofile.config';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  base: CONFIG.base || '/',
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          metaTitle: CONFIG.seo.title,
          metaDescription: CONFIG.social.coreid ? CONFIG.seo.description + ' / Core ID: ' + CONFIG.social.coreid : CONFIG.seo.description,
          metaImageURL: CONFIG.seo.githubId ? 'https://avatars.githubusercontent.com/u/' + CONFIG.seo.githubId : CONFIG.seo.imageURL,
          metaPaytoProperty: CONFIG.seo.payto?.property ? CONFIG.seo.payto.property : '',
          metaPaytoContent: CONFIG.seo.payto?.content ? CONFIG.seo.payto.content : '',
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
            },
          }),
        ]
      : []),
  ],
  define: {
    CONFIG: CONFIG,
  },
});
