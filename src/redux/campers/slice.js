import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCamperById, fetchCampers } from './operations.js';
import { ITEMS_PER_PAGE } from '../../api/api.js';

const initialState = {
  campers: [],
  page: 1,
  isLoading: false,
  isError: false,
  totalItems: 0,
  hasNextPage: true,
  camperDetails: null,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    clearCampers(state) {
      state.campers = [];
      state.page = 1;
      state.isError = false;
    },
    clearCamperDetails(state) {
      state.camperDetails = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.fulfilled, (state, action) => {
        const newItems = action.payload.items;
        const combinedItems = [...state.campers, ...newItems];
        const uniqueCampers = Array.from(
          new Map(combinedItems.map(camper => [camper.id, camper])).values()
        );
        state.campers = uniqueCampers;
        state.totalItems = action.payload.total;
        state.hasNextPage = state.page < state.totalItems / ITEMS_PER_PAGE;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.camperDetails = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchCampers.fulfilled, fetchCamperById.fulfilled),
        state => {
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchCampers.rejected, fetchCamperById.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload || true;
          state.hasNextPage = false;
          state.campers = [];
        }
      )
      .addMatcher(
        isAnyOf(fetchCampers.pending, fetchCamperById.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      );
  },
});

export const { setPage, clearCampers, clearCamperDetails } =
  campersSlice.actions;
export const campersReducer = campersSlice.reducer;
