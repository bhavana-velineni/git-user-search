import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
);

export default store;
