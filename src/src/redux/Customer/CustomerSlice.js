import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomerService from "../../services/CustomerService";
import handleApiError from "../../helpers/helperApiError";
import Cookies from "js-cookie";

export const addCustomer = createAsyncThunk(
  "addCustomer",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await CustomerService.post(`/create`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllCustomers = createAsyncThunk(
  "getAllCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await CustomerService.get();
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const editCustomer = createAsyncThunk(
  "editCustomer",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await CustomerService.put(
        `/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await CustomerService.delete(`/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)


export const getCustomerById = createAsyncThunk(
  "getCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await CustomerService.get(`/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const getCustomerDashboard = createAsyncThunk(
  "getCustomerDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CustomerService.get('/dashboard')
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

const CustomerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    summary: {},
    customerDetails: null,
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
        case getAllCustomers.fulfilled.type:
          state.customers = action.payload?.data || [];
          break;
        case getCustomerDashboard.fulfilled.type:
          state.summary = action.payload?.data?.summary || {};
          break;
        case getCustomerById.fulfilled.type:
          state.customerDetails = action.payload?.data;
          break;
        case addCustomer.fulfilled.type:
        case editCustomer.fulfilled.type:
        case deleteCustomer.fulfilled.type:
          break;
        default:
          break;
      }
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };
    [addCustomer, getAllCustomers, editCustomer, deleteCustomer, getCustomerById, getCustomerDashboard].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default CustomerSlice.reducer