import { connect } from 'react-redux';
import ImageCanvas from '../components/image-canvas';
import { updateSidePanel, enableSidePanel } from '../actions/side-panel';
import { generateSliceObject } from '../actions/upload-image';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  slicePositions: state.uploadImage.slicePositions,
  imageDimensions: state.uploadImage.imageDimensions,
  uploadedImage: state.uploadImage.uploadedImage,
  sliceMode: state.controls.sliceMode,
});

const mapDispatchToProps = dispatch => ({
  newSlice(x, y, sliceType) {
    const coords = { x, y };
    dispatch(generateSliceObject(coords, sliceType));
  },

  updateSidePanel(x, y) {
    const coords = { x, y };
    dispatch(updateSidePanel(coords));
    dispatch(enableSidePanel());
  },

  moveStart(slice, x, y) {
    console.log(slice);
    // i mean, maybe its dumb. but you could like grab the mousecoords and the slice, and then make an estimate based
    // on where it's closest tolike +/- 5 pixels and then do something based on that. might work?
  },

  moveEnd(slice, x, y) {

  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageCanvas));
