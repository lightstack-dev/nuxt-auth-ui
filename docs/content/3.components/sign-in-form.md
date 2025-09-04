---
title: SignInForm
description: A ready-to-use authentication form with validation and error handling
---

The SignInForm component provides a complete authentication form with social provider buttons, email/password fields, validation, and proper error handling. It automatically detects available authentication methods and provides a flexible, accessible interface for user sign-in.

## Basic Usage and Defaults

::code-preview
::a-sign-in-form{mock}
::

#code

```vue
<!-- Renders social buttons based on Nuxt/Logto configuration -->
<ASignInForm />
```

::

By default, the form:

- Displays configured social provider buttons
- Includes email and password fields with validation
- Shows a remember me checkbox to pre-fill email on next sign-in
- Provides a forgot password link for account recovery
- Labels the submit button "With Email" to match social provider button pattern

See the component's [API](#api) for how to override these defaults.

## Authentication State Behavior

The SignInForm component is unaware of authentication state. It always renders when mounted. (However, navigating to the sign-in _route_ when already authenticated will trigger a redirect at the middleware/route level.)

## Form State Management

The component manages its own internal state and exposes methods for external control:

- **Loading states** are automatically shown during authentication
- **Errors are displayed inline** within the form, not as toast notifications
- **Form validation** happens on submit

The exposed methods enable integration with different authentication backends. Instead of being locked to Logto, you can handle the `submit` event and use the exposed methods to control the form's state while integrating with Supabase, Firebase, or any other auth provider.

For programmatic control, use template refs:

```vue
<template>
  <ASignInForm ref="signInForm" @submit="handleSignIn" />
</template>

<script setup lang="ts">
const signInForm = ref()

const handleSignIn = async (data) => {
  try {
    await auth.signIn(data.email, data.password)
  } catch (error) {
    // Display error inline in the form
    signInForm.value?.setError(error.message)
  }
}
</script>
```

## Customization

### Social Providers

Social provider buttons follow this precedence:

1. **Primary:** Providers explicitly [configured in `nuxt.config.ts`](/configuration#social-providers)
2. **Fallback:** Auto-detected from enabled Logto social connectors
3. **Default:** No social buttons shown if neither configured

Configure providers _for all SignInForms_:

```typescript [nuxt.config.ts]
export default defineNuxtConfig({
  authUi: {
    socialProviders: [
      {
        name: 'google',
        enabled: true
      },
      {
        name: 'microsoft',
        enabled: true
      }
    ]
  }
})
```

Hide social providers _for a single SignInForm_ (even though some might be configured in Nuxt or Logto):

::code-preview
  ::a-sign-in-form{mock basic}
  ::

#code

```vue
<ASignInForm basic />
```

::

### Secondary Actions

Add secondary actions (like the [SignUpButton](/components/sign-up-button)) to the form using the `default` slot:

::code-preview
  ::a-sign-in-form{mock basic}
    ::a-sign-up-button{block :to="undefined" variant="ghost"}
    ::
  ::

#code

```html
<!-- Add the sign-up button -->
<ASignInForm>
  <ASignInButton block variant="ghost" />
</ASignInForm>
```

::

### Button Labels

The form uses consistent labeling for all sign-in methods:
- Social providers: "With Google", "With Microsoft", etc.
- Email sign-in: "With Email"

All button labels are configurable via [`messages` in your config](/configuration#messages):
- `messages.withEmail` - Email sign-in button
- `messages.withGoogle`, `messages.withGithub`, etc. - Social provider buttons

This creates a uniform pattern across all authentication options.

### Mock Mode

Enable mock mode for documentation, testing, or demos:

::code-preview
::a-sign-in-form{mock}
::

#code

```vue
<ASignInForm mock />
```

::

In mock mode:
- Form submissions show loading states without API calls
- Social buttons animate without redirecting
- Console logs display submitted data
- Perfect for showcasing UI without backend setup

### Remember Me

The "Remember Me" checkbox pre-fills the user's email on their next visit, making sign-in faster even after signing out. This is a client-side convenience feature -- session management is handled by Logto.

## API

The component extends [Nuxt UI's `UForm`](https://ui4.nuxt.com/docs/components/form) and inherits all its props and slots (like `validate-on` for controlling validation timing). Below are the component-specific additions:

### Props

| Prop    | Type      | Default | Description                                                           |
| ------- | --------- | ------- | --------------------------------------------------------------------- |
| `basic` | `boolean` | `false` | Only render basic email sign-in form, without social provider buttons |
| `mock`  | `boolean` | `false` | Enable mock mode for documentation/testing                            |

### Slots

| Slot      | Slot Props                                              | Description                                                               |
| --------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| `default` | `{ loading: boolean, disabled: boolean }`               | Add secondary actions like sign-up button or help links. Empty by default |

### Events

| Event     | Payload                                  | Description                    |
| --------- | ---------------------------------------- | ------------------------------ |
| `submit`  | `SignInFormData & { provider?: string }` | Emitted when form is submitted |
| `success` | `void`                                   | Emitted on successful auth     |

### Exposed Methods

Access these methods using template refs:

```vue
<ASignInForm ref="signInForm" />
```

| Method       | Parameters           | Description                      |
| ------------ | -------------------- | -------------------------------- |
| `setLoading` | `(value: boolean)`   | Control the form's loading state |
| `setError`   | `(message: string)`  | Display an inline error message  |
| `clearForm`  | `()`                 | Reset form to initial state      |

### Type Definitions

```typescript
interface SignInFormData {
  email: string
  password: string
  rememberMe?: boolean
}

interface SocialProvider {
  name: string
  label?: string
  icon?: string
  enabled?: boolean
}
```

### Validation Rules

The form validates input on the client side:

| Field        | Client-side Validation                    |
| ------------ | ----------------------------------------- |
| `email`      | Required, valid email format             |
| `password`   | Required                                  |
| `rememberMe` | Optional boolean                          |

Note: Actual password policies are determined by your authentication provider's configuration.