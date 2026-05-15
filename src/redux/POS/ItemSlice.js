import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import ItemService from "../../services/ItemService";
import axios from "axios";

export const addItems = createAsyncThunk(
  "addItems",
  async (payload, { rejectWithValue }) => {
    try {
      const isFormData = payload instanceof FormData;

      const response = await ItemService.post("/add", payload, {
        headers: isFormData
          ? { "Content-Type": undefined }
          : { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getAllItems = createAsyncThunk(
  "getAllItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ItemService.get("/all");
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getItemImage = createAsyncThunk(
  "getItemImage",
  async (itemImageUrl, { rejectWithValue }) => {
    try {
      const response = await ItemService.get(`/image?filePath=${itemImageUrl}`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const getSearchItems = createAsyncThunk(
  "getSearchItems",
  async (query, { rejectWithValue }) => {
    try {
      const response = await ItemService.get(`/search?search=${query}`);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const addFavorite = createAsyncThunk(
  "addFavorite",
  async({itemId,payload},{rejectWithValue}) => {
    try{
      const response = await ItemService.put(`/favorite/${itemId}`,payload);
      return response.data;
    }catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

export const editItems = createAsyncThunk(
  "editItems",
  async ({ itemId, payload }, { rejectWithValue }) => {
    try {
     
      const response = await ItemService.put(`/${itemId}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
 
export const deleteItems = createAsyncThunk(
  "deleteItems",
  async(itemId, {rejectWithValue}) => {
    try{
      const response = await ItemService.delete(`/${itemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const ItemSlice = createSlice({
  name: "items",
  initialState: {
    items: null,
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
      state.items = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.items = null;
      state.error = action.payload;
    };
    [addItems,getAllItems,getSearchItems,getItemImage,deleteItems,editItems,addFavorite].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default ItemSlice.reducer;
