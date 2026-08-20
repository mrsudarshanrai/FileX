import { Color } from '@/app/theme/colorsType';
import { ButtonType } from './ButtonType';

const buildButtonThemes = (
  colors: Color,
): Record<ButtonType.ButtonTheme, ButtonType.ButtonThemeColor> => ({
  default: {
    background: 'transparent',
    hoverBackground: colors.bg.surfaceHover,
    shadowColor: colors.accent.border,
    disabledColor: colors.bg.surface,
    borderColor: colors.border.default,
    textColor: colors.text.primary,
  },
  error: {
    background: colors.status.danger,
    hoverBackground: '#ef6a62',
    shadowColor: 'rgba(229, 83, 75, 0.35)',
    disabledColor: colors.bg.surface,
    borderColor: colors.status.danger,
    textColor: colors.text.onAccent,
  },
  success: {
    background: colors.status.success,
    hoverBackground: '#57cf8d',
    shadowColor: 'rgba(63, 187, 117, 0.35)',
    disabledColor: colors.bg.surface,
    borderColor: colors.status.success,
    textColor: colors.text.onAccent,
  },
});

const getButtonTheme = (themeName: ButtonType.ButtonTheme | undefined, colors: Color) => {
  const themes = buildButtonThemes(colors);
  if (themeName && themeName in themes) return themes[themeName];
  return themes.default;
};

export { getButtonTheme };
