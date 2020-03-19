import Auth from '@aws-amplify/auth';
import React, { useCallback } from 'react';
import useCancelablePromise from '../../../hooks/useCancelablePromise';
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
