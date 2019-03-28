import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import treeChanges from 'tree-changes';
import history from 'modules/history';

import config from 'config';
import { showAlert, getMenu } from 'redux/actions';

import Welcome from 'routes/Welcome';
import Private, { SubRoutes } from 'routes/Private';
import NotFound from 'routes/NotFound';

import Header from 'containers/Header';
import SystemAlerts from 'containers/SystemAlerts';
import Login from 'containers/Login';

import RoutePublic from 'components/RoutePublic';
import RoutePrivate from 'components/RoutePrivate';

import Footer from 'components/Footer';

import GlobalStyles from 'components/GlobalStyles';
import { Router, Switch, Route } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import theme, { headerHeight } from 'modules/theme';
import { utils } from 'styled-minimal';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const MainPrivate = ({ isAuthenticated }) =>
  isAuthenticated &&
  css`
    padding: ${utils.px(headerHeight)} 0 0;
  `;

const Main = styled.main`
  min-height: 100vh;
  ${MainPrivate};
`;

export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getMenu());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    /* istanbul ignore else */
    if (changedTo('user.isAuthenticated', true)) {
      dispatch(showAlert('Hello! And welcome!', { type: 'success', icon: 'i-trophy' }));
    }
  }

  subRoutes = () => {
    const { user, app } = this.props;
    return SubRoutes.map(subRoute => (
      <RoutePrivate
        key={subRoute.name}
        path={subRoute.path}
        wrapper={Private}
        component={subRoute.name}
        user={user}
        isAuthenticated={user.isAuthenticated}
        app={app}
      />
    ));
  };

  render() {
    const { app, dispatch, user } = this.props;
    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper logged={user.isAuthenticated}>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'pt-br' }}
              encodeSpecialCharacters={true}
              defaultTitle={config.title}
              titleTemplate={`%s | ${config.name}`}
              titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            />
            {user.isAuthenticated && (
              <Header dispatch={dispatch} user={user} isAuthenticated={user.isAuthenticated} />
            )}
            <Main isAuthenticated={user.isAuthenticated}>
              <Switch>
                <RoutePublic
                  isAuthenticated={user.isAuthenticated}
                  path="/"
                  exact
                  component={Welcome}
                />
                <RoutePublic
                  isAuthenticated={user.isAuthenticated}
                  path="/login"
                  exact
                  component={Login}
                />
                {this.subRoutes()}
                <Route component={NotFound} />
              </Switch>
            </Main>
            <Footer version={app.version} />
            <SystemAlerts />
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
    menu: state.menu,
  };
}

export default connect(mapStateToProps)(App);
