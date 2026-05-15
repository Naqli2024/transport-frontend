import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../../src/redux/Auth/AuthSlice";

const rootReducer = combineReducers({
   authAdmin: AuthReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
