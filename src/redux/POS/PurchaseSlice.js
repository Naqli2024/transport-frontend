import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import PurchaseService from "../../services/PurchaseService";


export const addPurchase = createAsyncThunk(
  "addPurchase",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await PurchaseService.post(`/add`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllPurchase = createAsyncThunk(
  "getAllPurchase",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await PurchaseService.get(``);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const PurchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    purchase: null,
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
      state.purchase = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.purchase = null;
      state.error = action.payload;
    };
    [addPurchase].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default PurchaseSlice.reducer;
