import { postInit } from '../util/helpers';
import { push } from 'react-router-redux';
import { displayErrors } from './log-in';
import { enableSpinner, disableSpinner } from './app';

const handleResponse = res => {
  console.log(res);
  return (dispatch) => {
    dispatch(disableSpinner());
    if(res.errors) {
      dispatch(displayErrors(res.errors));
      dispatch(push('/users/log-in/'));
    }
  }
}

// checks to see if the token is till valid.
export const checkIfValidFetch = (id) => {
  return (dispatch, getState) => {
    const body = JSON.stringify({
      id,
    });
    const headers = postInit(body);
    fetch('/reset-password/check/', headers)
      .then(res => res.json())
      .then(res => dispatch(handleResponse(res)));
  }
}

export const resetPasswordFetch = (password, id) => {
  return (dispatch, getState) => {
    const values = Object.assign({}, {
      password,
      id,
    });
    const body = JSON.stringify({
      values,
    });
    const headers = postInit(body);
    dispatch(enableSpinner());
    fetch('/reset-password/', headers)
      .then(res => push('/users/log-in/'));
  }
}
