import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        features: z.array(z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
        })).optional(),
      }),
    }),
  },
})
