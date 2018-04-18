import { postInit } from '../util/helpers';
import { enableSpinner, disableSpinner } from './app';
import { loginUser } from './app';

export const displayErrors = (errors) => ({
  type: 'DISPLAY_ERRORS',
  errors,
});

const displayMessage = (message) => ({
  type: 'DISPLAY_MESSAGE',
  message,
})

const handleResponse = (res) => {
  return (dispatch) => {
    dispatch(disableSpinner());
    console.log(res.user);
    if (res.type === 'login') {
      dispatch(loginUser(res.user));
    } else {
      dispatch(displayErrors(res.errors));
    }
  }
}

export const login = (values) => {
  return (dispatch, getState) => {
    const body = JSON.stringify({
      values,
    })
    const headers = postInit(body);
    dispatch(enableSpinner());
    fetch(`/user/login/`, headers)
      .then(res => res.json())
      .then(res => {
        dispatch(handleResponse(res))
      })
  }
}

export const signup = (values) => {
  return (dispatch, getState) => {
    const body = JSON.stringify({
      values,
    })
    const headers = postInit(body)
    dispatch(enableSpinner());
    fetch(`/user/sign-up/`, headers)
      .then(res => res.json())
      .then(res => {
        dispatch(handleResponse(res))
      })
  }
}

export const reset = (values) => {
  return (dispatch, getState) => {
    const body = JSON.stringify({
      values,
    })
    const headers = postInit(body)

    fetch(`/reset-password/init/`, headers)
      .then(res => res.json())
      .then(res => {
        dispatch(displayMessage(res.message));
      })
  }
}

export const signUpBoy = (mode) => {
  return (dispatch, getState) => {
    let modeType = ''
    if (mode === 'login') {
      modeType = 'login'
    } else {
      modeType = 'signup'
    }
    const values = getState().form.LogIn.values;
    const body = JSON.stringify({
      values,
      modeType,
    })
    const headers = postInit(body)

    fetch(`/user/sign-up/`, headers)
      .then(res => res.json())
      .then(res => {
        dispatch(displayErrors(res))
      })
  }
}
