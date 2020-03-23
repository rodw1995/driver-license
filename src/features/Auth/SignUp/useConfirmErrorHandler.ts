import { useSnackbar } from 'notistack';
import { cond } from 'ramda';
import { useMemo } from 'react';
import { FormContextValues } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { SIGN_IN_ROUTE } from '../../../app/routes';
import {
  AmazonCognitoError,
  hasErrorCode,
  useAmazonCognitoErrorHandlers,
} from '../../../services/Amazon/amazonCognito';
import { FormData } from './ConfirmSignUpPage';

export default ({ setError }: FormContextValues<FormData>) => {
  const history = useHistory();
  const { email } = useParams<{ email: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const createDefaultHandlers = useAmazonCognitoErrorHandlers();

  return useMemo<(error: any) => void>(() => cond([
    [
      // NotAuthorizedException is returned when the user is already confirmed
      hasErrorCode('NotAuthorizedException'),
      () => {
        enqueueSnackbar('User is already confirmed', { variant: 'success' });
        history.push(SIGN_IN_ROUTE);
      },
    ],
    [
      // ExpiredCodeException is returned when the code is expired
      hasErrorCode('ExpiredCodeException'),
      ({ code }: AmazonCognitoError) => {
        setError('code', code, 'Confirmation code is expired');
      },
    ],
    [
      // CodeMismatchException is returned when the code is invalid
      hasErrorCode('CodeMismatchException'),
      ({ code }: AmazonCognitoError) => {
        setError('code', code, 'Invalid confirmation code');
      },
    ],
    ...createDefaultHandlers({ email }),
  ]),
  [history, enqueueSnackbar, setError, email, createDefaultHandlers]);
};
