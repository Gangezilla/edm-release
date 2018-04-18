import { isPointInRect } from '../util/helpers';

// Should REALLY double check if a user has put in a http:// in here, for example.

const dispatchUpdate = sliceObject => ({
  type: 'DISPATCH_UPDATE',
  sliceObject,
});

export const updateSidePanel = (coords) => {
  return (dispatch, getState) => {
    const slices = getState().uploadImage.slicePositions;
    const checkPoints = slices.map(slice => isPointInRect(coords, slice));
    const sliceObject = slices[checkPoints.indexOf(true)];
    dispatch(dispatchUpdate(sliceObject));
  };
};

export const disableSidePanel = () => ({
  type: 'DISABLE_SIDE_PANEL',
});

export const enableSidePanel = () => ({
  type: 'ENABLE_SIDE_PANEL',
});

export default updateSidePanel;
