<template>
  <UContainer>
    <div class="min-h-screen flex items-center justify-center py-12 px-4">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <div
            v-if="$slots.logo"
            class="mb-6"
          >
            <slot name="logo" />
          </div>

          <div
            v-if="logo"
            class="mb-6 flex justify-center"
          >
            <img
              :src="logo"
              :alt="`${appName} logo`"
              class="h-12 w-auto"
            >
          </div>

          <div
            v-if="title"
            class="space-y-2"
          >
            <h2 class="text-3xl font-bold tracking-tight">
              {{ title }}
            </h2>
            <p
              v-if="description"
              class="text-sm text-gray-600 dark:text-gray-400"
            >
              {{ description }}
            </p>
          </div>
        </div>

        <UCard class="overflow-visible">
          <slot />
        </UCard>

        <div
          v-if="$slots.footer"
          class="text-center"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useRuntimeConfig, computed } from '#imports'

defineProps<{
  title?: string
  description?: string
  logo?: string
}>()

const runtimeConfig = useRuntimeConfig()
const config = (runtimeConfig.public.authUi || {}) as { appName?: string, logo?: string }

const appName = computed(() => config.appName || 'App')
const logo = computed(() => config.logo)
</script>
