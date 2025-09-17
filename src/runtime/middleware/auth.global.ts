import { useRuntimeConfig, navigateTo, useNuxtApp, ref, useRequestEvent, type Ref } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  const authConfig = config.public.auth

  // Skip if middleware is completely disabled
  if (!authConfig?.middleware || typeof authConfig.middleware === 'boolean') return

  // Get middleware config (defaults to protect by default)
  const middlewareConfig = typeof authConfig.middleware === 'object' ? authConfig.middleware : { protectByDefault: true, exceptionRoutes: [] }

  // Check authentication status
  let isAuthenticated: boolean | Ref<boolean>

  if (import.meta.server) {
    // Server-side: check for logtoUser in event context
    const event = useRequestEvent()
    isAuthenticated = !!event?.context?.logtoUser
  }
  else {
    // Client-side: use the Nuxt app plugin
    const { $logtoAuth } = useNuxtApp() as { $logtoAuth?: { isAuthenticated: Ref<boolean> } }
    isAuthenticated = $logtoAuth?.isAuthenticated || ref(false)
  }

  // Define auth routes that should be accessible to unauthenticated users
  const publicAuthRoutes = [
    authConfig.routes?.signIn || '/auth/sign-in',
    authConfig.routes?.signUp || '/auth/sign-up',
    authConfig.routes?.reset,
  ].filter(Boolean) // Remove undefined routes

  // Define legal routes that should always be public
  const legalRoutes = [
    authConfig.legal?.termsOfService,
    authConfig.legal?.privacyPolicy,
    authConfig.legal?.cookiePolicy,
  ].filter(Boolean) as string[] // Remove undefined routes and ensure string array

  const currentPath = to.path

  // Check if current route is a public auth route
  const isAuthRoute = publicAuthRoutes.includes(currentPath)

  // Check if current route is a legal document route
  const isLegalRoute = legalRoutes.includes(currentPath)

  // Get exception routes (combine user-defined exceptions with legal routes)
  const exceptionRoutes = [
    ...(middlewareConfig?.exceptionRoutes || []),
    ...legalRoutes, // Automatically include legal routes as exceptions
  ]
  const isException = exceptionRoutes.some((pattern: string) => {
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$')
      return regex.test(currentPath)
    }
    return currentPath === pattern
  })

  // Determine if route should be protected based on protectByDefault setting
  let isProtectedRoute: boolean
  if (middlewareConfig.protectByDefault !== false) {
    // Protect by default: protect everything except auth routes, legal routes, and exceptions
    isProtectedRoute = !isAuthRoute && !isLegalRoute && !isException
  }
  else {
    // Don't protect by default: only protect exception routes (not auth routes or legal routes)
    isProtectedRoute = !isAuthRoute && !isLegalRoute && isException
  }

  // Get the authentication value (handle both boolean and Ref)
  const isAuthenticatedValue = typeof isAuthenticated === 'boolean' ? isAuthenticated : isAuthenticated.value

  if (isAuthenticatedValue) {
    // User is authenticated
    if (isAuthRoute) {
      // Redirect authenticated users away from auth pages
      const redirectTo = authConfig.redirects?.afterSignIn || '/'
      if (currentPath !== redirectTo) {
        return navigateTo(redirectTo, { replace: true })
      }
    }
  }
  else {
    // User is not authenticated
    if (isProtectedRoute) {
      // Redirect unauthenticated users to sign-in
      const signInRoute = authConfig.routes?.signIn || '/auth/sign-in'
      if (currentPath !== signInRoute) {
        // Store the intended destination for after sign-in
        const redirectAfterSignIn = currentPath !== '/' ? `?redirect=${encodeURIComponent(currentPath)}` : ''
        return navigateTo(`${signInRoute}${redirectAfterSignIn}`, { replace: true })
      }
    }
  }
})
