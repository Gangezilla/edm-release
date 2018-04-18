import { connect } from 'react-redux';
import ResetPassword from '../components/reset-password';
import { resetPasswordFetch, checkIfValidFetch } from '../actions/reset-password';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  resetPassword(values, id) {
    console.log(values);
    dispatch(resetPasswordFetch(values, id));
  },

  checkIfValid(id) {
    dispatch(checkIfValidFetch(id));
  }
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword));
