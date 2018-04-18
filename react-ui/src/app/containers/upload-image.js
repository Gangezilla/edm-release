import { connect } from 'react-redux';
import UploadImage from '../components/upload-image';
import { saveImage } from '../actions/upload-image';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  uploadedImage: state.uploadImage.uploadedImage,
});

const mapDispatchToProps = dispatch => ({
  onDrop(acceptedFiles) {
    setTimeout(() => {
      dispatch(saveImage(acceptedFiles));
    }, 200);
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadImage));
