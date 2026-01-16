import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        cors: true, // <--- TAMBAHKAN BARIS INI (Solusi Utama)
        hmr: {
            host: '103.154.80.171', // IP Public VPS kamu
        },
    },
});
