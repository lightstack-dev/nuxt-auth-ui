---
title: SignInForm
description: A complete sign-in form with validation and error handling
---

The SignInForm component provides a ready-to-use authentication form with email/password fields, validation, social provider buttons, and proper error handling following our [design principles](/design-principles).

## Basic Usage and Defaults

::code-preview
  ::a-sign-in-form{mock nosocial}
  ::

#code
```vue
<ASignInForm />
```

::

By default, the form includes:

- Email and password fields with Zod validation
- Remember me checkbox
- Forgot password link
- Social provider buttons (auto-detected from Logto or configured)
- Inline error display for form errors (not toasts)
- Loading states during submission
- Fully typed with TypeScript

## Error Handling Behavior

Following our design principles, **errors are displayed inline** within the form, not as toast notifications:

```vue
<template>
  <ASignInForm ref="signInForm" @submit="handleSignIn" />
</template>

<script setup>
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

The form displays errors in a `UAlert` component between the form fields and submit button, ensuring users see errors where their attention is focused.

## Customization

### Social Providers

The form automatically detects available social providers from your Logto instance. You can also explicitly configure them in your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  authUi: {
    socialProviders: [
      {
        name: 'google',        // Provider identifier (used with Logto)
        label: 'Continue with Google', // Button text
        icon: 'i-simple-icons-google', // Icon class
        enabled: true          // Show/hide provider
      },
      {
        name: 'github',
        label: 'Continue with GitHub',
        icon: 'i-simple-icons-github',
        enabled: true
      },
      // Add more providers as needed
    ]
  }
})
```

**Behavior:**
- **With configuration:** Uses your explicitly configured providers
- **Without configuration:** Auto-detects enabled social connectors from Logto
- **No providers:** Shows only the email/password form

When clicked, social buttons redirect to Logto's OAuth flow using the `social:<provider>` direct sign-in format.

### Without Social Providers

Use the `nosocial` prop to show only email/password authentication:

```vue
<ASignInForm nosocial />
```

### Mock Mode

Use the `mock` prop for documentation, testing, or demos. In mock mode:

- Form submissions show loading states without making actual API calls
- Social buttons display loading animation without redirecting
- Console logs show the submitted data for debugging
- Perfect for showcasing UI without authentication setup

```vue
<ASignInForm mock />
```

### With Container

Compose with the Container component for a complete auth page:

```vue
<AContainer 
  title="Welcome Back"
  description="Sign in to continue"
>
  <ASignInForm @submit="handleSignIn" />
  
  <template #footer>
    <p class="text-sm">
      Don't have an account?
      <UButton variant="link" to="/auth/sign-up">
        Sign up
      </UButton>
    </p>
  </template>
</AContainer>
```

### In Modal

Use standalone in a modal for inline authentication:

```vue
<UModal>
  <template #content>
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-4">Sign In</h3>
      <ASignInForm @success="closeModal" />
    </div>
  </template>
</UModal>
```

## API

### Props

| Prop       | Type      | Default | Description                              |
| ---------- | --------- | ------- | ---------------------------------------- |
| `nosocial` | `boolean` | `false` | Hide social provider buttons and separator |
| `mock`     | `boolean` | `false` | Enable mock mode for documentation/testing |

### Events

| Event     | Payload                                   | Description                      |
| --------- | ----------------------------------------- | -------------------------------- |
| `submit`  | `SignInFormData & { provider?: string }` | Form submitted with valid data   |
| `success` | `void`                                    | Authentication succeeded         |

### Exposed Methods

Access these methods via template ref:

```vue
<ASignInForm ref="formRef" />
```

| Method        | Parameters          | Description                    |
| ------------- | ------------------- | ------------------------------ |
| `setLoading`  | `(value: boolean)`  | Control loading state          |
| `setError`    | `(message: string)` | Display inline error message   |
| `clearForm`   | `()`                | Reset form to initial state    |

### Type Definitions

```typescript
interface SignInFormData {
  email: string
  password: string
  rememberMe?: boolean
}
```

### Validation Schema

The form uses Zod for validation with these rules:

| Field        | Rules                                     |
| ------------ | ----------------------------------------- |
| `email`      | Required, valid email format             |
| `password`   | Required, minimum 6 characters           |
| `rememberMe` | Optional boolean                          |