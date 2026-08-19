import { BreadcrumbBar, PathContainer, Paths } from './PathStyled';
import { NavigationPathType } from './NavigationPathType';
import { splitPathOnSlash } from '@/app/utils';
import { Icon } from '../Icon/Icon';
import { useMemo } from 'react';

const NavigationPath = (props: NavigationPathType.Props) => {
  const { path, onClick } = props;

  const paths = useMemo(() => {
    const pathArr = splitPathOnSlash(path);
    if (pathArr.length > 10) return pathArr.slice(pathArr.length - 6);
    return pathArr;
  }, [path]);

  return (
    <BreadcrumbBar>
      <PathContainer>
        {paths
          .filter((item) => item.length)
          .map((dir, index) => {
            return (
              <Paths key={index} onClick={() => onClick(path, dir)}>
                <Icon name='chevron-right' width='13px' height='13px' />
                <span>{dir}</span>
              </Paths>
            );
          })}
      </PathContainer>
    </BreadcrumbBar>
  );
};

export default NavigationPath;
