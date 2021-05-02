import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchMostRecent,
  fetchNextPrevPrograms,
  fetchProgram,
  fetchProgramEpisode,
  fetchProgramEpisodes,
  fetchPrograms,
} from './programsAPI';

const initialState = {
  programs: [],
  status: 'idle',
  currentProgram: null,
  episodes: [],
  currentEpisode: null,
  mostRecent: [],
};

export const getPrograms = createAsyncThunk(
  'programs/fetchPrograms',
  async ({ page, categoryId }) => {
    const response = await fetchPrograms(page, categoryId);
    return response.data;
  }
);
export const getNextPrevEpisodes = createAsyncThunk(
  'programs/fetchProgramsNextPrev',
  async (url, _thunk) => {
    const response = await fetchNextPrevPrograms(url);
    return response.data;
  }
);

export const getProgram = createAsyncThunk(
  'program/fetchPrograms',
  async (id, _thunk) => {
    const response = await fetchProgram(id);
    return response.data;
  }
);
export const getProgramEpisodes = createAsyncThunk(
  'program/fetchProgramEpisodes',
  async (q, _thunk) => {
    const response = await fetchProgramEpisodes(q);
    return response.data;
  }
);
export const getEpisode = createAsyncThunk(
  'program/fetchEpisode',
  async (id, _thunk) => {
    const response = await fetchProgramEpisode(id);
    return response.data;
  }
);
export const getRecent = createAsyncThunk(
  'program/fetchMostRecent',
  async () => {
    const response = await fetchMostRecent();
    return response.data;
  }
);

export const programsSlice = createSlice({
  name: 'programs',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    goToProgram: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPrograms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.status = 'idle';
        state.programs = action.payload;
      })
      .addCase(getNextPrevEpisodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNextPrevEpisodes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.episodes = action.payload;
      })
      .addCase(getProgram.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProgram.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentProgram = action.payload.program;
      })
      .addCase(getProgramEpisodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProgramEpisodes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.episodes = action.payload;
      })
      .addCase(getEpisode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEpisode.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentEpisode = action.payload;
      })
      .addCase(getRecent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRecent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mostRecent = action.payload;
      });
  },
});

export const { goToChannel } = programsSlice.actions;

export const selectPrograms = (state) => state.programs.programs;
export const selectProgram = (state) => state.programs.currentProgram;
export const selectProgramStatus = (state) => state.programs.status;
export const selectProgramEpisodes = (state) => state.programs.episodes;
export const selectCurrentEpisode = (state) => state.programs.currentEpisode;
export const selectMostRecent = (state) => state.programs.mostRecent;

export default programsSlice.reducer;
