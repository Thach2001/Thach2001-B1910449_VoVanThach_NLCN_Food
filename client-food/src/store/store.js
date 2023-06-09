import { combineReducers, createStore } from 'redux';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    contact: contactReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
