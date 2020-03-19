import { anyPass, cond } from 'ramda';
import { useMemo } from 'react';
import { FormContextValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  AmazonCognitoError,
  hasErrorCode,
  useAmazonCognitoErrorHandlers,
} from '../../../services/Amazon/amazonCognito';
import { FormData } from './ConfirmForgotPasswordPage';

export default ({ setError }: FormContextValues<FormData>) => {
  const { email } = useParams<{ email: string }>();
  const createDefaultHandlers = useAmazonCognitoErrorHandlers();

  return useMemo<(error: any) => void>(() => cond([
    [
      anyPass([
        hasErrorCode('CodeMismatchException'),
        hasErrorCode('ExpiredCodeException'),
      ]),
      ({ code }: AmazonCognitoError) => {
        setError('code', code, 'Invalid or expired confirmation code');
      },
    ],
    ...createDefaultHandlers({ email }),
  ]), [setError, createDefaultHandlers, email]);
};
