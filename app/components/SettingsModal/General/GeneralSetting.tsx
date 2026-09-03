import { useState } from 'react';
import { Toggle } from '../Toggle';
import { SettingBlock, SettingLabel, SettingDescription, ToggleRow } from '../SettingsModalStyled';

const GeneralSetting = () => {
  const [confirmBeforeDelete, setConfirmBeforeDelete] = useState(true);
  const [doubleClickToOpen, setDoubleClickToOpen] = useState(true);

  return (
    <>
      <SettingBlock>
        <SettingLabel>Confirm Before Delete</SettingLabel>
        <SettingDescription>Ask for confirmation before moving items to Trash.</SettingDescription>
        <ToggleRow>
          <Toggle
            checked={confirmBeforeDelete}
            onChange={() => setConfirmBeforeDelete((prev) => !prev)}
          />
        </ToggleRow>
      </SettingBlock>
      <SettingBlock>
        <SettingLabel>Double-click to Open</SettingLabel>
        <SettingDescription>
          Use double-click instead of single-click to open items.
        </SettingDescription>
        <ToggleRow>
          <Toggle
            checked={doubleClickToOpen}
            onChange={() => setDoubleClickToOpen((prev) => !prev)}
          />
        </ToggleRow>
      </SettingBlock>
    </>
  );
};

export { GeneralSetting };
