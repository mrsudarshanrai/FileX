import { convertBytes } from '@/app/utils';

const getFileSize = (isFile: boolean, directorySize: number, fileSize: number) => {
  if (isFile) {
    return `${convertBytes(fileSize)} (${fileSize.toLocaleString()}) bytes`;
  }
  return `${convertBytes(directorySize)} (${directorySize.toLocaleString()}) bytes`;
};

export { getFileSize };
