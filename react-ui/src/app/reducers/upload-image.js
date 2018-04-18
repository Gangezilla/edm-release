const uploadImage = (state, action) => {
  if (state === undefined) {
    return {
      uploadedImage: '',
      imageDimensions: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        height: 0,
        width: 0,
      },
      slicePositions: [],
    };
  }

  let slices = Object.assign([], state.slicePositions);
  let sliceIndex = 0;

  switch (action.type) {
    case 'SAVE_IMAGE':
      return Object.assign({}, state, {
        uploadedImage: action.image,
        imageDimensions: {
          x1: 0,
          y1: 0,
          x2: action.size.width,
          y2: action.size.height,
          height: action.size.height,
          width: action.size.width,
        },
        slicePositions: [{
          x1: 0,
          y1: 0,
          x2: action.size.width,
          y2: action.size.height,
          height: action.size.height,
          width: action.size.width,
          href: '',
          title: '',
          id: action.id,
        }],
      });

    case 'INSERT_SLICE':
      if (slices.length === 1) {
        slices = action.slices;
      } else {
        slices.splice(action.sliceIndex, 1, ...action.slices);
      }
      return Object.assign({}, state, {
        slicePositions: slices,
      });

    case 'UPDATE_SLICE':
      sliceIndex = slices.indexOf(action.sliceObject);
      const newSlice = Object.assign({}, action.sliceObject);
      if (action.href) {
        newSlice.href = action.href;
      }
      if (action.title) {
        newSlice.title = action.title;
      }
      slices[sliceIndex] = newSlice;
      return Object.assign({}, state, {
        slicePositions: slices,
      });

    case 'REPLACE_SLICE':
      // Replace slice needs to get all slices, then needs to get neighbour and replace it with the newSlice.
      sliceIndex = slices.indexOf(action.neighbour);
      slices[sliceIndex] = action.newSlice;
      return Object.assign({}, state, {
        slicePositions: slices,
      });

    case 'DELETE_SLICE':
      sliceIndex = slices.indexOf(action.slice);
      console.log(sliceIndex);
      const newSlices = [
        ...slices.slice(0, sliceIndex),
        ...slices.slice(sliceIndex + 1),
      ];
      console.log(newSlices);
      return Object.assign({}, state, {
        slicePositions: newSlices,
      });

    default:
      return state;
  }
};

export default uploadImage;
