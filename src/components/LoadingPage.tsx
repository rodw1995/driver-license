import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MinimalPage from './MinimalPage';

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    marginTop: theme.spacing(2),
  },
}));

const LoadingPage = () => {
  const classes = useStyles();

  return (
    <MinimalPage title="Loading...">
      <CircularProgress color="secondary" className={classes.circularProgress} />
    </MinimalPage>
  );
};

export default LoadingPage;
