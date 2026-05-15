import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import CustomerService from "../../services/CustomerService";

export const addCustomer = createAsyncThunk(
  "addCustomer",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await CustomerService.post(`/add`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editCustomer = createAsyncThunk(
  "editCustomer",
  async ({customerId,payload}, { rejectWithValue }) => {
    try {
      const { data } = await CustomerService.put(`/${customerId}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const disableCustomer = createAsyncThunk(
  "disableCustomer",
  async (customerId, { rejectWithValue }) => {
    try {
      const { data } = await CustomerService.put(`/disable/${customerId}`);
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
      const response = await CustomerService.get("");
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getCustomerById = createAsyncThunk(
  "getCustomerById",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await CustomerService.get(`/${customerId}`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

const CustomerSlice = createSlice({ 
  name: "customers",
  initialState: {
    customers: null,
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
      state.customers = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.customers = null;
      state.error = action.payload;
    };
    [addCustomer,getAllCustomers,getCustomerById,editCustomer,disableCustomer].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default CustomerSlice.reducer;
