import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:'./',build:{rollupOptions:{output:{entryFileNames:'app.js',chunkFileNames:'chunks/[name].js',assetFileNames:'[name][extname]'}}}});
