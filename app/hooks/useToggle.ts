import { useState, useEffect } from 'react';

const useToggle = (defaultIsActive?: boolean) => {
  const [isActive, setActive] = useState(defaultIsActive);

  const toggle = () => {
    setActive(!isActive);
  };

  const close = () => {
    setActive(false);
  };

  const open = () => {
    setActive(true);
  };

  const set = (value: boolean) => {
    setActive(value);
  };

  useEffect(() => {
    setActive(!!defaultIsActive);
  }, [defaultIsActive]);

  return {
    isActive,
    toggle,
    close,
    open,
    set,
  };
};

export { useToggle };
