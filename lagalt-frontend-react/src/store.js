import { createStore } from "redux";
import cartReducer from "./reducers/TestReducers";

const store = createStore(cartReducer);

export default store;