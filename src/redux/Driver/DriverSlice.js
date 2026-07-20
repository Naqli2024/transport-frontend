import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DriverService from "../../services/DriverService";
import handleApiError from "../../helpers/helperApiError";
import Cookies from "js-cookie";

export const addDriver = createAsyncThunk(
  "addDriver",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await DriverService.post(`/add-driver`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllDrivers = createAsyncThunk(
  "getAllDrivers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await DriverService.get();
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const editDriver = createAsyncThunk(
  "editDriver",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await DriverService.put(
        `/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteDriver = createAsyncThunk(
  "deleteDriver",
  async (id, { rejectWithValue }) => {
    try {
      const response = await DriverService.delete(`${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const getDriverById = createAsyncThunk(
  "getDriverByID",
  async (id, { rejectWithValue }) => {
    try {
      const response = await DriverService.get(`${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const getDriversDashboard = createAsyncThunk(
  "getDriversDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await DriverService.get('dashboard')
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)


const DriverSlice = createSlice({
  name: "driver",
  initialState: {
    drivers: [],
    summary: {},
    driverDetails: null,
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
        case getAllDrivers.fulfilled.type:
          state.drivers = action.payload?.data || [];
          break;
        case getDriversDashboard.fulfilled.type:
          state.summary = action.payload?.data?.summary || {};
          break;
        case getDriverById.fulfilled.type:
          state.driverDetails = action.payload?.data;
          break;
        case addDriver.fulfilled.type:
        case editDriver.fulfilled.type:
        case deleteDriver.fulfilled.type:
          break;
        default:
          break;
      }
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    [addDriver, getAllDrivers, editDriver, deleteDriver,getDriversDashboard,getDriverById].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default DriverSlice.reducer