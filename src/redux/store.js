import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../redux/Auth/AuthSlice";
import VehicleReducer from "../redux/Vehicle/VehicleSlice";
import DriverReducer from "../redux/Driver/DriverSlice";
import TyreIntelligenceReducer from "../redux/TyreIntelligence/TyreIntelligenceSlice";
import Vendor from "../redux/Vendor/VendorSlice";
import VendorVehicle from "../redux/VendorVehicle/VendorVehicleSlice";
import Trip from "../redux/Trip/TripSlice";
import Customer from "../redux/Customer/CustomerSlice";
import Broker from "../redux/Broker/BrokerSlice";
import Fuel from "../redux/Fuel/FuelSlice";

const rootReducer = combineReducers({
   authAdmin: AuthReducer,
   vehicle: VehicleReducer,
   driver: DriverReducer,
   tyreIntelligence: TyreIntelligenceReducer,
   vendor: Vendor,
   vendorVehicle: VendorVehicle,
   trip : Trip,
   customer: Customer,
   broker: Broker,
   fuel: Fuel,
  
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
