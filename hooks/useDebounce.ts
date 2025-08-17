import { useState, useEffect } from 'react';

/**
 * A custom React hook that debounces a value.
 *
 * @template T The type of the value to debounce.
 * @param {T} value The value to debounce.
 * @param {number} delay The delay in milliseconds before the debounced value is updated.
 * @returns {T} The debounced value.
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
