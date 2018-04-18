import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../app/reducers/index';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

const persistedState = localStorage.getItem('EDM-Builder') ? JSON.parse(localStorage.getItem('EDM-Builder')) : {}

// probs need to configure this to only remember things like the slicer, but who knows. think about it later.

export const history = createHistory();

const middleware = routerMiddleware(history);

export default initialState => (
    createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk, middleware))
);
