import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DriverService from "../../services/DriverService";
import handleApiError from "../../helpers/helperApiError";
import Cookies from "js-cookie";

export const addDriver= createAsyncThunk(
  "addDriver",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await DriverService.post(`/add-driver`,payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllDrivers = createAsyncThunk(
  "getAllDrivers",
  async(_, {rejectWithValue}) => {
    try {
      const {data} = await DriverService.get();
      return data;
    }catch (error) {
    return rejectWithValue(handleApiError(error));
  } 
  }
)

export const editDriver = createAsyncThunk(
  "editDriver",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await DriverService.put(
        `/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteDriver = createAsyncThunk(
  "deleteDriver",
  async (id , {rejectWithValue}) => {
    try {
      const response = await DriverService.delete(`${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

const DriverSlice = createSlice({
  name: "driver",
  initialState: {
    admin: null,
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
      state.admin = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.admin = null;
      state.error = action.payload;
    };
    [addDriver, getAllDrivers,editDriver,deleteDriver].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default DriverSlice.reducer