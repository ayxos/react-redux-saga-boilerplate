import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/* istanbul ignore next */
const RoutePublic = ({ component: Component, isAuthenticated, to, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? <Redirect to={to} /> : <Component {...props} />)}
  />
);

RoutePublic.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  to: PropTypes.string,
};

RoutePublic.defaultProps = {
  to: '/dashboard',
};

export default RoutePublic;
