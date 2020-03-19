import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

type MinimalPageProps = {
  children: React.ReactNode,
  title: string,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const MinimalPage = ({ children, title }: MinimalPageProps) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">{title}</Typography>
        {children}
      </Paper>
    </Container>
  );
};

export default MinimalPage;
