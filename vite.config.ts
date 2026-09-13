import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import autoprefixer from "autoprefixer";
import path from "node:path";
import pkg from "./package.json" with {type: 'json'};

// https://vite.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        {
            name: 'html-version-transform',
            transformIndexHtml(html) {
                return html.replace(/%APP_VERSION%/g, pkg.version)
            },
        }
    ],
    build: {
        sourcemap: false,
        outDir: 'build',
        chunkSizeWarningLimit: 1024,
    },
    css: {
        postcss: {
            plugins: [autoprefixer({})],
        },
    },
    resolve: {
        alias: [
            {
                find: 'src/',
                replacement: `${path.resolve(import.meta.dirname, 'src')}/`,
            },
        ],
    },
    server: {
        port: 3005,
    }
})
