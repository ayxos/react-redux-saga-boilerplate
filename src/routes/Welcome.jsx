import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import config from 'config';
import { login } from 'redux/actions/index';

import { Button, Container, Text, utils } from 'styled-minimal';
import Background from 'components/Background';
import Icon from 'components/Icon';
import Logo from 'components/Logo';

const { spacer } = utils;

const HomeContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: ${spacer(3)};
  text-align: center;

  svg {
    width: 20rem;
  }
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  line-height: 1.4;
  margin-bottom: ${spacer(3)};
  margin-top: 0;
  text-align: center;

  /* stylelint-disable */
  ${utils.responsive({
    lg: ` 
      font-size: 4rem;
    `,
  })};
  /* stylelint-enable */
`;

export class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  handleClickLogin = () => {
    const { dispatch } = this.props;

    dispatch(login());
  };

  render() {
    const { user } = this.props;

    return (
      <Background key="Home" data-testid="HomeWrapper">
        <HomeContainer verticalPadding>
          <Header>
            <Logo />
          </Header>
          <Heading>{config.description}</Heading>
          <Button
            animate={user.status === 'running'}
            onClick={this.handleClickLogin}
            size="xl"
            textTransform="uppercase"
            data-testid="Login"
          >
            <Icon name="sign-in" />
            <Link to="/login">
              <Text ml={2}>
                <i className="i-sign-in" />
                <span>Login/Start</span>
              </Text>
            </Link>
          </Button>
        </HomeContainer>
      </Background>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
