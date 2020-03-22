import useCancelablePromise from '@rodw95/use-cancelable-promise';
import React, { useCallback } from 'react';
import { useAuthContext } from '../AuthProvider';
import SignInPage, { FormData } from './SignInPage';

const SignInContainer = () => {
  const makeCancelable = useCancelablePromise();
  const { signIn } = useAuthContext();

  const onSignIn = useCallback(
    ({ email, password }: FormData) => makeCancelable(signIn(email, password)),
    [makeCancelable, signIn],
  );

  return (
    <SignInPage signIn={onSignIn} />
  );
};

export default SignInContainer;
