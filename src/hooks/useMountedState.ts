// https://github.com/streamich/react-use
import { useCallback, useEffect, useRef } from 'react';

export default (): () => boolean => {
  const mountedRef = useRef<boolean>(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  });

  return get;
};
