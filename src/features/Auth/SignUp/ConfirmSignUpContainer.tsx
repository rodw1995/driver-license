import Auth from '@aws-amplify/auth';
import useCancelablePromise from '@rodw95/use-cancelable-promise';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import noop from '../../../utils/noop';
import ConfirmSignUpPage, { FormData } from './ConfirmSignUpPage';

const ConfirmSignUpContainer = () => {
  const makeCancelable = useCancelablePromise();
  const { email } = useParams<{ email: string }>();

  const confirm = useCallback(
    ({ code }: FormData) => makeCancelable(Auth.confirmSignUp(email, code)),
    [makeCancelable, email],
  );

  const resend = useCallback(
    () => makeCancelable(Auth.resendSignUp(email).then(noop)),
    [makeCancelable, email],
  );

  return (
    <ConfirmSignUpPage confirm={confirm} resend={resend} />
  );
};

export default ConfirmSignUpContainer;
