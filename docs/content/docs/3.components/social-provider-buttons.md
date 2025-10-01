---
title: SocialProviderButtons
description: Reusable social authentication buttons with flexible configuration
---

The SocialProviderButtons component provides a set of social authentication buttons based on your [module configuration](/docs/configuration/social-providers). Social providers handle both sign-in and sign-up in one seamless flow -- Supabase automatically determines whether it's a new user (registration) or existing user (authentication).

## Basic Usage

::code-preview
::a-social-provider-buttons
::

#code

```vue
<!-- Automatically shows configured/detected social providers -->
<ASocialProviderButtons />
```
::

By default, the component:

- Lists manually configured social providers (no auto-detection)
- Uses consistent button labeling and loading states
- Handles authentication seamlessly (both sign-in and sign-up)
- Provides proper error handling and user feedback
- Renders buttons in `size="md"`{lang="vue-html"}

## Social Provider Configuration

Please refer to the [Social Providers Configuration](/docs/configuration/social-providers) to learn about configuring social providers.

## Customization

### Size

Control the size of social provider buttons using the `size` prop:

::code-preview
::a-social-provider-buttons{size="xl"}
::

#code

```vue
<!-- Large social provider buttons -->
<ASocialProviderButtons size="xl" />
```
::

Available sizes: `'xs'`{lang="vue-html"}, `'sm'`{lang="vue-html"}, `'md'`{lang="vue-html"} (default), `'lg'`{lang="vue-html"}, `'xl'`{lang="vue-html"}.

## Custom Event Handling

The `@click` event fires **before** redirecting to the social provider:

::code-preview
::a-social-provider-buttons
::

#code

```vue
<template>
  <ASocialProviderButtons @click="handleProviderClick" />
</template>

<script setup>
const handleProviderClick = (provider) => {
  // This runs BEFORE the redirect to the social provider
  console.log(`User selected ${provider.name} authentication`);

  // Track analytics, set preferences, etc.
  // The redirect happens automatically after this handler completes
};
</script>
```
::

## API

### Props

| Prop      | Type                                                   | Default                        | Description                                |
| --------- | ------------------------------------------------------ | ------------------------------ | ------------------------------------------ |
| `class`   | `string \| undefined`{lang="ts-type"}                  | `'space-y-3'`{lang="vue-html"} | Basic spacing between the buttons          |
| `loading` | `boolean`{lang="ts-type"}                              | `'false'`{lang="vue-html"}     | Show loading state on all buttons          |
| `size`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`{lang="ts-type"} | `''md''`{lang="vue-html"}      | Size of the social provider buttons        |

### Events

| Event   | Payload                          | Description                               |
| ------- | -------------------------------- | ----------------------------------------- |
| `click` | `SocialProvider`{lang="ts-type"} | Emitted when a provider button is clicked |

### Exposed Methods

Access these methods using template refs:

```vue
<ASocialProviderButtons ref="socialButtons" />
```

| Method       | Parameters                         | Description             |
| ------------ | ---------------------------------- | ----------------------- |
| `setLoading` | `(value: boolean)`{lang="ts-type"} | Control loading states  |
| `clearState` | `()`{lang="ts-type"}               | Reset all button states |

### Type Definitions

```typescript
interface SocialProvider {
  name: string;
  label?: string;
  icon?: string;
  enabled?: boolean;
}
```

### Localization Keys

The component uses these i18n keys under the `auth` namespace for social provider labels:

| Key                | Default Value      | Description                           |
| ------------------ | ------------------ | ------------------------------------- |
| `auth.google`      | "With Google"      | Google sign-in button label          |
| `auth.github`      | "With GitHub"      | GitHub sign-in button label          |
| `auth.microsoft`   | "With Microsoft"   | Microsoft sign-in button label       |
| `auth.facebook`    | "With Facebook"    | Facebook sign-in button label        |
| `auth.apple`       | "With Apple"       | Apple sign-in button label           |
| `auth.twitter`     | "With Twitter"     | Twitter sign-in button label         |
| `auth.linkedin`    | "With LinkedIn"    | LinkedIn sign-in button label        |
| `auth.discord`     | "With Discord"     | Discord sign-in button label         |
| `auth.gitlab`      | "With GitLab"      | GitLab sign-in button label          |
| `auth.slack`       | "With Slack"       | Slack sign-in button label           |
| `auth.azure`       | "With Azure AD"    | Azure AD sign-in button label        |
| `auth.okta`        | "With Okta"        | Okta sign-in button label            |
| `auth.auth0`       | "With Auth0"       | Auth0 sign-in button label           |

::note
Custom social providers require corresponding translations in your i18n configuration.
::
