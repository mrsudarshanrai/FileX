import files from '@/app/lib/files.json'

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

export { getFileIcon }
