import { cond } from 'ramda';
import { useMemo } from 'react';
import { FormContextValues } from 'react-hook-form';
import {
  AmazonCognitoError,
  hasErrorCode,
  useAmazonCognitoErrorHandlers,
} from '../../../services/Amazon/amazonCognito';
import { FormData } from './SignInPage';

export default ({ setError, getValues }: FormContextValues<FormData>) => {
  const createDefaultHandlers = useAmazonCognitoErrorHandlers();

  return useMemo<(error: any) => void>(() => cond([
    [
      hasErrorCode('NotAuthorizedException'),
      ({ code }: AmazonCognitoError) => {
        setError('password', code, 'Incorrect password');
      },
    ],
    [
      hasErrorCode('UserNotFoundException'),
      ({ code }: AmazonCognitoError) => {
        setError('email', code, 'No user with this email exists');
      },
    ],
    ...createDefaultHandlers({ email: getValues().email }),
  ]), [setError, getValues, createDefaultHandlers]);
};
