import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuthenticated) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: '/signIn',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
