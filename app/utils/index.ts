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

const getLastItemFromArray = (array: any[]) => array[array.length - 1]

// true...false
const sortArrayByBoolean = (x: IDir.IDirs, y: IDir.IDirs) => +y.is_dir - +x.is_dir

export { getFileIcon, getLastItemFromArray, sortArrayByBoolean }
