import { combineReducers, createStore } from "redux";

import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer,
   product: productReducer,
});

const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
