import styled from 'styled-components';
import { MouseEvent, useEffect, useRef } from 'react';
import ModalContext from '@/app/context/ModalContext';
import { useContext } from 'react';
import Modal from '@/app/components/Modal/Modal';
import { listen } from '@tauri-apps/api/event';
import DirectorySizeContext from '@/app/context/DirectorySizeContext/DirectorySizeContext';
import OperationPanel from '@/app/components/OperationPanel/OperationPanel';
import { useOperations } from '@/app/context/OperationContext';
import { NavigationContext } from '@/app/context/NavigationContext';
import DirContext from '@/app/context/DirectoryContext';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const { open } = useContext(ModalContext);
  const { setDirectorySizeFunc, setIsFetchingFunc } = useContext(DirectorySizeContext);
  const { finishOperation } = useOperations();
  const { currentPath } = useContext(NavigationContext);
  const { fetch, setActiveDir } = useContext(DirContext);

  const onMousedown = (event: MouseEvent<HTMLDivElement>) => {
    // event.preventDefault();
  };

  const latestRef = useRef({ currentPath, fetch, finishOperation, setActiveDir });
  useEffect(() => {
    latestRef.current = { currentPath, fetch, finishOperation, setActiveDir };
  }, [currentPath, fetch, finishOperation, setActiveDir]);

  useEffect(() => {
    let unListen: () => void;
    const initializeListener = async () => {
      unListen = await listen('calculate_directory_size', ({ payload }: any) => {
        const { size, file_count } = payload || {};
        setDirectorySizeFunc(size, file_count);
        setIsFetchingFunc(false);
      });
    };

    initializeListener();

    return () => {
      if (unListen) unListen();
    };
  }, []);

  useEffect(() => {
    let unListen: () => void;

    const initializeCopyListener = async () => {
      unListen = await listen('copy_done', ({ payload }: any) => {
        const { operation_id, success, to, destination_path } = payload || {};
        const { currentPath, fetch, finishOperation, setActiveDir } = latestRef.current;

        if (operation_id) {
          finishOperation(operation_id, success ? 'completed' : 'failed');
        }

        if (success && typeof to === 'string' && to === currentPath) {
          fetch(currentPath, 'get_files_in_path');
          if (typeof destination_path === 'string') {
            setActiveDir({ path: destination_path });
          }
        }
      });
    };

    initializeCopyListener();

    return () => {
      if (unListen) unListen();
    };
  }, []);
  return (
    <AppWrapper onClick={onMousedown}>
      {open && <Modal />}
      {children}
      <OperationPanel />
    </AppWrapper>
  );
};

export default AppContainer;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;
