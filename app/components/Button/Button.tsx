import React from 'react';
import { useTheme } from 'styled-components';
import { ButtonStyled } from './ButtonStyled';
import { ButtonType } from './ButtonType';
import { getButtonTheme } from './ButtonUtils';
import { Color } from '@/app/theme/colorsType';

const Button = (props: ButtonType.Props) => {
  const { theme, onClick, disabled, children } = props;
  const appColors = useTheme() as Color;

  return (
    <ButtonStyled theme={getButtonTheme(theme, appColors)} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
