import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchChannel,
  fetchChannelPrograms,
  fetchChannels,
  fetchChannelSchedule,
  fetchNextPrevChannel,
} from './channelAPI';

const initialState = {
  channels: [],
  status: 'idle',
  currentChannel: null,
  schedule: null,
  programs: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getChannels = createAsyncThunk(
  'channel/fetchChannels',
  async () => {
    const response = await fetchChannels();
    return response.data;
  }
);

export const getChannel = createAsyncThunk(
  'channel/fetchChannel',
  async (id, _thunk) => {
    const response = await fetchChannel(id);

    return response.data;
  }
);

export const getChannelSchedule = createAsyncThunk(
  'channel/fetchChannelSchedule',
  async (body, _thunk) => {
    const response = await fetchChannelSchedule(body);
    return response.data;
  }
);
export const getNextPrevSchedule = createAsyncThunk(
  'channel/fetchNextPrevSchedule',
  async (url, _thunk) => {
    const response = await fetchNextPrevChannel(url);
    return response.data;
  }
);
export const getChannelPrograms = createAsyncThunk(
  'channel/fetchChannelPrograms',
  async (id, _thunk) => {
    const response = await fetchChannelPrograms(id);
    return response.data;
  }
);
export const getNextPrevPrograms = createAsyncThunk(
  'channel/fetchNextPrevPrograms',
  async (url, _thunk) => {
    const response = await fetchNextPrevChannel(url);
    return response.data;
  }
);

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    goToChannel: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChannels.fulfilled, (state, action) => {
        state.status = 'idle';
        state.channels = action.payload;
      })
      .addCase(getChannel.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChannel.fulfilled, (state, action) => {
        state.currentChannel = action.payload;
        state.status = 'idle';
      })
      .addCase(getChannelSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChannelSchedule.fulfilled, (state, action) => {
        state.schedule = action.payload;
        state.status = 'idle';
      })
      .addCase(getNextPrevSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNextPrevSchedule.fulfilled, (state, action) => {
        state.schedule = action.payload;
        state.status = 'idle';
      })
      .addCase(getChannelPrograms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChannelPrograms.fulfilled, (state, action) => {
        state.programs = action.payload;
        state.status = 'idle';
      })
      .addCase(getNextPrevPrograms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNextPrevPrograms.fulfilled, (state, action) => {
        state.programs = action.payload;
        state.status = 'idle';
      });
  },
});

export const { goToChannel } = channelSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChannels = (state) => state.channels.channels;
export const selectChannel = (state) => state.channels.currentChannel;
export const selectChannelSchedule = (state) => state.channels.schedule;
export const selectChannelPrograms = (state) => state.channels.programs;
export const selectChannelsStatus = (state) => state.channels.status;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default channelSlice.reducer;
