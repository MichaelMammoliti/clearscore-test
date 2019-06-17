import CONSTANTS from './constants';
import * as reducerFns from './reducer-fns';
import { Storage } from '../../../utilities';

export const initialState = {
  ideas: [],
  lastIdeaID: undefined,
  sortBy: 'date',
};

export const reducerActionMap = {
  [CONSTANTS.CREATE]: reducerFns.create,
  [CONSTANTS.CHANGE]: reducerFns.change,
  [CONSTANTS.CONFIRM]: reducerFns.confirm,
  [CONSTANTS.EDIT]: reducerFns.edit,
  [CONSTANTS.REMOVE]: reducerFns.remove,
  [CONSTANTS.CANCEL]: reducerFns.cancel,
  [CONSTANTS.LOAD]: reducerFns.load,
  [CONSTANTS.SORT_BY]: reducerFns.sortBy,
};

const ideaBoardReducer = (state = initialState, action) => {
  const { payload, type } = action;
  let newState;

  if (!reducerActionMap[type]) {
    newState = initialState;
  } else {
    newState = reducerActionMap[type](payload, state);

    Storage.set('ideas', newState);
  }

  return newState;
};

export default ideaBoardReducer;
