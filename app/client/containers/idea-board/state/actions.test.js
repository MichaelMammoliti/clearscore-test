import CONSTANTS from './constants';
import * as actions from './actions';

describe('idea board actions', () => {
  it('should have the same amount of actions', () => {
    expect(Object.keys(actions).length).toBe(Object.keys(CONSTANTS).length);
  });

  it(`should return an object with a 'type' key`, () => {
    Object.keys(actions).forEach(actionName => {
      const obj = actions[actionName]();

      expect(obj).toHaveProperty('type');
    });
  });

  describe('.create', () => {
    it('should return the correct object format', () => {
      const obj = actions.create();

      expect(obj.type).toBe(CONSTANTS.CREATE)
    });
  });

  describe('.change', () => {
    it('should return the correct object format', () => {
      const payload = {
        something: 'hello',
      };

      const obj = actions.change(payload);

      expect(obj).toHaveProperty('payload');
      expect(obj.type).toBe(CONSTANTS.CHANGE)
      expect(obj.payload).toBe(payload);
    });
  });

  describe('.confirm', () => {
    it('should return the correct object format', () => {
      const obj = actions.confirm();

      expect(obj.type).toBe(CONSTANTS.CONFIRM)
    });
  });

  describe('.edit', () => {
    it('should return the correct object format', () => {
      const obj = actions.edit(1);

      expect(obj).toHaveProperty('payload');
      expect(obj.type).toBe(CONSTANTS.EDIT);
      expect(obj.payload.id).toBe(1);
    });
  });

  describe('.remove', () => {
    it('should return the correct object format', () => {
      const obj = actions.remove(1);

      expect(obj).toHaveProperty('payload');
      expect(obj.type).toBe(CONSTANTS.REMOVE);
      expect(obj.payload.id).toBe(1);
    });
  });

  describe('.cancel', () => {
    it('should return the correct object format', () => {
      const obj = actions.cancel();

      expect(obj.type).toBe(CONSTANTS.CANCEL)
    });
  });

  describe('.load', () => {
    it('should return the correct object format', () => {
      const obj = actions.load();

      expect(obj.type).toBe(CONSTANTS.LOAD)
    });
  });
  describe('.sortBy', () => {
    it('should return the correct object format', () => {
      const obj = actions.sortBy('name');

      expect(obj.type).toBe(CONSTANTS.SORT_BY)
      expect(obj.payload.sortBy).toBe('name')
    });
  });
});
