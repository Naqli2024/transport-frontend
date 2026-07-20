import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import handleApiError from "../../helpers/helperApiError";
import VehicleService from "../../services/VehicleService";


export const addVehicle = createAsyncThunk(
  "addVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await VehicleService.post(`/add-vehicle`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllVehicles = createAsyncThunk(
  "getAllVehicles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VehicleService.get();
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  "deleteVehicle",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await VehicleService.delete(`/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editVehicle = createAsyncThunk(
  "editVehicle",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const response = await VehicleService.put(
        `/${userId}`,
        payload
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getEquipmentDashboard = createAsyncThunk(
  "getEquipmentDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VehicleService.get('/equipment-dashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getBusFleetDashboard = createAsyncThunk(
  "getBusFleetDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VehicleService.get(`/bus-fleet`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getBusRoutes = createAsyncThunk(
  "getBusRoutes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VehicleService.get(`/bus-routes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const getBusCompliance = createAsyncThunk(
  "getBusCompliance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VehicleService.get(`/bus-compliance`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

const VehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicles: [],
    summary: {},
    busFleet: {},
    busRoutes: [],
    busCompliance: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFullFilled = (state, action) => {
      state.loading = false;
      state.error = null;
      switch (action.type) {
        case getAllVehicles.fulfilled.type:
          state.vehicles = action.payload?.data || [];
          break;
        case getEquipmentDashboard.fulfilled.type:
          state.summary = action.payload?.data?.summary || {};
          break;
        case getBusFleetDashboard.fulfilled.type:
          state.busFleet = action.payload?.data?.summary || {};
          break;
        case getBusRoutes.fulfilled.type:
          state.busRoutes = action.payload;
          break;
        case getBusCompliance.fulfilled.type:
           state.busCompliance = action.payload;
          break;
        case addVehicle.fulfilled.type:
        case deleteVehicle.fulfilled.type:
          break;
        default:
          break;
      }
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    [addVehicle, getAllVehicles, deleteVehicle, editVehicle, getEquipmentDashboard, getBusFleetDashboard, getBusRoutes, getBusCompliance].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default VehicleSlice.reducer