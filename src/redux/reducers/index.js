import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { parseError } from 'modules/client';
import { ActionTypes, STATUS, ActionOpsList } from 'redux/actions/index';
import { showLoader, stopLoader } from '../sagas/index';
import user from './user';
import app from './app';

function getReducer(element, actionTypeTitle, get, post, put, del, obj) {
  const actions = {};

  const failFn = (state, { payload }) =>
    immutable(state, {
      [element]: {
        message: { $set: parseError(payload.message) },
        status: { $set: STATUS.ERROR },
      },
    });

  const fetchFn = state => {
    const data = state[element].data ? state[element].data : [];
    showLoader();
    return immutable(state, {
      [element]: {
        data: { $set: data },
      },
    });
  };

  if (get) {
    // GET actionTypes
    const getActionType = ActionTypes[`GET_${actionTypeTitle}`];
    const getActionTypeSuccess = ActionTypes[`GET_${actionTypeTitle}_SUCCESS`];
    const getActionTypeFail = ActionTypes[`GET_${actionTypeTitle}_FAILURE`];
    // GET
    actions[getActionType] = (state, { payload }) => {
      const data = state[element].data[payload] ? state[element].data[payload] : obj;
      showLoader();
      return immutable(state, {
        [element]: {
          data: { $set: data },
        },
      });
    };
    // GET SUCCESS
    actions[getActionTypeSuccess] = (state, { payload }) => {
      stopLoader();
      return immutable(state, {
        [element]: {
          data: { $set: payload.data || obj },
          filter: { $set: payload.filter || obj },
        },
      });
    };
    // GET FAILURE
    actions[getActionTypeFail] = failFn;
  }

  if (post) {
    // ADD actionTypes
    const addActionType = ActionTypes[`ADD_${actionTypeTitle}`];
    const addActionTypeSuccess = ActionTypes[`ADD_${actionTypeTitle}_SUCCESS`];
    const addActionTypeFail = ActionTypes[`ADD_${actionTypeTitle}_FAILURE`];
    // ADD
    actions[addActionType] = fetchFn;
    // ADD SUCCESS
    actions[addActionTypeSuccess] = (state, { payload }) => {
      const newPayload = state[element].data.slice(0);
      newPayload.push(payload.data);
      stopLoader();
      return immutable(state, {
        [element]: {
          data: { $set: newPayload },
        },
      });
    };
    // ADD FAILURE
    actions[addActionTypeFail] = failFn;
  }

  if (put) {
    // PUT actionTypes
    const updateActionType = ActionTypes[`UPDATE_${actionTypeTitle}`];
    const updateActionTypeSuccess = ActionTypes[`UPDATE_${actionTypeTitle}_SUCCESS`];
    const updateActionTypeFail = ActionTypes[`UPDATE_${actionTypeTitle}_FAILURE`];
    // PUT
    actions[updateActionType] = fetchFn;
    // PUT SUCCESS
    actions[updateActionTypeSuccess] = (state, { payload }) => {
      // create new array and fill with payload data (new apps array)
      let newPayload;
      if (Array.isArray(state[element].data)) {
        newPayload = state[element].data.slice(0);
        newPayload.splice(
          newPayload.findIndex(item => item.id === payload.data.id),
          1,
          payload.data,
        );
      } else {
        newPayload = payload.data;
      }
      stopLoader();
      return immutable(state, {
        [element]: {
          data: { $set: newPayload || [] },
        },
      });
    };
    // PUT FAILURE
    actions[updateActionTypeFail] = failFn;
  }

  if (del) {
    // DELETE actionTypes
    const deleteActionType = ActionTypes[`DELETE_${actionTypeTitle}`];
    const deleteActionTypeSuccess = ActionTypes[`DELETE_${actionTypeTitle}_SUCCESS`];
    const deleteActionTypeFail = ActionTypes[`DELETE_${actionTypeTitle}_FAILURE`];
    // DELETE
    actions[deleteActionType] = fetchFn;
    // DELETE SUCCESS
    actions[deleteActionTypeSuccess] = (state, { payload }) => {
      const newPayload = state[element].data.filter(el => el.id !== payload.data);
      stopLoader();
      return immutable(state, {
        [element]: {
          data: { $set: newPayload },
        },
      });
    };
    // DELETE FAILURE
    actions[deleteActionTypeFail] = failFn;
  }

  return handleActions(actions, {
    [element]: {
      data: {},
      status: STATUS.IDLE,
      message: '',
    },
  });
}

const list = Object.assign({}, app, user);

ActionOpsList.map(action => {
  list[action.name] = getReducer(
    action.name,
    action.action,
    action.get,
    action.post,
    action.put,
    action.delete,
    action.object,
  );
  return null;
});

export default list;
