import { connect } from 'react-redux';
import App from '../components/app';
import {
  getInitialConfig
} from '../actions/app';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  getInitialConfig() {
    dispatch(getInitialConfig());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
