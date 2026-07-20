import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import FuelService from "../../services/FuelService";

export const logFuelFill = createAsyncThunk(
  "fuel/logFuelFill",
  async ({ tripId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await FuelService.post(
        `/${tripId}/entry`,
        payload
      );

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllFuelLogs = createAsyncThunk(
  "getAllFuelLogs",
  async (tripId, { rejectWithValue }) => {
    try {
      const { data } = await FuelService.get(`/${tripId}/fuel`);
      return data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editFuelLogs = createAsyncThunk(
  "editFuelLogs",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await FuelService.put(`/${id}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
);

export const deleteFuelLogs = createAsyncThunk(
  "deleteFuelLogs",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await FuelService.delete(`/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

const FuelSlice = createSlice({
  name: "fuel",
  initialState: {
    fuelLogs: [],
    summary: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };

    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.error = null;
      switch (action.type) {
        case getAllFuelLogs.fulfilled.type:
          state.fuelLogs = action.payload?.data || [];
          state.summary = action.payload?.summary || {};
         break;
        case logFuelFill.fulfilled.type:
        case editFuelLogs.fulfilled.type:
        case deleteFuelLogs.fulfilled.type:
          break;
        default:
          break;
      }
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    [logFuelFill, getAllFuelLogs, editFuelLogs, deleteFuelLogs].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default FuelSlice.reducer;