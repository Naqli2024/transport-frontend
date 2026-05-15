import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import WorkOrderService from "../../services/WorkOrderService";

export const createWorkOrder = createAsyncThunk(
  "createWorkOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await WorkOrderService.post("/create",payload);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const updateWorkOrder = createAsyncThunk(
  "updateWorkOrder",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await WorkOrderService.put(`/${orderId}`,payload);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const deleteByWorkOrder = createAsyncThunk(
  "deleteByWorkOrder",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await WorkOrderService.delete(`/${orderId}`,payload);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const assignBay = createAsyncThunk(
  "assignBay",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await WorkOrderService.put(`/${orderId}/assign-bay`,payload);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const completeWorkOrder = createAsyncThunk(
  "completeWorkOrder",
  async ({orderId,payload}, { rejectWithValue }) => {
    try {
      const response = await WorkOrderService.put(`/${orderId}/complete`,payload);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getAllOrderByBusinessId = createAsyncThunk(
  "getAllOrderByBusinessId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await WorkOrderService.get();
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);


const WorkOrderSlice = createSlice({
  name: "workOrder",
  initialState: {
    workOrder: null,
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
      state.workOrder = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.workOrder = null;
      state.error = action.payload;
    };
    [createWorkOrder,updateWorkOrder,deleteByWorkOrder,getAllOrderByBusinessId,assignBay,completeWorkOrder].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default WorkOrderSlice.reducer;
