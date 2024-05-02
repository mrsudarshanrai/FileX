import styled, { css } from 'styled-components';

type IconContainerProps = {
  width?: string;
  height?: string;
  fill?: string;
};

const IconContainer = styled.div<IconContainerProps>`
  ${({ width, height, fill }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width} !important;
    height: ${height} !important;
    svg {
      width: ${width} !important;
      height: ${height} !important;
    }
    svg,
    path {
      fill: ${fill};
    }
  `}
`;

export { IconContainer };
