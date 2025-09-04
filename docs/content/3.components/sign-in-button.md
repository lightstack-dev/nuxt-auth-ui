---
title: SignInButton
description: A ready-to-use authentication button
---

The SignInButton component provides a simple, pre-configured authentication entry point. It automatically renders based on authentication state and navigates to the configured sign-in route.

## Basic Usage and Defaults

::code-preview
::a-sign-in-button{:to="undefined"}
::

#code

```vue
<ASignInButton />
```

::

By default, the button:

- Comes in default color, size, and variant as defined by [Nuxt UI](<(https://ui4.nuxt.com/docs/components/button)>)
- Displays `Sign In` message
- Shows the `i-lucide-log-in` icon
- Navigates to `/auth/sign-in`
- Automatically renders as long as the user is unauthenticated

See the component's [API](#api) for how to override these defaults.

## Authentication State Behavior

The component checks `useAuthUI().isAuthenticated` and will:

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
::a-sign-in-button{label="Get Started" :to="undefined"}
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
::a-sign-in-button{:leading-icon="undefined" :to="undefined"}
::

#code

```vue
<!-- No icon -->
<ASignInButton :leading-icon="undefined" />
```

::

::code-preview
::a-sign-in-button{leading-icon="i-lucide-arrow-right-circle" :to="undefined"}
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
::a-sign-in-button{color="success" label="Join Now" size="xl" :to="undefined" variant="subtle"}
::

#code

```vue
<ASignInButton color="success" size="xl" variant="subtle">
  Join Now
</ASignInButton>
```

::

## API

The component extends [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button) with the following settings:

### Props

| Prop           | Type                  | Default              | Description                                                                         |
| -------------- | --------------------- | -------------------- | ----------------------------------------------------------------------------------- |
| `label`        | `string`              | `Sign In`            | Button text label, configurable via [`messages.signIn`](/configuration#messages)    |
| `leading-icon` | `string \| undefined` | `i-lucide-log-in`    | Icon shown before text, configurable via [`icons.authSignIn`](/configuration#icons) |
| `persistent`   | `boolean`             | `false`              | Keep button visible when user is authenticated                                      |
| `to`           | `string`              | `/auth/sign-in`      | Navigation destination, configurable via [`routes.signIn`](/configuration#routes)   |

### Slots

| Slot      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `default` | Overrides the button text (takes precedence over `label` prop) |
