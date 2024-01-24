import { useContext } from 'react'
import { NavigationContext } from '@/app/context/NavigationContext'
import DirContext from '@/app/context/DirectoryContext'
import ModalContext from '@/app/context/ModalContext'
import ContextMenu from '../../context/ContextMenu'
import { DisplayEnum } from '../../components/ContextMenuModal/contextmenuModalType'
import { getFileNameFromPath, truncateMiddle } from '../../utils'
import {
  Mark,
  ModalBodyMessage,
  ModalFooterButtonContainer,
} from '../../components/Modal/ModalStyled'
import Button from '../../components/Button'
import { invoke } from '@tauri-apps/api/tauri'
import { UseContextMenuType } from './useContextMenuType'
import { openFileErrorModalMessage } from './useContextMenuUtils'
import { PropertiesModal } from '@/app/components/PropertiesModal'

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

  const openFile = async (path: string) => {
    if (path) {
      await invoke('open_file', {
        path,
      })
        .then((response: keyof typeof UseContextMenuType.OpenFileResponseTypeEnum | unknown) => {
          if (
            typeof response === 'string' &&
            Object.keys(openFileErrorModalMessage).includes(response)
          ) {
            show({
              open: true,
              modalHeight: '220px',
              modalHeader: (
                <h4>
                  Can&apos;t open &quot;<Mark>{getFileNameFromPath(path)}</Mark>&quot;
                </h4>
              ),
              modalBody: (
                <ModalBodyMessage>
                  {openFileErrorModalMessage?.[response as string](
                    getFileNameFromPath(path) as string,
                  )}
                </ModalBodyMessage>
              ),
              modalFooter: (
                <ModalFooterButtonContainer>
                  <Button onClick={() => show({ open: false })}>Cancel</Button>
                </ModalFooterButtonContainer>
              ),
            })
          }
        })
        .catch(console.error)
    }
  }

  const showFileProperties = async (path: string) => {
    show({
      open: true,
      modalHeight: '350px',
      modalWidth: '600px',
      modalHeader: <h4>{truncateMiddle(getFileNameFromPath(path) as string, 40)} Properties</h4>,
      modalBody: <PropertiesModal path={path} />,
      modalFooter: (
        <ModalFooterButtonContainer>
          <Button onClick={() => show({ open: false })}>Close</Button>
        </ModalFooterButtonContainer>
      ),
    })
  }
  return { deleteFile, openFile, showFileProperties }
}

export { useContextMenu }
