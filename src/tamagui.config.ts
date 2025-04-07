
import { createTamagui } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/theme-base'

// Mevcut temadan renkleri alıp Tamagui temasına entegre etmek için
const primaryColor = '#E04A0B'
const secondaryColor = '#FEA721'
const accentColor = '#678598'
const infoColor = '#2B3E4F'
const successColor = '#4CAF50'
const errorColor = '#F44336'
const warningColor = '#FFC107'
const backgroundLight = '#FFFFFF'
const backgroundDark = '#121212'
const textLight = '#111111'
const textDark = '#EDEDED'
const surfaceColor = '#F7EBD5'

// Özel temalar oluşturma
const customThemes = {
  ...themes,
  light: {
    ...themes.light,
    background: backgroundLight,
    color: textLight,
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    info: infoColor,
    success: successColor,
    error: errorColor,
    warning: warningColor,
    surface: surfaceColor,
  },
  dark: {
    ...themes.dark,
    background: backgroundDark,
    color: textDark,
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    info: infoColor,
    success: successColor,
    error: errorColor,
    warning: warningColor,
  }
}

// Remove createInterFont since it's causing issues
const appConfig = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    // Use default fonts instead
    heading: {
      family: 'System',
      size: {
        1: 13,
        2: 15,
        3: 18,
        4: 22,
        5: 26,
        6: 32,
      },
      lineHeight: {
        1: 17,
        2: 20,
        3: 24,
        4: 28,
        5: 33,
        6: 40,
      },
      weight: {
        4: '300',
        6: '600',
      },
    },
    body: {
      family: 'System',
      size: {
        1: 13,
        2: 15,
        3: 18,
      },
      lineHeight: {
        1: 17,
        2: 20,
        3: 24,
      },
      weight: {
        4: '400',
      },
    },
  },
  themes: customThemes,
  tokens,
})

export type AppConfig = typeof appConfig
export default appConfig
