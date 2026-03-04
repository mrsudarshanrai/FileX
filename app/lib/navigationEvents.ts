import { emit, listen } from '@tauri-apps/api/event';

const NAVIGATION_STATE_EVENT = 'navigation_state';
const NAVIGATION_ACTION_EVENT = 'navigation_action';

type NavigationActionPayload =
  | { type: 'back' }
  | { type: 'forward' }
  | { type: 'goto'; path: string };

type NavigationStatePayload = {
  currentPath: string;
  isForwardDisabled: boolean;
  isBackDisabled: boolean;
};

const emitNavigationState = (payload: NavigationStatePayload) => {
  emit(NAVIGATION_STATE_EVENT, payload);
};

const emitNavigationActionBack = () => {
  const payload: NavigationActionPayload = { type: 'back' };
  emit(NAVIGATION_ACTION_EVENT, payload);
};

const emitNavigationActionForward = () => {
  const payload: NavigationActionPayload = { type: 'forward' };
  emit(NAVIGATION_ACTION_EVENT, payload);
};

const emitNavigationActionGoto = (path: string) => {
  const payload: NavigationActionPayload = { type: 'goto', path };
  emit(NAVIGATION_ACTION_EVENT, payload);
};

const listenNavigationState = (
  handler: (payload: NavigationStatePayload) => void,
): Promise<() => void> => {
  return listen<NavigationStatePayload>(NAVIGATION_STATE_EVENT, (event) => {
    if (event.payload) {
      handler(event.payload);
    }
  });
};

const listenNavigationAction = (
  handler: (payload: NavigationActionPayload) => void,
): Promise<() => void> => {
  return listen<NavigationActionPayload>(NAVIGATION_ACTION_EVENT, (event) => {
    if (event.payload) {
      handler(event.payload);
    }
  });
};

export type { NavigationActionPayload, NavigationStatePayload };
export {
  NAVIGATION_ACTION_EVENT,
  NAVIGATION_STATE_EVENT,
  emitNavigationActionBack,
  emitNavigationActionForward,
  emitNavigationActionGoto,
  emitNavigationState,
  listenNavigationAction,
  listenNavigationState,
};
