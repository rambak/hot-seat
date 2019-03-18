import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/user';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import fbConfig from '../config/fbConfig';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig)
  )
);
