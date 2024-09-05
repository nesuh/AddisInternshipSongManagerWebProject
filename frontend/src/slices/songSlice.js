import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const API_BASE_URL = 'http://localhost:3000/songs';

// Fetch songs
export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
});

// Add song
export const addSong = createAsyncThunk('songs/addSong', async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
});

// Update song
export const updateSong = createAsyncThunk('songs/updateSong', async ({ id, formData }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
});

// Delete song
export const deleteSong = createAsyncThunk('songs/deleteSong', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const songSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch songs
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add song
      .addCase(addSong.fulfilled, (state, action) => {
        state.songs.push(action.payload);
      })
      // Update song
      .addCase(updateSong.fulfilled, (state, action) => {
        const index = state.songs.findIndex((song) => song.id === action.payload.id);
        if (index !== -1) {
          state.songs[index] = action.payload;
        }
      })
      // Delete song
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.songs = state.songs.filter((song) => song.id !== action.payload);
      });
  },
});

export default songSlice.reducer;
