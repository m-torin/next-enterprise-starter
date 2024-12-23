import { defineConfig, type Options } from 'tsup';

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    external: [],
    treeshake: true,
    sourcemap: true,
    clean: true,
  },
]);
