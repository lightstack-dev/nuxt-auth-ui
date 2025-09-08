---
title: SocialProviderButtons
description: Reusable social authentication buttons with flexible configuration
---

The SocialProviderButtons component provides a set of social authentication buttons based on your [module configuration](/configuration#social-providers), with automatic fallback to Logto-detected providers. Social providers handle both sign-in and sign-up in one seamless flow -- the provider determines whether it's a new user (registration) or existing user (authentication).

## Basic Usage

::code-preview
::a-social-provider-buttons{mock}
::

#code

```vue
<!-- Automatically shows configured/detected social providers -->
<ASocialProviderButtons />
```

::

By default, the component:
- Lists configured social providers
- Falls back to auto-detected providers from your Logto instance
- Uses consistent button labeling and loading states  
- Handles authentication seamlessly (both sign-in and sign-up)
- Provides proper error handling and user feedback

## Social Provider Configuration

### Primary: Nuxt Configuration

The component primarily uses providers [configured in your `nuxt.config.ts`](/configuration#social-providers):

```typescript [nuxt.config.ts]
export default defineNuxtConfig({
  authUi: {
    socialProviders: [
      {
        name: 'google',
        enabled: true,
      },
      {
        name: 'microsoft', 
        enabled: true,
      },
    ],
  },
})
```

### Fallback: Auto-Detection

If no providers are explicitly [configured in `nuxt.config.ts`](/configuration#social-providers), the component automatically detects enabled providers from your Logto instance. This provides a seamless experience when you're getting started, but explicit configuration is recommended for production.

## Custom Event Handling

The `@click` event fires **before** redirecting to the social provider:

::code-preview
::a-social-provider-buttons{mock}
::

#code

```vue
<template>
  <ASocialProviderButtons @click="handleProviderClick" />
</template>

<script setup>
const handleProviderClick = (provider) => {
  // This runs BEFORE the redirect to the social provider
  console.log(`User selected ${provider.name} authentication`)
  
  // Track analytics, set preferences, etc.
  // The redirect happens automatically after this handler completes
}
</script>
```

::

## Mock Mode

Enable mock mode for documentation, testing, or demos:

```vue
<ASocialProviderButtons mock />
```

In mock mode:
- Buttons show loading states without redirecting
- Console logs display clicked provider information
- Perfect for showcasing UI without backend setup (like in this documentation)

## API

### Props

| Prop     | Type                   | Default     | Description                                |
| -------- | ---------------------- | ----------- | ------------------------------------------ |
| `class`  | `string \| undefined`  | `space-y-3` | Basic spacing between the buttons          |
| `loading`| `boolean`              | `false`     | Show loading state on all buttons          |
| `mock`   | `boolean`              | `false`     | Enable mock mode for documentation/testing |

### Events

| Event   | Payload           | Description                          |
| ------- | ----------------- | ------------------------------------ |
| `click` | `SocialProvider`  | Emitted when a provider button is clicked |

### Exposed Methods

Access these methods using template refs:

```vue
<ASocialProviderButtons ref="socialButtons" />
```

| Method       | Parameters    | Description                     |
| ------------ | ------------- | ------------------------------- |
| `setLoading` | `(value: boolean)` | Control loading states         |
| `clearState` | `()`          | Reset all button states         |

### Type Definitions

```typescript
interface SocialProvider {
  name: string
  label?: string
  icon?: string
  enabled?: boolean
}
```
