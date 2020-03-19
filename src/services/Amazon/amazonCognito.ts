import isPlainObject from 'lodash.isplainobject';
import { useSnackbar } from 'notistack';
import { allPass, flip, has, includes, not, pipe, propEq, propSatisfies } from 'ramda';
import { useCallback } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { SIGN_UP_CONFIRM_ROUTE, SIGN_UP_ROUTE } from '../../app/consumers/routes';

export const hasErrorCode = (code: string) => allPass([
  isPlainObject, has('code'), propEq('code', code),
]);

export type AmazonCognitoError = {
  type: string
  code: string,
  message: string | null,
};

type ErrorHandlerCode = 'LimitExceededException' | 'UserNotFoundException' | 'UserNotConfirmedException' | 'fallback';
type ErrorHandlerCodePredicate = (code: ErrorHandlerCode) => boolean;

export const useAmazonCognitoErrorHandlers = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(({ email, ignore = [] }: {
    email?: string, ignore?: Array<ErrorHandlerCode>,
  } = {}): Array<[(error: any) => boolean, (error: any) => void]> => {
    // An example of using Ramda functions just for practice purposes
    // In plain JS it's much cleaner: code => !ignore.includes(code)
    const notInIgnore = pipe(
      flip<ErrorHandlerCode, Array<ErrorHandlerCode>, ErrorHandlerCodePredicate>(includes)(ignore),
      not,
    );

    const predicateByCode = (code: string) => allPass([
      hasErrorCode(code), propSatisfies(notInIgnore, 'code'),
    ]);

    return [
      [
        // LimitExceededException is returned when the user exceeds the request limit
        predicateByCode('LimitExceededException'),
        () => {
          enqueueSnackbar('Attempt limit exceeded, please try after some time', { variant: 'error' });
        },
      ],
      [
        // UserNotFoundException is returned for a non existing user
        predicateByCode('UserNotFoundException'),
        () => {
          enqueueSnackbar('User was not found', { variant: 'error' });

          history.push(SIGN_UP_ROUTE);
        },
      ],
      [
        predicateByCode('UserNotConfirmedException'),
        () => {
          enqueueSnackbar('You need to confirm your email first', { variant: 'warning' });

          if (email) {
            history.push(generatePath(SIGN_UP_CONFIRM_ROUTE, { email }));
          }
        },
      ],
      [
        () => notInIgnore('fallback'),
        () => {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        },
      ],
    ];
  }, [enqueueSnackbar, history]);
};
