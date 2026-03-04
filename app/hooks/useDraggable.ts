import { RefObject, useEffect, useRef } from 'react';

type DragState = {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
};

const useDraggable = <T extends HTMLElement>(ref: RefObject<T>, modalHeaderRef: RefObject<T>) => {
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    const element = ref.current;
    const headerElement = modalHeaderRef.current;

    if (!element || !headerElement) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;

      const rect = element.getBoundingClientRect();
      const state = dragStateRef.current;

      state.isDragging = true;
      state.offsetX = e.clientX - rect.left;
      state.offsetY = e.clientY - rect.top;

      element.style.cursor = 'move';
      element.style.position = 'fixed';
      element.style.left = `${rect.left}px`;
      element.style.top = `${rect.top}px`;
      element.style.transform = 'none';

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const state = dragStateRef.current;
      if (!state.isDragging) return;

      const nextLeft = e.clientX - state.offsetX;
      const nextTop = e.clientY - state.offsetY;

      element.style.left = `${nextLeft}px`;
      element.style.top = `${nextTop}px`;
    };

    const handleMouseUp = () => {
      const state = dragStateRef.current;
      if (!state.isDragging) return;

      state.isDragging = false;
      element.style.cursor = 'auto';

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    headerElement.addEventListener('mousedown', handleMouseDown);

    return () => {
      headerElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref, modalHeaderRef]);
};

export { useDraggable };
