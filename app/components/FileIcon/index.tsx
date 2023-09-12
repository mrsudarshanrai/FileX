import { getFileIcon } from '@/app/utils'
import Image from 'next/image'
import { FileIconType } from './fileIcon.type'
import { FileIconWrapper } from './fileIconStyled'

const FileIcon = (props: FileIconType.Props) => {
  const { isDir, extension, disableHover = false } = props
  return (
    <FileIconWrapper disableHover={disableHover}>
      {isDir ? (
        <Image alt='folder' src={'/assets/folder.svg'} width={80} height={80} />
      ) : (
        <Image alt='file' src={getFileIcon(extension)} width={80} height={80} />
      )}
    </FileIconWrapper>
  )
}

export default FileIcon
