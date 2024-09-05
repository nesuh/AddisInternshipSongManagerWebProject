import { configureStore } from '@reduxjs/toolkit';
import songReducer from '../slices/songSlice';

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
});

export default store;
