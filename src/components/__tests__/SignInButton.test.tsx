import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import SignInButton from '../SignInButton';

describe('SignInButton', () => {
  it('should display a button that navigates to sign in when clicked', () => {
    expect.assertions(1);

    const { container, getByText } = render(
      <MemoryRouter>
        <Route exact path="/"><SignInButton /></Route>
        <Route exact path="/signIn">Sign In</Route>
      </MemoryRouter>,
    );

    const button = getByText(/Sign In/i).closest('button');

    if (button) {
      fireEvent.click(button);

      expect(container.textContent).toBe('Sign In');
    }
  });
});
