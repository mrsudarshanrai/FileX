import { Color, ThemeMode } from './colorsType';

const legacyRamps = {
  grey: {
    grey105: '#1e1e1e',
    grey100: '#1b1d26',
    grey90: '#3a3746',
    grey50: '#8d8f9257',
    grey30: '#4a4a4a57',
    grey20: '#8F8F8F',
    grey10: '#ccc',
    grey5: '#eee',
  },
  red: {
    red50: '#e5393533',
    red100: '#eb4444',
    red200: '#e02727',
    red300: '#bd2323',
    red400: '#9b1c1c',
    red500: '#821e1e',
    red600: '#6b1d1d',
    red700: '#551c1c',
    red800: '#411919',
    red900: '#2e1414',
  },
  white: {
    white: '#FFFFFF',
  },
  green: {
    green50: '#2da16033',
    green100: '#62e1ac',
    green200: '#48d499',
    green300: '#36be85',
    green400: '#2da170',
    green500: '#2d8762',
    green600: '#2c7154',
    green700: '#295c47',
    green800: '#25483a',
    green900: '#20362d',
  },
  blue: {
    blue100: '#005a9e',
    blue50: '#0078d4',
  },
};

const sharedTokens = {
  accent: {
    default: '#8651C9',
    hover: '#8f81f5',
    muted: 'rgba(124, 108, 240, 0.16)',
    border: 'rgba(124, 108, 240, 0.4)',
  },
  status: {
    success: '#3fbb75',
    danger: '#e5534b',
    info: '#4c9be8',
    warning: '#e0a638',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '10px',
    xl: '14px',
    pill: '999px',
  },
};

const darkColors: Color = {
  ...legacyRamps,
  ...sharedTokens,
  bg: {
    canvas: '#17181f',
    surface: '#1b1d26',
    surfaceHover: '#242631',
    elevated: '#20222c',
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    default: 'rgba(255, 255, 255, 0.14)',
  },
  text: {
    primary: '#f2f2f4',
    secondary: '#a8a9b3',
    muted: '#6f707a',
    onAccent: '#ffffff',
  },
};

const lightColors: Color = {
  ...legacyRamps,
  ...sharedTokens,
  bg: {
    canvas: '#f2f2f2',
    surface: '#ffffff',
    surfaceHover: '#eceef1',
    elevated: '#ffffff',
  },
  border: {
    subtle: 'rgba(0, 0, 0, 0.08)',
    default: 'rgba(0, 0, 0, 0.14)',
  },
  text: {
    primary: '#1c1d21',
    secondary: '#5b5d66',
    muted: '#8b8d96',
    onAccent: '#ffffff',
  },
};

const themes: Record<ThemeMode, Color> = {
  dark: darkColors,
  light: lightColors,
};

const colors = darkColors;

export { colors, darkColors, lightColors, themes };
