import React from 'react';
import PropTypes from 'prop-types';

import { logOut } from 'actions';
import Logo from 'components/Logo';

import Nav from 'components/Nav';

export default class Header extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleClickLogout = e => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(logOut());
  };

  render() {
    return (
      <header className="app__header">
        <Nav isAuthenticated={this.props.isAuthenticated} onLogout={this.handleClickLogout}/>
      </header>
    );
  }
}
