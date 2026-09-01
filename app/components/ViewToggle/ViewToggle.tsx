import { useState } from 'react';
import { useTheme } from 'styled-components';
import { Icon } from '@/app/components/Icon/Icon';
import { IconType } from '@/app/components/Icon/IconType';
import { Color } from '@/app/theme/colorsType';
import { ViewToggleGroup, ViewToggleHighlight, ViewToggleButton } from './ViewToggleStyled';
import { useAppTheme } from '@/app/context/ThemeContext';

const VIEW_MODES: { mode: string; icon: IconType.IconName; title: string }[] = [
  { mode: 'icon', icon: 'grid', title: 'Icon view' },
  { mode: 'list', icon: 'list', title: 'List view' },
];

const ViewToggle = () => {
  const [activeMode, setActiveMode] = useState('icon');
  const theme = useTheme() as Color;
  const { mode: themeMode } = useAppTheme();
  const activeIndex = VIEW_MODES.findIndex((item) => item.mode === activeMode);

  return (
    <ViewToggleGroup>
      <ViewToggleHighlight index={activeIndex} />
      {VIEW_MODES.map(({ mode, icon, title }) => {
        const isActive = mode === activeMode;
        const iconFill =
          isActive || themeMode !== 'light' ? theme.text.onAccent : theme.text.secondary;

        return (
          <ViewToggleButton
            key={mode}
            iconFill={iconFill}
            onClick={() => setActiveMode(mode)}
            title={title}
          >
            <Icon name={icon} width='18px' height='18px' fill={iconFill} />
          </ViewToggleButton>
        );
      })}
    </ViewToggleGroup>
  );
};

export { ViewToggle };
