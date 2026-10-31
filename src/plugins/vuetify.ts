import { createVuetify } from 'vuetify'
import { fa } from 'vuetify/locale'

/**
 * Vuetify instance.
 *
 * Vuetify owns accessible *interactive* primitives (drawer, expansion panels,
 * dialog, snackbar, rating). Visual language — colour, type, spacing, cards and
 * buttons — lives in the Tailwind-based design system, so the two never fight.
 *
 * RTL is configured per locale (Persian = RTL) rather than globally.
 */
export const vuetify = createVuetify({
  locale: {
    locale: 'fa',
    fallback: 'en',
    rtl: { fa: true },
    messages: { fa },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  theme: {
    defaultTheme: 'schoolinoLight',
    themes: {
      schoolinoLight: {
        dark: false,
        colors: {
          background: '#faf7f1',
          surface: '#ffffff',
          primary: '#5741d6',
          'primary-darken-1': '#4834be',
          secondary: '#1c9c7e',
          accent: '#f4a62a',
          error: '#e2573f',
          info: '#5741d6',
          success: '#1c9c7e',
          warning: '#f4a62a',
          'on-background': '#14142b',
          'on-surface': '#14142b',
          'on-primary': '#ffffff',
        },
        variables: {
          'border-color': '#e7e0d3',
          'border-opacity': 1,
          'high-emphasis-opacity': 1,
          'medium-emphasis-opacity': 0.72,
          'theme-kbd': '#f3eee4',
          'theme-on-kbd': '#14142b',
          'theme-code': '#f3eee4',
          'theme-on-code': '#14142b',
        },
      },
      schoolinoDark: {
        dark: true,
        colors: {
          background: '#0b0b14',
          surface: '#141422',
          primary: '#b0a2ff',
          'primary-darken-1': '#c4b9ff',
          secondary: '#56d3b2',
          accent: '#ffc46b',
          error: '#ff8b74',
          info: '#b0a2ff',
          success: '#56d3b2',
          warning: '#ffc46b',
          'on-background': '#f4f1e8',
          'on-surface': '#f4f1e8',
          'on-primary': '#191334',
        },
        variables: {
          'border-color': '#29283f',
          'border-opacity': 1,
          'high-emphasis-opacity': 1,
          'medium-emphasis-opacity': 0.74,
          'theme-kbd': '#1a1a2c',
          'theme-on-kbd': '#f4f1e8',
          'theme-code': '#1a1a2c',
          'theme-on-code': '#f4f1e8',
        },
      },
    },
  },
  defaults: {
    global: { ripple: false },
    VExpansionPanel: { elevation: 0 },
    VExpansionPanels: { elevation: 0, rounded: 'xl' },
    VDialog: { scrim: true },
    VSnackbar: { location: 'bottom center' },
  },
})
