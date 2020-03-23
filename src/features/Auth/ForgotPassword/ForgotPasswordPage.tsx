import { Button, Grid, Link } from '@material-ui/core';
import { andThen, otherwise, pipe } from 'ramda';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { generatePath, Link as RouterLink, useHistory } from 'react-router-dom';
import { FORGOT_PASSWORD_CONFIRM_ROUTE } from '../../../app/consumers/routes';
import MinimalPage from '../../../components/MinimalPage';
import TextField from '../../../components/TextField';
import useCanSubmit from '../../../hooks/useCanSubmit';
import useFormStyles from '../../../styles/useFormStyles';
import authValidationRules from '../authValidation';
import useForgotPasswordErrorHandler from './useForgotPasswordErrorHandler';

type ForgotPasswordPageProps = {
  forgotPassword: (formState: FormData) => Promise<{ email: string }>,
}

export type FormData = {
  email: string,
};

const ForgotPasswordPage = ({ forgotPassword }: ForgotPasswordPageProps) => {
  const formClasses = useFormStyles();
  const history = useHistory();

  const form = useForm<FormData>();
  const canSubmit = useCanSubmit(form);
  const { register, errors, handleSubmit } = form;

  const forgotPasswordErrorHandler = useForgotPasswordErrorHandler(form);
  const onSubmit = useMemo(() => handleSubmit(pipe(
    forgotPassword,
    andThen(({ email }) => {
      history.push(generatePath(FORGOT_PASSWORD_CONFIRM_ROUTE, { email }));
    }),
    otherwise(forgotPasswordErrorHandler),
  )), [history, forgotPassword, handleSubmit, forgotPasswordErrorHandler]);

  return (
    <MinimalPage title="Forgot password">
      <form className={formClasses.form} onSubmit={onSubmit}>
        <TextField
          inputRef={register(authValidationRules.email)}
          autoFocus
          id="email-address"
          label="Email Address"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={formClasses.submit}
          disabled={!canSubmit}
        >
          Send
        </Button>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/signUp" variant="body2">
              No account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </MinimalPage>
  );
};

export default ForgotPasswordPage;
