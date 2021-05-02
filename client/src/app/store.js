import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../slices/categories/categoriesSlice';
import channelReducer from '../slices/channels/channelSlice';
import playerReducer from '../slices/player/playerSlice';
import programsReducer from '../slices/programs/programsSlice';
import userReducer from '../slices/user/userSlice';

export const store = configureStore({
  reducer: {
    channels: channelReducer,
    categories: categoriesReducer,
    player: playerReducer,
    programs: programsReducer,
    user: userReducer,
  },
});
