import {combineReducers}  from 'redux';
import {persistReducer} from 'redux-persist';
// storage is actually our window's localStorage
import storage from 'redux-persist/lib/storage';


import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop//shop.reducer';

//define a new persist config
const persistConfig = {
  //key, at what point in our reduce obj do we want to start storing
  key: 'root',
  storage: storage,
  //array containing str name of any reducer we want to store
  whitelist: ['cart']

}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer);