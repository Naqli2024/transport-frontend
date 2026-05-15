import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import LedgerService from "../../services/LedgerService";

export const getSummary = createAsyncThunk(
  "getSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/summary`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getAgingReport = createAsyncThunk(
  "getAgingReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/aging`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getCustomerLedger = createAsyncThunk(
  "getCustomerLedger",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/customer`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getSupplierLedger = createAsyncThunk(
  "getSupplierLedger",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/suppliers`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getCustomerLedgerById = createAsyncThunk(
  "getCustomerLedgerById",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/customer/${customerId}`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getSupplierLedgerById = createAsyncThunk(
  "getSupplierLedgerById",
  async (supplierId, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/supplier/${supplierId}`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getRevenueSplit = createAsyncThunk(
  "getRevenueSplit",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/revenue-split`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getTopServices = createAsyncThunk(
  "getTopServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/top-services`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getPaymentSplit = createAsyncThunk(
  "getPaymentSplit",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/payment-split`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getDailySales = createAsyncThunk(
  "getDailySales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LedgerService.get(`/daily-sales`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

const LedgerSlice = createSlice({
  name: "ledger",
  initialState: {
    ledger: null,
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
      state.ledger = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.ledger = null;
      state.error = action.payload;
    };
    [getSummary,getAgingReport,getCustomerLedger,getSupplierLedger,getCustomerLedgerById,getRevenueSplit,getTopServices,getPaymentSplit,getDailySales].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default LedgerSlice.reducer;
