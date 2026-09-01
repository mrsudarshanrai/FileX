import { useContext } from 'react';
import { useTheme } from 'styled-components';
import { Icon } from '@/app/components/Icon/Icon';
import { IconType } from '@/app/components/Icon/IconType';
import { Color } from '@/app/theme/colorsType';
import { ViewToggleGroup, ViewToggleHighlight, ViewToggleButton } from './ViewToggleStyled';
import { useAppTheme } from '@/app/context/ThemeContext';
import DirContext from '@/app/context/DirectoryContext';
import { IDir } from '@/app/lib/types/dir';

const VIEW_MODES: { mode: IDir.ViewMode; icon: IconType.IconName; title: string }[] = [
  { mode: 'icon', icon: 'grid', title: 'Icon view' },
  { mode: 'list', icon: 'list', title: 'List view' },
];

const ViewToggle = () => {
  const { viewMode, setViewMode } = useContext(DirContext);
  const theme = useTheme() as Color;
  const { mode: themeMode } = useAppTheme();
  const activeIndex = VIEW_MODES.findIndex((item) => item.mode === viewMode);

  return (
    <ViewToggleGroup>
      <ViewToggleHighlight index={activeIndex} />
      {VIEW_MODES.map(({ mode, icon, title }) => {
        const isActive = mode === viewMode;
        const iconFill =
          isActive || themeMode !== 'light' ? theme.text.onAccent : theme.text.secondary;

        return (
          <ViewToggleButton
            key={mode}
            iconFill={iconFill}
            onClick={() => setViewMode(mode)}
            title={title}
          >
            <Icon name={icon} width='20px' height='20px' fill={iconFill} />
          </ViewToggleButton>
        );
      })}
    </ViewToggleGroup>
  );
};

export { ViewToggle };
