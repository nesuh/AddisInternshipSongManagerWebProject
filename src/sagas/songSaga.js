// src/sagas/songSaga.js
import { call, put, takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import { fetchSongs } from '../slices/songSlice';

function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, 'http://localhost:3000/songs');
    yield put(fetchSongs.fulfilled(response.data));
  } catch (e) {
    yield put(fetchSongs.rejected(e.message));
  }
}

function* watchFetchSongs() {
  yield takeEvery(fetchSongs.pending.type, fetchSongsSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchSongs(),
    // Add other sagas here if needed
  ]);
}
