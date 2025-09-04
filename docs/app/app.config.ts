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
    prose: {
      codePreview: {
        slots: {
          preview: 'demo px-8 py-6',
        },
      },
    },
  },
})
