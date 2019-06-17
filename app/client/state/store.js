import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import ideaBoardReducer from '../containers/idea-board/state/reducer';

const reducerCollection = combineReducers({
  ideaBoard: ideaBoardReducer,
});

export const store = createStore(reducerCollection, {}, applyMiddleware(thunk));
