import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  source: null,
  status: 'idle',
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
    },
  },
});

export const { setSource } = playerSlice.actions;

export const selectSource = (state) => state.player.source;

export default playerSlice.reducer;
