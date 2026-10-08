import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node20',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  dts: false,
  // tsup bundle true resolves imports and maps path aliases natively.
  // We specify external to avoid bundling node_modules.
  bundle: true,
  splitting: false,
});
