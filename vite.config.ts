// import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// const outDir = path.resolve(__dirname, 'lib');

module.exports = defineConfig({
  root: '.',
  plugins: [reactRefresh()],
  // build: {
  //   outDir: outDir,
  //   lib: {
  //     name: 'react-ctrl-f',
  //     entry: path.resolve(__dirname, 'src/components/index.ts'),
  //     formats: ['es'],
  //   },
  //   rollupOptions: {
  //     // 确保外部化处理那些你不想打包进库的依赖
  //     external: ['react'],
  //     output: {
  //       sourcemapExcludeSources: true,
  //     },
  //   },
  //   sourcemap: true,
  //   // Reduce bloat from legacy polyfills.
  //   // target: 'esnext',
  //   // Leave minification up to applications.
  //   minify: false,
  // },
});
