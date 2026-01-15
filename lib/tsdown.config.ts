import { defineConfig } from 'tsdown/config'

export default defineConfig({
  entry: ['src/**/*.ts', '!**/*.test.ts', '!**/*.spec.ts'],
  dts: true,
  outDir: 'dist',
  sourcemap: 'inline'
})
