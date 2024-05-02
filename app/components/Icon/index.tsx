import React from 'react';
import { IconType } from './IconType';
import dynamic from 'next/dynamic';
import { IconContainer } from './IconStyled';

const Icon = (props: IconType.Props) => {
  const { name, width, height, fill } = props;
  const DynamicSvg = dynamic(() => import(`../../../public/assets/icons/${name}.svg`));
  return (
    <IconContainer width={width} height={height} fill={fill}>
      <DynamicSvg />
    </IconContainer>
  );
};

export { Icon };
