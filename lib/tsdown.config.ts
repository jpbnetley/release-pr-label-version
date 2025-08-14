import { defineConfig } from 'tsdown/config'

export default defineConfig({
  entry: ['src/**/*.ts'],
  dts: true,
  outDir: 'dist',
  sourcemap: 'inline'
})
