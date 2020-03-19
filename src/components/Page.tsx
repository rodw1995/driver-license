import { Container, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';

type PageProps = {
  children: React.ReactNode,
  preToolbar?: React.ReactNode,
  toolbar?: React.ReactNode,
  title: string,
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

const Page = ({ children, preToolbar, toolbar, title }: PageProps) => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.container}>
      {preToolbar}
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {toolbar}
        </Toolbar>
      </AppBar>
      <Paper className={classes.paper} elevation={0} square>
        {children}
      </Paper>
    </Container>
  );
};

export default Page;
