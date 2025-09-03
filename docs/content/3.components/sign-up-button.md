---
title: SignUpButton
description: A ready-to-use registration button
---

The SignUpButton component provides a simple, pre-configured registration entry point. It automatically renders based on authentication state and navigates to the configured sign-up route.

## Basic Usage and Defaults

::docs-demo
<ASignUpButton :to="undefined" />

#code

```vue
<ASignUpButton />
```

::

By default, the button:

- Comes in default color, size, and variant as defined by [Nuxt UI](<(https://ui4.nuxt.com/docs/components/button)>)
- Displays localized "Sign up" text with `locale.t('signUp')`
- Shows the icon from `appConfig.ui.icons.authSignUp`
- Navigates to `/auth/sign-up` by default (fully configurable via `routes.signUp` in module options)
- Automatically renders as long as the user is unauthenticated with `!useAuthUI().isAuthenticated`

## Authentication State Behavior

The component checks `useAuthUI().isAuthenticated` and will:

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

```vue
<!-- Using `label` prop -->
<ASignUpButton label="Create Account" />

<!-- Using `default` slot, takes precedence over `label` prop -->
<ASignUpButton>Create Account</ASignUpButton>
```

::docs-demo
<ASignUpButton label="Create Account" :to="undefined" />
::

### Icon

Remove or change the leading icon:

```vue
<!-- No icon -->
<ASignUpButton :leading-icon="undefined" />
```

::docs-demo
<ASignUpButton :leading-icon="undefined" :to="undefined" />
::

```vue
<!-- Custom icon -->
<ASignUpButton leading-icon="i-lucide-user-plus-2" />
```

::docs-demo
<ASignUpButton leading-icon="i-lucide-user-plus-2" :to="undefined" />
::

### Styling

The `SignUpButton` is based on [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button), so you can use any of its style props, for example:

```vue
<ASignUpButton color="success" size="xl" variant="subtle">
  Get Started Free
</ASignUpButton>
```

::docs-demo
<ASignUpButton color="success" size="xl" :to="undefined" variant="subtle">
Get Started Free
</ASignUpButton>
::

## API

The component extends [Nuxt UI's `UButton`](https://ui4.nuxt.com/docs/components/button) with the following settings:

### Props

| Prop           | Type                  | Default                         | Description                                               |
| -------------- | --------------------- | ------------------------------- | --------------------------------------------------------- |
| `label`        | `string`              | `locale.t('signUp')`            | Button text label                                         |
| `leading-icon` | `string \| undefined` | `appConfig.ui.icons.authSignUp` | Icon shown before text                                    |
| `persistent`   | `boolean`             | `false`                         | Keep button visible when user is authenticated            |
| `to`           | `string`              | `/auth/sign-up`                 | Navigation destination (configurable via [`routes.signUp`](/configuration#routes)) |

### Slots

| Slot      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `default` | Overrides the button text (takes precedence over `label` prop) |
