import { connect } from 'react-redux';
import Header from '../components/header';
import { withRouter } from 'react-router-dom'
import { logoutUser } from '../actions/app';

const mapStateToProps = state => ({
  user: state.app.user,
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logoutUser());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
