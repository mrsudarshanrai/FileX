import {
  SidebarContainer,
  SidebarHeader,
  SidebarItem,
  SidebarItems,
  IconChip,
  SidebarTitle,
} from './SidebarStyled';
import { useContext, useMemo } from 'react';
import { useTheme } from 'styled-components';
import DirContext from '@/app/context/DirectoryContext';
import { getSidebarDirs } from './helper';
import { IDir } from '@/app/lib/types/dir';
import { NavigationContext } from '@/app/context/NavigationContext';
import { Icon } from '@/app/components/Icon/Icon';
import { IconType } from '@/app/components/Icon/IconType';
import { Color } from '@/app/theme/colorsType';
import Image from 'next/image';

const Sidebar = () => {
  const { placesDirs, homePath } = useContext(DirContext);
  const { navigate, currentPath } = useContext(NavigationContext);
  const sideBarDirs = useMemo(() => getSidebarDirs(placesDirs), [placesDirs]);
  const theme = useTheme() as Color;

  const onDirClick = (path: string) => {
    navigate(path);
  };

  const iconFill = (isActive: boolean) => (isActive ? theme.text.onAccent : theme.text.secondary);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Image src={'fileX-icon.svg'} alt='icon' width={35} height={35} />
        <p>FileX</p>
      </SidebarHeader>
      <SidebarItems>
        <SidebarTitle>This PC</SidebarTitle>
        <SidebarItem onClick={() => onDirClick(homePath)} isActive={homePath === currentPath}>
          <IconChip isActive={homePath === currentPath}>
            <Icon name='home' fill={iconFill(homePath === currentPath)} />
          </IconChip>
          <p>Home</p>
        </SidebarItem>
        {sideBarDirs.map(({ folder_name, path }: IDir.IDir) => {
          const isActive = path === currentPath;
          return (
            <SidebarItem key={path} onClick={() => onDirClick(path)} isActive={isActive}>
              <IconChip isActive={isActive}>
                <Icon
                  name={folder_name.toLowerCase() as IconType.IconName}
                  fill={iconFill(isActive)}
                />
              </IconChip>
              <p>{folder_name}</p>
            </SidebarItem>
          );
        })}
      </SidebarItems>
    </SidebarContainer>
  );
};

export default Sidebar;
