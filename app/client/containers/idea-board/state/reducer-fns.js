import { Storage, IdeaUtilities } from '../../../utilities';

import moment from 'moment';

export const create = (payload, state) => ({
  ...state,
  temporaryIdea: {},
});

export const change = (payload, state) => {
  const keyToAmend = (state.temporaryIdea)
    ? 'temporaryIdea'
    : 'ideaToEdit'
  ;

  return {
    ...state,
    [keyToAmend]: {
      ...state[keyToAmend],
      ...payload,
    },
  };
};

export const confirmEdit = (payload, state) => {
  const { ideaToEdit, ideas, sortBy } = state;

  let newIdeas = [ ...ideas ];

  const ideaIndex = newIdeas.findIndex(ideaItem => ideaItem.id === ideaToEdit.id);

  const newIdeaToEdit = {
    ...newIdeas[ideaIndex],
    ...ideaToEdit,
    updatedOn: moment().format(),
  };

  newIdeas[ideaIndex] = newIdeaToEdit;

  newIdeas = IdeaUtilities.sortBy(newIdeas, sortBy);

  const newState = {
    ...state,
    ideas: newIdeas,
  };

  delete newState.ideaToEdit;

  return newState;
};

export const confirmAdd = (payload, state) => {
  const { temporaryIdea, ideas, lastIdeaID } = state;

  const id = (typeof lastIdeaID !== 'number')
    ? 0
    : lastIdeaID + 1
  ;

  const newTemporaryIdea = {
    ...temporaryIdea,
    id,
    createdOn: moment().format(),
  };


  const newIdeas = IdeaUtilities.sortBy([ newTemporaryIdea, ...ideas ], state.sortBy);

  const newState = {
    ...state,
    lastIdeaID: id,
    ideas: newIdeas,
  };

  delete newState.temporaryIdea;

  return newState;
};

export const confirm = (payload, state) => {
  const { temporaryIdea, ideaToEdit } = state;

  let newState = {};

  if (ideaToEdit) {
    newState = ReducerFns.confirmEdit(payload, state);
  } else if (temporaryIdea) {
    newState = ReducerFns.confirmAdd(payload, state);
  }

  return newState;
};

export const edit = (payload, state) => {
  const newState = {
    ...state,
    ideaToEdit: {
      ...state.ideas.find(ideaItem => ideaItem.id === payload.id),
      ...payload,
    },
  };

  return newState;
};

export const remove = (payload, state) => {
  const newIdeas = state.ideas.filter(ideaItem => ideaItem.id !== payload.id);

  const newState = {
    ...state,
    ideas: newIdeas,
  };

  return newState;
};

export const cancel = (payload, state) => {
  const newState = {
    ...state,
  };

  if (newState.temporaryIdea) {
    delete newState.temporaryIdea;
  } else if (newState.ideaToEdit) {
    delete newState.ideaToEdit;
  }

  return newState;
};

export const load = (payload, state) => {
  const savedReducerState = Storage.get('ideas') || {};

  return {
    ...state,
    ...savedReducerState,
  };
};

export const sortBy = (payload, state) => {
  const newIdeas = IdeaUtilities.sortBy(state.ideas, payload.sortBy);

  console.log(newIdeas);

  return {
    ...state,
    ideas: newIdeas,
    sortBy: payload.sortBy,
  };
};

const ReducerFns = {
  create,
  change,
  confirmEdit,
  confirmAdd,
  confirm,
  edit,
  remove,
  cancel,
  load,
  sortBy,
};

export default ReducerFns;
