import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers } from './operations.js';

const initialState = {
  campers: [],
  isLoading: false,
  isError: false,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCampers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.campers = action.payload.items;
    });
  },
});

export const campersReducer = campersSlice.reducer;
