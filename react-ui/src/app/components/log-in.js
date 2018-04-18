import React, { Component } from 'react';
import { Field, handleSubmit, reduxForm } from 'redux-form';
import { validators } from '../util/validations';
import { renderField } from '../util/helpers';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      mode: 'Log In',
    };
  }

  changeMode(mode) {
    this.setState(
      {
        mode: mode,
      }
    )
  }

  submit(values) {
    const mode = this.state.mode;
    if (mode === 'Log In') {
      this.props.login(values);
    } else if (mode === 'Sign Up') {
      this.props.signup(values);
    } else if (mode === 'Reset Password') {
      this.changeMode('Log In');
      this.props.resetPassword(values);
    }
	}

  renderEmailField() {
    return (
      <Field
        name='email'
        component={renderField}
        label='Email Address'
        validate={[validators.required, validators.email]}
      />
    )
  }

  renderPasswordField() {
    return (
      <Field
        name='password'
        component={renderField}
        label='Password'
        type='password'
        validate={validators.required}
      />
    )
  }

  renderSignup() {
    return (
      <div>
        <a onClick={() => this.changeMode('Reset Password')}>
          Need to reset your password?
        </a>
        <div className='login__signup-only'>
          <a onClick={() => this.changeMode('Log In')}> Actually, I do have an account </a>
          <Field
            name='firstName'
            component={renderField}
            label='First Name'
            validate={validators.required}
          />
          <Field
            name='surname'
            component={renderField}
            label='Surname'
            validate={validators.required}
          />
          {this.renderEmailField()}
          {this.renderPasswordField()}
        </div>
      </div>
    );
  }

  renderLogin() {
    return (
      <div>
        <a onClick={() => this.changeMode('Reset Password')}>
          Need to reset your password?
        </a>
        <a onClick={() => this.changeMode('Sign Up')}>
          Need to sign up?
        </a>
        {this.renderEmailField()}
        {this.renderPasswordField()}
      </div>
    );
  }

  renderReset() {
    return (
      <div>
        <a onClick={() => this.changeMode('Log In')}>
          Need to log in?
        </a>
        {this.renderEmailField()}
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='login-container'>
        <div className='login-errors'>
          {this.props.errors && this.props.errors.map(error =>
            <span key={error}> {error} </span>
          )}
          {this.props.message &&
            <span>{this.props.message}</span>
          }
        </div>
        <div className='login-existing'>
          <p> Already have an account? Sign in below. </p>
          <div className='login__all-modes'>
            {this.state.mode === 'Log In' && this.renderLogin()}
            {this.state.mode === 'Sign Up' && this.renderSignup()}
            {this.state.mode === 'Reset Password' && this.renderReset()}
            <button type='submit'
              onClick={handleSubmit(this.submit)}
            >
              {this.state.mode}
            </button>
            <button onClick={() => this.props.signUpBoy(this.state.mode)}>
              SIGN UP BOY
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
	form: 'LogIn',
})(LogIn);
