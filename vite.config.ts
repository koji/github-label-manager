import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'GitHubLabelManager',
            fileName: 'index',
            formats: ['cjs']
        },
        rollupOptions: {
            external: [
                '@octokit/core',
                'prompts',
                'chalk',
                'figlet',
                'fs',
                'path',
                'os',
                'util',
                'crypto'
            ],
            output: {
                banner: '#!/usr/bin/env node',
                interop: 'auto'
            }
        },
        target: 'node14',
        outDir: 'dist'
    }
});