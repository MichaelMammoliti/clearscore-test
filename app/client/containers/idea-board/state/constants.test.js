import CONSTANTS from './constants';

const mockedConstants = {
  CREATE: 'IDEA_BOARD/CREATE',
  CHANGE: 'IDEA_BOARD/CHANGE',
  CONFIRM: 'IDEA_BOARD/CONFIRM',
  EDIT: 'IDEA_BOARD/EDIT',
  REMOVE: 'IDEA_BOARD/REMOVE',
  CANCEL: 'IDEA_BOARD/CANCEL',
  LOAD: 'IDEA_BOARD/LOAD',
  SORT_BY: 'IDEA_BOARD/SORT_BY',
};

describe('CONSTANTS', () => {
  it('should have the same values and keys', () => {
    expect(CONSTANTS).toStrictEqual(mockedConstants);
  });
});
