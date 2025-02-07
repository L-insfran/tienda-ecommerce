import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.JPG', '**/*.png', '**/*.PNG'],
  base:'./',
  resolve: {
    alias: {
      '@assets': '/src/assets',
    },
  },
})
