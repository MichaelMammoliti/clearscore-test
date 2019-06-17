import * as Storage from './storage';

describe('Storage', () => {
  describe('.set', () => {
    it('should set localStorage given the key', () => {
      Storage.set('test', { a: 1 });

      const actual = "{\"a\":1}";
      const expected = localStorage.getItem('test');

      expect(actual).toBe(expected)
    });
  });

  describe('.get', () => {
    it('should get the item from localStorage', () => {
      Storage.set('test', { a: 1 });

      const received = {"a": 1};
      const expected = Storage.get('test');

      expect(received).toStrictEqual(expected)
    });
  });
});
