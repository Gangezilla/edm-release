import React from 'react';

const Dropzone = require('react-dropzone');

function UploadImage(props) {
  return (
    <div>
      <Dropzone onDrop={props.onDrop}>
        <div>Upload your image!</div>
      </Dropzone>
    </div>
  );
}

export default UploadImage;
