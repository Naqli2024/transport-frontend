import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.post(`/login`, payload);
      Cookies.set("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const authenticateAdmin = createAsyncThunk(
  "authenticateAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.post(`/authenticate`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getUserById = createAsyncThunk(
  "getUserById",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.get(`/user-details`);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const AuthSlice = createSlice({
  name: "authAdmin",

  initialState: {
    admin: null,
    loading: false,
    error: null,
    authenticateLoading: false,
    authenticateError: null,
    authenticateSuccess: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    // ==========================================
    // LOGIN
    // ==========================================

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.admin = null;
        state.error = action.payload;
      });

    // ==========================================
    // GET USER BY ID
    // ==========================================

    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.error = null;
      })

      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.admin = null;
        state.error = action.payload;
      });

    // ==========================================
    // AUTHENTICATE ADMIN
    // ==========================================

    builder
      .addCase(authenticateAdmin.pending, (state) => {
        state.authenticateLoading = true;
        state.authenticateError = null;
        state.authenticateSuccess = false;
      })

      .addCase(authenticateAdmin.fulfilled, (state, action) => {
        state.authenticateLoading = false;
        state.authenticateSuccess = action.payload?.success === true;
        state.authenticateError = null;
      })

      .addCase(authenticateAdmin.rejected, (state, action) => {
        state.authenticateLoading = false;
        state.authenticateSuccess = false;
        state.authenticateError = action.payload;
      });
  },
});

export default AuthSlice.reducer;
