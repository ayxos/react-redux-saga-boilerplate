import keyMirror from 'fbjs/lib/keyMirror';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  SWITCH_MENU: undefined,
  EXCEPTION: undefined,
  USER_LOGIN: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
  GITHUB_GET_REPOS: undefined,
  GITHUB_GET_REPOS_SUCCESS: undefined,
  GITHUB_GET_REPOS_FAILURE: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
});

/*
 * These are the variables that determine what our central data store for login(`../reducers/index.js`)
 * changes in our state.
 */

export const CHANGE_FORM = 'CHANGE_FORM'
export const SET_AUTH = 'SET_AUTH'
export const SENDING_REQUEST = 'SENDING_REQUEST'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const LOGOUT = 'LOGOUT'
export const REQUEST_ERROR = 'REQUEST_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

/**
 * @constant {Object} STATUS
 * @memberof Constants
 */
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};
