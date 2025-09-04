---
title: Container
description: A consistent wrapper for authentication pages
---

The Container component provides a consistent layout wrapper for authentication pages, ensuring proper centering, spacing, and branding across all auth flows.

## Basic Usage and Defaults

::code-preview
::a-container{title="Title" description="Description"}
Authentication page content
::
::

::docs-demo
<AContainer 
  title="Welcome Back" 
  description="Sign in to your account to continue"
/>

#code

```vue
<AContainer
  title="Welcome Back"
  description="Sign in to your account to continue"
>
  <!-- Your form content -->
</AContainer>
```

::

By default, the container:

- Centers content with `UContainer` and constrains width to `max-w-md`
- Wraps content in a `UCard` for consistent styling
- Provides responsive padding and spacing
- Supports optional title and description
- Can display a logo from configuration or props
- Includes a footer slot for navigation links

## Customization

### Logo

Display your app's branding using the logo prop:

```vue
<!-- Using logo prop -->
<AContainer logo="/logo.svg" title="Welcome" />

<!-- Or configure globally -->
export default defineNuxtConfig({ authUi: { logo: '/logo.svg' } })
```

::docs-demo
<AContainer
logo="https://via.placeholder.com/48"
title="With Logo"

>

  <div class="p-8 text-center text-gray-500">
    Logo displayed above title
  </div>
</AContainer>
::

### Title and Description

Customize the header text:

```vue
<AContainer title="Create Account" description="Join thousands of users" />
```

::docs-demo
<AContainer
title="Create Account"
description="Join thousands of users already using our platform"

>

  <div class="p-8 text-center text-gray-500">
    Sign-up form would go here
  </div>
</AContainer>
::

### Footer

The footer slot is perfect for navigation links. Since we can't demonstrate slots in the docs demos, here's how to use it:

```vue
<AContainer title="Sign In">
  <!-- Main content -->
  <div>Your form here</div>
  
  <!-- Footer with navigation -->
  <template #footer>
    <p class="text-sm text-gray-600">
      Don't have an account? 
      <UButton variant="link" to="/auth/sign-up">
        Sign up
      </UButton>
    </p>
  </template>
</AContainer>
```

The footer appears below the card and is typically used for:

- Sign up / Sign in toggle links
- Terms of service links
- Help or support links
- Password reset links

## API

### Props

| Prop          | Type     | Default       | Description                  |
| ------------- | -------- | ------------- | ---------------------------- |
| `title`       | `string` | `undefined`   | Main heading text            |
| `description` | `string` | `undefined`   | Subtitle or description text |
| `logo`        | `string` | `config.logo` | Path to logo image           |

### Slots

| Slot      | Description                                   |
| --------- | --------------------------------------------- |
| `default` | Main content area (typically a form)          |
| `logo`    | Custom logo component (overrides `logo` prop) |
| `footer`  | Footer content (navigation links, help text)  |

### Configuration

Configure defaults via module options:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  authUi: {
    appName: "My App", // Used in logo alt text
    logo: "/logo.svg", // Default logo path
  },
});
```
