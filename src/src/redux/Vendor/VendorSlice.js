import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import handleApiError from "../../helpers/helperApiError";
import VendorService from "../../services/VendorService";


export const addVendor = createAsyncThunk(
  "addVendor",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await VendorService.post(`/add`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
export const getAllVendor = createAsyncThunk(
  "getAllVendor",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await VendorService.get();
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editVendor = createAsyncThunk(
  "editVendors",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const response = await VendorService.put(`/${userId}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "deleteVendors",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await VendorService.delete(`/${userId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const getVendorById = createAsyncThunk(
  "getVendorById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await VendorService.get(`/${userId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)




const VendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendors: [],
    vendorDetails: null,
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
        case getAllVendor.fulfilled.type:
          state.vendors = action.payload?.data || [];
          break;
        case getVendorById.fulfilled.type:
          state.vendorDetails = action.payload?.data;
          break;
        case addVendor.fulfilled.type:
        case editVendor.fulfilled.type:
        case deleteVendor.fulfilled.type:
          break;
        default:
          break;
      }
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    [getAllVendor, addVendor, editVendor, deleteVendor, getVendorById].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});



export default VendorSlice.reducer