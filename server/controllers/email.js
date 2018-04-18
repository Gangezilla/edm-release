const imageToSlices = require('image-to-slices');
const Canvas = require('canvas')
const logger = require('../config/log');

// imageToSlices.configure({clipperOptions: {canvas: require('canvas')}});

// function uniq(a) {
//     return a.sort().filter(function(item, pos, ary) {
//         return !pos || item != ary[pos - 1];
//     })
// }

// const uniq = (a) => {
//   Array.from(new Set(a));
// }

var uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

// const sliceImage = (uploadedImage, slicePositions, success, failure) => {
//   const lines = Object.assign({}, {
//     lineXArray: [],
//     lineYArray: [],
//   })
//   logger.info(slicePositions);
//   slicePositions.map(slice => {
//     lines.lineXArray.push(slice.x2);
//     lines.lineYArray.push(slice.y2);
//   });
//   lines.lineXArray = uniq(lines.lineXArray);
//   lines.lineYArray = uniq(lines.lineYArray);
//   logger.info(lines);
//   logger.info(uploadedImage);
//   logger.info(lines.lineXArray);
//   logger.info(lines.lineYArray);
//   var source = './image/doglover.jpg';

//   imageToSlices(uploadedImage.preview, lines.lineXArray, lines.lineYArray, {
//     saveToDir: './image/'
//   }, function() {
//       console.log('the source image has been sliced!');
//   });
// };
const generateImages = (imgBlobs) => {
  console.log(imgBlobs);
};

const generateHTML = (imageDimensions, slicePositions, success, failure) => {

};

module.exports = {
  generateImages,
  generateHTML,
}
