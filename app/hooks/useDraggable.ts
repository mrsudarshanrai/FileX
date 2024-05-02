import { RefObject, useEffect } from 'react';

const useDraggable = <T extends HTMLElement>(
  ref: RefObject<T>,
  modalHeaderRef: RefObject<T>,
  Modal_HEADER_ID: string,
) => {
  useEffect(() => {
    const element = ref.current;
    const headerElement = modalHeaderRef.current;

    if (element && headerElement) {
      let isDragging = false;

      const handleMouseDown = (e: MouseEvent) => {
        if (e.target && 'id' in e.target && e.target.id === Modal_HEADER_ID) {
          isDragging = true;
          element.style.cursor = 'move';
          element.addEventListener('mousemove', handleMouseMove);
          element.addEventListener('mouseup', handleMouseUp);
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          element.style.left = e.clientX + 'px';
          element.style.top = e.clientY + 'px';
          element.style.transform = `translate(-${e.clientX}, -${e.clientY})`;
        }
      };

      const handleMouseUp = () => {
        isDragging = false;
        element.style.zIndex = 'auto';
        element.style.cursor = 'auto';
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
      };

      element.addEventListener('mousedown', handleMouseDown);

      return () => {
        window.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [ref]);
};

export { useDraggable };
