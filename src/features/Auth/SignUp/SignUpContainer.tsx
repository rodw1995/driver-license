import Auth from '@aws-amplify/auth';
import useCancelablePromise from '@rodw95/use-cancelable-promise';
import React, { useCallback } from 'react';
import SignUpPage, { FormData } from './SignUpPage';

const SignUpContainer = () => {
  const makeCancelable = useCancelablePromise();

  const signUp = useCallback(
    ({ email, password }: FormData) => makeCancelable(Auth.signUp({
      username: email, password,
    })
      .then(({ userConfirmed }) => ({ email, userConfirmed }))),
    [makeCancelable],
  );

  return (
    <SignUpPage signUp={signUp} />
  );
};

export default SignUpContainer;
