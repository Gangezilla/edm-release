import { connect } from 'react-redux';
import Profile from '../components/profile';
import { withRouter } from 'react-router-dom'
import { reset } from '../actions/profile';

const mapStateToProps = state => ({
  user: state.app.user,
  error: state.profile.error,
  message: state.profile.message,
});

const mapDispatchToProps = dispatch => ({
  resetPassword(values) {
    dispatch(reset(values));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
