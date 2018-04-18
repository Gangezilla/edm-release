const sidePanel = (state, action) => {
  if (state === undefined) {
    return {
      selectedSlice: {

      },
      isPanelActive: false,
    };
  }

  switch (action.type) {
    case 'DISPATCH_UPDATE':
      return Object.assign({}, state, {
        selectedSlice: action.sliceObject,
      });

    case 'DISABLE_SIDE_PANEL':
      return Object.assign({}, state, {
        isPanelActive: false,
      });

    case 'ENABLE_SIDE_PANEL':
      return Object.assign({}, state, {
        isPanelActive: true,
      });

    case 'DELETE_SLICE':
      // lol, delete slice. i think the way to do it is to get the index, and then find the difference between
      // the adjacent slices and then bump them up to each other. we'll get it :).
      return Object.assign({}, state);

    default:
      return state;
  }
};

export default sidePanel;
