import { useEffect } from 'react';

export default function useVisibleHandler(ref, handler, modal = false) {
  const handleHideDropdown = (event) => {
    if (event.key === 'Escape') {
      handler();
    }
  };

  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClick, true);
    if (!modal) {
      document.addEventListener('mouseleave', handleClick, true);
    }
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClick, true);
      if (!modal) {
        document.removeEventListener('mouseleave', handleClick, true);
      }
    };
  });
}
