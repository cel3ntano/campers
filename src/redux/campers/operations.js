import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITEMS_PER_PAGE, mockapi } from '@src/api/api.js';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (arg = {}, { rejectWithValue }) => {
    const { filters = {}, page = 1, limit = ITEMS_PER_PAGE } = arg;
    try {
      const response = await mockapi('/campers', {
        params: { ...filters, page, limit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data || 'Something went wrong',
      });
    }
  }
);
