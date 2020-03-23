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
import usePasswordConfirmation from '../usePasswordConfirmation';
import useConfirmForgotPasswordErrorHandler from './useConfirmForgotPasswordErrorHandler';

type ForgotPasswordPageProps = {
  confirm: (formState: FormData) => Promise<any>,
}

export type FormData = {
  code: string,
  password: string,
  passwordConfirmation: string,
};

const ConfirmForgotPasswordPage = ({ confirm }: ForgotPasswordPageProps) => {
  const formClasses = useFormStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const form = useForm<FormData>();
  const canSubmit = useCanSubmit(form);
  const password = usePasswordConfirmation<FormData>(form);
  const { register, errors, handleSubmit } = form;

  const confirmForgotPasswordErrorHandler = useConfirmForgotPasswordErrorHandler(form);
  const onSubmit = useMemo(() => handleSubmit(pipe(
    confirm,
    andThen(() => {
      enqueueSnackbar('Password has been reset', { variant: 'success' });
      history.push(SIGN_IN_ROUTE);
    }),
    otherwise(confirmForgotPasswordErrorHandler),
  )), [handleSubmit, confirm, enqueueSnackbar, history, confirmForgotPasswordErrorHandler]);

  return (
    <MinimalPage title="Reset password">
      <form className={formClasses.form} onSubmit={onSubmit}>
        <TextField
          inputRef={register(authValidationRules.confirmationCode)}
          id="code"
          label="Code"
          name="code"
          required
          error={!!errors.code}
          helperText={errors?.code?.message}
        />
        <TextField
          inputRef={register(authValidationRules.newPassword)}
          type="password"
          id="password"
          label="New Password"
          name="password"
          required
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <TextField
          inputRef={register(authValidationRules.passwordConfirmation(password))}
          type="password"
          id="password-confirmation"
          label="New Password Confirmation"
          name="passwordConfirmation"
          required
          error={!!errors.passwordConfirmation}
          helperText={errors?.passwordConfirmation?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={formClasses.submit}
          disabled={!canSubmit}
        >
          Reset password
        </Button>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/signIn" variant="body2">
              Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </MinimalPage>
  );
};

export default ConfirmForgotPasswordPage;
