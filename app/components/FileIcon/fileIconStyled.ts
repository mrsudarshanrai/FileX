import styled from 'styled-components';

const FileIconWrapper = styled.div`
  filter: brightness(100%);

  img {
    display: block;
  }

  &[data-preview='true'] {
    overflow: hidden;
    border-radius: var(--radius-sm);

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &:not([data-hover-disabled='true']):hover {
    filter: brightness(90%);
  }
`;

export { FileIconWrapper };
