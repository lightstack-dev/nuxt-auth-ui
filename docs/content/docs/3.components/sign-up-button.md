---
title: SignUpButton
description: A ready-to-use registration button
---

The SignUpButton component provides a simple, pre-configured registration entry point. It automatically renders based on authentication state and navigates to the configured sign-up route.

## Basic Usage and Defaults

::code-preview
::a-sign-up-button{mock}
::

#code

```vue
<ASignUpButton />
```
::

By default, the button:

- Comes in default color, size, and variant as defined by [Nuxt UI](https://ui4.nuxt.com/docs/components/button)
- Displays `Sign Up` message
- Shows the `i-lucide-user-plus` icon
- Navigates to `/auth/sign-up`
- Automatically renders as long as the user is unauthenticated

See the component's [API](#api) for how to override these defaults.

## Authentication State Behavior

The component checks `useAuthUI().isAuthenticated`{lang="ts"} and will:

- **Render** when no user is signed in
- **Remove itself from DOM** when a user is authenticated (not just hidden with CSS)

This automatic visibility toggle means you don't need to wrap the button in conditional logic. Simply place it in your layout or navigation, and it will appear/disappear based on the user's authentication status.

To keep the button visible regardless of authentication state, use the `persistent` prop:

```vue
<ASignUpButton persistent />
```

## Customization

### Label

Use the `label` prop or `default` slot to override the button's text:

::code-preview
::a-sign-up-button{label="Create Account" mock}
::

#code

```vue
<!-- Using `label` prop -->
<ASignUpButton label="Create Account" />

<!-- Using `default` slot, takes precedence over `label` prop -->
<ASignUpButton>Create Account</ASignUpButton>
```
::

### Icon

Remove or change the leading icon _for all SignUpButtons_:

```typescript [app.config.ts]
export default defineAppConfig({
  ui: {
    icons: {
      auth: {
        signUp: undefined, // No icon, or
        signUp: "i-lucide-user-plus-2", // Custom icon
      },
    },
  },
});
```

Remove or change the leading icon _for a single SignInButton_:

::code-preview
::a-sign-up-button{:leading-icon="undefined" mock}
::

#code

```vue
<!-- No icon -->
<ASignUpButton :leading-icon="undefined" />
```
::

::code-preview
::a-sign-up-button{leading-icon="i-lucide-user-plus-2" mock}
::

#code

```vue
<!-- Custom icon -->
<ASignUpButton leading-icon="i-lucide-user-plus-2" />
```
::

### Styling

The SignUpButton is based on [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button), so you can use any of its style props, for example:

::code-preview
::a-sign-up-button{color="success" label="Get Started Free" size="xl" mock variant="subtle"}
::

#code

```vue
<ASignUpButton color="success" size="xl" variant="subtle">
  Get Started Free
</ASignUpButton>
```
::

### Mock Mode

Enable mock mode for documentation, testing, or demos:

```vue
<ASignUpButton mock />
```

In mock mode, clicking the button doesn't trigger navigation (like all buttons on this page).

## API

The component extends [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button) with the following settings:

### Props

| Prop           | Type                                  | Default                                 | Description                                                                                         |
| -------------- | ------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `label`        | `string`{lang="ts-type"}              | `'Sign Up'`{lang="vue-html"}            | Button text label, configurable via [`messages.signUp`{lang="ts"}](/docs/configuration#messages)    |
| `leading-icon` | `string \| undefined`{lang="ts-type"} | `'i-lucide-user-plus'`{lang="vue-html"} | Icon shown before text, configurable via [`icons.authSignUp`{lang="ts"}](/docs/configuration#icons) |
| `mock`         | `boolean`{lang="ts-type"}             | `'false'`{lang="vue-html"}              | Enable mock mode for documentation/testing                                                          |
| `persistent`   | `boolean`{lang="ts-type"}             | `'false'`{lang="vue-html"}              | Keep button visible when user is authenticated                                                      |
| `to`           | `string`{lang="ts-type"}              | `'/auth/sign-up'`{lang="vue-html"}      | Navigation destination, configurable via [`routes.signUp`{lang="ts"}](/docs/configuration#routes)   |

### Slots

| Slot      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `default` | Overrides the button text (takes precedence over `label` prop) |
