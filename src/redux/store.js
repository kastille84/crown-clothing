import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';

import rootReducer from './root-reducer';

//set up middlewares

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

//it's a persisted version of our store
const persistor = persistStore(store);

export default {store, persistor};