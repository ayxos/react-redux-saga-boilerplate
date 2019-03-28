import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback,
  Alert,
} from 'reactstrap';
import Logo from 'components/Logo';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: {
        emailState: '',
      },
      forgot: false,
    };
  }

  static propTypes = {
    error: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    t: PropTypes.func,
  };

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }
    this.setState({ validate });
  }

  handleChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  };

  submitForm(e) {
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    onSubmit(email, password);
  }

  render() {
    const { t, error } = this.props;
    const { email, password, validate, forgot } = this.state;
    const emailField = (
      <Col>
        <FormGroup>
          <Label>{t('translate.publisherUser')}</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder={t('translate.email')}
            value={email}
            valid={validate.emailState === 'has-success'}
            invalid={validate.emailState === 'has-danger'}
            onChange={e => {
              this.validateEmail(e);
              this.handleChange(e);
            }}
          />
          {error && (
            <Alert color="danger">{error.email ? error.email[0] : JSON.stringify(error)}</Alert>
          )}
          <FormFeedback valid>{t('translate.accountValid')}</FormFeedback>
          <FormFeedback>{t('translate.accountInvalid')}</FormFeedback>
          <FormText>{t('translate.email')}</FormText>
        </FormGroup>
      </Col>
    );
    return (
      <Container className="loginapp">
        <h3>{t(!forgot ? 'translate.login' : 'translate.forgotPasswordTitle')}</h3>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          {emailField}
          {!forgot && (
            <Col>
              <FormGroup>
                <Label for="examplePassword">{t('translate.password')}</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                  value={password}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
          )}
          <Button color="link" onClick={() => this.setState({ forgot: !forgot })}>
            {t(!forgot ? 'translate.forgotPassword' : 'translate.back')}
          </Button>
          <Button color="primary btn-display">
            {t(!forgot ? 'translate.submit' : 'translate.newPassword')}
          </Button>
        </Form>
        <footer className="login-footer">
          {' '}
          <Logo width="10" />
        </footer>
      </Container>
    );
  }
}

export default withNamespaces()(LoginForm);
