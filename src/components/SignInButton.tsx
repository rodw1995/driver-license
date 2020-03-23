import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SIGN_IN_ROUTE } from '../app/routes';

const SignInButton = () => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.push(SIGN_IN_ROUTE);
  }, [history]);

  return (
    <Button color="inherit" onClick={onClick}>
      Sign In
    </Button>
  );
};

export default SignInButton;
