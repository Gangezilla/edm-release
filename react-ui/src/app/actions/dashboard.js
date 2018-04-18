// email, profile, viewHistory
import { push } from 'react-router-redux';

export const email = () => {
  return (dispatch) => {
    dispatch(push('/email/create/'))
  }
}

export const profile = () => {
  return (dispatch) => {
    dispatch(push('/user/profile/'));
  }
}

export const viewHistory = () => {
  return (dispatch) => {
    dispatch(push('/user/history'));
  }
}
