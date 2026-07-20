import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BrokerService from "../../services/BrokerService";
import handleApiError from "../../helpers/helperApiError";
import Cookies from "js-cookie";

export const addBroker = createAsyncThunk(
  "addBroker",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await BrokerService.post(`/create`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllBrokers = createAsyncThunk(
  "getAllBrokers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await BrokerService.get();
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const editBroker = createAsyncThunk(
  "editBroker",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await BrokerService.put(
        `/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteBroker = createAsyncThunk(
  "deleteBroker",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BrokerService.delete(`/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)


export const getBrokerById = createAsyncThunk(
  "getBrokerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BrokerService.get(`/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const getBrokerDashboard = createAsyncThunk(
  "getBrokerDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await BrokerService.get('/dashboard')
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

const BrokerSlice = createSlice({
  name: "broker",
  initialState: {
    brokers: [],
    summary: {},
    brokerDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulFilled = (state, action) => {
      state.loading = false;
      state.error = null;
      switch (action.type) {
        case getAllBrokers.fulfilled.type:
          state.brokers = action.payload?.data || [];
          break;
        case getBrokerDashboard.fulfilled.type:
          state.summary = action.payload?.data?.summary || {};
          break;
        case getBrokerById.fulfilled.type:
          state.brokerDetails = action.payload?.data;
          break;
        case addBroker.fulfilled.type:
        case editBroker.fulfilled.type:
        case deleteBroker.fulfilled.type:
          break;
        default:
          break;
      }
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    [addBroker, getAllBrokers, getBrokerDashboard, getBrokerById, editBroker, deleteBroker].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default BrokerSlice.reducer