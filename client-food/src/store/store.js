import { combineReducers, createStore } from 'redux';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
