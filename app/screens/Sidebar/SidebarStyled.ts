import { colors } from '@/app/theme/colors';
import { Theme } from '@/styles/GlobalStyles';
import styled, { css } from 'styled-components';

type ISidebarItem = {
  isActive: boolean;
};
const SidebarContainer = styled.div`
  border: 0;
  border-right: 1px solid ${colors.grey.grey50};
  height: 100vh;
  background-color: ${colors.grey.grey100};
  color: #fff;
`;

const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.p<ISidebarItem>`
  ${({ theme, isActive }) => css`
    padding: 15px;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #bbb;
    background-color: ${isActive ? theme.grey.grey30 : 'transparent'};
    &:hover {
      background-color: ${theme.grey.grey50};
      transition: 0.2s;
    }
    span {
      font-size: 16px;
      /* font-weight: 300; */
    }

    svg {
      margin: 0 12px 0 0;
      width: 18px;
      height: 18px;
    }
  `}
`;

const SidebarTitle = styled.h4`
  padding: 10px;
`;

export { SidebarContainer, SidebarItems, SidebarItem, SidebarTitle };
