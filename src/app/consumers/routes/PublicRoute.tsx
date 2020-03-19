import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useIsAuthenticated from '../../../hooks/useIsAuthenticated';

type PublicRouteProps = RouteProps & {
  restricted?: boolean,
};

const PublicRoute = ({ children, restricted = true, ...rest }: PublicRouteProps) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isAuthenticated || !restricted) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PublicRoute;
