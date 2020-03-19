import { useApolloClient } from '@apollo/react-hooks';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import useDidMount from '@rooks/use-did-mount';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import createContext from '../../utils/createContext';

type AuthContextValue = {
  state: 'idle' | 'signingIn' | 'signedIn' | 'signingOut' | 'signedOut',
  user?: CognitoUser,
  signIn: (email: string, password: string) => Promise<CognitoUser>,
  signOut: () => Promise<void>,
}

const Context = createContext<AuthContextValue>();
export const useAuthContext = Context.hook;

type AuthProviderProps = {
  children: React.ReactNode,
}

export default ({ children }: AuthProviderProps) => {
  const apolloClient = useApolloClient();

  const userRef = useRef<CognitoUser | undefined>(undefined);
  const [state, setState] = useState<AuthContextValue['state']>('idle');

  const handleUserPromise = useCallback((promise: Promise<CognitoUser>) => promise
    .then((user) => {
      userRef.current = user;
      setState('signedIn');

      return user;
    })
    .catch((err) => {
      userRef.current = undefined;
      setState('signedOut');

      throw err;
    }), []);

  const signIn = useCallback<AuthContextValue['signIn']>((email, password) => {
    setState('signingIn');

    return handleUserPromise(Auth.signIn({ username: email, password }));
  }, [handleUserPromise]);

  const signOut = useCallback(() => {
    setState('signingOut');

    return Auth.signOut()
      .then(() => {
        userRef.current = undefined;
        setState('signedOut');

        // Reset apollo store on logout
        apolloClient.resetStore();
      })
      .catch((err) => {
        setState('signedIn');

        throw err;
      });
  }, [apolloClient]);

  // Try to fetch the authenticated user on mount
  useDidMount(() => {
    handleUserPromise(Auth.currentAuthenticatedUser()).catch(() => {});
  });

  const value = useMemo(() => ({
    state,
    user: userRef.current,
    signIn,
    signOut,
  }), [signIn, signOut, state]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
