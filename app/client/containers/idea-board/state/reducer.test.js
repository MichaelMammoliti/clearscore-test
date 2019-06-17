import ideaBoardReducer, { reducerActionMap, initialState } from './reducer';
import reducerFns from './reducer-fns';
import CONSTANTS from './constants';

describe('ideaBoardReducer', () => {
  describe('reducerActionMap', () => {
    it('should have the same keys as constant values', () => {
      expect(Object.values(CONSTANTS)).toStrictEqual(Object.keys(reducerActionMap));
    });

    it('should have all values set as functions', () => {
      Object.values(reducerActionMap).forEach(item => {
        expect(typeof item).toBe('function');
      });
    });

    it('should have mapped the correct functions', () => {
      expect(reducerActionMap[CONSTANTS.CREATE]).toBe(reducerFns.create);
      expect(reducerActionMap[CONSTANTS.CHANGE]).toBe(reducerFns.change);
      expect(reducerActionMap[CONSTANTS.CONFIRM]).toBe(reducerFns.confirm);
      expect(reducerActionMap[CONSTANTS.EDIT]).toBe(reducerFns.edit);
      expect(reducerActionMap[CONSTANTS.REMOVE]).toBe(reducerFns.remove);
      expect(reducerActionMap[CONSTANTS.CANCEL]).toBe(reducerFns.cancel);
      expect(reducerActionMap[CONSTANTS.LOAD]).toBe(reducerFns.load);
    });
  });

  it('should return the initialState if an action is unknown', () => {
    const action = {
      type: 'HELLO'
    };

    const state = ideaBoardReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should mutate the state if the correct action has been dispatched.', () => {
    const keys = Object.keys(reducerActionMap);

    for (let i = 0; i < keys.length; i++) {
      const type = keys[i];

      const payload = {
        a: 1,
      };
      const action = { payload, type };
      const expected = {
        ...initialState,
        ...payload,
      };

      const oldFn = reducerActionMap[type];
      const mockedFn = jest.fn().mockReturnValue(expected);

      reducerActionMap[type] = mockedFn;

      const nextState = ideaBoardReducer(initialState, action);

      expect(mockedFn).toHaveBeenCalledWith(payload, initialState);
      expect(nextState).toBe(expected);

      reducerActionMap[type] = oldFn;
    };
  });
});
