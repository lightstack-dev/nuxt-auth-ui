---
title: SignInForm
description: A complete sign-in form with validation and error handling
---

The SignInForm component provides a ready-to-use authentication form with email/password fields, validation, social provider buttons, and proper error handling following our design principles.

## Basic Usage and Defaults

::docs-demo
<UCard>
  <ASignInForm />
</UCard>

#code

```vue
<ASignInForm 
  @submit="handleSignIn"
  @success="handleSuccess"
/>
```

::

By default, the form includes:

- Email and password fields with Zod validation
- Remember me checkbox
- Forgot password link (routes to `/auth/password-reset` by default)
- Social provider buttons (auto-detected from Logto)
- **Inline error display** for form errors (not toasts)
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

The form automatically detects and displays available social providers configured in your Logto instance:

```vue
<!-- Social buttons appear automatically -->
<ASignInForm />
```

Common providers include:
- Google
- GitHub  
- Microsoft
- Facebook
- And more...

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