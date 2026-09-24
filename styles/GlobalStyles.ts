import { Color } from '@/app/theme/colorsType';
import styled, { createGlobalStyle, css } from 'styled-components';

export type Theme = {
  theme: Color;
};
const MainContainer = styled.div`
  border: 0;
  height: 100vh;
  overflow-y: scroll;
  color: ${({ theme }) => theme.text.primary};
  padding: 15px 0;
  width: 100%;
`;

const SYSTEM_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, Cantarell, "Noto Sans", sans-serif';

const GlobalStyles = createGlobalStyle<Theme>`
${({ theme }) =>
  css`
    :root {
      --bg-surface-hover: ${theme.bg.surfaceHover};
      --bg-elevated: ${theme.bg.elevated};
      --text-primary: ${theme.text.primary};
      --accent-default: ${theme.accent.default};
      --accent-muted: ${theme.accent.muted};
      --accent-border: ${theme.accent.border};
      --radius-sm: ${theme.radius.sm};
      --radius-md: ${theme.radius.md};
      --spacing-sm: ${theme.spacing.sm};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      user-select: none;
      font-family: ${SYSTEM_FONT_STACK};
    }

    input,
    textarea {
      user-select: text;
    }

    html {
      background-color: ${theme.bg.canvas};
      color: ${theme.text.secondary};
      height: 100vh;
      overflow: hidden;
      font-family: ${SYSTEM_FONT_STACK};
    }
  `}
`;

export { GlobalStyles, MainContainer };
