import styled from 'styled-components';
import { MouseEvent, useEffect } from 'react';
import ModalContext from '@/app/context/ModalContext';
import { useContext } from 'react';
import Modal from '@/app/components/Modal/Modal';
import { listen } from '@tauri-apps/api/event';
import DirectorySizeContext from '@/app/context/DirectorySizeContext/DirectorySizeContext';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const { open } = useContext(ModalContext);
  const { setDirectorySizeFunc, setIsFetchingFunc } = useContext(DirectorySizeContext);

  const onMousedown = (event: MouseEvent<HTMLDivElement>) => {
    // event.preventDefault();
  };

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
  return (
    <AppWrapper onClick={onMousedown}>
      {open && <Modal />}
      {children}
    </AppWrapper>
  );
};

export default AppContainer;

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
`;
