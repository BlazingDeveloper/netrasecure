import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/contact': 'http://localhost:3001',
      '/scan-url': 'http://localhost:3001',
      '/chat': 'http://localhost:3001',
    }
  }
})
