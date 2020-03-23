import { Button, Grid, Link } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { andThen, otherwise, pipe } from 'ramda';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { generatePath, Link as RouterLink, useHistory } from 'react-router-dom';
import { SIGN_IN_ROUTE, SIGN_UP_CONFIRM_ROUTE } from '../../../app/consumers/routes';
import MinimalPage from '../../../components/MinimalPage';
import TextField from '../../../components/TextField';
import useCanSubmit from '../../../hooks/useCanSubmit';
import useFormStyles from '../../../styles/useFormStyles';
import authValidationRules from '../authValidation';
import usePasswordConfirmation from '../usePasswordConfirmation';
import useSignUpErrorHandler from './useSignUpErrorHandler';

export type FormData = {
  email: string,
  password: string,
  passwordConfirmation: string,
};

type SignUpPageProps = {
  signUp: (formState: FormData) => Promise<{ email: string, userConfirmed: boolean }>,
};

const SignUpPage = ({ signUp }: SignUpPageProps) => {
  const formClasses = useFormStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<FormData>();
  const canSubmit = useCanSubmit(form);
  const password = usePasswordConfirmation<FormData>(form);
  const { register, handleSubmit, errors } = form;

  const signUpErrorHandler = useSignUpErrorHandler(form);
  const onSubmit = useMemo(() => handleSubmit(pipe(
    signUp,
    andThen(({ email, userConfirmed }) => {
      // Account may be auto confirmed by a Lambda trigger
      if (userConfirmed) {
        enqueueSnackbar('Account created', { variant: 'success' });
        history.push(SIGN_IN_ROUTE);
      } else {
        enqueueSnackbar('Account created, please confirm your email', { variant: 'success' });
        history.push(generatePath(SIGN_UP_CONFIRM_ROUTE, { email }));
      }
    }),
    otherwise(signUpErrorHandler),
  )), [history, enqueueSnackbar, handleSubmit, signUp, signUpErrorHandler]);

  return (
    <MinimalPage title="Sign Up">
      <form className={formClasses.form} onSubmit={onSubmit}>
        <TextField
          inputRef={register(authValidationRules.email)}
          id="email-address"
          label="Email Address"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          inputRef={register(authValidationRules.newPassword)}
          type="password"
          id="password"
          label="Password"
          name="password"
          required
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <TextField
          inputRef={register(authValidationRules.passwordConfirmation(password))}
          type="password"
          id="password-confirmation"
          label="Password Confirmation"
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
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/signIn" variant="body2">
              Already an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </MinimalPage>
  );
};

export default SignUpPage;
