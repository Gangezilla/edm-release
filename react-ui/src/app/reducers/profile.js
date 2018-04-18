const profile = (state, action) => {
  if (state === undefined) {
    return {
      error: null,
      message: null,
    };
  }

  switch (action.type) {
    case 'DISPLAY_ERROR':
      console.log(action);
      return Object.assign({}, state, {
        error: action.error,
        message: null,
      });

    case 'DISPLAY_MESSAGE':
      return Object.assign({}, state, {
        error: null,
        message: action.message,
      })

      default:
        return state;
    }
};

export default profile;
