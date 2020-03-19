import { Button } from '@material-ui/core';
import React from 'react';
import { useAuthContext } from '../features/Auth/AuthProvider';

const SignOutButton = () => {
  const { signOut } = useAuthContext();

  return (
    <Button color="inherit" onClick={signOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
