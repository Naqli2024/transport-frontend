import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LocationService from "../services/LocationService";
import handleApiError from "../helpers/helperApiError";
import Cookies from "js-cookie";

// ADD LOCATION
export const addLocation = createAsyncThunk(
  "location/addLocation",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await LocationService.post("/add", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// GET LOCATIONS
export const getLocation = createAsyncThunk(
  "location/getLocation",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await LocationService.get();
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const LocationSlice = createSlice({
  name: "location",

  initialState: {
    location: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET LOCATIONS
      .addCase(getLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.location = action.payload?.data || [];
      })

      .addCase(getLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD LOCATION
      .addCase(addLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newLocation = action.payload?.data;

        if (newLocation) {
          state.location.push(newLocation);
        }
      })

      .addCase(addLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default LocationSlice.reducer;