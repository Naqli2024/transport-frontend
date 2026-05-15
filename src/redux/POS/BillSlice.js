import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import BillService from "../../services/BillService";
import PaymentService from "../../services/PaymentService";

export const createBill = createAsyncThunk(
  "createBill",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await BillService.post(`/create`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const addPayment = createAsyncThunk(
  "addPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await PaymentService.post(`/add`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getBillById = createAsyncThunk(
  "getBillById",
  async (billId, { rejectWithValue }) => {
    try {
      const response = await BillService.get(`/${billId}`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getBillByBusinessId = createAsyncThunk(
  "getBillByBusinessId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await BillService.get(``);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getBillByCustomerId = createAsyncThunk(
  "getBillByCustomerId",
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await BillService.get(`/customer/${customerId}`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getInvoiceByBillNo = createAsyncThunk(
  "getInvoiceByBillNo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await BillService.post(`/invoice/by-billno`,payload);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const deleteBill = createAsyncThunk(
  "deleteBill",
  async (billId, { rejectWithValue }) => {
    try {
      const response = await BillService.delete(`/${billId}`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

const BillSlice = createSlice({
  name: "bills",
  initialState: {
    bills: null,
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
      state.bills = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.bills = null;
      state.error = action.payload;
    };
    [createBill,getBillByBusinessId,getBillByCustomerId,getBillById,addPayment,getInvoiceByBillNo,deleteBill].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default BillSlice.reducer;
