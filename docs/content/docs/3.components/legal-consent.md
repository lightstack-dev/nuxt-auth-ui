---
title: LegalConsent
description: Display legal consent links for terms of service, privacy policy, and other legal documents
---

The LegalConsent component displays consent messages and links to legal documents. It's typically placed below authentication forms or in footers to inform users about legal agreements.

## Basic Usage and Defaults

::code-preview
::a-legal-consent{mock}
::

#code

```vue
<ALegalConsent />
```
::

By default, the component:

- Displays all configured legal documents from your `nuxt.config.ts`
- Shows a general consent message
- Renders links with dot separators between them
- Opens links in new tabs to avoid disrupting user flow
- Automatically hides when no legal documents are configured

See the component's [API](#api) for how to override these defaults.

## Customization

### Context-Specific Messages

The component displays different consent messages based on the context:

::code-preview
::a-legal-consent{mock context="signUp"}
::

#code

```vue
<!-- Sign-up context message -->
<ALegalConsent context="signUp" />
```
::

::code-preview
::a-legal-consent{mock context="signIn"}
::

#code

```vue
<!-- Sign-in context message -->
<ALegalConsent context="signIn" />
```
::

### Selective Document Display

Control which legal documents to show:

::code-preview
::a-legal-consent{mock :legal='["privacyPolicy"]'}
::

#code

```vue
<!-- Show only privacy policy -->
<ALegalConsent :legal="['privacyPolicy']" />
```
::

::code-preview
::a-legal-consent{mock :legal='["termsOfService", "privacyPolicy"]'}
::

#code

```vue
<!-- Show specific documents -->
<ALegalConsent :legal="['termsOfService', 'privacyPolicy']" />
```
::

::note
If you specify documents that aren't configured in your `nuxt.config.ts`, they will be filtered out with a console warning in development. If none of the specified documents exist, the component won't render.
::

### Mock Mode

Enable mock mode for documentation, testing, or demos:

```vue
<ALegalConsent mock />
```

In mock mode, clicking links doesn't navigate (like all examples on this page).

## Configuration

Configure legal document URLs in your `nuxt.config.ts`:

```typescript [nuxt.config.ts]
export default defineNuxtConfig({
  auth: {
    legal: {
      terms: '/terms',
      privacy: '/privacy',
      cookies: '/cookies'
    }
  }
})
```

::tip
Learn more about configuring legal documents in the [Legal Documents Configuration](/docs/configuration/legal-documents).
::

## API

### Props

| Prop      | Type                                          | Default                       | Description                                                              |
| --------- | --------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------ |
| `context` | `'signIn' \| 'signUp' \| 'general'`{lang="ts-type"} | `'general'`{lang="vue-html"}  | Determines which consent message to display                             |
| `legal`   | `string[]`{lang="ts-type"}                    | `undefined`{lang="vue-html"}  | Array of document keys to display. If omitted, shows all configured docs. Non-existent keys trigger dev warnings |
| `mock`    | `boolean`{lang="ts-type"}                     | `false`{lang="vue-html"}      | Enable mock mode for documentation/testing                              |

### Localization Keys

The component uses these i18n keys under the `auth` namespace:

| Key                           | Default Value                          | Description                           |
| ----------------------------- | -------------------------------------- | ------------------------------------- |
| `auth.signInConsent`          | "By signing in, you agree to our"     | Consent message for sign-in context  |
| `auth.signUpConsent`          | "By signing up, you agree to our"     | Consent message for sign-up context  |
| `auth.generalConsent`         | "By continuing, you agree to our"     | General consent message              |
| `auth.legal.termsOfService`   | "Terms of Service"                    | Terms of Service label               |
| `auth.legal.privacyPolicy`    | "Privacy Policy"                      | Privacy Policy label                  |
| `auth.legal.cookiePolicy`     | "Cookie Policy"                       | Cookie Policy label                   |

::note
Custom legal document keys require corresponding translations. See [Internationalization](/docs/configuration/internationalization#custom-legal-documents) for details.
::