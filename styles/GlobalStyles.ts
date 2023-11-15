import { Color } from '@/app/theme/colorsType'
import styled, { createGlobalStyle, css } from 'styled-components'

export type Theme = {
  theme: Color
}
const MainContainer = styled.div`
  border: 0;
  height: 100vh;
  overflow-y: scroll;
  color: white;
  padding: 15px 0;
  width: 100%;
`

const GlobalStyles = createGlobalStyle<Theme>`
${({ theme }) =>
  css`
  
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      user-select: none;
      font-family: 'Poppins', sans-serif;
    }

    html {
      background-color: ${theme.grey.grey100};
      color: #bbb;
      height: 100vh;
      overflow: hidden;
      font-family: 'Poppins', sans-serif;
  `}}
`

export { GlobalStyles, MainContainer }
