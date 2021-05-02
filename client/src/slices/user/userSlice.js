import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  userLogin,
  userRegister,
  fetchUser,
  addFavorite,
  fetchFavorites,
  delFavorite,
  fetchSchedule,
} from './userAPI';

const initialState = {
  user: null,
  status: 'idle',
  error: '',
  favorites: null,
  schedule: null,
};

export const login = createAsyncThunk('user/login', async (user, _thunk) => {
  const response = await userLogin(user);
  return response.data;
});

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await fetchUser();
  return response.data;
});
export const getUserSchedule = createAsyncThunk(
  'user/getUserSchedule',
  async () => {
    const response = await fetchSchedule();
    return response.data;
  }
);

export const addToFavorite = createAsyncThunk(
  'user/addFavorite',
  async (body, _thunk) => {
    const response = await addFavorite(body);
    return response.data;
  }
);

export const removeFromFavorite = createAsyncThunk(
  'user/removeFavorite',
  async (body, _thunk) => {
    const response = await delFavorite(body);
    return response.data;
  }
);
export const getFavorites = createAsyncThunk('user/fetchFavorite', async () => {
  const response = await fetchFavorites();
  return response.data;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.auth) {
          state.status = 'idle';
          localStorage.setItem('token', action.payload.token);
          state.user = action.payload.user;
          state.error = null;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.auth) {
          state.status = 'idle';
          localStorage.setItem('token', action.payload.token);
          state.user = action.payload.user;
          state.error = null;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(getFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.favorites = action.payload;
          state.error = null;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(getUserSchedule.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserSchedule.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.schedule = action.payload;
          state.error = null;
        } else {
          state.error = action.payload.message;
        }
      });
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserFavorites = (state) => state.user.favorites;
export const selectUserSchedule = (state) => state.user.schedule;

export default userSlice.reducer;
