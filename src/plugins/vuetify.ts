import { createVuetify } from 'vuetify'
/** The approved RTL dark palette; Vuetify owns dialogs/forms, not landing geometry. */
export function createAppVuetify() {
  return createVuetify({
    locale: { rtl: { fa: true }, locale: 'fa' },
    theme: {
      defaultTheme: 'avin',
      themes: {
        avin: {
          dark: true,
          colors: { background: '#00142e', surface: '#061d3b', primary: '#00d9ed' },
        },
      },
    },
  })
}
