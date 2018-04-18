const app = (state, action) => {
  if (state === undefined) {
    return {
      isLoggedIn: false,
      user: null,
      spinner: false,
    }
  }

  switch (action.type) {
    case 'USER_LOGGED_IN':
      return Object.assign({}, state, {
        isLoggedIn: true,
        user: action.user,
      });

    case 'USER_LOGGED_OUT':
      return Object.assign({}, state, {
        isLoggedIn: false,
        user: null,
      });

    case 'UPDATE_USER':
    console.log(action);
      return Object.assign({}, state, {
        user: action.user,
      });

    case 'ENABLE_SPINNER':
      return Object.assign({}, state, {
        spinner: true,
      });

    case 'DISABLE_SPINNER':
      return Object.assign({}, state, {
        spinner: false,
      })

    default:
      return state;
  }
};

export default app;
