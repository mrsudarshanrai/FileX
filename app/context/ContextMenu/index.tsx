import { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ContextMenuModal from '@/app/components/ContextMenuModal';
import { Display, DisplayEnum } from '@/app/components/ContextMenuModal/contextmenuModalType';
import { ContextMenuType } from './ContextMenuType';

const ContextMenu = createContext<ContextMenuType>({
  onContextMenu() {},
  show: DisplayEnum.none,
  setShow() {},
  targetPath: undefined,
  setTargetPath() {},
  setIsTargetPathFile() {},
  isTargetPathFile: false,
  fileRenamePath: null,
  setFileRenamePath() {},
});

const ContextMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [show, setShow] = useState<Display>(DisplayEnum.none);
  const [targetPath, setTargetPath] = useState<undefined | string>(undefined);
  const [isTargetPathFile, setIsTargetPathFile] = useState(false);
  const [fileRenamePath, setFileRenamePath] = useState<string | null>(null);
  const [sourcePathsToCopy, setSourcePathsToCopy] = useState<string[]>([]);
  const [isCut, setIsCut] = useState(false);

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    if (!(event.target as HTMLElement).closest('[data-path]')) {
      setTargetPath(undefined);
      setIsTargetPathFile(false);
    }

    setShow(DisplayEnum.block);
    const { clientX, clientY } = event;
    setTop(clientY);
    setLeft(clientX);
  };

  useEffect(() => {
    if (show === DisplayEnum.none) {
      setTargetPath(undefined);
    }
  }, [show]);

  const contextValue = {
    onContextMenu,
    show,
    setShow,
    targetPath,
    setTargetPath,
    sourcePathsToCopy,
    setSourcePathsToCopy,
    isCut,
    setIsCut,
    isTargetPathFile,
    setIsTargetPathFile,
    fileRenamePath,
    setFileRenamePath,
  };

  return (
    <ContextMenu.Provider value={contextValue}>
      {show === DisplayEnum.block && (
        <ContextMenuModal
          targetPath={targetPath}
          setShow={setShow}
          top={top}
          left={left}
          setSourcePathsToCopy={setSourcePathsToCopy}
          sourcePathsToCopy={sourcePathsToCopy}
          setIsCut={setIsCut}
          isCut={isCut}
          isTargetPathFile={isTargetPathFile}
          setFileRenamePath={setFileRenamePath}
        />
      )}
      <ContextMenuRoot onContextMenu={(event) => onContextMenu(event)}>{children}</ContextMenuRoot>
    </ContextMenu.Provider>
  );
};

export { ContextMenuProvider };
export default ContextMenu;

const ContextMenuRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;
