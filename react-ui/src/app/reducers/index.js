import { combineReducers } from 'redux';
import app from './app';
import controls from './controls';
import imageCanvas from './image-canvas';
import logIn from './log-in';
import sidePanel from './side-panel';
import uploadImage from './upload-image';
import profile from './profile';
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  app,
  controls,
  form: formReducer,
  router: routerReducer,
  imageCanvas,
  logIn,
  profile,
  sidePanel,
  uploadImage,
});

export default rootReducer;
