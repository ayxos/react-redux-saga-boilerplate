/**
 * @module Sagas/Index
 * @desc Menu
 */

import { call, put, all, takeLatest, takeEvery, fork } from 'redux-saga/effects';
import { request } from 'modules/client';
import { ActionTypes, ActionOpsList } from 'redux/actions/index';
import C from 'constants/index';
import helpers from './helpers';
import app from './app';
import user from './user';

let counter = 0;
let reached = true;

function addhttp(url) {
  let urlFormat = null;
  urlFormat = url.startsWith('http') ? `${url}` : `${C.domain}/${url}`;
  return urlFormat;
}

export function showLoader() {
  counter++;
}

export function stopLoader() {
  if (counter > 0) {
    counter--;
  }
  if (counter === 0) {
    reached = false;
    counter = 0;
  }
}

export const fnGenerator = (url, type, actionTypeSuccess, actionTypeFail) =>
  function* fn(query) {
    try {
      const isEmpty =
        Object.keys(query.payload).length === 0 && query.payload.constructor === Object;
      const finalDomain = addhttp(url);
      let requestUrl = finalDomain;
      let data = yield call(request, requestUrl);
      let filterData = null;
      switch (type) {
        case 'get':
          if (!isEmpty) {
            const filter = Object.entries(query.payload.filter)
              .map(e => e.map(ee => encodeURIComponent(ee)).join('='))
              .join('&');
            requestUrl = `${finalDomain}?${filter}`;
            data = yield call(request, requestUrl);
            filterData = query.payload.filter;
          }
          break;
        case 'post':
          data = yield call(request, requestUrl, { method: 'POST', payload: query.payload });
          break;
        case 'put':
          requestUrl = `${finalDomain}/${query.payload.id}`;
          data = yield call(request, requestUrl, { method: 'PUT', payload: query.payload });
          break;
        case 'delete':
          requestUrl = `${finalDomain}/${query.payload.id}`;
          yield call(request, requestUrl, { method: 'DELETE' });
          data = query.payload.id;
          break;
        default:
      }
      yield put({
        type: actionTypeSuccess,
        payload: { data, filter: filterData || null },
      });
      const putType = reached === true ? 'LOADING' : 'LOADING_SUCCESS';
      yield put({ type: putType, payload: reached });
      if (reached === false) reached = true;
    } catch (err) {
      /* istanbul ignore next */
      if (err.status === 401) {
        yield put({
          type: ActionTypes.USER_LOGIN,
        });
      } else {
        yield put({
          type: actionTypeFail,
          payload: err,
        });
        yield put({ type: 'LOADING_FAILURE', url, payload: err });
      }
    }
  };

export function sagaGenerator(url, actionTypeTitle, getOpt, postOpt, putOpt, delOpt) {
  const actions = [];

  if (getOpt) {
    // GET actionTypes
    const getActionType = ActionTypes[`GET_${actionTypeTitle}`];
    const getActionTypeSuccess = ActionTypes[`GET_${actionTypeTitle}_SUCCESS`];
    const getActionTypeFail = ActionTypes[`GET_${actionTypeTitle}_FAILURE`];
    const getGenerator = fnGenerator(url, 'get', getActionTypeSuccess, getActionTypeFail);
    actions.push(takeLatest(getActionType, getGenerator));
  }

  if (postOpt) {
    // ADD actionTypes
    const postActionType = ActionTypes[`ADD_${actionTypeTitle}`];
    const postActionTypeSuccess = ActionTypes[`ADD_${actionTypeTitle}_SUCCESS`];
    const postActionTypeFail = ActionTypes[`ADD_${actionTypeTitle}_FAILURE`];
    const postGenerator = fnGenerator(url, 'post', postActionTypeSuccess, postActionTypeFail);
    actions.push(takeLatest(postActionType, postGenerator));
  }

  if (putOpt) {
    // UPDATE actionTypes
    const putActionType = ActionTypes[`UPDATE_${actionTypeTitle}`];
    const putActionTypeSuccess = ActionTypes[`UPDATE_${actionTypeTitle}_SUCCESS`];
    const putActionTypeFail = ActionTypes[`UPDATE_${actionTypeTitle}_FAILURE`];
    const putGenerator = fnGenerator(url, 'put', putActionTypeSuccess, putActionTypeFail);
    actions.push(takeEvery(putActionType, putGenerator));
  }

  if (delOpt) {
    // DELETE actionTypes
    const delActionType = ActionTypes[`DELETE_${actionTypeTitle}`];
    const delActionTypeSuccess = ActionTypes[`DELETE_${actionTypeTitle}_SUCCESS`];
    const delActionTypeFail = ActionTypes[`DELETE_${actionTypeTitle}_FAILURE`];
    const delGenerator = fnGenerator(url, 'delete', delActionTypeSuccess, delActionTypeFail);
    actions.push(takeLatest(delActionType, delGenerator));
  }

  return function* rootMenu() {
    yield all(actions);
  };
}

const rootGenerated = [];

/* eslint-disable array-callback-return */
ActionOpsList.map(saga => {
  if (saga.url)
    rootGenerated.push(
      fork(sagaGenerator(saga.url, saga.action, saga.get, saga.post, saga.put, saga.delete)),
    );
});

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(helpers), fork(app), fork(user)].concat(rootGenerated));
}
