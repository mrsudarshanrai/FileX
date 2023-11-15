import React from 'react'
import { ButtonStyled } from './ButtonStyled'
import { ButtonType } from './ButtonType'
import { getButtonTheme } from './ButtonUtils'

const Button = (props: ButtonType.Props) => {
  const { theme, onClick, disabled, children } = props
  return (
    <ButtonStyled theme={getButtonTheme(theme)} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  )
}

export default Button
