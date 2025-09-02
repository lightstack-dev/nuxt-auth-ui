// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: {
      semi: false,
      quotes: 'single',
    },
  },
})
  .append(
    // Special rules for Nuxt app directories (docs and playground)
    {
      files: ['docs/**/*.vue', 'playground/**/*.vue'],
      rules: {
        // Disable multi-word component name for ALL Vue files in apps
        // This includes pages, layouts, AND components like DocsDemo
        'vue/multi-word-component-names': 'off',
      },
    },
  )
