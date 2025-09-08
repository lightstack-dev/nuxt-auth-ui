import { defineEventHandler, readBody, createError } from 'h3'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Validate input
    registerSchema.parse(body)

    // Get Logto endpoint from runtime config
    const runtimeConfig = useRuntimeConfig()
    const logtoEndpoint = runtimeConfig.logto?.endpoint || process.env.NUXT_LOGTO_ENDPOINT

    if (!logtoEndpoint) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Logto endpoint not configured',
      })
    }

    // For now, we'll use the interaction/experience API approach
    // This will redirect the user to Logto's registration flow
    // In a future iteration, we can implement direct API calls with M2M auth

    // TODO: Implement Experience API integration
    // For MVP, we return success and let the client redirect to Logto

    return {
      success: true,
      message: 'Please proceed to Logto for registration',
      redirectUrl: `${logtoEndpoint}/sign-in?first_screen=register`,
    }
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request data',
        data: error.errors,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Registration failed',
    })
  }
})
