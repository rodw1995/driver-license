import { cond } from 'ramda';
import { useMemo } from 'react';
import { FormContextValues } from 'react-hook-form';
import {
  AmazonCognitoError,
  hasErrorCode,
  useAmazonCognitoErrorHandlers,
} from '../../../services/Amazon/amazonCognito';
import { FormData } from './SignUpPage';

export default ({ setError, getValues }: FormContextValues<FormData>) => {
  const createDefaultHandlers = useAmazonCognitoErrorHandlers();

  return useMemo<(error: any) => void>(() => cond([
    [
      hasErrorCode('InvalidPasswordException'),
      ({ code }: AmazonCognitoError) => {
        setError('password', code, 'Password must be at least 8 characters long');
      },
    ],
    [
      hasErrorCode('UsernameExistsException'),
      ({ code }: AmazonCognitoError) => {
        setError('email', code, 'Email is already registered');
      },
    ],
    ...createDefaultHandlers({ email: getValues().email }),
  ]), [setError, getValues, createDefaultHandlers]);
};
