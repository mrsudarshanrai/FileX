import { RefObject, useEffect, useRef } from 'react';

type DragAxis = 'x' | 'y' | 'both';

type UseDraggableOptions = {
  /**
   * Constrain dragging so the element stays fully within the viewport.
   * Default: true
   */
  bounded?: boolean;
  /**
   * Which axes to allow dragging on.
   * Default: 'both'
   */
  axis?: DragAxis;
};

type DragState = {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
};

const useDraggable = <T extends HTMLElement>(
  ref: RefObject<T>,
  modalHeaderRef: RefObject<T>,
  options?: UseDraggableOptions,
) => {
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  });

  const bounded = options?.bounded ?? true;
  const axis: DragAxis = options?.axis ?? 'both';

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
      state.width = rect.width;
      state.height = rect.height;

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

      let nextLeft = e.clientX - state.offsetX;
      let nextTop = e.clientY - state.offsetY;

      if (bounded) {
        const maxLeft = Math.max(0, window.innerWidth - state.width);
        const maxTop = Math.max(0, window.innerHeight - state.height);

        nextLeft = Math.min(Math.max(0, nextLeft), maxLeft);
        nextTop = Math.min(Math.max(0, nextTop), maxTop);
      }

      if (axis === 'x' || axis === 'both') {
        element.style.left = `${nextLeft}px`;
      }
      if (axis === 'y' || axis === 'both') {
        element.style.top = `${nextTop}px`;
      }
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
  }, [axis, bounded, modalHeaderRef, ref]);
};

export type { UseDraggableOptions };
export { useDraggable };
