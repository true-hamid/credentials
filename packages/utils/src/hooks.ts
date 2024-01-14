import { useState, useEffect } from 'react';

export const useShowHideMessage = (
  value: string | undefined,
  message: string | undefined,
  delay?: number
) => {
  const [stickyMessage, setStickyMessage] = useState('');
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStickyMessage(message ? message : '');
      clearTimeout(timeoutId);
    }, delay || 1600);
    if (!message) {
      setStickyMessage(message ? message : '');
    }
    return () => clearTimeout(timeoutId);
  }, [value, message, delay]);

  return { stickyMessage };
};
