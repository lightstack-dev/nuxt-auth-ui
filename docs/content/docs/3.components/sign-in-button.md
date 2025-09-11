---
title: SignInButton
description: A ready-to-use authentication button
---

The SignInButton component provides a simple, pre-configured authentication entry point. It automatically renders based on authentication state and navigates to the configured sign-in route.

## Basic Usage and Defaults

::code-preview
::a-sign-in-button{mock}
::

#code

```vue
<ASignInButton />
```
::

By default, the button:

- Comes in default color, size, and variant as defined by [Nuxt UI](https://ui4.nuxt.com/docs/components/button)
- Displays `Sign In` message
- Shows the `i-lucide-log-in` icon
- Navigates to `/auth/sign-in`
- Automatically renders as long as the user is unauthenticated

See the component's [API](#api) for how to override these defaults.

## Authentication State Behavior

The component checks `useAuthUI().isAuthenticated`{lang="ts"} and will:

- **Render** when no user is signed in
- **Remove itself from DOM** when a user is authenticated (not just hidden with CSS)

This automatic visibility toggle means you don't need to wrap the button in conditional logic. Simply place it in your layout or navigation, and it will appear/disappear based on the user's authentication status.

To keep the button visible regardless of authentication state, use the `persistent` prop:

```vue
<ASignInButton persistent />
```

## Customization

### Label

Use the `label` prop or `default` slot to override the button's text:

::code-preview
::a-sign-in-button{label="Get Started" mock}
::

#code

```vue
<!-- Using `label` prop -->
<ASignInButton label="Get Started" />

<!-- Using `default` slot, takes precedence over `label` prop -->
<ASignInButton>Get Started</ASignInButton>
```
::

### Icon

Remove or change the leading icon _for all SignInButtons_:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    icons: {
      auth: {
        signIn: undefined, // No icon, or
        signIn: "i-lucide-arrow-right-circle", // Custom icon
      },
    },
  },
});
```

Remove or change the leading icon _for a single SignInButton_:

::code-preview
::a-sign-in-button{:leading-icon="undefined" mock}
::

#code

```vue
<!-- No icon -->
<ASignInButton :leading-icon="undefined" />
```
::

::code-preview
::a-sign-in-button{leading-icon="i-lucide-arrow-right-circle" mock}
::

#code

```vue
<!-- Custom icon -->
<ASignInButton leading-icon="i-lucide-arrow-right-circle" />
```
::

### Styling

The SignInButton is based on [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button), so you can use any of its style props, for example:

::code-preview
::a-sign-in-button{color="success" label="Join Now" size="xl" mock variant="subtle"}
::

#code

```vue
<ASignInButton color="success" size="xl" variant="subtle">
  Join Now
</ASignInButton>
```
::

### Mock Mode

Enable mock mode for documentation, testing, or demos:

```vue
<ASignInButton mock />
```

In mock mode, clicking the button doesn't trigger navigation (like all buttons on this page).

## API

The component extends [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button) with the following settings:

### Props

| Prop           | Type                                  | Default                              | Description                                                                                         |
| -------------- | ------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `label`        | `string`{lang="ts-type"}              | `'Sign In'`{lang="vue-html"}         | Button text label, configurable via [`messages.signIn`{lang="ts"}](/docs/configuration#messages)    |
| `leading-icon` | `string \| undefined`{lang="ts-type"} | `'i-lucide-log-in'`{lang="vue-html"} | Icon shown before text, configurable via [`icons.authSignIn`{lang="ts"}](/docs/configuration#icons) |
| `mock`         | `boolean`{lang="ts-type"}             | `'false'`{lang="vue-html"}           | Enable mock mode for documentation/testing                                                          |
| `persistent`   | `boolean`{lang="ts-type"}             | `'false'`{lang="vue-html"}           | Keep button visible when user is authenticated                                                      |
| `to`           | `string`{lang="ts-type"}              | `'/auth/sign-in'`{lang="vue-html"}   | Navigation destination, configurable via [`routes.signIn`{lang="ts"}](/docs/configuration#routes)   |

### Slots

| Slot      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `default` | Overrides the button text (takes precedence over `label` prop) |

### Localization Keys

The component uses these i18n keys under the `auth` namespace:

| Key           | Default Value | Description              |
| ------------- | ------------- | ------------------------ |
| `auth.signIn` | "Sign In"     | Button label text        |
