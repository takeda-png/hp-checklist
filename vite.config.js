import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/hp-checklist/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/fetch': {
        target: 'https://api.allorigins.win',
        changeOrigin: true,
        rewrite: (path) => '/get?url=' + path.replace('/api/fetch/', '')
      }
    }
  }
})
