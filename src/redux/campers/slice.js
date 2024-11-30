import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCampers } from './operations.js';

const initialState = {
  campers: [],
  page: 1,
  isLoading: false,
  isError: false,
  totalItems: 0,
  hasNextPage: true,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
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
        state.totalItems = action.payload.total || state.totalItems;
        state.hasNextPage = uniqueCampers.length < state.totalItems;
        state.isLoading = false;
        state.isError = false;
      })
      .addMatcher(isAnyOf(fetchCampers.rejected), (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || true;
        state.hasNextPage = false;
      })
      .addMatcher(isAnyOf(fetchCampers.pending), state => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export const { setPage } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
