import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config';

const libConfig = defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/plugins/Vue3FormHelper.ts'),
            name: 'Vue3FormHelper',
            fileName: 'vue3-form-helper',
        },
        rollupOptions: {
            external: ['vue'],
            output: { globals: { vue: 'Vue' } },
        },
    },
});

export default mergeConfig(baseConfig, libConfig);