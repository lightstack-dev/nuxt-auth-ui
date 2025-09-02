export default defineAppConfig({
  ui: { colors: {
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
  },
})
