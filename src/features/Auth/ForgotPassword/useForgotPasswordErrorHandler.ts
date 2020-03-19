import { cond } from 'ramda';
import { useMemo } from 'react';
import { FormContextValues } from 'react-hook-form';
import {
  AmazonCognitoError,
  hasErrorCode,
  useAmazonCognitoErrorHandlers,
} from '../../../services/Amazon/amazonCognito';
import { FormData } from './ForgotPasswordPage';

export default ({ getValues, setError }: FormContextValues<FormData>) => {
  const createDefaultHandlers = useAmazonCognitoErrorHandlers();

  return useMemo<(error: any) => void>(() => cond([
    [
      hasErrorCode('UserNotFoundException'),
      ({ code }: AmazonCognitoError) => {
        setError('email', code, 'No user with this email exists');
      },
    ],
    ...createDefaultHandlers({ email: getValues().email }),
  ]), [setError, getValues, createDefaultHandlers]);
};
