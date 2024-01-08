import { useContext } from 'react'
import { NavigationContext } from '@/app/context/NavigationContext'
import DirContext from '@/app/context/DirectoryContext'
import ModalContext from '@/app/context/ModalContext'
import ContextMenu from '../context/ContextMenu'
import { DisplayEnum } from '../components/ContextMenuModal/contextmenuModalType'
import { getFileNameFromPath } from '../utils'
import { Mark, ModalBodyMessage, ModalFooterButtonContainer } from '../components/Modal/ModalStyled'
import Button from '../components/Button'
import { invoke } from '@tauri-apps/api/tauri'

const useContextMenu = () => {
  const { currentPath } = useContext(NavigationContext)
  const { fetch } = useContext(DirContext)
  const { show } = useContext(ModalContext)
  const { setShow: setContextMenuShow, targetPath } = useContext(ContextMenu)

  const deleteFile = () => {
    if (targetPath) {
      setContextMenuShow(DisplayEnum.none)
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
  return { deleteFile }
}

export { useContextMenu }
