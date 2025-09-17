export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'zinc',
      error: 'rose',
      info: 'cyan',
      success: 'green',
      warning: 'amber',
    },
    header: {
      slots: {
        title: 'flex font-light italic items-center',
      },
    },
    pageHero: {
      slots: {
        title: 'text-balance font-light italic',
      },
    },
    pageSection: {
      slots: {
        title: 'text-balance',
      },
    },
    prose: {
      codePreview: {
        slots: {
          preview: 'px-8 py-6',
        },
      },
    },
  },
})
