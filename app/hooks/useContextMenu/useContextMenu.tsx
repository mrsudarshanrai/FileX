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

type ConfirmDialog = {
  title: React.ReactNode;
  message: React.ReactNode;
  confirmLabel: string;
  /** Owns closing the dialog, so it can leave a follow-up dialog open instead */
  onConfirm: () => void | Promise<void>;
};

type NotifyDialog = {
  title: React.ReactNode;
  message: React.ReactNode;
  closeLabel?: string;
};

const fileNameOf = (path: string) => getFileNameFromPath(path) as string;

/** "3 items", or the single file's name, for use inside dialog copy */
const describeTargets = (paths: string[]): React.ReactNode =>
  paths.length > 1 ? (
    `${paths.length} items`
  ) : (
    <Mark>{truncateMiddle(fileNameOf(paths[0]), 30)}</Mark>
  );

/** "Deleting 3 items" or 'Deleting "notes.txt"' */
const namedOperationLabel = (verb: string, paths: string[]) =>
  paths.length > 1
    ? `${verb} ${paths.length} items`
    : `${verb} "${getFileNameFromPath(paths[0]) ?? ''}"`;

/** "Deleting 3 items" or "Deleting item" */
const countedOperationLabel = (verb: string, paths: string[]) =>
  paths.length > 1 ? `${verb} ${paths.length} items` : `${verb} item`;

const useContextMenu = () => {
  const { currentPath } = useContext(NavigationContext);
  const { fetch, selectedPaths, setSelectedPaths } = useContext(DirContext);
  const { show } = useContext(ModalContext);
  const { setDirectorySizeFunc } = useContext(DirectorySizeContext);
  const { setShow: setContextMenuShow, targetPath } = useContext(ContextMenu);
  const { startOperation, finishOperation } = useOperations();

  const closeModal = useCallback(() => show({ open: false }), [show]);

  const confirmDialog = useCallback(
    ({ title, message, confirmLabel, onConfirm }: ConfirmDialog) => {
      show({
        open: true,
        modalHeader: <h4>{title}</h4>,
        modalBody: <ModalBodyMessage>{message}</ModalBodyMessage>,
        modalFooter: (
          <ModalFooterButtonContainer>
            <Button onClick={closeModal}>Cancel</Button>
            <Button onClick={() => onConfirm()} theme='error'>
              {confirmLabel}
            </Button>
          </ModalFooterButtonContainer>
        ),
      });
    },
    [show, closeModal],
  );

  const notifyDialog = useCallback(
    ({ title, message, closeLabel = 'Close' }: NotifyDialog) => {
      show({
        open: true,
        modalHeader: <h4>{title}</h4>,
        modalBody: <ModalBodyMessage>{message}</ModalBodyMessage>,
        modalFooter: (
          <ModalFooterButtonContainer>
            <Button onClick={closeModal}>{closeLabel}</Button>
          </ModalFooterButtonContainer>
        ),
      });
    },
    [show, closeModal],
  );

  /** The right-clicked item, or the whole selection when there is one */
  const targetsFor = useCallback(
    (explicit?: string[]): string[] => {
      if (explicit && explicit.length > 0) return explicit;
      if (selectedPaths.size > 0) return Array.from(selectedPaths);
      return targetPath ? [targetPath] : [];
    },
    [selectedPaths, targetPath],
  );

  /** Track the work in the operation panel, then clear the selection and refresh */
  const runOperation = useCallback(
    async <T,>(label: string, work: () => Promise<T>): Promise<T | undefined> => {
      const opId = startOperation({ label });
      try {
        const result = await work();
        setSelectedPaths(new Set());
        fetch(currentPath, 'get_files_in_path');
        finishOperation(opId, 'completed');
        return result;
      } catch (error) {
        console.error(error);
        finishOperation(opId, 'failed', String(error));
        return undefined;
      }
    },
    [startOperation, finishOperation, setSelectedPaths, fetch, currentPath],
  );

  const confirmPermanentDelete = useCallback(
    (paths: string[], reason?: React.ReactNode) => {
      if (paths.length === 0) return;
      const label = describeTargets(paths);

      confirmDialog({
        title: <>Delete &quot;{label}&quot; permanently</>,
        message: (
          <>
            {reason}
            Are you sure you want to permanently delete &quot;{label}&quot;? This cannot be undone.
          </>
        ),
        confirmLabel: 'Delete permanently',
        onConfirm: async () => {
          await runOperation(namedOperationLabel('Deleting', paths), () =>
            Promise.all(paths.map((path) => invoke('delete_path', { path }))),
          );
          closeModal();
        },
      });
    },
    [confirmDialog, runOperation, closeModal],
  );

  const deletePermanently = useCallback(
    (explicit?: string[]) => {
      const paths = targetsFor(explicit);
      if (paths.length === 0) return;
      setContextMenuShow(DisplayEnum.none);
      confirmPermanentDelete(paths);
    },
    [targetsFor, setContextMenuShow, confirmPermanentDelete],
  );

  const deleteFile = useCallback(() => {
    const paths = targetsFor();
    if (paths.length === 0) return;
    const label = describeTargets(paths);

    setContextMenuShow(DisplayEnum.none);
    confirmDialog({
      title: <>Move &quot;{label}&quot; to Trash</>,
      message: <>Are you sure you want to move &quot;{label}&quot; to the Trash?</>,
      confirmLabel: 'Move to Trash',
      onConfirm: async () => {
        const outcomes = await runOperation(
          `${namedOperationLabel('Moving', paths)} to Trash`,
          () => invoke<UseContextMenuType.TrashOutcome[]>('move_to_trash', { paths }),
        );

        /** Items on another filesystem cannot be trashed, so offer to delete them */
        const blocked = (outcomes ?? [])
          .filter((outcome) => !outcome.trashed && outcome.reason === 'cross_device')
          .map((outcome) => outcome.path);

        if (blocked.length > 0) {
          const many = blocked.length > 1;
          confirmPermanentDelete(
            blocked,
            <>
              {many ? `${blocked.length} items are` : 'This item is'} on another filesystem, so{' '}
              {many ? 'they' : 'it'} cannot be moved to the Trash.{' '}
            </>,
          );
          return;
        }

        closeModal();
      },
    });
  }, [
    targetsFor,
    setContextMenuShow,
    confirmDialog,
    runOperation,
    confirmPermanentDelete,
    closeModal,
  ]);

  const restoreFromTrash = useCallback(async () => {
    const paths = targetsFor();
    if (paths.length === 0) return;

    setContextMenuShow(DisplayEnum.none);
    const outcomes = await runOperation(countedOperationLabel('Restoring', paths), () =>
      invoke<UseContextMenuType.RestoreOutcome[]>('restore_from_trash', { paths }),
    );

    /** Something already took the original name back, so say so rather than clobbering it */
    const blocked = (outcomes ?? []).filter(
      (outcome) => !outcome.restored && outcome.reason === 'destination_exists',
    );

    if (blocked.length > 0) {
      notifyDialog({
        title: 'Could not restore everything',
        message: (
          <>
            {blocked.length > 1 ? `${blocked.length} items` : 'One item'} could not be restored
            because something already exists at the original location.
          </>
        ),
      });
    }
  }, [targetsFor, setContextMenuShow, runOperation, notifyDialog]);

  const deleteFromTrash = useCallback(() => {
    const paths = targetsFor();
    if (paths.length === 0) return;
    const label = describeTargets(paths);

    setContextMenuShow(DisplayEnum.none);
    confirmDialog({
      title: <>Delete &quot;{label}&quot; from Trash</>,
      message: (
        <>
          Are you sure you want to permanently delete &quot;{label}&quot;? This cannot be undone.
        </>
      ),
      confirmLabel: 'Delete permanently',
      onConfirm: async () => {
        await runOperation(countedOperationLabel('Deleting', paths), () =>
          invoke('purge_trash', { paths }),
        );
        closeModal();
      },
    });
  }, [targetsFor, setContextMenuShow, confirmDialog, runOperation, closeModal]);

  const emptyTrash = useCallback(() => {
    setContextMenuShow(DisplayEnum.none);
    confirmDialog({
      title: 'Empty Trash',
      message:
        'Are you sure you want to permanently delete everything in the Trash? This cannot be undone.',
      confirmLabel: 'Empty Trash',
      onConfirm: async () => {
        await runOperation('Emptying Trash', () => invoke('empty_trash'));
        closeModal();
      },
    });
  }, [setContextMenuShow, confirmDialog, runOperation, closeModal]);

  const openFile = useCallback(
    async (path: string) => {
      if (!path) return;

      try {
        const response = await invoke('open_file', { path });
        const isKnownError =
          typeof response === 'string' && Object.keys(openFileErrorModalMessage).includes(response);

        if (isKnownError) {
          notifyDialog({
            title: (
              <>
                Can&apos;t open &quot;
                <Mark>{truncateMiddle(fileNameOf(path), 30)}</Mark>
                &quot;
              </>
            ),
            message: openFileErrorModalMessage[response as string](fileNameOf(path)),
            closeLabel: 'Cancel',
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [notifyDialog],
  );

  const showFileProperties = useCallback(
    async (path: string) => {
      show({
        open: true,
        modalWidth: '600px',
        modalHeader: <h4>{truncateMiddle(fileNameOf(path), 40)} Properties</h4>,
        modalBody: <PropertiesModal path={path} />,
        modalFooter: (
          <ModalFooterButtonContainer>
            <Button
              onClick={() => {
                closeModal();
                setDirectorySizeFunc(0, 0);
              }}
            >
              Close
            </Button>
          </ModalFooterButtonContainer>
        ),
      });
    },
    [show, closeModal, setDirectorySizeFunc],
  );

  return {
    deleteFile,
    deletePermanently,
    restoreFromTrash,
    deleteFromTrash,
    emptyTrash,
    openFile,
    showFileProperties,
  };
};

export { useContextMenu };
