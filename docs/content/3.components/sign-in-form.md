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
<!-- Renders social buttons based on your Nuxt/Logto configuration -->
<ASignInForm />
```

::

By default, the form:

- Displays buttons for configured/detected social provider
- Includes email and password fields with validation
- Shows a remember me checkbox to pre-fill email on next sign-in
- Provides a forgot password link for account recovery
- Labels the submit button "With Email" to match social provider button pattern
- Shows a sign-up button for new users (in the same row as sign-in)

See the component's [API](#api) for how to override these defaults.

## Authentication State Behavior

The SignInForm component is unaware of authentication state. It always renders when mounted. (However, navigating to the sign-in _route_ when already authenticated will trigger a redirect at the middleware/route level.)

## Customization

### Social Providers

By default, the sign-in form includes the [SocialProviderButtons component](/components/social-provider-buttons). These buttons only render when social providers have been configured or auto-detected.

With the `:social="false"` prop, you can remove social providers from a SignInForm (even though some might be configured in Nuxt or Logto):

::code-preview
::a-sign-in-form{mock :social="false"}
::

#code

```vue
<ASignInForm :social="false" />
```

::

### Secondary Action

By default, the form includes a [SignUpButton](/components/sign-up-button) for new users, displayed in the same row as the sign-in button. This secondary action button can be removed with the `:secondary="false"` prop:

::code-preview
::a-sign-in-form{mock :social="false" :secondary="false"}
::

#code

```vue
<!-- Only show the primary action button -->
<ASignInForm :secondary="false" />
```

::

### Button Labels and Icons

The form uses consistent labeling for all sign-in methods:

- Social providers: "With Google", "With Microsoft", etc.
- Email sign-in: "With Email"

All button labels are configurable via [`messages` in your config](/configuration#messages):

- `messages.withEmail` - Email sign-in button
- `messages.withGoogle`, `messages.withGithub`, etc. - Social provider buttons

This creates a uniform pattern across all authentication options.

Icons for these buttons can be customized via [`ui.icons` key in `app.config.ts`](/configuration#theming).

### Focus Management

By default, the email field receives focus when the form mounts, making it ready for immediate typing:

```vue
<!-- Default: auto-focus enabled -->
<ASignInForm />
```

Disable autofocus to prevent unwanted scrolling or conflicts between multiple forms:

```vue
<!-- Multiple forms - control which gives up focus -->
<ASignInForm />
<ASignUpForm :autofocus="false" />
```

Autofocus is automatically disabled in mock mode to prevent unwanted focus during demos.

### Legal Documents

By default, the sign-in form displays links to configured legal documents, following the best practice that users should be reminded of current terms when accessing your service (since terms can change after they originally signed up):

::code-preview
::a-sign-in-form{mock}
::

#code

```vue
<!-- Default: shows all configured legal documents -->
<ASignInForm />
```

::

Hide legal document links entirely:

```vue
<ASignInForm :legal="false" />
```

Show only specific legal documents:

```vue
<!-- Only show terms and privacy policy -->
<ASignInForm :legal="['termsOfService', 'privacyPolicy']" />
```

The legal document links are configured in your `nuxt.config.ts` under `authUi.legal`.

### Mock Mode

Enable mock mode for documentation, testing, or demos:

```vue
<ASignInForm mock />
```

In mock mode:

- Form submissions show loading states without API calls
- Social buttons animate without redirecting
- Console logs display submitted data

Perfect for showcasing UI without backend setup (like for all forms on this page)!

### Hackability

While not intended for typical use, the component exposes methods and events (documented in the [API section](#api)) that enable programmatic control. This is primarily for edge cases where you might need to manually control loading states or display custom error messages.

## API

The component extends [Nuxt UI's `UForm`](https://ui4.nuxt.com/docs/components/form) and inherits all its props and slots (like `validate-on` for controlling validation timing). Below are the component-specific additions:

### Props

| Prop        | Type                  | Default                     | Description                                  |
| ----------- | --------------------- | --------------------------- | -------------------------------------------- |
| `autofocus` | `boolean`             | `true`                      | Auto-focus the email field on mount          |
| `class`     | `string \| undefined` | `max-w-md space-y-6 w-full` | Basic spacing and width for the sign-in form |
| `legal`     | `boolean \| string[]` | `true`                      | Show legal document links. Use array to specify which ones |
| `mock`      | `boolean`             | `false`                     | Enable mock mode for documentation/testing   |
| `secondary` | `boolean`             | `true`                      | Show sign-up button for new users            |
| `social`    | `boolean`             | `true`                      | Show social provider buttons                 |

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

| Method       | Parameters          | Description                      |
| ------------ | ------------------- | -------------------------------- |
| `setLoading` | `(value: boolean)`  | Control the form's loading state |
| `setError`   | `(message: string)` | Display an inline error message  |
| `clearForm`  | `()`                | Reset form to initial state      |

### Type Definitions

```typescript
interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SocialProvider {
  name: string;
  label?: string;
  icon?: string;
  enabled?: boolean;
}
```

### Validation Rules

The form validates input on the client side:

| Field        | Client-side Validation       |
| ------------ | ---------------------------- |
| `email`      | Required, valid email format |
| `password`   | Required                     |
| `rememberMe` | Optional boolean             |

Note: Actual password policies are determined by your authentication provider's configuration.
