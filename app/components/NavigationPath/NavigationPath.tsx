import { BreadcrumbBar, PathContainer, Paths } from './PathStyled';
import { NavigationPathType } from './NavigationPathType';
import { splitPathOnSlash } from '@/app/utils';
import { Icon } from '../Icon/Icon';
import { useMemo } from 'react';

const NavigationPath = (props: NavigationPathType.Props) => {
  const { path, onClick } = props;

  const segments = useMemo(() => splitPathOnSlash(path).filter((item) => item.length), [path]);

  const visibleSegments = useMemo(() => {
    if (segments.length > 10) return segments.slice(segments.length - 6);
    return segments;
  }, [segments]);

  const startOffset = segments.length - visibleSegments.length;

  return (
    <BreadcrumbBar>
      <PathContainer>
        {visibleSegments.map((dir, localIndex) => {
          const absoluteIndex = startOffset + localIndex;
          const targetPath = '/' + segments.slice(0, absoluteIndex + 1).join('/');
          return (
            <Paths key={absoluteIndex} onClick={() => onClick(targetPath)}>
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
