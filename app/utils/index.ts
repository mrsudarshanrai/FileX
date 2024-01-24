import files from '@/app/lib/files.json'
import { IDir } from '../lib/types/dir'

const searchExtension = (extension: string) => {
  const fileInfo = files.filter((x) => {
    return x.extensions?.some((y) => y === extension)
  })
  if (fileInfo[0] && 'thumbnail' in fileInfo[0]) {
    return fileInfo[0].thumbnail
  } else return '/assets/file.svg'
}

const getFileIcon = (extension: string) => {
  if (extension.length) {
    return searchExtension(extension)
  } else return '/assets/file.svg'
}

const getLastItemFromArray = <T>(array: Array<T>) => array[array.length - 1]

// true...false
const sortArrayByBoolean = (x: IDir.IDirs, y: IDir.IDirs) => +y.is_dir - +x.is_dir

const splitByslash = (path: string) => {
  if (typeof path === 'string') return path.split('/')
  else throw `Invalid path provided splitPath(path:string), found ${typeof path}`
}

const isString = (value: unknown) => typeof value === 'string'

const getFileNameFromPath = (path: string) => {
  if (path && path.split('/').length > 0) {
    return getLastItemFromArray<string>(path.split('/'))
  }
}

const convertBytes = (byteSize: number) => {
  if (byteSize < 1024) {
    return `${byteSize} bytes`
  } else if (byteSize < Math.pow(1024, 2)) {
    return `${(byteSize / 1024).toFixed(2)} KB`
  } else if (byteSize < Math.pow(1024, 3)) {
    return `${(byteSize / Math.pow(1024, 2)).toFixed(2)} MB`
  } else {
    return `${(byteSize / Math.pow(1024, 3)).toFixed(2)} GB`
  }
}

function truncateMiddle(inputString: string, maxLength: number): string {
  if (inputString.length <= maxLength) {
    return inputString
  }

  const ellipsis = '...'
  const halfMaxLength = Math.floor((maxLength - ellipsis.length) / 2)

  const truncatedString =
    inputString.substring(0, halfMaxLength) +
    ellipsis +
    inputString.substring(inputString.length - halfMaxLength)

  return truncatedString
}

export {
  getFileIcon,
  getLastItemFromArray,
  sortArrayByBoolean,
  splitByslash,
  isString,
  getFileNameFromPath,
  convertBytes,
  truncateMiddle,
}
