import { renderHook } from '@testing-library/react-hooks';
import { createContext, useContext } from 'react';

describe('useOwner', () => {
  it('should return the correct isAuthenticated boolean based on the authentication state', () => {
    expect.assertions(5);

    const stateMap: { [key: string]: boolean } = {
      idle: false,
      signingIn: false,
      signedIn: true,
      signingOut: false,
      signedOut: false,
    };

    return Object.keys(stateMap).reduce((p, state) => p.then(() => {
      jest.resetModules();

      // Create mock
      jest.doMock('../../features/Auth/AuthProvider', () => ({
        useAuthContext: () => useContext(createContext({ state })),
      }));

      return import('../useIsAuthenticated').then(({ default: useIsAuthenticated }) => {
        const hook = renderHook(useIsAuthenticated);

        expect(hook.result.current).toBe(stateMap[state]);
      });
    }), Promise.resolve());
  });
});
