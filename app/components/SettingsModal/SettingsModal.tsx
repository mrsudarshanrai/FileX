import { useState } from 'react';
import { AppearanceSetting } from './Appearance';

import {
  SettingsWrapper,
  SettingsBody,
  CategoryList,
  CategoryItem,
  SettingsContent,
  CategoryTitle,
} from './SettingsModalStyled';

const CATEGORIES = ['Appearance'] as const; // TODO: 'Fonts', 'Folders', 'General'
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COMPONENTS: Record<Category, () => JSX.Element> = {
  Appearance: AppearanceSetting,
  //TODO: Uncomment when the components are ready
  // Fonts: FontsSetting,
  // Folders: FoldersSetting,
  // General: GeneralSetting,
};

const SettingsModal = () => {
  const [category, setCategory] = useState<Category>('Appearance');
  const ActiveCategorySetting = CATEGORY_COMPONENTS[category];

  return (
    <SettingsWrapper>
      <SettingsBody>
        <CategoryList>
          {CATEGORIES.map((item) => (
            <CategoryItem key={item} isActive={category === item} onClick={() => setCategory(item)}>
              {item}
            </CategoryItem>
          ))}
        </CategoryList>

        <SettingsContent>
          <CategoryTitle>{category}</CategoryTitle>
          <ActiveCategorySetting />
        </SettingsContent>
      </SettingsBody>
    </SettingsWrapper>
  );
};

export { SettingsModal };
