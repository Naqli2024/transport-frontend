import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/helperApiError";
import Cookies from "js-cookie";
import TripService from "../../services/TripService";
 
export const getAllLedgers = createAsyncThunk(
    "getAllLedgers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await TripService.get('/ledger-dashboard');
             return data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    }
)
 
const LedgerSlice = createSlice({
    name: "ledger",
    initialState: {
        income: {},
        expenses: {},
        summary: {},
        driverSettlement: {},
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
            state.income = action.payload?.data?.income || {};
            state.expenses = action.payload?.data?.expenses || {};
            state.summary = action.payload?.data?.summary || {};
            state.driverSettlement = action.payload?.data?.driverSettlement || {};
        };
        const handleRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload;
        };
        [getAllLedgers].forEach((action) => {
            builder
                .addCase(action.pending, handlePending)
                .addCase(action.fulfilled, handleFullFilled)
                .addCase(action.rejected, handleRejected);
        });
    },
});
 
export default LedgerSlice.reducer;
 