import { ApolloProvider } from '@apollo/react-hooks';
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import awsconfig from '../aws-exports';
import AuthProvider from '../features/Auth/AuthProvider';
import theme from '../styles/theme';
import Consumers from './Consumers';
import apolloClient from './apolloClient';

// Configure amplify
Amplify.register(Auth);
Amplify.configure(awsconfig);

export default () => (
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Consumers />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  </ApolloProvider>
);
