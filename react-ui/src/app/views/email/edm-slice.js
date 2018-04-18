import React from 'react';
import UploadImage from '../../containers/upload-image';
import Controls from '../../containers/controls';
import ImageCanvas from '../../containers/image-canvas';
import SidePanel from '../../containers/side-panel';

function EDMSlice() {
  return (
    <div>
      <UploadImage />
      <Controls />
      <ImageCanvas />
      <SidePanel />
    </div>
  );
}

export default EDMSlice;
