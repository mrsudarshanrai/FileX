import React from 'react';
import { IconType } from './IconType';
import dynamic from 'next/dynamic';
import { IconContainer } from './IconStyled';

const dynamicIconCache = new Map<IconType.IconName, ReturnType<typeof dynamic>>();

const getDynamicIcon = (name: IconType.IconName) => {
  let DynamicSvg = dynamicIconCache.get(name);
  if (!DynamicSvg) {
    DynamicSvg = dynamic(() => import(`../../../public/assets/icons/${name}.svg`));
    dynamicIconCache.set(name, DynamicSvg);
  }
  return DynamicSvg;
};

const Icon = (props: IconType.Props) => {
  const { name, width, height, fill } = props;
  const DynamicSvg = getDynamicIcon(name);
  return (
    <IconContainer width={width} height={height} fill={fill}>
      <DynamicSvg />
    </IconContainer>
  );
};

export { Icon };
