import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['labler-release', 'labler-validator', 'lib']
  },
})