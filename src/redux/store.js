import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../redux/Auth/AuthSlice";
import VehicleReducer from "../redux/Vehicle/VehicleSlice";
import DriverReducer from "../redux/Driver/DriverSlice";

const rootReducer = combineReducers({
   authAdmin: AuthReducer,
   vehicle: VehicleReducer,
   driver: DriverReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
