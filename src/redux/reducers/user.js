import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';

import { ActionTypes } from 'redux/actions/index';

export const userState = {
  isAuthenticated: false,
  status: 'idle',
  userData: {},
};

export const reducerMap = {
  [ActionTypes.USER_LOGIN]: state =>
    immutable(state, {
      status: { $set: 'running' },
    }),
  [ActionTypes.USER_LOGIN_SUCCESS]: (state, { payload }) => {
    const user = payload && payload.data ? payload.data : {};
    if (payload && payload.token) {
      user.token = payload.token;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('userToken', JSON.stringify(payload.token));
    }
    return immutable(state, {
      userData: { $set: user }, // eslint-disable-line no-mixed-operators
      isAuthenticated: { $set: true },
      status: { $set: 'idle' },
    });
  },
  [ActionTypes.USER_LOGIN_FAILURE]: (state, { payload }) =>
    immutable(state, {
      error: { $set: (payload && payload.response) || { message: 'Unknown error' } }, // eslint-disable-line no-mixed-operators
      isAuthenticated: { $set: false },
      status: { $set: 'idle' },
    }),
  [ActionTypes.USER_UPDATE_SUCCESS]: (state, { payload }) =>
    immutable(state, {
      userData: { $set: (payload && payload.data) || [] }, // eslint-disable-line no-mixed-operators
    }),
  [ActionTypes.USER_LOGOUT]: state =>
    immutable(state, {
      status: { $set: 'running' },
    }),
  [ActionTypes.USER_LOGOUT_SUCCESS]: state =>
    immutable(state, {
      userData: {},
      isAuthenticated: { $set: false },
      status: { $set: 'idle' },
    }),
};

export default {
  user: handleActions(reducerMap, userState),
};
