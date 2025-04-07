
import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
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

const interFont = createInterFont()

const appConfig = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes: customThemes,
  tokens,
})

export type AppConfig = typeof appConfig
export default appConfig
