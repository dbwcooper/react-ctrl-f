// tsup.config.ts
import type { Options } from 'tsup';
export const tsup: Options = {
  splitting: false,
  sourcemap: true,
  clean: true,
  entryPoints: ['src/components/index.ts'],
  dts: true, // use tsc to check types
  outDir: 'lib',
  format: ['iife', 'esm', 'cjs'],
  legacyOutput: true,
};
