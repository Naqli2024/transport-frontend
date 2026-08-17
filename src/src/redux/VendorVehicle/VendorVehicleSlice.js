import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import VendorVehicleService from "../../services/VendorVehicleService";

export const addVendorVehicle = createAsyncThunk(
  "addVendorVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await VendorVehicleService.post("/add", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editVendorVehicle = createAsyncThunk(
  "editVendorVehicle",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const response = await VendorVehicleService.put(`/${userId}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllVendorVehicles = createAsyncThunk(
  "getAllVendorVehicles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await VendorVehicleService.get();
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteVendorVehicle = createAsyncThunk(
  "deleteVendorVehicle",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await VendorVehicleService.delete(`/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const VendorVehicleSlice = createSlice({
  name: "vendorVehicle",
  initialState: {
    vendorVehicle: [],
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

      if (action.type === getAllVendorVehicles.fulfilled.type) {
        state.vendorVehicle = action.payload.data;
      }
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    [
      getAllVendorVehicles,
      addVendorVehicle,
      editVendorVehicle,
      deleteVendorVehicle,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default VendorVehicleSlice.reducer;