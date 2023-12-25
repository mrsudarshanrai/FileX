import { invoke } from '@tauri-apps/api/tauri'
import { Dispatch, SetStateAction } from 'react'
import { Display, DisplayEnum } from './contextmenu.type'
import { ModalOptions } from '@/app/context/ModalContext/ModalContextType'
import { Mark, ModalBodyMessage, ModalFooterButtonContainer } from '../Modal/ModalStyled'
import { getFileNameFromPath } from '@/app/utils'
import Button from '../Button'

const deleteFile = async (
  setShow: Dispatch<SetStateAction<Display>>,
  show: (options: ModalOptions) => void,
  currentPath: string,
  fetch: (path: string, funcName: string) => Promise<unknown>,
  targetPath?: string,
) => {
  if (targetPath) {
    setShow(DisplayEnum.none)
    show({
      open: true,
      modalHeader: (
        <h4>
          Delete &quot;<Mark>{getFileNameFromPath(targetPath)}</Mark>&quot;
        </h4>
      ),
      modalBody: (
        <ModalBodyMessage>
          Are you sure you want to prmanentely delete &quot;
          <Mark>{getFileNameFromPath(targetPath)}</Mark>
          &quot;?
        </ModalBodyMessage>
      ),
      modalFooter: (
        <ModalFooterButtonContainer>
          <Button onClick={() => show({ open: false })}>Cancel</Button>
          <Button
            onClick={async () => {
              await invoke('delete_path', {
                path: targetPath,
              })
                .then(() => {
                  fetch(currentPath, 'get_files_in_path')
                  show({ open: false })
                })
                .catch(console.error)
            }}
            theme='error'
          >
            Delete
          </Button>
        </ModalFooterButtonContainer>
      ),
    })
  }
}

export { deleteFile }
