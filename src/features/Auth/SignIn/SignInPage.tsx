import { Button, Grid, Link } from '@material-ui/core';
import { otherwise, pipe } from 'ramda';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import MinimalPage from '../../../components/MinimalPage';
import TextField from '../../../components/TextField';
import useCanSubmit from '../../../hooks/useCanSubmit';
import useFormStyles from '../../../styles/useFormStyles';
import authValidationRules from '../authValidation';
import useSignInErrorHandler from './useSignInErrorHandler';

export type FormData = {
  email: string,
  password: string,
};

type SignInViewProps = {
  signIn: (formState: FormData) => Promise<any>,
};

const SignInPage = ({ signIn }: SignInViewProps) => {
  const formClasses = useFormStyles();

  const form = useForm<FormData>();
  const canSubmit = useCanSubmit(form);
  const { register, handleSubmit, errors } = form;

  const signInErrorHandler = useSignInErrorHandler(form);
  const onSubmit = useMemo(() => handleSubmit(pipe(
    signIn,
    otherwise(signInErrorHandler),
  )), [handleSubmit, signIn, signInErrorHandler]);

  return (
    <MinimalPage title="Sign In">
      <form className={formClasses.form} onSubmit={onSubmit}>
        <TextField
          inputRef={register(authValidationRules.email)}
          autoFocus
          label="Email Address"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          inputRef={register(authValidationRules.password)}
          type="password"
          autoComplete="current-password"
          label="Password"
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={formClasses.submit}
          disabled={!canSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} to="/forgotPassword" variant="body2">
              Forgot password?
            </Link>
          </Grid>
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

export default SignInPage;
