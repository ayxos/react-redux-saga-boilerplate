import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import LoadingButton from './LoadingButton';

import {changeForm} from '../../actions';

import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this._onSubmit = this._onSubmit.bind(this)
    this._changeUsername = this._changeUsername.bind(this)
    this._changePassword = this._changePassword.bind(this)
  }
  render () {
    const {error} = this.props

    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 1 }}> 
            <Form className='form' onSubmit={this._onSubmit}>
              {error ? <ErrorMessage error={error} /> : null}
              <FormGroup row>
                <Label className='form__field-label' htmlFor='username'>
                  Username
                </Label>
                <Input
                  className='form__field-input'
                  type='text'
                  id='username'
                  value={this.props.data.username}
                  placeholder='frank.underwood'
                  onChange={this._changeUsername}
                  autoCorrect='off'
                  autoCapitalize='off'
                  spellCheck='false' />
              </FormGroup>
              <FormGroup row>
                <Label className='form__field-label' htmlFor='password'>
                  Password
                </Label>
                <Input
                  className='form__field-input'
                  id='password'
                  type='password'
                  value={this.props.data.password}
                  placeholder='••••••••••'
                  onChange={this._changePassword} />
              </FormGroup>
              <FormGroup>
                {this.props.currentlySending ? (
                  <LoadingButton />
                ) : (
                  <button className='form__submit-btn' type='submit'>
                    {this.props.btnText}
                  </button>
                  )}
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>

    )
  }

  _changeUsername (event) {
    this._emitChange({...this.props.data, username: event.target.value})
  }

  _changePassword (event) {
    this._emitChange({...this.props.data, password: event.target.value})
  }

  _emitChange (newFormState) {
    this.props.dispatch(changeForm(newFormState))
  }

  _onSubmit (event) {
    console.log('WTF')
    event.preventDefault()
    this.props.onSubmit(this.props.data.username, this.props.data.password)
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  changeForm: PropTypes.func,
  btnText: PropTypes.string,
  error: PropTypes.string,
  currentlySending: PropTypes.bool
}

export default LoginForm