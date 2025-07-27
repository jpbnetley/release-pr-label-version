import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['labler', 'labler-release', 'labler-validator', 'lib']
  },
})