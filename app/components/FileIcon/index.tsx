import { getFileIcon } from '@/app/utils'
import Image from 'next/image'
import styled, { css } from 'styled-components'

type FileIconWrapper = {
  disableHover?: boolean
}
interface Props extends FileIconWrapper {
  isDir: boolean
  extension: string
}

const FileIcon = (props: Props) => {
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

const FileIconWrapper = styled.div<FileIconWrapper>`
  filter: brightness(100%);

  ${(props) =>
    props &&
    !props.disableHover &&
    css`
      &:hover {
        filter: brightness(90%);
      }
    `}
`

export default FileIcon
