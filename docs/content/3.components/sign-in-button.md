---
title: SignInButton
description: A ready-to-use authentication button
---

The SignInButton component provides a simple, pre-configured authentication entry point. It automatically renders based on authentication state and navigates to the configured sign-in route.

## Basic Usage and Defaults

::docs-demo
<ASignInButton :to="undefined" />

#code

```vue
<ASignInButton />
```

::

By default, the button:

- Comes in default color, size, and variant as defined by [Nuxt UI](<(https://ui4.nuxt.com/docs/components/button)>)
- Displays localized "Sign in" text with `locale.t('signIn')`
- Shows the icon from `appConfig.ui.icons.authSignIn`
- Navigates to `/auth/sign-in` by default (fully configurable via `routes.signIn` in module options)
- Automatically renders as long as the user is unauthenticated with `!useAuthUI().isAuthenticated`

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

```vue
<!-- Using `label` prop -->
<ASignInButton label="Get Started" />

<!-- Using `default` slot, takes precedence over `label` prop -->
<ASignInButton>Get Started</ASignInButton>
```

::docs-demo
<ASignInButton label="Get Started" :to="undefined" />
::

### Icon

Remove or change the leading icon:

```vue
<!-- No icon -->
<ASignInButton :leading-icon="undefined" />
```

::docs-demo
<ASignInButton :leading-icon="undefined" :to="undefined" />
::

```vue
<!-- Custom icon -->
<ASignInButton leading-icon="i-heroicons-arrow-right-circle" />
```

::docs-demo
<ASignInButton leading-icon="i-heroicons-arrow-right-circle" :to="undefined" />
::

### Styling

The `SignInButton` is based on [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button), so you can use any of its style props, for example:

```vue
<ASignInButton color="success" size="xl" variant="subtle">
  Join Now
</ASignInButton>
```

::docs-demo
<ASignInButton color="success" size="xl" :to="undefined" variant="subtle">
Join Now
</ASignInButton>
::

## API

The component extends [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button) with the following settings:

### Props

| Prop           | Type                  | Default                         | Description                                               |
| -------------- | --------------------- | ------------------------------- | --------------------------------------------------------- |
| `label`        | `string`              | `locale.t('signIn')`            | Button text label                                         |
| `leading-icon` | `string \| undefined` | `appConfig.ui.icons.authSignIn` | Icon shown before text                                    |
| `persistent`   | `boolean`             | `false`                         | Keep button visible when user is authenticated            |
| `to`           | `string`              | `/auth/sign-in`                 | Navigation destination (configurable via `routes.signIn`) |

### Slots

| Slot      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `default` | Overrides the button text (takes precedence over `label` prop) |
