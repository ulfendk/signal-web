import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  base: '/signal-web/',
  plugins: [
    react(),
    nodePolyfills({
      // Enable polyfills for Node.js built-in modules required by @signalapp/libsignal-client
      include: ['buffer', 'process', 'util', 'crypto'],
      globals: {
        Buffer: true,
        process: true,
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Signal Web Client',
        short_name: 'Signal',
        description: 'Signal Private Messenger Web Client',
        theme_color: '#2090EA',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      // Help Vite resolve libsignal-client's native modules
      './Native.js': '@signalapp/libsignal-client/dist/Native.js'
    }
  },
  optimizeDeps: {
    exclude: ['@signalapp/libsignal-client']
  }
})
