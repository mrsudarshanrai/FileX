import { RefObject, useEffect, useRef } from 'react';

type DragState = {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
};

const useDraggable = <T extends HTMLElement>(ref: RefObject<T>, handleRef: RefObject<T>) => {
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = ref.current;
    const handle = handleRef.current;

    if (!element || !handle) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      // prevent close button from dragging the modal
      if ((e.target as HTMLElement).closest('[data-no-drag]')) return;

      const rect = element.getBoundingClientRect();
      const state = dragStateRef.current;

      state.isDragging = true;
      state.offsetX = e.clientX - rect.left;
      state.offsetY = e.clientY - rect.top;
      state.width = rect.width;
      state.height = rect.height;

      element.style.position = 'fixed';
      element.style.left = `${rect.left}px`;
      element.style.top = `${rect.top}px`;
      element.style.margin = '0';

      // on the body so the cursor holds even when the pointer outruns the handle
      document.body.style.cursor = 'move';

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const state = dragStateRef.current;
      if (!state.isDragging) return;

      const maxLeft = Math.max(0, window.innerWidth - state.width);
      const maxTop = Math.max(0, window.innerHeight - state.height);

      element.style.left = `${Math.min(Math.max(0, e.clientX - state.offsetX), maxLeft)}px`;
      element.style.top = `${Math.min(Math.max(0, e.clientY - state.offsetY), maxTop)}px`;
    };

    const handleMouseUp = () => {
      const state = dragStateRef.current;
      if (!state.isDragging) return;

      state.isDragging = false;
      // clear rather than set 'auto', so the stylesheet takes over again
      document.body.style.cursor = '';

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    handle.addEventListener('mousedown', handleMouseDown);

    return () => {
      handle.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [handleRef, ref]);
};

export { useDraggable };
