import { ApolloProvider } from '@apollo/react-hooks';
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import awsconfig from '../aws-exports';
import AuthProvider from '../features/Auth/AuthProvider';
import theme from '../styles/theme';
import apolloClient from './apolloClient';
import Consumers from './consumers';

// Configure amplify
Amplify.register(Auth);
Amplify.configure(awsconfig);

const App = () => (
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

export default App;
