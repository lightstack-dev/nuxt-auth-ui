export default defineAppConfig({
  ui: {
    icons: {
      // Auth-specific icons with defaults
      authSignIn: 'i-lucide-log-in',
      authSignUp: 'i-lucide-user-plus',
      authSignOut: 'i-lucide-log-out',
      authUser: 'i-lucide-user-circle',
      authProfile: 'i-lucide-user',
      authSettings: 'i-lucide-settings',
      authSecurity: 'i-lucide-shield-check',
      authPassword: 'i-lucide-key',
      authEmail: 'i-lucide-mail',
      authSocial: 'i-lucide-globe',
      authProvider: 'i-lucide-log-in',
      // Social provider icons
      authGoogle: 'i-simple-icons-google',
      authGithub: 'i-simple-icons-github',
      authMicrosoft: 'i-simple-icons-microsoft',
      authFacebook: 'i-simple-icons-facebook',
      authApple: 'i-simple-icons-apple',
      authTwitter: 'i-simple-icons-twitter',
      authLinkedin: 'i-simple-icons-linkedin',
      authDiscord: 'i-simple-icons-discord',
      authGitlab: 'i-simple-icons-gitlab',
      authSlack: 'i-simple-icons-slack',
      authAzure: 'i-simple-icons-microsoftazure',
      authOkta: 'i-simple-icons-okta',
      authAuth0: 'i-simple-icons-auth0',
    },
    input: {
      slots: {
        root: 'w-full',
      },
    },
  },
})
