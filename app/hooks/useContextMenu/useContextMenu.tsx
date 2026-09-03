import { useCallback, useContext } from 'react';
import { NavigationContext } from '@/app/context/NavigationContext';
import DirContext from '@/app/context/DirectoryContext';
import ModalContext from '@/app/context/ModalContext';
import ContextMenu from '../../context/ContextMenu';
import { DisplayEnum } from '../../components/ContextMenuModal/contextmenuModalType';
import { getFileNameFromPath, truncateMiddle } from '../../utils';
import {
  Mark,
  ModalBodyMessage,
  ModalFooterButtonContainer,
} from '../../components/Modal/ModalStyled';
import Button from '../../components/Button';
import { invoke } from '@tauri-apps/api/core';
import { UseContextMenuType } from './useContextMenuType';
import { openFileErrorModalMessage } from './useContextMenuUtils';
import { PropertiesModal } from '@/app/components/PropertiesModal';
import DirectorySizeContext from '@/app/context/DirectorySizeContext/DirectorySizeContext';
import { useOperations } from '@/app/context/OperationContext';

const useContextMenu = () => {
  const { currentPath } = useContext(NavigationContext);
  const { fetch, selectedPaths, setSelectedPaths } = useContext(DirContext);
  const { show } = useContext(ModalContext);
  const { setDirectorySizeFunc } = useContext(DirectorySizeContext);
  const { setShow: setContextMenuShow, targetPath } = useContext(ContextMenu);
  const { startOperation, finishOperation } = useOperations();

  const deleteFile = useCallback(() => {
    const pathsToDelete: string[] =
      selectedPaths.size > 0 ? Array.from(selectedPaths) : targetPath ? [targetPath] : [];
    if (pathsToDelete.length === 0) return;

    const deleteLabel =
      pathsToDelete.length > 1 ? (
        `${pathsToDelete.length} items`
      ) : (
        <Mark>{truncateMiddle(getFileNameFromPath(pathsToDelete[0]) as string, 30)}</Mark>
      );

    setContextMenuShow(DisplayEnum.none);
    show({
      open: true,
      modalHeader: <h4>Delete &quot;{deleteLabel}&quot;</h4>,
      modalBody: (
        <ModalBodyMessage>
          Are you sure you want to permanently delete &quot;{deleteLabel}&quot;?
        </ModalBodyMessage>
      ),
      modalFooter: (
        <ModalFooterButtonContainer>
          <Button onClick={() => show({ open: false })}>Cancel</Button>
          <Button
            onClick={async () => {
              const opId = startOperation({
                label:
                  pathsToDelete.length > 1
                    ? `Deleting ${pathsToDelete.length} items`
                    : `Deleting "${getFileNameFromPath(pathsToDelete[0]) ?? ''}"`,
              });
              try {
                await Promise.all(pathsToDelete.map((path) => invoke('delete_path', { path })));
                setSelectedPaths(new Set());
                fetch(currentPath, 'get_files_in_path');
                finishOperation(opId, 'completed');
              } catch (error: any) {
                // eslint-disable-next-line no-console
                console.error(error);
                finishOperation(opId, 'failed', String(error));
              } finally {
                show({ open: false });
              }
            }}
            theme='error'
          >
            Delete
          </Button>
        </ModalFooterButtonContainer>
      ),
    });
  }, [
    selectedPaths,
    targetPath,
    setContextMenuShow,
    show,
    startOperation,
    finishOperation,
    setSelectedPaths,
    fetch,
    currentPath,
  ]);

  const openFile = useCallback(
    async (path: string) => {
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
                modalHeader: (
                  <h4>
                    Can&apos;t open &quot;
                    <Mark>{truncateMiddle(getFileNameFromPath(path) as string, 30)}</Mark>
                    &quot;
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
              });
            }
          })
          .catch(console.error);
      }
    },
    [show],
  );

  const showFileProperties = useCallback(
    async (path: string) => {
      show({
        open: true,
        modalWidth: '600px',
        modalHeader: <h4>{truncateMiddle(getFileNameFromPath(path) as string, 40)} Properties</h4>,
        modalBody: <PropertiesModal path={path} />,
        modalFooter: (
          <ModalFooterButtonContainer>
            <Button
              onClick={() => {
                show({ open: false });
                setDirectorySizeFunc(0, 0);
              }}
            >
              Close
            </Button>
          </ModalFooterButtonContainer>
        ),
      });
    },
    [show, setDirectorySizeFunc],
  );

  return { deleteFile, openFile, showFileProperties };
};

export { useContextMenu };
