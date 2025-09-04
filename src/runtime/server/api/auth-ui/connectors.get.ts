import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

interface LogtoConnector {
  id: string
  type: 'Email' | 'Sms' | 'Social'
  target: string
  name: Record<string, string>
  logo: string
  logoDark?: string
  platform: 'Native' | 'Universal' | 'Web' | null
  isStandard?: boolean
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  // Get Logto configuration - check both private and public config
  const logtoEndpoint = config.logto?.endpoint || 
                        config.public?.logto?.endpoint || 
                        process.env.NUXT_LOGTO_ENDPOINT ||
                        process.env.NUXT_PUBLIC_LOGTO_ENDPOINT
  
  if (!logtoEndpoint) {
    console.warn('Logto endpoint not configured, cannot auto-detect social providers')
    return {
      connectors: []
    }
  }

  try {
    // Note: In a production environment, you might want to cache this response
    // or fetch it server-side only during build/startup to avoid repeated API calls
    
    // For now, we'll fetch the sign-in experience which includes enabled connectors
    // This endpoint is public and doesn't require authentication
    const signInExpUrl = `${logtoEndpoint}/api/sign-in-exp`
    
    const response = await fetch(signInExpUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn('Failed to fetch sign-in experience from Logto')
      return { connectors: [] }
    }

    const data = await response.json()
    
    // Extract social connectors from the sign-in experience
    const socialConnectors = data.socialConnectors || []
    
    // Transform to our format
    const connectors = socialConnectors.map((connector: any) => ({
      name: connector.target || connector.id,
      label: connector.name?.en || connector.target || connector.id,
      icon: `i-simple-icons-${connector.target || connector.id}`,
      logo: connector.logo,
      logoDark: connector.logoDark,
      platform: connector.platform,
    }))

    return { 
      connectors,
      fromCache: false 
    }
  } catch (error) {
    console.error('Error fetching Logto connectors:', error)
    return { 
      connectors: [],
      error: 'Failed to fetch connectors'
    }
  }
})