const logIn = (state, action) => {
  if (state === undefined) {
    return {
      errors: [],
    };
  }

  switch (action.type) {
    case 'DISPLAY_ERRORS':
      console.log(action);
      return Object.assign({}, state, {
        errors: action.errors,
      });

    case 'DISPLAY_MESSAGE':
      return Object.assign({}, state, {
        message: action.message,
      })

      default:
        return state;
    }
};

export default logIn;
