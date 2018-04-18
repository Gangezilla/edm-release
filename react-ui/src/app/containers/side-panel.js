import { connect } from 'react-redux';
import SidePanel from '../components/side-panel';
import { updateSliceObject, deleteSlice } from '../actions/upload-image';
import { disableSidePanel } from '../actions/side-panel';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  slices: state.uploadImage.slicePositions,
  selectedSlice: state.sidePanel.selectedSlice,
  isPanelActive: state.sidePanel.isPanelActive,
});

const mapDispatchToProps = dispatch => ({
  updateSlice(href, title, sliceObject) {
    dispatch(updateSliceObject(href, title, sliceObject));
    dispatch(disableSidePanel());
    // dispatch(updateCOnfirmationSpinnerThing());
    // maybe a little banner or something to confirm... UX stuff comes later on in 'STYLE' phase
  },
  deleteSlice(slice) {
    dispatch(deleteSlice(slice));
  },

  closePanel() {
    dispatch(disableSidePanel());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidePanel));
