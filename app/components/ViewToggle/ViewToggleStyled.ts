import styled, { css } from 'styled-components';
import { ClickableIcon } from '../NavigationPath/PathStyled';

const BUTTON_SIZE = 32;

const ViewToggleGroup = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: ${theme.radius.md};
    background-color: ${theme.bg.surfaceHover};
  `}
`;

const ViewToggleHighlight = styled.div<{ index: number }>`
  ${({ theme, index }) => css`
    position: absolute;
    width: ${BUTTON_SIZE}px;
    height: ${BUTTON_SIZE}px;
    border-radius: ${theme.radius.sm};
    background-color: ${theme.accent.default};
    transform: translateX(${index * BUTTON_SIZE}px);
    transition: transform 0.2s ease;
    z-index: 0;
  `}
`;

const ViewToggleButton = styled(ClickableIcon)<{ iconFill: string }>`
  ${({ iconFill }) => css`
    position: relative;
    z-index: 1;

    && svg path {
      fill: ${iconFill};
    }

    &&:hover svg path {
      fill: ${iconFill};
    }
  `}
`;

export { ViewToggleGroup, ViewToggleHighlight, ViewToggleButton };
