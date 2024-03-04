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
  grid-template-columns: 150px 1fr;

  h4 {
    font-size: 15px;
    font-weight: 700;
  }
  h4,
  p {
    font-size: 15px;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: all;
  }
`;

export { PropertiesModalWrapper, Info };
