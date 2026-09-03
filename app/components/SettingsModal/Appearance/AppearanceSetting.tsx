import { useAppTheme } from '@/app/context/ThemeContext';
import {
  SettingBlock,
  SettingLabel,
  SettingDescription,
  PillGroup,
  PillButton,
} from '../SettingsModalStyled';

const THEME_LABELS: Record<string, string> = {
  dark: 'Dark',
  light: 'Light',
};

const AppearanceSetting = () => {
  const { mode, setTheme, availableThemes } = useAppTheme();

  return (
    <SettingBlock>
      <SettingLabel>Theme</SettingLabel>
      <SettingDescription>Choose how FileX looks.</SettingDescription>
      <PillGroup>
        {availableThemes.map((themeMode) => (
          <PillButton
            key={themeMode}
            isActive={themeMode === mode}
            onClick={() => setTheme(themeMode)}
          >
            {THEME_LABELS[themeMode] ?? themeMode}
          </PillButton>
        ))}
      </PillGroup>
    </SettingBlock>
  );
};

export { AppearanceSetting };
