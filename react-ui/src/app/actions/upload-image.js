import { isPointInRect, postInit } from '../util/helpers';
import imageToSlices from 'image-to-slices';
import browserImageSize from 'browser-image-size';
import uuidV1 from 'uuid/v1';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const zip = new JSZip();

const uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);

// function that will zip the image slices, and then display that zip on screen, which someone can then dl.
// need to convert blobs into actual images too.

const zipBlobs = (blob, fileName) => {
  console.log('zipping file');
  zip.file(new File([blob], "name"));
};

const handleBlobs = (blobs) => {
  const imageArray = [];
  // blobs.map(blob => imageArray.push(blobToFile(blob)));
  blobs.map(blob => zipBlobs(blob))
  console.log(zip);
  // blobs.map(blob => zip.file(blob, 'name'));
  
  zip.generateAsync({type:"base64"})
  .then((content) => {
      // see FileSaver.js
      // console.log(content);
      // FileSaver.saveAs(content, "example.zip");
  });

 // map over blobs, put them into blobToFile and make them into images.
};

export const sliceImage = () => {
  return (dispatch, getState) => {
    const state = getState();
    const image = getState().uploadImage.uploadedImage;
    const slicePositions = getState().uploadImage.slicePositions;
    const lines = Object.assign({}, {
      lineXArray: [],
      lineYArray: [],
    });
    slicePositions.forEach(function(slice) {
      lines.lineXArray.push(slice.x2);
      lines.lineYArray.push(slice.y2);
    });
    lines.lineXArray = uniq(lines.lineXArray);
    lines.lineYArray = uniq(lines.lineYArray);

    imageToSlices(image.preview, lines.lineXArray, lines.lineYArray, {
      saveToDataUrl: true
    }, (imgBlobs) => {
      handleBlobs(imgBlobs);
      // const body = JSON.stringify({
      //   imgBlobs,
      // });
      // const headers = postInit(body);
      // fetch('/email/slice-image', headers)
        // .then(res => res.json());
        // .then(res => console.log(res.text()))
    });
  }
}

// in here, lets not send to server. lets slice the images up here, zip them, put the zip in state
// (if we can do that) then serve to custie. in V2, we can send the gzipped version to the server, but as it is
// the images are too big and take up too much room...

const saveImageToState = (image, size) => ({
  type: 'SAVE_IMAGE',
  image,
  size,
  id: uuidV1(),
});

export const saveImage = (image) => {
  return (dispatch) => {
    browserImageSize(image[0])
      .then(size =>
        dispatch(saveImageToState(image[0], size)),
      );
    // LATER you need to send the image to the server at this point in time too.
    // ALSO, it'll be hella easy to save the Redux state locally here, and then serve that back to custie.
  };
};

const splitIndex = (slice, sliceType, point) => {
  let newRectOne = {};
  let newRectTwo = {};
  if (sliceType === 'horizontal') {
    newRectOne = {
      x1: slice.x1,
      y1: slice.y1,
      x2: slice.x2,
      y2: point.y,
      id: uuidV1(),
      href: '',
      title: '',
      height: point.y - slice.y1,
      width: slice.x2 - slice.x1,
      sliceType: 'horizontal',
    };
    newRectTwo = {
      x1: slice.x1,
      y1: point.y + 1,
      x2: slice.x2,
      y2: slice.y2,
      id: uuidV1(),
      href: '',
      title: '',
      height: slice.y2 - (point.y + 1),
      width: slice.x2 - slice.x1,
      sliceType: 'horizontal',
    };
  }
  if (sliceType === 'vertical') {
    newRectOne = {
      x1: slice.x1,
      y1: slice.y1,
      x2: point.x,
      y2: slice.y2,
      id: uuidV1(),
      href: '',
      title: '',
      height: slice.y2 - slice.y1,
      width: point.x - slice.x1,
      sliceType: 'vertical',
    };
    newRectTwo = {
      x1: point.x + 1,
      y1: slice.y1,
      x2: slice.x2,
      y2: slice.y2,
      id: uuidV1(),
      href: '',
      title: '',
      height: slice.y2 - slice.y1,
      width: slice.x2 - (point.x + 1),
      sliceType: 'vertical',
    };
  }
  return [newRectOne, newRectTwo];
};

const insertSlice = (slices, sliceIndex) => ({
  type: 'INSERT_SLICE',
  slices,
  sliceIndex,
});

export const generateSliceObject = (point, sliceType) => {
  return (dispatch, getState) => {
    // come back and optimise later on, exit when true is received, not at end of array.
    const slices = getState().uploadImage.slicePositions;
    const checkPoints = slices.map(slice => isPointInRect(point, slice));
    const sliceObject = slices[checkPoints.indexOf(true)];
    const newEntry = splitIndex(sliceObject, sliceType, point);
    const sliceIndex = slices.indexOf(sliceObject);
    dispatch(insertSlice(newEntry, sliceIndex, sliceType));
  };
};

export const updateSliceObject = (href, title, sliceObject) => ({
  type: 'UPDATE_SLICE',
  sliceObject,
  href,
  title,
});

const replaceSlice = (newSlice, neighbour) => ({
  type: 'REPLACE_SLICE',
  newSlice,
  neighbour,
});

const deleteSliceDispatch = slice => ({
  type: 'DELETE_SLICE',
  slice,
});

export const deleteSlice = (slice) => {
  // will need to test this agian later when we resolved mouse tracking bugs.
  return (dispatch, getState) => {
    const slices = getState().uploadImage.slicePositions;
    const sliceIndex = slices.indexOf(slice);
    // get the neighbour.
    let neighbour;
    let newSlice;
    if (slices[sliceIndex - 1] === undefined) {
      neighbour = slices[sliceIndex + 1];
    } else {
      neighbour = slices[sliceIndex - 1];
    }
    if (neighbour.sliceType === slice.sliceType && sliceIndex !== slices.length - 1) {
      neighbour = slices[sliceIndex + 1];
    }
    if (slice.sliceType === 'horizontal') {
      newSlice = Object.assign({}, neighbour, {
        y1: slice.y1,
      });
    } else {
      newSlice = Object.assign({}, neighbour, {
        x1: slice.x1,
      });
    }
    newSlice.height = newSlice.y2 - newSlice.y1;
    newSlice.width = newSlice.x2 - newSlice.x1;
    dispatch(replaceSlice(newSlice, neighbour));
    dispatch(deleteSliceDispatch(slice));
  };
};

export default saveImage;
