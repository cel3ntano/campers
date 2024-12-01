import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITEMS_PER_PAGE, mockapi } from '@src/api/api.js';
import toast from 'react-hot-toast';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (arg = {}, { rejectWithValue }) => {
    const {
      filters = {},
      page = 1,
      showToast = false,
      limit = ITEMS_PER_PAGE,
    } = arg;

    const queryParams = Object.fromEntries(
      Object.entries(filters).filter(
        ([key, value]) => value !== false && value !== ''
      )
    );

    try {
      const response = await mockapi('/campers', {
        params: { ...queryParams, page, limit },
      });
      const total = response.data.total;

      if (showToast) {
        if (total === 0) {
          toast.error('No campers found');
        } else {
          toast.success(`${total} camper${total === 1 ? '' : 's'} found!`);
        }
      }
      return response.data;
    } catch (error) {
      const status = error.response?.status || 500;
      if (status === 404) {
        toast.error('No campers found');
      } else {
        toast.error('Something went wrong. Try reloading the page');
      }
      return rejectWithValue({
        status,
        message: error.response?.data || 'Something went wrong',
      });
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (camperId, { rejectWithValue }) => {
    try {
      const response = await mockapi(`/campers/${camperId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
