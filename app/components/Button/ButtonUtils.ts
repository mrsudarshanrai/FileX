import { colors } from '@/app/theme/colors';
import { ButtonType } from './ButtonType';

const defaultButtonTheme: ButtonType.ButtonThemeColor = {
  background: 'transparent',
  hoverBackground: colors.bg.surfaceHover,
  shadowColor: colors.accent.border,
  disabledColor: colors.bg.surface,
  borderColor: colors.border.default,
  textColor: colors.text.primary,
};

const errorButtonTheme: ButtonType.ButtonThemeColor = {
  background: colors.status.danger,
  hoverBackground: '#ef6a62',
  shadowColor: 'rgba(229, 83, 75, 0.35)',
  disabledColor: colors.bg.surface,
  borderColor: colors.status.danger,
  textColor: colors.text.onAccent,
};

const successButtonTheme: ButtonType.ButtonThemeColor = {
  background: colors.status.success,
  hoverBackground: '#57cf8d',
  shadowColor: 'rgba(63, 187, 117, 0.35)',
  disabledColor: colors.bg.surface,
  borderColor: colors.status.success,
  textColor: colors.text.onAccent,
};

const buttonThemes = {
  default: defaultButtonTheme,
  error: errorButtonTheme,
  success: successButtonTheme,
};

const getButtonTheme = (themeName?: ButtonType.ButtonTheme) => {
  if (themeName && themeName in buttonThemes) {
    return buttonThemes[themeName as keyof typeof buttonThemes];
  } else return defaultButtonTheme;
};

export { defaultButtonTheme, buttonThemes, getButtonTheme };
