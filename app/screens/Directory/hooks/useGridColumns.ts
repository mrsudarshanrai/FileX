import { useEffect, useState } from 'react';
import { GRID_COLUMN_GAP, GRID_MIN_ITEM_WIDTH } from '../DirectoryStyled';

/** Mirrors what `repeat(auto-fill, minmax(120px, 1fr))` would resolve to at the current width */
const useGridColumns = (paddingX = 0) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    if (!element) return;

    const updateColumns = () => {
      const contentWidth = element.clientWidth - paddingX;
      const count = Math.max(
        1,
        Math.floor((contentWidth + GRID_COLUMN_GAP) / (GRID_MIN_ITEM_WIDTH + GRID_COLUMN_GAP)),
      );
      setColumns(count);
    };

    updateColumns();

    const observer = new ResizeObserver(updateColumns);
    observer.observe(element);

    return () => observer.disconnect();
  }, [element, paddingX]);

  return { columns, gridAreaRef: setElement };
};

export { useGridColumns };
