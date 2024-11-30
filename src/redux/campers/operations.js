import { createAsyncThunk } from '@reduxjs/toolkit';
import { mockapi } from '../../api/api.js';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockapi.get('/campers');
      return response.data;
    } catch (error) {
      console.error('Error fetching campers:', error);
      return rejectWithValue(error.response.data);
    }
  }
);
