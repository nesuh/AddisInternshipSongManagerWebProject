import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import { addSong, updateSong, fetchSongs } from '../slices/songSlice';

// Add Song Saga
function* addSongSaga(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:3000/songs/upload', action.payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    yield put(addSong.fulfilled(response.data));
  } catch (e) {
    yield put(addSong.rejected(e.message));
  }
}

// Update Song Saga
function* updateSongSaga(action) {
  try {
    const response = yield call(axios.put, `http://localhost:3000/songs/${action.payload.id}`, action.payload.formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    yield put(updateSong.fulfilled(response.data));
  } catch (e) {
    yield put(updateSong.rejected(e.message));
  }
}

// Fetch Songs Saga
function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/songs');
    yield put(fetchSongs.fulfilled(response.data));
  } catch (e) {
    yield put(fetchSongs.rejected(e.message));
  }
}

// Watcher Functions
function* watchFetchSongs() {
  yield takeEvery(fetchSongs.pending.type, fetchSongsSaga);
}

function* watchAddSong() {
  yield takeEvery(addSong.pending.type, addSongSaga);
}

function* watchUpdateSong() {
  yield takeEvery(updateSong.pending.type, updateSongSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
    watchAddSong(),
    watchUpdateSong(),
  ]);
}
