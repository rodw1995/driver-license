import { useCallback } from 'react';
import useMountedState from './useMountedState';

export default () => {
  const isMounted = useMountedState();

  return useCallback(
    (promise: Promise<any>) => new Promise<any>((resolve, reject) => {
      promise
        .then((result) => {
          if (isMounted()) {
            resolve(result);
          }
        })
        .catch((error) => {
          if (isMounted()) {
            reject(error);
          }
        });
    }),
    [isMounted],
  );
};
