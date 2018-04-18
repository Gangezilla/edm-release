import React, { Component } from 'react';
import { Field, handleSubmit, reduxForm } from 'redux-form';
import { validators } from '../util/validations';
import { renderField } from '../util/helpers';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      mode: 'normal',
    }
  }

  changeMode(mode) {
    this.setState({
      mode: mode,
    })
  }

  submit(values) {
    const mode = this.state.mode;
    if (mode === 'reset-password') {
      this.props.resetPassword(values);
    }
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    })
  }

  submit(values) {
    this.props.resetPassword(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="profile__container">
        {this.props.message &&
          <span> {this.props.message} </span>
        }
        {this.props.error &&
          <span> {this.props.error} </span>
        }
        <span>Name: {this.props.user && `${this.props.user.firstName} ${this.props.user.surname}`}</span>
        <span>Email: {this.props.user && this.props.user.email}</span>
        {this.props.user &&
          <span> Days of trial left: </span>
        }
        <span> Subscription: ~DATE~ - ~END_DATE~ </span>
        {this.state.mode !== 'reset-password' &&
          <button onClick={() => this.changeMode('reset-password')}> Reset Password </button>
        }
        {this.state.mode === 'reset-password' &&
          <div className="profile__reset-password-container">
            <Field
              name="old-password"
              component={renderField}
              label="Old Password"
              type="password"
              validate={[validators.required]}
            />
            <Field
              name="password"
              component={renderField}
              label="New Password"
              type="password"
              onChange={this.handlePasswordChange.bind(this)}
              validate={[validators.required, validators.passwordValidation]}
            />
            <Field
              name="confirmPassword"
              component={renderField}
              label="Confirm New Password"
              type="password"
              validate={[
                validators.required,
                validators.confirmPassword(this.state.password),
              ]}
            />
            <button type="submit"   onClick={handleSubmit(this.submit)}
            >
              Reset Password
            </button>
          </div>
        }
      </div>
    );
  }
}

export default reduxForm({
  form: 'Profile',
})(Profile);

// basically show what"s in the user object we have.

// days of free trial remaining.


// purpose of profile is to show information about user account, allow someone to update and edit password, name, credit card info/billing details,

// Stripe has some npm modules you can use to make a payment happen, yeh. BUT, remember, you have a month from when you get your first customer to implement this, OTHERWISE you can just do it manually. basically, you can do it later. doesnt need to be part of MVP.
// https://stripe.com/docs/recipes/custom-checkout

// need to think about how to handle customers credit card details. i guess just chuck it all in there. i guess thats what everyone else does. additional db fields, or an additional db. PCI compliance. I don't want to go through the hell of becoming PCI compliant, but if we use stripe they tokenize the CC and then i just ping it. sounds good enough to me... Basically, spend a good day reading through the stripe docs to figure out how to do this. its another point to emphasise on the home screen too.
