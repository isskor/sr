import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesAPI';

const initialState = {
  categories: [],
  currentCat: null,
  status: 'idle',
};

export const getCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetchCategories();

    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentCat: (state, action) => {
      state.currentCat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload.programcategories;
      });
  },
});

export const { setCurrentCat } = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.categories;
export const selectCurrentCat = (state) => state.categories.currentCat;
export const selectCatStatus = (state) => state.categories.status;

export default categoriesSlice.reducer;
