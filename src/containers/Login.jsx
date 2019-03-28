import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LoginForm from 'components/LoginForm';
import { login } from 'redux/actions/index';

class Login extends Component {
  _login = (username, password) => {
    const { dispatch, history } = this.props;
    dispatch(login({ username, password }));
    dispatch(history.push('/dashboard'));
  };

  render() {
    return (
      <div>
        <LoginForm onSubmit={this._login} />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(withRouter(Login));
