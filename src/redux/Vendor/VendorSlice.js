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

export const getVendorSettlementSummary = createAsyncThunk(
  "vendor/getSettlement",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await VendorService.get(
        `/vendors/${vendorId}/settlement`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch vendor settlement"
      );
    }
  }
);

export const vendorSettlement = createAsyncThunk(
  "vendor/settlement",
  async (
    { id, amount, remarks },
    { rejectWithValue }
  ) => {
    try {
      const response = await VendorService.post(
        `/vendors/${id}/settlement`,
        {
          amount,
          remarks,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to settle vendor"
      );
    }
  }
);


const VendorSlice = createSlice({
  name: "vendor",

  initialState: {
    vendors: [],
    vendorDetails: null,

    // ============================================
    // VENDOR SETTLEMENT
    // ============================================

    settlement: null,

    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // ============================================
    // PENDING
    // ============================================

    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    // ============================================
    // FULFILLED
    // ============================================

    const handleFullFilled = (state, action) => {
      state.loading = false;
      state.error = null;

      switch (action.type) {
        // ========================================
        // GET ALL VENDORS
        // ========================================

        case getAllVendor.fulfilled.type:
          state.vendors =
            action.payload?.data || [];
          break;

        // ========================================
        // GET VENDOR BY ID
        // ========================================

        case getVendorById.fulfilled.type:
          state.vendorDetails =
            action.payload?.data;
          break;

        // ========================================
        // ADD / EDIT / DELETE
        // ========================================

        case addVendor.fulfilled.type:
        case editVendor.fulfilled.type:
        case deleteVendor.fulfilled.type:
          break;

        // ========================================
        // GET VENDOR SETTLEMENT
        // ========================================

        case getVendorSettlementSummary.fulfilled.type:
          state.settlement =
            action.payload?.data || null;
          break;

        // ========================================
        // SETTLE VENDOR
        // ========================================

        case vendorSettlement.fulfilled.type:
          break;

        default:
          break;
      }
    };

    // ============================================
    // REJECTED
    // ============================================

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error =
        action.payload ||
        "Something went wrong";
    };

    // ============================================
    // NORMAL VENDOR ACTIONS
    // ============================================

    [
      getAllVendor,
      addVendor,
      editVendor,
      deleteVendor,
      getVendorById,

      // ==========================================
      // NEW SETTLEMENT ACTIONS
      // ==========================================

      getVendorSettlementSummary,
      vendorSettlement,
    ].forEach((action) => {
      builder
        .addCase(
          action.pending,
          handlePending
        )
        .addCase(
          action.fulfilled,
          handleFullFilled
        )
        .addCase(
          action.rejected,
          handleRejected
        );
    });
  },
});

export default VendorSlice.reducer