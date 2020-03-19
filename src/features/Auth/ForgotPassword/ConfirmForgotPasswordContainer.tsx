import Auth from '@aws-amplify/auth';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useCancelablePromise from '../../../hooks/useCancelablePromise';
import ConfirmForgotPasswordPage, { FormData } from './ConfirmForgotPasswordPage';

const ConfirmForgotPasswordContainer = () => {
  const makeCancelable = useCancelablePromise();
  const { email } = useParams<{ email: string }>();

  const confirm = useCallback(
    ({ code, password }: FormData) => makeCancelable(Auth.forgotPasswordSubmit(email, code, password)),
    [makeCancelable, email],
  );

  return (
    <ConfirmForgotPasswordPage confirm={confirm} />
  );
};

export default ConfirmForgotPasswordContainer;
