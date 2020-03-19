import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import useIsAuthenticated from '../hooks/useIsAuthenticated';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const isAuthenticated = useIsAuthenticated();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Driver License
        </Typography>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
