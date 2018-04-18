import { enableSpinner, disableSpinner } from './app';
import { postInit } from '../util/helpers';
import { sliceImage } from './upload-image';

export const setHorizontal = () => ({
  type: 'SET_HORIZONTAL',
});

export const setVertical = () => ({
  type: 'SET_VERTICAL',
});

export const setEdit = () => ({
  type: 'SET_EDIT',
});

export const completeSlice = () => {
  return (dispatch, getState) => {
    const headers = postInit(JSON.stringify(getState().uploadImage));
    dispatch(enableSpinner());
    dispatch(sliceImage());
    fetch(`/email/slice`, headers)
      .then(res => res.text())
      .then(res => {
        console.log(res);
      })
  }
}
