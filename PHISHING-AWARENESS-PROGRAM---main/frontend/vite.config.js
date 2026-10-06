import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://phishing-awre.onrender.com',
        changeOrigin: true
      }
    }
  },
  preview: {
    allowedHosts: ['phisawre.onrender.com'],
    host: '0.0.0.0',
    port: 4173
  }
})
