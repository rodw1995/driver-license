import { renderHook } from '@testing-library/react-hooks';
import { createContext, useContext } from 'react';

describe('useOwner', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return the username if authenticated', () => {
    jest.doMock('../../features/Auth/AuthProvider', () => ({
      useAuthContext: () => useContext(createContext({
        state: 'signedIn',
        user: {
          getUsername: () => 'test-username',
        },
      })),
    }));

    return import('../useOwner').then(({ default: useOwner }) => {
      const hook = renderHook(useOwner);

      expect(hook.result.current).toEqual('test-username');
    });
  });

  it('should throw an error when not authenticated', () => {
    jest.doMock('../../features/Auth/AuthProvider', () => ({
      useAuthContext: () => useContext(createContext({
        state: 'signedOut',
        user: null,
      })),
    }));

    return import('../useOwner').then(({ default: useOwner }) => {
      const hook = renderHook(useOwner);

      expect(hook.result.error).toBeInstanceOf(Error);
      expect(hook.result.error.message).toEqual('No authenticated user');
    });
  });
});
