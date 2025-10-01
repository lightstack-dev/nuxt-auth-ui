---
title: SignInForm
description: A ready-to-use authentication form with validation and error handling
---

The SignInForm component provides a complete authentication form with social provider buttons, email/password fields, validation, and proper error handling. It automatically detects available authentication methods and provides a flexible, accessible interface for user sign-in.

## Basic Usage and Defaults

::code-preview
::a-sign-in-form
::

#code

```vue
<!-- Renders social buttons based on your configuration -->
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
- Renders form elements in `size="md"`{lang="vue-html"}

See the component's [API](#api) for how to override these defaults.

## Authentication State Behavior

The SignInForm component is unaware of authentication state. It always renders when mounted. (However, navigating to the sign-in _route_ when already authenticated will trigger a redirect at the middleware/route level.)

## Customization

### Social Providers

By default, the sign-in form includes the [SocialProviderButtons component](/docs/components/social-provider-buttons). These buttons only render when social providers have been configured or auto-detected.

With the `:social="false"`{lang="vue-html"} prop, you can remove social providers from a SignInForm (even though some might be configured in your module config):

::code-preview
::a-sign-in-form{:social="false"}
::

#code

```vue
<ASignInForm :social="false" />
```
::

::tip
To only use social provider buttons without the rest of the sign-in form, use the dedicated [SocialProviderButtons component](/docs/components/social-provider-buttons).
::

### Secondary Action

By default, the form includes a [SignUpButton](/docs/components/sign-up-button) for new users, displayed in the same row as the sign-in button. This secondary action button can be removed with the `:secondary="false"`{lang="vue-html"} prop:

::code-preview
::a-sign-in-form{:social="false" :secondary="false"}
::

#code

```vue
<!-- Only show the primary action button -->
<ASignInForm :secondary="false" />
```
::

### Button Labels and Icons

All button labels are configurable via [`i18n.config.ts`](/docs/configuration/internationalization).

Icons for these buttons can be customized via [`ui.icons` key in `app.config.ts`](/docs/configuration/theming).

### Size

Control the size of form inputs and buttons using the `size` prop. This cascades to all interactive elements including input fields, buttons, checkboxes, and social provider buttons:

::code-preview
::a-sign-in-form{size="xl"}
::

#code

```vue
<!-- Extra large form elements -->
<ASignInForm size="xl" />
```
::

Available sizes: `'xs'`{lang="vue-html"}, `'sm'`{lang="vue-html"}, `'md'`{lang="vue-html"} (default), `'lg'`{lang="vue-html"}, `'xl'`{lang="vue-html"}.

The only element not scaling is the legal consent section.

### Focus Management

By default, the email field receives focus when the form mounts, making it ready for immediate typing. Disable autofocus to prevent unwanted scrolling or conflicts between multiple forms:

```vue
<!-- Multiple forms - control which gives up focus -->
<ASignInForm />
<ASignUpForm :autofocus="false" />
```


### Hackability

While not intended for typical use, the component exposes methods and events (documented in the [API section](#api)) that enable programmatic control. This is primarily for edge cases where you might need to manually control loading states or display custom error messages.

## API

The component extends [Nuxt UI's `UForm`](https://ui4.nuxt.com/docs/components/form) and inherits all its props and slots (like `validate-on`{lang="vue-html"} for controlling validation timing). Below are the component-specific additions:

### Props

| Prop        | Type                                                   | Default                                        | Description                                                |
| ----------- | ------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------------------- |
| `autofocus` | `boolean`{lang="ts-type"}                              | `'true'`{lang="vue-html"}                      | Auto-focus the email field on mount         |
| `class`     | `string \| undefined`{lang="ts-type"}                  | `'max-w-md space-y-6 w-full'`{lang="vue-html"} | Basic spacing and width for the sign-in form |
| `secondary` | `boolean`{lang="ts-type"}                              | `'true'`{lang="vue-html"}                      | Show sign-up button for new users           |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`{lang="ts-type"} | `'md'`{lang="vue-html"}                        | Size of form inputs and buttons                            |
| `social`    | `boolean`{lang="ts-type"}                              | `'true'`{lang="vue-html"}                      | Show social provider buttons                               |

### Events

| Event     | Payload                                                  | Description                    |
| --------- | -------------------------------------------------------- | ------------------------------ |
| `submit`  | `SignInFormData & { provider?: string }`{lang="ts-type"} | Emitted when form is submitted |
| `success` | `void`{lang="ts-type"}                                   | Emitted on successful auth     |

### Exposed Methods

Access these methods using template refs:

```vue
<ASignInForm ref="signInForm" />
```

| Method       | Parameters                     | Description                      |
| ------------ | ------------------------------ | -------------------------------- |
| `setLoading` | `(value: boolean)`{lang="ts"}  | Control the form's loading state |
| `setError`   | `(message: string)`{lang="ts"} | Display an inline error message  |
| `clearForm`  | `()`{lang="ts"}                | Reset form to initial state      |

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

### Localization Keys

The component uses these i18n keys under the `auth` namespace:

| Key                      | Default Value                              | Description                           |
| ------------------------ | ------------------------------------------ | ------------------------------------- |
| `auth.signInTitle`       | "Welcome Back"                             | Card title                           |
| `auth.signInDescription` | "Sign in to your account to continue"      | Card description                     |
| `auth.email`             | "Email"                                    | Email field label                    |
| `auth.password`          | "Password"                                 | Password field label                 |
| `auth.rememberMe`        | "Remember me"                              | Remember me checkbox label          |
| `auth.forgotPassword`    | "Forgot password?"                         | Forgot password link text           |
| `auth.withEmail`         | "With Email"                               | Email sign-in button label          |
| `auth.signUp`            | "Sign Up"                                  | Sign-up button label                |
| `auth.or`                | "OR"                                        | Separator text between options      |
| `auth.signInSuccess`     | "Signed in successfully!"                  | Success notification message        |
| `auth.signInFailed`      | "Sign in failed"                           | Error notification title            |
| `auth.invalidCredentials`| "Invalid email or password"                | Invalid credentials error message   |
| `auth.emailRequired`     | "Email is required"                        | Email validation message            |
| `auth.emailInvalid`      | "Please enter a valid email address"       | Invalid email validation message    |
| `auth.passwordRequired`  | "Password is required"                     | Password validation message         |

::note
Social provider labels are also localized. See [SocialProviderButtons](/docs/components/social-provider-buttons#localization-keys) for details.
::
