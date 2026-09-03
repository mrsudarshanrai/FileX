import { useLayoutEffect, useState } from 'react';

/** Distance between the virtualized content's top and #main-scroll's scroll-content top */
const useScrollMargin = () => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const scrollElement = document.getElementById('main-scroll');
    if (!element || !scrollElement) return;

    const elementTop = element.getBoundingClientRect().top;
    const scrollElementTop = scrollElement.getBoundingClientRect().top;
    setScrollMargin(elementTop - scrollElementTop + scrollElement.scrollTop);
  }, [element]);

  return { scrollMargin, contentRef: setElement };
};

export { useScrollMargin };
