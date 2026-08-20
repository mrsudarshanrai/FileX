import Image from 'next/image';
import { FileIconType } from './fileIconType';
import { FileIconWrapper } from './fileIconStyled';

const FileIcon = (props: FileIconType.Props) => {
  const { thumbnail, disableHover = false } = props;
  return (
    <FileIconWrapper disableHover={disableHover}>
      <Image alt='file icon' src={thumbnail} width={80} height={80} />
    </FileIconWrapper>
  );
};

export default FileIcon;
