import Auth from '@aws-amplify/auth';
// @ts-ignore
import { fireEvent, getByLabelText, getByRole, getByText, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import AuthProvider, { AuthContextValue, useAuthContext } from '../../AuthProvider';
import SignInContainer from '../SignInContainer';

jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: () => {},
  }),
}));

jest.mock('@apollo/react-hooks', () => ({
  useApolloClient: () => ({
    resetStore: () => {},
  }),
}));

jest.mock('@aws-amplify/auth', () => ({
  __esModule: true,
  default: {
    currentAuthenticatedUser: jest.fn().mockResolvedValue(Promise.resolve(null)),
    signIn: jest.fn(),
    signOut: () => Promise.resolve(),
  },
}));

describe('SignIn', () => {
  // Keep track of the auth context value to test
  let authContextValue: AuthContextValue;
  const AuthContextSetter = () => {
    authContextValue = useAuthContext();
    return null;
  };

  // Setup providers and SignInContainer
  beforeEach(async () => {
    jest.resetAllMocks();

    act(() => {
      render(
        <AuthProvider>
          <AuthContextSetter />
          <MemoryRouter>
            <SignInContainer />
          </MemoryRouter>
        </AuthProvider>,
      );
    });

    await waitFor(() => expect(Auth.currentAuthenticatedUser).toHaveBeenCalledTimes(1));

    expect(authContextValue.state).toBe('signedOut');
    expect(authContextValue.user).toBe(undefined);
  });

  it('displays a sign in form', () => {
    const form = screen.getByTestId('sign-in-form');

    expect(form).toBeTruthy();
    expect(form.innerHTML).toMatchSnapshot();
    expect(getByLabelText(form, 'Email Address')).toBeTruthy();
    expect(getByLabelText(form, 'Password')).toBeTruthy();
    expect(getByRole(form, 'button')).toBeTruthy();
    expect(getByRole(form, 'button').textContent).toBe('Sign In');
  });

  it('shows required fields errors', async () => {
    const form = screen.getByTestId('sign-in-form');

    fireEvent.click(getByRole(form, 'button'));

    await waitFor(() => Promise.all([
      expect(getByText(form, 'Email is required')).toBeTruthy(),
      expect(getByText(form, 'Password is required')).toBeTruthy(),
    ]));

    expect(authContextValue.state).toBe('signedOut');
    expect(authContextValue.user).toBe(undefined);
  });

  it('shows an unknown email address error', async () => {
    const form = screen.getByTestId('sign-in-form');

    fireEvent.change(getByLabelText(form, 'Email Address'), {
      target: { value: 'robbie@example.com' },
    });

    fireEvent.change(getByLabelText(form, 'Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(getByRole(form, 'button'));

    // @ts-ignore
    // eslint-disable-next-line prefer-promise-reject-errors
    Auth.signIn.mockResolvedValue(Promise.reject({ code: 'UserNotFoundException' }));

    await waitFor(() => expect(getByText(form, 'No user with this email exists')).toBeTruthy());

    expect(authContextValue.state).toBe('signedOut');
    expect(authContextValue.user).toBe(undefined);
  });

  it('shows an incorrect password error', async () => {
    const form = screen.getByTestId('sign-in-form');

    fireEvent.change(getByLabelText(form, 'Email Address'), {
      target: { value: 'robbie@example.com' },
    });

    fireEvent.change(getByLabelText(form, 'Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(getByRole(form, 'button'));

    // @ts-ignore
    // eslint-disable-next-line prefer-promise-reject-errors
    Auth.signIn.mockResolvedValue(Promise.reject({ code: 'NotAuthorizedException' }));

    await waitFor(() => expect(getByText(form, 'Incorrect password')).toBeTruthy());

    expect(authContextValue.state).toBe('signedOut');
    expect(authContextValue.user).toBe(undefined);
  });

  it('can sign in successfully', async () => {
    const form = screen.getByTestId('sign-in-form');

    fireEvent.change(getByLabelText(form, 'Email Address'), {
      target: { value: 'robbie@example.com' },
    });

    fireEvent.change(getByLabelText(form, 'Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(getByRole(form, 'button'));

    const resolvedUser = {};
    // @ts-ignore
    Auth.signIn.mockResolvedValue(Promise.resolve(resolvedUser));

    await waitFor(() => expect(Auth.signIn).toHaveBeenCalledTimes(1));

    expect(authContextValue.state).toBe('signedIn');
    expect(authContextValue.user).toBe(resolvedUser);
  });
});
