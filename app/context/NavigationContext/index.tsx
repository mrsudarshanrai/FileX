import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getLastItemFromArray } from '@/app/utils';
import DirContext from '../DirectoryContext';
import { emit, listen } from '@tauri-apps/api/event';

type Props = {
  children: React.ReactNode;
};

type NavigationContextType = {
  navigate: (path: number | string) => void;
  currentPath: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  isForwardDisabled: boolean;
  isBackDisabled: boolean;
};

type NavigationActionPayload =
  | { type: 'back' }
  | { type: 'forward' }
  | { type: 'goto'; path: string };

type NavigationStatePayload = {
  currentPath: string;
  isForwardDisabled: boolean;
  isBackDisabled: boolean;
};

const NavigationContext = React.createContext<NavigationContextType>({
  navigate: () => {},
  currentPath: '/',
  setCurrentPath: () => {},
  isForwardDisabled: false,
  isBackDisabled: false,
});

const NavigationContextProvider = (props: Props) => {
  const { children } = props;
  const { fetch, homePath } = useContext(DirContext);

  const [currentPath, setCurrentPath] = useState(homePath);
  /** all forward and backward paths */
  const [forwardStack, setForwardStack] = useState<string[]>([]);
  const [backwardStack, setBackwardStack] = useState<string[]>([]);

  const pushToBackwardStack = (path: string) => setBackwardStack((stack) => [...stack, path]);
  const pushToForwardStack = (path: string) => setForwardStack((stack) => [...stack, path]);

  const [navigationBtnStatus, setNavigationBtnStatus] = useState({
    isForwardDisabled: false,
    isBackDisabled: false,
  });

  const navigate = useCallback(
    (path: number | string) => {
      switch (path) {
        // backward navigation
        case -1: {
          if (backwardStack.length === 0 || currentPath === getLastItemFromArray(backwardStack)) {
            return;
          }
          const backwardStackCopy = [...backwardStack];
          const poppedItem = backwardStackCopy.pop();
          setBackwardStack(backwardStackCopy);
          if (poppedItem) {
            pushToForwardStack(currentPath);
            setCurrentPath(poppedItem);
            fetch(poppedItem, 'get_files_in_path');
          }
          break;
        }
        // forward navigation
        case 1: {
          if (forwardStack.length === 0 || currentPath === getLastItemFromArray(forwardStack)) {
            return;
          }
          const forwardStackCopy = [...forwardStack];
          const poppedItem = forwardStackCopy.pop();
          setForwardStack(forwardStackCopy);
          if (poppedItem) {
            pushToBackwardStack(currentPath);
            setCurrentPath(poppedItem);
            fetch(poppedItem, 'get_files_in_path');
          }
          break;
        }
        // default navigates to provided path string
        default:
          if (typeof path === 'string') {
            pushToBackwardStack(currentPath);
            setCurrentPath(path);
            fetch(path, 'get_files_in_path');
          }
          break;
      }
    },
    [backwardStack, currentPath, fetch, forwardStack, pushToBackwardStack, pushToForwardStack],
  );

  useEffect(() => {
    setNavigationBtnStatus({
      isForwardDisabled: forwardStack.length === 0,
      isBackDisabled: backwardStack.length === 0,
    });
  }, [forwardStack.length, backwardStack.length]);

  useEffect(() => {
    const payload: NavigationStatePayload = {
      currentPath,
      isForwardDisabled: navigationBtnStatus.isForwardDisabled,
      isBackDisabled: navigationBtnStatus.isBackDisabled,
    };

    emit('navigation_state', payload);
  }, [currentPath, navigationBtnStatus.isBackDisabled, navigationBtnStatus.isForwardDisabled]);

  useEffect(() => {
    let unlisten: (() => void) | undefined;

    const setupListener = async () => {
      unlisten = await listen<NavigationActionPayload>('navigation_action', (event) => {
        const action = event.payload;

        if (!action) return;

        switch (action.type) {
          case 'back':
            navigate(-1);
            break;
          case 'forward':
            navigate(1);
            break;
          case 'goto':
            if (action.path) {
              navigate(action.path);
            }
            break;
          default:
            break;
        }
      });
    };

    setupListener();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, [navigate]);

  useEffect(() => {
    setCurrentPath(homePath);
  }, [homePath]);

  const contextValue = {
    navigate,
    currentPath,
    setCurrentPath,
    isForwardDisabled: navigationBtnStatus.isForwardDisabled,
    isBackDisabled: navigationBtnStatus.isBackDisabled,
  };

  return <NavigationContext.Provider value={contextValue}>{children}</NavigationContext.Provider>;
};

export default NavigationContextProvider;
export { NavigationContext };
