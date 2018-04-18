const controls = (state, action) => {
  if (state === undefined) {
    return {
      sliceMode: 'horizontal',
    };
  }

  switch (action.type) {

    case 'SET_HORIZONTAL':
      return Object.assign({}, state, {
        sliceMode: 'horizontal',
      });

    case 'SET_VERTICAL':
      return Object.assign({}, state, {
        sliceMode: 'vertical',
      });

    case 'SET_EDIT':
      return Object.assign({}, state, {
        sliceMode: 'edit',
      });

    default:
      return state;
  }
};

export default controls;
