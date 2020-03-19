import Auth from '@aws-amplify/auth';
import React, { useCallback } from 'react';
import useCancelablePromise from '../../../hooks/useCancelablePromise';
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
