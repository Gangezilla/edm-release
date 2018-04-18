import { connect } from 'react-redux';
import Controls from '../components/controls';
import {
  setHorizontal, setVertical, setEdit, completeSlice
   } from '../actions/controls';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  sliceMode: state.controls.sliceMode,
});

const mapDispatchToProps = dispatch => ({
  changeToHorizontal() {
    dispatch(setHorizontal());
  },

  changeToVertical() {
    dispatch(setVertical());
  },

  setEdit() {
    dispatch(setEdit());
  },

  completeSlice() {
    dispatch(completeSlice())
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Controls));
