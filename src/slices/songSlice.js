import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch songs
export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  const response = await axios.get('http://localhost:3000/songs');
  return response.data;
});

// Delete song
export const deleteSong = createAsyncThunk('songs/deleteSong', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:3000/songs/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update song
export const updateSong = createAsyncThunk(
  'songs/updateSong',
  async ({ id, formData }) => {
    console.log(formData);
    const response = await axios.put(`http://localhost:3000/songs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
 
  }
);

const songSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    loading: false,
    error: null,
  },
  reducers: {
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(deleteSong.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = state.songs.filter((song) => song.id !== action.payload);
      })
      .addCase(deleteSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        const index = state.songs.findIndex((song) => song.id === action.payload.id);
        if (index !== -1) {
          state.songs[index] = action.payload;
        }
      });
  },
});

export const { addSong } = songSlice.actions;

export default songSlice.reducer;
