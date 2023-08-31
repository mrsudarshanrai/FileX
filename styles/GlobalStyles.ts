import { Color } from '@/app/theme/colorsType'
import { createGlobalStyle, css } from 'styled-components'

export type Theme = {
  theme: Color
}
const GlobalStyles = createGlobalStyle<Theme>`
${({ theme }) =>
  css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      user-select: none;
    }

    html {
      background-color: ${theme.grey.grey100};
      color: #bbb;
      height: 100vh;
      overflow: hidden;
  `}}
`
export { GlobalStyles }
