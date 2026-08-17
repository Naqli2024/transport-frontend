import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import Cookies from "js-cookie";
import TripService from "../../services/TripService";
import BulkService from "../../services/BulkService";

export const addTrip = createAsyncThunk(
  "addTrip",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await TripService.post(`/create`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getAllTrips = createAsyncThunk(
  "getAllTrips",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await TripService.get();
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const editTrip = createAsyncThunk(
  "editTrip",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await TripService.put(`/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const deleteTrip = createAsyncThunk(
  "deleteTrip",
  async (id, { rejectWithValue }) => {
    try {
      const response = await TripService.delete(`${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
export const getTripById = createAsyncThunk(
  "getTripById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await TripService.get(`/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const bulkUploadDocuments = createAsyncThunk(
  "trips/bulkUploadDocuments",
  async ({ tripId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await BulkService.post(
        `/${tripId}/documents/bulk-upload`,
        payload,
      );

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getTripDocuments = createAsyncThunk(
  "trip/getTripDocuments",
  async (tripId, { rejectWithValue }) => {
    try {
      const { data } = await BulkService.get(`/${tripId}/documents`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getDriverExpenses = createAsyncThunk(
  "trip/getDriverExpenses",
  async (tripId, { rejectWithValue }) => {
    try {
      const { data } = await BulkService.get(`/${tripId}/expenses`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getWeighBridge = createAsyncThunk(
  "trip/getWeighBridge",
  async (tripId, { rejectWithValue }) => {
    try {
      const { data } = await BulkService.get(`/${tripId}/weighbridge`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getFuelEntries = createAsyncThunk(
  "trip/getFuelEntries",
  async (tripId, { rejectWithValue }) => {
    try {
      const { data } = await BulkService.get(`/${tripId}/fuel`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const closeTrip = createAsyncThunk(
  "closeTrip",
  async (id, { rejectWithValue }) => {
    try {
      const response = await TripService.put(`/${id}/close`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

const TripSlice = createSlice({
  name: "trip",
  initialState: {
    trips: [],
    tripDetail: null,
    documents: [],
    expenses: [],
    fuelEntries: [],
    weighBridge: [],
    loading: false,
    loadingDetail: false,
    uploading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state, action) => {
      switch (action.type) {
        case getAllTrips.pending.type:
          state.loading = true;
          break;

        case getTripById.pending.type:
        case getTripDocuments.pending.type:
        case getDriverExpenses.pending.type:
        case getFuelEntries.pending.type:
        case getWeighBridge.pending.type:
          state.loadingDetail = true;
          break;

        case bulkUploadDocuments.pending.type:
          state.uploading = true;
          break;

        default:
          state.loading = true;
          break;
      }
    };
    const handleFullFilled = (state, action) => {
      state.error = null;
      switch (action.type) {
        case getAllTrips.fulfilled.type:
          state.loading = false;
          state.trips = action.payload?.data || [];
          break;
        case getTripById.fulfilled.type:
          state.loadingDetail = false;
          state.tripDetail = action.payload?.data;
          break;
        case getTripDocuments.fulfilled.type:
          state.loadingDetail = false;
          state.documents = action.payload?.data || [];
          break;
        case getDriverExpenses.fulfilled.type:
          state.loadingDetail = false;
          state.expenses = action.payload?.data || [];
          break;
        case getFuelEntries.fulfilled.type:
          state.loadingDetail = false;
          state.fuelEntries = action.payload?.data || [];
          break;
        case getWeighBridge.fulfilled.type:
          state.loadingDetail = false;
          state.weighBridge = action.payload?.data || [];
          break;
        case addTrip.fulfilled.type:
        case editTrip.fulfilled.type:
        case deleteTrip.fulfilled.type:
          state.loading = false;
          break;
        case bulkUploadDocuments.fulfilled.type:
          state.uploading = false;
          break;
        default:
          state.loading = false;
          state.loadingDetail = false;
          state.uploading = false;
          break;
      }
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.loadingDetail = false;
      state.uploading = false;
      state.error = action.payload;
    };
    [
      addTrip,
      getAllTrips,
      editTrip,
      deleteTrip,
      bulkUploadDocuments,
      getTripById,
      getTripDocuments,
      getDriverExpenses,
      getWeighBridge,
      getFuelEntries,
      closeTrip,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default TripSlice.reducer;
