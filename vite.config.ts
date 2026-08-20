import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Alvo estatico: deployavel em Hostinger/Vercel/Netlify sem servidor Node.
    target: 'es2019',
  },
});
