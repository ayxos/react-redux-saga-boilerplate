/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import { Row, Col } from 'reactstrap';
import Menu from 'components/Menu';
import Dashboard from 'containers/subcontainers/Dashboard';
// Order matters
export const SubRoutes = [
  {
    sub: true,
    name: 'Dashboard',
    path: '/dashboard',
    component: () => <Dashboard />,
    datePicker: true,
  },
];

// TODO: refactor the code to have propTypes inside the class as static
export default class Private extends Component {
  static propTypes = {
    app: PropTypes.object,
    component: PropTypes.string,
    statsName: PropTypes.string,
    user: PropTypes.object,
  };

  toRender = () => {
    const { component, user, statsName } = this.props;
    // dinamically load Route object
    const nextRoute = SubRoutes.find(route => route.name === component);
    // Render element
    if (nextRoute) {
      // create react component with single Name
      const NextReactComponent = nextRoute.component(user, statsName);
      return (
        <div>
          <Row className="main__container">
            <div className="inner__container">{NextReactComponent}</div>
          </Row>
        </div>
      );
    }
    return <div>Under construction</div>;
  };

  render() {
    const { app } = this.props;
    return (
      <div>
        <div>{app.status && <Loader />}</div>
        <div key="Private" className="app__private app__route">
          <Menu />
          <div className="app__root">
            <Col xs={{ size: 11 }} sm={{ size: 11 }} md={{ size: 10 }} className="margin-auto">
              {this.toRender()}
            </Col>
          </div>
        </div>
      </div>
    );
  }
}
