import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import handleApiError from "../../helpers/helperApiError";
import VehicleService from "../../services/VehicleService";


export const addVehicle = createAsyncThunk(
  "addVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await VehicleService.post(`/add-vehicle`,payload);
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


const VehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    admin: null,
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
      state.admin = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.admin = null;
      state.error = action.payload;
    };
    [addVehicle, getAllVehicles].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default VehicleSlice.reducer