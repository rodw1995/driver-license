import { Button, Grid, Link } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { andThen, otherwise, pipe } from 'ramda';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { SIGN_IN_ROUTE } from '../../../app/routes';
import MinimalPage from '../../../components/MinimalPage';
import TextField from '../../../components/TextField';
import useCanSubmit from '../../../hooks/useCanSubmit';
import useFormStyles from '../../../styles/useFormStyles';
import authValidationRules from '../authValidation';
import useConfirmUserErrorHandler from './useConfirmErrorHandler';
import useResendErrorHandler from './useConfirmResendErrorHandler';

export type FormData = {
  code: string,
};

type ConfirmUserViewProps = {
  confirm: (formState: FormData) => Promise<void>,
  resend: () => Promise<void>,
};

const ConfirmSignUpPage = ({ confirm, resend }: ConfirmUserViewProps) => {
  const formClasses = useFormStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<FormData>();
  const canSubmit = useCanSubmit(form);
  const { register, handleSubmit, errors } = form;

  // Handle form submit
  const confirmUserErrorHandler = useConfirmUserErrorHandler(form);
  const onSubmit = useMemo(() => handleSubmit(pipe(
    confirm,
    andThen(() => {
      enqueueSnackbar('Email is confirmed', { variant: 'success' });
      history.push(SIGN_IN_ROUTE);
    }),
    otherwise(confirmUserErrorHandler),
  )),
  [handleSubmit, confirm, enqueueSnackbar, history, confirmUserErrorHandler]);

  // Handle resend
  const resendErrorHandler = useResendErrorHandler();
  const onResend = useMemo(() => pipe(
    resend,
    andThen(() => {
      enqueueSnackbar('Confirmation code has been resent', { variant: 'success' });
    }),
    otherwise(resendErrorHandler),
  ), [resend, enqueueSnackbar, resendErrorHandler]);

  return (
    <MinimalPage title="Confirm email">
      <form className={formClasses.form} onSubmit={onSubmit}>
        <TextField
          inputRef={register(authValidationRules.confirmationCode)}
          autoFocus
          id="code"
          label="Code"
          name="code"
          error={!!errors.code}
          helperText={errors?.code?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={formClasses.submit}
          disabled={!canSubmit}
        >
          Confirm
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" onClick={onResend}>
              Resend code
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/signIn" variant="body2">
              Already confirmed? Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </MinimalPage>
  );
};

export default ConfirmSignUpPage;
