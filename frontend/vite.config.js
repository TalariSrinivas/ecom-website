import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://ecom-website-mdgc.onrender.com',
        changeOrigin: true,
        
      },
      '/uploads/':'https://ecom-website-mdgc.onrender.com',
    }
  }
  
})
