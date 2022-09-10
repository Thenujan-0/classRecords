import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/sass/index.scss',
                'resources/sass/class.scss',
                'resources/js/app.js',
                'resources/js/index.js',
                'resources/js/class.js',
                'resources/js/addRecordForm.js',
            ],
            refresh: true,
        }),
    ],
});
