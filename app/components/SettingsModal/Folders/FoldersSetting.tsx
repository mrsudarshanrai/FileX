import { useState } from 'react';
import { Toggle } from '../Toggle';
import {
  SettingBlock,
  SettingLabel,
  SettingDescription,
  PillGroup,
  PillButton,
  ToggleRow,
} from '../SettingsModalStyled';

const FoldersSetting = () => {
  const [defaultView, setDefaultView] = useState<'grid' | 'list'>('grid');
  const [showHiddenByDefault, setShowHiddenByDefault] = useState(false);

  return (
    <>
      <SettingBlock>
        <SettingLabel>Default View</SettingLabel>
        <SettingDescription>How folder contents are displayed by default.</SettingDescription>
        <PillGroup>
          <PillButton isActive={defaultView === 'grid'} onClick={() => setDefaultView('grid')}>
            Grid
          </PillButton>
          <PillButton isActive={defaultView === 'list'} onClick={() => setDefaultView('list')}>
            List
          </PillButton>
        </PillGroup>
      </SettingBlock>
      <SettingBlock>
        <SettingLabel>Show Hidden Files by Default</SettingLabel>
        <SettingDescription>Display dotfiles and hidden folders on open.</SettingDescription>
        <ToggleRow>
          <Toggle
            checked={showHiddenByDefault}
            onChange={() => setShowHiddenByDefault((prev) => !prev)}
          />
        </ToggleRow>
      </SettingBlock>
    </>
  );
};

export { FoldersSetting };
