import styled from 'styled-components';

const PropertiesModalWrapper = styled.div`
  height: 230px;
  display: grid;
  grid-template-columns: 120px 1fr;
  padding: 10px;

  .file_info_container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr;

  h4 {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.text.secondary};
  }

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.text.primary};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: all;
  }
`;

export { PropertiesModalWrapper, Info };
