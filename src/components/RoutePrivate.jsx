import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/* istanbul ignore next */
const RoutePrivate = ({
  wrapper: Wrapper,
  component: Component,
  user,
  isAuthenticated,
  to,
  app,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Wrapper component={Component} user={user} app={app} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: to,
            state: { redirect: props.location.pathname, isAuthenticated },
          }}
        />
      )
    }
  />
);

RoutePrivate.propTypes = {
  app: PropTypes.object,
  component: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object,
  to: PropTypes.string,
  user: PropTypes.object.isRequired,
  wrapper: PropTypes.func.isRequired,
};

RoutePrivate.defaultProps = {
  to: '/',
};

export default RoutePrivate;
