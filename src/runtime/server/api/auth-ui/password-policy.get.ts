import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event) as {
    logto?: { endpoint?: string }
    public?: { logto?: { endpoint?: string } }
  }

  // Get Logto configuration - check both private and public config
  const logtoEndpoint = config.logto?.endpoint
    || config.public?.logto?.endpoint
    || process.env.NUXT_LOGTO_ENDPOINT
    || process.env.NUXT_PUBLIC_LOGTO_ENDPOINT

  if (!logtoEndpoint) {
    // Return default password policy
    return {
      length: {
        min: 8,
        max: 256,
      },
    }
  }

  try {
    // Fetch the sign-in experience which includes password policy
    const signInExpUrl = `${logtoEndpoint}/api/sign-in-exp`

    const response = await fetch(signInExpUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn('Failed to fetch password policy from Logto')
      return {
        length: {
          min: 8,
          max: 256,
        },
      }
    }

    const data = await response.json()

    // Extract password policy if available
    const passwordPolicy = data.passwordPolicy || {
      length: {
        min: 8,
        max: 256,
      },
      characterTypes: {
        min: 1,
      },
      rejects: {
        pwned: true,
        repetitionAndSequence: true,
        userInfo: true,
        words: [],
      },
    }

    return passwordPolicy
  }
  catch (error) {
    console.error('Error fetching Logto password policy:', error)
    return {
      length: {
        min: 8,
        max: 256,
      },
    }
  }
})
