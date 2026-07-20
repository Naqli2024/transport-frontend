import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TyreIntelligenceApiUrl } from "../../services/ApiUrl";
import TyreIntelligenceService from "../../services/TyreIntelligenceService";
import handleApiError from "../../helpers/helperApiError";
import Cookies from "js-cookie";

export const addTyre = createAsyncThunk(
  "addTyre",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await TyreIntelligenceService.post(`/add`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAll = createAsyncThunk(
  "getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await TyreIntelligenceService.get(`/all`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error))
    }
  }
)

export const editTyre = createAsyncThunk(
  "editTyre",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const response = await TyreIntelligenceService.put(
        `/${userId}`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const deleteTyre = createAsyncThunk(
  "deleteTyre",
  async (id, { rejectWithValue }) => {
    try {
      const response = await TyreIntelligenceService.delete(`/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)


const TyreIntelligenceSlice = createSlice({
  name: "tyreIntelligence",
  initialState: {
    tyres: [],
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
        case getAll.fulfilled.type:
          state.tyres = action.payload?.data || [];
          break;
        case addTyre.fulfilled.type:
        case editTyre.fulfilled.type:
        case deleteTyre.fulfilled.type:
          break;
        default:
          break;
      }
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    [addTyre, getAll, deleteTyre, editTyre].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default TyreIntelligenceSlice.reducer