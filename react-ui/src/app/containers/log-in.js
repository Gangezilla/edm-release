import { connect } from 'react-redux';
import LogIn from '../components/log-in';
// actions
import { login, signup, reset, signUpBoy } from '../actions/log-in';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  errors: state.logIn.errors,
  message: state.logIn.message,
});

const mapDispatchToProps = dispatch => ({
  login(values) {
    dispatch(login(values));
  },

  signup(values) {
    dispatch(signup(values));
  },

  resetPassword(values) {
    dispatch(reset(values));
  },

  signUpBoy(mode) {
    dispatch(signUpBoy(mode))
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn));
