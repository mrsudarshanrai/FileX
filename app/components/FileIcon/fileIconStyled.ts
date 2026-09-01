import styled, { css } from 'styled-components';
import { FileIconType } from './fileIconType';

const FileIconWrapper = styled.div<
  FileIconType.FileIconWrapper & { isImage?: boolean; size: number }
>`
  ${({ theme, isImage, size }) => css`
    filter: brightness(100%);

    ${isImage &&
    css`
      width: ${size}px;
      height: ${size}px;
      overflow: hidden;
      border-radius: ${theme.radius.sm};

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    `}
  `}

  ${(props) =>
    props &&
    !props.disableHover &&
    css`
      &:hover {
        filter: brightness(90%);
      }
    `}
`;

export { FileIconWrapper };
