import { IDir } from '../lib/types/dir';

const getLastItemFromArray = <T>(array: Array<T>) => array[array.length - 1];

// true...false
const sortArrayByBoolean = (x: IDir.IDir, y: IDir.IDir) => +y.is_dir - +x.is_dir;

const splitPathOnSlash = (path: string) => {
  if (typeof path === 'string') return path.split('/');
  else throw `Invalid path provided splitPath(path:string), found ${typeof path}`;
};

const isString = (value: unknown) => typeof value === 'string';

const getFileNameFromPath = (path: string) => {
  if (path && path.split('/').length > 0) {
    return getLastItemFromArray<string>(path.split('/'));
  }
};

const convertBytes = (byteSize: number) => {
  if (byteSize < 1024) {
    return `${byteSize} bytes`;
  } else if (byteSize < Math.pow(1024, 2)) {
    return `${(byteSize / 1024).toFixed(2)} KB`;
  } else if (byteSize < Math.pow(1024, 3)) {
    return `${(byteSize / Math.pow(1024, 2)).toFixed(2)} MB`;
  } else {
    return `${(byteSize / Math.pow(1024, 3)).toFixed(2)} GB`;
  }
};

function truncateMiddle(inputString: string, maxLength: number): string {
  if (inputString.length <= maxLength) {
    return inputString;
  }

  const ellipsis = '...';
  const halfMaxLength = Math.floor((maxLength - ellipsis.length) / 2);

  const truncatedString =
    inputString.substring(0, halfMaxLength) +
    ellipsis +
    inputString.substring(inputString.length - halfMaxLength);

  return truncatedString;
}

export {
  getLastItemFromArray,
  sortArrayByBoolean,
  splitPathOnSlash,
  isString,
  getFileNameFromPath,
  convertBytes,
  truncateMiddle,
};
