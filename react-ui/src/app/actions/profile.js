import { postInit } from '../util/helpers';
import { enableSpinner, disableSpinner } from './app';

const handleResponse = (res) => {
  return (dispatch, getState) => {
    dispatch(disableSpinner());
    if(res.error) {
      dispatch(sendError(res.error));
    }
    else {
      dispatch(sendMessage(res.message));
    }
  }
}

const sendMessage = (message) => ({
  type: 'DISPLAY_MESSAGE',
  message,
});

const sendError = (error) => ({
  type: 'DISPLAY_ERROR',
  error,
})

export const reset = (values) => {
  return (dispatch, getState) => {
    console.log(values);
    if (values.password !== values.confirmPassword) {
      return dispatch(sendError({
        error: 'Something went wrong. Please try again.'
      }));
    }
    const body = JSON.stringify({
      values,
    });
    const headers = postInit(body);
    dispatch(enableSpinner());
    fetch('/user/profile/reset-password', headers)
      .then(res => res.json())
      .then(json => dispatch(handleResponse(json)));
  }
}
