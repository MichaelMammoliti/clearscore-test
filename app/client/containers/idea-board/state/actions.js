import CONSTANTS from './constants';

export const create = () => ({
  type: CONSTANTS.CREATE,
});

export const change = data => ({
  type: CONSTANTS.CHANGE,
  payload: data,
});

export const confirm = () => ({
  type: CONSTANTS.CONFIRM,
});

export const edit = id => ({
  type: CONSTANTS.EDIT,
  payload: {
    id,
  },
});

export const remove = id => ({
  type: CONSTANTS.REMOVE,
  payload: {
    id,
  },
});

export const cancel = () => ({
  type: CONSTANTS.CANCEL,
});

export const load = () => ({
  type: CONSTANTS.LOAD,
});

export const sortBy = value => ({
  type: CONSTANTS.SORT_BY,
  payload: {
    sortBy: value,
  },
});
