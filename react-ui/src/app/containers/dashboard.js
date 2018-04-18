import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';
import { withRouter } from 'react-router-dom'
import { email, profile, viewHistory } from '../actions/dashboard';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  createEmail() {
    dispatch(email());
  },

  viewProfile() {
    dispatch(profile());
  },

  viewEmails() {
    dispatch(viewHistory());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
