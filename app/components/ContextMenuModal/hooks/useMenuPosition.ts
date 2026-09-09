import { RefObject, useLayoutEffect, useRef, useState } from 'react';

const EDGE_GAP = 10;

type MenuPosition = {
  menuRef: RefObject<HTMLDivElement>;
  position: { top: number; left: number };
};

/**
 * Keeps the menu on screen by measuring what was actually rendered rather than
 * assuming a row height, and corrects before paint so there is no visible jump.
 */
const useMenuPosition = (top: number, left: number, itemCount: number): MenuPosition => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top, left });

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const { width, height } = menu.getBoundingClientRect();

    setPosition({
      top: Math.max(EDGE_GAP, Math.min(top, window.innerHeight - height - EDGE_GAP)),
      left: Math.max(EDGE_GAP, Math.min(left, window.innerWidth - width - EDGE_GAP)),
    });
  }, [top, left, itemCount]);

  return { menuRef, position };
};

export { useMenuPosition };
