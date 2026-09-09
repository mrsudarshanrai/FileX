import { RefObject, useEffect } from 'react';

/**
 * Dismisses the menu on the interactions that should end it. Safe to bind
 * unconditionally because the menu is only mounted while it is open.
 */
const useDismissMenu = (menuRef: RefObject<HTMLElement>, close: () => void) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('blur', close);
    // scroll does not bubble, so catch it on the way down from the scrolling element
    window.addEventListener('scroll', close, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('blur', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [menuRef, close]);
};

export { useDismissMenu };
