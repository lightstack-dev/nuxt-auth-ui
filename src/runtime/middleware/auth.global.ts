import { useRuntimeConfig, navigateTo, useNuxtApp, ref, type Ref } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on server-side rendering during build/generation
  if (import.meta.server) return

  const config = useRuntimeConfig()
  const authConfig = config.public.auth

  // Skip if middleware is completely disabled
  if (!authConfig?.middleware || authConfig.middleware === false) return

  // Get middleware config (defaults to protect by default)
  const middlewareConfig = typeof authConfig.middleware === 'object' ? authConfig.middleware : { protectByDefault: true, exceptionRoutes: [] }

  const { $logtoAuth } = useNuxtApp() as { $logtoAuth?: { isAuthenticated: Ref<boolean> } }
  const isAuthenticated = $logtoAuth?.isAuthenticated || ref(false)

  // Define auth routes that should be accessible to unauthenticated users
  const publicAuthRoutes = [
    authConfig.routes?.signIn || '/auth/sign-in',
    authConfig.routes?.signUp || '/auth/sign-up',
    authConfig.routes?.passwordReset,
  ].filter(Boolean) // Remove undefined routes

  const currentPath = to.path

  // Check if current route is a public auth route
  const isAuthRoute = publicAuthRoutes.includes(currentPath)

  // Get exception routes
  const exceptionRoutes = middlewareConfig?.exceptionRoutes || []
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
    // Protect by default: protect everything except auth routes and exceptions
    isProtectedRoute = !isAuthRoute && !isException
  }
  else {
    // Don't protect by default: only protect exception routes (not auth routes)
    isProtectedRoute = !isAuthRoute && isException
  }

  if (isAuthenticated.value) {
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
