import { ToggleTrack, ToggleThumb } from './SettingsModalStyled';

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

const Toggle = ({ checked, onChange }: ToggleProps) => (
  <ToggleTrack isActive={checked} onClick={onChange}>
    <ToggleThumb isActive={checked} />
  </ToggleTrack>
);

export { Toggle };
