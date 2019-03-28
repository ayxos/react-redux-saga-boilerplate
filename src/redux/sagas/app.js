/**
 * @module Sagas/Date
 * @desc Date
 */
import { all, takeLatest, select, put } from 'redux-saga/effects';

function* onLocationChanger(action) {
  if (!action) return;
  const location = action.payload.location.pathname;
  try {
    // dispatch all required actions
    const getUser = state => state.user;
    const user = yield select(getUser);
    const isAuth = user.isAuthenticated;
    const getDate = state => state.date;
    const date = yield select(getDate);
    if (isAuth) {
      yield put({
        type: 'FETCH',
        payload: {
          section: location,
          dateRange: date || null,
        },
      });
    }
    // then trigger a success action if you want to
    // yield put(updateDataSuccess());
  } catch (err) {
    // if something wrong happens in the try this will trigger
    yield put({
      type: 'LOCATION_CHANGE_FAILURE',
      payload: err,
    });
  }
}

/**
 * Date Sagas
 */
export default function* root() {
  yield all([takeLatest('@@router/LOCATION_CHANGE', onLocationChanger)]);
}
