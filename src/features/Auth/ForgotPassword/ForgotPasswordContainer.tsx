import Auth from '@aws-amplify/auth';
import useCancelablePromise from '@rodw95/use-cancelable-promise';
import React, { useCallback } from 'react';
import ForgotPasswordPage, { FormData } from './ForgotPasswordPage';

const ForgotPasswordContainer = () => {
  const makeCancelable = useCancelablePromise();

  const forgotPassword = useCallback(
    ({ email }: FormData) => makeCancelable(Auth.forgotPassword(email)).then(() => ({ email })),
    [makeCancelable],
  );

  return (
    <ForgotPasswordPage forgotPassword={forgotPassword} />
  );
};

export default ForgotPasswordContainer;
