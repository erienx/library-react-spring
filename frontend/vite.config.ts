import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    proxy: {
      '/search.json': {
        target: 'https://openlibrary.org', // The API you want to proxy to
        changeOrigin: true, // This helps with cross-origin issues
        rewrite: (path) => path.replace(/^\/search.json/, '/search.json'), // Optional: can adjust path if needed
      },
      '/trending/weekly.json': {
        target: 'https://openlibrary.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/trending\/weekly.json/, '/trending/weekly.json'),
      },
    },
  },
})
