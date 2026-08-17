import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import BillService from "../../services/BillService";
import PaymentService from "../../services/PaymentService";
import SupplierService from "../../services/SupplierService";

export const getAllSuppliers = createAsyncThunk(
  "getAllSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await SupplierService.get();
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const addSupplier = createAsyncThunk(
  "addSupplier",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await SupplierService.post(`/add`,payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "updateSupplier",
  async ({payload,id}, { rejectWithValue }) => {
    try {
      const { data } = await SupplierService.put(`/${id}`,payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "deleteSupplier",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await SupplierService.delete(`/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const supplierPayment = createAsyncThunk(
  "supplierPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await SupplierService.post(`/payment`,payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const SupplierSlice = createSlice({
  name: "supplier",
  initialState: {
    supplier: null,
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
      state.supplier = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.supplier = null;
      state.error = action.payload;
    };
    [addSupplier,getAllSuppliers,updateSupplier,deleteSupplier,supplierPayment].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default SupplierSlice.reducer;
