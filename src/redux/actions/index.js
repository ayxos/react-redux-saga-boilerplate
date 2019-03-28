import uuid from 'uuid/v4';
import { createActions } from 'redux-actions';

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */

const ActionList = {};

const Actions = [
  'SHOW_ALERT',
  'HIDE_ALERT',
  'EXCEPTION',
  'LOADING',
  'USER_LOGIN',
  'USER_LOGOUT',
  'USER_UPDATE',
  'GET_MENU',
  'GET_WINES',
  'ADD_WINES',
  'UPDATE_WINES',
  'DELETE_WINES',
  'GET_CONSTANTS',
];

/* eslint-disable array-callback-return */
function fillingActionTypes() {
  Actions.map(action => {
    const success = `${action}_SUCCESS`;
    const failure = `${action}_FAILURE`;
    ActionList[action] = action;
    ActionList[success] = success;
    ActionList[failure] = failure;
  });
}
fillingActionTypes();

export const ActionTypes = ActionList;

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

// @flow
/**
 * @module Actions/MainApp
 * @desc MainApp Actions
 */
export const {
  hideAlert,
  showAlert,
  switchMenu,
  userLogin: login,
  userLogout: logOut,
  userUpdate: updateUser,
  getMenu,
  getWines,
  addWines,
  updateWines,
  deleteWines,
  getConstants,
} = createActions({
  [ActionTypes.SWITCH_MENU]: query => ({ query }),
  [ActionTypes.HIDE_ALERT]: id => ({ id }),
  [ActionTypes.SHOW_ALERT]: (message, options) => {
    const timeout = options.variant === 'danger' ? 0 : 5;
    return {
      id: options.id || uuid(),
      icon: options.icon,
      message,
      position: options.position || 'bottom-right',
      variant: options.variant || 'dark',
      timeout: typeof options.timeout === 'number' ? options.timeout : timeout,
    };
  },
  [ActionTypes.USER_LOGIN]: () => ({}),
  [ActionTypes.USER_LOGOUT]: () => ({}),
  [ActionTypes.USER_UPDATE]: user => user,
  [ActionTypes.GET_MENU]: () => ({}),
  [ActionTypes.GET_WINES]: () => ({}),
  [ActionTypes.ADD_WINES]: wine => wine,
  [ActionTypes.UPDATE_WINES]: wine => wine,
  [ActionTypes.DELETE_WINES]: wine => wine,
  [ActionTypes.GET_CONSTANTS]: () => ({}),
});

const ActionOpsDynamicList = [
  {
    name: 'menu',
    url: 'menu',
    action: 'MENU',
    get: true,
    post: false,
    put: false,
    delete: false,
    object: [],
  },
  {
    name: 'constants',
    url: 'constants',
    action: 'CONSTANTS',
    get: true,
    post: false,
    put: false,
    delete: false,
    object: {},
  },
];

export const ActionOpsList = ActionOpsDynamicList;
