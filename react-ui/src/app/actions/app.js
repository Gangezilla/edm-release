import { getInit } from '../util/helpers';
import { push } from 'react-router-redux'

const updateUserInfo = (user) => ({
  type: 'UPDATE_USER',
  user,
})

const handleConfigResponse = (res) => {
  return (dispatch, getState) => {
    if (res.error) {
      dispatch(updateUserInfo(null))
    } else {
      console.log(res);
      const user = Object.assign({}, {
        email: res.email,
        firstName: res.firstName,
        id: res.id,
        surname: res.surname,
      })
      dispatch(updateUserInfo(user));
    }
  }
}

export const getInitialConfig = () => {
  return (dispatch, getState) => {
    fetch('/initial-config/', getInit)
      .then(res => res.json())
      .then(json => dispatch(handleConfigResponse(json)));
  }
}

export const loginUser = (user) => {
  return (dispatch, getState) => {
    console.log('logged in!');
    dispatch(login(user));
    dispatch(push('/user/dashboard/'));
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    fetch('/user/logout', getInit)
    .then(dispatch(logout()));
    dispatch(push('/'))
  }
}

const login = (user) => ({
  type: 'USER_LOGGED_IN',
  user,
});

export const logout = () => ({
  type: 'USER_LOGGED_OUT',
})

export const enableSpinner = () => ({
  type: 'ENABLE_SPINNER',
});

export const disableSpinner = () => ({
  type: 'DISABLE_SPINNER',
})
