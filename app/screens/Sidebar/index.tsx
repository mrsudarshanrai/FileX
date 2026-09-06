import {
  SidebarContainer,
  SidebarHeader,
  SidebarItem,
  SidebarItemAction,
  SidebarItems,
  IconChip,
  SidebarTitle,
  SidebarFooter,
  StorageHeading,
  ProgressTrack,
  ProgressFill,
  StorageDetail,
} from './SidebarStyled';
import { useContext } from 'react';
import DirContext from '@/app/context/DirectoryContext';
import { IDir } from '@/app/lib/types/dir';
import { NavigationContext } from '@/app/context/NavigationContext';
import { Icon } from '@/app/components/Icon/Icon';
import { IconType } from '@/app/components/Icon/IconType';
import { Color } from '@/app/theme/colorsType';
import { convertBytes } from '@/app/utils';
import { useDiskUsage } from '@/app/hooks/useDiskUsage';
import Image from 'next/image';
import { useTheme } from 'styled-components';

const PLACEHOLDER_BOOKMARKS: IDir.Place[] = [
  { name: 'projects', path: '/home/fox/projects' },
  { name: 'Downloads', path: '/home/fox/Downloads' },
  { name: 'Documents', path: '/home/fox/Documents' },
];

const Sidebar = () => {
  const { places, homePath, trashPath } = useContext(DirContext);
  const { navigate, currentPath } = useContext(NavigationContext);
  const theme = useTheme() as Color;
  const diskUsage = useDiskUsage();

  const onDirClick = (path: string) => {
    navigate(path);
  };

  const iconFill = (isActive: boolean) => (isActive ? theme.text.onAccent : theme.text.secondary);
  const totalStoragePercent = diskUsage && Math.round((diskUsage.used / diskUsage.total) * 100);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Image src={'fileX-icon.svg'} alt='icon' width={28} height={28} />
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
        {places.map(({ name, path }: IDir.Place) => {
          const isActive = path === currentPath;
          return (
            <SidebarItem key={path} onClick={() => onDirClick(path)} isActive={isActive}>
              <IconChip isActive={isActive}>
                <Icon name={name.toLowerCase() as IconType.IconName} fill={iconFill(isActive)} />
              </IconChip>
              <p>{name}</p>
            </SidebarItem>
          );
        })}
        {trashPath && (
          <SidebarItem onClick={() => onDirClick(trashPath)} isActive={trashPath === currentPath}>
            <IconChip isActive={trashPath === currentPath}>
              <Icon name='trash' fill={iconFill(trashPath === currentPath)} />
            </IconChip>
            <p>Trash</p>
          </SidebarItem>
        )}
        {PLACEHOLDER_BOOKMARKS.length > 0 && (
          <>
            <SidebarTitle>Bookmarks</SidebarTitle>
            {PLACEHOLDER_BOOKMARKS.map(({ name, path }: IDir.Place) => {
              const isActive = path === currentPath;
              return (
                <SidebarItem key={path} onClick={() => onDirClick(path)} isActive={isActive}>
                  <IconChip isActive={isActive}>
                    <Icon name='bookmark' fill={iconFill(isActive)} />
                  </IconChip>
                  <p title={path}>{name}</p>
                  <SidebarItemAction
                    title='Remove bookmark'
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Icon name='close' fill={theme.text.muted} width='10px' height='10px' />
                  </SidebarItemAction>
                </SidebarItem>
              );
            })}
          </>
        )}
      </SidebarItems>
      {diskUsage && (
        <SidebarFooter>
          <StorageHeading>
            <span>
              <Icon name='storage' fill={theme.text.muted} />
              Storage
            </span>
            <span>{totalStoragePercent}%</span>
          </StorageHeading>
          <ProgressTrack>
            <ProgressFill percent={(diskUsage.used / diskUsage.total) * 100} />
          </ProgressTrack>
          <StorageDetail>
            {convertBytes(diskUsage.available)} free of {convertBytes(diskUsage.total)}
          </StorageDetail>
        </SidebarFooter>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
