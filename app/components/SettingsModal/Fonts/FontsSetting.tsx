import { useState } from 'react';
import {
  SettingBlock,
  SettingLabel,
  SettingDescription,
  SelectInput,
  NumberInput,
} from '../SettingsModalStyled';

const FontsSetting = () => {
  const [fontSize, setFontSize] = useState(13);
  const [fontFamily, setFontFamily] = useState('system');

  return (
    <>
      <SettingBlock>
        <SettingLabel>Font Size</SettingLabel>
        <SettingDescription>Controls the font size used in file listings.</SettingDescription>
        <NumberInput
          type='number'
          value={fontSize}
          onChange={(event) => setFontSize(Number(event.target.value))}
        />
      </SettingBlock>
      <SettingBlock>
        <SettingLabel>Font Family</SettingLabel>
        <SettingDescription>Controls the font used throughout the app.</SettingDescription>
        <SelectInput value={fontFamily} onChange={(event) => setFontFamily(event.target.value)}>
          <option value='system'>System Default</option>
          <option value='mono'>Monospace</option>
          <option value='rounded'>Rounded</option>
        </SelectInput>
      </SettingBlock>
    </>
  );
};

export { FontsSetting };
