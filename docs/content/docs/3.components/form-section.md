---
title: FormSection
description: Page wrapper for authentication forms with consistent styling and layout
---

The FormSection component provides a consistent page layout wrapper for authentication forms. It's used internally by the auth pages but can also be used to create custom authentication layouts.

## Basic Usage and Defaults

::code-preview
::a-form-section{context="signIn" mock}
  <div class="text-center">
    <p>Your authentication form content goes here</p>
  </div>
::

#code

```vue
<AFormSection context="signIn">
  <ASignInForm />
  <!-- LegalConsent is automatically included -->
</AFormSection>
```
::

By default, the component:

- Provides a centered card layout with consistent spacing
- Displays contextual title and icon from app config
- Automatically includes LegalConsent component
- Responds to different authentication contexts

See the component's [API](#api) for how to override these defaults.

## Customization

### Context-Specific Layout

The component adapts its title, description, and icon based on context:

::code-preview
::a-form-section{context="signUp" mock}
  <div class="text-center">
    <p>Sign-up form would go here</p>
  </div>
::

#code

```vue
<!-- Sign-up context -->
<AFormSection context="signUp">
  <ASignUpForm />
</AFormSection>
```
::

### Custom Content

Use the default slot to place any content within the form section:

```vue
<template>
  <AFormSection context="signIn">
    <ASignInForm />
    
    <!-- Custom content -->
    <div class="mt-4 text-center">
      <p class="text-sm text-gray-600">
        Need help? <a href="/contact">Contact support</a>
      </p>
    </div>
  </AFormSection>
</template>
```

## Common Patterns

### Custom Authentication Page

Create your own authentication page using FormSection:

```vue [pages/custom-auth.vue]
<template>
  <AFormSection context="signIn">
    <!-- Your custom form -->
    <form @submit="handleAuth">
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  </AFormSection>
</template>
```

### Multi-Step Authentication

Use FormSection for consistent layout across auth steps:

```vue
<template>
  <AFormSection context="signUp">
    <div v-if="step === 1">
      <ASignUpForm @success="step = 2" />
    </div>
    
    <div v-else-if="step === 2">
      <VerificationForm @success="step = 3" />
    </div>
    
    <div v-else>
      <WelcomeMessage />
    </div>
  </AFormSection>
</template>
```

## API

### Props

| Prop      | Type                    | Default     | Description                           |
| --------- | ----------------------- | ----------- | ------------------------------------- |
| `context` | `'signIn' \| 'signUp'`{lang="ts-type"} | Required    | Authentication context for theming    |

### Slots

| Slot      | Description                                    |
| --------- | ---------------------------------------------- |
| `default` | Content to display inside the form card       |

### Localization Keys

The component uses these i18n keys under the `auth` namespace:

| Key                   | Default Value                        | Description              |
| --------------------- | ------------------------------------ | ------------------------ |
| `auth.signIn`         | "Sign In"                           | Sign-in page title       |
| `auth.signUp`         | "Sign Up"                           | Sign-up page title       |
| `auth.signInTitle`    | "Welcome Back"                      | Sign-in card title       |
| `auth.signUpTitle`    | "Let's Get You Signed Up"           | Sign-up card title       |

## Integration

FormSection automatically integrates with:

- **App Config Icons**: Uses `authSignIn` and `authSignUp` icons
- **LegalConsent Component**: Automatically includes consent links
- **Nuxt UI**: Built on UPageSection and UPageCard components
- **Responsive Design**: Mobile-friendly centered layout