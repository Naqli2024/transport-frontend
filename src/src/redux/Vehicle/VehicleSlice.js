import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import handleApiError from "../../helpers/helperApiError";
import VehicleService from "../../services/VehicleService";
import BulkVehicleService from "../../services/BulkVehicleService";


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

export const uploadVehicleDocs = createAsyncThunk(
  "uploadVehicleDocs",
  async ({ vehicleId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await BulkVehicleService.post(`/${vehicleId}/documents`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateVehicleDocs = createAsyncThunk(
  "updateVehicleDocs",
  async ({ docId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await BulkVehicleService.put(`/documents/${docId}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getVehicleDocs = createAsyncThunk(
  "getVehicleDocs",
  async (vehicleId, { rejectWithValue }) => {
    try {
      const { data } = await BulkVehicleService.get(`/${vehicleId}/documents`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteVehicleDoc = createAsyncThunk(
  "deleteVehicleDoc",
  async (docId, { rejectWithValue }) => {
    try {
      const response = await BulkVehicleService.delete(`/documents/${docId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const VehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicles: [],
    vehicleDocs: [],   
    summary: {},
    busFleet: {},
    busRoutes: [],
    busCompliance: {},
    loading: false,
    loadingVehicle: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state, action) => {
      if (action.type === getAllVehicles.pending.type) {
        state.loadingVehicle = true;
      } else {
        state.loading = true;
      }
    };
    const handleFullFilled = (state, action) => {
      if (action.type === getAllVehicles.fulfilled.type) {
        state.loadingVehicle = false;
      } else {
        state.loading = false;
      }

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

        case getVehicleDocs.fulfilled.type:
          state.vehicleDocs = action.payload?.data || [];
          break;

        case uploadVehicleDocs.fulfilled.type:
          state.vehicleDocs.push(action.payload?.data);
          break;

        case updateVehicleDocs.fulfilled.type:
          state.vehicleDocs = state.vehicleDocs.map((doc) =>
            doc._id === action.payload?.data?._id ? action.payload.data : doc
          );
          break;

        case deleteVehicleDoc.fulfilled.type:
          state.vehicleDocs = state.vehicleDocs.filter(
            (doc) => doc._id !== action.meta.arg
          );
          break;

        case addVehicle.fulfilled.type:
        case deleteVehicle.fulfilled.type:
          break;

        default:
          break;
      }
    };
    const handleRejected = (state, action) => {
      if (action.type === getAllVehicles.rejected.type) {
        state.loadingVehicle = false;
      } else {
        state.loading = false;
      }

      state.error = action.payload;
    };
    [
      addVehicle,
      getAllVehicles,
      deleteVehicle,
      editVehicle,
      getEquipmentDashboard,
      getBusFleetDashboard,
      getBusRoutes,
      getBusCompliance,
      uploadVehicleDocs,
      updateVehicleDocs,
      getVehicleDocs,
      deleteVehicleDoc,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default VehicleSlice.reducer