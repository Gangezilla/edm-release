import { connect } from 'react-redux';
import Spinner from '../components/spinner';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  spinner: state.app.spinner,
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Spinner));
