import { colors } from '@/app/theme/colors'
import { ButtonType } from './ButtonType'

const defaultButtonTheme: ButtonType.ButtonThemeColor = {
  background: 'transparent',
  hoverBackground: colors.grey.grey90,
  shadowColor: colors.grey.grey50,
  disabledColor: colors.grey.grey100,
  borderColor: colors.grey.grey50,
}

const errorButtonTheme: ButtonType.ButtonThemeColor = {
  background: colors.red.red400,
  hoverBackground: colors.grey.grey90,
  shadowColor: colors.red.red50,
  disabledColor: colors.grey.grey100,
  borderColor: colors.red.red400,
  textColor: colors.white.white,
}

const successButtonTheme: ButtonType.ButtonThemeColor = {
  background: colors.green.green400,
  hoverBackground: colors.grey.grey90,
  shadowColor: colors.green.green50,
  disabledColor: colors.grey.grey100,
  borderColor: colors.green.green400,
  textColor: colors.white.white,
}

const buttonThemes = {
  default: defaultButtonTheme,
  error: errorButtonTheme,
  success: successButtonTheme,
}

const getButtonTheme = (themeName?: ButtonType.ButtonTheme) => {
  if (themeName && themeName in buttonThemes) {
    return buttonThemes[themeName as keyof typeof buttonThemes]
  } else return defaultButtonTheme
}

export { defaultButtonTheme, buttonThemes, getButtonTheme }
