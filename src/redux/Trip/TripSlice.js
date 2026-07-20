import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TyreIntelligenceApiUrl } from "../../services/ApiUrl";
import TyreIntelligenceService from "../../services/TyreIntelligenceService";
import handleApiError from "../../helpers/helperApiError";
import Cookies from "js-cookie";
import TripService from "../../services/TripService";

export const addTrip = createAsyncThunk(
  "addTrip",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await TripService.post(`/create`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
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
  }
)

export const uploadTripDocuments = createAsyncThunk(
  "uploadTripDocuments",
  async ({ id, formData }, { rejectWithValue }) => {
    console.log("Uploading for:", id);

    try {
      const { data } = await TripService.post(
        `/${id}/documents`,
        formData
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editTrip = createAsyncThunk(
  "editTrip",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await TripService.put(
        `/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const deleteTrip = createAsyncThunk(
  "deleteTrip",
  async (id, { rejectWithValue }) => {
    try {
      const response = await TripService.delete(`${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)





const TripSlice = createSlice({
  name: "trip",
  initialState: {
    trips: [],
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
        case getAllTrips.fulfilled.type:
          state.trips = action.payload?.data || [];
          break;
        case addTrip.fulfilled.type:
        case editTrip.fulfilled.type:
        case deleteTrip.fulfilled.type:
        case uploadTripDocuments.fulfilled.type:
          break;
        default:
          break;
      }
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    [addTrip, getAllTrips, editTrip, deleteTrip,uploadTripDocuments].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default TripSlice.reducer