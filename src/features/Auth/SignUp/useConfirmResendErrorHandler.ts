import { useSnackbar } from 'notistack';
import { cond } from 'ramda';
import { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { SIGN_IN_ROUTE } from '../../../app/consumers/routes';
import { hasErrorCode, useAmazonCognitoErrorHandlers } from '../../../services/Amazon/amazonCognito';

export default () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { email } = useParams<{ email: string }>();
  const createDefaultHandlers = useAmazonCognitoErrorHandlers();

  return useMemo<(error: any) => void>(
    () => cond([
      [
        hasErrorCode('InvalidParameterException'),
        () => {
          enqueueSnackbar('User is already confirmed', { variant: 'error' });
          history.push(SIGN_IN_ROUTE);
        },
      ],
      ...createDefaultHandlers({ email }),
    ]),
  [history, enqueueSnackbar, createDefaultHandlers, email]);
};
