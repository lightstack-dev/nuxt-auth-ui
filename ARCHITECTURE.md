# Architecture Documentation

## Module Scope Clarification

This is NOT just a UI module. This is a **complete authentication solution** that:
1. Provides everything Logto's SDK is missing
2. Includes beautiful, production-ready UI components
3. Handles all profile management operations Logto doesn't support
4. Delivers a truly complete auth experience

We're building what should be called something like `@lightstack-dev/nuxt-auth` - a full authentication module, not just UI.

## The Problem Space

### Why This Module Exists

Every auth solution has critical gaps:
- **Logto**: Great admin UI, no user profile management SDK
- **Supabase**: Complete SDK, complex self-hosting
- **Zitadel**: No modern framework support
- **Auth0**: Not self-hostable, expensive
- **Keycloak**: Enterprise-focused, dated UX

This module fills Logto's gap: providing complete user profile management that Logto's SDK doesn't offer.

## What We're Actually Building

This is NOT just a UI wrapper. We're building:

1. **Complete Auth SDK** for profile management
2. **Server API proxy layer** to Logto's Account API
3. **Verification flow handlers** (email, SMS, password)
4. **Beautiful UI components** that integrate seamlessly

## Architecture Decisions

### Why Server API Routes Are Necessary

Logto's SDKs (including @logto/nuxt, @logto/browser, @logto/node) only provide:
- Sign in/out via redirects
- Token management
- Basic user info fetching

They DO NOT provide:
- Password changes
- Email/phone updates
- Avatar management
- MFA configuration
- Social account linking

Therefore, we must:
1. Use `getAccessToken()` from Logto's SDK
2. Make raw HTTP calls to Logto's Account API
3. Handle verification requirements
4. Manage error states and retries

### API Layer Structure

```
Client Component
  ↓
useFinalAuth() composable
  ↓
/api/auth-ui/* endpoints (our server layer)
  ↓
Logto Account API (their endpoints)
```

### Why Not Use Management API?

- Management API requires machine-to-machine auth
- It's meant for admin operations, not user self-service
- Account API is specifically designed for end-users

## Implementation Roadmap

### Phase 1: Core Functionality ✓
- [x] Basic sign in/up forms
- [x] Social provider buttons
- [x] Password validation
- [x] i18n support

### Phase 2: Profile Management (Current)
- [ ] Password change with verification
- [ ] Email update with verification
- [ ] Phone number management
- [ ] Avatar upload
- [ ] Display name changes

### Phase 3: Security Features
- [ ] MFA setup (TOTP, WebAuthn)
- [ ] Backup codes
- [ ] Session management
- [ ] Security event logs

### Phase 4: Social & Advanced
- [ ] Link/unlink social accounts
- [ ] Account deletion
- [ ] Data export
- [ ] Consent management

## Technical Challenges

### 1. Verification Flows
Logto requires verification for sensitive operations:
- Must create verification record first
- Verification expires in 10 minutes
- Different verification methods (password, email code, SMS)

### 2. Token Management
- Access tokens for Account API
- Proper refresh handling
- Scope requirements

### 3. Error Handling
- Rate limiting
- Expired verifications
- Network failures
- Logto API changes

## Business Model Considerations

### Open Source (Current)
- Basic auth UI components
- Community-driven
- Establishes market presence

### Pro Version (Potential)
- Complete profile management
- Advanced security features
- Priority support
- Self-hosted admin dashboard
- White-labeling options

### Value Proposition
"Stop rebuilding auth. Ship your product instead."
- Saves 2-4 weeks of development per project
- Production-ready from day one
- Deep Nuxt integration
- Self-hostable

## Lessons Learned

1. **Logto's SDK is minimal by design** - They focus on core auth, expect developers to build the rest
2. **No auth provider has it all** - Every solution requires significant additional work
3. **The market need is massive** - Every developer faces this problem
4. **Integration depth matters** - Being "native" to Nuxt is our competitive advantage

## Next Steps

1. Complete Phase 2 (Profile Management)
2. Document all Logto API quirks
3. Create comprehensive examples
4. Consider monetization strategy
5. Build community around the project

---

*This document is a living record of our architectural decisions and learnings while building a production-ready auth solution for Nuxt.*