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
  const [sorucePathToCopy, setSorucePathToCopy] = useState<undefined | string>(undefined);

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
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
    sorucePathToCopy,
    setSorucePathToCopy,
    isTargetPathFile,
    setIsTargetPathFile,
    fileRenamePath,
    setFileRenamePath,
  };

  return (
    <ContextMenu.Provider value={contextValue}>
      <ContextMenuModal
        targetPath={targetPath}
        setShow={setShow}
        top={top}
        left={left}
        display={show}
        setSorucePathToCopy={setSorucePathToCopy}
        sorucePathToCopy={sorucePathToCopy}
        isTargetPathFile={isTargetPathFile}
        setFileRenamePath={setFileRenamePath}
      />
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
