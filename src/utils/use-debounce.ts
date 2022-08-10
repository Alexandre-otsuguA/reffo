import { useRef, useEffect, useCallback } from 'react';

const useDebounce = <F extends (...args: any) => any>(
  callback: F,
  delay: number
): ((...args: Parameters<F>) => ReturnType<F>) => {
  const timer = useRef<NodeJS.Timer | null>();
  const savedCallback = useRef<F | null>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [delay]);

  return useCallback((...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    timer.current = setTimeout(() => savedCallback.current?.(...args), delay);
  }, []) as (...args: Parameters<F>) => ReturnType<F>;
};

export default useDebounce;
