import styled, { css } from 'styled-components';
import { FileIconType } from './fileIconType';

const FileIconWrapper = styled.div<FileIconType.FileIconWrapper & { isImage?: boolean }>`
  ${({ theme, isImage }) => css`
    filter: brightness(100%);

    ${isImage &&
    css`
      width: 80px;
      height: 80px;
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
