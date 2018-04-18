import React, { Component } from 'react';
import { Field, handleSubmit, reduxForm } from 'redux-form';
import { validators } from '../util/validations';
import { renderField } from '../util/helpers';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      password: '',
    }
  }

  componentWillMount() {
    // need to check if this page is still valid.
    this.props.checkIfValid(this.props.id);
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    })
  }

  submit(values) {
    this.props.resetPassword(values, this.props.id);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="reset-password__container">
        <Field
          name="password"
          component={renderField}
          label="Password"
          type="password"
          onChange={this.handlePasswordChange.bind(this)}
          validate={[validators.required, validators.passwordValidation]}
        />
        <Field
          name="confirmPassword"
          component={renderField}
          label="Confirm Password"
          type="password"
          validate={[
            validators.required,
            validators.confirmPassword(this.state.password),
          ]}
        />
        <button type="submit"
          onClick={handleSubmit(this.submit)}
        >
          Reset Password
        </button>
      </div>
    );
  }
}

export default reduxForm({
  form: 'ResetPassword',
})(ResetPassword);
