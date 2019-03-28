/**
 * @module Sagas/User
 * @desc User
 */

import { delay } from 'redux-saga';
import { request } from 'modules/client';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import C from 'constants/index';
import { ActionTypes } from 'redux/actions/index';
import { push } from 'connected-react-router';

/**
 * Update User
 */
export function* updateUser(newUser) {
  console.log('from sagas to reducer', newUser); // eslint-disable-line no-console
  try {
    const data = yield call(request, `${C.domain}/user`, {
      method: 'POST',
      payload: newUser.payload,
    });

    yield put({
      type: ActionTypes.USER_UPDATE_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_UPDATE_FAILURE,
      payload: err,
    });
  }
}

/**
 * Login
 */
export function* login() {
  try {
    const data = yield call(request, `${C.domain}/user`);
    const token = null;
    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: {
        data,
        token,
      },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: err,
    });
    yield put(push('/login'));
  }
}

/**
 * Logout
 */
export function* logout() {
  try {
    yield call(delay, 200);

    yield put({
      type: ActionTypes.USER_LOGOUT_SUCCESS,
    });
    yield put(push('/login'));
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGOUT_FAILURE,
      payload: err,
    });
    yield put(push('/login'));
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN, login),
    takeLatest(ActionTypes.USER_LOGOUT, logout),
    takeLatest(ActionTypes.USER_UPDATE, updateUser),
  ]);
}
